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
    license: 'Apache-2.0',
    classifiers: [
      'Development Status :: 4 - Beta',
    ],
  });

  const snapshot = synthSnapshot(p);
  expect(snapshot['pyproject.toml']).toContain('First Last');
  expect(snapshot['pyproject.toml']).toContain('email@example.com');
  expect(snapshot['pyproject.toml']).toContain('http://www.example.com');
  expect(snapshot['pyproject.toml']).toContain('a short project description');
  expect(snapshot['pyproject.toml']).toContain('Apache-2.0');
  expect(snapshot['pyproject.toml']).toContain('Development Status :: 4 - Beta');
});

test('poetry enabled with poetry-specific options', () => {
  const p = new TestPythonProject({
    venv: false,
    pip: false,
    setuptools: false,
    poetry: true,
    homepage: 'http://www.example.com',
    description: 'a short project description',
    license: 'Apache-2.0',
    classifiers: [
      'Development Status :: 4 - Beta',
    ],
    deps: [
      'package1@0.0.1',
      'package2@0.0.2',
    ],
    poetryOptions: {
      maintainers: ['First-2 Last-2'],
      repository: 'https://github.com/test-python-project',
      keywords: ['Keyword1'],
      packages: [
        {
          include: 'my_package',
          format: 'sdist',
        },
      ],
      include: ['CHANGELOG.md'],
      exclude: ['my_package/excluded.py'],
      source: [
        {
          name: 'pypi_',
          url: 'https://pypi.org/simple/',
          default: true,
        },
      ],
      scripts: {
        'test-python-cli': 'test-python-project.cli:cli',
      },
      extras: {
        cli: [
          'package1',
          'package2',
        ],
      },
      plugins: {
        'blogtool.parsers': {
          '.rst': 'some_module:SomeClass',
        },
      },
      urls: {
        'bug tracker': 'https://github.com/test-python-project/issues',
      },
    },
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
      authorName: 'First Last',
      authorEmail: 'email@example.com',
      version: '0.1.0',
      outdir: mkdtemp(),
      logging: { level: LogLevel.OFF },
    });
  }
}
