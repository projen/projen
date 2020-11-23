import * as path from 'path';
import { chdir, cwd } from 'process';
import * as fs from 'fs-extra';
import { Project } from '../src';
import * as logging from '../src/logging';
import { mkdtemp, TestProject } from './util';

logging.disable();

let tempDir: string;
beforeEach(() => {
  tempDir = fs.mkdtempSync(path.join(__dirname, 'tmp.subdir'));
});

afterEach(() => {
  if (tempDir) {
    fs.removeSync(tempDir);
  }
});

test('composing projects declaratively', () => {
  const comp = new Project({ outdir: tempDir });
  new Project({ parent: comp, outdir: path.join('packages', 'foo') });
  comp.synth();

  // THEN
  expect(fs.existsSync(path.join(tempDir, 'packages', 'foo', '.gitignore'))).toBeTruthy();
});

test('composing projects synthesizes to subdirs', () => {
  // GIVEN
  const comp = new Project({ outdir: tempDir });

  // WHEN
  new Project({ parent: comp, outdir: path.join('packages', 'foo') });
  new Project({ parent: comp, outdir: path.join('packages', 'bar') });

  comp.synth();

  // THEN
  expect(fs.pathExistsSync(path.join(tempDir, 'README.md')));
  expect(fs.pathExistsSync(path.join(tempDir, 'packages', 'foo', '.gitignore')));
  expect(fs.pathExistsSync(path.join(tempDir, 'packages', 'bar', '.gitignore')));
});

test('errors when paths overlap', () => {
  // GIVEN
  const comp = new Project({ outdir: tempDir });
  new Project({ parent: comp, outdir: path.join('packages', 'foo') });

  // WHEN/THEN
  expect(() => new Project({ parent: comp, outdir: path.join('packages', 'foo') })).toThrowError(/there is already a sub-project with/i);
});

test('multiple levels', () => {
  const root = new TestProject();
  const child1 = new Project({ parent: root, outdir: 'child1' });
  const child2 = new Project({ parent: child1, outdir: 'child2' });

  expect(child1.outdir).toEqual(path.join(root.outdir, 'child1'));
  expect(child2.outdir).toEqual(path.join(root.outdir, 'child1', 'child2'));
});

test('outdir="." can only be used if projenrc.js is present in the same directory (to protect against override)', () => {
  const workdir = mkdtemp();
  const restore = cwd();
  chdir(workdir);
  try {
    expect(() => new Project({ outdir: '.' })).toThrow(/cannot use outdir="\." because projenrc\.js does not exist in the current directory/);
  } finally {
    chdir(restore);
  }
});