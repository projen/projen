import { LogLevel } from '../../logger';
import { PythonProject, PythonProjectOptions } from '../../python';
import { mkdtemp, synthSnapshot } from '../util';

test('poetry enabled', () => {
  const p = new TestPythonProject({
    venv: false,
    pip: false,
    setuptools: false,
    poetry: true,
    homepage: 'http://www.example.com',
    description: 'a short project description',
    license: 'Apache Software License',
  });

  expect(synthSnapshot(p)).toMatchSnapshot();
});

class TestPythonProject extends PythonProject {
  constructor(options: Partial<PythonProjectOptions> = { }) {
    super({
      ...options,
      clobber: false,
      name: 'test-python-project',
      moduleName: 'test_python_project',
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
