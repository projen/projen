import { LogLevel } from '../../logger';
import { PythonProject, PythonProjectOptions } from '../../python';
import { execOrUndefined } from '../../util';
import { mkdtemp, synthSnapshot } from '../util';

test('defaults', () => {
  const p = new TestPythonProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test('dependencies', () => {
  const p = new TestPythonProject();
  p.addDependency('Django@3.1.5');
  p.addDependency('aws-cdk.core@*');
  p.addTestDependency('hypothesis@^6.0.3');
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test('dependencies via ctor', () => {
  const p = new TestPythonProject({
    deps: [
      'Django@3.1.5',
      'aws-cdk.core@*',
    ],
    testDeps: [
      'hypothesis@^6.0.3',
    ],
  });
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test('no pytest', () => {
  const p = new TestPythonProject({
    pytest: false,
  });

  expect(synthSnapshot(p)).toMatchSnapshot();
});

class TestPythonProject extends PythonProject {
  constructor(options: Partial<PythonProjectOptions> = { }) {
    const workdir = mkdtemp();
    const pythonPath = execOrUndefined('which python', { cwd: workdir });

    if (!pythonPath) {
      fail('Failed to obtain a valid python executable path for tests.');
    }

    super({
      ...options,
      clobber: false,
      name: 'test-python-project',
      pythonPath: pythonPath,
      outdir: workdir,
      logging: { level: LogLevel.OFF },
      jsiiFqn: 'projen.python.PythonProject',
    });
  }
}
