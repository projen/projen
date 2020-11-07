import { NodeProject } from '../src';
import { synthSnapshot } from './util';

test('license file is added by default', () => {
  // WHEN
  const project = new NodeProject({
    name: 'test-node-project',
    start: false,
    mergify: false
  });

  // THEN
  expect(synthSnapshot(project, ['LICENSE'])['LICENSE']).toContain("Apache License");
});

test('license file is not added if licensed is false', () => {
  // WHEN
  const project = new NodeProject({
    name: 'test-node-project',
    licensed: false,
    start: false,
    mergify: false
  });

  // THEN
  const snapshot = synthSnapshot(project, ['LICENSE', '.gitignore']);
  expect(snapshot).toMatchSnapshot();
});
