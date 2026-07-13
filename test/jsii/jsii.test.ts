import * as fs from "fs";
import * as path from "path";
import { NodeRelease } from "@jsii/check-node";
import type { JsiiProjectOptions } from "../../src/cdk";
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
    const project = new TestJsiiProject();

    const output = synthSnapshot(project);
    expect(output).toMatchSnapshot({
      "package.json": {
        devDependencies: {
          jsii: expect.any(String),
        },
      },
    });
  });

  it("compiles", async () => {
    const project = new TestJsiiProject();

    project.synth();

    await execProjenCLI(project.outdir, ["compile"]);
  });

  // https://github.com/projen/projen/issues/4806
  it("supports running jest tests", async () => {
    const project = new TestJsiiProject();

    project.synth();

    // Add a trivial test file, mirroring the issue's reproduction steps.
    fs.writeFileSync(
      path.join(project.outdir, project.testdir, "dummy.test.ts"),
      "test('dummy', () => { expect(true).toBe(true); });\n",
    );

    await execProjenCLI(project.outdir, ["test"]);
  });
});

describe("JsiiProject with modern jsiiVersion", () => {
  it("synthesizes", () => {
    const project = new TestJsiiProject({
      jsiiVersion: "~5.9.0",
    });

    const output = synthSnapshot(project);
    expect(output).toMatchSnapshot({
      "package.json": {
        devDependencies: {
          jest: "*",
          jsii: "~5.9.0",
        },
      },
    });
    expect(output["package.json"].resolutions).toBeUndefined();
  });

  it("compiles", async () => {
    const project = new TestJsiiProject({
      jsiiVersion: "~5.9.0",
      devDeps: ["jsii-pacmak@1.135.0"],
    });

    project.synth();

    await execProjenCLI(project.outdir, ["compile"]);
  });
});

describe("JsiiProject with jsiiVersion: '*'", () => {
  it("synthesizes", () => {
    const project = new TestJsiiProject({
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

  it("compiles", async () => {
    const project = new TestJsiiProject({
      jsiiVersion: "*",
    });

    project.synth();

    await execProjenCLI(project.outdir, ["compile"]);
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

      it("compiles", async () => {
        const project = new TestJsiiProject({
          minNodeVersion,
          docgen: false,
          jsiiVersion,
        });

        project.synth();

        await execProjenCLI(project.outdir, ["compile"]);
      });
    });
  },
);

class TestJsiiProject extends JsiiProject {
  public constructor(
    options: Omit<
      JsiiProjectOptions,
      | "defaultReleaseBranch"
      | "name"
      | "repositoryUrl"
      | "author"
      | "authorAddress"
      | "packageManager"
    > = {},
  ) {
    super({
      defaultReleaseBranch: "main",
      name: "@projen/test",
      repositoryUrl: "github.com/projen/projen.dummy",
      author: "Test",
      authorAddress: "test@projen",
      packageManager: NodePackageManager.NPM,
      ...options,
    });
  }
}
