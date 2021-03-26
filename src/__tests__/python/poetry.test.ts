import { synthSnapshot } from '../util';
import { TestPythonProject } from './util';

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
