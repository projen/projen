import { join, dirname, basename } from 'path';
import { chmodSync, copySync, readJsonSync, writeJsonSync } from 'fs-extra';
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
    sanitizeOutput(workdir);

    expect(directorySnapshot(workdir, { excludeGlobs: ['node_modules/**'] })).toMatchSnapshot();
  });
}

/**
 * Removes any non-determinstic aspects from the synthesized output.
 * @param dir The output directory.
 */
function sanitizeOutput(dir: string) {
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

  // we will also patch deps.json so that all projen deps will be set to 999.999.999
  const depsPath = join(dir, '.projen', 'deps.json');
  const deps = readJsonSync(depsPath);
  for (const dep of deps.dependencies) {
    if (dep.name === 'projen') {
      dep.version = dep.version.replace(projenVersion, '999.999.999');
    }
  }
  chmodSync(depsPath, '777');
  writeJsonSync(depsPath, deps);
}