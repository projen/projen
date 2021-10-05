import { execSync } from 'child_process';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile, mkdir } from 'fs-extra';
import * as logging from '../../logging';
import {
  updateChangelog,
  UpdateChangelogOptions,
} from '../../release/update-changelog';
import { execCapture, tryReadFile } from '../../util';

logging.disable();
jest.setTimeout(1000 * 60); // 1min

const DEFAULT_RELEASE_TAG = '0.1.1';
const DEFAULT_RELEASE_TAG_FILE = 'dist/releasetag.txt';
const DEFAULT_INPUT_CHANGELOG = 'dist/changelog.md';
const DEFAULT_INPUT_CHANGELOG_CONTENT = `### [${DEFAULT_RELEASE_TAG}](https://examplerepourl.com/diff/path) (2021-09-04)`;
const DEFAULT_OUTPUT_CHANGELOG = 'CHANGELOG.md';
const DEFAULT_OUTPUT_CHANGELOG_CONTENT =
  '### output changelog original content';

test('updates project changelog from bump artifacts', async () => {
  const result = await testUpdateChangelog();

  expect(result.projectChangelogContent).toMatch(DEFAULT_RELEASE_TAG);
});

test('commits new changelog', async () => {
  const result = await testUpdateChangelog();

  expect(result.commits[0]).toMatch(`chore(release): ${DEFAULT_RELEASE_TAG}`);
  expect(result.lastCommitContent).toMatch(/.*CHANGELOG\.md.*/g);
});

test('duplicate release tag update is idempotent', async () => {
  const result1 = await testUpdateChangelog();
  const result2 = await testUpdateChangelog({
    testOptions: {
      cwd: result1.cwd,
    },
  });
  const commitsForReleaseTag = result2.commits.filter((commit) =>
    commit.includes(DEFAULT_RELEASE_TAG),
  );

  expect(commitsForReleaseTag.length).toEqual(1);
  expect(result2.projectChangelogContent.match(DEFAULT_RELEASE_TAG)?.length).toEqual(
    1,
  );
});

test('missing release tag throws an error', async () => {
  await expect(
    testUpdateChangelog({
      testOptions: {
        releaseTag: '',
      },
    }),
  ).rejects.toThrow();
});

test('mismatched release tag and input changelog release tag throws an error', async () => {
  const releaseTag = 'v1.2.0';
  const inputChangelogReleaseTag = '1.1.0';

  await expect(
    testUpdateChangelog({
      testOptions: {
        releaseTag: releaseTag,
        inputChangelogContent: `### [${inputChangelogReleaseTag}](https://examplerepourl.com/diff/path) (2021-09-04)`,
      },
    }),
  ).rejects.toThrow();
});

interface TestUpdateChangelogOpts {
  updateChangelogOptions?: Partial<UpdateChangelogOptions>;
  testOptions?: {
    cwd?: string;
    releaseTag?: string;
    inputChangelogContent?: string;
    releaseTagPath?: string;
    updateCount?: number;
  };
}

async function testUpdateChangelog(opts: TestUpdateChangelogOpts = {}) {
  const workdir = opts.testOptions?.cwd ?? mkdtempSync(join(tmpdir(), 'tag-test-'));
  const releaseTag = opts.testOptions?.releaseTag ?? DEFAULT_RELEASE_TAG;
  const releaseTagFile =
    opts.updateChangelogOptions?.releaseTagFile ?? DEFAULT_RELEASE_TAG_FILE;
  const inputChangelogContent =
    opts.testOptions?.inputChangelogContent ?? DEFAULT_INPUT_CHANGELOG_CONTENT;
  const inputChangelog =
    opts.updateChangelogOptions?.inputChangelog ?? DEFAULT_INPUT_CHANGELOG;
  const outputChangelogContent = DEFAULT_OUTPUT_CHANGELOG_CONTENT;
  const outputChangelog =
    opts.updateChangelogOptions?.outputChangelog ?? DEFAULT_OUTPUT_CHANGELOG;

  const inputChangelogFullPath = join(workdir, inputChangelog);
  const outputChangelogFullPath = join(workdir, outputChangelog);

  const git = gitFunc(workdir);

  if (!opts.testOptions?.cwd) {
    // init a git repository and make initial commit
    git('init -q');
    git('config user.email "you@example.com"');
    git('config user.name "Your Name"');
    git('config commit.gpgsign false');
    await mkdir(join(workdir, 'dist'));
    await writeFile(join(workdir, releaseTagFile), releaseTag);
    await writeFile(inputChangelogFullPath, inputChangelogContent);
    await writeFile(outputChangelogFullPath, outputChangelogContent);
    git(`add ${outputChangelogFullPath}`);
    git('commit -m "chore: setup"');
  }

  await updateChangelog(workdir, {
    inputChangelog,
    outputChangelog,
    releaseTagFile,
  });

  const commits = execCapture('git log --oneline', {
    cwd: workdir,
  })
    .toString()
    .split('\n');
  const lastCommitContent = execCapture(
    'git diff-tree --no-commit-id --name-only -r HEAD',
    { cwd: workdir },
  ).toString();
  const projectChangelogContent = await tryReadFile(outputChangelogFullPath);

  return {
    cwd: workdir,
    projectChangelogContent,
    lastCommitContent,
    commits,
  };
}

const gitFunc = (cwd: string) => (cmd: string) =>
  execSync(`git ${cmd}`, { cwd: cwd, stdio: 'inherit' });
