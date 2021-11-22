import { Project } from '../../src';
import { TasksEngine } from '../../src/tasks';
import { synthSnapshot, TestProject } from '../../src/util/synth';

test('empty task', () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.addTask('empty');

  // THEN
  const makefile = synthMakefile(p);
  expect(makefile).toMatchSnapshot();
});

test('multiple "exec" commands', () => {
  // GIVEN
  const p = new TestProject({ tasksOptions: { engine: TasksEngine.MAKE } });

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
  const makefile = synthMakefile(p);
  expect(makefile).toMatchSnapshot();
});

test('subtasks', () => {
  // GIVEN
  const p = new TestProject({ tasksOptions: { engine: TasksEngine.MAKE } });
  const hello = p.addTask('hello', { exec: 'echo hello' });
  const world = p.addTask('world');

  // WHEN
  world.exec('echo "running hello"');
  world.spawn(hello);

  // THEN
  const makefile = synthMakefile(p);
  expect(makefile).toMatchSnapshot();
});

test('env() can be used to add environment variables', () => {
  // GIVEN
  const p = new TestProject({ tasksOptions: { engine: TasksEngine.MAKE } });
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
  const makefile = synthMakefile(p);
  expect(makefile).toMatchSnapshot();
});

test('"condition" can be used to define a command that will determine if a task should be skipped', () => {
  // GIVEN
  const p = new TestProject({ tasksOptions: { engine: TasksEngine.MAKE } });

  // WHEN
  p.addTask('foo', {
    condition: 'false',
    exec: 'foo bar',
  });

  // THEN
  const makefile = synthMakefile(p);
  expect(makefile).toMatchSnapshot();
});

test('"builtin" can be used to execute builtin commands', () => {
  // GIVEN
  const p = new TestProject({ tasksOptions: { engine: TasksEngine.MAKE } });
  const task = p.addTask('foo', {
    condition: 'false',
  });

  // WHEN
  task.builtin('tasks/builtin-example');

  // THEN
  const makefile = synthMakefile(p) as string;

  // sanitize output - the test runs in a random temporary directory, so the
  // resolved path to the builtin will not be consistent
  const sanitized = makefile.replace(/node .*lib\//, 'node lib/');

  expect(sanitized).toMatchSnapshot();
});

test('"requiredEnv" can be used to specify required environment variables', () => {
  // GIVEN
  const p = new TestProject({ tasksOptions: { engine: TasksEngine.MAKE } });

  // WHEN
  p.addTask('foo', {
    requiredEnv: ['MISSING1', 'MISSING2', 'NOT_MISSING'],
  });

  // THEN
  const makefile = synthMakefile(p);
  expect(makefile).toMatchSnapshot();
});

function synthMakefile(p: Project) {
  return synthSnapshot(p).Makefile;
}