import { NodeProject, UpgradeDependenciesSchedule } from '..';
import { DependenciesUpgradeMechanism, NodeProjectOptions } from '../node-project';
import { Tasks } from '../tasks';
import { mkdtemp, synthSnapshot } from './util';

test('upgrades command includes all dependencies', () => {

  const project = createProject({
    deps: ['some-dep'],
  });

  const deps = 'jest jest-junit npm-check-updates standard-version some-dep';

  const tasks = synthSnapshot(project)[Tasks.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[2].exec).toStrictEqual(`yarn upgrade ${deps}`);

});

test('upgrades command includes dependencies added post instantiation', () => {

  const project = createProject({});

  project.addDeps('some-dep');

  const deps = 'jest jest-junit npm-check-updates standard-version some-dep';

  const tasks = synthSnapshot(project)[Tasks.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[2].exec).toStrictEqual(`yarn upgrade ${deps}`);

});

test('upgrades command doesnt include ignored packages', () => {

  const project = createProject({
    projenUpgradeSecret: 'PROJEN_SECRET',
    deps: ['dep1', 'dep2'],
    depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
      exclude: ['dep2'],
    }),
  });

  const deps = 'jest jest-junit npm-check-updates standard-version dep1';

  const tasks = synthSnapshot(project)[Tasks.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[2].exec).toStrictEqual(`yarn upgrade ${deps}`);

});

test('upgrades command includes only included packages', () => {

  const project = createProject({
    projenUpgradeSecret: 'PROJEN_SECRET',
    deps: ['dep1', 'dep2'],
    depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
      include: ['dep1'],
    }),
  });

  const deps = 'dep1';

  const tasks = synthSnapshot(project)[Tasks.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[2].exec).toStrictEqual(`yarn upgrade ${deps}`);

});

test('default options', () => {

  const project = createProject({
    projenUpgradeSecret: 'PROJEN_SECRET',
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot['.github/workflows/upgrade.yml']).toBeDefined();
  expect(snapshot['.github/workflows/upgrade.yml']).toMatchSnapshot();
});

test('custom options', () => {

  const project = createProject({
    projenUpgradeSecret: 'PROJEN_SECRET',
    depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
      workflowOptions: {
        schedule: UpgradeDependenciesSchedule.MONTHLY,
      },
    }),
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot['.github/workflows/upgrade.yml']).toBeDefined();
  expect(snapshot['.github/workflows/upgrade.yml']).toMatchSnapshot();
});


function createProject(options: Omit<NodeProjectOptions, 'outdir' | 'defaultReleaseBranch' | 'name' | 'dependenciesUpgrade'> = {}): NodeProject {
  return new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: 'main',
    name: 'node-project',
    ...options,
  });
}