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

  const snapshot = synthSnapshot(p);
  expect(snapshot['pyproject.toml']).toContain('name = "test-python-project"');
  expect(snapshot['pyproject.toml']).toContain('authors = [');
  expect(snapshot['pyproject.toml']).toContain('First Last <email@example.com>');
  expect(snapshot['pyproject.toml']).toContain('homepage = "http://www.example.com"');
  expect(snapshot['pyproject.toml']).toContain('description = "a short project description"');
  expect(snapshot['pyproject.toml']).toContain('license = "Apache-2.0"');
  expect(snapshot['pyproject.toml']).toContain('classifiers = [');
  expect(snapshot['pyproject.toml']).toContain('Development Status :: 4 - Beta');
  expect(snapshot['pyproject.toml']).toContain('maintainers = [');
  expect(snapshot['pyproject.toml']).toContain('First-2 Last-2');
  expect(snapshot['pyproject.toml']).toContain('repository = "https://github.com/test-python-project"');
  expect(snapshot['pyproject.toml']).toContain('keywords = [');
  expect(snapshot['pyproject.toml']).toContain('Keyword1');
  expect(snapshot['pyproject.toml']).toContain('[[tool.poetry.packages]]');
  expect(snapshot['pyproject.toml']).toContain('include = "my_package"');
  expect(snapshot['pyproject.toml']).toContain('include = [ "CHANGELOG.md" ]');
  expect(snapshot['pyproject.toml']).toContain('exclude = [ "my_package/excluded.py" ]');
  expect(snapshot['pyproject.toml']).toContain('[[tool.poetry.source]]');
  expect(snapshot['pyproject.toml']).toContain('url = "https://pypi.org/simple/"');
  expect(snapshot['pyproject.toml']).toContain('[tool.poetry.scripts]');
  expect(snapshot['pyproject.toml']).toContain('test-python-cli = "test-python-project.cli:cli"');
  expect(snapshot['pyproject.toml']).toContain('[tool.poetry.extras]');
  expect(snapshot['pyproject.toml']).toContain('cli = [ "package1", "package2" ]');
  expect(snapshot['pyproject.toml']).toContain('[tool.poetry.plugins."blogtool.parsers"]');
  expect(snapshot['pyproject.toml']).toContain('".rst" = "some_module:SomeClass"');
  expect(snapshot['pyproject.toml']).toContain('[tool.poetry.urls]');
  expect(snapshot['pyproject.toml']).toContain('"bug tracker" = "https://github.com/test-python-project/issues"');
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
