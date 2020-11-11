import * as path from 'path';
import * as fs from 'fs-extra';
import { NodeProject, Project, CompositeProject } from '../src';
import * as logging from '../src/logging';

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
  const comp = new CompositeProject({
    projects: [
      {
        path: path.join('packages', 'foo'),
        project: new Project(),
      },
    ],
  });

  comp.synth(tempDir);

  // THEN
  expect(fs.existsSync(path.join(tempDir, 'packages', 'foo', '.gitignore'))).toBeTruthy();
});

test('composing projects synthesizes to subdirs', () => {
  // GIVEN
  const comp = new CompositeProject();

  // WHEN
  comp.addProject(path.join('packages', 'foo'), new NodeProject({ name: 'foo' }));
  comp.addProject(path.join('packages', 'bar'), new NodeProject({ name: 'bar' }));

  comp.synth(tempDir);

  // THEN
  expect(fs.pathExistsSync(path.join(tempDir, 'README.md')));
  expect(fs.readJSONSync(path.join(tempDir, 'packages', 'foo', 'package.json')))
    .toEqual(expect.objectContaining({
      name: 'foo',
    }));
  expect(fs.readJSONSync(path.join(tempDir, 'packages', 'bar', 'package.json')))
    .toEqual(expect.objectContaining({
      name: 'bar',
    }));
});

test('errors when paths overlap', () => {
  // GIVEN
  const comp = new CompositeProject();
  comp.addProject(path.join('packages', 'foo'), new NodeProject({ name: 'foo' }));

  // WHEN/THEN
  expect(() => {
    comp.addProject(path.join('packages', 'foo'), new NodeProject({ name: 'bar' }));
  }).toThrowError(/foo.*already in use/i);
});
