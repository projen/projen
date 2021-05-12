import { DependenciesUpgrade, NodeProject, UpgradeDependencies, UpgradeDependenciesSchedule } from '..';
import { NodeProjectOptions } from '../node-project';
import { mkdtemp, synthSnapshot } from './util';

test('throws if projen secret is not defined', () => {

  expect(() => {
    const project = createProject();
    new UpgradeDependencies(project);
  }).toThrowError('Projen secret must be configured to enable dependency upgrades via github actions');
});

test('default options', () => {

  const project = createProject({
    projenSecret: 'PROJEN_SECRET',
  });
  new UpgradeDependencies(project);

  const snapshot = synthSnapshot(project);
  expect(snapshot['.github/workflows/auto-upgrade-dependencies.yml']).toBeDefined();
  expect(snapshot['.github/workflows/auto-upgrade-dependencies.yml']).toMatchSnapshot();
});

test('custom options', () => {

  const project = createProject({
    projenSecret: 'PROJEN_SECRET',
  });
  new UpgradeDependencies(project, {
    schedule: UpgradeDependenciesSchedule.MONTHLY,
    autoApprove: false,
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot['.github/workflows/auto-upgrade-dependencies.yml']).toBeDefined();
  expect(snapshot['.github/workflows/auto-upgrade-dependencies.yml']).toMatchSnapshot();
});


function createProject(options: Omit<NodeProjectOptions, 'outdir' | 'defaultReleaseBranch' | 'name' | 'dependenciesUpgrade'> = {}): NodeProject {
  return new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: 'main',
    name: 'node-project',

    // quirky, but we do this because we test it directly via the
    // AutoUpgradeDependencies class.
    dependenciesUpgrade: DependenciesUpgrade.DISABLED,
    ...options,
  });
}