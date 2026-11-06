# Snatch

[![CI](https://github.com/Ikkakuju/snatch/actions/workflows/ci.yml/badge.svg)](https://github.com/Ikkakuju/snatch/actions/workflows/ci.yml) [![macOS app](https://github.com/Ikkakuju/snatch/actions/workflows/macos.yml/badge.svg)](https://github.com/Ikkakuju/snatch/actions/workflows/macos.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A free, open-source Mac app that downloads video from YouTube, X, TikTok,
Instagram, Bilibili and 1,800+ other sites to your Mac as MP4 or MP3.
Paste a link or browse any page in the built-in stream-sniffing browser, pick a
resolution, and the video lands directly in your Downloads folder.

**[Download Snatch.dmg](https://github.com/Ikkakuju/snatch/releases/latest/download/Snatch.dmg)** ·
[snatchvideos.com](https://snatchvideos.com) · macOS 14 or later, Apple silicon

## Two ways to save a video

1. **Paste a link**: For YouTube, X, TikTok, Instagram, Bilibili and thousands of sites [yt-dlp](https://github.com/yt-dlp/yt-dlp) supports. Snatch lists every available resolution, plus audio-only MP3.
2. **Open in the built-in browser**: For everything else. Navigate to any page inside Snatch's persistent browser and start playing the video. Snatch automatically sniffs HLS and DASH streams and downloads them with your active login and cookies intact.

## Key Features

- **MP4 that plays everywhere**: Saved as H.264 video and AAC audio so files open cleanly in QuickTime, Finder preview, and on iPhone / iPad without codec incompatibilities. Or keep only the audio as MP3.
- **Built-in browser with stream sniffer**: Sniffs media streams from pages yt-dlp cannot parse directly, with your sign-in session preserved.
- **Queue and resume**: Concurrent downloads (two at a time by default). Pause, resume, and survive app restarts. Partial files live in Application Support and never clutter your Downloads folder.
- **Account sign-ins**: Download members-only or private videos by signing in via the built-in browser or importing cookies from Safari, Chrome, Firefox, Edge, Brave, etc. (Safari requires Full Disk Access).
- **Private & zero-server**: Videos go straight from the host site to your Mac. No Snatch proxy server, no tracking, no registration required.
- **Daily automated engine updates**: Snatch checks and updates yt-dlp daily so it adapts quickly as video platforms evolve.
- **Signed app updates**: Snatch checks its own GitHub releases once a day and installs a newer version in place. Every update is verified against Sparkle's EdDSA key before it runs.
- **Verified on-demand tools**: Snatch bundles no binaries; it downloads yt-dlp, QuickJS, ffmpeg and ffprobe on first need and verifies each file against SHA-256 before running.
- **Multilingual website**: [snatchvideos.com](https://snatchvideos.com) is localized into 13 languages.

> Note: Copy-protected DRM streams (such as Netflix or Disney+) remain encrypted and cannot be downloaded. Snatch alerts you when a page uses DRM.

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

## Repository

| Path | What |
|---|---|
| `macos/` | The app: SwiftPM package, SwiftUI. Sparkle 2 is the only dependency, used for self-updates. `SnatchCore` holds tool provisioning, the yt-dlp process and format logic; `Snatch` is the UI. |
| `packages/web/` | snatchvideos.com: one prerendered landing page (13 languages) with the download link, served from a Cloudflare Worker. |

### Build the app

Needs the Swift 6 toolchain (Xcode 16+, or the Command Line Tools).

```bash
cd macos
swift test                         # SnatchCore tests
swift run Snatch                   # run from source
scripts/self-sign.sh               # once: the identity bundle.sh signs with
VERSION=1.0.0 scripts/bundle.sh    # dist/Snatch.app + dist/Snatch.dmg (Apple silicon, self-signed)
scripts/appcast.sh v1.0.0          # signed dist/appcast.xml (EdDSA key from the keychain)
```

With only the Command Line Tools on the macOS 27 SDK, SwiftUI's `@State` macro
plugin is missing; build against the 26.x SDK instead:
`SDKROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk swift build`.

### Release

Push a `v1.2.3` tag. `.github/workflows/macos.yml` tests, builds `Snatch.dmg`,
generates and EdDSA-signs `appcast.xml`, and publishes both as that GitHub
release; the website always links to `releases/latest/download/Snatch.dmg`, and
the app reads `releases/latest/download/appcast.xml` to update itself. The
signing key lives in the `SPARKLE_PRIVATE_KEY` repository secret.

The app is signed with the stable self-signed `Snatch Self-Signed` identity, not
ad-hoc, so macOS keeps the app's Full Disk Access grant (needed for Safari
cookies) across updates. Make the identity once with `macos/scripts/self-sign.sh`;
CI imports the same certificate from the `SIGNING_P12_BASE64` and
`SIGNING_P12_PASSWORD` secrets, exported from Keychain Access as a `.p12`:

```bash
gh secret set SIGNING_P12_BASE64 --body "$(base64 -i Snatch.p12)"
gh secret set SIGNING_P12_PASSWORD
```

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
