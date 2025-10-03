#!/bin/bash
set -euo pipefail
scriptdir=$(cd $(dirname $0) && pwd)
distdir=${scriptdir}/../dist
pythonwheel=${distdir}/python/projen-0.0.0-py3-none-any.whl

# check that projen has been packaged to python
if [ ! -f ${pythonwheel} ]; then
  echo "No python wheel was found. Run a full build of Projen first."
  exit 1
fi

# prepare testing directory
testdir=$(mktemp -d)
mkdir -p ${testdir}
cd ${testdir}

# install the packed version of projen for python
pip3 install --force-reinstall ${pythonwheel}

# create a projenrc.py file
cat > ${testdir}/.projenrc.py <<HERE
from projen import Project

project = Project(name="my-project")

project.synth()
HERE

# run the script to make sure there are no import issues
python3 ${testdir}/.projenrc.py

echo "Success!"
