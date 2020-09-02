import * as fs from 'fs-extra';
import * as path from 'path';
import {PROJEN_RC} from './common';
import * as yargs from 'yargs';

const projenfile = path.resolve(PROJEN_RC);
const projen = path.join(__dirname, '..');

const args = yargs
  .commandDir('cmds')
  .recommendCommands()
  .wrap(yargs.terminalWidth())
  .help()
  .argv;

// no command means just require .projenrc.js
if (args._.length === 0) {
  if (!fs.existsSync(projenfile)) {
    console.error(`Unable to find ${projenfile}. Use "projen new" to create a new project.`);
    process.exit(1);
  }

  // if node_modules/projen is not a directory or does not exist, create a
  // temporary symlink to the projen that we are currently running in order to
  // allow .projenrc.js to `require()` it.
  const projenModulePath = path.resolve('node_modules', 'projen');
  if (!fs.existsSync(path.join(projenModulePath, 'package.json')) || !fs.statSync(projenModulePath).isDirectory()) {
    fs.removeSync(projenModulePath);
    fs.mkdirpSync('node_modules');
    fs.symlinkSync(projen, projenModulePath);
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require(projenfile);
}
