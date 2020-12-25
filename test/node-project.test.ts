import { NodeProject } from '../src';
import * as logging from '../src/logging';
import { mkdtemp, synthSnapshot } from './util';

logging.disable();

test('license file is added by default', () => {
  // WHEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: 'test-node-project',
    mergify: false,
    projenDevDependency: false,
  });

  // THEN
  expect(synthSnapshot(project).LICENSE).toContain('Apache License');
});

test('license file is not added if licensed is false', () => {
  // WHEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: 'test-node-project',
    licensed: false,
    mergify: false,
    projenDevDependency: false,
  });

  // THEN
  const snapshot = synthSnapshot(project);
  expect(snapshot.LICENSE).toBeUndefined();
  expect(snapshot['.gitignore']).not.toContain('LICENSE');
  expect(snapshot['package.json'].license).toEqual('UNLICENSED');
});
