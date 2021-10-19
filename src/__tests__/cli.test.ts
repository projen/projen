import { join } from 'path';
import { writeFileSync } from 'fs-extra';
import { LogLevel } from '../logger';
import { Project } from '../project';
import { directorySnapshot, execProjenCLI, mkdtemp } from '../_test-utils';

const MOCK_PROJENRC = "new (require('projen').Project)({ name: 'foo' }).synth()";

test('the "--rc" option can be used to specify projenrc location', () => {
  const dir1 = mkdtemp();
  const dir2 = mkdtemp();

  const rcfile = join(dir1, 'custom-projenrc.js');
  writeFileSync(rcfile, MOCK_PROJENRC);

  execProjenCLI(dir2, ['--rc', rcfile]);
  expect(directorySnapshot(dir2)).toMatchSnapshot();
});

test('running "projen" with no arguments will execute .projenrc.js', () => {
  const workdir = mkdtemp();
  const rcfile = join(workdir, '.projenrc.js');
  writeFileSync(rcfile, MOCK_PROJENRC);

  execProjenCLI(workdir);
  expect(directorySnapshot(workdir)).toMatchSnapshot();
});

test('running "projen" for projects with a "default" task will execute it', () => {
  const workdir = mkdtemp();
  const project = new Project({ outdir: workdir, name: 'my-project', logging: { level: LogLevel.OFF } });
  project.addTask(Project.DEFAULT_TASK, { exec: 'echo "foo" > bar.txt' });
  project.synth();

  execProjenCLI(workdir);
  expect(directorySnapshot(workdir)['bar.txt']).toStrictEqual('foo\n');
});
