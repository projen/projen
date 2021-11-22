import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { awscdk } from '../src';
import { AwsCdkTypeScriptApp } from '../src/awscdk-app-ts';
import { mkdtemp, synthSnapshot } from '../src/util/synth';

describe('cdkVersion is >= 2.0.0', () => {
  test('use "aws-cdk-lib" the constructs at ^10.0.5', () => {
    const project = new AwsCdkTypeScriptApp({
      cdkVersion: '2.0.0-rc.1',
      defaultReleaseBranch: 'main',
      name: 'test',
    });
    const snap = synthSnapshot(project);
    expect(snap['package.json'].dependencies).toStrictEqual({
      '@aws-cdk/assert': '^2.0.0-rc.1',
      'aws-cdk-lib': '^2.0.0-rc.1',
      'constructs': '^10.0.5',
    });
    expect(snap['src/main.ts'].indexOf('import { App, Stack, StackProps } from \'aws-cdk-lib\'')).not.toEqual(-1);
  });

  test('empty context', () => {
    const project = new AwsCdkTypeScriptApp({
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

    const project = new AwsCdkTypeScriptApp({
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
    const project = new AwsCdkTypeScriptApp({
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