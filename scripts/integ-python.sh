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
#
# Post-synthesis is enabled (the default): it sets up the project's virtual
# environment, installs dependencies, and makes synthesis run the "install"
# task from inside the Python jsii runtime.
echo ""
echo "=== Test 2: Python project creation ==="
setup_workdir

# Generated projects pin projen==0.0.0, which does not exist on PyPI. Point
# pip at the locally built wheel so dependency installation can resolve it.
export PIP_FIND_LINKS="$REPO_ROOT/dist/python"

pipx run -q --spec="$WHEEL" projen new python --project-tree

# Synthesize the project again, like a user running `projen`.
echo "Synthesizing project..."
pipx run -q --spec="$WHEEL" projen

verify_synth_version

# Test 3: Create and synthesize a python project through the npm CLI
#
# Regression test for https://github.com/projen/projen/issues/4840, using
# the exact commands from the issue report: `npx projen new python` followed
# by `npx projen`. Unlike Test 2 this drives the python project through the
# npm-distributed CLI, so the default task (`python .projenrc.py`) runs the
# jsii runtime the way it behaves out of the box - which is where the
# "install" task spawned from inside the kernel crashed with
# `Cannot find module 'constructs'`.
echo ""
echo "=== Test 3: Python project via the npm CLI (npx projen) ==="
TARBALL=$(find_npm_tarball "$REPO_ROOT")
setup_workdir
setup_npm_projen "$TARBALL"

npx projen new python --project-tree

echo "Synthesizing project..."
npx projen

verify_synth_version

echo "Python integration test passed!"
