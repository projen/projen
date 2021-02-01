import { LogLevel } from '../../logger';
import { PythonProject, PythonProjectOptions } from '../../python';
import { mkdtemp, synthSnapshot } from '../util';

test('defaults', () => {
  const p = new TestPythonProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test('dependencies', () => {
  const p = new TestPythonProject();
  p.addDependency('Django@3.1.5');
  p.addDependency('aws-cdk.core@*');
  p.addDevDependency('hypothesis@^6.0.3');
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test('dependencies via ctor', () => {
  const p = new TestPythonProject({
    deps: [
      'Django@3.1.5',
      'aws-cdk.core@*',
    ],
    devDeps: [
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
    super({
      ...options,
      clobber: false,
      name: 'test-python-project',
      pythonPath: '/usr/bin/python',
      authorName: 'First Last',
      authorEmail: 'email@example.com',
      version: '0.1.0',
      outdir: mkdtemp(),
      logging: { level: LogLevel.OFF },
      jsiiFqn: 'projen.python.PythonProject',
    });
  }
}
