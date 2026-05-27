import * as fs from "fs";
import * as path from "path";
import { NodeRelease } from "@jsii/check-node";
import * as YAML from "yaml";
import { JsiiProject } from "../../src/cdk";
import { secretToString } from "../../src/github/private/util";
import { NodePackageManager } from "../../src/javascript";
import { execProjenCLI, synthSnapshot } from "../util";

/**
 * Returns a list of supported jsii versions
 *
 * @example ['5.1', '5.2']
 */
function getSupportedJsiiVersions(): string[] {
  const releasesPath = path.join(
    __dirname,
    "../../node_modules/jsii/releases.json",
  );
  const releases = JSON.parse(fs.readFileSync(releasesPath, "utf8"));
  const now = new Date();
  const supportedVersions = Object.entries(releases.maintenance)
    .filter(([_, eolDate]) => new Date(eolDate as string) > now)
    .map(([version]) => version);
  return [releases.current, ...supportedVersions];
}

/**
 * Returns a list of supported node versions
 *
 * @example ['18', '20']
 */
function getSupportedNodeVersions(): string[] {
  return NodeRelease.ALL_RELEASES.filter((r) => r.supported && !r.untested).map(
    (r) => r.majorVersion.toString(),
  );
}

describe("JsiiProject with default settings", () => {
  it("synthesizes", () => {
    const project = new JsiiProject({
      defaultReleaseBranch: "main",
      name: "test",
      repositoryUrl: "github.com/projen/projen.dummy",
      author: "Test",
      authorAddress: "test@projen",
    });

    const output = synthSnapshot(project);
    expect(output).toMatchSnapshot({
      "package.json": {
        devDependencies: {
          jsii: expect.any(String),
        },
      },
    });
  });

  it("compiles", () => {
    const project = new JsiiProject({
      defaultReleaseBranch: "main",
      name: "test",
      repositoryUrl: "github.com/projen/projen.dummy",
      author: "Test",
      authorAddress: "test@projen",
    });

    project.synth();

    execProjenCLI(project.outdir, ["compile"]);
  });
});

describe("JsiiProject with modern jsiiVersion", () => {
  it("synthesizes", () => {
    const project = new JsiiProject({
      defaultReleaseBranch: "main",
      name: "test",
      repositoryUrl: "github.com/projen/projen.dummy",
      author: "Test",
      authorAddress: "test@projen",
      jsiiVersion: "~5.0.0",
    });

    const output = synthSnapshot(project);
    expect(output).toMatchSnapshot({
      "package.json": {
        devDependencies: {
          jest: "*",
          jsii: "~5.0.0",
        },
      },
    });
    expect(output["package.json"].resolutions).toBeUndefined();
  });

  it("compiles", () => {
    const project = new JsiiProject({
      defaultReleaseBranch: "main",
      name: "test",
      repositoryUrl: "github.com/projen/projen.dummy",
      author: "Test",
      authorAddress: "test@projen",
      jsiiVersion: "~5.0.0",
    });

    project.synth();

    execProjenCLI(project.outdir, ["compile"]);
  });
});

describe("JsiiProject with jsiiVersion: '*'", () => {
  it("synthesizes", () => {
    const project = new JsiiProject({
      defaultReleaseBranch: "main",
      name: "test",
      repositoryUrl: "github.com/projen/projen.dummy",
      author: "Test",
      authorAddress: "test@projen",
      jsiiVersion: "*",
    });

    const output = synthSnapshot(project);
    expect(output).toMatchSnapshot({
      "package.json": {
        devDependencies: {
          jest: "*",
          jsii: "*",
        },
      },
    });
    expect(output["package.json"].resolutions).toBeUndefined();
  });

  it("compiles", () => {
    const project = new JsiiProject({
      defaultReleaseBranch: "main",
      name: "test",
      repositoryUrl: "github.com/projen/projen.dummy",
      author: "Test",
      authorAddress: "test@projen",
      jsiiVersion: "*",
    });

    project.synth();

    execProjenCLI(project.outdir, ["compile"]);
  });
});

// matrix test
describe.each(getSupportedJsiiVersions().map((version) => [`~${version}.0`]))(
  "JsiiProject with jsiiVersion: '%s'",
  (jsiiVersion) => {
    describe.each(
      getSupportedNodeVersions().map((version) => [version, `${version}.0.0`]),
    )("with minNodeVersion %s", (_, minNodeVersion) => {
      const originalCI = process.env.CI;
      beforeAll(() => {
        process.env.CI = "false";
      });
      afterAll(() => {
        process.env.CI = originalCI;
      });

      it("compiles", () => {
        const project = new JsiiProject({
          defaultReleaseBranch: "main",
          name: "test",
          repositoryUrl: "github.com/projen/projen.dummy",
          author: "Test",
          authorAddress: "test@projen",
          minNodeVersion,
          packageManager: NodePackageManager.NPM,
          docgen: false,
          jsiiVersion,
        });

        project.synth();

        execProjenCLI(project.outdir, ["compile"]);
      });
    });
  },
);

describe("JsiiProject with Release to CodeArtifact", () => {
  const accountId = "123456789012";
  const domain = "my-domain";
  const region = "my-region-1";
  const repository = "MyRepository";
  const scope = "@stub-scope";
  const registry = `${domain}-${accountId}.d.codeartifact.${region}.amazonaws.com/npm/${repository}/`;
  const registryUrl = `https://${registry}`;

  it("Should add AWS CodeArtifact login steps to the workflow When key and secret are provided", () => {
    const accessKeyIdSecret = "stub-access-key-id";
    const secretAccessKeySecret = "stub-secret-access-key";

    const project = new JsiiProject({
      defaultReleaseBranch: "main",
      name: "test",
      repositoryUrl: "github.com/projen/projen.dummy",
      author: "Test",
      release: true,
      releaseToNpm: true,
      authorAddress: "test@projen",
      scopedPackagesOptions: [
        {
          registryUrl,
          scope,
        },
      ],
      codeArtifactOptions: {
        accessKeyIdSecret,
        secretAccessKeySecret,
      },
    });

    const output = synthSnapshot(project);

    const expectedSteps = expect.arrayContaining([
      {
        name: "AWS CodeArtifact Login",
        run: "npx projen ca:login",
        env: {
          AWS_ACCESS_KEY_ID: secretToString(accessKeyIdSecret),
          AWS_SECRET_ACCESS_KEY: secretToString(secretAccessKeySecret),
        },
      },
    ]);

    const buildWorkflow = YAML.parse(output[".github/workflows/build.yml"]);
    expect(buildWorkflow.jobs.build.steps).toEqual(expectedSteps);
    expect(buildWorkflow.jobs["package-js"].steps).toEqual(expectedSteps);

    const releaseWorkflow = YAML.parse(output[".github/workflows/release.yml"]);
    expect(releaseWorkflow.jobs.release.steps).toEqual(expectedSteps);
    expect(releaseWorkflow.jobs.release_npm.steps).toEqual(expectedSteps);
  });

  it("Should add AWS CodeArtifact login steps to the workflow When roleToAssume is provided", () => {
    const roleToAssume = `stub-role-to-assume`;

    const project = new JsiiProject({
      defaultReleaseBranch: "main",
      name: "test",
      repositoryUrl: "github.com/projen/projen.dummy",
      author: "Test",
      release: true,
      releaseToNpm: true,
      authorAddress: "test@projen",
      scopedPackagesOptions: [
        {
          registryUrl,
          scope,
        },
      ],
      codeArtifactOptions: {
        roleToAssume,
      },
    });

    const output = synthSnapshot(project);

    const expectedSteps = expect.arrayContaining([
      {
        name: "Configure AWS Credentials",
        uses: expect.stringContaining("aws-actions/configure-aws-credentials"),
        with: expect.objectContaining({
          "aws-region": "us-east-2",
          "role-to-assume": roleToAssume,
          "role-duration-seconds": 900,
        }),
      },
      {
        name: "AWS CodeArtifact Login",
        run: "npx projen ca:login",
      },
    ]);

    const buildWorkflow = YAML.parse(output[".github/workflows/build.yml"]);
    expect(buildWorkflow.jobs.build.steps).toEqual(expectedSteps);
    expect(buildWorkflow.jobs["package-js"].steps).toEqual(expectedSteps);

    const releaseWorkflow = YAML.parse(output[".github/workflows/release.yml"]);
    expect(releaseWorkflow.jobs.release.steps).toEqual(expectedSteps);
    expect(releaseWorkflow.jobs.release_npm.steps).toEqual(expectedSteps);
  });

  it("Should add AWS CodeArtifact login steps to the workflow When publish to Pypi has codeArtifactOptions", () => {
    const roleToAssume = `stub-role-to-assume`;

    const project = new JsiiProject({
      defaultReleaseBranch: "main",
      name: "test",
      repositoryUrl: "github.com/projen/projen.dummy",
      author: "Test",
      release: true,
      authorAddress: "test@projen",
      publishToPypi: {
        distName: "test",
        module: "test",
        codeArtifactOptions: {
          roleToAssume,
        },
      },
    });

    const output = synthSnapshot(project);

    const expectedSteps = expect.arrayContaining([
      {
        name: "Configure AWS Credentials",
        uses: expect.stringContaining("aws-actions/configure-aws-credentials"),
        with: expect.objectContaining({
          "aws-region": "us-east-2",
          "role-to-assume": roleToAssume,
          "role-duration-seconds": 900,
        }),
      },
      {
        name: "AWS CodeArtifact Login",
        run: "npx projen ca:login",
      },
    ]);

    const buildWorkflow = YAML.parse(output[".github/workflows/build.yml"]);
    expect(buildWorkflow.jobs["package-python"].steps).toEqual(expectedSteps);

    const releaseWorkflow = YAML.parse(output[".github/workflows/release.yml"]);
    expect(releaseWorkflow.jobs.release_pypi.steps).toEqual(expectedSteps);
  });
});
