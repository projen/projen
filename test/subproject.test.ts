import * as path from 'path';
import { chdir, cwd } from 'process';
import * as fs from 'fs-extra';
import { Project, TextFile, LogLevel, ProjectOptions } from '../src';
import { mkdtemp, TestProject } from './util';

test('composing projects declaratively', () => {
  const comp = new TestProject();
  new TestSubproject({ name: 'foo', parent: comp, outdir: path.join('packages', 'foo') });
  comp.synth();

  // THEN
  expect(fs.existsSync(path.join(comp.outdir, 'packages', 'foo', '.gitignore'))).toBeTruthy();
});

test('composing projects synthesizes to subdirs', () => {
  // GIVEN
  const comp = new TestProject();

  // WHEN
  new TestSubproject({ name: 'foo', parent: comp, outdir: path.join('packages', 'foo') });
  new TestSubproject({ name: 'bar', parent: comp, outdir: path.join('packages', 'bar') });

  comp.synth();

  // THEN
  expect(fs.pathExistsSync(path.join(comp.outdir, 'README.md')));
  expect(fs.pathExistsSync(path.join(comp.outdir, 'packages', 'foo', '.gitignore')));
  expect(fs.pathExistsSync(path.join(comp.outdir, 'packages', 'bar', '.gitignore')));
});

test('errors when paths overlap', () => {
  // GIVEN
  const comp = new TestProject();
  new TestSubproject({ name: 'foo', parent: comp, outdir: path.join('packages', 'foo') });

  // WHEN/THEN
  expect(() => new TestSubproject({ name: 'foo', parent: comp, outdir: path.join('packages', 'foo') })).toThrowError(/there is already a sub-project with/i);
});

test('multiple levels', () => {
  const root = new TestProject();
  const child1 = new TestSubproject({ name: 'child1', parent: root, outdir: 'child1' });
  const child2 = new TestSubproject({ name: 'child2', parent: child1, outdir: 'child2' });

  expect(child1.outdir).toEqual(path.join(root.outdir, 'child1'));
  expect(child2.outdir).toEqual(path.join(root.outdir, 'child1', 'child2'));
});

test('outdir="." can only be used if projenrc.js is present in the same directory (to protect against override)', () => {
  const workdir = mkdtemp();
  const restore = cwd();
  chdir(workdir);
  try {
    expect(() => new TestSubproject({ name: 'bam', outdir: '.' })).toThrow(/cannot use outdir="\." because projenrc\.js does not exist in the current directory/);
  } finally {
    chdir(restore);
  }
});

test('subprojects cannot introduce files that override each other', () => {
  const root = new TestProject();
  const child = new TestSubproject({ name: 'sub-project', parent: root, outdir: 'sub-project' });

  new TextFile(root, 'sub-project/file.txt');
  expect(() => new TextFile(child, 'file.txt')).toThrow(/there is already a file under sub-project\/file\.txt/);
});

test('"outdir" for subprojects must be relative', () => {
  const root = new TestProject();
  expect(() => new TestSubproject({ name: 'foobar', parent: root, outdir: '/foo/bar' })).toThrow(/"outdir" must be a relative path/);
});

class TestSubproject extends Project {
  constructor(options: ProjectOptions) {
    super({
      logging: {
        level: LogLevel.OFF,
      },
      ...options,
    });
  }
}
