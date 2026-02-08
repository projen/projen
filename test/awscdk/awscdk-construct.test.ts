import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import * as YAML from "yaml";
import { awscdk, LogLevel, Testing } from "../../src";
import {
  AwsCdkConstructLibrary,
  AwsCdkConstructLibraryOptions,
} from "../../src/awscdk";
import { NpmAccess } from "../../src/javascript";
import { mkdtemp, synthSnapshot } from "../util";

describe("constructs dependency selection", () => {
  test("user-selected", () => {
    // GIVEN
    const project = new TestProject({
      cdkVersion: "1.100.0",
      constructsVersion: "3.1337.0-ultimate",
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe(
      "^3.1337.0-ultimate",
    );
    expect(
      snapshot["package.json"]?.devDependencies?.constructs,
    ).toBeUndefined();
    expect(snapshot["package.json"]?.dependencies?.constructs).toBeUndefined();
  });

  test("for cdk 1.x", () => {
    // GIVEN
    const project = new TestProject({ cdkVersion: "1.112.0" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toMatch(
      /^\^3\./,
    );
    expect(
      snapshot["package.json"]?.devDependencies?.constructs,
    ).toBeUndefined();
    expect(
      snapshot["package.json"]?.devDependencies["@aws-cdk/assertions"],
    ).toStrictEqual("^1.112.0");
    expect(
      snapshot["package.json"]?.devDependencies["@aws-cdk/assert"],
    ).toStrictEqual("^1.112.0");
    expect(snapshot["package.json"]?.dependencies?.constructs).toBeUndefined();
  });

  // assertions library is only available since 1.111.0
  test("for cdk 1.x < 1.111.0", () => {
    // GIVEN
    const project = new TestProject({ cdkVersion: "1.110.0" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(
      snapshot["package.json"]?.devDependencies["@aws-cdk/assertions"],
    ).toBeUndefined();
    expect(
      snapshot["package.json"]?.devDependencies["@aws-cdk/assert"],
    ).toStrictEqual("^1.110.0");
  });

  test("for cdk 2.x", () => {
    // GIVEN
    const project = new TestProject({ cdkVersion: "2.0.0-alpha.5" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toMatch(
      /^\^10./,
    );
    expect(snapshot["package.json"]?.peerDependencies["aws-cdk-lib"]).toMatch(
      /^\^2./,
    );
    expect(snapshot["package.json"]?.devDependencies?.constructs).toMatch(
      /^10./,
    );
    expect(snapshot["package.json"]?.devDependencies["aws-cdk-lib"]).toMatch(
      /^2./,
    );
    expect(
      snapshot["package.json"]?.devDependencies["@aws-cdk/assertions"],
    ).toBeUndefined();
    expect(snapshot["package.json"]?.dependencies?.constructs).toBeUndefined();
  });

  test("for cdk 2.x, throws if incorrect constructsVersion provided", () => {
    expect(
      () =>
        new TestProject({
          cdkVersion: "2.0.0-alpha.5",
          constructsVersion: "3.2.27",
        }),
    ).toThrow(/CDK 2.x requires constructs 10.x/);
  });

  test("for cdk 2.x, throws if cdkDependencies provided", () => {
    expect(
      () =>
        new TestProject({
          cdkVersion: "2.0.0-alpha.5",
          cdkDependencies: ["@aws-cdk/aws-lambda"],
        }),
    ).toThrow(
      /cdkDependencies is not used for CDK 2.x. Use "peerDeps" or "deps" instead/,
    );
  });

  test("for cdk 2.x, throws if cdkTestDependencies provided", () => {
    expect(
      () =>
        new TestProject({
          cdkVersion: "2.0.0-alpha.5",
          cdkTestDependencies: ["@aws-cdk/aws-lambda"],
        }),
    ).toThrow(
      /cdkTestDependencies is not used for CDK 2.x. Use "devDeps" or "testDeps" instead/,
    );
  });

  test("for cdk 2.x, throws if cdkDependenciesAsDeps provided", () => {
    expect(
      () =>
        new TestProject({
          cdkVersion: "2.0.0-alpha.5",
          cdkDependenciesAsDeps: true,
        }),
    ).toThrow(/cdkDependenciesAsDeps is not used for CDK 2.x/);
  });

  test("for cdk 2.x, throws if cdkAssert provided", () => {
    expect(
      () =>
        new TestProject({
          cdkVersion: "2.0.0-alpha.5",
          cdkAssert: true,
        }),
    ).toThrow(
      /cdkAssert is not used for CDK 2.x. Use the assertions library that is provided in aws-cdk-lib/,
    );
  });

  test("for cdk 3.x (does not exist yet)", () => {
    // GIVEN
    expect(() => new TestProject({ cdkVersion: "3.1337.42" })).toThrow(
      /Unsupported AWS CDK major version 3\.x/,
    );
  });
});

describe("lambda functions", () => {
  test("are auto-discovered by default", () => {
    // GIVEN
    const outdir = mkdtemp();
    mkdirSync(join(outdir, "src"));
    writeFileSync(join(outdir, "src", "my.lambda.ts"), "// dummy");

    const project = new TestProject({
      cdkVersion: "1.100.0",
      libdir: "liblib",
      outdir: outdir,
      bundlerOptions: {
        assetsDir: "resources",
      },
      lambdaOptions: {
        runtime: awscdk.LambdaRuntime.NODEJS_22_X,
        bundlingOptions: {
          externals: ["foo", "bar"],
          sourcemap: true,
        },
      },
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot["src/my-function.ts"]).not.toBeUndefined();
    expect(
      snapshot[".projen/tasks.json"].tasks["bundle:my.lambda"].steps,
    ).toStrictEqual([
      {
        exec: 'esbuild --bundle src/my.lambda.ts --target="node22" --platform="node" --outfile="resources/my.lambda/index.js" --tsconfig="tsconfig.dev.json" --external:foo --external:bar --sourcemap',
      },
    ]);
  });

  test("auto-discover can be disabled", () => {
    // GIVEN
    const project = new TestProject({
      cdkVersion: "1.100.0",
      lambdaAutoDiscover: false,
    });

    // WHEN
    mkdirSync(join(project.outdir, project.srcdir));
    writeFileSync(
      join(project.outdir, project.srcdir, "my.lambda.ts"),
      "// dummy",
    );

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot["src/my-function.ts"]).toBeUndefined();
    expect(snapshot[".projen/tasks.json"].tasks["bundle:my"]).toBeUndefined();
  });
});

describe("node version in workflow", () => {
  it("does setup default version", () => {
    const project = new TestProject({ cdkVersion: "2.12.0" });
    const snapshot = synthSnapshot(project);
    const buildWorkflow = YAML.parse(snapshot[".github/workflows/build.yml"]);
    expect(buildWorkflow.jobs.build).toMatchSnapshot();
    expect(buildWorkflow.jobs.build.steps).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uses: expect.stringContaining("actions/setup-node"),
          with: {
            "node-version": "lts/*",
          },
        }),
      ]),
    );
  });

  it("does use minNodeVersion", () => {
    const project = new TestProject({
      cdkVersion: "2.12.0",
      minNodeVersion: "18.0.0",
    });
    const snapshot = synthSnapshot(project);
    const buildWorkflow = YAML.parse(snapshot[".github/workflows/build.yml"]);
    expect(buildWorkflow.jobs.build).toMatchSnapshot();
    expect(buildWorkflow.jobs.build.steps).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uses: expect.stringContaining("actions/setup-node"),
          with: {
            "node-version": "18.0.0",
          },
        }),
      ]),
    );
  });

  it("does setup a custom version", () => {
    const project = new TestProject({
      cdkVersion: "2.12.0",
      minNodeVersion: "16.0.0",
      workflowNodeVersion: "20.17.0",
    });
    const snapshot = synthSnapshot(project);
    const buildWorkflow = YAML.parse(snapshot[".github/workflows/build.yml"]);
    expect(buildWorkflow.jobs.build).toMatchSnapshot();
    expect(buildWorkflow.jobs.build.steps).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uses: expect.stringContaining("actions/setup-node"),
          with: {
            "node-version": "20.17.0",
          },
        }),
      ]),
    );
  });
});

describe("workflow container image", () => {
  it("does not use an image by default for cdk v1", () => {
    const project = new TestProject({ cdkVersion: "1.100.0" });
    const snapshot = synthSnapshot(project);
    const buildWorkflow = YAML.parse(snapshot[".github/workflows/build.yml"]);
    expect(buildWorkflow.jobs.build).not.toHaveProperty("container");
  });

  it("does not use an image by default for cdk v2", () => {
    const project = new TestProject({ cdkVersion: "2.12.0" });
    const snapshot = synthSnapshot(project);
    const buildWorkflow = YAML.parse(snapshot[".github/workflows/build.yml"]);
    expect(buildWorkflow.jobs.build).not.toHaveProperty("container");
  });

  it("uses the user-defined image if specified", () => {
    const project = new TestProject({
      cdkVersion: "2.12.0",
      workflowContainerImage: "my-custom-image",
    });
    const snapshot = synthSnapshot(project);
    const buildWorkflow = YAML.parse(snapshot[".github/workflows/build.yml"]);
    expect(buildWorkflow.jobs.build.container.image).toStrictEqual(
      "my-custom-image",
    );
  });
});

describe("integ-runner", () => {
  test('adds "integ-runner" to devDependencies', () => {
    const project = new TestProject({
      cdkVersion: "2.12.0",
      experimentalIntegRunner: true,
    });

    const snapshot = synthSnapshot(project);

    expect(
      snapshot["package.json"]?.devDependencies["@aws-cdk/integ-runner"],
    ).toStrictEqual("latest");
    expect(
      snapshot["package.json"]?.devDependencies["@aws-cdk/integ-tests-alpha"],
    ).toStrictEqual("latest");
    expect(project.tasks.tryFind("integ")?.steps).toEqual([
      { exec: "integ-runner $@ --language typescript", receiveArgs: true },
    ]);
    expect(project.tasks.tryFind("integ:update")?.steps).toEqual([
      {
        exec: "integ-runner $@ --language typescript --update-on-failed",
        receiveArgs: true,
      },
    ]);
    expect(project.testTask.steps).toEqual(
      expect.arrayContaining([{ spawn: "integ" }]),
    );
  });
});

it("warns the user if they add CDK v1 dependencies to a CDK v2 project", () => {
  // GIVEN
  console.error = jest.fn();
  const project = new TestProject({
    cdkVersion: "2.12.0",
    deps: [
      "@aws-cdk/core",
      "@aws-cdk/aws-s3",
      "@aws-cdk/cfnspec",
      "@aws-cdk/aws-apigatewayv2-alpha@2.25.0-alpha.0",
    ],
    logging: {
      level: LogLevel.VERBOSE,
    },
  });

  // WHEN
  Testing.synth(project);

  // THEN
  expect(console.error).toHaveBeenCalledWith(
    expect.stringContaining(
      `WARNING: Found CDK v1 deps in your project, even though your "cdkVersion" is 2.x: [@aws-cdk/aws-s3, @aws-cdk/core].`,
    ),
  );
});

const defaultOptions = {
  author: "Nobody",
  authorAddress: "nobody@nowhere.com",
  clobber: false,
  defaultReleaseBranch: "main",
  jest: false,
  name: "test-project",
  npmAccess: NpmAccess.PUBLIC,
  repositoryUrl: "https://github.com/projen/projen.git",
} as const;

class TestProject extends AwsCdkConstructLibrary {
  constructor(
    options: Omit<AwsCdkConstructLibraryOptions, keyof typeof defaultOptions>,
  ) {
    super({
      ...defaultOptions,
      ...options,
    });
  }
}
