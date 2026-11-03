import AppKit
import SnatchCore
import SwiftUI

@main
struct SnatchApp: App {
	@State private var store = Store()

	var body: some Scene {
		Window("Snatch", id: "main") {
			ContentView()
				.environment(store)
				.task { await store.prepare() }
		}
		.defaultSize(width: 720, height: 560)

		Settings {
			SettingsView().environment(store)
		}
	}
}

struct ContentView: View {
	@Environment(Store.self) private var store
	@State private var link = ""

	var body: some View {
		VStack(spacing: 0) {
			VStack(alignment: .leading, spacing: 12) {
				LinkField(link: $link)
				if !store.installed.contains(.engine) {
					InstallCard(
						component: .engine, title: "Install yt-dlp to get started",
						detail: "Snatch reads video links with yt-dlp, the open-source downloader, plus QuickJS for YouTube. About 55 MB, checked against its SHA-256 before it runs."
					)
				} else if store.needsFFmpeg {
					InstallCard(
						component: .ffmpeg, title: "Install ffmpeg to save videos",
						detail: "ffmpeg joins video and audio into one MP4 and converts audio to MP3. About 56 MB, checked against its SHA-256. Waiting downloads start once it is ready."
					)
				}
				if let error = store.probeError {
					Label(error, systemImage: "xmark.octagon").foregroundStyle(.red).textSelection(.enabled)
				}
				if let info = store.pending {
					ChoicePicker(info: info) { link = "" }
				}
			}
			.padding()

			Divider()

			if store.jobs.isEmpty {
				ContentUnavailableView(
					"No downloads yet",
					systemImage: "arrow.down.circle",
					description: Text("Paste a video link above, or drop one on this window.")
				)
			} else {
				List(store.jobs) { job in JobRow(job: job) }
					.listStyle(.inset)
			}
		}
		.frame(minWidth: 560, minHeight: 420)
		.dropDestination(for: URL.self) { urls, _ in
			guard let url = urls.first, store.canProbe else { return false }
			link = url.absoluteString
			Task { await store.probe(link) }
			return true
		}
		.toolbar {
			if store.jobs.contains(where: { if case .done = $0.state { true } else { false } }) {
				Button("Clear Finished") { store.clearFinished() }
			}
		}
	}
}

struct LinkField: View {
	@Environment(Store.self) private var store
	@Binding var link: String

	var body: some View {
		HStack {
			TextField("Paste a video link", text: $link)
				.textFieldStyle(.roundedBorder)
				.onSubmit(submit)
			Button(action: submit) {
				if store.probing {
					ProgressView().controlSize(.small)
				} else {
					Text("Get")
				}
			}
			.keyboardShortcut(.defaultAction)
			.disabled(!store.canProbe || link.isEmpty)
		}
	}

	private func submit() {
		guard store.canProbe, !link.isEmpty else { return }
		Task { await store.probe(link) }
	}
}

/// Asks before downloading a tool: nothing is fetched without the user's go-ahead.
struct InstallCard: View {
	@Environment(Store.self) private var store
	let component: Component
	let title: LocalizedStringKey
	let detail: LocalizedStringKey

	var body: some View {
		HStack(alignment: .top, spacing: 12) {
			Image(systemName: "shippingbox").font(.title2).foregroundStyle(.tint)
			VStack(alignment: .leading, spacing: 4) {
				Text(title).font(.headline)
				Text(detail).font(.callout).foregroundStyle(.secondary).fixedSize(horizontal: false, vertical: true)
				if let error = store.installError {
					Text(error).font(.callout).foregroundStyle(.red).textSelection(.enabled)
				}
			}
			Spacer()
			if store.installing == component {
				ProgressView().controlSize(.small)
			} else {
				Button("Install") { Task { await store.install(component) } }
					.buttonStyle(.borderedProminent)
					.disabled(store.installing != nil)
			}
		}
		.padding(12)
		.background(.quaternary.opacity(0.5), in: RoundedRectangle(cornerRadius: 10))
	}
}

struct ChoicePicker: View {
	@Environment(Store.self) private var store
	let info: MediaInfo
	let onPick: () -> Void

	var body: some View {
		HStack(alignment: .top, spacing: 12) {
			Thumbnail(url: info.thumbnail).frame(width: 128, height: 72)
			VStack(alignment: .leading, spacing: 8) {
				Text(info.title).font(.headline).lineLimit(2)
				if let duration = info.duration {
					Text(formatTime(duration)).font(.caption).foregroundStyle(.secondary)
				}
				FlowButtons(choices: info.choices) { choice in
					store.add(info, choice)
					onPick()
				}
			}
			Spacer()
			Button {
				store.pending = nil
			} label: {
				Image(systemName: "xmark")
			}
			.buttonStyle(.borderless)
			.help("Close")
		}
		.padding(12)
		.background(.quaternary.opacity(0.5), in: RoundedRectangle(cornerRadius: 10))
	}
}

struct FlowButtons: View {
	let choices: [Choice]
	let pick: (Choice) -> Void

	var body: some View {
		LazyVGrid(columns: [GridItem(.adaptive(minimum: 120), alignment: .leading)], alignment: .leading) {
			ForEach(choices) { choice in
				Button { pick(choice) } label: {
					HStack(spacing: 4) {
						Image(systemName: choice.kind == .video ? "film" : "music.note")
						Text(choice.label)
						if let size = choice.sizeEstimate {
							Text("~" + formatBytes(size)).foregroundStyle(.secondary)
						}
					}
					.frame(maxWidth: .infinity, alignment: .leading)
				}
			}
		}
	}
}

struct JobRow: View {
	@Environment(Store.self) private var store
	let job: Job

	var body: some View {
		HStack(spacing: 12) {
			Thumbnail(url: job.thumbnail).frame(width: 80, height: 45)
			VStack(alignment: .leading, spacing: 4) {
				Text(job.title).lineLimit(1)
				status
			}
			Spacer()
			actions
		}
		.padding(.vertical, 4)
	}

	@ViewBuilder private var status: some View {
		switch job.state {
		case .queued:
			Text("Waiting · \(job.choice.label)").font(.caption).foregroundStyle(.secondary)
		case .running:
			if let progress = job.progress {
				ProgressView(value: progress.fraction ?? 0).progressViewStyle(.linear)
				Text(progressText(progress)).font(.caption.monospacedDigit()).foregroundStyle(.secondary)
			} else {
				ProgressView().progressViewStyle(.linear)
				Text("Starting · \(job.choice.label)").font(.caption).foregroundStyle(.secondary)
			}
		case .paused:
			Text("Paused · \(job.choice.label)").font(.caption).foregroundStyle(.secondary)
		case let .failed(message):
			Text(message).font(.caption).foregroundStyle(.red).lineLimit(2).textSelection(.enabled)
		case let .done(file):
			Text(file.lastPathComponent).font(.caption).foregroundStyle(.secondary).lineLimit(1)
		}
	}

	@ViewBuilder private var actions: some View {
		HStack(spacing: 8) {
			switch job.state {
			case .queued, .running:
				iconButton("pause.fill", help: "Pause") { store.pause(job.id) }
			case .paused, .failed:
				iconButton("arrow.clockwise", help: "Resume") { store.resume(job.id) }
			case let .done(file):
				iconButton("magnifyingglass", help: "Show in Finder") { store.reveal(file) }
			}
			iconButton("xmark", help: "Remove") { store.remove(job.id) }
		}
	}

	private func iconButton(_ symbol: String, help: LocalizedStringKey, action: @escaping () -> Void) -> some View {
		Button(action: action) { Image(systemName: symbol) }
			.buttonStyle(.borderless)
			.help(help)
	}

	private func progressText(_ progress: DownloadProgress) -> String {
		// Past 100%, yt-dlp is merging or converting with ffmpeg.
		if progress.fraction == 1 { return String(localized: "Processing…") }
		var parts = [formatBytes(progress.downloaded) + (progress.total.map { " / " + formatBytes($0) } ?? "")]
		if let speed = progress.speed { parts.append(formatBytes(speed) + "/s") }
		if let eta = progress.eta { parts.append(String(localized: "\(formatTime(eta)) left")) }
		return parts.joined(separator: " · ")
	}
}

struct Thumbnail: View {
	let url: URL?

	var body: some View {
		AsyncImage(url: url) { image in
			image.resizable().aspectRatio(contentMode: .fill)
		} placeholder: {
			Image(systemName: "film").foregroundStyle(.tertiary)
				.frame(maxWidth: .infinity, maxHeight: .infinity)
				.background(.quaternary)
		}
		.clipShape(RoundedRectangle(cornerRadius: 6))
	}
}

struct SettingsView: View {
	@Environment(Store.self) private var store
	@State private var version: String?

	var body: some View {
		@Bindable var store = store
		Form {
			LabeledContent("Save to") {
				HStack {
					Text(store.folder.path).lineLimit(1).truncationMode(.middle)
					Button("Choose…", action: chooseFolder)
				}
			}
			Picker("Use cookies from", selection: $store.cookies) {
				ForEach(CookieBrowser.allCases) { Text($0.label).tag($0) }
			}
			Text("Lets sign-in-only and age-restricted videos download. Safari needs Full Disk Access for Snatch in System Settings → Privacy & Security.")
				.font(.caption).foregroundStyle(.secondary)
			LabeledContent("yt-dlp", value: version ?? "—")
		}
		.formStyle(.grouped)
		.frame(width: 480)
		.task { version = await Tools.ytDlpVersion() }
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

func formatBytes(_ bytes: Double) -> String {
	Int64(bytes).formatted(.byteCount(style: .file))
}

func formatTime(_ seconds: Double) -> String {
	let duration = Duration.seconds(Int(seconds.rounded()))
	return seconds >= 3600
		? duration.formatted(.time(pattern: .hourMinuteSecond))
		: duration.formatted(.time(pattern: .minuteSecond))
}
