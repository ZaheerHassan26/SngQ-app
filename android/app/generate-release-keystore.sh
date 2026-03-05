#!/bin/bash
# Generate release keystore for Android app signing.
# Requires Java (keytool). Run from project root: ./android/app/generate-release-keystore.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

KEYSTORE="my-release.keystore"
ALIAS="releasekey"
STOREPASS="Abc@1234"
KEYPASS="Abc@1234"

if [ -f "$KEYSTORE" ]; then
  echo "Keystore $KEYSTORE already exists. Remove it first if you want to regenerate."
  exit 1
fi

keytool -genkeypair -v -storetype PKCS12 -keystore "$KEYSTORE" -alias "$ALIAS" \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -storepass "$STOREPASS" -keypass "$KEYPASS" \
  -dname "CN=ChemistryXo, OU=Mobile, O=Company, L=City, ST=State, C=US"

echo "Created $KEYSTORE in $(pwd)"
echo "Keep this file and passwords secure. Do not commit the keystore to version control."
