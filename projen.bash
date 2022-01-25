#!/bin/bash
# undefined
set -euo pipefail
if [ ! -f lib/cli/index.js ]; then
  echo "bootstrapping..."
  npx jsii --silence-warnings=reserved-word --no-fix-peer-dependencies
fi
exec bin/projen $@