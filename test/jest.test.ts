import { PROJEN_RC } from "../src/common";
import { NodeProject, Jest } from "../src/javascript";
import * as logging from "../src/logging";
import { TypeScriptProject } from "../src/typescript";
import { mkdtemp, synthSnapshot } from "./util";

logging.disable();

const compilerOptionDefaults = {
  alwaysStrict: true,
  declaration: true,
  esModuleInterop: true,
  experimentalDecorators: true,
  inlineSourceMap: true,
  inlineSources: true,
  lib: ["es2019"],
  module: "CommonJS",
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
  target: "ES2019",
};

test("Node Project Jest Defaults Configured", () => {
  const project = new NodeProject({
    name: "test-node-project",
    mergify: false,
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    jest: true,
  });

  expect(project.jest?.config).toBeTruthy();
  expect(project.jest?.config.clearMocks).toEqual(true);
  expect(project.jest?.config.collectCoverage).toEqual(true);

  const snapshot = synthSnapshot(project);
  expect(snapshot["package.json"].jest).toBeTruthy();

  const jest = snapshot["package.json"].jest;
  expect(jest.clearMocks).toEqual(true);
  expect(jest.collectCoverage).toEqual(true);
  expect(jest.coverageDirectory).toEqual("coverage");
});

test("Node Project Jest With Options Configured", () => {
  const project = new NodeProject({
    name: "test-node-project",
    defaultReleaseBranch: "master",
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

  const snapshot = synthSnapshot(project);
  expect(snapshot["package.json"].jest).toBeTruthy();

  const jest = snapshot["package.json"].jest;
  expect(jest.automock).toEqual(true);
  expect(jest.bail).toEqual(5);
  expect(jest.notify).toEqual(false);
});

test("Node Project Jest With Path Configured", () => {
  const project = new NodeProject({
    name: "test-node-project",
    defaultReleaseBranch: "master",
    mergify: false,
    projenDevDependency: false,
    jest: true,
    jestOptions: {
      configFilePath: "jest.config.json",
      jestConfig: {
        automock: true,
        bail: 5,
        notify: false,
      },
    },
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot["package.json"].jest).toBeUndefined();

  const jest = snapshot["jest.config.json"];
  expect(jest.automock).toEqual(true);
  expect(jest.bail).toEqual(5);
  expect(jest.notify).toEqual(false);
});

test("Typescript Project Jest Defaults Configured", () => {
  // WHEN
  const project = new TypeScriptProject({
    name: "test-typescript-project",
    defaultReleaseBranch: "master",
    mergify: false,
    projenDevDependency: false,
    jest: true,
  });

  const snapshot = synthSnapshot(project);
  const jestTypescriptConfig = snapshot["tsconfig.dev.json"];

  expect(jestTypescriptConfig.compilerOptions).toBeTruthy();
  expect(jestTypescriptConfig.compilerOptions).toStrictEqual(
    compilerOptionDefaults
  );
  expect(jestTypescriptConfig.include).toEqual([
    PROJEN_RC,
    "src/**/*.ts",
    "test/**/*.ts",
  ]);
  expect(jestTypescriptConfig.exclude).toEqual(["node_modules"]);
});

test("Typescript Project Jest With Compiler Options", () => {
  const compilerOptions = {
    esModuleInterop: false,
    noImplicitAny: false,
  };

  const project = new TypeScriptProject({
    name: "test-typescript-project",
    defaultReleaseBranch: "master",
    mergify: false,
    projenDevDependency: false,
    jest: true,
    tsconfigDev: {
      compilerOptions,
    },
  });

  const mergedCompilerOptions = {
    ...compilerOptionDefaults,
    ...compilerOptions,
  };

  const snapshot = synthSnapshot(project);
  const jestTypescriptConfig = snapshot["tsconfig.dev.json"];

  expect(jestTypescriptConfig.compilerOptions).toBeTruthy();
  expect(jestTypescriptConfig.compilerOptions).toStrictEqual(
    mergedCompilerOptions
  );
});

test("jestOptions.typeScriptCompilerOptions is deprecated", () => {
  expect(
    () =>
      new TypeScriptProject({
        name: "test-typescript-project",
        defaultReleaseBranch: "master",
        mergify: false,
        projenDevDependency: false,
        jestOptions: {
          typescriptConfig: {
            esModuleInterop: false,
            noImplicitAny: false,
          },
        } as any,
      })
  ).toThrow(
    '"jestOptions.typescriptConfig" is deprecated. Use "typescriptProject.tsconfigDev" instead'
  );
});

test("testdir is under src", () => {
  // WHEN
  const project = new TypeScriptProject({
    defaultReleaseBranch: "master",
    name: "test-typescript-project",
    srcdir: "mysrc",
    testdir: "mysrc/boom/bam/__tests",
  });

  // THEN
  const files = synthSnapshot(project);
  expect(files["package.json"].jest.testMatch).toStrictEqual([
    "**/lib/boom/bam/__tests/**/?(*.)+(spec|test).js?(x)",
  ]);
});

test("addTestMatch() can be used to add patterns", () => {
  // GIVEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
    jest: false,
  });
  const jest = new Jest(project, { jestConfig: { testMatch: [] } });

  // WHEN
  jest.addTestMatch("foo/**");
  jest.addTestMatch("bar/baz/**");

  // THEN
  expect(synthSnapshot(project)["package.json"].jest.testMatch).toStrictEqual([
    "foo/**",
    "bar/baz/**",
  ]);
});
