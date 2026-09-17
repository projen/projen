import { mkdtempSync, readFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { CommitAndTagVersion } from "../../src/release/commit-tag-version";
import { node } from "../../src/util/exec";

afterEach(() => {
  jest.restoreAllMocks();
});

async function renderVersionrc(configOptions: any) {
  const cwd = mkdtempSync(join(tmpdir(), "catv-test-"));
  let versionrc: any;
  jest.spyOn(node, "run").mockImplementation(() => {
    versionrc = JSON.parse(readFileSync(join(cwd, ".versionrc.json"), "utf-8"));
  });

  const catv = new CommitAndTagVersion(undefined, cwd, {
    versionFile: join(cwd, "package.json"),
    configOptions,
  });
  await catv.invoke({});

  return { cwd, versionrc };
}

test("versionrc bumpFiles and packageFiles are merged after the version file", async () => {
  const { cwd, versionrc } = await renderVersionrc({
    packageFiles: [{ filename: "other.json", type: "json" }],
    bumpFiles: [{ filename: "version.txt", type: "plain-text" }],
  });

  expect(versionrc.packageFiles).toStrictEqual([
    { filename: join(cwd, "package.json"), type: "json" },
    { filename: "other.json", type: "json" },
  ]);
  expect(versionrc.bumpFiles).toStrictEqual([
    { filename: join(cwd, "package.json"), type: "json" },
    { filename: "version.txt", type: "plain-text" },
  ]);
});

test("versionrc files that point at the version file are not duplicated", async () => {
  const { cwd, versionrc } = await renderVersionrc({
    bumpFiles: [
      { filename: "package.json", type: "json" },
      { filename: "version.txt", type: "plain-text" },
      { filename: "./version.txt", type: "plain-text" },
    ],
  });

  expect(versionrc.bumpFiles).toStrictEqual([
    { filename: join(cwd, "package.json"), type: "json" },
    { filename: "version.txt", type: "plain-text" },
  ]);
});

test("version file is used when versionrc does not set any files", async () => {
  const { cwd, versionrc } = await renderVersionrc(undefined);

  expect(versionrc.packageFiles).toStrictEqual([
    { filename: join(cwd, "package.json"), type: "json" },
  ]);
  expect(versionrc.bumpFiles).toStrictEqual([
    { filename: join(cwd, "package.json"), type: "json" },
  ]);
});
