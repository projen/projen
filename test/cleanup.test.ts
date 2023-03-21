import { readFileSync } from "fs";
import { join } from "path";
import { directorySnapshot, TestProject } from "./util";
import { DependencyType, JsonFile, SampleFile, TextFile } from "../src";
import { cleanup, FILE_MANIFEST } from "../src/cleanup";
import { PROJEN_MARKER } from "../src/common";

test("cleanup uses cache file", () => {
  // GIVEN
  const p = new TestProject();
  p.deps.addDependency("test", DependencyType.BUILD);
  const textFile = new TextFile(p, "foo/bar.txt");
  new SampleFile(p, "sample.txt", {
    contents: PROJEN_MARKER,
  });

  // WHEN
  p.synth();

  const preDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const preFiles = Object.keys(preDirSnapshot);

  const fileList: string[] = JSON.parse(
    readFileSync(join(p.outdir, FILE_MANIFEST), "utf-8")
  ).files;

  cleanup(p.outdir, [], []);

  const postDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const postFiles = Object.keys(postDirSnapshot);

  const deletedFiles = preFiles.filter((f) => !postFiles.includes(f));

  // THEN
  expect(deletedFiles).toEqual(fileList);
  expect(deletedFiles).toContain(textFile.path);
  expect(deletedFiles).not.toContain("sample.txt");
  expect(deletedFiles).toMatchSnapshot();
});

test("cleanup falls back to greedy method", () => {
  // GIVEN
  const p = new TestProject();
  p.deps.addDependency("test", DependencyType.BUILD);

  // This file would not normally get cleaned up up by the file manifest
  new TextFile(p, "delete.txt", {
    readonly: false,
    lines: [PROJEN_MARKER],
  });

  // corrupt file manifest
  p.tryFindObjectFile(FILE_MANIFEST)!.addDeletionOverride("files");

  // WHEN
  p.synth();

  const preDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const preFiles = Object.keys(preDirSnapshot);

  cleanup(p.outdir, [], []);

  const postDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const postFiles = Object.keys(postDirSnapshot);

  const deletedFiles = preFiles.filter((f) => !postFiles.includes(f));

  // THEN
  expect(postFiles).not.toContain("delete.txt");
  expect(deletedFiles).toMatchSnapshot();
});

test("cleanup only orphaned files", () => {
  // GIVEN
  const p = new TestProject();
  const keepFile = new TextFile(p, "keep-this");
  const deleteFile = new TextFile(p, "not-this");

  // WHEN
  p.synth();

  const preDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const preFiles = Object.keys(preDirSnapshot);

  const fileList: string[] = JSON.parse(
    readFileSync(join(p.outdir, FILE_MANIFEST), "utf-8")
  ).files;

  cleanup(p.outdir, ["keep-this"], []);

  const postDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const postFiles = Object.keys(postDirSnapshot);

  const deletedFiles = preFiles.filter((f) => !postFiles.includes(f));

  // THEN
  expect(deletedFiles).not.toEqual(fileList);
  expect(deletedFiles).toContain(deleteFile.path);
  expect(deletedFiles).not.toContain(keepFile.path);
  expect(deletedFiles).toMatchSnapshot();
});

test("cleanup empty files", () => {
  // GIVEN
  const p = new TestProject();
  const emptyFile = new JsonFile(p, "will-be-empty", { obj: { test: "test" } });

  // WHEN
  p.synth();

  // Force file to be empty on next synth
  (emptyFile as any).synthesizeContent = () => undefined;

  const preDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const preFiles = Object.keys(preDirSnapshot);
  const fileList: string[] = JSON.parse(
    readFileSync(join(p.outdir, FILE_MANIFEST), "utf-8")
  ).files;

  p.synth();

  const postDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const postFiles = Object.keys(postDirSnapshot);
  const deletedFiles = preFiles.filter((f) => !postFiles.includes(f));

  // THEN
  expect(deletedFiles).not.toEqual(fileList);
  expect(deletedFiles).toContain(emptyFile.path);
  expect(deletedFiles).toMatchSnapshot();
});
