import Foundation

/// The parts of `yt-dlp -J` Snatch reads. Every field is optional because
/// extractors fill in different subsets.
struct RawInfo: Decodable {
	var id: String?
	var title: String?
	var thumbnail: String?
	var duration: Double?
	var webpage_url: String?
	var formats: [RawFormat]?
	/// A playlist; Snatch takes its first entry.
	var entries: [RawInfo]?
}

struct RawFormat: Decodable {
	var format_id: String?
	var ext: String?
	var height: Int?
	var width: Int?
	var vcodec: String?
	var acodec: String?
	var tbr: Double?
	var abr: Double?
	var filesize: Double?
	var filesize_approx: Double?

	var size: Double? { filesize ?? filesize_approx }
	var hasVideo: Bool { vcodec != "none" }
	var hasAudio: Bool { acodec != nil && acodec != "none" }
}

public struct MediaInfo: Sendable, Equatable {
	public var title: String
	public var thumbnail: URL?
	public var duration: Double?
	/// The page to download from: the original link, or a playlist's first entry.
	public var pageURL: String
	public var choices: [Choice]
}

public struct Choice: Codable, Sendable, Equatable, Identifiable, Hashable {
	public enum Kind: String, Codable, Sendable { case video, audio }
	public var id: String
	public var kind: Kind
	/// `1080p`, `Best`, `MP3`.
	public var label: String
	public var sizeEstimate: Double?
	/// yt-dlp arguments that pick and convert this format.
	public var arguments: [String]
}

/// yt-dlp's default order puts AV1/VP9 + Opus first, which merges into an mp4
/// QuickTime refuses to play; prefer H.264 + AAC so files open everywhere.
private let mp4Arguments = [
	"-S", "vcodec:h264,res,acodec:m4a", "--merge-output-format", "mp4", "--remux-video", "mp4",
]

public enum MediaError: LocalizedError {
	case unreadable

	public var errorDescription: String? { "yt-dlp returned metadata Snatch could not read." }
}

/// The picker for a `yt-dlp -J` document: one row per resolution, tallest first,
/// then MP3.
func mediaInfo(fromJSON data: Data, pageURL: String) throws -> MediaInfo {
	guard var info = try? JSONDecoder().decode(RawInfo.self, from: data) else {
		throw MediaError.unreadable
	}
	var page = pageURL
	if let first = info.entries?.first {
		page = first.webpage_url ?? pageURL
		info = first
	}
	return MediaInfo(
		title: info.title ?? "Untitled",
		thumbnail: info.thumbnail.flatMap(URL.init(string:)),
		duration: info.duration,
		pageURL: page,
		choices: choices(for: info.formats ?? [])
	)
}

/// The name people know a resolution by: the short side of a 16:9 frame, so a
/// 3840×1920 video reads as 2160p and a vertical 1080×1920 as 1080p.
func qualityLabel(height: Int, width: Int?) -> String {
	guard let width else { return "\(height)p" }
	let long = max(width, height)
	let short = min(width, height)
	return "\(max(short, Int((Double(long) * 9 / 16).rounded())))p"
}

func choices(for formats: [RawFormat]) -> [Choice] {
	let bestAudio = formats.filter { $0.hasAudio && ($0.vcodec == nil || $0.vcodec == "none") }
		.max { ($0.abr ?? $0.tbr ?? 0) < ($1.abr ?? $1.tbr ?? 0) }

	// An unknown vcodec still counts as video: some sites leave it blank.
	let videos = formats.filter { $0.hasVideo && $0.height != nil }
	let heights = Set(videos.compactMap(\.height)).sorted(by: >).prefix(8)

	var result: [Choice] = heights.map { height in
		let best = videos.filter { $0.height == height }.max { score($0) < score($1) }
		let size = best?.size.map { $0 + (best?.hasAudio == true ? 0 : bestAudio?.size ?? 0) }
		return Choice(
			id: "v\(height)",
			kind: .video,
			label: qualityLabel(height: height, width: best?.width),
			sizeEstimate: size,
			arguments: ["-f", "bv*[height=\(height)]+ba/b[height=\(height)]/bv*[height<=\(height)]+ba/b"]
				+ mp4Arguments
		)
	}
	if result.isEmpty {
		result.append(
			Choice(id: "vbest", kind: .video, label: "Best", sizeEstimate: nil,
			       arguments: ["-f", "bv*+ba/b"] + mp4Arguments))
	}
	result.append(
		Choice(id: "mp3", kind: .audio, label: "MP3", sizeEstimate: bestAudio?.size,
		       arguments: ["-f", "ba/b", "-x", "--audio-format", "mp3", "--audio-quality", "0"]))
	return result
}

private func score(_ format: RawFormat) -> Double {
	var score = format.tbr ?? 0
	if format.ext == "mp4" { score += 10_000 }
	if format.vcodec?.hasPrefix("avc") == true { score += 5_000 }
	return score
}
