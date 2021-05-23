import { NodeConfigFile } from '../../javascript/node-config';
import { LogLevel } from '../../logger';
import { NodeProject, NodeProjectOptions } from '../../node-project';
import { mkdtemp, synthSnapshot } from '../util';

test('registry is handled correctly', () => {
  const prj = new TestNodeProject({
    name: 'test-project',
    defaultReleaseBranch: 'main',
  });

  const npmrc = new NodeConfigFile(prj);
  npmrc.configureRegistry('https://my.registry.com/mirror');
  npmrc.configureRegistry('https://my.registry.com/private', '@company');

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