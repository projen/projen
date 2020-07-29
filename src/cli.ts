import * as fs from 'fs-extra';
import * as path from 'path';
import {PROJEN_RC} from './common';
import * as yargs from 'yargs';

const projenfile = path.resolve(PROJEN_RC);
const projen = path.dirname(require.resolve('../package.json'));


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

  // now in order to run, projen needs to be able to "require('projen')". this will
  // work if we already installed our modules, but will fail miserably when we
  // bootstrap a checked out (or empty) repo.
  let unlink;
  const symlink = path.join('node_modules', 'projen');
  if (!fs.existsSync(symlink)) {
    fs.mkdirpSync('node_modules');
    fs.symlinkSync(projen, symlink);
    unlink = symlink;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(projenfile);
  } finally {
    if (unlink) {
      fs.unlinkSync(symlink);
    }
  }
}

