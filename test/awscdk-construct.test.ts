import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { aws_lambda } from '../src';
import { AwsCdkConstructLibrary, AwsCdkConstructLibraryOptions } from '../src/awscdk-construct';
import { NpmAccess } from '../src/node-package';
import { synthSnapshot } from './util';

describe('constructs dependency selection', () => {
  test('user-selected', () => {
    // GIVEN
    const project = new TestProject({ cdkVersion: '1.100.0', constructsVersion: '42.1337.0-ultimate.∞' });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['package.json']?.peerDependencies?.constructs).toBe('^42.1337.0-ultimate.∞');
    expect(snapshot['package.json']?.devDependencies?.constructs).toBe('42.1337.0-ultimate.∞');
    expect(snapshot['package.json']?.dependencies?.constructs).toBeUndefined();
  });


  test('for cdk 1.x', () => {
    // GIVEN
    const project = new TestProject({ cdkVersion: '1.100.0' });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['package.json']?.peerDependencies?.constructs).toMatch(/^\^3\./);
    expect(snapshot['package.json']?.devDependencies?.constructs).toBeUndefined();
    expect(snapshot['package.json']?.dependencies?.constructs).toBeUndefined();
  });

  test('for cdk 2.x', () => {
    // GIVEN
    const project = new TestProject({ cdkVersion: '2.0.0-alpha.5' });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['package.json']?.peerDependencies?.constructs).toMatch(/^\^10./);
    expect(snapshot['package.json']?.devDependencies?.constructs).toBeUndefined();
    expect(snapshot['package.json']?.dependencies?.constructs).toBeUndefined();
  });

  test('for cdk 3.x (does not exist yet)', () => {
    // GIVEN
    const project = new TestProject({ cdkVersion: '3.1337.42' });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['package.json']?.peerDependencies?.constructs).toBe('*');
    expect(snapshot['package.json']?.devDependencies?.constructs).toBeUndefined();
    expect(snapshot['package.json']?.dependencies?.constructs).toBeUndefined();
  });
});

describe('lambda functions', () => {
  test('are auto-discovered by default', () => {
    // GIVEN
    const project = new TestProject({
      cdkVersion: '1.100.0',
      libdir: 'liblib',
      lambdaOptions: {
        runtime: aws_lambda.Runtime.NODEJS_10_X,
        externals: ['foo', 'bar'],
      },
    });

    // WHEN
    mkdirSync(join(project.outdir, project.srcdir));
    writeFileSync(join(project.outdir, project.srcdir, 'my.lambda.ts'), '// dummy');

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot['src/my-function.ts']).not.toBeUndefined();
    expect(snapshot['.projen/tasks.json'].tasks['bundle:my'].steps).toStrictEqual([
      { exec: 'esbuild --bundle src/my.lambda.ts --target="node10" --platform="node" --outfile="liblib/my.bundle/index.js" --external:foo --external:bar' },
    ]);
  });

  test('auto-discover can be disabled', () => {
    // GIVEN
    const project = new TestProject({
      cdkVersion: '1.100.0',
      lambdaAutoDiscover: false,
    });

    // WHEN
    mkdirSync(join(project.outdir, project.srcdir));
    writeFileSync(join(project.outdir, project.srcdir, 'my.lambda.ts'), '// dummy');

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot['src/my-function.ts']).toBeUndefined();
    expect(snapshot['.projen/tasks.json'].tasks['bundle:my']).toBeUndefined();
  });
});

const defaultOptions = {
  author: 'Nobody',
  authorAddress: 'nobody@nowhere.com',
  clobber: false,
  defaultReleaseBranch: 'main',
  jest: false,
  name: 'test-project',
  npmAccess: NpmAccess.PUBLIC,
  repositoryUrl: 'https://github.com/projen/projen.git',
} as const;

class TestProject extends AwsCdkConstructLibrary {
  constructor(options: Omit<AwsCdkConstructLibraryOptions, keyof typeof defaultOptions>) {
    super({
      ...defaultOptions,
      ...options,
    });
  }
}
