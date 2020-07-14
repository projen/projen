import * as fs from 'fs-extra';
import * as path from 'path';
import {PROJEN_RC} from './common';
import * as yargs from 'yargs';

const projenfile = path.resolve(PROJEN_RC);
const projen = path.dirname(require.resolve('../package.json'));

export const templatesPath = path.join(projen, 'templates');
export const availableTemplates = fs.readdirSync(templatesPath);

// now in order to run, projen needs to be able to "require('projen')". this will
// work if we already installed our modules, but will fail miserably when we
// bootstrap a checked out (or empty) repo.
const symlink = path.join('node_modules', 'projen');
if (!fs.existsSync(symlink)) {
  fs.mkdirpSync('node_modules');
  fs.symlinkSync(projen, symlink);
}

const args = yargs
  .commandDir('cmds')
  .recommendCommands()
  .wrap(yargs.terminalWidth())
  .help()
  .argv;

// no command means just require .projenrc.js
if (args._.length === 0) {
  if (!fs.existsSync(projenfile)) {
    console.error(`unable to find ${projenfile}`);
    process.exit(1);
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require(projenfile);
}

