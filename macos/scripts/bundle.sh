#!/bin/bash
# Builds Snatch.app (Apple silicon only) and Snatch.dmg into macos/dist.
#
# The app is ad-hoc signed only: there is no Developer ID, so Gatekeeper asks the
# user to approve it once (see the README). yt-dlp, ffmpeg and QuickJS are not
# bundled; the app asks before downloading and verifying each.
#
#   VERSION=1.2.3 macos/scripts/bundle.sh
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION="${VERSION:-0.0.0}"

swift build -c release --arch arm64 --product Snatch

rm -rf dist
APP=dist/Snatch.app
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
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

codesign --force --sign - --timestamp=none "$APP"

STAGING=$(mktemp -d)
cp -R "$APP" "$STAGING/"
ln -s /Applications "$STAGING/Applications"
hdiutil create -volname Snatch -srcfolder "$STAGING" -ov -format UDZO dist/Snatch.dmg >/dev/null
echo "Built $APP and dist/Snatch.dmg ($VERSION)"
