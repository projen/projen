import { awscdk, DependencyType } from '../../src';
import { AwsCdkDeps, IntegrationTest } from '../../src/awscdk';
import { Testing } from '../../src/testing';
import { TypeScriptProject } from '../../src/typescript';

describe('IntegrationTest', () => {
  // GIVEN
  const project = new awscdk.AwsCdkTypeScriptApp({ name: 'test', defaultReleaseBranch: 'main', cdkVersion: '1.134.0' });

  // WHEN
  new awscdk.IntegrationTest(project, {
    entrypoint: 'test/foo.integ.ts',
    tsconfigPath: project.tsconfigDev.fileName,
    cdkDeps: project.cdkDeps,
  });

  // THEN
  const output = Testing.synth(project);

  // we expect .npmignore to exclude the integration test's cdkout directory
  // and the various temporary directories created during execution.
  test('npmignore', () => {
    [
      'test/.tmp/foo.integ/deploy.cdk.out',
      'test/.tmp/foo.integ/synth.cdk.out',
      'test/foo.integ.snapshot',
    ].forEach(i => expect(output['.npmignore']).toContain(i));
  });

  // exclude cloud assembly manifests and assets from
  // resulting assembly (as well as nested assemblies)
  // but include cloudformation templates.
  test('gitignore', () => {
    [
      'test/foo.integ.snapshot/asset.*',
      'test/foo.integ.snapshot/**/asset.*',
      'test/foo.integ.snapshot/cdk.out',
      'test/foo.integ.snapshot/**/cdk.out',
      'test/foo.integ.snapshot/manifest.json',
      'test/foo.integ.snapshot/**/manifest.json',
      'test/foo.integ.snapshot/tree.json',
      'test/foo.integ.snapshot/**/tree.json',
      'test/.tmp/foo.integ/deploy.cdk.out',
      'test/.tmp/foo.integ/synth.cdk.out',
      '!test/foo.integ.snapshot',
    ].forEach(i => expect(output['.gitignore']).toContain(i));
  });

  test('tasks', () => {
  // list of expected tasks
    const expectedTaskNames = [
      'integ:foo:assert',
      'integ:foo:deploy',
      'integ:foo:destroy',
      'integ:foo:snapshot',
      'integ:foo:watch',
    ];

    const actualTaskNames = Object.keys(output['.projen/tasks.json'].tasks);
    for (const t of expectedTaskNames) {
      expect(actualTaskNames).toContain(t);
      expect(output['.projen/tasks.json'].tasks[t]).toMatchSnapshot();
    }
  });
});

test('installs ts-node if needed', () => {
  const project = new TypeScriptProject({
    name: 'test',
    defaultReleaseBranch: 'main',
  });

  new IntegrationTest(project, {
    entrypoint: 'test/foo.integ.ts',
    tsconfigPath: project.tsconfigDev.fileName,
    cdkDeps: new AwsCdkDeps(project, { cdkVersion: '1.0.0', dependencyType: DependencyType.RUNTIME }),
  });

  expect(project.deps.getDependency('ts-node')).toStrictEqual({
    name: 'ts-node',
    type: 'build',
  });
});

test('synthesizing cdk v2 integration tests', () => {
  // GIVEN
  const project = new awscdk.AwsCdkTypeScriptApp({ name: 'test', defaultReleaseBranch: 'main', cdkVersion: '2.3.1' });

  // WHEN
  new awscdk.IntegrationTest(project, {
    entrypoint: 'test/foo.integ.ts',
    tsconfigPath: project.tsconfigDev.fileName,
    cdkDeps: project.cdkDeps,
  });

  // THEN
  const output = Testing.synth(project);

  const tasks = output['.projen/tasks.json'].tasks;
  expect(tasks['integ:foo:deploy'].steps).toEqual(
    expect.arrayContaining([
      { exec: 'cdk deploy --app "ts-node -P tsconfig.dev.json test/foo.integ.ts" --no-version-reporting --require-approval=never -o test/.tmp/foo.integ/deploy.cdk.out' },
    ]),
  );
  expect(tasks['integ:foo:snapshot'].steps).toEqual(
    expect.arrayContaining([
      { exec: 'cdk synth --app "ts-node -P tsconfig.dev.json test/foo.integ.ts" --no-version-reporting -o test/foo.integ.snapshot > /dev/null' },
    ]),
  );
  expect(tasks['integ:foo:watch'].steps).toEqual(
    expect.arrayContaining([
      { exec: 'cdk watch --app "ts-node -P tsconfig.dev.json test/foo.integ.ts" --no-version-reporting -o test/.tmp/foo.integ/deploy.cdk.out' },
    ]),
  );
});