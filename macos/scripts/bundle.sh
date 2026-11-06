#!/bin/bash
# Builds Snatch.app (Apple silicon only) and Snatch.dmg into macos/dist.
#
# Everything is signed with one stable self-signed identity, "Snatch
# Self-Signed": macOS keys the app's permissions (Full Disk Access, for Safari
# cookies) to its signature, and an ad-hoc one changes every build. Create the
# identity once with scripts/self-sign.sh; CI imports the same certificate from
# the repository secrets. It is still not notarized, so Gatekeeper asks the user
# to approve a downloaded copy once (see the README). yt-dlp, ffmpeg and QuickJS
# are not bundled; the app asks before downloading and verifying each.
#
# Sparkle.framework is linked from SwiftPM's binary artifact and embedded in
# Contents/Frameworks so the app can update itself. It is signed the same way,
# nested code first; update archives carry the EdDSA signature that Sparkle
# actually trusts.
#
#   VERSION=1.2.3 macos/scripts/bundle.sh
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION="${VERSION:-0.0.0}"
# The version is interpolated into Info.plist; keep it to digits and dots.
if ! [[ "$VERSION" =~ ^[0-9]+(\.[0-9]+)*$ ]]; then
	echo "VERSION must look like 1.2.3, got: $VERSION" >&2
	exit 1
fi

IDENTITY="${SIGNING_IDENTITY:-Snatch Self-Signed}"

if ! security find-identity -p codesigning | grep -Fq "$IDENTITY"; then
	echo "No '$IDENTITY' identity in the keychain; run macos/scripts/self-sign.sh once" >&2
	exit 1
fi

swift build -c release --arch arm64 --product Snatch

rm -rf dist
APP=dist/Snatch.app
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources" "$APP/Contents/Frameworks"
cp "$(swift build -c release --arch arm64 --product Snatch --show-bin-path)/Snatch" "$APP/Contents/MacOS/"
sed "s/__VERSION__/$VERSION/g" Info.plist > "$APP/Contents/Info.plist"

# AppIcon.png is rendered from the web logo by scripts/brand-assets.swift.
ICONSET=$(mktemp -d)/AppIcon.iconset
mkdir -p "$ICONSET"
for size in 16 32 128 256 512; do
	sips -z $size $size AppIcon.png --out "$ICONSET/icon_${size}x${size}.png" >/dev/null
	sips -z $((size * 2)) $((size * 2)) AppIcon.png \
		--out "$ICONSET/icon_${size}x${size}@2x.png" >/dev/null
done
iconutil -c icns "$ICONSET" -o "$APP/Contents/Resources/AppIcon.icns"

# Sparkle's binary artifact layout is fixed by Package.swift's exact version.
SPARKLE_SRC=".build/artifacts/sparkle/Sparkle/Sparkle.xcframework/macos-arm64_x86_64/Sparkle.framework"
if [ ! -d "$SPARKLE_SRC" ]; then
	echo "Sparkle.framework missing at $SPARKLE_SRC; run swift build first" >&2
	exit 1
fi
SPARKLE="$APP/Contents/Frameworks/Sparkle.framework"
# ditto, not cp: Sparkle.framework relies on symlinks and their permissions.
ditto "$SPARKLE_SRC" "$SPARKLE"

# Nested code first, as Sparkle's own release process signs it.
for nested in \
	"$SPARKLE/Versions/B/XPCServices/Downloader.xpc" \
	"$SPARKLE/Versions/B/XPCServices/Installer.xpc" \
	"$SPARKLE/Versions/B/Updater.app" \
	"$SPARKLE/Versions/B/Autoupdate"; do
	codesign --force --sign "$IDENTITY" --timestamp=none "$nested"
done
codesign --force --sign "$IDENTITY" --timestamp=none "$SPARKLE"
codesign --force --sign "$IDENTITY" --timestamp=none "$APP"
codesign --verify --deep --strict "$APP"

STAGING=$(mktemp -d)
ditto "$APP" "$STAGING/Snatch.app"
ln -s /Applications "$STAGING/Applications"
hdiutil create -volname Snatch -srcfolder "$STAGING" -ov -format UDZO dist/Snatch.dmg >/dev/null
echo "Built $APP and dist/Snatch.dmg ($VERSION)"
