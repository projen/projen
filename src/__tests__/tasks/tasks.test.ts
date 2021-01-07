import { spawnSync } from 'child_process';
import { Project } from '../..';
import { Task, Tasks, TasksManifest, TaskStep } from '../../tasks';
import { TestProject, synthSnapshot } from '../util';

test('no tasks, no tasks file', () => {
  const p = new TestProject();
  expect(synthTasksManifest(p)).toBeUndefined();
});

test('empty task', () => {
  const p = new TestProject();

  // WHEN
  p.addTask('empty');

  // THEN
  expectManifest(p, {
    tasks: {
      empty: {
        name: 'empty',
      },
    },
  });
});

test('multiple "exec" commands', () => {
  const p = new TestProject();

  // WHEN
  const task = p.addTask('hello', {
    description: 'hello, world',
    exec: 'echo hello', // initial command
    env: {
      FOO: 'bar',
    },
  });

  task.exec('echo world');
  task.exec('echo "with quotes"');
  task.env('BAR', 'baz');

  // THEN
  expectManifest(p, {
    tasks: {
      hello: {
        name: 'hello',
        description: 'hello, world',
        env: {
          FOO: 'bar',
          BAR: 'baz',
        },
        steps: [
          { exec: 'echo hello' },
          { exec: 'echo world' },
          { exec: 'echo "with quotes"' },
        ],
      },
    },
  });
});

test('subtasks', () => {
  // GIVEN
  const p = new TestProject();
  const hello = p.addTask('hello', { exec: 'echo hello' });
  const world = p.addTask('world');

  // WHEN
  world.exec('echo "running hello"');
  world.spawn(hello);

  // THEN
  expectManifest(p, {
    tasks: {
      hello: {
        name: 'hello',
        steps: [{ exec: 'echo hello' }],
      },
      world: {
        name: 'world',
        steps: [
          { exec: 'echo "running hello"' },
          { spawn: 'hello' },
        ],
      },
    },
  });
});

test('reset() can be used to reset task steps', () => {
  // GIVEN
  const p = new TestProject();
  const t0 = p.addTask('your-task');
  const t = p.addTask('my-task');
  t.exec('line1');
  t.spawn(t0);
  t.exec('line2');

  // WHEN
  t.reset('line3');
  t.exec('line4');

  // THEN
  expectManifest(p, {
    tasks: {
      'your-task': {
        name: 'your-task',
      },
      'my-task': {
        name: 'my-task',
        steps: [
          { exec: 'line3' },
          { exec: 'line4' },
        ],
      },
    },
  });
});

test('prependXXX() can be used to add steps from the top', () => {
  // GIVEN
  const p = new TestProject();
  const sub = p.addTask('my-sub-task', { exec: 'subexec' });

  const t = p.addTask('my-task');
  t.exec('line1');

  // WHEN
  t.prependExec('line2');
  t.prependSpawn(sub);
  t.prependSay('message');

  // THEN
  expectManifest(p, {
    tasks: {
      'my-sub-task': {
        name: 'my-sub-task',
        steps: [
          { exec: 'subexec' },
        ],
      },
      'my-task': {
        name: 'my-task',
        steps: [
          { say: 'message' },
          { spawn: 'my-sub-task' },
          { exec: 'line2' },
          { exec: 'line1' },
        ],
      },
    },
  });
});

test('env() can be used to add environment variables', () => {
  // GIVEN
  const p = new TestProject();
  const t = p.addTask('my-task', {
    env: {
      INITIAL: '123',
      ENV: '456',
    },
  });

  // WHEN
  t.env('FOO', 'BAR');
  t.env('HELLO', 'world');

  // THEN
  expectManifest(p, {
    tasks: {
      'my-task': {
        name: 'my-task',
        env: {
          INITIAL: '123',
          ENV: '456',
          FOO: 'BAR',
          HELLO: 'world',
        },
      },
    },
  });
});

test('.steps can be used to list all steps in the current task', () => {
  // GIVEN
  const p = new TestProject();
  const t0 = p.addTask('your');
  const t = p.addTask('my');
  t.exec('step1');
  t.exec('step2');
  t.exec('step3');
  t.spawn(t0);
  t.exec('step4');

  // WHEN
  const steps = t.steps;

  // THEN
  expect(steps).toStrictEqual([
    { exec: 'step1' },
    { exec: 'step2' },
    { exec: 'step3' },
    { spawn: 'your' },
    { exec: 'step4' },
  ] as TaskStep[]);
});

test('"condition" can be used to define a command that will determine if a task should be skipped', () => {
  // GIVEN
  const p = new TestProject();
  p.addTask('foo', {
    condition: 'false',
    exec: 'foo bar',
  });

  // THEN
  expectManifest(p, {
    tasks: {
      foo: {
        name: 'foo',
        condition: 'false',
        steps: [
          { exec: 'foo bar' },
        ],
      },
    },
  });
});

describe('toShellCommand()', () => {

  test('single step', () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    const t = p.addTask('foo', { exec: 'echo hi there' });

    // THEN
    expect(t.toShellCommand()).toMatchSnapshot();
    expect(shell(t)).toStrictEqual(['hi there']);
  });

  test('with a name', () => {
    // GIVEN
    const p = new TestProject();
    const t = p.addTask('foo');

    // WHEN
    t.exec('echo step 1', { name: 'STEP I' });

    // THEN
    expect(t.toShellCommand()).toMatchSnapshot();
    expect(shell(t)).toStrictEqual([
      'STEP I',
      'step 1',
    ]);
  });

  test('with a condition', () => {
    // GIVEN
    const p = new TestProject();
    const t = p.addTask('foo', {
      condition: '[ "${RUNME}" = "1" ]',
    });

    // WHEN
    t.exec('echo hello, world', { name: 'STEP I' });

    // THEN
    expect(t.toShellCommand()).toMatchSnapshot();
    expect(shell(t)).toStrictEqual([]);
    expect(shell(t, { RUNME: '1' })).toStrictEqual([
      'STEP I',
      'hello, world',
    ]);
  });

  test('multiple steps', () => {
    // GIVEN
    const p = new TestProject();
    const t = p.addTask('foo');

    // WHEN
    t.exec('echo step 1', { name: 'STEP I' });
    t.exec('echo step 2');
    t.exec('echo step 3', { name: 'STEP III' });

    // THEN
    expect(t.toShellCommand()).toMatchSnapshot();
    expect(shell(t)).toStrictEqual([
      'STEP I',
      'step 1',
      'step 2',
      'STEP III',
      'step 3',
    ]);
  });

  test('subtasks', () => {
    // GIVEN
    const p = new TestProject();
    const t1 = p.addTask('t1');
    const t2 = p.addTask('t2');

    // WHEN
    t1.exec('echo task1-step1');
    t1.exec('echo task1-step2');
    t2.exec('echo task2-step1');
    t2.spawn(t1, { name: 'spawning t1' });
    t2.exec('echo task2-step3');

    // THEN
    expect(t2.toShellCommand()).toMatchSnapshot();
    expect(shell(t2)).toStrictEqual([
      'task2-step1',
      'spawning t1',
      'task1-step1',
      'task1-step2',
      'task2-step3',
    ]);
  });

  test('with environment', () => {
    // GIVEN
    const p = new TestProject();
    p.tasks.addEnvironment('FOO', 'hello'); // global environment

    // WHEN
    const t1 = p.addTask('t1', {
      env: {
        BAR: '$(echo world)', // local environment
      },
      exec: 'echo $FOO, $BAR !',
    });

    // THEN
    expect(t1.toShellCommand()).toMatchSnapshot();
    expect(shell(t1)).toStrictEqual([
      'hello, world !',
    ]);
  });
});

function shell(t: Task, env: { [k: string]: string } = {}) {
  const result = spawnSync(t.toShellCommand(), { shell: true, env: { ...process.env, ...env } });
  if (result.status !== 0) {
    throw new Error(`non-zero exit code ${result.status}: ${result.stderr.toString('utf-8')}`);
  }

  return result.stdout.toString('utf-8').trim().split('\n').filter(x => x);
}

function expectManifest(p: Project, toStrictEqual: TasksManifest) {
  const manifest = synthTasksManifest(p);
  delete manifest['//'];
  expect(manifest).toStrictEqual(toStrictEqual);
}

function synthTasksManifest(p: Project) {
  return synthSnapshot(p)[Tasks.MANIFEST_FILE];;
}