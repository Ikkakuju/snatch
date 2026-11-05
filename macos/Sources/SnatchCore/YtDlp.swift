import Foundation

/// A browser yt-dlp can read cookies from, so sign-in-only videos work.
public enum CookieBrowser: String, CaseIterable, Codable, Sendable, Identifiable {
	case none, safari, chrome, firefox, edge, brave, vivaldi, opera, chromium
	public var id: String { rawValue }
	public var label: String {
		self == .none ? "None" : rawValue.prefix(1).uppercased() + rawValue.dropFirst()
	}
	var argument: String? { self == .none ? nil : rawValue }
}

/// The built-in browser's identity. yt-dlp sends the same one: a site's sign-in or
/// Cloudflare clearance cookie can be tied to the browser that earned it.
public enum BrowserIdentity {
	public static let userAgent =
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15"
}

/// A stream found by the built-in browser: fetched with the browser's cookies, its
/// page as referer, and named after that page, since a bare `.m3u8` is titled "index".
public struct BrowserContext: Codable, Sendable, Equatable, Hashable {
	public var referer: String
	public var title: String
	public init(referer: String, title: String) {
		self.referer = referer
		self.title = title
	}
}

public struct EngineOptions: Sendable {
	public var cookies: CookieBrowser
	public var browser: BrowserContext?
	/// The exported jar, or nil when there is none to read. Passed in rather than probed
	/// from disk so the arguments stay a pure function of the options.
	public var browserCookies: URL?
	public init(cookies: CookieBrowser, browser: BrowserContext? = nil, browserCookies: URL? = nil) {
		self.cookies = cookies
		self.browser = browser
		self.browserCookies = browserCookies
	}

	var common: [String] {
		var args = [
			"--no-playlist", "--playlist-items", "1",
			"--ffmpeg-location", AppPaths.bin.path,
			"--js-runtimes", "quickjs:\(AppPaths.quickJS.path)",
			"--no-warnings",
		]
		if let browser {
			// A resumed job can outlive the jar (Clear Sign-ins, a wiped support folder);
			// yt-dlp treats a missing --cookies path as fatal, so only pass a real one.
			if let jar = browserCookies {
				args += ["--cookies", jar.path]
			}
			args += [
				"--referer", browser.referer,
				"--user-agent", BrowserIdentity.userAgent,
			]
		} else if let browser = cookies.argument {
			args += ["--cookies-from-browser", browser]
		}
		return args
	}
}

public struct EngineError: LocalizedError {
	public let message: String
	public var errorDescription: String? { message }
}

/// The last `ERROR:` line yt-dlp printed, without its prefix, or the last line at all.
func engineError(from stderr: [String]) -> EngineError {
	let line = stderr.last { $0.hasPrefix("ERROR:") } ?? stderr.last { !$0.isEmpty }
	let message = line.map { $0.replacingOccurrences(of: "ERROR: ", with: "") }
	return EngineError(message: message ?? "yt-dlp stopped without saying why.")
}

public enum Engine {
	public static func probe(_ url: String, options: EngineOptions) async throws -> MediaInfo {
		// A page yt-dlp cannot parse must not leave the link bar spinning for ever.
		let result = try await ProcessRunner.run(
			AppPaths.ytDlp, options.common + ["-J", "--", url], limit: .seconds(90)
		)
		if result.timedOut {
			throw EngineError(message: "yt-dlp took too long to read this page.")
		}
		guard result.status == 0 else {
			throw engineError(from: result.stderr.components(separatedBy: "\n"))
		}
		return try mediaInfo(fromJSON: Data(result.stdout.utf8), pageURL: url)
	}

	/// Arguments for one job. Partial files go to `partials`, so a paused or removed
	/// job never leaves `.part` files in the download folder; rerunning the same
	/// command resumes them.
	static func downloadArguments(
		pageURL: String, choice: Choice, folder: URL, partials: URL, options: EngineOptions
	) -> [String] {
		// ` [720p]` only when the height is known, never ` [NAp]`.
		let title = options.browser.map { literalTitle($0.title) } ?? "%(title).150B"
		let name = choice.kind == .video ? "\(title)%(height& [{}p]|)s.%(ext)s" : "\(title).%(ext)s"
		return options.common + choice.arguments + [
			"-P", "home:\(folder.path)", "-P", "temp:\(partials.path)",
			"-o", name,
			"--newline", "--progress",
			"--progress-template", "download:\(progressPrefix)%(progress.downloaded_bytes)s/%(progress.total_bytes,progress.total_bytes_estimate)s/%(progress.speed)s/%(progress.eta)s",
			"--print", "after_move:\(filePrefix)%(filepath)s",
			"--", pageURL,
		]
	}
}

/// `title` as literal output-template text: `%` escaped, no path separators, at most
/// 150 characters.
func literalTitle(_ title: String) -> String {
	let clean = title.trimmingCharacters(in: .whitespacesAndNewlines)
		.replacingOccurrences(of: "/", with: "-").replacingOccurrences(of: ":", with: "-")
	return String((clean.isEmpty ? "video" : clean).prefix(150)).replacingOccurrences(of: "%", with: "%%")
}

/// `cookies` as a Netscape cookie file, the format `yt-dlp --cookies` reads.
/// A field with a tab or newline would forge a row for another domain.
func jarField(_ value: String) -> String {
	value.replacingOccurrences(of: "\t", with: " ").replacingOccurrences(of: "\n", with: " ")
		.replacingOccurrences(of: "\r", with: " ")
}

public func netscapeCookieFile(_ cookies: [HTTPCookie]) -> String {
	var lines = ["# Netscape HTTP Cookie File"]
	for cookie in cookies {
		let domain = (cookie.isHTTPOnly ? "#HttpOnly_" : "") + jarField(cookie.domain)
		let expires = cookie.expiresDate.map { String(Int($0.timeIntervalSince1970)) } ?? "0"
		lines.append([
			domain, cookie.domain.hasPrefix(".") ? "TRUE" : "FALSE", jarField(cookie.path),
			cookie.isSecure ? "TRUE" : "FALSE", expires, jarField(cookie.name), jarField(cookie.value),
		].joined(separator: "\t"))
	}
	return lines.joined(separator: "\n") + "\n"
}

let progressPrefix = "[snatch] "
let filePrefix = "[snatch-file] "

public struct DownloadProgress: Sendable, Equatable, Codable {
	public var downloaded: Double
	public var total: Double?
	public var speed: Double?
	public var eta: Double?
	public var fraction: Double? { total.flatMap { $0 > 0 ? min(1, downloaded / $0) : nil } }
}

/// One `--progress-template` line; yt-dlp prints `NA` for a field it does not know.
func parseProgress(_ line: String) -> DownloadProgress? {
	guard line.hasPrefix(progressPrefix) else { return nil }
	let fields = line.dropFirst(progressPrefix.count).split(separator: "/", omittingEmptySubsequences: false)
		.map { Double($0) }
	guard fields.count == 4, let downloaded = fields[0] else { return nil }
	return DownloadProgress(downloaded: downloaded, total: fields[1], speed: fields[2], eta: fields[3])
}

public enum DownloadEvent: Sendable {
	case progress(DownloadProgress)
	case finished(URL)
	case failed(EngineError)
}

/// A running download. Its events end with `.finished` or `.failed`; `stop()`
/// ends it with `.failed` and leaves the partial files for a resume.
public final class DownloadRun: Sendable {
	public let events: AsyncStream<DownloadEvent>
	private let child: ChildProcess

	public init(
		pageURL: String, choice: Choice, folder: URL, partials: URL, options: EngineOptions
	) throws {
		try FileManager.default.createDirectory(at: partials, withIntermediateDirectories: true)
		let child = try ChildProcess(
			AppPaths.ytDlp,
			Engine.downloadArguments(
				pageURL: pageURL, choice: choice, folder: folder, partials: partials, options: options)
		)
		self.child = child
		events = AsyncStream { continuation in
			let task = Task {
				var file: URL?
				var errors: [String] = []
				for await (isError, line) in child.lines {
					if isError {
						errors.append(line)
					} else if let progress = parseProgress(line) {
						continuation.yield(.progress(progress))
					} else if line.hasPrefix(filePrefix) {
						file = URL(fileURLWithPath: String(line.dropFirst(filePrefix.count)))
					}
				}
				let status = await child.wait()
				// yt-dlp can exit 0 without producing anything (a failed merge), so
				// success is the file existing, not the exit status.
				if status == 0, let file, FileManager.default.fileExists(atPath: file.path) {
					continuation.yield(.finished(file))
				} else {
					continuation.yield(.failed(engineError(from: errors)))
				}
				continuation.finish()
			}
			continuation.onTermination = { _ in task.cancel() }
		}
	}

	public func stop() { child.terminate() }

	/// Returns once yt-dlp and everything it started have exited.
	public func exited() async { _ = await child.wait() }
}
