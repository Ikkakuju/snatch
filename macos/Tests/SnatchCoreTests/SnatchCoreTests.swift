import Foundation
import Testing

@testable import SnatchCore

@Test func choicesListEachResolutionTallestFirstThenMP3() throws {
	let json = """
		{"title":"Clip","duration":61,"formats":[
		 {"format_id":"a","vcodec":"none","acodec":"mp4a.40.2","abr":128,"filesize":1000},
		 {"format_id":"a2","vcodec":"none","acodec":"opus","abr":160,"filesize":1200},
		 {"format_id":"v1","vcodec":"avc1","acodec":"none","height":720,"width":1280,"ext":"mp4","tbr":2000,"filesize":5000},
		 {"format_id":"v2","vcodec":"vp9","acodec":"none","height":1080,"width":1920,"ext":"webm","tbr":3000},
		 {"format_id":"v3","vcodec":"avc1","acodec":"none","height":1920,"width":1080,"ext":"mp4","tbr":4000}
		]}
		"""
	let info = try mediaInfo(fromJSON: Data(json.utf8), pageURL: "https://example.com/v")
	#expect(info.title == "Clip")
	// A 1920-tall vertical video reads as 1080p, like the 1080-tall landscape one.
	#expect(info.choices.map(\.label) == ["1080p", "1080p", "720p", "MP3"])
	#expect(info.choices.first?.id == "v1920")
	// The 720p row adds the best audio's size to the video-only stream's.
	#expect(info.choices.first { $0.id == "v720" }?.sizeEstimate == 6200)
	#expect(info.choices.last?.kind == .audio)
}

@Test func playlistTakesItsFirstEntry() throws {
	let json = #"{"title":"List","entries":[{"title":"First","webpage_url":"https://example.com/1"}]}"#
	let info = try mediaInfo(fromJSON: Data(json.utf8), pageURL: "https://example.com/list")
	#expect(info.title == "First")
	#expect(info.pageURL == "https://example.com/1")
	#expect(info.choices.map(\.id) == ["vbest", "mp3"])
}

@Test func unreadableMetadataThrows() {
	#expect(throws: MediaError.self) { try mediaInfo(fromJSON: Data("[]".utf8), pageURL: "x") }
}

@Test func progressLinesParseAndNAIsUnknown() {
	#expect(parseProgress("[snatch] 50/200/10.5/15") == DownloadProgress(downloaded: 50, total: 200, speed: 10.5, eta: 15))
	#expect(parseProgress("[snatch] 50/NA/NA/NA") == DownloadProgress(downloaded: 50, total: nil, speed: nil, eta: nil))
	#expect(parseProgress("[download] 50%") == nil)
	#expect(DownloadProgress(downloaded: 300, total: 200).fraction == 1)
}

@Test func checksumFileLookup() {
	let list = "abc  yt-dlp_macos\nDEF *yt-dlp.exe\n"
	#expect(checksum(in: list, for: "yt-dlp_macos") == "abc")
	#expect(checksum(in: list, for: "yt-dlp.exe") == "def")
	#expect(checksum(in: list, for: "yt-dlp") == nil)
}

@Test func engineErrorPrefersTheErrorLine() {
	#expect(engineError(from: ["noise", "ERROR: [youtube] x: Private video", "trailing"]).message
		== "[youtube] x: Private video")
	#expect(engineError(from: []).message == "yt-dlp stopped without saying why.")
}

@Test func terminateStopsTheWholeProcessGroup() async throws {
	// A shell that starts a grandchild, like yt-dlp starting ffmpeg.
	let child = try ChildProcess(URL(fileURLWithPath: "/bin/sh"), ["-c", "sleep 30 & echo $!; wait"])
	var grandchild: pid_t = 0
	for await (_, line) in child.lines {
		grandchild = pid_t(line) ?? 0
		break
	}
	#expect(grandchild > 0)
	child.terminate()
	#expect(await child.wait() == -1)
	try await Task.sleep(for: .milliseconds(200))
	#expect(kill(grandchild, 0) == -1)
}

@Test func runCollectsOutputAndStatus() async throws {
	let result = try await ProcessRunner.run(URL(fileURLWithPath: "/bin/sh"), ["-c", "echo out; echo err >&2; exit 3"])
	#expect(result.status == 3)
	#expect(result.stdout == "out")
	#expect(result.stderr == "err")
}

@Test func browserCookiesExportAsNetscapeLines() throws {
	let session = try #require(HTTPCookie(properties: [
		.domain: ".example.com", .path: "/", .name: "cf_clearance", .value: "abc", .secure: "TRUE",
	]))
	let signIn = try #require(HTTPCookie(properties: [
		.domain: "example.com", .path: "/app", .name: "sid", .value: "x y",
		// Within 400 days: HTTPCookie caps longer expiries.
		.expires: Date(timeIntervalSince1970: 1_800_000_000),
	]))
	let lines = netscapeCookieFile([session, signIn]).split(separator: "\n")
	#expect(lines[0] == "# Netscape HTTP Cookie File")
	#expect(lines[1] == ".example.com\tTRUE\t/\tTRUE\t0\tcf_clearance\tabc")
	#expect(lines[2] == "example.com\tFALSE\t/app\tFALSE\t1800000000\tsid\tx y")
}

@Test func browserDownloadsAreNamedAfterTheirPage() {
	let options = EngineOptions(cookies: .safari, browser: BrowserContext(referer: "https://a.test/v", title: "50% off: a/b"))
	let choice = Choice(id: "best", kind: .video, label: "Best", sizeEstimate: nil, arguments: [])
	let args = Engine.downloadArguments(
		pageURL: "https://cdn.test/index.m3u8", choice: choice, folder: URL(fileURLWithPath: "/tmp"),
		partials: URL(fileURLWithPath: "/tmp/p"), options: options
	)
	#expect(args.contains("50%% off- a-b%(height& [{}p]|)s.%(ext)s"))
	#expect(args.contains("--referer") && args.contains("--cookies"))
	#expect(!args.contains("--cookies-from-browser"))
}
