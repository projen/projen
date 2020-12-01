import { NodeProject, TypeScriptProject } from '../src';
import { PROJEN_RC } from '../src/common';
import * as logging from '../src/logging';
import { mkdtemp, synthSnapshot } from './util';

logging.disable();

const compilerOptionDefaults = {
  alwaysStrict: true,
  declaration: true,
  experimentalDecorators: true,
  inlineSourceMap: true,
  inlineSources: true,
  lib: ['es2018'],
  module: 'CommonJS',
  noEmitOnError: false,
  noFallthroughCasesInSwitch: true,
  noImplicitAny: true,
  noImplicitReturns: true,
  noImplicitThis: true,
  noUnusedLocals: true,
  noUnusedParameters: true,
  resolveJsonModule: true,
  strict: true,
  strictNullChecks: true,
  strictPropertyInitialization: true,
  stripInternal: true,
  target: 'ES2018',
};

test('Node Project Jest Defaults Configured', () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: 'test-node-project',
    mergify: false,
    projenDevDependency: false,
    jest: true,
  });

  expect(project.jest?.config).toBeTruthy();
  expect(project.jest?.config.clearMocks).toEqual(true);
  expect(project.jest?.config.collectCoverage).toEqual(true);

  const snapshot = synthSnapshot(project, 'package.json');
  expect(snapshot['package.json'].jest).toBeTruthy();

  const jest = snapshot['package.json'].jest;
  expect(jest.clearMocks).toEqual(true);
  expect(jest.collectCoverage).toEqual(true);
  expect(jest.coverageDirectory).toEqual('coverage');
});

test('Node Project Jest With Options Configured', () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: 'test-node-project',
    mergify: false,
    projenDevDependency: false,
    jest: true,
    jestOptions: {
      jestConfig: {
        automock: true,
        bail: 5,
        notify: false,
      },
    },
  });

  const snapshot = synthSnapshot(project, 'package.json');
  expect(snapshot['package.json'].jest).toBeTruthy();

  const jest = snapshot['package.json'].jest;
  expect(jest.automock).toEqual(true);
  expect(jest.bail).toEqual(5);
  expect(jest.notify).toEqual(false);
});

test('Typescript Project Jest Defaults Configured', () => {
  // WHEN
  const project = new TypeScriptProject({
    outdir: mkdtemp(),
    name: 'test-typescript-project',
    mergify: false,
    projenDevDependency: false,
    jest: true,
  });

  const snapshot = synthSnapshot(project, 'tsconfig.jest.json');
  const jestTypescriptConfig = snapshot['tsconfig.jest.json'];

  expect(jestTypescriptConfig.compilerOptions).toBeTruthy();
  expect(jestTypescriptConfig.compilerOptions).toStrictEqual(compilerOptionDefaults);
  expect(jestTypescriptConfig.include).toEqual([PROJEN_RC, 'src/**/*.ts', 'test/**/*.ts']);
  expect(jestTypescriptConfig.exclude).toEqual(['node_modules']);
});


test('Typescript Project Jest With Compiler Options', () => {
  const compilerOptions = {
    esModuleInterop: true,
    noImplicitAny: false,
  };

  const project = new TypeScriptProject({
    outdir: mkdtemp(),
    name: 'test-typescript-project',
    mergify: false,
    projenDevDependency: false,
    jest: true,
    jestOptions: {
      typescriptConfig: {
        compilerOptions,
      },
    },
  });

  const mergedCompilerOptions = {
    ...compilerOptionDefaults,
    ...compilerOptions,
  };

  const snapshot = synthSnapshot(project, 'tsconfig.jest.json');
  const jestTypescriptConfig = snapshot['tsconfig.jest.json'];

  expect(jestTypescriptConfig.compilerOptions).toBeTruthy();
  expect(jestTypescriptConfig.compilerOptions).toStrictEqual(mergedCompilerOptions);
});
