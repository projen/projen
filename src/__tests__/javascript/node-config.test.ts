import { NodeConfig } from '../../javascript/node-config';
import { LogLevel } from '../../logger';
import { NodeProject, NodeProjectOptions } from '../../node-project';
import { mkdtemp, synthSnapshot } from '../util';

test('registry is handled correctly', () => {
  const prj = new TestNodeProject({
    name: 'test-project',
    defaultReleaseBranch: 'main',
  });

  const npmrc = new NodeConfig(prj, {
    registry: 'https://my.registry.com/mirror',
  });
  npmrc.configureRegistry('@company', 'https://my.registry.com/private');

  const out = synthSnapshot(prj);
  expect(out['.npmrc']).toMatchSnapshot();
});

test('default registry is used correctly', () => {
  const prj = new TestNodeProject({
    name: 'test-project',
    defaultReleaseBranch: 'main',
  });

  const npmrc = new NodeConfig(prj);
  npmrc.configureRegistry('@company', 'https://my.registry.com/private');

  const out = synthSnapshot(prj);
  expect(out['.npmrc']).toMatchSnapshot();
});

test('generic prop is set correctly', () => {
  const prj = new TestNodeProject({
    name: 'test-project',
    defaultReleaseBranch: 'main',
  });

  const npmrc = new NodeConfig(prj);
  npmrc.addConfig('key', 'value');

  const out = synthSnapshot(prj);
  expect(out['.npmrc']).toMatchSnapshot();
});

class TestNodeProject extends NodeProject {
  constructor(options: Partial<NodeProjectOptions> = {}) {
    super({
      outdir: mkdtemp(),
      name: 'test-node-project',
      logging: {
        level: LogLevel.OFF,
      },
      defaultReleaseBranch: 'master',
      ...options,
    });
  }
}