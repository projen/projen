import * as child_process from 'child_process';
import { tasks } from '../src';
import { TestProject, synthSnapshot } from './util';

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

test('empty task', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  const spawnSpy = jest.spyOn(child_process, 'spawnSync');

  const p = new TestProject();
  p.addTask('empty');

  // WHEN
  p.synth();

  // THEN
  const rt = new tasks.TaskRuntime(p.outdir);
  rt.run('empty');

  expect(synthSnapshot(p)).toMatchSnapshot();
  expect(consoleSpy).not.toHaveBeenCalled();
  expect(spawnSpy).not.toHaveBeenCalled();
});
