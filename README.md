# Snatch

[![CI](https://github.com/Ikkakuju/snatch/actions/workflows/ci.yml/badge.svg)](https://github.com/Ikkakuju/snatch/actions/workflows/ci.yml) [![macOS app](https://github.com/Ikkakuju/snatch/actions/workflows/macos.yml/badge.svg)](https://github.com/Ikkakuju/snatch/actions/workflows/macos.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A free, open-source Mac app that downloads video from YouTube, X, TikTok,
Instagram, Bilibili and the 1,800+ other sites [yt-dlp](https://github.com/yt-dlp/yt-dlp)
supports. Paste a link, pick a resolution or MP3, and the file lands in your
Downloads folder.

**[Download Snatch.dmg](https://github.com/Ikkakuju/snatch/releases/latest/download/Snatch.dmg)** ·
[snatchvideos.com](https://snatchvideos.com) · macOS 14 or later, Apple silicon

## First launch

Snatch is not notarized by Apple (there is no paid developer account behind it),
so macOS blocks the first launch:

1. Open `Snatch.dmg` and drag Snatch to Applications.
2. Open Snatch once; macOS refuses.
3. System Settings → Privacy & Security → **Open Anyway**.

Snatch then asks before it downloads each tool, when the tool is first needed:
yt-dlp (with QuickJS) to read links, ffmpeg (with ffprobe) when you first save a
video. They go into `~/Library/Application Support/Snatch/bin` (about 110 MB in
all) and each is checked against a SHA-256 before it runs:

| Tool | Source | Checked against |
|---|---|---|
| yt-dlp | `yt-dlp/yt-dlp` latest release, `yt-dlp_macos.zip` (unpacked, starts faster than the one-file build) | the release's `SHA2-256SUMS`; checked daily and downloaded again when a new release is out |
| ffmpeg, ffprobe | [martin-riedl.de](https://ffmpeg.martin-riedl.de) 9.0.2 builds | hashes pinned in `macos/Sources/SnatchCore/Tools.swift` |
| QuickJS | `quickjs-ng/quickjs` v0.18.0, `qjs-darwin-arm64` | hash pinned in `Tools.swift`; yt-dlp needs a JavaScript runtime for YouTube |

## What it does

- One choice per resolution the site offers, saved as H.264/AAC MP4 so it plays
  in QuickTime and on iPhone, or the audio alone as MP3.
- A download queue, two at a time; pause, resume and survive a quit. Partial
  files live in Application Support, never in your Downloads folder.
- Optional cookies from Safari, Chrome, Firefox, Edge, Brave, Vivaldi, Opera or
  Chromium (Settings), for sign-in-only and age-restricted videos. Safari needs
  Full Disk Access for Snatch.

It cannot download DRM-protected streams (Netflix, Disney+ and the like), and a
site yt-dlp does not support, or has not caught up with, fails with yt-dlp's
own message.

## Repository

| Path | What |
|---|---|
| `macos/` | The app: SwiftPM package, SwiftUI, no dependencies. `SnatchCore` holds tool provisioning, the yt-dlp process and format logic; `Snatch` is the UI. |
| `packages/web/` | snatchvideos.com: one prerendered landing page (13 languages) with the download link, served from a Cloudflare Worker. |

### Build the app

Needs the Swift 6 toolchain (Xcode 16+, or the Command Line Tools).

```bash
cd macos
swift test                         # SnatchCore tests
swift run Snatch                   # run from source
VERSION=1.0.0 scripts/bundle.sh    # dist/Snatch.app + dist/Snatch.dmg (Apple silicon, ad-hoc signed)
```

With only the Command Line Tools on the macOS 27 SDK, SwiftUI's `@State` macro
plugin is missing; build against the 26.x SDK instead:
`SDKROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk swift build`.

### Release

Push a `v1.2.3` tag. `.github/workflows/macos.yml` tests, builds `Snatch.dmg`
and publishes it as that GitHub release; the website always links to
`releases/latest/download/Snatch.dmg`.

### Website

```bash
bun install
bun dev              # http://localhost:5173
bun run build        # packages/web/dist/client
```

Cloudflare Workers Builds deploys it on push to `main` (`bun run build:web`,
then `bash scripts/deploy-web.sh`).

## License

MIT. Only download videos you have the right to keep, and respect each site's terms.
