import { execSync } from 'child_process';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile } from 'fs-extra';
import * as logging from '../../logging';
import { tag, TagOptions } from '../../release/tag-version';
import { execCapture } from '../../util';

logging.disable();
jest.setTimeout(1000 * 60); // 1min

const DEFAULT_VERSION = '0.1.1';
const DEFAULT_VERSION_FILE = 'version.txt';
const DEFAULT_CHANGELOG_CONTENT = 'foo bar baz';
const DEFAULT_CHANGELOG = 'changelog.md';

test('tag from bump artifacts', async () => {
  const result = await testTag();
  expect(result.latestTag).toMatch(`v${DEFAULT_VERSION}`);
  expect(result.latestTagAnnotation).toMatch(DEFAULT_CHANGELOG_CONTENT);
});

test('normalizes tag prefix', async () => {
  const result = await testTag({ testOptions: { version: `v${DEFAULT_VERSION}` } });
  expect(result.latestTag).toMatch(`v${DEFAULT_VERSION}`);
});

test('empty version file', async () => {
  await expect(testTag({ testOptions: { version: '' } })).rejects.toThrow();
});

test('missing version file', async () => {
  await expect(testTag({ testOptions: { versionPath: 'bogus' } })).rejects.toThrow();
});

test('missing changelog file', async () => {
  await expect(testTag({ testOptions: { changelogPath: 'bogus' } })).rejects.toThrow();
});

interface TestTagOpts {
  tagOptions?: Partial<TagOptions>;
  testOptions?: {
    version?: string;
    changelogContent?: string;
    changelogPath?: string;
    versionPath?: string;
  };
}

async function testTag(opts: TestTagOpts = {}) {
  const workdir = mkdtempSync(join(tmpdir(), 'tag-test-'));
  const version = opts.testOptions?.version ?? DEFAULT_VERSION;
  const changelogContent =
    opts.testOptions?.changelogContent ?? DEFAULT_CHANGELOG_CONTENT;
  const changelog = opts.tagOptions?.changelog ?? DEFAULT_CHANGELOG;
  const versionFile = opts.tagOptions?.versionFile ?? DEFAULT_VERSION_FILE;

  const git = gitFunc(workdir);
  const getLatestTag = latestTagFunc(workdir);
  const getTagAnnotation = tagAnnotationFunc(workdir);

  // init a git repository
  git('init -q');
  git('config user.email "you@example.com"');
  git('config user.name "Your Name"');
  git('config commit.gpgsign false');
  await writeFile(join(workdir, opts.testOptions?.versionPath || '', versionFile), version);
  await writeFile(join(workdir, opts.testOptions?.changelogPath || '', changelog), changelogContent);
  git('add .');
  git('commit -m "chore: foo"');

  await tag(workdir, {
    changelog,
    versionFile,
  });

  const latestTag = await getLatestTag();
  const latestTagAnnotation = await getTagAnnotation(latestTag);

  return {
    latestTag,
    latestTagAnnotation,
  };
}

const gitFunc = (cwd: string) => (cmd: string) =>
  execSync(`git ${cmd}`, { cwd: cwd, stdio: 'inherit' });
const latestTagFunc = (cwd: string) => () =>
  execCapture('git describe --tags --abbrev=0', { cwd: cwd }).toString();
const tagAnnotationFunc = (cwd: string) => (version: string) =>
  execCapture(`git tag -l --format='%(contents)' ${version}`, {
    cwd: cwd,
  }).toString();
