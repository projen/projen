import { JsiiProject } from "../../src/cdk";
import { NodePackageManager } from "../../src/javascript";
import { execProjenCLI, synthSnapshot } from "../util";

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
describe.each([["~5.5.0"], ["~5.6.0"], ["~5.7.0"], ["~5.8.0"]])(
  "JsiiProject with jsiiVersion: '%s'",
  (jsiiVersion) => {
    describe.each([
      ["18", "18.0.0"],
      ["20", "20.0.0"],
      ["22", "22.0.0"],
    ])("with node version %s", (_, minNodeVersion) => {
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
  }
);
