import * as path from 'path';
import { LogLevel, Project, ProjectOptions } from '..';
import { SampleFile } from '../sample-file';
import { mkdtemp, synthSnapshot } from './util';


test('sample file from text contents', () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  new SampleFile(project, 'welcome.txt', { contents: 'hello\nworld' });

  // THEN
  expect(synthSnapshot(project)['welcome.txt']).toMatch('hello\nworld');
});

test('sample file from source', () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  new SampleFile(project, 'logo.svg', { source: path.resolve(__dirname, '..', '..', 'logo', 'projen.svg') });

  // THEN
  expect(synthSnapshot(project)['logo.svg']).toMatch('<?xml version="1.0" encoding="UTF-8" standalone="no"?>');
});

export class TestProject extends Project {
  constructor(options: Omit<ProjectOptions, 'name'> = {}) {
    const tmpdir = mkdtemp();
    super({
      name: 'my-project',
      outdir: tmpdir,
      clobber: false,
      logging: {
        level: LogLevel.OFF,
      },
      ...options,
    });
  }
}
