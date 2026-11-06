#!/bin/bash
# Imports the release signing identity into a throwaway keychain. CI only.
#
# Every release is signed with the same self-signed certificate, so the app's
# designated requirement — and with it the user's Full Disk Access grant —
# survives updates. The identity is made once on a Mac (scripts/self-sign.sh)
# and exported from Keychain Access (My Certificates → "Snatch Self-Signed" →
# File ▸ Export Items…, with a password). Keep the .p12 out of the repository:
#
#   gh secret set SIGNING_P12_BASE64 --body "$(base64 -i Snatch.p12)"
#   gh secret set SIGNING_P12_PASSWORD
set -euo pipefail
: "${SIGNING_P12_BASE64:?}" "${SIGNING_P12_PASSWORD:?}" "${RUNNER_TEMP:?}"

KEYCHAIN="$RUNNER_TEMP/signing.keychain-db"
P12="$RUNNER_TEMP/signing.p12"
KEYCHAIN_PASSWORD="$(openssl rand -base64 24)"
trap 'rm -f "$P12"' EXIT

printf '%s' "$SIGNING_P12_BASE64" | base64 --decode > "$P12"
security create-keychain -p "$KEYCHAIN_PASSWORD" "$KEYCHAIN"
security set-keychain-settings -lut 21600 "$KEYCHAIN"
security unlock-keychain -p "$KEYCHAIN_PASSWORD" "$KEYCHAIN"
security import "$P12" -k "$KEYCHAIN" -P "$SIGNING_P12_PASSWORD" -A -T /usr/bin/codesign
# Let codesign use the key without an interactive prompt.
security set-key-partition-list -S apple-tool:,apple: -s -k "$KEYCHAIN_PASSWORD" "$KEYCHAIN" >/dev/null
security list-keychains -d user -s "$KEYCHAIN" $(security list-keychains -d user | sed 's/"//g')
echo "Imported the release signing identity"
