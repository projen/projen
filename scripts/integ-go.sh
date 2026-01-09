#!/bin/bash
set -euo pipefail

# Source common functions
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/integ-common.sh"

REPO_ROOT=$(get_repo_root)
GO_MODULE_PATH="$REPO_ROOT/dist/go/projen"

# Verify Go module exists
if [ ! -d "$GO_MODULE_PATH" ]; then
  echo "ERROR: No projen Go module found at $GO_MODULE_PATH. Run 'node ./projen.js package:go' first." >&2
  exit 1
fi

# Test 1: Verify Go imports work by creating and running a .projenrc.go
echo "=== Test 1: Go import compatibility ==="
setup_workdir

# Initialize a Go module
go mod init test-go-project

# Use local projen module via replace directive
go mod edit -replace github.com/projen/projen-go/projen="$GO_MODULE_PATH"

# Create a simple projenrc.go (Go doesn't recognize dotfiles as source)
cat > projenrc.go <<'HERE'
package main

import (
	"github.com/aws/jsii-runtime-go"
	"github.com/projen/projen-go/projen"
)

func main() {
	project := projen.NewProject(&projen.ProjectOptions{
		Name:        jsii.String("test-go-project"),
		ProjectTree: jsii.Bool(true),
	})

	project.Synth()
}
HERE

# Download dependencies
go mod tidy

# Run the projenrc to synthesize the project
echo "Running projenrc.go..."
go run projenrc.go

# Verify synthesis produced expected files
verify_synth_version

echo "Go import compatibility test passed!"
