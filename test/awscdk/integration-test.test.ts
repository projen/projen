import { awscdk, AwsCdkTypeScriptApp } from '../../src';
import { Testing } from '../../src/testing';

describe('IntegrationTest', () => {
  // GIVEN
  const project = new AwsCdkTypeScriptApp({ name: 'test', defaultReleaseBranch: 'main', cdkVersion: '1.134.0' });

  // WHEN
  new awscdk.IntegrationTest(project, {
    entrypoint: 'test/foo.integ.ts',
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
