import CryptoKit
import Foundation

/// Where Snatch keeps the tools it downloads, partial files and its download list.
public enum AppPaths {
	public static let support: URL = {
		let base = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
		return base.appendingPathComponent("Snatch", isDirectory: true)
	}()
	public static let bin = support.appendingPathComponent("bin", isDirectory: true)
	/// yt-dlp writes `.part` files and fragments here, one folder per job, and only
	/// moves the finished file into the download folder.
	public static let partials = support.appendingPathComponent("partials", isDirectory: true)
	public static let jobs = support.appendingPathComponent("downloads.json")

	/// yt-dlp's unpacked macOS build: a launcher next to `_internal`, which starts
	/// faster than the one-file build because nothing is extracted on each run.
	public static var ytDlpFolder: URL { bin.appendingPathComponent("yt-dlp", isDirectory: true) }
	public static var ytDlp: URL { ytDlpFolder.appendingPathComponent("yt-dlp_macos") }
	public static var ffmpeg: URL { bin.appendingPathComponent("ffmpeg") }
	public static var ffprobe: URL { bin.appendingPathComponent("ffprobe") }
	/// yt-dlp requires the file to be called `qjs`.
	public static var quickJS: URL { bin.appendingPathComponent("qjs") }
}

public enum ToolError: LocalizedError {
	case http(URL, Int)
	case checksum(String)
	case missingChecksum(String)
	case unzip(String)

	public var errorDescription: String? {
		switch self {
		case let .http(url, status): "Download of \(url.lastPathComponent) failed (HTTP \(status))."
		case let .checksum(name): "\(name) did not match its published checksum."
		case let .missingChecksum(name): "No published checksum for \(name)."
		case let .unzip(name): "Could not unpack \(name)."
		}
	}
}

/// What the user is asked to install, each when it is first needed: the engine to
/// read links, ffmpeg to save them.
public enum Component: Sendable, Hashable, CaseIterable {
	/// yt-dlp, plus QuickJS for YouTube.
	case engine
	/// ffmpeg and ffprobe, which join video and audio and convert to MP3.
	case ffmpeg
}

/// One external program Snatch runs. Nothing is bundled in the app: each tool is
/// downloaded on first launch, checked against a SHA-256 before it is made
/// executable, and kept in Application Support, where yt-dlp can update itself.
struct ToolSpec: Sendable {
	enum Unpack: Sendable, Equatable {
		/// The download is the binary itself.
		case none
		/// Take this one file out of the zip.
		case file(String)
		/// The whole zip is the tool.
		case folder
	}

	let name: String
	let component: Component
	/// What the download becomes: a file, or a folder for `.folder`.
	let destination: URL
	/// The program that has to exist for the tool to count as installed.
	let executable: URL
	let download: URL
	/// A pinned SHA-256, or nil to read it from `checksums`.
	let sha256: String?
	/// A published checksum file listing `<hash>  <asset name>` lines.
	let checksums: URL?
	let assetName: String
	let unpack: Unpack
}

private func gh(_ repo: String, _ asset: String) -> URL {
	URL(string: "https://github.com/\(repo)/releases/latest/download/\(asset)")!
}

// ponytail: ffmpeg is pinned (the build server publishes no checksums); bump the
// URL and hashes together when a newer ffmpeg is needed.
private let ffmpegBase = "https://ffmpeg.martin-riedl.de/download/macos/arm64/1789931890_9.0.2"
private let ffmpegSHA = "c8ed4c4e6978a03c485edbfe4e0a5dc2380f8a30bba5150531b31b094492d924"
private let ffprobeSHA = "fcbe839537485eaee7a7a8bc5cbc0f90d53617e80943e8a5b2e31cb851197ea6"
// ponytail: QuickJS-ng is pinned like ffmpeg (its checksums are only in the GitHub API,
// which rate-limits); yt-dlp needs 0.12.0 or later to stay fast.
private let quickJSURL = "https://github.com/quickjs-ng/quickjs/releases/download/v0.18.0/qjs-darwin-arm64"
private let quickJSSHA = "91fe89916d3b0a6c01c4dc8382a99c3c1fd91ecfc214aa81ca051902bcce590d"

let ytDlpSpec = ToolSpec(
	name: "yt-dlp", component: .engine, destination: AppPaths.ytDlpFolder, executable: AppPaths.ytDlp,
	download: gh("yt-dlp/yt-dlp", "yt-dlp_macos.zip"), sha256: nil,
	checksums: gh("yt-dlp/yt-dlp", "SHA2-256SUMS"), assetName: "yt-dlp_macos.zip", unpack: .folder
)

let toolSpecs: [ToolSpec] = [
	ytDlpSpec,
	ToolSpec(
		name: "ffmpeg", component: .ffmpeg, destination: AppPaths.ffmpeg, executable: AppPaths.ffmpeg,
		download: URL(string: "\(ffmpegBase)/ffmpeg.zip")!, sha256: ffmpegSHA,
		checksums: nil, assetName: "ffmpeg.zip", unpack: .file("ffmpeg")
	),
	ToolSpec(
		name: "ffprobe", component: .ffmpeg, destination: AppPaths.ffprobe, executable: AppPaths.ffprobe,
		download: URL(string: "\(ffmpegBase)/ffprobe.zip")!, sha256: ffprobeSHA,
		checksums: nil, assetName: "ffprobe.zip", unpack: .file("ffprobe")
	),
	// yt-dlp needs a JavaScript runtime to solve YouTube's player challenges.
	ToolSpec(
		name: "QuickJS", component: .engine, destination: AppPaths.quickJS, executable: AppPaths.quickJS,
		download: URL(string: quickJSURL)!, sha256: quickJSSHA,
		checksums: nil, assetName: "qjs-darwin-arm64", unpack: .none
	),
]

public enum Tools {
	public static func isInstalled(_ component: Component) -> Bool {
		toolSpecs.allSatisfy {
			$0.component != component || FileManager.default.isExecutableFile(atPath: $0.executable.path)
		}
	}

	/// Downloads the component's missing tools.
	public static func install(_ component: Component) async throws {
		try FileManager.default.createDirectory(at: AppPaths.bin, withIntermediateDirectories: true)
		for spec in toolSpecs where spec.component == component
			&& !FileManager.default.isExecutableFile(atPath: spec.executable.path)
		{
			try await install(spec)
		}
	}

	/// At most once a day, since site extractors break as sites change. The unpacked
	/// build cannot `yt-dlp -U` itself, so a release whose zip hash differs from the
	/// installed one is downloaded again. Call it while no yt-dlp runs: replacing its
	/// folder under a running one would break it. Offline, nothing changes.
	public static func updateYtDlpIfDue() async {
		let key = "lastYtDlpUpdate"
		guard isInstalled(.engine),
			Date().timeIntervalSince1970 - UserDefaults.standard.double(forKey: key) > 86_400,
			let latest = try? await expectedHash(ytDlpSpec)
		else { return }
		if latest != (try? String(contentsOf: installedHash(ytDlpSpec), encoding: .utf8)) {
			guard (try? await install(ytDlpSpec)) != nil else { return }
		}
		UserDefaults.standard.set(Date().timeIntervalSince1970, forKey: key)
	}

	private static func installedHash(_ spec: ToolSpec) -> URL {
		AppPaths.bin.appendingPathComponent(".\(spec.destination.lastPathComponent).sha256")
	}

	public static func ytDlpVersion() async -> String? {
		guard let result = try? await ProcessRunner.run(AppPaths.ytDlp, ["--version"]) else { return nil }
		return result.stdout.trimmingCharacters(in: .whitespacesAndNewlines)
	}

	private static func install(_ spec: ToolSpec) async throws {
		let (file, response) = try await URLSession.shared.download(from: spec.download)
		defer { try? FileManager.default.removeItem(at: file) }
		if let status = (response as? HTTPURLResponse)?.statusCode, status != 200 {
			throw ToolError.http(spec.download, status)
		}

		let expected = try await expectedHash(spec)
		let actual = try sha256(of: file)
		guard actual == expected else { throw ToolError.checksum(spec.name) }

		let staged = AppPaths.bin.appendingPathComponent(".\(spec.destination.lastPathComponent).new")
		try? FileManager.default.removeItem(at: staged)
		switch spec.unpack {
		case .none: try FileManager.default.moveItem(at: file, to: staged)
		case let .file(entry): try await unzip(file, entry: entry, to: staged, name: spec.name)
		case .folder: try await unzip(file, entry: nil, to: staged, name: spec.name)
		}
		let program = spec.unpack == .folder
			? staged.appendingPathComponent(spec.executable.lastPathComponent) : staged
		try FileManager.default.setAttributes([.posixPermissions: 0o755], ofItemAtPath: program.path)
		_ = try? FileManager.default.removeItem(at: spec.destination)
		try FileManager.default.moveItem(at: staged, to: spec.destination)
		try expected.write(to: installedHash(spec), atomically: true, encoding: .utf8)
	}

	private static func expectedHash(_ spec: ToolSpec) async throws -> String {
		if let pinned = spec.sha256 { return pinned }
		guard let list = spec.checksums else { throw ToolError.missingChecksum(spec.name) }
		let (data, response) = try await URLSession.shared.data(from: list)
		if let status = (response as? HTTPURLResponse)?.statusCode, status != 200 {
			throw ToolError.http(list, status)
		}
		guard let hash = checksum(in: String(decoding: data, as: UTF8.self), for: spec.assetName) else {
			throw ToolError.missingChecksum(spec.name)
		}
		return hash
	}

	/// Unpacks `zip` and moves `entry` out of it to `destination`, or the whole
	/// unpacked folder when `entry` is nil.
	private static func unzip(_ zip: URL, entry: String?, to destination: URL, name: String) async throws {
		let dir = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
		defer { try? FileManager.default.removeItem(at: dir) }
		let ditto = try await ProcessRunner.run(
			URL(fileURLWithPath: "/usr/bin/ditto"), ["-x", "-k", zip.path, dir.path])
		let extracted = entry.map { dir.appendingPathComponent($0) } ?? dir
		guard ditto.status == 0, FileManager.default.fileExists(atPath: extracted.path) else {
			throw ToolError.unzip(name)
		}
		try FileManager.default.moveItem(at: extracted, to: destination)
	}
}

/// The hash listed for `asset` in a `<hash>  <name>` checksum file (`*name` for binary mode).
func checksum(in list: String, for asset: String) -> String? {
	for line in list.split(whereSeparator: \.isNewline) {
		let parts = line.split(separator: " ", omittingEmptySubsequences: true)
		guard parts.count == 2 else { continue }
		let name = parts[1].hasPrefix("*") ? parts[1].dropFirst() : parts[1]
		if name == asset { return parts[0].lowercased() }
	}
	return nil
}

func sha256(of file: URL) throws -> String {
	let handle = try FileHandle(forReadingFrom: file)
	defer { try? handle.close() }
	var hasher = SHA256()
	while let chunk = try handle.read(upToCount: 1 << 20), !chunk.isEmpty {
		hasher.update(data: chunk)
	}
	return hasher.finalize().map { String(format: "%02x", $0) }.joined()
}
