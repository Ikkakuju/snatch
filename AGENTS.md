# Repository Guidelines

## 当前 CI/CD 分工（2026-11-03）

全部用 GitHub 托管 runner（公开仓库免费）：网站 CI 在 `ubuntu-latest`，Mac app 的测试和发布在 `macos-15`。不使用自建 runner、CD runner 或服务器。网站由 Cloudflare Workers Builds 部署。

Snatch is a free, open-source **macOS app** that downloads video from any site [yt-dlp](https://github.com/yt-dlp/yt-dlp) supports, plus **snatchvideos.com**, a static landing page with the download link. There is no server: every download runs on the user's Mac.

## Layout

| Path | Role |
|---|---|
| `macos/` | SwiftPM package (`swift-tools-version: 6.0`, macOS 14+, Swift 6 language mode, no third-party packages). |
| `macos/Sources/SnatchCore/` | No SwiftUI. `Tools.swift` (two `Component`s the user installs from a prompt when first needed: `.engine` = yt-dlp + QuickJS before the first link, `.ffmpeg` = ffmpeg + ffprobe once a download is queued; download + SHA-256 check of yt-dlp (unpacked `yt-dlp_macos.zip`), ffmpeg, ffprobe and QuickJS into `~/Library/Application Support/Snatch/bin`; once a day, before any download starts, yt-dlp is downloaded again when its release hash changed, because the unpacked build cannot `yt-dlp -U`), `ProcessRunner.swift` (`ChildProcess`: `posix_spawn` in its own process group, line streams, group SIGTERM→SIGKILL), `Media.swift` (`yt-dlp -J` → `MediaInfo` and per-resolution `Choice`s), `YtDlp.swift` (`Engine.probe`, `DownloadRun`, progress template parsing, cookie browsers). |
| `macos/Sources/Snatch/` | SwiftUI. `Store.swift` (`@Observable` main-actor store: tool setup, probe, job queue, pause/resume, persistence to `downloads.json`), `Browser.swift` (built-in browser and stream sniffer, see below), `Views.swift` (window with a sidebar: downloads as a card grid filtered by All / In Progress / Finished, link bar, install cards, quality picker; Settings page with components, versions and a manual yt-dlp update). |
| `macos/Tests/SnatchCoreTests/` | Swift Testing (`import Testing`). |
| `macos/scripts/bundle.sh` | `Snatch.app` for Apple silicon only (arm64; Intel is not supported), icon from `macos/AppIcon.png`, ad-hoc `codesign`, `Snatch.dmg`. |
| `packages/web/` | TanStack Start, prerendered at build time to one page (`routes/index.tsx`), 13 locales in `src/i18n/locales` (`Messages = typeof en`), deployed as static assets on a Cloudflare Worker with Void (`void.config.ts`: Worker `snatch`, Custom Domain `snatchvideos.com`; `scripts/deploy-web.sh`). |

## How a download works

1. `Engine.probe` runs `yt-dlp -J --no-playlist --playlist-items 1 …`; a playlist resolves to its first entry. `mediaInfo(fromJSON:)` builds one choice per height (tallest first, at most 8; a vertical video is labelled by its short side), a `Best` fallback when no format has a height, then MP3.
2. Video choices pass `-S vcodec:h264,res,acodec:m4a --merge-output-format mp4 --remux-video mp4`: yt-dlp's default AV1/VP9 + Opus merge gives an mp4 QuickTime and iOS refuse.
3. `DownloadRun` starts yt-dlp with `-P home:<folder> -P temp:<Application Support>/partials/<job id>`, a `--progress-template` prefixed `[snatch] ` and `--print after_move:[snatch-file] %(filepath)s`. Success is the printed file existing, never the exit status alone (yt-dlp exits 0 after a failed merge).
4. Pause = stop the process group (partials stay); resume = rerun the same command, which continues the `.part` files. Remove deletes the job's partials folder. At launch, jobs that were running or queued come back paused.
5. **Browse** (`Browser.swift`): a persistent `WKWebView` with a fixed Safari user agent (`BrowserIdentity`). A script injected at document start in every frame reports HLS/DASH manifests (fetch, XMLHttpRequest, `PerformanceObserver`), what `<video>` plays, and DRM requests; a master playlist hides its per-quality playlists. Downloading one exports the browser's cookies to `browser-cookies.txt` (Netscape format, mode 600) and probes the stream with `--cookies`, `--referer <page>` and the same user agent (`BrowserContext`, kept on the job for resume), named after the page title.
6. Every run gets `--ffmpeg-location <bin>` and `--js-runtimes quickjs:<bin>/qjs` (YouTube's player challenges need a JS runtime), plus `--cookies-from-browser` when chosen in Settings.

## Development Commands

```bash
# Mac app
cd macos && swift test
cd macos && swift run Snatch
VERSION=1.2.3 macos/scripts/bundle.sh   # macos/dist/Snatch.app + Snatch.dmg

# Website (root)
bun install
bun dev                 # :5173
bun run typecheck
bun run check           # biome check --fix .
bun run build           # packages/web/dist/client — never bare `bun build`
```

> With only the Command Line Tools and the macOS 27 SDK, SwiftUI's `@State` is a macro whose plugin ships with Xcode only; build with `SDKROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk`. CI uses Xcode and is unaffected.

## Conventions

- **Swift**: tabs, Swift 6 strict concurrency with no warnings. UI state lives in `Store` (`@MainActor @Observable`); `SnatchCore` types are `Sendable`. Child processes always go through `ChildProcess` (never Foundation `Process` for yt-dlp) so a stop also kills the ffmpeg it started.
- **Tools are downloaded, not bundled, and only after the user agrees**: the app stays small and yt-dlp can be replaced daily; a bundled binary inside a signed `.app` could not. Never download a tool without its install prompt. New tools need a checksum source; when upstream publishes none, pin the URL and SHA-256 together in `Tools.swift`.
- **Web**: Biome owns formatting (tabs, width 100, double quotes). Components must render without `window`/`document` (prerender); touch them only in effects and handlers. Browser-exposed env vars use the `VITE_` prefix (`VITE_SITE_URL`, `VITE_CLARITY_ID`, `VITE_SENTRY_DSN`; see `.env.example`). New copy goes into `en.ts` first; every other locale must match its shape.
- **Brand images**: the mark is `packages/web/public/logo.svg` (plus `logo192.png`/`logo512.png`). `swift scripts/brand-assets.swift` (from the root) renders `og.png` and `macos/AppIcon.png` from a path-for-path copy of the mark in that script; change the SVG and the script together.
- **Clean cutover**: delete old paths; no shims, dead code or commented-out blocks.
- Bun version is pinned in `packageManager`, `.bun-version` (CI asserts they match); `bun.lock` is committed and installs are `--frozen-lockfile`.

## CI, Release & Attribution

- `.github/workflows/ci.yml` (PR + main, `ubuntu-latest`): `bun install --frozen-lockfile` → `bunx biome ci .` → `bun run typecheck` → `bun run build`.
- `.github/workflows/macos.yml` (changes under `macos/`, and `v*` tags, on `macos-15`): `swift test`; a `v1.2.3` tag also runs `bundle.sh` with that version and `gh release create` with `Snatch.dmg`. The asset name is version-free so the site links to `releases/latest/download/Snatch.dmg` — this only works for visitors once the repository is public.
- The website is deployed by Cloudflare Workers Builds: build `bun run build:web`, deploy `bash scripts/deploy-web.sh`.
- Git hooks via lefthook: pre-commit Biome on staged files; pre-push `bun run typecheck`.
- AI-assisted commits MUST include a `Co-Authored-By: Claude` trailer.

## Definition of Done

- App: `swift test` passes, `swift build` has no warnings, and the change was tried in the running app on a real link.
- Web: `bun run check`, `bun run typecheck` and `bun run build` pass; UI changes checked in a browser.

## Anti-Patterns (avoid without discussion)

- A server, API or SSR runtime for downloads — the point of the app is that it runs locally.
- Third-party Swift packages, or bundling yt-dlp inside the app.
- Running a downloaded tool before its checksum matched.
- Reading yt-dlp's human-readable output instead of the `[snatch]` progress template and `--print`.
- Bypassing lefthook with `--no-verify`.
