#!/bin/bash
# Generates and EdDSA-signs dist/appcast.xml for the GitHub release made from
# <tag>. The app's SUFeedURL points at releases/latest/download/appcast.xml, so
# every release attaches this file under that fixed name.
#
# In CI the private key comes from the SPARKLE_PRIVATE_KEY secret; locally it is
# read from the login keychain account "snatch".
#
#   VERSION=1.2.3 macos/scripts/bundle.sh
#   macos/scripts/appcast.sh v1.2.3
set -euo pipefail
cd "$(dirname "$0")/.."
TAG="${1:?usage: appcast.sh <tag>}"
REPO="${GITHUB_REPOSITORY:-Ikkakuju/snatch}"

# Sparkle ships its tools in the same binary artifact SwiftPM downloaded.
GENERATE=$(find .build/artifacts/sparkle -type f -name generate_appcast -perm -u+x | head -1)
if [ -z "$GENERATE" ]; then
	echo "generate_appcast missing under .build/artifacts; run swift build first" >&2
	exit 1
fi

STAGE=$(mktemp -d)
cp dist/Snatch.dmg "$STAGE/"

# Snatch.md next to Snatch.dmg becomes the update's release notes.
PREVIOUS=$(git describe --tags --abbrev=0 "$TAG^" 2>/dev/null || git rev-list --max-parents=0 "$TAG")
{
	echo "Changes since \`$PREVIOUS\`:"
	echo
	git log --no-merges --pretty=format:'- %s' "$PREVIOUS..$TAG"
	echo
} > "$STAGE/Snatch.md"

ARGS=(
	--download-url-prefix "https://github.com/$REPO/releases/download/$TAG/"
	--link "https://snatchvideos.com/"
	--embed-release-notes
	"$STAGE"
)
if [ -n "${SPARKLE_PRIVATE_KEY:-}" ]; then
	printf '%s' "$SPARKLE_PRIVATE_KEY" | tr -d '\n' | "$GENERATE" --ed-key-file - "${ARGS[@]}"
else
	"$GENERATE" --account "${SPARKLE_ACCOUNT:-snatch}" "${ARGS[@]}"
fi

cp "$STAGE/appcast.xml" dist/appcast.xml
echo "Signed dist/appcast.xml for $TAG"
