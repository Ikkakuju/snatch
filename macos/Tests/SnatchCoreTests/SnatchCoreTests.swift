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
