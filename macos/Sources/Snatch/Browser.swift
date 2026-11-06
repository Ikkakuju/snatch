import AppKit
import SnatchCore
import SwiftUI
import WebKit

/// A stream the page loaded, as the sniffer script reported it.
struct SniffedMedia: Identifiable, Equatable {
	enum Kind: String {
		/// An HLS playlist that lists other playlists, one per quality.
		case hlsMaster
		case hls, dash, file
	}

	var kind: Kind
	var url: URL
	var id: URL { url }

	var label: String {
		let type = switch kind {
		case .hlsMaster, .hls: "HLS"
		case .dash: "DASH"
		case .file: url.pathExtension.uppercased()
		}
		return [type, url.host() ?? ""].filter { !$0.isEmpty }.joined(separator: " · ")
	}
}

/// The built-in browser. Pages open in a real WebKit view, so sign-ins and bot checks
/// work as in Safari; a script reports the streams each page loads, and a download
/// hands one to yt-dlp with this browser's cookies, page and identity.
@MainActor @Observable
final class Browser: NSObject {
	let webView: WKWebView
	var address = ""
	var title = ""
	var page: URL?
	var isLoading = false
	var canGoBack = false
	var canGoForward = false
	var loadError: String?
	/// Everything reported on this page, in order.
	private(set) var found: [SniffedMedia] = []
	/// The page asked for DRM: what it plays is encrypted.
	private(set) var isProtected = false

	/// What to offer: a master playlist already covers its per-quality playlists.
	var media: [SniffedMedia] {
		let hasMaster = found.contains { $0.kind == .hlsMaster }
		return found.filter { !(hasMaster && $0.kind == .hls) }
	}

	override init() {
		let controller = WKUserContentController()
		controller.addUserScript(
			WKUserScript(source: snifferScript, injectionTime: .atDocumentStart, forMainFrameOnly: false)
		)
		let configuration = WKWebViewConfiguration()
		// Persistent, so sites stay signed in between launches.
		configuration.websiteDataStore = .default()
		configuration.userContentController = controller
		webView = WKWebView(frame: .zero, configuration: configuration)
		webView.customUserAgent = BrowserIdentity.userAgent
		webView.allowsBackForwardNavigationGestures = true
		super.init()
		// ponytail: the controller keeps this handler alive and it keeps the web view;
		// fine for the one browser that lives as long as the app.
		controller.add(self, name: "snatch")
		webView.navigationDelegate = self
		webView.uiDelegate = self
	}

	/// Opens `text` as an address, or searches for it.
	func go(_ text: String) {
		let text = text.trimmingCharacters(in: .whitespacesAndNewlines)
		guard !text.isEmpty else { return }
		let url: URL? =
			if text.contains("://") {
				URL(string: text)
			} else if text.contains("."), !text.contains(" ") {
				URL(string: "https://" + text)
			} else {
				URL(string: "https://www.google.com/search")
					.map { $0.appending(queryItems: [URLQueryItem(name: "q", value: text)]) }
			}
		guard let url else { return }
		webView.load(URLRequest(url: url))
	}

	/// Exports the cookies, then reads the stream like a pasted link.
	func download(_ media: SniffedMedia, with store: Store) async {
		await exportCookies(for: [media.url.host(), page?.host()].compactMap { $0 })
		let image = try? await webView.evaluateJavaScript(
			"document.querySelector('meta[property=\"og:image\"]')?.content ?? null"
		) as? String
		let context = BrowserContext(
			referer: page?.absoluteString ?? media.url.absoluteString,
			title: title.isEmpty ? (page?.host() ?? "video") : title
		)
		await store.probe(media.url.absoluteString, browser: context, thumbnail: image.flatMap(URL.init))
	}

	/// Writes the cookies a request to these hosts would carry, where `--cookies` reads
	/// them, readable only by the user: they are live sign-ins, so the jar must not hold
	/// every site the user has ever signed into.
	func exportCookies(for hosts: [String]) async {
		let all = await webView.configuration.websiteDataStore.httpCookieStore.allCookies()
		let cookies = all.filter { cookie in
			hosts.contains { host in
				let name = host.lowercased()
				let domain = cookie.domain.lowercased().trimmingCharacters(in: ["."])
				return name == domain || name.hasSuffix(".\(domain)")
			}
		}
		guard !cookies.isEmpty else { return }
		let file = AppPaths.browserCookies
		try? FileManager.default.createDirectory(
			at: AppPaths.support, withIntermediateDirectories: true,
			attributes: [.posixPermissions: 0o700]
		)
		// Atomic replaces the file (and any symlink at that path) rather than truncating it
		// in place, and the mode is set afterwards because the write creates it 0644.
		try? netscapeCookieFile(cookies).write(to: file, atomically: true, encoding: .utf8)
		try? FileManager.default.setAttributes([.posixPermissions: 0o600], ofItemAtPath: file.path)
	}

	/// Signs out of every site: cookies, storage, history and caches.
	func clearData() async {
		await WKWebsiteDataStore.default().removeData(
			ofTypes: WKWebsiteDataStore.allWebsiteDataTypes(), modifiedSince: .distantPast
		)
		try? FileManager.default.removeItem(at: AppPaths.browserCookies)
		found = []
		isProtected = false
		webView.reload()
	}

	private func sync() {
		page = webView.url
		address = webView.url?.absoluteString ?? address
		title = webView.title ?? ""
		canGoBack = webView.canGoBack
		canGoForward = webView.canGoForward
	}

	private func report(_ kind: String, _ url: String) {
		if kind == "drm" {
			isProtected = true
			return
		}
		guard let kind = SniffedMedia.Kind(rawValue: kind), let url = URL(string: url) else { return }
		if let index = found.firstIndex(where: { $0.url == url }) {
			// The same playlist, now known to be a master.
			if kind == .hlsMaster { found[index].kind = kind }
		} else {
			found.append(SniffedMedia(kind: kind, url: url))
		}
	}
}

extension Browser: WKScriptMessageHandler {
	func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
		guard let body = message.body as? [String: Any], let kind = body["kind"] as? String else { return }
		report(kind, body["url"] as? String ?? "")
	}
}

extension Browser: WKNavigationDelegate, WKUIDelegate {
	func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
		isLoading = true
		loadError = nil
		sync()
	}

	func webView(_ webView: WKWebView, didCommit navigation: WKNavigation!) {
		// A new page: what the last one played is gone.
		found = []
		isProtected = false
		sync()
	}

	func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
		isLoading = false
		sync()
	}

	func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
		failed(error)
	}

	func webView(
		_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error
	) {
		failed(error)
	}

	private func failed(_ error: Error) {
		isLoading = false
		sync()
		// Stopping, or leaving a page before it loaded, is not an error.
		if (error as NSError).code != NSURLErrorCancelled { loadError = error.localizedDescription }
	}

	/// Links that open a new window open here instead.
	func webView(
		_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
		for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures
	) -> WKWebView? {
		if navigationAction.targetFrame == nil { webView.load(navigationAction.request) }
		return nil
	}
}

/// Runs in every frame before the page's own scripts and reports, through the
/// `snatch` message handler, each stream the page loads: HLS and DASH manifests from
/// fetch and XMLHttpRequest, what <video> elements play, and requests that happened
/// before it ran. It also reports a page asking for DRM.
private let snifferScript = """
	(() => {
	  if (window.__snatchSniffer) return;
	  window.__snatchSniffer = true;
	  const handler = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.snatch;
	  if (!handler) return;
	  const seen = new Set();
	  const post = (kind, url) => {
	    if (kind !== "drm") {
	      try { url = new URL(url, location.href).href; } catch (e) { return; }
	      if (!/^https?:/.test(url) || seen.has(kind + " " + url)) return;
	      seen.add(kind + " " + url);
	    }
	    try { handler.postMessage({ kind, url }); } catch (e) {}
	  };
	  const manifest = (url, type) => {
	    let path = "";
	    try { path = new URL(url, location.href).pathname.toLowerCase(); } catch (e) {}
	    type = (type || "").toLowerCase();
	    if (type.includes("mpegurl") || path.endsWith(".m3u8")) return "hls";
	    if (type.includes("dash+xml") || path.endsWith(".mpd")) return "dash";
	    return null;
	  };
	  // A master playlist lists one playlist per quality; it is the one to offer.
	  const playlist = (url, text) =>
	    post(typeof text === "string" && text.includes("#EXT-X-STREAM-INF") ? "hlsMaster" : "hls", url);
	  const response = (url, type, readText) => {
	    const kind = manifest(url, type);
	    if (kind === "hls") Promise.resolve().then(readText).then((t) => playlist(url, t), () => post("hls", url));
	    else if (kind) post(kind, url);
	  };
	  const realFetch = window.fetch;
	  if (realFetch) {
	    window.fetch = function () {
	      const promise = realFetch.apply(this, arguments);
	      promise.then((r) => {
	        try { response(r.url, r.headers.get("content-type"), () => r.clone().text()); } catch (e) {}
	      }, () => {});
	      return promise;
	    };
	  }
	  const open = XMLHttpRequest.prototype.open;
	  XMLHttpRequest.prototype.open = function () {
	    this.addEventListener("load", () => {
	      try {
	        const text = this.responseType === "" || this.responseType === "text" ? this.responseText : null;
	        response(this.responseURL, this.getResponseHeader("content-type"), () => text);
	      } catch (e) {}
	    });
	    return open.apply(this, arguments);
	  };
	  // What a media element plays itself: a file, or (in WebKit) an HLS playlist. A blob:
	  // source is a player feeding it from script; its playlist arrives as a fetch instead.
	  document.addEventListener("loadstart", (event) => {
	    const media = event.target;
	    if (!(media instanceof HTMLMediaElement)) return;
	    const url = media.currentSrc || media.src;
	    if (!url || url.startsWith("blob:")) return;
	    const kind = manifest(url, "");
	    if (kind === "hls" && realFetch) {
	      realFetch.call(window, url).then((r) => r.text()).then((t) => playlist(url, t), () => post("hls", url));
	    } else {
	      post(kind || "file", url);
	    }
	  }, true);
	  // Manifests requested before this script ran, and files a media element loaded.
	  try {
	    new PerformanceObserver((list) => {
	      for (const entry of list.getEntries()) {
	        const kind = manifest(entry.name, "");
	        if (kind) post(kind, entry.name);
	        else if (entry.initiatorType === "video" || entry.initiatorType === "audio") post("file", entry.name);
	      }
	    }).observe({ type: "resource", buffered: true });
	  } catch (e) {}
	  const keys = navigator.requestMediaKeySystemAccess;
	  if (keys) {
	    navigator.requestMediaKeySystemAccess = function () {
	      post("drm", "");
	      return keys.apply(this, arguments);
	    };
	  }
	})();
	"""

// MARK: - Browse page

struct BrowsePage: View {
	@Environment(Store.self) private var store
	@Environment(Browser.self) private var browser
	@State private var address = ""

	var body: some View {
		VStack(spacing: 0) {
			toolbar
			if let message = store.probeError ?? browser.loadError {
				Label(message, systemImage: "exclamationmark.triangle.fill")
					.font(.callout)
					.foregroundStyle(.red)
					.textSelection(.enabled)
					.frame(maxWidth: .infinity, alignment: .leading)
					.padding(.horizontal, 16)
					.padding(.vertical, 8)
			}
			Rectangle().fill(Brand.stroke).frame(height: 1)
			ZStack {
				WebViewHost(webView: browser.webView)
				if browser.page == nil { start }
			}
		}
		.onChange(of: browser.address) { _, new in address = new }
		.onAppear { address = browser.address }
		.sheet(isPresented: picking) {
			if let info = store.pending {
				ChoicePicker(info: info) {}
					.padding(20)
					.frame(width: 640)
			}
		}
	}

	/// The quality picker opens over the page once a stream was read.
	private var picking: Binding<Bool> {
		Binding(get: { store.pending != nil }, set: { if !$0 { store.pending = nil } })
	}

	private var toolbar: some View {
		HStack(spacing: 6) {
			CircleButton(symbol: "chevron.left", help: "Back") { browser.webView.goBack() }
				.disabled(!browser.canGoBack)
			CircleButton(symbol: "chevron.right", help: "Forward") { browser.webView.goForward() }
				.disabled(!browser.canGoForward)
			if browser.isLoading {
				CircleButton(symbol: "xmark", help: "Stop") { browser.webView.stopLoading() }
			} else {
				CircleButton(symbol: "arrow.clockwise", help: "Reload") { browser.webView.reload() }
					.disabled(browser.page == nil)
			}
			HStack(spacing: 8) {
				Image(systemName: browser.page?.scheme == "https" ? "lock.fill" : "globe")
					.font(.caption)
					.foregroundStyle(.secondary)
				TextField("Enter an address or search", text: $address)
					.textFieldStyle(.plain)
					.onSubmit { browser.go(address) }
			}
			.padding(.horizontal, 14)
			.frame(height: 34)
			.background(Brand.surface, in: Capsule())
			.overlay(Capsule().strokeBorder(Brand.stroke))
			.padding(.horizontal, 6)
			downloadMenu
		}
		.padding(.horizontal, 16)
		.padding(.top, 14)
		.padding(.bottom, 10)
	}

	private var downloadMenu: some View {
		let media = browser.media
		return Menu {
			if browser.isProtected {
				Text("Copy-protected, can't download")
			}
			if media.isEmpty {
				Text(browser.page == nil ? "Open a page with a video" : "No video found yet. Start playing it.")
			}
			ForEach(Array(media.enumerated()), id: \.element.id) { index, item in
				Button("Video \(index + 1) · \(item.label)") { download(item) }
			}
		} label: {
			if store.probing {
				Text("Reading…")
			} else {
				Label(
					media.isEmpty ? String(localized: "Download Video") : String(localized: "Download Video · \(media.count)"),
					systemImage: "arrow.down.circle.fill"
				)
			}
		} primaryAction: {
			if let first = media.first { download(first) }
		}
		.menuStyle(.button)
		.buttonStyle(.borderedProminent)
		.fixedSize()
		.disabled(!store.canProbe)
		.help(store.installed.contains(.engine) ? "" : "Install yt-dlp in Downloads first.")
	}

	private func download(_ item: SniffedMedia) {
		Task { await browser.download(item, with: store) }
	}

	private var start: some View {
		VStack(spacing: 14) {
			Image(systemName: "globe")
				.font(.system(size: 44))
				.foregroundStyle(Brand.gradient)
			Text("Open a page with a video").font(.title2.weight(.semibold))
			Text("Enter an address or search above, play the video, then click Download Video. Sites you sign in to here stay signed in, and their downloads use that sign-in.")
				.multilineTextAlignment(.center)
				.foregroundStyle(.secondary)
				.frame(maxWidth: 460)
		}
		.padding(40)
		.frame(maxWidth: .infinity, maxHeight: .infinity)
		.background(Brand.ink)
	}
}

struct WebViewHost: NSViewRepresentable {
	let webView: WKWebView

	func makeNSView(context: Context) -> WKWebView { webView }
	func updateNSView(_ view: WKWebView, context: Context) {}
}
