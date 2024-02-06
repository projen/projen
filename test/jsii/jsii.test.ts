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
          jest: "^27",
          jsii: "1.x",
        },
        resolutions: {
          "@types/babel__traverse": "7.18.2",
          "@types/prettier": "2.6.0",
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

describe("JsiiProject with jsiiVersion: '^1.78.1'", () => {
  it("synthesizes", () => {
    const project = new JsiiProject({
      defaultReleaseBranch: "main",
      name: "test",
      repositoryUrl: "github.com/projen/projen.dummy",
      author: "Test",
      authorAddress: "test@projen",
      jsiiVersion: "^1.78.1",
      docgen: false,
    });

    const output = synthSnapshot(project);
    expect(output).toMatchSnapshot({
      "package.json": {
        devDependencies: {
          jest: "^27",
          jsii: "^1.78.1",
        },
        resolutions: {
          "@types/babel__traverse": "7.18.2",
          "@types/prettier": "2.6.0",
        },
      },
    });
  });

  describe.each([
    ["16", undefined], // this is the default
    ["18", "18.0.0"],
    ["20", "20.0.0"],
  ])("with node version %s", (_, minNodeVersion) => {
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
      });

      project.synth();

      execProjenCLI(project.outdir, ["compile"], {
        ...process.env,
        CI: "0", // never treat this a CI build because we don't have a lockfile at this point
      });
    });
  });
});

describe("JsiiProject with jsiiVersion: '~5.0.0'", () => {
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
