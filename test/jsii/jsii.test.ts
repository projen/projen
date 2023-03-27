import { JsiiProject } from "../../src/cdk";
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
