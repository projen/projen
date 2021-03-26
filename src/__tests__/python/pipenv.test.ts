import { synthSnapshot } from '../util';
import { TestPythonProject } from './util';

test('pipenv enabled', () => {
  const p = new TestPythonProject({
    venv: false,
    pip: false,
    pipenv: true,
    deps: ['requests@*'],
  });

  const snapshot = synthSnapshot(p);
  expect(snapshot.Pipfile).toContain('[[source]]');
  expect(snapshot.Pipfile).toContain('[packages]');
  expect(snapshot.Pipfile).toContain('[dev-packages]');
  expect(snapshot.Pipfile).toContain('python_version = \"3\"');
});

test('pipenv custom python version', () => {
  const p = new TestPythonProject({
    venv: false,
    pip: false,
    pipenv: true,
    deps: ['requests@*'],
    pipenvOptions: {
      pipfileOptions: {
        pythonVersion: '3.9',
      },
    },
  });

  const snapshot = synthSnapshot(p);
  expect(snapshot.Pipfile).toContain('[[source]]');
  expect(snapshot.Pipfile).toContain('[packages]');
  expect(snapshot.Pipfile).toContain('[dev-packages]');
  expect(snapshot.Pipfile).toContain('python_version = \"3.9\"');
});
