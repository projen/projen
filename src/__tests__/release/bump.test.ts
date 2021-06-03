import { execSync } from 'child_process';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { readFile, readJson, writeFile } from 'fs-extra';
import * as logging from '../../logging';
import { bump, BumpOptions } from '../../release/bump-version';

logging.disable();

const today = (new Date()).toISOString().replace(/T.*/, '');

test('first release', async () => {
  const result = await testBump();
  expect(result.version).toStrictEqual('0.0.0');
  expect(result.changelog.includes(`## 0.0.0 (${today})`)).toBeTruthy();
});

test('first release, with major', async () => {
  const result = await testBump({
    options: { majorVersion: 2 },
  });
  expect(result.version).toStrictEqual('2.0.0');
  expect(result.changelog.includes(`## 2.0.0 (${today})`)).toBeTruthy();
});

test('first release, with new major', async () => {
  const result = await testBump({
    options: { majorVersion: 4 },
    commits: [
      { message: 'v1', tag: 'v1.2.3' },
      { message: 'commit2' },
    ],
  });
  expect(result.version).toStrictEqual('4.0.0');
  expect(result.changelog.includes('## [4.0.0]')).toBeTruthy();
});

test('first release, with prerelease', async () => {
  const result = await testBump({
    options: { prerelease: 'beta' },
  });
  expect(result.version).toStrictEqual('0.0.0-beta.0');
  expect(result.changelog.includes('## 0.0.0-beta.0')).toBeTruthy();
});

test('select latest', async () => {
  const result = await testBump({
    commits: [
      { message: 'first version', tag: 'v1.1.0' },
      { message: 'second version', tag: 'v1.2.0' },
      { message: 'fix: bug' },
      { message: 'fix: another bug' },
    ],
  });

  expect(result.version).toEqual('1.2.1');
  expect(result.changelog.includes('Bug Fixes')).toBeTruthy();
  expect(result.changelog.includes('another bug')).toBeTruthy();
  expect(result.changelog.includes('bug')).toBeTruthy();
});

test('select latest with major', async () => {
  const commits = [
    { message: 'first version', tag: 'v1.1.0' },
    { message: 'boom', tag: 'v10.21.0' },
    { message: 'second version', tag: 'v1.2.0' },
    { message: 'fix: bug' },
    { message: 'fix: another bug' },
  ];

  const result1 = await testBump({
    options: { majorVersion: 1 },
    commits: commits,
  });

  expect(result1.version).toEqual('1.2.1');

  const result10 = await testBump({
    options: { majorVersion: 10 },
    commits: commits,
  });

  expect(result10.version).toEqual('10.21.1');
});

test('bump fails due to crossing major version', async () => {
  const commits = [
    { message: 'first version', tag: 'v1.1.0' },
    { message: 'boom', tag: 'v10.21.0' },
    { message: 'second version', tag: 'v1.2.0' },
    { message: 'fix: another bug\n\nBREAKING CHANGE: cause major version bump' },
    { message: 'fix: bug' },
  ];

  const promise = testBump({
    options: { majorVersion: 1 },
    commits: commits,
  });

  await expect(promise).rejects.toThrow(/bump failed: this branch is configured to only publish v1 releases - bump resulted in 2.0.0/);
});

//----------------------------------------------------------------------------------------------------------------------------------

async function testBump(opts: { options?: Partial<BumpOptions>; commits?: { message: string; tag?: string }[] } = { }) {
  const workdir = mkdtempSync(join(tmpdir(), 'bump-test-'));

  const git = (cmd: string) => execSync(`git ${cmd}`, { cwd: workdir, stdio: 'inherit' });

  // init a git repository
  git('init');
  git('config --global user.email "you@example.com"');
  git('config --global user.name "Your Name"');

  const commit = async (message: string) => {
    await writeFile(join(workdir, 'dummy.txt'), message);
    git('add .');
    git(`commit -m "${message}"`);
  };

  await commit('initial commit');

  for (const c of opts.commits ?? []) {
    await commit(c.message);
    if (c.tag) {
      git(`tag ${c.tag}`);
    }
  }

  await bump(workdir, {
    changelog: 'changelog.md',
    versionFile: 'version.json',
    ...opts.options,
  });

  return {
    version: (await readJson(join(workdir, 'version.json'))).version,
    changelog: (await readFile(join(workdir, 'changelog.md'), 'utf8')),
  };
}