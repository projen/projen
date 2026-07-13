import * as yaml from "yaml";
import { BuildWorkflow } from "../../src/build";
import type { Project } from "../../src/project";
import { synthSnapshot, TestProject } from "../util";

describe("name", () => {
  test("defaults to build", () => {
    // GIVEN
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "./foo",
    });

    // THEN
    const workflows = synthWorkflows(p);
    expect(workflows[".github/workflows/build.yml"]).toBeDefined();
    expect(workflows[".github/workflows/build.yml"]).toMatchSnapshot();
  });

  test("uses custom", () => {
    // GIVEN
    const p = new TestProject();
    new BuildWorkflow(p, {
      name: "custom-name",
      buildTask: p.buildTask,
      artifactsDirectory: "./foo",
    });

    // THEN
    const workflows = synthWorkflows(p);
    expect(workflows[".github/workflows/custom-name.yml"]).toBeDefined();
    expect(workflows[".github/workflows/custom-name.yml"]).toMatchSnapshot();
  });

  describe("with parent project", () => {
    test("defaults to build with project name suffix", () => {
      // GIVEN
      const parent = new TestProject();
      const p = new TestProject({ parent, outdir: "child" });
      new BuildWorkflow(p, {
        buildTask: p.buildTask,
        artifactsDirectory: "./foo",
      });

      // THEN
      const workflows = synthWorkflows(parent);
      console.log(workflows);
      expect(workflows[".github/workflows/build_my-project.yml"]).toBeDefined();
      expect(
        workflows[".github/workflows/build_my-project.yml"],
      ).toMatchSnapshot();
    });
  });
});

describe("buildRunsOn", () => {
  test("defaults to runsOn value", () => {
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "./foo",
      runsOn: ["self-hosted"],
    });

    const workflows = synthWorkflows(p);
    const build = yaml.parse(workflows[".github/workflows/build.yml"]);
    expect(build.jobs.build["runs-on"]).toEqual("self-hosted");
  });

  test("overrides runsOn for the build job", () => {
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "./foo",
      runsOn: ["ubuntu-latest"],
      buildRunsOn: ["self-hosted", "linux"],
    });

    const workflows = synthWorkflows(p);
    const build = yaml.parse(workflows[".github/workflows/build.yml"]);
    expect(build.jobs.build["runs-on"]).toEqual(["self-hosted", "linux"]);
  });
});

describe("addPostBuildJob", () => {
  test("downloads artifact by id", () => {
    const p = new TestProject();
    const bw = new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "dist",
    });

    bw.addPostBuildJob("post-job", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [{ run: "echo hello" }],
    });

    const workflows = synthWorkflows(p);
    const build = yaml.parse(workflows[".github/workflows/build.yml"]);
    const postJob = build.jobs["post-job"];
    const downloadStep = postJob.steps[0];
    expect(downloadStep.name).toBe("Download build artifacts");
    expect(downloadStep.with["artifact-ids"]).toBe(
      "${{ needs.build.outputs.artifact_id }}",
    );
    expect(downloadStep.with.name).toBeUndefined();
  });

  test("artifact_id output is not present without post-build jobs", () => {
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "dist",
    });

    const workflows = synthWorkflows(p);
    const build = yaml.parse(workflows[".github/workflows/build.yml"]);
    expect(build.jobs.build.outputs.artifact_id).toBeUndefined();
  });

  test("artifact_id output is present with post-build jobs", () => {
    const p = new TestProject();
    const bw = new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "dist",
    });

    bw.addPostBuildJob("post-job", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [{ run: "echo hello" }],
    });

    const workflows = synthWorkflows(p);
    const build = yaml.parse(workflows[".github/workflows/build.yml"]);
    expect(build.jobs.build.outputs.artifact_id).toBe(
      "${{ steps.upload_artifact.outputs.artifact-id }}",
    );
  });
});

function synthWorkflows(p: Project): any {
  const snapshot = synthSnapshot(p);
  const filtered = Object.keys(snapshot)
    .filter((path) => path.startsWith(".github/workflows/"))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: snapshot[key],
      };
    }, {});
  return filtered;
}
