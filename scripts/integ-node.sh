#!/bin/bash
set -euo pipefail

# Source common functions
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/integ-common.sh"

REPO_ROOT=$(get_repo_root)
TARBALL=$(find_npm_tarball "$REPO_ROOT")

setup_workdir
setup_npm_projen "$TARBALL"

# Create a new TypeScript project
echo "=== Test 1: TypeScript project creation ==="
npx projen new typescript --project-tree --package-manager=npm --projen-version="$TARBALL"

# Build the project
echo "Building project..."
npx projen build

verify_synth_version

echo "TypeScript integration test passed!"

# Regression test for https://github.com/projen/projen/issues/4746
# projen must ship an internally-consistent bundled dependency tree.
# This test guards against any future bundled-tree inconsistency.
echo "=== Test 2: downstream npm ci with projen as a dependency (issue #4746) ==="
CONSUMER_DIR="$WORKDIR/consumer"
mkdir -p "$CONSUMER_DIR"
cd "$CONSUMER_DIR"

cat > package.json <<EOF
{
  "name": "projen-consumer",
  "version": "0.0.0",
  "private": true,
  "devDependencies": {
    "projen": "$TARBALL"
  }
}
EOF

echo "Generating lockfile with 'npm install'..."
npm install

echo "Validating dependency tree with 'npm ci'..."
if ! npm ci; then
  echo "ERROR: 'npm ci' failed downstream - projen ships a broken dependency tree" >&2
  exit 1
fi

echo "Downstream npm ci integration test passed!"
