import { awscdk, DependencyType } from "../../src";
import { IntegrationTest } from "../../src/awscdk";
import { AwsCdkDepsJs } from "../../src/awscdk/awscdk-deps-js";
import { Testing } from "../../src/testing";
import { TypeScriptProject } from "../../src/typescript";

describe("IntegrationTest", () => {
  // GIVEN
  const project = new awscdk.AwsCdkTypeScriptApp({
    name: "test",
    defaultReleaseBranch: "main",
    cdkVersion: "1.134.0",
  });

  // WHEN
  new awscdk.IntegrationTest(project, {
    entrypoint: "test/foo.integ.ts",
    tsconfigPath: project.tsconfigDev.fileName,
    cdkDeps: project.cdkDeps,
  });

  new awscdk.IntegrationTest(project, {
    entrypoint: "test/bar.integ.ts",
    tsconfigPath: project.tsconfigDev.fileName,
    cdkDeps: project.cdkDeps,
  });

  // THEN
  const output = Testing.synth(project);

  // we expect .npmignore to exclude the integration test's cdkout directory
  // and the various temporary directories created during execution.
  test("npmignore", () => {
    ["test/.tmp", "test/foo.integ.snapshot"].forEach((i) =>
      expect(output[".npmignore"]).toContain(i),
    );
  });

  // exclude cloud assembly manifests and assets from
  // resulting assembly (as well as nested assemblies)
  // but include cloudformation templates.
  test("gitignore", () => {
    [
      "test/foo.integ.snapshot/asset.*",
      "test/foo.integ.snapshot/**/asset.*",
      "test/foo.integ.snapshot/cdk.out",
      "test/foo.integ.snapshot/**/cdk.out",
      "test/foo.integ.snapshot/manifest.json",
      "test/foo.integ.snapshot/**/manifest.json",
      "test/foo.integ.snapshot/tree.json",
      "test/foo.integ.snapshot/**/tree.json",
      "test/.tmp",
    ].forEach((i) => expect(output[".gitignore"]).toContain(i));
  });

  test("tasks", () => {
    // list of expected tasks
    const expectedTaskNames = [
      "integ:foo:assert",
      "integ:foo:deploy",
      "integ:foo:destroy",
      "integ:foo:snapshot",
      "integ:foo:watch",
      "integ:snapshot-all",
    ];

    const actualTaskNames = Object.keys(output[".projen/tasks.json"].tasks);
    for (const t of expectedTaskNames) {
      expect(actualTaskNames).toContain(t);
      expect(output[".projen/tasks.json"].tasks[t]).toMatchSnapshot();
    }
  });
});

test("installs ts-node if needed", () => {
  const project = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
  });

  new IntegrationTest(project, {
    entrypoint: "test/foo.integ.ts",
    tsconfigPath: project.tsconfigDev.fileName,
    cdkDeps: new AwsCdkDepsJs(project, {
      cdkVersion: "1.0.0",
      dependencyType: DependencyType.RUNTIME,
    }),
  });

  expect(project.deps.getDependency("ts-node")).toStrictEqual({
    name: "ts-node",
    type: "build",
  });
});

test("installs aws-cdk v1 if needed", () => {
  const project = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
  });

  new IntegrationTest(project, {
    entrypoint: "test/foo.integ.ts",
    tsconfigPath: project.tsconfigDev.fileName,
    cdkDeps: new AwsCdkDepsJs(project, {
      cdkVersion: "1.0.0",
      dependencyType: DependencyType.RUNTIME,
    }),
  });

  expect(project.deps.getDependency("aws-cdk")).toStrictEqual({
    name: "aws-cdk",
    type: "build",
    version: "^1",
  });
});

test("installs aws-cdk v2 if needed", () => {
  const project = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
  });

  new IntegrationTest(project, {
    entrypoint: "test/foo.integ.ts",
    tsconfigPath: project.tsconfigDev.fileName,
    cdkDeps: new AwsCdkDepsJs(project, {
      cdkVersion: "2.8.0",
      dependencyType: DependencyType.RUNTIME,
    }),
  });

  expect(project.deps.getDependency("aws-cdk")).toStrictEqual({
    name: "aws-cdk",
    type: "build",
    version: "^2",
  });
});

test("synthesizing cdk v2 integration tests", () => {
  // GIVEN
  const project = new awscdk.AwsCdkTypeScriptApp({
    name: "test",
    defaultReleaseBranch: "main",
    cdkVersion: "2.3.1",
  });

  // WHEN
  new awscdk.IntegrationTest(project, {
    entrypoint: "test/foo.integ.ts",
    tsconfigPath: project.tsconfigDev.fileName,
    cdkDeps: project.cdkDeps,
  });

  // THEN
  const output = Testing.synth(project);

  expect(
    output[".projen/tasks.json"].tasks["integ:foo:deploy"],
  ).toMatchSnapshot();
  expect(
    output[".projen/tasks.json"].tasks["integ:foo:snapshot"],
  ).toMatchSnapshot();
  expect(
    output[".projen/tasks.json"].tasks["integ:foo:watch"],
  ).toMatchSnapshot();
});

test("synthesizing an integration test containing a multi-stack stage", () => {
  // GIVEN
  const project = new awscdk.AwsCdkTypeScriptApp({
    name: "test",
    defaultReleaseBranch: "main",
    cdkVersion: "2.3.1",
  });

  // WHEN
  new awscdk.IntegrationTest(project, {
    name: "my-stage",
    entrypoint: "test/my-stage.myinteg.ts",
    stacks: ["my-stage/*"],
    tsconfigPath: project.tsconfigDev.fileName,
    cdkDeps: project.cdkDeps,
  });

  // THEN
  const output = Testing.synth(project);

  expect(
    output[".projen/tasks.json"].tasks["integ:my-stage:deploy"],
  ).toMatchSnapshot();
  expect(
    output[".projen/tasks.json"].tasks["integ:my-stage:snapshot"],
  ).toMatchSnapshot();
  expect(
    output[".projen/tasks.json"].tasks["integ:my-stage:watch"],
  ).toMatchSnapshot();
});

test("enabling path metadata", () => {
  // GIVEN
  const project = new awscdk.AwsCdkTypeScriptApp({
    name: "test",
    defaultReleaseBranch: "main",
    cdkVersion: "2.3.1",
  });

  // WHEN
  new awscdk.IntegrationTest(project, {
    name: "my-stage",
    entrypoint: "test/my-stage.myinteg.ts",
    stacks: ["my-stage/*"],
    tsconfigPath: project.tsconfigDev.fileName,
    cdkDeps: project.cdkDeps,
    pathMetadata: true,
  });

  // THEN
  const output = Testing.synth(project);

  expect(
    output[".projen/tasks.json"].tasks["integ:my-stage:deploy"].steps,
  ).not.toEqual(
    expect.arrayContaining([
      { exec: expect.stringContaining("--no-path-metadata") },
    ]),
  );

  expect(
    output[".projen/tasks.json"].tasks["integ:my-stage:snapshot"].steps,
  ).not.toEqual(
    expect.arrayContaining([
      { exec: expect.stringContaining("--no-path-metadata") },
    ]),
  );

  expect(
    output[".projen/tasks.json"].tasks["integ:my-stage:watch"].steps,
  ).not.toEqual(
    expect.arrayContaining([
      { exec: expect.stringContaining("--no-path-metadata") },
    ]),
  );
});
