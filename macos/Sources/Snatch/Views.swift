import AppKit
import SnatchCore
import SwiftUI

/// snatchvideos.com's palette (`--color-brand`, `--color-ink`, the logo gradient).
enum Brand {
	static let accent = Color(hex: 0xA78BFA)
	static let light = Color(hex: 0xC4B5FD)
	static let ink = Color(hex: 0x000000)
	static let sidebar = Color(hex: 0x000000)
	static let surface = Color.white.opacity(0.04)
	static let stroke = Color.white.opacity(0.12)
	static let gradient = LinearGradient(
		colors: [Color(hex: 0xA78BFA), Color(hex: 0xC4B5FD)], startPoint: .leading, endPoint: .trailing
	)
}

extension Color {
	init(hex: UInt32) {
		self.init(
			red: Double(hex >> 16 & 0xFF) / 255, green: Double(hex >> 8 & 0xFF) / 255,
			blue: Double(hex & 0xFF) / 255
		)
	}
}

@main
struct SnatchApp: App {
	@State private var store = Store()
	@State private var browser = Browser()

	var body: some Scene {
		Window("Snatch", id: "main") {
			RootView()
				.environment(store)
				.environment(browser)
				.task { await store.prepare() }
				.tint(Brand.accent)
				// ponytail: dark only, like the website; add a light palette if anyone asks.
				.preferredColorScheme(.dark)
		}
		.windowStyle(.hiddenTitleBar)
		.defaultSize(width: 1040, height: 700)
		.commands {
			CommandGroup(replacing: .appSettings) {
				Button("Settings…") { store.section = .settings }
					.keyboardShortcut(",")
			}
			CommandGroup(replacing: .help) {
				Button("Snatch Help") { openHelp("https://github.com/Ikkakuju/snatch#readme") }
				Button("Report an Issue") { openHelp("https://github.com/Ikkakuju/snatch/issues") }
			}
			CommandMenu("Downloads") {
				Button("Paste Link and Get") { Task { await store.pasteAndGet() } }
					.keyboardShortcut("v", modifiers: [.command, .shift])
				Button("Resume All") { store.resumeAll() }
					.keyboardShortcut("r", modifiers: [.command, .shift])
				Button("Open Downloads Folder") { NSWorkspace.shared.open(store.folder) }
					.keyboardShortcut("o", modifiers: [.command, .shift])
				Divider()
				Button("All Downloads") { store.section = .all }
					.keyboardShortcut("1", modifiers: .command)
				Button("In Progress") { store.section = .inProgress }
					.keyboardShortcut("2", modifiers: .command)
				Button("Finished") { store.section = .finished }
					.keyboardShortcut("3", modifiers: .command)
				Button("Browse") { store.section = .browse }
					.keyboardShortcut("4", modifiers: .command)
			}
		}
	}
}

struct RootView: View {
	@Environment(Store.self) private var store

	var body: some View {
		HStack(spacing: 0) {
			Sidebar().frame(width: 230)
			Rectangle().fill(Brand.stroke).frame(width: 1)
			Group {
				switch store.section {
				case .settings: SettingsPage()
				case .browse: BrowsePage()
				default: DownloadsPage(section: store.section)
				}
			}
			.frame(maxWidth: .infinity, maxHeight: .infinity)
			.background(Brand.ink)
		}
		.ignoresSafeArea()
		.frame(minWidth: 760, minHeight: 480)
		// "Drop one on this window" has to mean the window, not just the grid.
		.dropDestination(for: URL.self) { urls, _ in
			guard let url = urls.first else { return false }
			switch store.section {
			case .browse, .settings: return false
			default: break
			}
			let text = url.absoluteString
			store.linkDraft = text
			// Before yt-dlp exists a drop cannot resolve: keep it for the install to pick up.
			if store.canProbe {
				Task { await store.probe(text) }
			} else {
				store.deferredLink = text
			}
			return true
		}
	}
}

// MARK: - Sidebar

struct Sidebar: View {
	@Environment(Store.self) private var store

	var body: some View {
		VStack(alignment: .leading, spacing: 4) {
			HStack(spacing: 10) {
				Image(nsImage: NSApp.applicationIconImage)
					.resizable()
					.frame(width: 34, height: 34)
				VStack(alignment: .leading, spacing: 1) {
					Text("Snatch").font(.headline)
					Text(
						store.jobs.count == 1
							? String(localized: "1 download")
							: String(localized: "\(store.jobs.count) downloads")
					)
					.font(.caption)
					.foregroundStyle(.secondary)
				}
			}
			.padding(.horizontal, 10)
			.padding(.top, 44)
			.padding(.bottom, 18)

			heading("Downloads")
			row(.all, "All Downloads", "square.stack")
			row(.inProgress, "In Progress", "arrow.down.circle")
			row(.finished, "Finished", "checkmark.circle")
			heading("Find Videos").padding(.top, 14)
			row(.browse, "Browse", "globe", count: false)
			heading("Settings").padding(.top, 14)
			row(.settings, "General", "gearshape", count: false)

			Spacer()
			Link(destination: URL(string: "https://github.com/Ikkakuju/snatch")!) {
				Label("Free and open source", systemImage: "chevron.left.forwardslash.chevron.right")
					.font(.callout)
			}
			.buttonStyle(.plain)
			.foregroundStyle(.secondary)
			.padding(10)
			.padding(.bottom, 6)
		}
		.padding(.horizontal, 10)
		.frame(maxHeight: .infinity, alignment: .top)
		.background(Brand.sidebar)
	}

	private func heading(_ title: LocalizedStringKey) -> some View {
		Text(title)
			.font(.caption.weight(.semibold))
			// `.tertiary` is ~30% white on #100E18 — about 2.2:1, below AA for text.
			.foregroundStyle(.secondary)
			.padding(.horizontal, 10)
			.padding(.bottom, 2)
	}

	private func row(
		_ item: SidebarItem, _ title: LocalizedStringKey, _ symbol: String, count: Bool = true
	) -> some View {
		let selected = store.section == item
		return Button {
			store.section = item
		} label: {
			HStack(spacing: 10) {
				Image(systemName: symbol)
					.foregroundStyle(selected ? Brand.light : .secondary)
					.frame(width: 20)
				Text(title).fontWeight(selected ? .semibold : .regular)
				Spacer()
				if count, store.count(item) > 0 {
					Text("\(store.count(item))").font(.caption.monospacedDigit()).foregroundStyle(.secondary)
				}
			}
			.padding(.horizontal, 10)
			.padding(.vertical, 7)
			.frame(minHeight: 32)
			.background(
				selected ? Brand.accent.opacity(0.22) : .clear, in: RoundedRectangle(cornerRadius: 8)
			)
			.contentShape(Rectangle())
		}
		.buttonStyle(.plain)
	}
}

// MARK: - Downloads

struct DownloadsPage: View {
	@Environment(Store.self) private var store
	@Environment(Browser.self) private var browser
	let section: SidebarItem

	private var jobs: [Job] { store.jobs.filter(section.includes) }

	var body: some View {
		ScrollView {
			VStack(spacing: 24) {
				LinkBar()
				notices
				if let info = store.pending {
					ChoicePicker(info: info) { store.linkDraft = "" }
				}
				if jobs.isEmpty {
					if store.installed.contains(.engine) {
						ContentUnavailableView(
							emptyTitle,
							systemImage: "arrow.down.circle",
							description: Text("Paste a video link above, or drop one on this window.")
						)
						.padding(.top, 60)
					} else {
						FirstRunGuide().padding(.top, 12)
					}
				} else {
					grid
				}
			}
			.padding(.horizontal, 32)
			.padding(.vertical, 28)
			.frame(maxWidth: 1200)
			.frame(maxWidth: .infinity)
		}
	}

	private var emptyTitle: LocalizedStringKey {
		switch section {
		case .inProgress: "Nothing downloading"
		case .finished: "No finished downloads"
		default: "No downloads yet"
		}
	}

	@ViewBuilder private var notices: some View {
		if store.pausedAtLaunch > 0 {
			HStack(spacing: 12) {
				Label(
					"Snatch quit while downloading. \(store.pausedAtLaunch) paused.",
					systemImage: "pause.circle"
				)
				.font(.callout)
				.foregroundStyle(.secondary)
				Spacer()
				Button("Resume All") { store.resumeAll() }
					.buttonStyle(.borderedProminent)
			}
			.frame(maxWidth: 760, alignment: .leading)
		}
		if store.needsFFmpeg {
			InstallCard(
				component: .ffmpeg, title: "Install ffmpeg to save videos",
				detail: "ffmpeg joins video and audio into one MP4 and converts audio to MP3. About 56 MB, checked against its SHA-256. Waiting downloads start once it is ready."
			)
		}
		if let error = store.probeError {
			VStack(alignment: .leading, spacing: 10) {
				Label(error, systemImage: "exclamationmark.triangle.fill")
					.foregroundStyle(.red)
					.textSelection(.enabled)
				if let page = store.unreadablePage {
					HStack(spacing: 12) {
						Text("yt-dlp can't read this site. Open the page in the built-in browser, play the video, then click Download Video.")
							.font(.callout)
							.foregroundStyle(.secondary)
						Spacer()
						Button("Open in Browser") {
							store.probeError = nil
							store.unreadablePage = nil
							store.section = .browse
							browser.go(page.absoluteString)
						}
						.buttonStyle(.borderedProminent)
					}
				}
			}
			.frame(maxWidth: 760, alignment: .leading)
		}
	}

	private var grid: some View {
		VStack(alignment: .leading, spacing: 14) {
			if section != .inProgress, store.jobs.contains(where: \.isDone) {
				HStack {
					Spacer()
					Button("Clear Finished") { store.clearFinished() }
						.buttonStyle(.borderless)
				}
			}
			LazyVGrid(
				columns: [GridItem(.adaptive(minimum: 240, maximum: 380), spacing: 24, alignment: .top)],
				spacing: 28
			) {
				ForEach(jobs) { JobCard(job: $0) }
			}
		}
	}
}

struct LinkBar: View {
	@Environment(Store.self) private var store
	@FocusState private var focused: Bool

	var body: some View {
		@Bindable var store = store
		HStack(spacing: 12) {
			Image(systemName: "link").foregroundStyle(.secondary)
			TextField("Paste a video link, or drop one here", text: $store.linkDraft)
				.textFieldStyle(.plain)
				.font(.title3)
				.focused($focused)
				.onSubmit(submit)
			if store.probing {
				ProgressView().controlSize(.small).padding(.trailing, 12)
			} else {
				Button(action: submit) {
					Text("Get")
						.font(.headline)
						.foregroundStyle(.black)
						.padding(.horizontal, 22)
						.padding(.vertical, 8)
						.frame(minHeight: 36)
						.background(Brand.gradient, in: Capsule())
				}
				.buttonStyle(.plain)
				.keyboardShortcut(.defaultAction)
				.disabled(!store.canProbe || store.linkDraft.isEmpty)
				.opacity(!store.canProbe || store.linkDraft.isEmpty ? 0.45 : 1)
			}
		}
		.padding(.leading, 20)
		.padding(.trailing, 8)
		.padding(.vertical, 4)
		.frame(minHeight: 50)
		.background(Brand.surface, in: Capsule())
		.overlay(Capsule().strokeBorder(Brand.stroke))
		.frame(maxWidth: 760)
		// The window opens ready to paste: the whole point of the app is one gesture.
		.onAppear { focused = true }
		.onChange(of: store.section) { _, _ in focused = true }
	}

	private func submit() {
		guard store.canProbe, !store.linkDraft.isEmpty else { return }
		Task { await store.probe(store.linkDraft) }
	}
}

/// The real first launch: nothing installed yet, so the empty state teaches the one
/// thing it can do — install yt-dlp — instead of asking for a link it cannot resolve.
struct FirstRunGuide: View {
	@Environment(Store.self) private var store

	var body: some View {
		VStack(alignment: .leading, spacing: 16) {
			VStack(alignment: .leading, spacing: 6) {
				Text("Three steps to your first video").font(.title3.weight(.semibold))
				Text(
					"Snatch bundles nothing, so it downloads its tools on first use. About 55 MB for yt-dlp and QuickJS, checked against their SHA-256 before they run."
				)
				.font(.callout)
				.foregroundStyle(.secondary)
				.fixedSize(horizontal: false, vertical: true)
			}
			step(1, "Install yt-dlp.") {
				if store.installing == .engine {
					ProgressView().controlSize(.small)
				} else {
					Button("Install yt-dlp") { Task { await store.install(.engine) } }
						.buttonStyle(.borderedProminent)
						.disabled(store.installing != nil)
				}
			}
			step(2, "Paste a video link above, or drop one on this window.") { EmptyView() }
			step(3, "Pick a quality. ffmpeg asks to install the first time you save.") { EmptyView() }
			if let error = store.installError {
				Text(error)
					.font(.callout)
					.foregroundStyle(.red)
					.textSelection(.enabled)
			}
		}
		.padding(18)
		.background(Brand.surface, in: RoundedRectangle(cornerRadius: 14))
		.overlay(RoundedRectangle(cornerRadius: 14).strokeBorder(Brand.stroke))
		.frame(maxWidth: 760, alignment: .leading)
	}

	private func step(
		_ number: Int, _ text: LocalizedStringKey, @ViewBuilder accessory: () -> some View
	) -> some View {
		HStack(alignment: .center, spacing: 12) {
			Text("\(number)")
				.font(.caption.weight(.semibold).monospacedDigit())
				.foregroundStyle(number == 1 ? Brand.light : .secondary)
				.padding(.horizontal, 5)
				.frame(minWidth: 22, minHeight: 22)
				.background(Brand.accent.opacity(0.18), in: Circle())
				.accessibilityHidden(true)
			Text(text)
				.foregroundStyle(number == 1 ? .primary : .secondary)
				.frame(maxWidth: .infinity, alignment: .leading)
			accessory()
		}
	}
}


/// Asks before downloading a tool: nothing is fetched without the user's go-ahead.
struct InstallCard: View {
	@Environment(Store.self) private var store
	let component: Component
	let title: LocalizedStringKey
	let detail: LocalizedStringKey

	var body: some View {
		HStack(alignment: .top, spacing: 14) {
			Image(systemName: "shippingbox.fill")
				.font(.title2)
				.foregroundStyle(.tint)
				.frame(minWidth: 40, minHeight: 40)
				.background(.tint.opacity(0.15), in: RoundedRectangle(cornerRadius: 10))
			VStack(alignment: .leading, spacing: 4) {
				Text(title).font(.headline)
				Text(detail).font(.callout).foregroundStyle(.secondary)
					.fixedSize(horizontal: false, vertical: true)
				if let error = store.installError {
					Text(error).font(.callout).foregroundStyle(.red).textSelection(.enabled)
				}
			}
			Spacer()
			if store.installing == component {
				ProgressView().controlSize(.small).padding(.top, 8)
			} else {
				Button("Install") { Task { await store.install(component) } }
					.buttonStyle(.borderedProminent)
					.disabled(store.installing != nil)
			}
		}
		.padding(16)
		.background(Brand.surface, in: RoundedRectangle(cornerRadius: 14))
		.overlay(RoundedRectangle(cornerRadius: 14).strokeBorder(Brand.stroke))
		.frame(maxWidth: 760)
	}
}

struct ChoicePicker: View {
	@Environment(Store.self) private var store
	let info: MediaInfo
	let onPick: () -> Void

	var body: some View {
		HStack(alignment: .top, spacing: 16) {
			Thumbnail(url: info.thumbnail)
				.frame(width: 192, height: 108)
			VStack(alignment: .leading, spacing: 10) {
				HStack(alignment: .firstTextBaseline) {
					Text(info.title).font(.headline).lineLimit(2)
					Spacer()
					Button {
						store.pending = nil
					} label: {
						Image(systemName: "xmark")
					}
					.buttonStyle(.borderless)
					.help("Close")
					.accessibilityLabel(Text("Close"))
				}
				if let duration = info.duration {
					Text(formatTime(duration)).font(.caption.monospacedDigit()).foregroundStyle(.secondary)
				}
				LazyVGrid(
					columns: [GridItem(.adaptive(minimum: 130), alignment: .leading)], alignment: .leading
				) {
					ForEach(info.choices) { choice in
						Button {
							store.add(info, choice)
							onPick()
						} label: {
							HStack(spacing: 6) {
								Image(systemName: choice.kind == .video ? "film" : "music.note")
								Text(choice.label)
								if let size = choice.sizeEstimate {
									Text("~" + formatBytes(size)).foregroundStyle(.secondary)
								}
							}
							.frame(maxWidth: .infinity, alignment: .leading)
						}
						.controlSize(.large)
					}
				}
			}
		}
		.padding(16)
		.background(Brand.surface, in: RoundedRectangle(cornerRadius: 14))
		.overlay(RoundedRectangle(cornerRadius: 14).strokeBorder(Brand.stroke))
		.frame(maxWidth: 760)
	}
}

struct JobCard: View {
	@Environment(Store.self) private var store
	let job: Job
	@State private var hovering = false
	@State private var confirmingRemove = false

	/// A finished row is only a record; anything else still owns a partials folder.
	private var deletesPartials: Bool {
		if case .done = job.state { return false }
		return true
	}

	private func requestRemove() {
		if deletesPartials {
			confirmingRemove = true
		} else {
			store.remove(job.id)
		}
	}

	var body: some View {
		VStack(alignment: .leading, spacing: 8) {
			Thumbnail(url: job.thumbnail)
				.aspectRatio(16 / 9, contentMode: .fit)
				.overlay(alignment: .bottom) { progressBar }
				.overlay(alignment: .topLeading) { badge }
				// Always drawn, never gated on hover: a hover-only control does not exist
				// for the keyboard or VoiceOver, and pausing must not need a steady hand.
				.overlay(alignment: .topTrailing) { actions.opacity(hovering ? 1 : 0.6) }
				.overlay {
					RoundedRectangle(cornerRadius: 10)
						.strokeBorder(hovering ? Brand.accent.opacity(0.8) : Brand.stroke, lineWidth: hovering ? 2 : 1)
				}
			HStack(spacing: 6) {
				Chip(text: job.choice.label)
				Spacer()
				Text(status)
					.font(.caption.monospacedDigit())
					.foregroundStyle(.secondary)
					.lineLimit(1)
			}
			Text(job.title).font(.headline).lineLimit(2)
			if case let .done(file) = job.state {
				// The post-download question is always "where did it go", so answer it
				// on the card instead of behind a hover icon.
				Button { store.reveal(file) } label: {
					Label(file.lastPathComponent, systemImage: "folder")
						.font(.caption)
						.lineLimit(1)
						.frame(maxWidth: .infinity, alignment: .leading)
				}
				.buttonStyle(.plain)
				.foregroundStyle(.secondary)
				.help("Show in Finder")
			}
			if case let .failed(message) = job.state {
				Text(message)
					.font(.caption)
					.foregroundStyle(.red)
					.lineLimit(3)
					.textSelection(.enabled)
			}
		}
		.contentShape(Rectangle())
		.onHover { hovering = $0 }
		.onTapGesture(count: 2) { if case let .done(file) = job.state { store.open(file) } }
		.contextMenu { menu }
		.help(job.title)
		.confirmationDialog("Remove this download?", isPresented: $confirmingRemove) {
			Button("Remove", role: .destructive) { store.remove(job.id) }
		} message: {
			Text("Its partial download is deleted. A finished video stays in your folder.")
		}
	}

	private var fraction: Double? {
		switch job.state {
		case .running, .paused: job.progress?.fraction ?? 0
		default: nil
		}
	}

	@ViewBuilder private var progressBar: some View {
		if let fraction {
			GeometryReader { geometry in
				Capsule()
					.fill(job.state == .paused ? AnyShapeStyle(.secondary) : AnyShapeStyle(Brand.gradient))
					.frame(width: max(4, geometry.size.width * fraction))
			}
			.frame(height: 4)
			.background(.black.opacity(0.4), in: Capsule())
			.padding(8)
		}
	}

	@ViewBuilder private var badge: some View {
		switch job.state {
		case .queued: Badge(text: "Waiting", symbol: "clock")
		case .running: EmptyView()
		case .paused: Badge(text: "Paused", symbol: "pause.fill")
		case .failed: Badge(text: "Failed", symbol: "exclamationmark.triangle.fill")
		case .done: Badge(text: "Saved", symbol: "checkmark.circle.fill", tint: .green)
		}
	}

	private var actions: some View {
		HStack(spacing: 6) {
			switch job.state {
			case .queued, .running:
				CircleButton(symbol: "pause.fill", help: "Pause") { store.pause(job.id) }
			case .paused:
				CircleButton(symbol: "arrow.clockwise", help: "Resume") { store.resume(job.id) }
			case .failed:
				CircleButton(symbol: "arrow.clockwise", help: "Try Again") { store.resume(job.id) }
			case let .done(file):
				CircleButton(symbol: "magnifyingglass", help: "Show in Finder") { store.reveal(file) }
			}
			CircleButton(symbol: "xmark", help: "Remove") { requestRemove() }
		}
		.padding(8)
	}

	@ViewBuilder private var menu: some View {
		switch job.state {
		case .queued, .running:
			Button("Pause") { store.pause(job.id) }
		case .paused:
			Button("Resume") { store.resume(job.id) }
		case .failed:
			Button("Try Again") { store.resume(job.id) }
		case let .done(file):
			Button("Open") { store.open(file) }
			Button("Show in Finder") { store.reveal(file) }
		}
		Button("Copy Link") {
			NSPasteboard.general.clearContents()
			NSPasteboard.general.setString(job.pageURL, forType: .string)
		}
		Divider()
		Button("Remove", role: .destructive) { requestRemove() }
	}

	private var status: String {
		switch job.state {
		case .queued: return job.duration.map(formatTime) ?? ""
		case .running:
			guard let progress = job.progress else { return String(localized: "Starting…") }
			// Past 100%, yt-dlp is merging or converting with ffmpeg.
			if progress.fraction == 1 { return String(localized: "Processing…") }
			var parts: [String] = []
			if let fraction = progress.fraction { parts.append(percent(fraction)) }
			if let speed = progress.speed { parts.append(formatBytes(speed) + "/s") }
			if let eta = progress.eta { parts.append(formatTime(eta)) }
			return parts.joined(separator: " · ")
		case .paused: return job.progress?.fraction.map(percent) ?? ""
		case .failed: return ""
		case .done:
			guard let bytes = job.savedBytes else { return String(localized: "Saved") }
			return formatBytes(Double(bytes)) + " · " + String(localized: "Saved")
		}
	}

	private func percent(_ fraction: Double) -> String {
		fraction.formatted(.percent.precision(.fractionLength(0)))
	}
}

struct Chip: View {
	let text: String

	var body: some View {
		Text(text)
			.font(.caption2.weight(.semibold))
			.padding(.horizontal, 6)
			.padding(.vertical, 2)
			.overlay(RoundedRectangle(cornerRadius: 4).strokeBorder(Brand.light.opacity(0.6)))
			.foregroundStyle(Brand.light)
	}
}

struct Badge: View {
	let text: LocalizedStringKey
	let symbol: String
	var tint: Color = .primary

	var body: some View {
		Label(text, systemImage: symbol)
			.font(.caption.weight(.semibold))
			.foregroundStyle(tint)
			.padding(.horizontal, 8)
			.padding(.vertical, 4)
			.background(.ultraThinMaterial, in: Capsule())
			.padding(8)
	}
}

struct CircleButton: View {
	let symbol: String
	let help: LocalizedStringKey
	let action: () -> Void

	var body: some View {
		Button(action: action) {
			Image(systemName: symbol)
				.font(.system(.caption2, weight: .bold))
				.padding(6)
				.frame(minWidth: 26, minHeight: 26)
				.background(.ultraThinMaterial, in: Circle())
				.contentShape(Circle())
		}
		.buttonStyle(.plain)
		.help(help)
		// .help is a tooltip; VoiceOver needs a label of its own.
		.accessibilityLabel(Text(help))
	}
}

struct Thumbnail: View {
	let url: URL?

	var body: some View {
		Brand.surface
			.overlay {
				AsyncImage(url: url) { image in
					image.resizable().aspectRatio(contentMode: .fill)
				} placeholder: {
					Image(systemName: "film").font(.title).foregroundStyle(.secondary)
				}
			}
			.clipShape(RoundedRectangle(cornerRadius: 10))
	}
}

// MARK: - Settings

struct SettingsPage: View {
	@Environment(Store.self) private var store
	@Environment(Browser.self) private var browser
	@State private var confirmingClear = false

	var body: some View {
		@Bindable var store = store
		Form {
			Section("Downloads") {
				LabeledContent("At a time") {
					Stepper(value: $store.maxRunning, in: 1...4) {
						Text("\(store.maxRunning)")
					}
				}
				LabeledContent("Save to") {
					HStack {
						Text(store.folder.path)
							.lineLimit(1)
							.truncationMode(.middle)
							.foregroundStyle(.secondary)
						Button("Choose…", action: chooseFolder)
					}
				}
			}
			Section {
				Picker("Use browser sign-in", selection: $store.cookies) {
					ForEach(CookieBrowser.allCases) { Text($0.label).tag($0) }
				}
			} header: {
				Text("Network")
			} footer: {
				Text("Only needed for members-only or age-restricted videos. Safari needs Full Disk Access for Snatch in System Settings → Privacy & Security.")
					.foregroundStyle(.secondary)
			}
			Section {
				LabeledContent("Sign-ins") {
					Button("Clear Sign-ins…") { confirmingClear = true }
				}
			} header: {
				Text("Built-in Browser")
			} footer: {
				Text("Sites you sign in to under Browse stay signed in, and their downloads use that sign-in.")
					.foregroundStyle(.secondary)
			}
			.confirmationDialog("Clear the built-in browser's sign-ins?", isPresented: $confirmingClear) {
				Button("Clear", role: .destructive) { Task { await browser.clearData() } }
			} message: {
				Text("You'll be signed out of every site, and its history and caches are cleared too.")
			}
			Section {
				ComponentRow(
					name: "yt-dlp", symbol: "arrow.down.circle", component: .engine,
					version: store.ytDlpVersion, canUpdate: true
				)
				ComponentRow(name: "FFmpeg", symbol: "film", component: .ffmpeg, version: Tools.ffmpegVersion)
				ComponentRow(name: "QuickJS", symbol: "curlybraces", component: .engine, version: Tools.quickJSVersion)
			} header: {
				Text("Components")
			} footer: {
				VStack(alignment: .leading, spacing: 4) {
					if let message = store.updateMessage {
						Text(message)
					}
					Text("Installed in Snatch's own folder and checked against a SHA-256 before they run. yt-dlp updates itself once a day.")
				}
				.foregroundStyle(.secondary)
			}
			Section("About") {
				LabeledContent("Version", value: appVersion)
				LabeledContent("Source code") {
					Link("GitHub ↗", destination: URL(string: "https://github.com/Ikkakuju/snatch")!)
				}
			}
		}
		.formStyle(.grouped)
		.scrollContentBackground(.hidden)
		.frame(maxWidth: 720)
		.frame(maxWidth: .infinity)
	}

	private var appVersion: String {
		Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "dev"
	}

	private func chooseFolder() {
		let panel = NSOpenPanel()
		panel.canChooseDirectories = true
		panel.canChooseFiles = false
		panel.canCreateDirectories = true
		panel.directoryURL = store.folder
		if panel.runModal() == .OK, let url = panel.url { store.folder = url }
	}
}

struct ComponentRow: View {
	@Environment(Store.self) private var store
	let name: String
	let symbol: String
	let component: Component
	let version: String?
	var canUpdate = false

	private var installed: Bool { store.installed.contains(component) }

	var body: some View {
		HStack(spacing: 12) {
			Image(systemName: symbol)
				.foregroundStyle(installed ? Brand.light : .secondary)
				.frame(minWidth: 32, minHeight: 32)
				.background(
					(installed ? Brand.accent : Color.secondary).opacity(0.2),
					in: RoundedRectangle(cornerRadius: 8)
				)
			VStack(alignment: .leading, spacing: 2) {
				Text(name)
				Text(installed ? (version ?? "—") : String(localized: "Not installed"))
					.font(.caption)
					.foregroundStyle(.secondary)
				if store.failedComponent == component, let error = store.installError {
					Text(error)
						.font(.caption)
						.foregroundStyle(.red)
						.textSelection(.enabled)
						.fixedSize(horizontal: false, vertical: true)
				}
			}
			Spacer()
			if !installed {
				if store.installing == component {
					ProgressView().controlSize(.small)
				} else {
					Button("Install") { Task { await store.install(component) } }
						.disabled(store.installing != nil)
				}
			} else if canUpdate {
				if store.updating {
					ProgressView().controlSize(.small)
				} else {
					Button("Check for Updates") { Task { await store.checkForUpdate() } }
						.disabled(store.isDownloading)
						.help(
							store.isDownloading
								? "Pause downloads to update yt-dlp."
								: "Check yt-dlp for a new release."
						)
				}
			}
		}
	}
}

func formatBytes(_ bytes: Double) -> String {
	Int64(bytes).formatted(.byteCount(style: .file))
}

/// The Help menu's destinations: the app ships no bundled documentation.
func openHelp(_ address: String) {
	if let url = URL(string: address) { NSWorkspace.shared.open(url) }
}

func formatTime(_ seconds: Double) -> String {
	let duration = Duration.seconds(Int(seconds.rounded()))
	return seconds >= 3600
		? duration.formatted(.time(pattern: .hourMinuteSecond))
		: duration.formatted(.time(pattern: .minuteSecond))
}
