import { spawnSync } from 'child_process';
import { EOL } from 'os';
import { basename, join } from 'path';
import { mkdirpSync } from 'fs-extra';
import { Project } from '../../src';
import { TasksEngine } from '../../src/tasks';
import { TestProject } from '../../src/util/synth';

describe.each([TasksEngine.PROJEN_RUNTIME, TasksEngine.MAKE])('using engine %s', (engine) => {
  test('minimal case (just a shell command)', () => {
    // GIVEN
    const p = new TestProject({ tasksOptions: { engine } });

    // WHEN
    p.addTask('test1', {
      exec: 'echo hello_tasks!',
    });

    // THEN
    expect(executeTask(p, 'test1', engine).stdout).toEqual(['hello_tasks!']);
  });

  test('fails if the step fails', () => {
    // GIVEN
    const p = new TestProject({ tasksOptions: { engine } });

    // WHEN
    p.addTask('testme', {
      exec: 'false',
    });

    // THEN
    expect(() => executeTask(p, 'testme', engine)).toThrow();
  });

  test('multiple steps', () => {
    // GIVEN
    const p = new TestProject({ tasksOptions: { engine } });
    const t = p.addTask('testme');

    // WHEN
    t.exec('echo step1');
    t.exec('echo step2');
    t.exec('echo step3');

    // THEN
    expect(executeTask(p, 'testme', engine).stdout).toEqual([
      'step1',
      'step2',
      'step3',
    ]);
  });

  test('execution stops if a step fails', () => {
    // GIVEN
    const p = new TestProject({ tasksOptions: { engine } });
    const t = p.addTask('testme');

    // WHEN
    t.exec('echo step1');
    t.exec('echo step2');
    t.exec('echo step3');
    t.exec('echo failing && false');
    t.exec('echo step4');

    // THEN
    expect(() => executeTask(p, 'testme', engine)).toThrow();
  });

  describe('condition', () =>{
    test('zero exit code means that steps should be executed', () => {
      // GIVEN
      const p = new TestProject({ tasksOptions: { engine } });

      // WHEN
      const t = p.addTask('foo', {
        condition: 'echo evaluating_condition',
      });

      t.exec('echo step1');
      t.exec('echo step2');

      // THEN
      expect(executeTask(p, 'foo', engine).stdout).toEqual(expect.arrayContaining([
        'evaluating_condition',
        'step1',
        'step2',
      ]));
    });

    test('non-zero exit code means steps should not be executed', () => {
      // GIVEN
      const p = new TestProject({ tasksOptions: { engine } });

      // WHEN
      const t = p.addTask('foo', {
        condition: 'echo failing_condition && false',
      });

      t.exec('echo step1');
      t.exec('echo step2');

      // THEN
      expect(executeTask(p, 'foo', engine).stdout).toEqual([
        'failing_condition',
      ]);
    });
  });

  describe('cwd', () => {
    test('default cwd is project root', () => {
      // GIVEN
      const p = new TestProject({ tasksOptions: { engine } });

      // WHEN
      p.addTask('testme', { exec: 'echo cwd is $PWD' });

      // THEN
      expect(executeTask(p, 'testme', engine).stdout[0].includes(basename(p.outdir))).toBeTruthy();
    });

    test('if a step changes cwd, it will not affect next steps', () => {
      // GIVEN
      const p = new TestProject({ tasksOptions: { engine } });

      // WHEN
      const task = p.addTask('testme');
      task.exec('cd /tmp');
      task.exec('echo $PWD');

      // THEN
      expect(executeTask(p, 'testme', engine).stdout[0].includes(basename(p.outdir))).toBeTruthy();
    });


    test('cwd can be set at the task level', () => {
      // GIVEN
      const p = new TestProject({ tasksOptions: { engine } });

      // WHEN
      const cwd = join(p.outdir, 'mypwd');
      mkdirpSync(cwd);
      const task = p.addTask('testme', {
        cwd,
      });
      task.exec('echo step1=$PWD');
      task.exec('echo step2=$PWD');

      // THEN
      for (const line of executeTask(p, 'testme', engine).stdout) {
        expect(line.includes('mypwd')).toBeTruthy();
      }
    });

    test('cwd can be set at step level', () => {
      // GIVEN
      const p = new TestProject({ tasksOptions: { engine } });
      const taskcwd = join(p.outdir, 'mypwd');
      const stepcwd = join(p.outdir, 'yourpwd');
      mkdirpSync(taskcwd);
      mkdirpSync(stepcwd);

      // WHEN
      const task = p.addTask('testme', { cwd: taskcwd });
      task.exec('echo step1=$PWD');
      task.exec('echo step2=$PWD', { cwd: stepcwd });

      // THEN
      const lines = executeTask(p, 'testme', engine).stdout;
      expect(lines[0].includes('mypwd')).toBeTruthy();
      expect(lines[1].includes('yourpwd')).toBeTruthy();
    });

    if (engine === TasksEngine.PROJEN_RUNTIME) {
      test('fails gracefully if cwd does not exist (task level)', () => {
        // GIVEN
        const p = new TestProject({ tasksOptions: { engine } });

        // WHEN
        p.addTask('testme', {
          cwd: join(p.outdir, 'not-found'),
          exec: 'echo hi',
        });

        // THEN
        expect(() => executeTask(p, 'testme', engine)).toThrow(/invalid workdir/);
      });

      test('fails gracefully if cwd does not exist (step level)', () => {
        // GIVEN
        const p = new TestProject({ tasksOptions: { engine } });

        // WHEN
        const task = p.addTask('testme');
        task.exec('echo step', { cwd: join(p.outdir, 'mystep') });

        // THEN
        expect(() => executeTask(p, 'testme', engine)).toThrow(/must be an existing directory/);
      });
    }
  });

  describe('say', () => {

    test('"say" can be used to print an info log during execution', () => {
      // GIVEN
      const p = new TestProject({ tasksOptions: { engine } });

      // WHEN
      const task = p.addTask('say');
      task.say('hello, world');

      // THEN
      expect(executeTask(p, 'say', engine).stderr).toEqual(['hello, world']);
    });

  });

  test('builtin tasks are scripts embedded inside projen', () => {
    // GIVEN
    const p = new TestProject({ tasksOptions: { engine } });

    // WHEN
    const task = p.addTask('boom');
    task.builtin('tasks/builtin-example');
    p.synth();

    // THEN
    const lines = executeTask(p, 'boom', engine).stdout;
    expect(lines).toEqual([
      'hello, I am a builtin task',
      'second line',
    ]);
  });

  test('env is inherited from parent tasks', () => {
    // GIVEN
    const p = new TestProject({ tasksOptions: { engine } });

    // WHEN
    const parent = p.addTask('parent', { env: { E1: 'parent1', E2: 'parent2' } });
    const child = p.addTask('child', { env: { E2: 'child1', E3: 'child2' }, exec: 'echo "child: [$E1,$E2,$E3]"' });
    parent.exec('echo "parent: [$E1,$E2,$E3]"');
    parent.spawn(child);

    // THEN
    const lines = executeTask(p, 'parent', engine).stdout;
    expect(lines).toEqual([
      'parent: [parent1,parent2,]',
      'child: [parent1,child1,child2]',
    ]);
  });

  test('requiredEnv can be used to specify required environment variables', () => {
    // GIVEN
    const p = new TestProject({ tasksOptions: { engine } });

    // WHEN
    p.addTask('my-task', {
      requiredEnv: ['ENV1', 'ENV2', 'ENV3'],
      exec: 'echo "$ENV1 $ENV2 $ENV3"',
    });

    // THEN
    expect(() => executeTask(p, 'my-task', engine)).toThrow(/missing required environment variables: ENV1,ENV2,ENV3/);
    expect(() => executeTask(p, 'my-task', engine, { ENV1: 'env1' })).toThrow(/missing required environment variables: ENV2,ENV3/);
    expect(executeTask(p, 'my-task', engine, { ENV1: 'env1', ENV2: 'env2', ENV3: 'env3' }).stdout).toEqual([
      'env1 env2 env3',
    ]);
  });
});

function executeTask(p: Project, taskName: string, engine: TasksEngine, env: Record<string, string> = {}) {
  p.synth();

  let command: string, args: string[];
  if (engine === TasksEngine.PROJEN_RUNTIME) {
    command = `"${process.execPath}"`;
    args = [
      require.resolve('../../lib/cli'),
      taskName,
    ].map(x => `"${x}"`);;
  } else {
    command = 'make';
    args = [`"${taskName}"`];
  }

  const result = spawnSync(command, args, { cwd: p.outdir, shell: true, env: { ...process.env, ...env } });
  if (result.status !== 0) {
    throw new Error(`non-zero exit code: ${result.stderr.toString('utf-8')}`);
  }

  return {
    stdout: result.stdout.toString('utf-8').trim().split(EOL),
    stderr: result.stderr.toString('utf-8').trim().split(EOL),
  };
}
