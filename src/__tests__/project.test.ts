import * as path from 'path';
import { JsonFile, Project, TextFile } from '..';
import { TestProject } from './util';

test('file paths are relative to the project outdir', () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  const f = new TextFile(p, 'foo/bar.txt');

  // THEN
  expect(f.absolutePath).toBe(path.resolve(p.outdir, f.path));
  expect(path.isAbsolute(f.absolutePath)).toBeTruthy();
});

test('all files added to the project can be enumerated', () => {
  // GIVEN
  const p = new TestProject();
  new TextFile(p, 'my.txt');
  new JsonFile(p, 'your/file/me.json', { obj: {} });

  // WHEN
  const result = p.files;

  // THEN
  const exp = (e: string) => expect(result.map(x => x.path).includes(e)).toBeTruthy();
  exp('my.txt');
  exp('your/file/me.json');
});

test('findFile() can be used to find a file either absolute or relative path', () => {
  // GIVEN
  const p = new TestProject();
  const file = new JsonFile(p, 'your/file/me.json', { obj: {} });

  // WHEN
  const result1 = p.tryFindFile('your/file/me.json');
  const result2 = p.tryFindFile(path.resolve(p.outdir, 'your/file/me.json'));

  // THEN
  expect(result1 === file).toBeTruthy();
  expect(result2 === file).toBeTruthy();
});

test('findFile() will also look up files in subprojects', () => {
  // GIVEN
  const p = new TestProject();
  const child = new Project({ name: 'foobar', parent: p, outdir: 'subproject/foo/bar' });
  const fchild = new TextFile(child, 'fchild.txt');

  // WHEN
  const result1 = p.tryFindFile('subproject/foo/bar/fchild.txt');
  const result2 = child.tryFindFile('fchild.txt');

  // THEN
  expect(result1 === fchild).toBeTruthy();
  expect(result2 === fchild).toBeTruthy();
});

test('autoApprove is configured', () => {
  // WHEN
  const p = new TestProject({
    autoApproveOptions: {
      secret: 'MY_SECRET',
    },
  });

  // THEN
  expect(p.autoApprove).toBeDefined();
  expect(p.autoApprove?.label).toEqual('auto-approve');
});

test('github: false disables github integration', () => {
  // WHEN
  const p = new TestProject({
    github: false,
  });

  // THEN
  expect(p.github).toBeUndefined();
});