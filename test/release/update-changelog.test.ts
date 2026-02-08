import { execSync } from "child_process";
import { promises as fs, mkdtempSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import * as logging from "../../src/logging";
import {
  updateChangelog,
  UpdateChangelogOptions,
} from "../../src/release/update-changelog";
import { execCapture, tryReadFile } from "../../src/util";

logging.disable();
jest.setTimeout(1000 * 60); // 1min

const DEFAULT_VERSION = "0.1.1";
const DEFAULT_VERSION_FILE = "dist/version.txt";
const DEFAULT_INPUT_CHANGELOG = "dist/changelog.md";
const DEFAULT_INPUT_CHANGELOG_CONTENT = `### [${DEFAULT_VERSION}](https://examplerepourl.com/diff/path) (2021-09-04)`;
const DEFAULT_OUTPUT_CHANGELOG = "CHANGELOG.md";
const DEFAULT_OUTPUT_CHANGELOG_CONTENT =
  "### output changelog original content";

test("updates project changelog from bump artifacts", async () => {
  const result = await testUpdateChangelog();

  expect(result.projectChangelogContent).toMatch(DEFAULT_VERSION);
});

test("commits new changelog", async () => {
  const result = await testUpdateChangelog();

  expect(result.commits[0]).toMatch(`chore(release): ${DEFAULT_VERSION}`);
  expect(result.lastCommitContent).toMatch(/.*CHANGELOG\.md.*/g);
});

test("adds a new changelog if missing", async () => {
  const result = await testUpdateChangelog({
    testOptions: {
      skipOutputChangelog: true,
    },
  });

  expect(result.projectChangelogContent.length).toBeGreaterThan(0);
});

test("matches first changelog entry missing brackets around the version", async () => {
  const result = await testUpdateChangelog({
    testOptions: {
      inputChangelogContent: `## ${DEFAULT_VERSION} (2021-09-04)`,
    },
  });

  expect(result.commits[0]).toMatch(`chore(release): ${DEFAULT_VERSION}`);
  expect(result.lastCommitContent).toMatch(/.*CHANGELOG\.md.*/g);
});

test("different version types do not conflict", async () => {
  const version = "0.0.1";
  const beta_version = `${version}-beta.0`;
  const beta_version_result = await testUpdateChangelog({
    testOptions: {
      version: beta_version,
      inputChangelogContent: `### [${beta_version}](https://examplerepourl.com/diff/path) (2024-01-07)`,
    },
  });

  // write new version to version file
  await fs.writeFile(
    join(beta_version_result.cwd, DEFAULT_VERSION_FILE),
    version,
  );
  // write new changelog to input-changelog file
  await fs.writeFile(
    join(beta_version_result.cwd, DEFAULT_INPUT_CHANGELOG),
    `### [${version}](https://examplerepourl.com/diff/path) (2024-01-08)`,
  );

  const default_version_result = await testUpdateChangelog({
    testOptions: {
      cwd: beta_version_result.cwd,
    },
  });

  expect(default_version_result.projectChangelogContent).toMatch(
    `### [${beta_version}]`,
  );
  expect(default_version_result.projectChangelogContent).toMatch(
    `### [${version}]`,
  );
});

test("duplicate release tag update is idempotent", async () => {
  const result1 = await testUpdateChangelog();
  const result2 = await testUpdateChangelog({
    testOptions: {
      cwd: result1.cwd,
    },
  });
  const commitsForVersion = result2.commits.filter((commit) =>
    commit.includes(DEFAULT_VERSION),
  );

  expect(commitsForVersion.length).toEqual(1);
  expect(
    result2.projectChangelogContent.match(DEFAULT_VERSION)?.length,
  ).toEqual(1);
});

test("missing release tag throws an error", async () => {
  await expect(
    testUpdateChangelog({
      testOptions: {
        version: "",
      },
    }),
  ).rejects.toThrow();
});

test("mismatched release tag and input changelog release tag throws an error", async () => {
  const version = "1.2.0";
  const inputChangelogVersion = "1.1.0";

  await expect(
    testUpdateChangelog({
      testOptions: {
        version: version,
        inputChangelogContent: `### [${inputChangelogVersion}](https://examplerepourl.com/diff/path) (2021-09-04)`,
      },
    }),
  ).rejects.toThrow();
});

interface TestUpdateChangelogOpts {
  updateChangelogOptions?: Partial<UpdateChangelogOptions>;
  testOptions?: {
    cwd?: string;
    version?: string;
    inputChangelogContent?: string;
    skipOutputChangelog?: boolean;
    versionPath?: string;
    updateCount?: number;
  };
}

async function testUpdateChangelog(opts: TestUpdateChangelogOpts = {}) {
  const workdir =
    opts.testOptions?.cwd ?? mkdtempSync(join(tmpdir(), "tag-test-"));
  const version = opts.testOptions?.version ?? DEFAULT_VERSION;
  const versionFile =
    opts.updateChangelogOptions?.versionFile ?? DEFAULT_VERSION_FILE;
  const inputChangelogContent =
    opts.testOptions?.inputChangelogContent ?? DEFAULT_INPUT_CHANGELOG_CONTENT;
  const inputChangelog =
    opts.updateChangelogOptions?.inputChangelog ?? DEFAULT_INPUT_CHANGELOG;
  const outputChangelogContent = DEFAULT_OUTPUT_CHANGELOG_CONTENT;
  const outputChangelog =
    opts.updateChangelogOptions?.outputChangelog ?? DEFAULT_OUTPUT_CHANGELOG;
  const skipOutputChangelog = opts.testOptions?.skipOutputChangelog ?? false;

  const inputChangelogFullPath = join(workdir, inputChangelog);
  const outputChangelogFullPath = join(workdir, outputChangelog);

  const git = gitFunc(workdir);

  if (!opts.testOptions?.cwd) {
    // init a git repository and make initial commit
    git("init -q");
    git('config user.email "you@example.com"');
    git('config user.name "Your Name"');
    git("config commit.gpgsign false");
    await fs.mkdir(join(workdir, "dist"));
    await fs.writeFile(join(workdir, versionFile), version);
    await fs.writeFile(inputChangelogFullPath, inputChangelogContent);
    if (!skipOutputChangelog) {
      await fs.writeFile(outputChangelogFullPath, outputChangelogContent);
      git(`add ${outputChangelogFullPath}`);
      git('commit -m "chore: setup"');
    }
  }

  await updateChangelog(workdir, {
    inputChangelog,
    outputChangelog,
    versionFile: versionFile,
  });

  const commits = execCapture("git log --oneline", {
    cwd: workdir,
  })
    .toString()
    .split("\n");
  const lastCommitContent = execCapture(
    "git diff-tree --no-commit-id --name-only -r HEAD",
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
  execSync(`git ${cmd}`, { cwd: cwd, stdio: "inherit" });
