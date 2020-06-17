import * as fs from 'fs-extra';
import * as path from 'path';
import { PROJEN_RC } from '../lib/common';

const projenfile = path.resolve(PROJEN_RC);

if (!fs.existsSync(projenfile)) {
  console.error(`unable to find ${projenfile}`);
  process.exit(1);
}

// now in order to run, projen needs to be able to "require('projen')". this will
// work if we already installed our modules, but will fail miserably when we
// bootstrap a checked out (or empty) repo.
const projen = path.dirname(require.resolve('../package.json'));
const symlink = path.join('node_modules', 'projen');
if (!fs.existsSync(symlink)) {
  fs.mkdirpSync('node_modules');
  fs.symlinkSync(projen, symlink);
}

// now we are ready to rock
// eslint-disable-next-line @typescript-eslint/no-require-imports
require(projenfile);