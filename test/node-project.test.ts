import { NodeProject } from '../src';
import { synthSnapshot } from './util';

test('license file is added by default', () => {
  // WHEN
  const project = new NodeProject({
    name: 'test-node-project',
    start: false,
    mergify: false,
    projenDevDependency: false,
  });

  // THEN
  expect(synthSnapshot(project, 'LICENSE').LICENSE).toContain('Apache License');
});

test('license file is not added if licensed is false', () => {
  // WHEN
  const project = new NodeProject({
    name: 'test-node-project',
    licensed: false,
    start: false,
    mergify: false,
    projenDevDependency: false,
  });

  // THEN
  const snapshot = synthSnapshot(project, 'LICENSE', '.gitignore', 'package.json');
  console.log(snapshot);
  expect(Object.keys(snapshot).sort()).toEqual(['.gitignore', 'package.json'].sort());
  expect(snapshot['.gitignore']).not.toContain('LICENSE');
  expect(snapshot['package.json'].license).toEqual('UNLICENSED');
});
