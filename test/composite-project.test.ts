import * as path from 'path';
import * as fs from 'fs-extra';
import { NodeProject } from '../src';
import { CompositeProject } from '../src/composite-project';
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

test('composing projects synthesizes to subdirs', () => {
  // GIVEN
  const comp = new CompositeProject();

  // WHEN
  comp.addProject('packages/foo', new NodeProject({ name: 'foo' }));
  comp.addProject('packages/bar', new NodeProject({ name: 'bar' }));

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
  comp.addProject('packages/foo', new NodeProject({ name: 'foo' }));

  // WHEN/THEN
  expect(() => {
    comp.addProject('packages/foo', new NodeProject({ name: 'bar' }));
  }).toThrowError(/foo.*already in use/i);
});