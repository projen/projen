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
