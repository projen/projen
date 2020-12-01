import { spawnSync } from 'child_process';
import { Project } from '../../src';
import { TestProject } from '../util';

test('minimal case (just a shell command)', () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.addTask('test', {
    exec: 'echo "hello, tasks!"',
  });

  // THEN
  expect(executeTask(p, 'test')).toEqual(['hello, tasks!']);
});

test('fails if the step fails', () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.addTask('test', {
    exec: 'false',
  });

  // THEN
  expect(() => executeTask(p, 'test')).toThrow(/Task \"test\" failed when executing \"false\"/);
});

test('multiple steps', () => {
  // GIVEN
  const p = new TestProject();
  const t = p.addTask('test');

  // WHEN
  t.exec('echo step1');
  t.exec('echo step2');
  t.exec('echo step3');

  // THEN
  expect(executeTask(p, 'test')).toEqual([
    'step1',
    'step2',
    'step3',
  ]);
});

test('execution stops if a step fails', () => {
  // GIVEN
  const p = new TestProject();
  const t = p.addTask('test');

  // WHEN
  t.exec('echo step1');
  t.exec('echo step2');
  t.exec('echo step3');
  t.exec('echo failing && false');
  t.exec('echo step4');

  // THEN
  expect(() => executeTask(p, 'test')).toThrow(/Task \"test\" failed when executing \"echo failing && false\"/);
});

describe('condition', () =>{
  test('zero exit code means that steps should be executed', () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    const t = p.addTask('foo', {
      condition: 'echo "evaluating condition"',
    });

    t.exec('echo step1');
    t.exec('echo step2');

    // THEN
    expect(executeTask(p, 'foo')).toEqual([
      'evaluating condition',
      'step1',
      'step2',
    ]);
  });

  test('non-zero exit code means steps should not be executed', () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    const t = p.addTask('foo', {
      condition: 'echo "failing condition" && false',
    });

    t.exec('echo step1');
    t.exec('echo step2');

    // THEN
    expect(executeTask(p, 'foo')).toEqual([
      'failing condition',
    ]);
  });
});

function executeTask(p: Project, taskName: string) {
  p.synth();

  const args = [
    require.resolve('../../lib/cli'),
    taskName,
  ];

  const result = spawnSync(process.execPath, args, { cwd: p.outdir });
  if (result.status !== 0) {
    throw new Error(`non-zero exit code: ${result.stderr.toString('utf-8')}`);
  }

  return result.stdout.toString('utf-8').trim().split('\n');
}
