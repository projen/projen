import * as YAML from 'yaml';
import { JobPermission } from '../../github/workflows-model';
import { Release } from '../../release';
import { synthSnapshot, TestProject } from '../util';

test('minimal', () => {
  // GIVEN
  const project = new TestProject();
  const task = project.addTask('release');

  // WHEN
  new Release(project, {
    task: task,
    versionFile: 'version.json',
    branch: 'main',
  });

  const outdir = synthSnapshot(project);
  expect(outdir).toMatchSnapshot();
});

test('with major version filter', () => {
  // GIVEN
  const project = new TestProject();
  const task = project.addTask('release');

  // WHEN
  new Release(project, {
    task: task,
    versionFile: 'version.json',
    branch: '10.x',
    majorVersion: 10,
    releaseWorkflowName: 'release',
  });

  // THEN
  const outdir = synthSnapshot(project);
  expect(outdir['.github/workflows/release.yml']).toBeDefined();
  expect(outdir).toMatchSnapshot();
});

test('addBranch() can be used for additional release branches', () => {
  // GIVEN
  const project = new TestProject();
  const task = project.addTask('release');
  const release = new Release(project, {
    task: task,
    versionFile: 'version.json',
    branch: 'main',
    majorVersion: 1,
  });

  // WHEN
  release.addBranch('2.x', { majorVersion: 2 });
  release.addBranch('10.x', { majorVersion: 10 });

  // THEN
  const outdir = synthSnapshot(project);
  expect(outdir['.github/workflows/release.yml']).toBeDefined();
  expect(outdir['.github/workflows/release-2.x.yml']).toBeDefined();
  expect(outdir['.github/workflows/release-10.x.yml']).toBeDefined();
  expect(outdir).toMatchSnapshot();
});

test('if multiple branches are defined, the default branch requires a "majorVersion"', () => {
  // GIVEN
  const project = new TestProject();
  const task = project.addTask('release');
  const release = new Release(project, {
    task: task,
    versionFile: 'version.json',
    branch: 'main',
  });

  // WHEN
  const addBranch = () => release.addBranch('2.x', { majorVersion: 2 });

  // THEN
  expect(addBranch).toThrow(/you must specify \"majorVersion\" for the default branch when adding multiple release branches/);
});

test('publisher (defaults)', () => {
  // GIVEN
  const project = new TestProject();
  const task = project.addTask('release');
  const release = new Release(project, {
    task: task,
    versionFile: 'version.json',
    branch: 'main',
  });

  // WHEN
  release.publisher.publishToGo();
  release.publisher.publishToMaven();
  release.publisher.publishToNpm();
  release.publisher.publishToNuget();
  release.publisher.publishToPyPi();

  // THEN
  const outdir = synthSnapshot(project);
  expect(outdir['.github/workflows/release.yml']).toMatchSnapshot();
});

test('publishers are added as jobs to all release workflows', () => {
  // GIVEN
  const project = new TestProject();
  const task = project.addTask('release');
  const release = new Release(project, {
    task: task,
    versionFile: 'version.json',
    branch: 'main',
    majorVersion: 1,
  });

  // WHEN
  release.addBranch('2.x', { majorVersion: 2 });
  release.publisher.publishToNpm();

  // THEN
  const outdir = synthSnapshot(project);
  const wf1 = YAML.parse(outdir['.github/workflows/release.yml']);
  expect(wf1).toMatchObject({
    on: { push: { branches: ['main'] } },
    jobs: {
      release: { },
      release_npm: { },
    },
  });
  const wf2 = YAML.parse(outdir['.github/workflows/release-2.x.yml']);
  expect(wf2).toMatchObject({
    on: { push: { branches: ['2.x'] } },
    jobs: {
      release: { },
      release_npm: { },
    },
  });
});

test('addJobs() can be used to add arbitrary jobs to the release workflows', () => {
  // GIVEN
  const project = new TestProject();
  const task = project.addTask('release');
  const release = new Release(project, {
    task: task,
    versionFile: 'version.json',
    branch: 'main',
    majorVersion: 0,
  });

  release.addBranch('foo', { majorVersion: 4, workflowName: 'foo-workflow' });
  release.publisher.publishToPyPi();

  // WHEN
  release.addJobs({
    random_job: {
      runsOn: 'foo',
      permissions: {
        actions: JobPermission.NONE,
      },
      steps: [],
    },
  });

  // THEN
  const outdir = synthSnapshot(project);
  expect(outdir).toMatchSnapshot();
});

test('majorVersion can be 0', () => {
  // GIVEN
  const project = new TestProject();
  const task = project.addTask('release');

  // WHEN
  new Release(project, {
    task: task,
    versionFile: 'goo.json',
    branch: 'main',
    majorVersion: 0,
  });

  // THEN
  const outdir = synthSnapshot(project);
  expect(outdir['.github/workflows/release.yml']).toMatchSnapshot();
});

test('prerelease can be specified per branch', () => {
  // GIVEN
  const project = new TestProject();
  const task = project.addTask('release');

  // WHEN
  const release = new Release(project, {
    task: task,
    versionFile: 'goo.json',
    branch: 'main',
    majorVersion: 0,
  });

  release.addBranch('10.x', { majorVersion: 10, prerelease: 'pre' });

  // THEN
  const outdir = synthSnapshot(project);
  expect(outdir['.github/workflows/release.yml']).toMatchSnapshot();
  expect(outdir['.github/workflows/release.10.x.yml']).toMatchSnapshot();
});

test('releaseBranches can be use to define additional branches', () => {
  // GIVEN
  const project = new TestProject();
  const task = project.addTask('release');

  // WHEN
  new Release(project, {
    task: task,
    versionFile: 'goo.json',
    branch: 'main',
    majorVersion: 1,
    releaseBranches: {
      '3.x': { majorVersion: 3 },
      'next': { majorVersion: 4, prerelease: 'pre' },
    },
  });

  const outdir = synthSnapshot(project);
  expect(outdir).toMatchSnapshot();
});

test('releaseBranches as an array throws an error since type was changed', () => {
  // GIVEN
  const project = new TestProject();
  const task = project.addTask('release');

  // WHEN
  expect(() => new Release(project, {
    task: task,
    versionFile: 'goo.json',
    branch: 'main',
    majorVersion: 1,
    releaseBranches: ['10.x', '2.x'] as any,
  })).toThrow(/\"releaseBranches\" is no longer an array. See type annotations/);
});