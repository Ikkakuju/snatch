#!/bin/bash
# Creates the stable self-signed "Snatch Self-Signed" code-signing identity in
# the login keychain. Run once per Mac.
#
# macOS keys an app's permissions (Full Disk Access, needed to read Safari's
# cookies) to its code signature, and an ad-hoc signature changes with every
# build, so the grant would have to be made again after each update. The same
# certificate on every build keeps the app's designated requirement stable.
#
# This is not notarization: Gatekeeper still asks the user to approve a
# downloaded copy once. CI signs releases with this same identity, imported from
# the repository secrets (scripts/import-signing-identity.sh).
#
# Local runs put the identity in the login keychain. CI passes SIGNING_KEYCHAIN
# so the identity is built in a scratch keychain it owns, then signs a throwaway
# bundle to prove bundle.sh works without the release secrets.
#
#   macos/scripts/self-sign.sh
set -euo pipefail
IDENTITY="${SIGNING_IDENTITY:-Snatch Self-Signed}"
KEYCHAIN="${SIGNING_KEYCHAIN:-$HOME/Library/Keychains/login.keychain-db}"

if security find-identity -p codesigning | grep -Fq "$IDENTITY"; then
	echo "'$IDENTITY' already exists"
	exit 0
fi

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

# A 10-year self-signed certificate that may only be used for code signing.
# Through a CSR and `x509 -req -extfile`, not `req -x509 -addext`: LibreSSL
# (macOS's openssl) adds a critical CA:true basicConstraints of its own, and the
# extra basicConstraints from -addext makes a certificate codesign refuses
# ("Unknown critical cert extension"). codesign does not need it trusted.
openssl req -new -newkey rsa:2048 -nodes \
	-keyout "$WORK/key.pem" -out "$WORK/cert.csr" -subj "/CN=$IDENTITY"
printf 'basicConstraints=critical,CA:false\nkeyUsage=critical,digitalSignature\nextendedKeyUsage=critical,codeSigning\n' \
	> "$WORK/ext.cnf"
openssl x509 -req -in "$WORK/cert.csr" -signkey "$WORK/key.pem" -days 3650 -sha256 \
	-extfile "$WORK/ext.cnf" -out "$WORK/cert.pem"
# The non-empty .p12 password keeps `security import` happy.
openssl pkcs12 -export -inkey "$WORK/key.pem" -in "$WORK/cert.pem" \
	-name "$IDENTITY" -out "$WORK/identity.p12" -passout pass:snatch

if [ "$KEYCHAIN" = "$HOME/Library/Keychains/login.keychain-db" ]; then
	# -A and -T let codesign use the key without prompting.
	security import "$WORK/identity.p12" -k "$KEYCHAIN" -P snatch \
		-A -T /usr/bin/codesign
else
	security create-keychain -p snatch "$KEYCHAIN"
	security set-keychain-settings -lut 21600 "$KEYCHAIN"
	security unlock-keychain -p snatch "$KEYCHAIN"
	security import "$WORK/identity.p12" -k "$KEYCHAIN" -P snatch \
		-A -T /usr/bin/codesign
	security set-key-partition-list -S apple-tool:,apple: -s -k snatch "$KEYCHAIN" >/dev/null
	security list-keychains -d user -s "$KEYCHAIN" $(security list-keychains -d user | sed 's/"//g')
fi
echo "Created '$IDENTITY'"
