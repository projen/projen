import { join } from 'path';
import { readJsonSync } from 'fs-extra';
import { DependencyType, FileBase, SampleFile, TextFile } from '../src';
import { cleanup, FILE_MANIFEST } from '../src/cleanup';
import { directorySnapshot, TestProject } from './util';

test('cleanup uses cache file', () => {
  // GIVEN
  const p = new TestProject();
  p.deps.addDependency('test', DependencyType.BUILD);
  const textFile = new TextFile(p, 'foo/bar.txt');
  new SampleFile(p, 'sample.txt', {
    contents: FileBase.PROJEN_MARKER,
  });

  // WHEN
  p.synth();

  const preDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const preFiles = Object.keys(preDirSnapshot);

  const fileList: string[] = readJsonSync(join(p.outdir, FILE_MANIFEST)).files;

  cleanup(p.outdir, []);

  const postDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const postFiles = Object.keys(postDirSnapshot);

  const deletedFiles = preFiles.filter(f => !postFiles.includes(f));

  // THEN
  expect(deletedFiles).toEqual(fileList);
  expect(deletedFiles).toContain(textFile.path);
  expect(deletedFiles).not.toContain('sample.txt');
  expect(deletedFiles).toMatchSnapshot();
});

test('cleanup falls back to greedy method', () => {
  // GIVEN
  const p = new TestProject();
  p.deps.addDependency('test', DependencyType.BUILD);

  // This file would not normally get cleaned up up by the file manifest
  new TextFile(p, 'delete.txt', {
    readonly: false,
    lines: [FileBase.PROJEN_MARKER],
  });

  // corrupt file manifest
  p.tryFindObjectFile(FILE_MANIFEST)!.addDeletionOverride('files');

  // WHEN
  p.synth();

  const preDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const preFiles = Object.keys(preDirSnapshot);

  cleanup(p.outdir, []);

  const postDirSnapshot = directorySnapshot(p.outdir, { onlyFileNames: true });
  const postFiles = Object.keys(postDirSnapshot);

  const deletedFiles = preFiles.filter(f => !postFiles.includes(f));

  // THEN
  expect(postFiles).not.toContain('delete.txt');
  expect(deletedFiles).toMatchSnapshot();
});

