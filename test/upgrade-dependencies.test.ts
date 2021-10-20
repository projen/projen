import { NodeProject, UpgradeDependenciesSchedule } from '../src';
import { NodeProjectOptions } from '../src/node-project';
import { Tasks } from '../src/tasks';
import { mkdtemp, synthSnapshot } from './util';

test('upgrades command includes all dependencies', () => {

  const project = createProject({
    deps: ['some-dep'],
  });

  const deps = 'jest jest-junit npm-check-updates standard-version some-dep';

  const tasks = synthSnapshot(project)[Tasks.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[6].exec).toStrictEqual(`yarn upgrade ${deps}`);

});

test('upgrades command includes dependencies added post instantiation', () => {

  const project = createProject({});

  project.addDeps('some-dep');

  const deps = 'jest jest-junit npm-check-updates standard-version some-dep';

  const tasks = synthSnapshot(project)[Tasks.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[6].exec).toStrictEqual(`yarn upgrade ${deps}`);

});

test('upgrades command doesnt include ignored packages', () => {

  const project = createProject({
    projenUpgradeSecret: 'PROJEN_SECRET',
    deps: ['dep1', 'dep2'],
    depsUpgradeOptions: {
      exclude: ['dep2'],
    },
  });

  const deps = 'jest jest-junit npm-check-updates projen standard-version dep1';

  const tasks = synthSnapshot(project)[Tasks.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[6].exec).toStrictEqual(`yarn upgrade ${deps}`);

});

test('upgrades command includes only included packages', () => {

  const project = createProject({
    projenUpgradeSecret: 'PROJEN_SECRET',
    deps: ['dep1', 'dep2'],
    depsUpgradeOptions: {
      include: ['dep1'],
    },
  });

  const deps = 'dep1';

  const tasks = synthSnapshot(project)[Tasks.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[6].exec).toStrictEqual(`yarn upgrade ${deps}`);

});

test('default options', () => {

  const project = createProject({
    projenUpgradeSecret: 'PROJEN_SECRET',
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot['.github/workflows/upgrade-main.yml']).toBeDefined();
  expect(snapshot['.github/workflows/upgrade-main.yml']).toMatchSnapshot();
});

test('custom options', () => {

  const project = createProject({
    projenUpgradeSecret: 'PROJEN_SECRET',
    depsUpgradeOptions: {
      workflowOptions: {
        schedule: UpgradeDependenciesSchedule.MONTHLY,
      },
    },
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot['.github/workflows/upgrade-main.yml']).toBeDefined();
  expect(snapshot['.github/workflows/upgrade-main.yml']).toMatchSnapshot();
});

test('branches default to release branches', () => {
  const project = createProject({
    projenUpgradeSecret: 'PROJEN_SECRET',
    majorVersion: 1,
    releaseBranches: {
      branch1: { majorVersion: 2 },
      branch2: { majorVersion: 3 },
    },
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot['.github/workflows/upgrade-main.yml']).toBeDefined();
  expect(snapshot['.github/workflows/upgrade-main.yml']).toMatchSnapshot();
  expect(snapshot['.github/workflows/upgrade-branch1.yml']).toBeDefined();
  expect(snapshot['.github/workflows/upgrade-branch1.yml']).toMatchSnapshot();
  expect(snapshot['.github/workflows/upgrade-branch2.yml']).toBeDefined();
  expect(snapshot['.github/workflows/upgrade-branch2.yml']).toMatchSnapshot();
});

test('considers branches added post project instantiation', () => {
  const project = createProject({
    projenUpgradeSecret: 'PROJEN_SECRET',
    majorVersion: 1,
    releaseBranches: {
      branch1: { majorVersion: 2 },
    },
  });

  project.release?.addBranch('branch2', { majorVersion: 3 });

  const snapshot = synthSnapshot(project);
  expect(snapshot['.github/workflows/upgrade-main.yml']).toBeDefined();
  expect(snapshot['.github/workflows/upgrade-main.yml']).toMatchSnapshot();
  expect(snapshot['.github/workflows/upgrade-branch1.yml']).toBeDefined();
  expect(snapshot['.github/workflows/upgrade-branch1.yml']).toMatchSnapshot();
  expect(snapshot['.github/workflows/upgrade-branch2.yml']).toBeDefined();
  expect(snapshot['.github/workflows/upgrade-branch2.yml']).toMatchSnapshot();
});

test('can upgrade multiple branches', () => {

  const project = createProject({
    projenUpgradeSecret: 'PROJEN_SECRET',
    depsUpgradeOptions: {
      workflowOptions: {
        branches: ['branch1', 'branch2'],
      },
    },
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot['.github/workflows/upgrade-branch1.yml']).toBeDefined();
  expect(snapshot['.github/workflows/upgrade-branch1.yml']).toMatchSnapshot();
  expect(snapshot['.github/workflows/upgrade-branch2.yml']).toBeDefined();
  expect(snapshot['.github/workflows/upgrade-branch2.yml']).toMatchSnapshot();

});

function createProject(options: Omit<NodeProjectOptions, 'outdir' | 'defaultReleaseBranch' | 'name' | 'dependenciesUpgrade'> = {}): NodeProject {
  return new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: 'main',
    name: 'node-project',
    ...options,
  });
}