import { Jest, NodeProject, UpdateSnapshot } from "../../src/javascript";
import * as logging from "../../src/logging";
import { TypeScriptProject } from "../../src/typescript";
import { mkdtemp, synthSnapshot } from "../util";

logging.disable();

const compilerOptionDefaults = {
  alwaysStrict: true,
  declaration: true,
  esModuleInterop: true,
  experimentalDecorators: true,
  inlineSourceMap: true,
  inlineSources: true,
  lib: ["es2020"],
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
  target: "ES2020",
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
        maxWorkers: 1,
      },
    },
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot["package.json"].jest).toBeTruthy();

  const jest = snapshot["package.json"].jest;
  expect(jest.automock).toEqual(true);
  expect(jest.bail).toEqual(5);
  expect(jest.notify).toEqual(false);
  expect(jest.maxWorkers).toEqual(1);
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
    compilerOptionDefaults,
  );
  expect(jestTypescriptConfig.include).toEqual([
    "src/**/*.ts",
    "test/**/*.ts",
    ".projenrc.js",
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
    mergedCompilerOptions,
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
      }),
  ).toThrow(
    '"jestOptions.typescriptConfig" is deprecated. Use "typescriptProject.tsconfigDev" instead',
  );
});

test("testdir is under src discovers compiled js tests", () => {
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
    "<rootDir>/@(lib/boom/bam/__tests)/**/*(*.)@(spec|test).js?(x)",
    "<rootDir>/@(lib/boom/bam/__tests)/**/__tests__/**/*.js?(x)",
  ]);
  files["package.json"].jest.testMatch.forEach((testMatch: string) =>
    expect(testMatch).toContain(".js"),
  );
});

test("default testMatch patterns are added to jest config", () => {
  // GIVEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
  });

  // WHEN
  new Jest(project, {});

  // THEN
  expect(synthSnapshot(project)["package.json"].jest.testMatch).toStrictEqual([
    "**/__tests__/**/*.[jt]s?(x)",
    "**/*(*.)@(spec|test).[jt]s?(x)",
  ]);
});

test("addTestMatch() can be used to add patterns", () => {
  // GIVEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
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

test("discoverTestMatchPatternsForDirs() can be used to build test match patterns for directories", () => {
  // GIVEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
  });
  const jest = new Jest(project, { jestConfig: { testMatch: [] } });

  // WHEN
  jest.discoverTestMatchPatternsForDirs(["foo", "bar/baz"]);

  // THEN
  expect(synthSnapshot(project)["package.json"].jest.testMatch).toStrictEqual([
    "<rootDir>/@(foo|bar/baz)/**/*(*.)@(spec|test).[jt]s?(x)",
    "<rootDir>/@(foo|bar/baz)/**/__tests__/**/*.[jt]s?(x)",
  ]);
});

test("addSetupFile() can be used to add setup files", () => {
  // GIVEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
  });
  const jest = new Jest(project, {});

  // WHEN
  jest.addSetupFile("./mySetupFile.ts");

  // THEN
  expect(synthSnapshot(project)["package.json"].jest.setupFiles).toStrictEqual([
    "./mySetupFile.ts",
  ]);
});

test("addSetupFileAfterEnv() can be used to add setup files", () => {
  // GIVEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
  });
  const jest = new Jest(project, {});

  // WHEN
  jest.addSetupFileAfterEnv("./mySetupFileAfterEnv.ts");

  // THEN
  expect(
    synthSnapshot(project)["package.json"].jest.setupFilesAfterEnv,
  ).toStrictEqual(["./mySetupFileAfterEnv.ts"]);
});

test("addModuleNameMappers() can be used to add module name mappers", () => {
  // GIVEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
  });
  const jest = new Jest(project, {});

  // WHEN
  jest.addModuleNameMappers({
    "^@/(.*)$": "<rootDir>/src/$1",
  });

  // THEN
  expect(
    synthSnapshot(project)["package.json"].jest.moduleNameMapper,
  ).toStrictEqual({
    "^@/(.*)$": "<rootDir>/src/$1",
  });
});

test("addModulePaths() can be used to add module paths", () => {
  // GIVEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
  });
  const jest = new Jest(project, {});

  // WHEN
  jest.addModulePaths("<rootDir>/src");

  // THEN
  expect(synthSnapshot(project)["package.json"].jest.modulePaths).toStrictEqual(
    ["<rootDir>/src"],
  );
});

test("addRoots() can be used to add roots", () => {
  // GIVEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
  });
  const jest = new Jest(project, {});

  // WHEN
  jest.addRoots("foo", "bar");

  // THEN
  expect(synthSnapshot(project)["package.json"].jest.roots).toStrictEqual([
    "foo",
    "bar",
  ]);
});

test("can set extra CLI options", () => {
  // GIVEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
  });

  // WHEN
  new Jest(project, {
    extraCliOptions: ["--json", "--outputFile=jest-report.json"],
  });

  // THEN
  const clFragments = project.testTask.steps.pop()?.exec?.split(" ");
  expect(clFragments).toContain("--json");
  expect(clFragments).toContain("--outputFile=jest-report.json");
});

test("UpdateSnapshotOptions.ALWAYS adds --updateSnapshot to testTask and 'test:update' task is undefined", () => {
  // WHEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
    jestOptions: {
      updateSnapshot: UpdateSnapshot.ALWAYS,
    },
  });

  // THEN
  const testTask = project.testTask;
  expect(testTask.steps[0].exec).toContain("--updateSnapshot");

  const testUpdateTask = project.tasks.tryFind("test:update");
  expect(testUpdateTask).toBeUndefined();
});

test("Jest can be configured to fail without tests", () => {
  // WHEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
    jestOptions: {
      passWithNoTests: false,
    },
  });

  // THEN
  const testTask = project.testTask;
  expect(testTask.steps[0].exec).not.toContain("--passWithNoTests");
});

describe("UpdateSnapshotOptions.NEVER", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: "master",
    name: "test",
    jestOptions: {
      updateSnapshot: UpdateSnapshot.NEVER,
    },
  });

  it("does not add --updateSnapshot", () => {
    const testTask = project.testTask;
    expect(testTask.steps[0].exec).not.toContain("--updateSnapshot");
  });

  it("adds --ci", () => {
    const testTask = project.testTask;
    expect(testTask.steps[0].exec).toContain("--ci");
  });

  it("creates a separate 'test:update' task", () => {
    const testUpdateTask = project.tasks.tryFind("test:update");
    expect(testUpdateTask?.steps[0]?.exec).toContain("--updateSnapshot");
  });
});
