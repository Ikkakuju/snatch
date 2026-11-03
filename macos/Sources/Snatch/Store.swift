import AppKit
import Foundation
import Observation
import SnatchCore

struct Job: Codable, Identifiable {
	enum State: Codable, Equatable {
		case queued, running, paused
		case failed(String)
		case done(URL)
	}

	var id = UUID()
	var pageURL: String
	var title: String
	var thumbnail: URL?
	var choice: Choice
	var folder: URL
	var state: State = .queued
	var progress: DownloadProgress?

	var partials: URL { AppPaths.partials.appendingPathComponent(id.uuidString, isDirectory: true) }
}

@MainActor @Observable
final class Store {
	/// Tools are installed only when the user agrees, each when first needed.
	var installed = Set(Component.allCases.filter(Tools.isInstalled))
	var installing: Component?
	var installError: String?
	/// The launch-time yt-dlp update check; nothing may run yt-dlp until it is done.
	var updating = true
	var jobs: [Job] = []

	var probing = false
	var probeError: String?
	var pending: MediaInfo?

	var folder: URL {
		didSet { UserDefaults.standard.set(folder.path, forKey: "folder") }
	}

	var cookies: CookieBrowser {
		didSet { UserDefaults.standard.set(cookies.rawValue, forKey: "cookies") }
	}

	@ObservationIgnored private var runs: [UUID: DownloadRun] = [:]
	/// Runs told to stop that have not exited yet. Their job cannot restart until
	/// they do, or two yt-dlps would write the same `.part` file.
	@ObservationIgnored private var stopping: [UUID: DownloadRun] = [:]
	// ponytail: a fixed two at a time; make it a setting if anyone asks.
	private let maxRunning = 2

	init() {
		let downloads = FileManager.default.urls(for: .downloadsDirectory, in: .userDomainMask)[0]
		folder = UserDefaults.standard.string(forKey: "folder").map { URL(fileURLWithPath: $0) } ?? downloads
		cookies = UserDefaults.standard.string(forKey: "cookies").flatMap(CookieBrowser.init) ?? .none
		jobs = (try? JSONDecoder().decode([Job].self, from: Data(contentsOf: AppPaths.jobs))) ?? []
		// Nothing is running at launch: a job the app quit during waits for Resume.
		for index in jobs.indices where jobs[index].state == .running || jobs[index].state == .queued {
			jobs[index].state = .paused
		}
	}

	private var options: EngineOptions { EngineOptions(cookies: cookies) }

	var canProbe: Bool { installed.contains(.engine) && !updating && !probing }

	/// Saving needs ffmpeg; ask for it once something is waiting to be saved.
	var needsFFmpeg: Bool {
		!installed.contains(.ffmpeg) && jobs.contains { $0.state == .queued }
	}

	// MARK: Tools

	func prepare() async {
		await Tools.updateYtDlpIfDue()
		updating = false
		pump()
	}

	func install(_ component: Component) async {
		guard installing == nil else { return }
		installing = component
		installError = nil
		defer { installing = nil }
		do {
			try await Tools.install(component)
			installed.insert(component)
			pump()
		} catch {
			installError = error.localizedDescription
		}
	}

	// MARK: Resolve

	func probe(_ link: String) async {
		let url = link.trimmingCharacters(in: .whitespacesAndNewlines)
		guard let parsed = URL(string: url), ["http", "https"].contains(parsed.scheme?.lowercased()) else {
			probeError = String(localized: "Paste a link that starts with http:// or https://.")
			return
		}
		probing = true
		probeError = nil
		pending = nil
		defer { probing = false }
		do {
			pending = try await Engine.probe(url, options: options)
		} catch {
			probeError = error.localizedDescription
		}
	}

	func add(_ info: MediaInfo, _ choice: Choice) {
		jobs.insert(
			Job(pageURL: info.pageURL, title: info.title, thumbnail: info.thumbnail, choice: choice, folder: folder),
			at: 0
		)
		pending = nil
		save()
		pump()
	}

	// MARK: Jobs

	func pause(_ id: UUID) {
		guard let index = jobs.firstIndex(where: { $0.id == id }) else { return }
		jobs[index].state = .paused
		stop(id)
		save()
		pump()
	}

	func resume(_ id: UUID) {
		guard let index = jobs.firstIndex(where: { $0.id == id }) else { return }
		jobs[index].state = .queued
		save()
		pump()
	}

	func remove(_ id: UUID) {
		guard let index = jobs.firstIndex(where: { $0.id == id }) else { return }
		let partials = jobs[index].partials
		let run = stop(id)
		jobs.remove(at: index)
		// Delete the partials only once the stopped yt-dlp has let go of them.
		Task {
			await run?.exited()
			try? FileManager.default.removeItem(at: partials)
		}
		save()
		pump()
	}

	func clearFinished() {
		jobs.removeAll { if case .done = $0.state { true } else { false } }
		save()
	}

	func reveal(_ file: URL) {
		NSWorkspace.shared.activateFileViewerSelecting([file])
	}

	@discardableResult
	private func stop(_ id: UUID) -> DownloadRun? {
		guard let run = runs.removeValue(forKey: id) else { return nil }
		run.stop()
		stopping[id] = run
		Task {
			await run.exited()
			stopping[id] = nil
			pump()
		}
		return run
	}

	/// Starts queued jobs, oldest first, while there is room.
	private func pump() {
		guard !updating, installed.contains(.engine), installed.contains(.ffmpeg) else { return }
		while runs.count < maxRunning,
			let index = jobs.lastIndex(where: { $0.state == .queued && stopping[$0.id] == nil })
		{
			start(index)
		}
	}

	private func start(_ index: Int) {
		let job = jobs[index]
		do {
			let run = try DownloadRun(
				pageURL: job.pageURL, choice: job.choice, folder: job.folder, partials: job.partials,
				options: options
			)
			runs[job.id] = run
			jobs[index].state = .running
			save()
			Task { await follow(job.id, run) }
		} catch {
			jobs[index].state = .failed(error.localizedDescription)
			save()
		}
	}

	private func follow(_ id: UUID, _ run: DownloadRun) async {
		for await event in run.events {
			// A paused or removed job's run ends with `.failed`; that is not news.
			guard runs[id] === run, let index = jobs.firstIndex(where: { $0.id == id }) else { continue }
			switch event {
			case let .progress(progress):
				jobs[index].progress = progress
			case let .finished(file):
				jobs[index].state = .done(file)
				try? FileManager.default.removeItem(at: jobs[index].partials)
			case let .failed(error):
				jobs[index].state = .failed(error.message)
			}
		}
		if runs[id] === run {
			runs[id] = nil
			save()
			pump()
		}
	}

	private func save() {
		try? FileManager.default.createDirectory(at: AppPaths.support, withIntermediateDirectories: true)
		try? JSONEncoder().encode(jobs).write(to: AppPaths.jobs, options: .atomic)
	}
}
