import { spawnSync } from 'child_process';
import { EOL } from 'os';
import { basename, join } from 'path';
import { mkdirpSync } from 'fs-extra';
import { Project } from '../..';
import { TaskRuntime } from '../../tasks';
import { TestProject } from '../util';

test('minimal case (just a shell command)', () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.addTask('test', {
    exec: 'echo hello_tasks!',
  });

  // THEN
  expect(executeTask(p, 'test')).toEqual(['hello_tasks!']);
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
      condition: 'echo evaluating_condition',
    });

    t.exec('echo step1');
    t.exec('echo step2');

    // THEN
    expect(executeTask(p, 'foo')).toEqual([
      'evaluating_condition',
      'step1',
      'step2',
    ]);
  });

  test('non-zero exit code means steps should not be executed', () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    const t = p.addTask('foo', {
      condition: 'echo failing_condition && false',
    });

    t.exec('echo step1');
    t.exec('echo step2');

    // THEN
    expect(executeTask(p, 'foo')).toEqual([
      'failing_condition',
    ]);
  });
});

describe('cwd', () => {
  test('default cwd is project root', () => {
    const p = new TestProject();
    p.addTask('test', { exec: 'echo cwd is $PWD' });
    expect(executeTask(p, 'test')[0].includes(basename(p.outdir))).toBeTruthy();
  });

  test('if a step changes cwd, it will not affect next steps', () => {
    const p = new TestProject();
    const task = p.addTask('test');
    task.exec('cd /tmp');
    task.exec('echo $PWD');
    expect(executeTask(p, 'test')[0].includes(basename(p.outdir))).toBeTruthy();
  });


  test('cwd can be set at the task level', () => {
    const p = new TestProject();
    const cwd = join(p.outdir, 'mypwd');
    mkdirpSync(cwd);
    const task = p.addTask('test', {
      cwd,
    });
    task.exec('echo step1=$PWD');
    task.exec('echo step2=$PWD');
    for (const line of executeTask(p, 'test')) {
      expect(line.includes('mypwd')).toBeTruthy();
    }
  });

  test('cwd can be set at step level', () => {
    const p = new TestProject();
    const taskcwd = join(p.outdir, 'mypwd');
    const stepcwd = join(p.outdir, 'yourpwd');
    mkdirpSync(taskcwd);
    mkdirpSync(stepcwd);
    const task = p.addTask('test', { cwd: taskcwd });
    task.exec('echo step1=$PWD');
    task.exec('echo step2=$PWD', { cwd: stepcwd });

    const lines = executeTask(p, 'test');
    expect(lines[0].includes('mypwd')).toBeTruthy();
    expect(lines[1].includes('yourpwd')).toBeTruthy();
  });

  test('fails gracefully if cwd does not exist (task level)', () => {
    const p = new TestProject();
    p.addTask('test', {
      cwd: join(p.outdir, 'not-found'),
      exec: 'echo hi',
    });
    expect(() => executeTask(p, 'test')).toThrow(/invalid workdir/);
  });

  test('fails gracefully if cwd does not exist (step level)', () => {
    const p = new TestProject();
    const task = p.addTask('test');
    task.exec('echo step', { cwd: join(p.outdir, 'mystep') });
    expect(() => executeTask(p, 'test')).toThrow(/must be an existing directory/);
  });
});

describe('say', () => {

  test('"say" can be used to print an info log during execution', () => {
    const p = new TestProject();
    const task = p.addTask('say');
    task.say('hello, world');

    p.synth();

    const rt = new TaskRuntime(p.outdir);
    expect(rt.tasks).toStrictEqual([{
      name: 'say',
      steps: [{ say: 'hello, world' }],
    }]);
  });

});

test('builtin tasks are scripts embedded inside projen', () => {
  const p = new TestProject();
  const task = p.addTask('boom');
  task.builtin('__tests__/tasks/fixtures/builtin-example');
  p.synth();

  const lines = executeTask(p, 'boom');
  expect(lines).toStrictEqual([
    'hello, I am a builtin task',
    'second line',
  ]);
});

function executeTask(p: Project, taskName: string) {
  p.synth();

  const args = [
    require.resolve('../../cli'),
    taskName,
  ].map(x => `"${x}"`);

  const result = spawnSync(`"${process.execPath}"`, args, { cwd: p.outdir, shell: true, env: { ...process.env } });
  if (result.status !== 0) {
    throw new Error(`non-zero exit code: ${result.stderr.toString('utf-8')}`);
  }

  return result.stdout.toString('utf-8').trim().split(EOL);
}
