import { LogLevel } from '../../logger';
import { PythonProject, PythonProjectOptions } from '../../python';
import { mkdtemp, synthSnapshot } from '../util';

test('setuptools enabled', () => {
  const p = new TestPythonProject({
    setuptools: true,
    authorEmail: 'foo@example.com',
    authorName: 'Firstname Lastname',
    homepage: 'http://www.example.com',
    description: 'a short project description',
    license: 'Apache Software License',
    setuptoolsOptions: {
      setupConfig: {
        classifiers: [
          'Development Status :: 4 - Beta',
        ],
      },
    },
  });

  const snapshot = synthSnapshot(p);
  expect(snapshot['setup.py']).toContain('foo@example.com');
  expect(snapshot['setup.py']).toContain('Firstname Lastname');
  expect(snapshot['setup.py']).toContain('http://www.example.com');
  expect(snapshot['setup.py']).toContain('a short project description');
  expect(snapshot['setup.py']).toContain('Apache Software License');
  expect(snapshot['setup.py']).toContain('Development Status :: 4 - Beta');
});

class TestPythonProject extends PythonProject {
  constructor(options: Partial<PythonProjectOptions> = { }) {
    super({
      ...options,
      clobber: false,
      name: 'test-python-project',
      pythonPath: '/usr/bin/python',
      outdir: mkdtemp(),
      logging: { level: LogLevel.OFF },
      jsiiFqn: 'projen.python.PythonProject',
    });
  }
}
