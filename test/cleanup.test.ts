import { join } from "path";
import { readJsonSync } from "fs-extra";
import { JsonFile, Project, SampleFile, TextFile } from "../src";
import { cleanup, FILE_MANIFEST } from "../src/cleanup";
import { PROJEN_MARKER } from "../src/common";
import { directorySnapshot } from "./util";

test("cleanup uses cache file", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const textFile = new TextFile(p, "foo/bar.txt");
  new SampleFile(p, "sample.txt", {
    contents: PROJEN_MARKER,
  });

  // WHEN
  p.synth();

  const preDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const preFiles = Object.keys(preDirSnapshot);

  const fileList: string[] = readJsonSync(join(p.outdir, FILE_MANIFEST)).files;

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
  const p = new Project({ name: "my-project" });

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
  const p = new Project({ name: "my-project" });
  const keepFile = new TextFile(p, "keep-this");
  const deleteFile = new TextFile(p, "not-this");

  // WHEN
  p.synth();

  const preDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const preFiles = Object.keys(preDirSnapshot);

  const fileList: string[] = readJsonSync(join(p.outdir, FILE_MANIFEST)).files;

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
  const p = new Project({ name: "my-project" });
  const emptyFile = new JsonFile(p, "will-be-empty", { obj: { test: "test" } });

  // WHEN
  p.synth();

  // Force file to be empty on next synth
  (emptyFile as any).synthesizeContent = () => undefined;

  const preDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const preFiles = Object.keys(preDirSnapshot);
  const fileList: string[] = readJsonSync(join(p.outdir, FILE_MANIFEST)).files;

  p.synth();

  const postDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const postFiles = Object.keys(postDirSnapshot);
  const deletedFiles = preFiles.filter((f) => !postFiles.includes(f));

  // THEN
  expect(deletedFiles).not.toEqual(fileList);
  expect(deletedFiles).toContain(emptyFile.path);
  expect(deletedFiles).toMatchSnapshot();
});
