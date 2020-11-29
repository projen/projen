import * as child_process from 'child_process';
import { SequenceRuntime } from '../src/seqs';
import { TestProject, synthSnapshot } from './util';

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

test('empty sequence', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  const spawnSpy = jest.spyOn(child_process, 'spawnSync');

  const p = new TestProject();
  p.addSequence('empty');

  // WHEN
  p.synth();

  // THEN
  const rt = new SequenceRuntime(p.outdir);
  rt.run(p.outdir, 'empty');

  expect(synthSnapshot(p)).toMatchSnapshot();
  expect(consoleSpy).not.toHaveBeenCalled();
  expect(spawnSpy).not.toHaveBeenCalled();
});
