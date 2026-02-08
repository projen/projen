import * as YAML from "yaml";
import { Release } from "../../src/release";
import { synthSnapshot, TestProject } from "../util";

describe("Publisher Environment Support", () => {
  test("publishToNpm with githubEnvironment", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToNpm({
      githubEnvironment: "production",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow.jobs.release_npm.environment).toBe("production");
  });

  test("publishToMaven with githubEnvironment", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToMaven({
      githubEnvironment: "staging",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow.jobs.release_maven.environment).toBe("staging");
  });

  test("publishToPyPi with githubEnvironment", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToPyPi({
      githubEnvironment: "pypi-prod",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow.jobs.release_pypi.environment).toBe("pypi-prod");
  });

  test("publishToNuget with githubEnvironment", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToNuget({
      githubEnvironment: "nuget-env",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow.jobs.release_nuget.environment).toBe("nuget-env");
  });

  test("publishToGo with githubEnvironment", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToGo({
      githubEnvironment: "go-registry",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow.jobs.release_golang.environment).toBe("go-registry");
  });

  test("publishToGitHubReleases with githubEnvironment", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToGitHubReleases({
      versionFile: "version.txt",
      releaseTagFile: "releasetag.txt",
      changelogFile: "changelog.md",
      githubEnvironment: "github-releases",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow.jobs.release_github.environment).toBe("github-releases");
  });

  test("branch-level environment takes precedence over publisher-level environment", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
      releaseEnvironment: "branch-env",
    });

    // WHEN
    release.publisher.publishToNpm({
      githubEnvironment: "npm-env",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow.jobs.release_npm.environment).toBe("npm-env");
  });

  test("branch-level environment is used when no publisher-level environment is set", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
      releaseEnvironment: "branch-env",
    });

    // WHEN
    release.publisher.publishToNpm();

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow.jobs.release_npm.environment).toBe("branch-env");
  });

  test("no environment is set when neither branch nor publisher environment is specified", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToNpm();

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow.jobs.release_npm.environment).toBeUndefined();
  });

  test("multiple publishers with different environments", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToNpm({
      githubEnvironment: "npm-prod",
    });
    release.publisher.publishToMaven({
      githubEnvironment: "maven-staging",
    });
    release.publisher.publishToPyPi({
      githubEnvironment: "pypi-test",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow.jobs.release_npm.environment).toBe("npm-prod");
    expect(workflow.jobs.release_maven.environment).toBe("maven-staging");
    expect(workflow.jobs.release_pypi.environment).toBe("pypi-test");
  });

  test("environment is applied to additional release branches", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      majorVersion: 1,
      artifactsDirectory: "dist",
      releaseEnvironment: "default-env",
    });

    // WHEN
    release.addBranch("2.x", {
      majorVersion: 2,
      environment: "branch-2-env",
    });
    release.publisher.publishToNpm();

    // THEN
    const outdir = synthSnapshot(project);
    const mainWorkflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    const branchWorkflow = YAML.parse(
      outdir[".github/workflows/release-2.x.yml"],
    );

    expect(mainWorkflow.jobs.release_npm.environment).toBe("default-env");
    expect(branchWorkflow.jobs.release_npm.environment).toBe("branch-2-env");
  });

  test("releaseBranches with environment configuration", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      majorVersion: 1,
      artifactsDirectory: "dist",
      releaseEnvironment: "main-env",
      releaseBranches: {
        beta: {
          majorVersion: 2,
          environment: "beta-env",
        },
        alpha: {
          majorVersion: 3,
          environment: "alpha-env",
        },
      },
    });

    release.publisher.publishToNpm();

    // THEN
    const outdir = synthSnapshot(project);
    const mainWorkflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    const betaWorkflow = YAML.parse(
      outdir[".github/workflows/release-beta.yml"],
    );
    const alphaWorkflow = YAML.parse(
      outdir[".github/workflows/release-alpha.yml"],
    );

    // The release job should NOT get environment - only publish jobs should
    // This is because the release job just builds artifacts and doesn't need approval
    expect(mainWorkflow.jobs.release.environment).toBeUndefined();
    expect(betaWorkflow.jobs.release.environment).toBeUndefined();
    expect(alphaWorkflow.jobs.release.environment).toBeUndefined();
    expect(mainWorkflow.jobs.release_npm.environment).toBe("main-env");
    expect(betaWorkflow.jobs.release_npm.environment).toBe("beta-env");
    expect(alphaWorkflow.jobs.release_npm.environment).toBe("alpha-env");
  });
});
