import AppKit
import Foundation
import Observation
import SnatchCore
import UserNotifications

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
	var duration: Double?
	var choice: Choice
	var folder: URL
	var state: State = .queued
	var progress: DownloadProgress?
	/// Set for a stream found by the built-in browser.
	var browser: BrowserContext?
	/// Bytes of the finished file, when known.
	var savedBytes: Int64?

	var partials: URL { AppPaths.partials.appendingPathComponent(id.uuidString, isDirectory: true) }

	var isDone: Bool { if case .done = state { true } else { false } }
}

/// What the sidebar shows.
enum SidebarItem: Hashable {
	case all, inProgress, finished, browse, settings

	func includes(_ job: Job) -> Bool {
		switch self {
		case .all: true
		case .inProgress: !job.isDone
		case .finished: job.isDone
		case .browse, .settings: false
		}
	}
}

@MainActor @Observable
final class Store {
	/// Tools are installed only when the user agrees, each when first needed.
	var installed = Set(Component.allCases.filter(Tools.isInstalled))
	var installing: Component?
	var installError: String?
	/// Whose install failed, so Settings can show the error next to that row.
	var failedComponent: Component?
	/// Jobs that were mid-download when the app quit; the notice counts the ones still paused.
	var launchPaused: Set<UUID> = []
	/// Derived, so a resumed or removed job cannot leave a stale count on screen.
	var pausedAtLaunch: Int {
		jobs.filter { launchPaused.contains($0.id) && $0.state == .paused }.count
	}
	/// The launch-time yt-dlp update check; nothing may run yt-dlp until it is done.
	var updating = true
	var ytDlpVersion: String?
	/// The outcome of the last "Check for Updates", shown under the components.
	var updateMessage: String?

	var section: SidebarItem = .all
	var jobs: [Job] = []

	var probing = false
	var probeError: String?
	/// What the link bar holds.
	var linkDraft = ""
	/// A link that arrived before yt-dlp was installed: probed as soon as it is.
	var deferredLink: String?
	/// A pasted page yt-dlp could not read: the built-in browser may still find its video.
	var unreadablePage: URL?
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
	/// How many downloads may run at once; edited in Settings.
	var maxRunning: Int {
		didSet {
			if maxRunning < 1 { maxRunning = 1; return }
			if maxRunning > 4 { maxRunning = 4; return }
			UserDefaults.standard.set(maxRunning, forKey: "maxRunning")
			pump()
		}
	}

	init() {
		let downloads = FileManager.default.urls(for: .downloadsDirectory, in: .userDomainMask)[0]
		folder = UserDefaults.standard.string(forKey: "folder").map { URL(fileURLWithPath: $0) } ?? downloads
		cookies = UserDefaults.standard.string(forKey: "cookies").flatMap(CookieBrowser.init) ?? .none
		maxRunning = UserDefaults.standard.object(forKey: "maxRunning") as? Int ?? 2
		jobs = (try? JSONDecoder().decode([Job].self, from: Data(contentsOf: AppPaths.jobs))) ?? []
		// Nothing is running at launch: a job the app quit during waits for Resume.
		for index in jobs.indices where jobs[index].state == .running || jobs[index].state == .queued {
			jobs[index].state = .paused
			launchPaused.insert(jobs[index].id)
		}
	}


	var isDownloading: Bool { jobs.contains { $0.state == .running } }

	func count(_ section: SidebarItem) -> Int { jobs.filter(section.includes).count }

	var canProbe: Bool { installed.contains(.engine) && !updating && !probing }

	/// Saving needs ffmpeg; ask for it once something is waiting to be saved.
	var needsFFmpeg: Bool {
		!installed.contains(.ffmpeg) && jobs.contains { $0.state == .queued }
	}

	// MARK: Tools

	func prepare() async {
		await Tools.updateYtDlpIfDue()
		updating = false
		ytDlpVersion = await Tools.ytDlpVersion()
		await probeDeferredLink()
		pump()
	}

	/// A manual yt-dlp update; only between downloads, since it replaces yt-dlp's folder.
	func checkForUpdate() async {
		guard !updating, !isDownloading, !probing else { return }
		updating = true
		updateMessage = nil
		do {
			let updated = try await Tools.updateYtDlp()
			ytDlpVersion = await Tools.ytDlpVersion()
			updateMessage = updated
				? String(localized: "Updated to \(ytDlpVersion ?? "the latest version").")
				: String(localized: "yt-dlp is up to date.")
		} catch {
			updateMessage = error.localizedDescription
		}
		updating = false
		await probeDeferredLink()
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
			failedComponent = nil
			if component == .engine {
				ytDlpVersion = await Tools.ytDlpVersion()
				await probeDeferredLink()
			}
			pump()
		} catch {
			installError = error.localizedDescription
			failedComponent = component
		}
	}

	/// A link that arrived while yt-dlp was being installed or updated.
	private func probeDeferredLink() async {
		guard let link = deferredLink, !updating, installed.contains(.engine) else { return }
		deferredLink = nil
		await probe(link)
	}

	// MARK: Resolve

	/// Where `pending` came from, when that was the built-in browser.
	private var pendingBrowser: BrowserContext?

	/// Reads `link` with yt-dlp. A stream from the built-in browser is fetched as that
	/// browser (its cookies must be exported first) and titled after its page.
	func probe(_ link: String, browser: BrowserContext? = nil, thumbnail: URL? = nil) async {
		let url = link.trimmingCharacters(in: .whitespacesAndNewlines)
		guard let parsed = URL(string: url), ["http", "https"].contains(parsed.scheme?.lowercased()) else {
			probeError = String(localized: "Paste a link that starts with http:// or https://.")
			return
		}
		// The daily yt-dlp check replaces the binary; probing through it reads a half-written tree.
		guard !updating else {
			deferredLink = url
			return
		}
		guard !probing else { return }
		probing = true
		probeError = nil
		unreadablePage = nil
		pending = nil
		defer { probing = false }
		do {
			var info = try await Engine.probe(
				url, options: EngineOptions(cookies: cookies, browser: browser, browserCookies: liveCookieJar)
			)
			if let browser {
				info.title = browser.title
				info.thumbnail = info.thumbnail ?? thumbnail
			}
			pendingBrowser = browser
			pending = info
		} catch {
			probeError = error.localizedDescription
			if browser == nil { unreadablePage = parsed }
		}
	}

	func add(_ info: MediaInfo, _ choice: Choice) {
		jobs.insert(
			Job(
				pageURL: info.pageURL, title: info.title, thumbnail: info.thumbnail, duration: info.duration,
				choice: choice, folder: folder, browser: pendingBrowser
			),
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
		launchPaused.remove(id)
		save()
		pump()
	}

	/// Resumes every paused or failed job, for the Downloads menu.
	func resumeAll() {
		for index in jobs.indices {
			switch jobs[index].state {
			case .paused, .failed: jobs[index].state = .queued
			default: break
			}
		}
		launchPaused.removeAll()
		save()
		pump()
	}

	/// The Downloads menu's Paste Link and Get: the clipboard becomes the link bar's
	/// contents, then resolves. Without yt-dlp it waits for the install instead of failing.
	func pasteAndGet() async {
		guard let text = NSPasteboard.general.string(forType: .string) else { return }
		linkDraft = text
		guard canProbe else {
			deferredLink = text
			return
		}
		await probe(text)
	}

	func remove(_ id: UUID) {
		guard let index = jobs.firstIndex(where: { $0.id == id }) else { return }
		let partials = jobs[index].partials
		let run = stop(id)
		launchPaused.remove(id)
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
		jobs.removeAll(where: \.isDone)
		save()
	}

	/// The exported jar, when it still exists: a resumed job may outlive it.
	private var liveCookieJar: URL? {
		FileManager.default.fileExists(atPath: AppPaths.browserCookies.path)
			? AppPaths.browserCookies : nil
	}

	/// Browser jobs share one jar; keep it while any of them can still run, then delete it.
	private func discardBrowserCookiesIfUnused() {
		let needed = jobs.contains { job in
			guard job.browser != nil else { return false }
			if case .done = job.state { return false }
			return true
		}
		if !needed { try? FileManager.default.removeItem(at: AppPaths.browserCookies) }
	}

	func reveal(_ file: URL) {
		NSWorkspace.shared.activateFileViewerSelecting([file])
	}

	func open(_ file: URL) {
		NSWorkspace.shared.open(file)
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
				// ponytail: a resumed browser job reuses the last exported cookies; export
				// again here if sites start expiring them between pause and resume.
				options: EngineOptions(cookies: cookies, browser: job.browser, browserCookies: liveCookieJar)
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
				let size = (try? FileManager.default.attributesOfItem(atPath: file.path))?[.size] as? NSNumber
				jobs[index].savedBytes = size?.int64Value
				try? FileManager.default.removeItem(at: jobs[index].partials)
				Notifier.downloadFinished(jobs[index].title)
			case let .failed(error):
				jobs[index].state = .failed(error.message)
			}
		}
		if runs[id] === run {
			runs[id] = nil
			save()
			discardBrowserCookiesIfUnused()
			pump()
		}
	}

	private func save() {
		try? FileManager.default.createDirectory(
			at: AppPaths.support, withIntermediateDirectories: true,
			attributes: [.posixPermissions: 0o700]
		)
		try? JSONEncoder().encode(jobs).write(to: AppPaths.jobs, options: .atomic)
	}
}

/// One system notification per finished download, so a queued batch that finishes in
/// the background says so. A bare `swift run` binary has no bundle identifier and
/// cannot notify, so it stays silent instead of asking for permission it cannot use.
@MainActor
enum Notifier {
	private static var ready = false

	static func downloadFinished(_ title: String) {
		guard Bundle.main.bundleIdentifier != nil else { return }
		if ready {
			post(title)
			return
		}
		UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound]) {
			granted, _ in
			guard granted else { return }
			Task { @MainActor in
				ready = true
				post(title)
			}
		}
	}

	private static func post(_ title: String) {
		let content = UNMutableNotificationContent()
		content.title = String(localized: "Saved")
		content.body = title
		UNUserNotificationCenter.current().add(
			UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: nil)
		)
	}
}
