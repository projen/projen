import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as logging from '../logging';

const projen = path.join(__dirname, '..');

export async function synth(projenfile: string) {
  if (!fs.existsSync(projenfile)) {
    logging.error(`Unable to find ${projenfile}. Use "projen new" to create a new project.`);
    process.exit(1);
  }

  // if node_modules/projen is not a directory or does not exist, create a
  // temporary symlink to the projen that we are currently running in order to
  // allow .projenrc.js to `require()` it.
  logging.info('Synthesizing project...');
  const nodeModules = path.join(path.dirname(projenfile), 'node_modules');
  const projenModulePath = path.resolve(nodeModules, 'projen');
  if (!fs.existsSync(path.join(projenModulePath, 'package.json')) || !fs.statSync(projenModulePath).isDirectory()) {
    fs.removeSync(projenModulePath);
    fs.mkdirpSync(nodeModules);
    fs.symlinkSync(projen, projenModulePath, (os.platform() === 'win32') ? 'junction' : null);
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require(projenfile);
}
