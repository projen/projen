import { join, dirname, basename } from 'path';
import { copySync, readJsonSync, writeJsonSync } from 'fs-extra';
import { glob } from 'glob';
import { exec } from '../src/util';
import { mkdtemp, directorySnapshot } from './util';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const projenVersion = require('../package.json').version;
const cli = require.resolve('../lib/cli');
const samples = join(__dirname, 'integration');
const files = glob.sync('**/*.projenrc.js', { cwd: samples });

for (const projenrc of files) {
  test(basename(projenrc, '.projenrc.js'), () => {
    const workdir = mkdtemp();
    const base = join(samples, dirname(projenrc));
    if (base !== samples) {
      copySync(base, workdir, { recursive: true });
    }
    copySync(join(samples, projenrc), join(workdir, '.projenrc.js'));
    const command = [
      process.execPath,
      cli,
      '--no-post',
    ];
    exec(command.join(' '), { cwd: workdir });

    // patch the projen version in package.json to match the current version
    // otherwise, every bump would need to update these snapshots.
    patchPacakgeJson(workdir);

    expect(directorySnapshot(workdir, { excludeGlobs: ['node_modules/**'] })).toMatchSnapshot();
  });
}

function patchPacakgeJson(dir: string) {
  const filepath = join(dir, 'package.json');
  const pkg = readJsonSync(filepath);
  const prev = pkg.devDependencies.projen;
  if (!prev) {
    throw new Error(`expecting "${filepath}" to include a devDependency on "projen"`);
  }

  // replace the current projen version with 999.999.999 for deterministic output.
  // this will preserve any semantic version requirements (e.g. "^", "~", etc).
  pkg.devDependencies.projen = prev.replace(projenVersion, '999.999.999');
  writeJsonSync(filepath, pkg);
}