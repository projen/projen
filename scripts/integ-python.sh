#!/bin/bash
set -euo pipefail

# Source common functions
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/integ-common.sh"

REPO_ROOT=$(get_repo_root)
WHEEL=$(find_python_wheel "$REPO_ROOT")

# Test 1: Verify Python imports work (from python-compat.sh)
echo "=== Test 1: Python import compatibility ==="
setup_workdir
setup_pip_projen "$WHEEL"

cat > "$WORKDIR/.projenrc.py" <<HERE
from projen import Project

project = Project(name="my-project")

project.synth()
HERE

python3 "$WORKDIR/.projenrc.py"
echo "Python import compatibility test passed!"

# Test 2: Create a new Python project using CLI
echo ""
echo "=== Test 2: Python project creation ==="
setup_workdir

# Create project without post-synthesis (which tries to install deps from PyPI)
pipx run -q --spec="$WHEEL" projen new python --no-post --project-tree

# Synthesize the project (skip post to avoid pip install of projen==0.0.0 from PyPI)
# Use --project-tree to generate tree.json for version validation
echo "Synthesizing project..."
pipx run -q --spec="$WHEEL" projen --no-post

verify_synth_version

echo "Python integration test passed!"
