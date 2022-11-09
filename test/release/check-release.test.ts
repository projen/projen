import { execSync } from "child_process";
import { mkdtempSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { writeFile } from "fs-extra";
import * as logging from "../../src/logging";
import {
  checkRelease,
  CheckReleaseOptions,
} from "../../src/release/check-release";

logging.disable();
jest.setTimeout(1000 * 60 * 5); // 5min

test("first release with no config is not skipped", async () => {
  const result = testCheckRelease({
    commits: [{ message: "feat: first feature" }],
  });
  await expect(result).resolves.toBeTruthy();
});

test("first release with config is not skipped", async () => {
  const result = testCheckRelease({
    commits: [{ message: "chore: would be ignored, but is first release" }],
    options: { skipConventionalCommits: [{ types: ["chore"] }] },
  });
  await expect(result).resolves.toBeTruthy();
});

test("release is not skipped when types fail to match", async () => {
  const result = testCheckRelease({
    options: {
      skipConventionalCommits: [{ types: ["docs"] }],
    },
    commits: [
      { message: "first version", tag: "v1.1.0" },
      { message: "second version", tag: "v1.2.0" },
      { message: "docs: update Readme" },
      { message: "fix: no more bugs" },
    ],
  });
  await expect(result).resolves.toBeTruthy();
});

test("release is not skipped when scopes fail to match", async () => {
  const result = testCheckRelease({
    options: {
      skipConventionalCommits: [{ scopes: ["deps"] }],
    },
    commits: [
      { message: "first version", tag: "v1.1.0" },
      { message: "second version", tag: "v1.2.0" },
      { message: "chore(deps): updated dependencies" },
      { message: "fix(lib): fixed bug" },
    ],
  });
  await expect(result).resolves.toBeTruthy();
});

test("release is not skipped when types or scopes fail to match", async () => {
  const result = testCheckRelease({
    options: {
      skipConventionalCommits: [{ types: ["docs"] }, { scopes: ["deps"] }],
    },
    commits: [
      { message: "first version", tag: "v1.1.0" },
      { message: "second version", tag: "v1.2.0" },
      { message: "docs: updated Readme" },
      { message: "chore(deps): updated dependencies" },
      { message: "fix: this causes a release" },
    ],
  });
  await expect(result).resolves.toBeTruthy();
});

test("release is not skipped when types with scopes fail to match", async () => {
  const result = testCheckRelease({
    options: {
      skipConventionalCommits: [{ types: ["chore"], scopes: ["deps"] }],
    },
    commits: [
      { message: "first version", tag: "v1.1.0" },
      { message: "second version", tag: "v1.2.0" },
      { message: "chore(deps): updated dependencies" },
      { message: "fix(deps): this causes a release" },
    ],
  });
  await expect(result).resolves.toBeTruthy();
});

test("release is skipped when types match", async () => {
  const result = testCheckRelease({
    options: {
      skipConventionalCommits: [{ types: ["docs"] }],
    },
    commits: [
      { message: "first version", tag: "v1.1.0" },
      { message: "second version", tag: "v1.2.0" },
      { message: "docs: updated Readme" },
    ],
  });
  await expect(result).rejects.toThrowError(
    /No new commits have been added that warrant a release. All new commits were ignored/
  );
});

test("release is skipped when scopes match", async () => {
  const result = testCheckRelease({
    options: {
      skipConventionalCommits: [{ scopes: ["deps"] }],
    },
    commits: [
      { message: "first version", tag: "v1.1.0" },
      { message: "second version", tag: "v1.2.0" },
      { message: "chore(deps): updated dependencies" },
      { message: "fix(deps): updated dependencies" },
    ],
  });
  await expect(result).rejects.toThrowError(
    /No new commits have been added that warrant a release. All new commits were ignored/
  );
});

test("release is skipped when types or scopes match", async () => {
  const result = testCheckRelease({
    options: {
      skipConventionalCommits: [{ types: ["docs"] }, { scopes: ["deps"] }],
    },
    commits: [
      { message: "first version", tag: "v1.1.0" },
      { message: "second version", tag: "v1.2.0" },
      { message: "docs: updated Readme" },
      { message: "chore(deps): updated dependencies" },
    ],
  });
  await expect(result).rejects.toThrowError(
    /No new commits have been added that warrant a release. All new commits were ignored/
  );
});

test("release is skipped when types with scopes match", async () => {
  const result = testCheckRelease({
    options: {
      skipConventionalCommits: [{ types: ["chore"], scopes: ["deps"] }],
    },
    commits: [
      { message: "first version", tag: "v1.1.0" },
      { message: "second version", tag: "v1.2.0" },
      { message: "chore(deps): updated dependencies" },
    ],
  });
  await expect(result).rejects.toThrowError(
    /No new commits have been added that warrant a release. All new commits were ignored/
  );
});

test("release is still skipped when merge commits exist", async () => {
  const result = testCheckRelease({
    options: {
      skipConventionalCommits: [{ scopes: ["docs"] }],
    },
    commits: [
      { message: "first version", tag: "v1.1.0" },
      { message: "second version", tag: "v1.2.0" },
      {
        message:
          "Merge pull request #123 from hashicorp/fix-docs\n\n" +
          "fix(docs): update Readme",
      },
      { message: "fix(docs): update Readme" },
    ],
  });
  await expect(result).rejects.toThrowError(
    /No new commits have been added that warrant a release. All new commits were ignored/
  );
});

test("release is still skipped when only merge commits exist", async () => {
  const result = testCheckRelease({
    options: {
      skipConventionalCommits: [{ scopes: ["docs"] }],
    },
    commits: [
      { message: "first version", tag: "v1.1.0" },
      { message: "second version", tag: "v1.2.0" },
      {
        message:
          "Merge pull request #123 from hashicorp/fix-docs\n\n" +
          "fix(docs): update Readme",
      },
    ],
  });
  await expect(result).rejects.toThrowError(
    /No new commits have been added that warrant a release. All new commits were ignored/
  );
});

//----------------------------------------------------------------------------------------------------------------------------------

async function testCheckRelease(
  opts: {
    options?: Partial<CheckReleaseOptions>;
    commits?: { message: string; tag?: string }[];
  } = {}
) {
  const workdir = mkdtempSync(join(tmpdir(), "check-release-test-"));

  const git = (cmd: string) =>
    execSync(`git ${cmd}`, {
      cwd: workdir,
      stdio: "inherit",
      timeout: 10_000, // let's try to catch hanging processes sooner than later
    });

  // init a git repository
  git("init -b main");
  git('config user.email "you@example.com"');
  git('config user.name "Your Name"');
  git("config commit.gpgsign false");
  git("config tag.gpgsign false");

  const commit = async (message: string) => {
    await writeFile(join(workdir, "dummy.txt"), message);
    git("add .");
    git(`commit -m "${message}"`);
  };

  await commit("initial commit");

  for (const c of opts.commits ?? []) {
    await commit(c.message);
    if (c.tag) {
      git(`tag ${c.tag}`);
    }
  }

  await checkRelease(workdir, {
    ...opts.options,
  });

  return true;
}
