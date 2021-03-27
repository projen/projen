import { NodeProject } from '..';
import { DependenciesUpgrade } from '../dependencies-upgrade';
import { DependabotScheduleInterval, VersioningStrategy } from '../github';
import { mkdtemp, synthSnapshot } from './util';

test('default is github actions if a secret is defined', () => {

  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: 'main',
    name: 'node-project',
    projenSecret: 'PROJEN_SECRET',
  });

  expect(synthSnapshot(project)['.github/workflows/dependencies-upgrade.yml']).toBeDefined();
  expect(synthSnapshot(project)['.github/workflows/dependencies-upgrade.yml']).toMatchSnapshot();
  expect(synthSnapshot(project)['.github/dependabot.yml']).toBeUndefined();

});

test('default is dependabot if a secret is not defined', () => {

  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: 'main',
    name: 'node-project',
  });

  expect(synthSnapshot(project)['.github/dependabot.yml']).toBeDefined();
  expect(synthSnapshot(project)['.github/dependabot.yml']).toMatchSnapshot();
  expect(synthSnapshot(project)['.github/workflows/dependencies-upgrade.yml']).toBeUndefined();

});

test('can be disabled', () => {

  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: 'main',
    name: 'node-project',
    dependenciesUpgrade: DependenciesUpgrade.DISABLED,
  });

  expect(synthSnapshot(project)['.github/dependabot.yml']).toBeUndefined();
  expect(synthSnapshot(project)['.github/workflows/dependencies-upgrade.yml']).toBeUndefined();

});

describe('github actions', () => {

  test('throws if projen secret is not defined', () => {

    expect(() => {
      new NodeProject({
        outdir: mkdtemp(),
        defaultReleaseBranch: 'main',
        name: 'node-project',
        dependenciesUpgrade: DependenciesUpgrade.GITHUB_ACTIONS,
      });
    }).toThrowError('Projen secret must be configured to enable dependency upgrades via github actions');
  });

  test('default options', () => {

    const project = new NodeProject({
      outdir: mkdtemp(),
      defaultReleaseBranch: 'main',
      name: 'node-project',
      projenSecret: 'PROJEN_SECRET',
      dependenciesUpgrade: DependenciesUpgrade.GITHUB_ACTIONS,
    });

    expect(synthSnapshot(project)['.github/workflows/dependencies-upgrade.yml']).toBeDefined();
    expect(synthSnapshot(project)['.github/workflows/dependencies-upgrade.yml']).toMatchSnapshot();
  });

  test('custom options', () => {

    const project = new NodeProject({
      outdir: mkdtemp(),
      defaultReleaseBranch: 'main',
      name: 'node-project',
      projenSecret: 'PROJEN_SECRET',
      dependenciesUpgrade: DependenciesUpgrade.githubActions({
        schedule: '0 9 * * 1',
        autoApprove: false,
      }),
    });

    expect(synthSnapshot(project)['.github/workflows/dependencies-upgrade.yml']).toBeDefined();
    expect(synthSnapshot(project)['.github/workflows/dependencies-upgrade.yml']).toMatchSnapshot();
  });

});


describe('dependabot', () => {

  test('throws if projen secret is not defined and auto approve is enabled', () => {

    expect(() => {
      new NodeProject({
        outdir: mkdtemp(),
        defaultReleaseBranch: 'main',
        name: 'node-project',
        dependenciesUpgrade: DependenciesUpgrade.dependabot({ autoApprove: true }),
      });
    }).toThrowError('Project must have auto-approve configured in order to auto-approve dependabot PRs');
  });

  test('default options', () => {

    const project = new NodeProject({
      outdir: mkdtemp(),
      defaultReleaseBranch: 'main',
      name: 'node-project',
      dependenciesUpgrade: DependenciesUpgrade.DEPENDABOT,
    });

    expect(synthSnapshot(project)['.github/dependabot.yml']).toBeDefined();
    expect(synthSnapshot(project)['.github/dependabot.yml']).toMatchSnapshot();
  });

  test('custom options', () => {

    const project = new NodeProject({
      outdir: mkdtemp(),
      defaultReleaseBranch: 'main',
      name: 'node-project',
      dependenciesUpgrade: DependenciesUpgrade.dependabot({
        ignore: [{ dependencyName: 'dep' }],
        ignoreProjen: false,
        scheduleInterval: DependabotScheduleInterval.MONTHLY,
        versioningStrategy: VersioningStrategy.INCREASE_IF_NECESSARY,
      }),
    });

    expect(synthSnapshot(project)['.github/dependabot.yml']).toBeDefined();
    expect(synthSnapshot(project)['.github/dependabot.yml']).toMatchSnapshot();

  });

});