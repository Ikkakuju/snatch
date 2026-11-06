# Security Policy

## Supported Versions

Only the latest release of the Mac app and the `main` branch receive security updates.

## Reporting a Vulnerability

Please **do not** open a public issue.

Email `youmin.tang@elestyle.jp` with a description, reproduction steps, and impact.
You will receive an acknowledgement within 48 hours. If you do not, please open a minimal GitHub issue stating that you sent a security report (without details).

We will coordinate a fix and disclosure timeline with you.

## Scope & Notes

- Snatch runs third-party executables it downloads once the user agrees (yt-dlp, ffmpeg, ffprobe, QuickJS). Each is checked against a SHA-256 before it is made executable: yt-dlp against the checksum file published in the same GitHub release, ffmpeg, ffprobe and QuickJS against hashes pinned in `macos/Sources/SnatchCore/Tools.swift`. A compromised upstream release would still be trusted; that is the same trust a user of those tools places in them directly.
- At most once a day Snatch downloads yt-dlp again when the release's `SHA2-256SUMS` lists a new hash, with the same check.
- The app is self-signed (not with an Apple Developer ID) and not notarized, so macOS cannot vouch for a download. Get `Snatch.dmg` only from this repository's releases or snatchvideos.com.
- "Use cookies from" gives yt-dlp read access to that browser's cookies for every site, which is a live account session. It is off by default.
- The app has no server and opens no port; everything runs as the current user.
