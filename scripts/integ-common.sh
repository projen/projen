#!/bin/bash
# Common functions for integration tests
# Source this file from individual integration test scripts

set -euo pipefail

# Git identity for commits
GIT_USER_NAME="Projen Integration Test"
GIT_USER_EMAIL="noreply@projen.io"

# Set up global git identity for commits (needed before projen new creates repo)
# Only sets if not already configured
setup_git_identity() {
  if [ -z "$(git config --global user.name || true)" ]; then
    git config --global user.name "$GIT_USER_NAME"
  fi
  if [ -z "$(git config --global user.email || true)" ]; then
    git config --global user.email "$GIT_USER_EMAIL"
  fi
}

# Get repo root directory (caller should set SCRIPT_DIR first)
get_repo_root() {
  cd "$(dirname "${BASH_SOURCE[1]}")/.." && pwd
}

# Find the local projen npm tarball
# Returns: path to tarball, or exits with error
find_npm_tarball() {
  local repo_root="$1"
  local tarball
  tarball=$(ls "$repo_root"/dist/js/*.tgz 2>/dev/null | head -1)

  if [ -z "$tarball" ] || [ ! -f "$tarball" ]; then
    echo "ERROR: No projen tarball found in dist/js/. Run 'node ./projen.js package:js' first." >&2
    exit 1
  fi

  echo "$tarball"
}

# Find the local projen Python wheel
# Returns: path to wheel, or exits with error
find_python_wheel() {
  local repo_root="$1"
  local wheel
  wheel=$(ls "$repo_root"/dist/python/*.whl 2>/dev/null | head -1)

  if [ -z "$wheel" ] || [ ! -f "$wheel" ]; then
    echo "ERROR: No projen wheel found in dist/python/. Run 'node ./projen.js package:python' first." >&2
    exit 1
  fi

  echo "$wheel"
}

# Create a temp directory and set up cleanup trap
# Sets: WORKDIR variable
setup_workdir() {
  # Ensure git identity is configured globally (needed before projen new creates repo)
  setup_git_identity

  WORKDIR=$(mktemp -d)
  echo "Working directory: $WORKDIR"

  cleanup() {
    echo "Cleaning up $WORKDIR"
    rm -rf "$WORKDIR"
  }
  trap cleanup EXIT

  cd "$WORKDIR"
}

# Install projen from npm tarball and verify version
# Args: $1 = path to tarball
setup_npm_projen() {
  local tarball="$1"
  echo "Using tarball: $tarball"

  npm install "$tarball" --no-save > /dev/null 2>&1

  verify_npm_projen_version
}

# Verify npm-installed projen version is 0.0.0
verify_npm_projen_version() {
  local version
  version=$(npx projen --version)
  if [[ "$version" != "0.0.0" ]]; then
    echo "ERROR: Expected projen version 0.0.0, got $version"
    exit 1
  fi
  echo "Verified projen version: $version"
}

# Install projen from Python wheel and verify version
# Args: $1 = path to wheel
setup_pip_projen() {
  local wheel="$1"
  echo "Using wheel: $wheel"

  pip install --force-reinstall "$wheel" > /dev/null 2>&1

  verify_pip_projen_version
}

# Verify pip-installed projen version is 0.0.0
verify_pip_projen_version() {
  local version
  version=$(projen --version)
  if [[ "$version" != "0.0.0" ]]; then
    echo "ERROR: Expected projen version 0.0.0, got $version"
    exit 1
  fi
  echo "Verified projen version: $version"
}

# Verify synthesized project metadata
verify_synth_version() {
  echo "Verifying synthesized project metadata..."
  if [ -f ".projen/tree.json" ]; then
    local synth_version
    synth_version=$(grep -o '"projen\.version": "[^"]*"' .projen/tree.json | head -1 | sed 's/.*: "\([^"]*\)"/\1/')
    if [[ "$synth_version" != "0.0.0" ]]; then
      echo "ERROR: Synthesized project has projen.version $synth_version, expected 0.0.0"
      exit 1
    fi
    echo "Verified synthesized project projen.version: $synth_version"
  else
    echo "ERROR: .projen/tree.json not found after synthesis (--project-tree was specified)"
    exit 1
  fi
}
