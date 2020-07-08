import * as fs from 'fs-extra';
import * as path from 'path';
import {PROJEN_RC} from './common';
import * as yargs from 'yargs';

const projenfile = path.resolve(PROJEN_RC);

// now in order to run, projen needs to be able to "require('projen')". this will
// work if we already installed our modules, but will fail miserably when we
// bootstrap a checked out (or empty) repo.
const projen = path.dirname(require.resolve('../package.json'));
const symlink = path.join('node_modules', 'projen');
if (!fs.existsSync(symlink)) {
  fs.mkdirpSync('node_modules');
  fs.symlinkSync(projen, symlink);
}

const args = yargs
  .usage('Usage: [npx / yarn] projen [<command>] [options]')
  .example('npx projen', 'generates project files using an existing projen file')
  .command('init <template-name>', 'initializes a new projenrc file from a template')
  .example('npx projen init jsii', 'initializes from the jsii template')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  .version(require('../package.json').version)
  .help()
  .argv

if (args._.length > 0) {
  const cmd = args._[0];
  switch (cmd) {
    case 'init':
      switch (args['template-name']) {
        case 'jsii': {
          // fails if .projenrc.js already exists
          if (fs.existsSync('.projenrc.js')) {
            process.stderr.write('Cannot create .projenrc.js file as it already exists.\n');
            process.exit(1);
          }
          fs.copyFileSync('./templates/jsii/.projenrc.js', '.projenrc.js');
          process.stdout.write('.projenrc.js generated from the "jsii" template. \n' +
            'Now, go edit it, nothing there is what you want.');
        }
      }
  }
}

if (!fs.existsSync(projenfile)) {
  console.error(`unable to find ${projenfile}`);
  process.exit(1);
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
require(projenfile);