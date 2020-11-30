// tests for `projen new`: we run `projen new` for each supported project type
// and compare against a golden snapshot.
import { execSync, spawnSync } from 'child_process';
import { join } from 'path';
import { mkdirSync, readFileSync, removeSync } from 'fs-extra';
import { PROJEN_RC } from '../src/common';
import * as inventory from '../src/inventory';
import { mkdtemp, synthSnapshot, synthSnapshotWithPost, TestProject } from './util';

const cli = require.resolve('../bin/projen');

for (const type of inventory.discover()) {
  test(`projen new ${type.pjid}`, () => {
    const outdir = mkdtemp();
    try {
      const projectdir = createProjectDir(outdir);

      // execute `projen new PJID --no-synth` in the project directory
      const ret = spawnSync(process.execPath, [cli, 'new', '--no-synth', type.pjid], { cwd: projectdir });

      // throw on errors
      if (ret.error) { throw new Error(ret.error.message); }
      if (ret.status !== 0) { throw new Error(ret.stderr.toString('utf-8')); }

      // compare generated .projenrc.js to the snapshot
      const projenrc = readFileSync(join(projectdir, PROJEN_RC), 'utf-8');
      expect(projenrc).toMatchSnapshot();
    } finally {
      removeSync(outdir);
    }
  });
}

test('post-synthesis option enabled', () => {
  const project = new TestProject();

  expect(synthSnapshotWithPost(project)['.postsynth']).toContain('postsynth');
});

test('post-synthesis option disabled', () => {
  const project = new TestProject();

  expect(synthSnapshot(project)['.postsynth']).toBeUndefined();
});

function createProjectDir(workdir: string) {
  // create project under "my-project" so that basedir is deterministic
  const projectdir = join(workdir, 'my-project');
  mkdirSync(projectdir);

  const git = (command: string) => execSync(`git ${command}`, { cwd: projectdir });
  git('init');
  git('remote add origin git@boom.com:foo/bar.git');
  git('config user.name "My User Name"');
  git('config user.email "my@user.email.com"');
  return projectdir;
}