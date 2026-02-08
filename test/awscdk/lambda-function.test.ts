import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { DependencyType } from "../../src";
import * as awscdk from "../../src/awscdk";
import { AwsCdkDepsJs } from "../../src/awscdk/awscdk-deps-js";
import { Testing } from "../../src/testing";
import { TypeScriptProject } from "../../src/typescript";

describe("bundled function", () => {
  let generatedSource: string;
  let tasks: Record<string, any>;
  let npmignore: string[];
  let gitignore: string[];

  beforeEach(() => {
    const project = new TypeScriptProject({
      name: "hello",
      defaultReleaseBranch: "main",
      bundlerOptions: {
        assetsDir: "my-assets",
      },
    });

    new awscdk.LambdaFunction(project, {
      entrypoint: join("src", "hello.lambda.ts"),
      cdkDeps: cdkDepsForProject(project),
    });

    const snapshot = Testing.synth(project);

    generatedSource = snapshot["src/hello-function.ts"];
    tasks = snapshot[".projen/tasks.json"].tasks;
    npmignore = snapshot[".npmignore"].split("\n");
    gitignore = snapshot[".gitignore"].split("\n");
  });

  test("generates source code for a lambda construct", () => {
    expect(generatedSource).toMatchSnapshot();
  });

  test("creates a single project-wide bundle task", () => {
    expect(tasks.bundle).toEqual({
      description: "Prepare assets",
      name: "bundle",
      steps: [{ spawn: "bundle:hello.lambda" }],
    });
  });

  test("creates a specific bundle task for this function", () => {
    expect(tasks["bundle:hello.lambda"]).toEqual({
      description: "Create a JavaScript bundle from src/hello.lambda.ts",
      name: "bundle:hello.lambda",
      steps: [
        {
          exec: 'esbuild --bundle src/hello.lambda.ts --target="node22" --platform="node" --outfile="my-assets/hello.lambda/index.js" --tsconfig="tsconfig.dev.json" --external:@aws-sdk/*',
        },
      ],
    });
  });

  test("spawns the bundle task as part of pre-compilation", () => {
    expect(tasks["pre-compile"].steps).toStrictEqual([{ spawn: "bundle" }]);
  });

  test("includes the bundle directory inside the node package but not commit to source control", () => {
    expect(npmignore).toContain("!/my-assets/");
    expect(gitignore).toContain("/my-assets/");
  });
});

test("fails if entrypoint does not have the .lambda suffix", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });
  expect(
    () =>
      new awscdk.LambdaFunction(project, {
        entrypoint: join("src", "hello-no-lambda.ts"),
        cdkDeps: cdkDepsForProject(project),
      }),
  ).toThrow(
    "hello-no-lambda.ts must have a .lambda.ts or .edge-lambda.ts extension",
  );
});

test("constructFile and constructName can be used to customize the generated construct", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "hello.lambda.ts"),
    constructFile: "my-construct.ts",
    constructName: "MyConstruct",
    cdkDeps: cdkDepsForProject(project),
  });

  const snapshot = Testing.synth(project);
  const generatedSource = snapshot["src/my-construct.ts"];
  expect(generatedSource).toMatchSnapshot();
});

test("runtime can be used to customize the lambda runtime Node 14.x and esbuild target", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "hello.lambda.ts"),
    runtime: awscdk.LambdaRuntime.NODEJS_14_X,
    cdkDeps: cdkDepsForProject(project),
  });

  const snapshot = Testing.synth(project);
  const generatedSource = snapshot["src/hello-function.ts"];
  const tasks = snapshot[".projen/tasks.json"].tasks;
  expect(generatedSource).toContain(
    "runtime: new lambda.Runtime('nodejs14.x', lambda.RuntimeFamily.NODEJS),",
  );
  expect(generatedSource).not.toContain("props?.runtime");
  expect(tasks["bundle:hello.lambda"]).toEqual({
    description: "Create a JavaScript bundle from src/hello.lambda.ts",
    name: "bundle:hello.lambda",
    steps: [
      {
        exec: 'esbuild --bundle src/hello.lambda.ts --target="node14" --platform="node" --outfile="assets/hello.lambda/index.js" --tsconfig="tsconfig.dev.json" --external:aws-sdk',
      },
    ],
  });
});

test("runtime can be used to customize the lambda runtime Node 16.x and esbuild target", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "hello.lambda.ts"),
    runtime: awscdk.LambdaRuntime.NODEJS_16_X,
    cdkDeps: cdkDepsForProject(project),
  });

  const snapshot = Testing.synth(project);
  const generatedSource = snapshot["src/hello-function.ts"];
  const tasks = snapshot[".projen/tasks.json"].tasks;
  expect(generatedSource).toContain(
    "runtime: new lambda.Runtime('nodejs16.x', lambda.RuntimeFamily.NODEJS),",
  );
  expect(generatedSource).not.toContain("props?.runtime");
  expect(tasks["bundle:hello.lambda"]).toEqual({
    description: "Create a JavaScript bundle from src/hello.lambda.ts",
    name: "bundle:hello.lambda",
    steps: [
      {
        exec: 'esbuild --bundle src/hello.lambda.ts --target="node16" --platform="node" --outfile="assets/hello.lambda/index.js" --tsconfig="tsconfig.dev.json" --external:aws-sdk',
      },
    ],
  });
});

test.each([
  awscdk.LambdaRuntime.NODEJS_18_X,
  awscdk.LambdaRuntime.NODEJS_20_X,
  awscdk.LambdaRuntime.NODEJS_22_X,
])(
  "runtime can be used to customize the lambda runtime $functionRuntime and esbuild target",
  (runtime) => {
    const project = new TypeScriptProject({
      name: "hello",
      defaultReleaseBranch: "main",
    });

    new awscdk.LambdaFunction(project, {
      entrypoint: join("src", "hello.lambda.ts"),
      runtime,
      cdkDeps: cdkDepsForProject(project),
    });

    const snapshot = Testing.synth(project);
    const generatedSource = snapshot["src/hello-function.ts"];
    const tasks = snapshot[".projen/tasks.json"].tasks;
    expect(generatedSource).toContain(
      `runtime: new lambda.Runtime('${runtime.functionRuntime}', lambda.RuntimeFamily.NODEJS),`,
    );
    expect(generatedSource).not.toContain("props?.runtime");
    expect(tasks["bundle:hello.lambda"]).toEqual({
      description: "Create a JavaScript bundle from src/hello.lambda.ts",
      name: "bundle:hello.lambda",
      steps: [
        {
          exec: `esbuild --bundle src/hello.lambda.ts --target="${runtime.esbuildTarget}" --platform="node" --outfile="assets/hello.lambda/index.js" --tsconfig="tsconfig.dev.json" --external:@aws-sdk/*`,
        },
      ],
    });
  },
);

test("aws sdk v3 packages are considered external with NODEJS_18_X", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "hello.lambda.ts"),
    runtime: awscdk.LambdaRuntime.NODEJS_18_X,
    cdkDeps: cdkDepsForProject(project),
  });

  const snapshot = Testing.synth(project);
  const tasks = snapshot[".projen/tasks.json"].tasks;
  expect(tasks["bundle:hello.lambda"]).toEqual({
    description: "Create a JavaScript bundle from src/hello.lambda.ts",
    name: "bundle:hello.lambda",
    steps: [
      {
        exec: 'esbuild --bundle src/hello.lambda.ts --target="node18" --platform="node" --outfile="assets/hello.lambda/index.js" --tsconfig="tsconfig.dev.json" --external:@aws-sdk/*',
      },
    ],
  });
});

test("AWS SDK connection reuse", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "hello.lambda.ts"),
    cdkDeps: cdkDepsForProject(project),
  });

  const snapshot = Testing.synth(project);
  const generatedSource = snapshot["src/hello-function.ts"];
  expect(generatedSource).toContain(
    "this.addEnvironment('AWS_NODEJS_CONNECTION_REUSE_ENABLED', '1', { removeInEdge: true });",
  );
});

test("AWS SDK connection reuse can be disabled", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "hello.lambda.ts"),
    cdkDeps: cdkDepsForProject(project),
    awsSdkConnectionReuse: false,
  });

  const snapshot = Testing.synth(project);
  const generatedSource = snapshot["src/hello-function.ts"];
  expect(generatedSource).not.toContain(
    "this.addEnvironment('AWS_NODEJS_CONNECTION_REUSE_ENABLED', '1', { removeInEdge: true });",
  );
});

test("Edge function", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "hello.edge-lambda.ts"),
    cdkDeps: cdkDepsForProject(project),
    edgeLambda: true,
  });

  const snapshot = Testing.synth(project);
  const generatedSource = snapshot["src/hello-function.ts"];
  expect(generatedSource).toMatchSnapshot();
});

test("eslint allows handlers to import dev dependencies", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });
  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "hello.lambda.ts"),
    cdkDeps: cdkDepsForProject(project),
  });
  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "world.lambda.ts"),
    cdkDeps: cdkDepsForProject(project),
  });

  const snapshot = Testing.synth(project);
  expect(
    snapshot[".eslintrc.json"].rules["import/no-extraneous-dependencies"],
  ).toStrictEqual([
    "error",
    {
      devDependencies: [
        "**/test/**",
        "**/build-tools/**",
        "src/hello.lambda.ts",
        "src/world.lambda.ts",
      ],
      optionalDependencies: false,
      peerDependencies: true,
    },
  ]);
});

test("esbuild dependency is added", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });
  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "hello.lambda.ts"),
    cdkDeps: cdkDepsForProject(project),
  });
  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "world.lambda.ts"),
    cdkDeps: cdkDepsForProject(project),
  });

  const snapshot = Testing.synth(project);
  const deps = snapshot[".projen/deps.json"].dependencies;
  expect(deps.filter((d: any) => d.name === "esbuild").length).toEqual(1);
});

test("multiple functions", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });
  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "hello.lambda.ts"),
    cdkDeps: cdkDepsForProject(project),
  });
  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "world.lambda.ts"),
    cdkDeps: cdkDepsForProject(project),
  });

  const snapshot = Testing.synth(project);
  expect(snapshot["src/hello-function.ts"]).toMatchSnapshot();
  expect(snapshot["src/world-function.ts"]).toMatchSnapshot();
});

test("auto-discover", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  // create fake handlers
  const srcdir = join(project.outdir, project.srcdir);
  mkdirSync(join(srcdir, "subdir"), { recursive: true });
  writeFileSync(
    join(srcdir, "hello.lambda.ts"),
    "export function handler() {}",
  );
  writeFileSync(
    join(srcdir, "subdir", "world.lambda.ts"),
    "export function handler() {}",
  );
  writeFileSync(
    join(srcdir, "subdir", "jangy.lambda.ts"),
    "export function handler() {}",
  );

  new awscdk.AutoDiscover(project, {
    srcdir: project.srcdir,
    testdir: project.testdir,
    tsconfigPath: project.tsconfigDev.fileName,
    cdkDeps: new AwsCdkDepsJs(project, {
      cdkVersion: "1.23.0",
      dependencyType: DependencyType.RUNTIME,
    }),
    lambdaOptions: {
      runtime: awscdk.LambdaRuntime.NODEJS_22_X,
    },
  });

  const snapshot = Testing.synth(project);
  expect(snapshot["src/hello-function.ts"]).toMatchSnapshot();
  expect(snapshot["src/subdir/world-function.ts"]).toMatchSnapshot();
  expect(snapshot["src/subdir/jangy-function.ts"]).toMatchSnapshot();
  const tasks = snapshot[".projen/tasks.json"].tasks;
  expect(tasks.bundle).toMatchSnapshot();

  const expected = [
    "bundle:hello.lambda",
    "bundle:hello.lambda:watch",
    "bundle:subdir/jangy.lambda",
    "bundle:subdir/jangy.lambda:watch",
    "bundle:subdir/world.lambda",
    "bundle:subdir/world.lambda:watch",
  ];

  for (const name of expected) {
    expect(tasks[name]).not.toBeUndefined();
    expect(tasks[name]).toMatchSnapshot();
  }
});

test("generates cdkv2-compatible imports", () => {
  const project = new TypeScriptProject({
    name: "hello",
    defaultReleaseBranch: "main",
  });

  new awscdk.LambdaFunction(project, {
    entrypoint: join("src", "hello.lambda.ts"),
    cdkDeps: cdkDepsForProject(project, "2.3.1"),
  });

  const snapshot = Testing.synth(project);
  expect(snapshot["src/hello-function.ts"]).toMatchSnapshot();
});

describe("NODEJS_REGIONAL_LATEST runtime", () => {
  test("generates code using determineLatestNodeRuntime() when no runtime specified", () => {
    const project = new TypeScriptProject({
      name: "hello",
      defaultReleaseBranch: "main",
    });

    new awscdk.LambdaFunction(project, {
      entrypoint: join("src", "hello.lambda.ts"),
      // No runtime specified - defaults to NODEJS_REGIONAL_LATEST with override
      cdkDeps: cdkDepsForProject(project, "2.3.1"),
    });

    const snapshot = Testing.synth(project);
    const generatedSource = snapshot["src/hello-function.ts"];

    expect(generatedSource).toContain(
      "import { determineLatestNodeRuntime } from 'aws-cdk-lib/aws-lambda';",
    );
    expect(generatedSource).toContain("readonly runtime?: lambda.Runtime;");
    expect(generatedSource).toContain(
      "runtime: props?.runtime ?? determineLatestNodeRuntime(scope),",
    );
    expect(generatedSource).toMatchSnapshot();
  });

  test("explicitly set NODEJS_REGIONAL_LATEST has no override prop", () => {
    const project = new TypeScriptProject({
      name: "hello",
      defaultReleaseBranch: "main",
    });

    new awscdk.LambdaFunction(project, {
      entrypoint: join("src", "hello.lambda.ts"),
      runtime: awscdk.LambdaRuntime.NODEJS_REGIONAL_LATEST,
      cdkDeps: cdkDepsForProject(project, "2.3.1"),
    });

    const snapshot = Testing.synth(project);
    const generatedSource = snapshot["src/hello-function.ts"];

    expect(generatedSource).toContain(
      "import { determineLatestNodeRuntime } from 'aws-cdk-lib/aws-lambda';",
    );
    expect(generatedSource).not.toContain("readonly runtime?: lambda.Runtime;");
    expect(generatedSource).toContain(
      "runtime: determineLatestNodeRuntime(scope),",
    );
    expect(generatedSource).toMatchSnapshot();
  });

  test("uses latest LTS (node22) esbuild target for bundling when no runtime specified", () => {
    const project = new TypeScriptProject({
      name: "hello",
      defaultReleaseBranch: "main",
    });

    new awscdk.LambdaFunction(project, {
      entrypoint: join("src", "hello.lambda.ts"),
      cdkDeps: cdkDepsForProject(project, "2.3.1"),
    });

    const snapshot = Testing.synth(project);
    const tasks = snapshot[".projen/tasks.json"].tasks;

    expect(tasks["bundle:hello.lambda"].steps[0].exec).toContain(
      '--target="node22"',
    );
  });
});

describe("runtime override support", () => {
  test("default runtime allows consumer override", () => {
    const project = new TypeScriptProject({
      name: "hello",
      defaultReleaseBranch: "main",
    });

    new awscdk.LambdaFunction(project, {
      entrypoint: join("src", "hello.lambda.ts"),
      // No runtime specified - allows override
      cdkDeps: cdkDepsForProject(project, "2.3.1"),
    });

    const snapshot = Testing.synth(project);
    const generatedSource = snapshot["src/hello-function.ts"];

    expect(generatedSource).toContain("readonly runtime?: lambda.Runtime;");
    expect(generatedSource).toContain(
      "runtime: props?.runtime ?? determineLatestNodeRuntime(scope),",
    );
  });

  test("explicitly set NODEJS_REGIONAL_LATEST does not allow override", () => {
    const project = new TypeScriptProject({
      name: "hello",
      defaultReleaseBranch: "main",
    });

    new awscdk.LambdaFunction(project, {
      entrypoint: join("src", "hello.lambda.ts"),
      runtime: awscdk.LambdaRuntime.NODEJS_REGIONAL_LATEST,
      cdkDeps: cdkDepsForProject(project, "2.3.1"),
    });

    const snapshot = Testing.synth(project);
    const generatedSource = snapshot["src/hello-function.ts"];

    expect(generatedSource).not.toContain("readonly runtime?: lambda.Runtime;");
    expect(generatedSource).not.toContain("props?.runtime");
    expect(generatedSource).toContain(
      "runtime: determineLatestNodeRuntime(scope),",
    );
  });

  test("explicit runtime is hardcoded without override support", () => {
    const project = new TypeScriptProject({
      name: "hello",
      defaultReleaseBranch: "main",
    });

    new awscdk.LambdaFunction(project, {
      entrypoint: join("src", "hello.lambda.ts"),
      runtime: awscdk.LambdaRuntime.NODEJS_20_X,
      cdkDeps: cdkDepsForProject(project, "2.3.1"),
    });

    const snapshot = Testing.synth(project);
    const generatedSource = snapshot["src/hello-function.ts"];

    expect(generatedSource).not.toContain("readonly runtime?: lambda.Runtime;");
    expect(generatedSource).not.toContain("props?.runtime");
    expect(generatedSource).toContain(
      "runtime: new lambda.Runtime('nodejs20.x', lambda.RuntimeFamily.NODEJS),",
    );
    expect(generatedSource).toMatchSnapshot();
  });
});

function cdkDepsForProject(
  project: TypeScriptProject,
  cdkVersion = "1.0.0",
): awscdk.AwsCdkDeps {
  return new AwsCdkDepsJs(project, {
    cdkVersion: cdkVersion,
    dependencyType: DependencyType.RUNTIME,
  });
}
