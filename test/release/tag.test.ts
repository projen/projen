import { promises as fs, mkdtempSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import * as logging from "../../src/logging";
import type { TagOptions } from "../../src/release/tag-version";
import { tag } from "../../src/release/tag-version";
import { git } from "../../src/util/exec";

logging.disable();
jest.setTimeout(1000 * 60); // 1min

const DEFAULT_RELEASE_TAG = "v0.1.1";
const DEFAULT_RELEASE_TAG_FILE = "releasetag.txt";
const DEFAULT_CHANGELOG_CONTENT = "foo bar baz";
const DEFAULT_CHANGELOG = "changelog.md";

test("tag from bump artifacts", async () => {
  const result = await testTag();
  expect(result.latestTag).toMatch(`${DEFAULT_RELEASE_TAG}`);
  expect(result.latestTagAnnotation).toMatch(DEFAULT_CHANGELOG_CONTENT);
});

test("empty release tag file", async () => {
  await expect(testTag({ testOptions: { releaseTag: "" } })).rejects.toThrow();
});

test("missing release tag file", async () => {
  await expect(
    testTag({ testOptions: { releaseTagPath: "bogus" } }),
  ).rejects.toThrow();
});

test("missing changelog file", async () => {
  await expect(
    testTag({ testOptions: { changelogPath: "bogus" } }),
  ).rejects.toThrow();
});

interface TestTagOpts {
  tagOptions?: Partial<TagOptions>;
  testOptions?: {
    releaseTag?: string;
    changelogContent?: string;
    changelogPath?: string;
    releaseTagPath?: string;
  };
}

async function testTag(opts: TestTagOpts = {}) {
  const workdir = mkdtempSync(join(tmpdir(), "tag-test-"));
  const releaseTag = opts.testOptions?.releaseTag ?? DEFAULT_RELEASE_TAG;
  const changelogContent =
    opts.testOptions?.changelogContent ?? DEFAULT_CHANGELOG_CONTENT;
  const changelog = opts.tagOptions?.changelog ?? DEFAULT_CHANGELOG;
  const releaseTagFile =
    opts.tagOptions?.releaseTagFile ?? DEFAULT_RELEASE_TAG_FILE;

  const run = (args: string[]) => git.run(args, { cwd: workdir });
  const getLatestTag = latestTagFunc(workdir);
  const getTagAnnotation = tagAnnotationFunc(workdir);

  // init a git repository
  run(["init", "-q"]);
  run(["config", "user.email", "you@example.com"]);
  run(["config", "user.name", "Your Name"]);
  run(["config", "commit.gpgsign", "false"]);
  run(["config", "tag.gpgsign", "false"]);
  await fs.writeFile(
    join(workdir, opts.testOptions?.releaseTagPath || "", releaseTagFile),
    releaseTag,
  );
  await fs.writeFile(
    join(workdir, opts.testOptions?.changelogPath || "", changelog),
    changelogContent,
  );
  run(["add", "."]);
  run(["commit", "-m", "chore: foo"]);

  await tag(workdir, {
    changelog,
    releaseTagFile,
  });

  const latestTag = await getLatestTag();
  const latestTagAnnotation = await getTagAnnotation(latestTag);

  return {
    latestTag,
    latestTagAnnotation,
  };
}

const latestTagFunc = (cwd: string) => () =>
  git.capture(["describe", "--tags", "--abbrev=0"], { cwd: cwd });
const tagAnnotationFunc = (cwd: string) => (releaseTag: string) =>
  git.capture(["tag", "-l", "--format=%(contents)", releaseTag], {
    cwd: cwd,
  });
