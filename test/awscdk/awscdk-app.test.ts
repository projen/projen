import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { awscdk } from '../../src';
import { mkdtemp, synthSnapshot } from '../util';

describe('cdkVersion is >= 2.0.0', () => {
  test('use "aws-cdk-lib" the constructs at ^10.0.5', () => {
    const project = new awscdk.AwsCdkTypeScriptApp({
      cdkVersion: '2.0.0-rc.1',
      defaultReleaseBranch: 'main',
      name: 'test',
    });
    const snap = synthSnapshot(project);
    expect(snap['package.json'].dependencies).toStrictEqual({
      'aws-cdk-lib': '^2.0.0-rc.1',
      'constructs': '^10.0.5',
    });
    expect(snap['src/main.ts'].indexOf('import { App, Stack, StackProps } from \'aws-cdk-lib\'')).not.toEqual(-1);
  });

  test('empty context', () => {
    const project = new awscdk.AwsCdkTypeScriptApp({
      cdkVersion: '2.0.0-rc.1',
      defaultReleaseBranch: 'main',
      name: 'test',
    });
    const snap = synthSnapshot(project);
    expect(snap['cdk.json'].context).toBeUndefined();
  });
});


describe('lambda functions', () => {
  test('are auto-discovered by default', () => {
    // GIVEN
    const outdir = mkdtemp();
    mkdirSync(join(outdir, 'src'));
    writeFileSync(join(outdir, 'src', 'my.lambda.ts'), '// dummy');

    const project = new awscdk.AwsCdkTypeScriptApp({
      name: 'hello',
      outdir: outdir,
      defaultReleaseBranch: 'main',
      cdkVersion: '1.100.0',
      libdir: 'liblib',
      lambdaOptions: {
        runtime: awscdk.LambdaRuntime.NODEJS_10_X,
        bundlingOptions: {
          externals: ['foo', 'bar'],
        },
      },
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot['src/my-function.ts']).not.toBeUndefined();
    expect(snapshot['.projen/tasks.json'].tasks['bundle:my.lambda'].steps).toStrictEqual([
      { exec: 'esbuild --bundle src/my.lambda.ts --target="node10" --platform="node" --outfile="assets/my.lambda/index.js" --external:foo --external:bar' },
    ]);
  });

  test('auto-discover can be disabled', () => {
    // GIVEN
    const project = new awscdk.AwsCdkTypeScriptApp({
      name: 'hello',
      defaultReleaseBranch: 'main',
      cdkVersion: '1.100.0',
      lambdaAutoDiscover: false,
    });

    // WHEN
    mkdirSync(join(project.outdir, project.srcdir));
    writeFileSync(join(project.outdir, project.srcdir, 'my.lambda.ts'), '// dummy');

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot['src/my-function.ts']).toBeUndefined();
    expect(snapshot['.projen/tasks.json'].tasks['bundle:src/my']).toBeUndefined();
  });
});

describe('watch', () => {

  let project: awscdk.AwsCdkTypeScriptApp;
  let files: Record<string, any>;

  beforeEach(() => {
    project = new awscdk.AwsCdkTypeScriptApp({
      name: 'hello',
      defaultReleaseBranch: 'main',
      cdkVersion: '1.100.0',
    });

    files = synthSnapshot(project);
  });

  it('adds a "watch" task', () => {
    expect(files['.projen/tasks.json'].tasks.watch).toStrictEqual({
      name: 'watch',
      description: 'Watches changes in your source code and rebuilds and deploys to the current account',
      steps: [
        { exec: 'cdk deploy --hotswap' },
        { exec: 'cdk watch' },
      ],
    });
  });

  it('configures the "build" option in cdk.json to bundle lambda functions', () => {
    expect(files['cdk.json'].build).toStrictEqual('npx projen bundle');
  });

  it('removes the "bundle" task from pre-compile', () => {
    expect(files['.projen/tasks.json'].tasks['pre-compile'].steps).toBeUndefined();
  });

});

test('CDK v1 usage', () => {
  const project = new awscdk.AwsCdkTypeScriptApp({
    cdkVersion: '1.126.0',
    defaultReleaseBranch: 'main',
    name: 'test',
  });

  const snap = synthSnapshot(project);
  expect(snap['package.json'].dependencies).toStrictEqual({
    '@aws-cdk/core': '^1.126.0',
    'constructs': '^3.2.27',
  });
});


describe('CDK Plugins', () => {

  test('plugin set', () => {

    const plugins = ['cdk-assume-role-credential-plugin'];

    const project = new awscdk.AwsCdkTypeScriptApp({
      name: 'test',
      defaultReleaseBranch: 'main',
      cdkVersion: '1.133.0',
      cdkPlugins: plugins,
    });

    const files = synthSnapshot(project);

    expect( files['cdk.json'].plugin ).toStrictEqual(plugins);

    expect(Object.keys(files['package.json'].devDependencies)).toContain(plugins[0]);
  });

  test('local plugin set', () => {

    const plugins = ['foo@/full/path/to/my-plugin.js'];

    const project = new awscdk.AwsCdkTypeScriptApp({
      name: 'test',
      defaultReleaseBranch: 'main',
      cdkVersion: '1.133.0',
      cdkPlugins: plugins,
    });

    const files = synthSnapshot(project);

    expect( files['cdk.json'].plugin ).toStrictEqual(['foo']);

    expect(Object.keys(files['package.json'].devDependencies)).toContain('foo');

    expect(files['package.json'].devDependencies.foo).toStrictEqual('/full/path/to/my-plugin.js');
  });

  test('scoped plugin set', () => {

    const plugins = ['@foo/bar'];

    const project = new awscdk.AwsCdkTypeScriptApp({
      name: 'test',
      defaultReleaseBranch: 'main',
      cdkVersion: '1.133.0',
      cdkPlugins: plugins,
    });

    const files = synthSnapshot(project);

    expect( files['cdk.json'].plugin ).toStrictEqual(plugins);

    expect(Object.keys(files['package.json'].devDependencies)).toContain(plugins[0]);
  });

  test('scoped and versioned plugin set', () => {

    const plugins = ['@foo/bar@^1.0.0'];

    const project = new awscdk.AwsCdkTypeScriptApp({
      name: 'test',
      defaultReleaseBranch: 'main',
      cdkVersion: '1.133.0',
      cdkPlugins: plugins,
    });

    const files = synthSnapshot(project);

    expect( files['cdk.json'].plugin ).toStrictEqual(['@foo/bar']);

    expect(Object.keys(files['package.json'].devDependencies)).toContain('@foo/bar');

    expect(files['package.json'].devDependencies['@foo/bar']).toStrictEqual('^1.0.0');
  });

  test('versioned plugin set', () => {

    const plugins = ['foo/bar@^1.0.0'];

    const project = new awscdk.AwsCdkTypeScriptApp({
      name: 'test',
      defaultReleaseBranch: 'main',
      cdkVersion: '1.133.0',
      cdkPlugins: plugins,
    });

    const files = synthSnapshot(project);

    expect( files['cdk.json'].plugin ).toStrictEqual(['foo/bar']);

    expect(Object.keys(files['package.json'].devDependencies)).toContain('foo/bar');

    expect(files['package.json'].devDependencies['foo/bar']).toStrictEqual('^1.0.0');
  });

  test('no plugins set', () => {

    const project = new awscdk.AwsCdkTypeScriptApp({
      name: 'test',
      defaultReleaseBranch: 'main',
      cdkVersion: '1.133.0',
    });

    const files = synthSnapshot(project);

    expect( files['cdk.json'].plugin ).toStrictEqual( undefined );
  });
});