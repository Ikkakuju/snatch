import Darwin
import Foundation

public struct ProcessResult: Sendable {
	public let status: Int32
	public let stdout: String
	public let stderr: String
}

public enum ProcessError: LocalizedError {
	case spawn(String, Int32)

	public var errorDescription: String? {
		switch self {
		case let .spawn(name, code): "Could not start \(name): \(String(cString: strerror(code)))"
		}
	}
}

/// A child process in its own process group, so stopping it also stops the
/// ffmpeg yt-dlp starts for a merge (Foundation's `Process` cannot do that).
public final class ChildProcess: @unchecked Sendable {
	public let pid: pid_t
	/// stdout and stderr, one line at a time, in the order they arrive per stream.
	public let lines: AsyncStream<(isError: Bool, line: String)>
	private let exit: Task<Int32, Never>

	public init(_ executable: URL, _ arguments: [String]) throws {
		let out = Pipe()
		let err = Pipe()

		var actions: posix_spawn_file_actions_t?
		posix_spawn_file_actions_init(&actions)
		defer { posix_spawn_file_actions_destroy(&actions) }
		posix_spawn_file_actions_addopen(&actions, 0, "/dev/null", O_RDONLY, 0)
		posix_spawn_file_actions_adddup2(&actions, out.fileHandleForWriting.fileDescriptor, 1)
		posix_spawn_file_actions_adddup2(&actions, err.fileHandleForWriting.fileDescriptor, 2)

		var attributes: posix_spawnattr_t?
		posix_spawnattr_init(&attributes)
		defer { posix_spawnattr_destroy(&attributes) }
		// A new group led by the child, no inherited descriptors beyond 0-2, and
		// default signal handling: a blocked or ignored SIGTERM in this process
		// would otherwise make `terminate()` wait for its SIGKILL.
		posix_spawnattr_setflags(
			&attributes,
			Int16(POSIX_SPAWN_SETPGROUP | POSIX_SPAWN_CLOEXEC_DEFAULT | POSIX_SPAWN_SETSIGMASK | POSIX_SPAWN_SETSIGDEF)
		)
		posix_spawnattr_setpgroup(&attributes, 0)
		var noSignals = sigset_t()
		sigemptyset(&noSignals)
		posix_spawnattr_setsigmask(&attributes, &noSignals)
		var allSignals = sigset_t()
		sigfillset(&allSignals)
		posix_spawnattr_setsigdefault(&attributes, &allSignals)

		let argv = ([executable.path] + arguments).map { strdup($0) } + [nil]
		defer { argv.forEach { free($0) } }

		var pid: pid_t = 0
		let code = posix_spawn(&pid, executable.path, &actions, &attributes, argv, environ)
		try? out.fileHandleForWriting.close()
		try? err.fileHandleForWriting.close()
		guard code == 0 else { throw ProcessError.spawn(executable.lastPathComponent, code) }
		self.pid = pid

		lines = AsyncStream { continuation in
			let group = Task {
				await withTaskGroup(of: Void.self) { tasks in
					for (handle, isError) in [(out.fileHandleForReading, false), (err.fileHandleForReading, true)] {
						tasks.addTask {
							do {
								for try await line in handle.bytes.lines {
									continuation.yield((isError, line))
								}
							} catch {}
						}
					}
				}
				continuation.finish()
			}
			continuation.onTermination = { _ in group.cancel() }
		}

		// `waitpid` blocks, so it runs on a GCD thread: on the cooperative pool, a
		// few concurrent downloads would starve the tasks reading their output.
		let child = pid
		exit = Task {
			await withCheckedContinuation { continuation in
				DispatchQueue.global().async {
					var status: Int32 = 0
					while waitpid(child, &status, 0) == -1, errno == EINTR {}
					// WIFEXITED / WEXITSTATUS, which Swift does not import as functions.
					continuation.resume(returning: (status & 0x7F) == 0 ? (status >> 8) & 0xFF : -1)
				}
			}
		}
	}

	/// The exit status, or -1 when the process was killed by a signal.
	public func wait() async -> Int32 { await exit.value }

	/// SIGTERM to the whole group, then SIGKILL if anything is still alive after 3s.
	public func terminate() {
		let group = pid
		kill(-group, SIGTERM)
		Task.detached {
			try? await Task.sleep(for: .seconds(3))
			kill(-group, SIGKILL)
		}
	}
}

public enum ProcessRunner {
	/// Runs to completion and collects the output.
	public static func run(_ executable: URL, _ arguments: [String]) async throws -> ProcessResult {
		let child = try ChildProcess(executable, arguments)
		var out: [String] = []
		var err: [String] = []
		for await (isError, line) in child.lines {
			if isError { err.append(line) } else { out.append(line) }
		}
		return ProcessResult(
			status: await child.wait(),
			stdout: out.joined(separator: "\n"),
			stderr: err.joined(separator: "\n")
		)
	}
}
