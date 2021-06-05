import { LogLevel } from '../../logger';
import { ReactProject, ReactProjectOptions } from '../../web';
import { mkdtemp, synthSnapshot } from '../util';

test('defaults', () => {
  const p = new TestReactProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test('rewire creates config-overrides.js', () => {
  const p = new TestReactProject({
    rewire: {
      'module.prop1': false,
      'module.prop2': 5,
      'module.prop3': [1, 2],
      'module.prop4': { one: 2 },
      'module.prop5': 'one',
    },
  });
  const snapshot = synthSnapshot(p)['config-overrides.js'];
  expect(snapshot).toMatchSnapshot();
});

test('rewire replaces react-scripts', () => {
  const p = new TestReactProject({
    rewire: { 'module.prop1': false },
  });

  function assertExec(taskName: string, script: string) {
    const task = p.tasks.tryFind(taskName);
    if (!task) {
      throw new Error(`Task not found: ${taskName}`);
    }
    expect(task.steps[0].exec).toEqual(script);
  }

  assertExec('build', 'react-app-rewired build');
  assertExec('test', 'react-app-rewired test');
  assertExec('dev', 'react-app-rewired start');
  assertExec('eject', 'react-scripts eject');
});

class TestReactProject extends ReactProject {
  constructor(options: Partial<ReactProjectOptions> = { }) {
    super({
      ...options,
      clobber: false,
      name: 'test-nextjs-project',
      outdir: mkdtemp(),
      logging: { level: LogLevel.OFF },
      defaultReleaseBranch: 'main',
      projenVersion: '^1.2.3',
    });
  }
}
