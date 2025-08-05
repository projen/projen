import * as YAML from "yaml";
import { Release } from "../../src/release";
import { synthSnapshot, TestProject } from "../util";

describe("Release Environment Support", () => {
  test("releaseEnvironment is applied to publisher jobs", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
      releaseEnvironment: "release-env",
    });

    // WHEN
    release.publisher.publishToNpm();

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    // The release job should NOT get environment - only publish jobs should
    // This is because the release job just builds artifacts and doesn't need approval
    expect(workflow.jobs.release.environment).toBeUndefined();
    expect(workflow.jobs.release_npm.environment).toBe("release-env");
  });

  test("branch-specific environment overrides release environment", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      majorVersion: 1,
      artifactsDirectory: "dist",
      releaseEnvironment: "default-release-env",
    });

    // WHEN
    release.addBranch("staging", {
      majorVersion: 2,
      environment: "staging-env",
    });
    release.publisher.publishToNpm();

    // THEN
    const outdir = synthSnapshot(project);
    const mainWorkflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    const stagingWorkflow = YAML.parse(
      outdir[".github/workflows/release-staging.yml"]
    );

    // The release job should NOT get environment - only publish jobs should
    expect(mainWorkflow.jobs.release.environment).toBeUndefined();
    expect(stagingWorkflow.jobs.release.environment).toBeUndefined();
    expect(mainWorkflow.jobs.release_npm.environment).toBe(
      "default-release-env"
    );
    expect(stagingWorkflow.jobs.release_npm.environment).toBe("staging-env");
  });

  test("releaseBranches inherit release environment when not specified", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      majorVersion: 1,
      artifactsDirectory: "dist",
      releaseEnvironment: "inherited-env",
      releaseBranches: {
        v2: { majorVersion: 2 },
        v3: { majorVersion: 3, environment: "v3-specific-env" },
      },
    });
    release.publisher.publishToNpm();

    // THEN
    const outdir = synthSnapshot(project);
    const mainWorkflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    const v2Workflow = YAML.parse(outdir[".github/workflows/release-v2.yml"]);
    const v3Workflow = YAML.parse(outdir[".github/workflows/release-v3.yml"]);

    // The release job should NOT get environment - only publish jobs should
    expect(mainWorkflow.jobs.release.environment).toBeUndefined();
    expect(v2Workflow.jobs.release.environment).toBeUndefined();
    expect(v3Workflow.jobs.release.environment).toBeUndefined();
    expect(mainWorkflow.jobs.release_npm.environment).toBe("inherited-env");
    expect(v2Workflow.jobs.release_npm.environment).toBe("inherited-env");
    expect(v3Workflow.jobs.release_npm.environment).toBe("v3-specific-env");
  });

  test("no environment is set when releaseEnvironment is not specified", () => {
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
    expect(workflow.jobs.release.environment).toBeUndefined();
    expect(workflow.jobs.release_npm.environment).toBeUndefined();
  });

  test("environment is applied to both release and publisher jobs", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
      releaseEnvironment: "shared-env",
    });

    // WHEN
    release.publisher.publishToNpm();
    release.publisher.publishToGitHubReleases({
      versionFile: "version.txt",
      releaseTagFile: "releasetag.txt",
      changelogFile: "changelog.md",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    // The release job should NOT get environment - only publish jobs should
    expect(workflow.jobs.release.environment).toBeUndefined();
    expect(workflow.jobs.release_npm.environment).toBe("shared-env");
    expect(workflow.jobs.release_github.environment).toBe("shared-env");
  });

  test("publisher-specific environment overrides release environment", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
      releaseEnvironment: "release-env",
    });

    // WHEN
    release.publisher.publishToNpm({
      githubEnvironment: "npm-specific-env",
    });
    release.publisher.publishToGitHubReleases({
      versionFile: "version.txt",
      releaseTagFile: "releasetag.txt",
      changelogFile: "changelog.md",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    // The release job should NOT get environment - only publish jobs should
    expect(workflow.jobs.release.environment).toBeUndefined();
    expect(workflow.jobs.release_npm.environment).toBe("npm-specific-env");
    expect(workflow.jobs.release_github.environment).toBe("release-env");
  });
});
