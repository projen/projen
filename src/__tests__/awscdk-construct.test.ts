import each from 'jest-each';
import { AwsCdkConstructLibrary, AwsCdkConstructLibraryOptions } from '../awscdk-construct';
import { DependencyType } from '../deps';
import { LogLevel } from '../logger';
import { NpmAccess } from '../node-package';
import { mkdtemp, synthSnapshot } from './util';

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

describe('lambda bundle', () => {

  const cdkVersion = '1.100.0';

  each(['ts', 'js']).test('given %s handler then construct and bundle task are created', (handlerExt: string) => {
    // GIVEN
    const project = new TestProject({
      cdkVersion,
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN construct created
    expect(snapshot[`src/__tests__/integration/lambda/mylambda-${handlerExt}.ts`]).toMatchSnapshot();
    expect(snapshot[`src/__tests__/integration/lambda/mylambda-${handlerExt}.ts`].length).toBeGreaterThan(1);

    // THEN bundle task created
    expect(project.compileTask.steps).toContainEqual(expect.objectContaining({
      spawn: `bundleLambda:src/__tests__/integration/lambda/mylambda-${handlerExt}.lambda.${handlerExt}`,
    }));
  });

  test('given custom suffix handler then construct and bundle task are created', () => {
    // GIVEN
    const project = new TestProject({
      cdkVersion,
      bundleLambdaOptions: {
        suffix: '.customlambda',
      },
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN construct created
    expect(snapshot['src/__tests__/integration/lambda/custom-suffix.ts'].length).toBeGreaterThan(1);

    // THEN bundle task created
    expect(project.compileTask.steps).toContainEqual(expect.objectContaining({
      spawn: 'bundleLambda:src/__tests__/integration/lambda/custom-suffix.customlambda.ts',
    }));
  });

  test('given then aws-sdk and esbuild devDeps added', () => {
    // GIVEN
    const project = new TestProject({
      cdkVersion,
    });

    // THEN
    expect(project.deps.getDependency('aws-sdk', DependencyType.BUILD)).toBeDefined();
    expect(project.deps.getDependency('esbuild', DependencyType.BUILD)).toBeDefined();
  });

  test('given then eslint rule override added', () => {
    // GIVEN
    const project = new TestProject({
      cdkVersion,
    });

    // THEN
    expect(project.eslint?.overrides).toContainEqual({
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
      files: [
        'src/**/*.lambda\\.@(ts|js)',
      ],
    });
  });

  test('do nothing when turned off', () => {
    // GIVEN
    const project = new TestProject({
      cdkVersion,
      bundleLambda: false,
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['src/__tests__/integration/lambda/mylambda-ts.ts']).toBeUndefined();
    expect(project.compileTask.steps).toContainEqual(expect.not.objectContaining({
      spawn: 'bundleLambda:src/__tests__/integration/lambda/mylambda-ts.lambda.ts',
    }));
  });

  test('do not generate construct when option turned off', () => {
    // GIVEN
    const project = new TestProject({
      cdkVersion,
      bundleLambdaOptions: {
        generateConstruct: false,
      },
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['src/__tests__/integration/lambda/mylambda-ts.ts']).toBeUndefined();
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
      outdir: mkdtemp(),
      logging: {
        level: LogLevel.OFF,
      },
      ...defaultOptions,
      ...options,
    });
  }
}
