import * as fs from "fs";
import * as path from "path";
import { NodeRelease } from "@jsii/check-node";
import { JsiiProject } from "../../src/cdk";
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
