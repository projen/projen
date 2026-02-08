import { DependencyType, Testing } from "../../src";
import {
  AwsCdkDeps,
  AwsCdkDepsJs,
  LambdaExtension,
  LambdaRuntime,
} from "../../src/awscdk";
import { TypeScriptProject } from "../../src/typescript";

test("simplest LambdaExtension cdk v2", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  // WHEN
  new LambdaExtension(project, {
    cdkDeps: cdkDepsForProject(project, "2.1.0"),
    entrypoint: "src/example.lambda-extension.ts",
  });

  // THEN
  const snapshot = Testing.synth(project);

  const tasks = snapshot[".projen/tasks.json"].tasks;
  const bundleTaskExec = tasks["bundle:example.lambda-extension"].steps[0].exec;

  expect(bundleTaskExec).toContain(
    // Outputs `extensions/${name}` dir
    '--outfile="assets/example.lambda-extension/extensions/example"',
  );
  expect(bundleTaskExec).toContain(
    // aws-sdk is external
    "--external:aws-sdk",
  );
  expect(bundleTaskExec).toContain(
    // Supports node12
    '--target="node12"',
  );

  const generatedSource = snapshot["src/example-layer-version.ts"];
  expect(generatedSource).toContain(
    [
      "import * as lambda from 'aws-cdk-lib/aws-lambda';",
      "import { Construct } from 'constructs';",
    ].join("\n"),
  );
  expect(generatedSource).toContain(
    "export interface ExampleLayerVersionProps",
  );
  expect(generatedSource).toContain("export class ExampleLayerVersion");
  expect(generatedSource).toContain(
    "new lambda.Runtime('nodejs12.x', lambda.RuntimeFamily.NODEJS)",
  );
  expect(generatedSource).toContain(
    "new lambda.Runtime('nodejs14.x', lambda.RuntimeFamily.NODEJS)",
  );
  expect(generatedSource).toContain(
    "new lambda.Runtime('nodejs16.x', lambda.RuntimeFamily.NODEJS)",
  );
  expect(generatedSource).toContain(
    "new lambda.Runtime('nodejs18.x', lambda.RuntimeFamily.NODEJS)",
  );
  expect(generatedSource).toMatchSnapshot();
});

test("simplest LambdaExtension cdk v1", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  // WHEN
  new LambdaExtension(project, {
    cdkDeps: cdkDepsForProject(project),
    entrypoint: "src/example.lambda-extension.ts",
  });

  // THEN
  const snapshot = Testing.synth(project);

  const generatedSource = snapshot["src/example-layer-version.ts"];
  expect(generatedSource).toContain(
    [
      "import * as lambda from '@aws-cdk/aws-lambda';",
      "import { Construct } from '@aws-cdk/core';",
    ].join("\n"),
  );
});

test("changing compatible runtimes", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  // WHEN
  new LambdaExtension(project, {
    cdkDeps: cdkDepsForProject(project),
    entrypoint: "src/example.lambda-extension.ts",
    compatibleRuntimes: [
      LambdaRuntime.NODEJS_18_X,
      LambdaRuntime.NODEJS_16_X,
      LambdaRuntime.NODEJS_14_X,
      LambdaRuntime.NODEJS_12_X,
      LambdaRuntime.NODEJS_10_X,
    ],
  });

  // THEN
  const snapshot = Testing.synth(project);

  const bundleTaskExec =
    snapshot[".projen/tasks.json"].tasks["bundle:example.lambda-extension"]
      .steps[0].exec;

  expect(bundleTaskExec).toContain(
    // It picked the lowest compatible runtime
    '--target="node10"',
  );

  const generatedSource = snapshot["src/example-layer-version.ts"];
  expect(generatedSource).toContain(
    "new lambda.Runtime('nodejs10.x', lambda.RuntimeFamily.NODEJS)",
  );
  expect(generatedSource).toContain(
    "new lambda.Runtime('nodejs12.x', lambda.RuntimeFamily.NODEJS)",
  );
  expect(generatedSource).toContain(
    "new lambda.Runtime('nodejs14.x', lambda.RuntimeFamily.NODEJS)",
  );
  expect(generatedSource).toContain(
    "new lambda.Runtime('nodejs16.x', lambda.RuntimeFamily.NODEJS)",
  );
  expect(generatedSource).toContain(
    "new lambda.Runtime('nodejs18.x', lambda.RuntimeFamily.NODEJS)",
  );
});

test("bundler options", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  // WHEN
  new LambdaExtension(project, {
    cdkDeps: cdkDepsForProject(project),
    entrypoint: "src/example.lambda-extension.ts",
    bundlingOptions: {
      externals: ["foo"],
    },
  });

  // THEN
  const snapshot = Testing.synth(project);

  const bundleTaskExec =
    snapshot[".projen/tasks.json"].tasks["bundle:example.lambda-extension"]
      .steps[0].exec;

  expect(bundleTaskExec).toContain(
    // `foo` is external
    "--external:foo",
  );
});

test("changing the extension name", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  // WHEN
  new LambdaExtension(project, {
    cdkDeps: cdkDepsForProject(project),
    entrypoint: "src/example.lambda-extension.ts",
    name: "other",
  });

  // THEN
  const snapshot = Testing.synth(project);

  const bundleTaskExec =
    snapshot[".projen/tasks.json"].tasks["bundle:example.lambda-extension"]
      .steps[0].exec;

  expect(bundleTaskExec).toContain(
    // Outputs `extensions/${name}` dir
    '--outfile="assets/example.lambda-extension/extensions/other"',
  );
});

test("changing construct name and path", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  // WHEN
  new LambdaExtension(project, {
    cdkDeps: cdkDepsForProject(project),
    entrypoint: "src/example.lambda-extension.ts",
    constructName: "Custom",
    constructFile: "src/example-extension.ts",
  });

  // THEN
  const snapshot = Testing.synth(project);
  const generatedSource = snapshot["src/example-extension.ts"];
  expect(generatedSource).toContain("export interface CustomProps");
  expect(generatedSource).toContain("export class Custom");
});

function cdkDepsForProject(
  project: TypeScriptProject,
  cdkVersion = "1.0.0",
): AwsCdkDeps {
  return new AwsCdkDepsJs(project, {
    cdkVersion: cdkVersion,
    dependencyType: DependencyType.RUNTIME,
  });
}
