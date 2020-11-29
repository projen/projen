import { Project } from '../src';
import { Task, TaskManifest, TaskStep } from '../src/tasks';
import { TestProject, synthSnapshot } from './util';

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
  world.subtask(hello);

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
          { subtask: 'hello' },
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
  t.subtask(t0);
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

test('prepend() can be used to add steps from the top', () => {
  // GIVEN
  const p = new TestProject();
  const t = p.addTask('my-task');
  t.exec('line1');

  // WHEN
  t.prepend('line2');
  t.prepend('line3');

  // THEN
  expectManifest(p, {
    tasks: {
      'my-task': {
        name: 'my-task',
        steps: [
          { exec: 'line3' },
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
  t.subtask(t0);
  t.exec('step4');

  // WHEN
  const steps = t.steps;

  // THEN
  expect(steps).toStrictEqual([
    { exec: 'step1' },
    { exec: 'step2' },
    { exec: 'step3' },
    { subtask: 'your' },
    { exec: 'step4' },
  ] as TaskStep[]);
});


function expectManifest(p: Project, toStrictEqual: TaskManifest) {
  const manifest = synthSnapshot(p)[Task.MANIFEST_FILE];
  delete manifest['//'];

  expect(manifest).toStrictEqual(toStrictEqual);
}