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

describe("checkout ref", () => {
  test("post-build job commands checkout is pinned to the PR head SHA", () => {
    const p = new TestProject();
    const bw = new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "dist",
    });

    bw.addPostBuildJobCommands("post-job", ["echo hello"], {
      checkoutRepo: true,
    });

    const workflows = synthWorkflows(p);
    const build = yaml.parse(workflows[".github/workflows/build.yml"]);
    const checkoutStep = build.jobs["post-job"].steps.find((s: any) =>
      s.uses?.startsWith("actions/checkout"),
    );
    expect(checkoutStep.with.ref).toBe(
      "${{ github.event.pull_request.head.sha }}",
    );
    expect(checkoutStep.with.repository).toBe(
      "${{ github.event.pull_request.head.repo.full_name }}",
    );
  });
});

describe("self-mutation", () => {
  test("runs in a separate workflow when the build fails", () => {
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "dist",
      mutableBuild: true,
    });

    const workflows = synthWorkflows(p);
    const build = yaml.parse(workflows[".github/workflows/build.yml"]);
    const selfMutation = yaml.parse(
      workflows[".github/workflows/self-mutation.yml"],
    );
    expect(build.jobs["self-mutation"]).toBeUndefined();
    expect(selfMutation.on.workflow_run.workflows).toEqual([build.name]);
    expect(selfMutation.jobs.check.if).toContain(
      "github.event.workflow_run.conclusion == 'failure'",
    );
  });

  test("only pushes when the build uploaded a patch", () => {
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "dist",
      mutableBuild: true,
    });

    const workflows = synthWorkflows(p);
    const selfMutation = yaml.parse(
      workflows[".github/workflows/self-mutation.yml"],
    );
    const job = selfMutation.jobs["self-mutation"];
    expect(job.needs).toEqual("check");
    expect(job.if).toBe("needs.check.outputs.has_patch == 'true'");
    expect(job.steps.some((s: any) => s["continue-on-error"])).toBe(false);
  });

  test("only updates the branch if it still points at the built commit", () => {
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "dist",
      mutableBuild: true,
    });

    const workflows = synthWorkflows(p);
    const push = yaml
      .parse(workflows[".github/workflows/self-mutation.yml"])
      .jobs["self-mutation"].steps.find((s: any) => s.name === "Push changes");
    expect(push.env.HEAD_SHA).toBe("${{ github.event.workflow_run.head_sha }}");
    expect(push.run).toContain(
      '--force-with-lease="refs/heads/$HEAD_BRANCH:$HEAD_SHA"',
    );
  });

  test("is not added without mutableBuild", () => {
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "dist",
      mutableBuild: false,
    });

    const workflows = synthWorkflows(p);
    expect(workflows[".github/workflows/self-mutation.yml"]).toBeUndefined();
  });

  test("skips pull requests from forks by default", () => {
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "dist",
      mutableBuild: true,
    });

    const workflows = synthWorkflows(p);
    const selfMutation = yaml.parse(
      workflows[".github/workflows/self-mutation.yml"],
    );
    expect(selfMutation.jobs.check.if).toContain(
      "github.event.workflow_run.head_repository.full_name == github.repository",
    );
  });

  test("never pushes to the default branch", () => {
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "dist",
      mutableBuild: true,
    });

    const workflows = synthWorkflows(p);
    const selfMutation = yaml.parse(
      workflows[".github/workflows/self-mutation.yml"],
    );
    expect(selfMutation.jobs.check.if).toContain(
      "github.event.workflow_run.head_branch != github.event.repository.default_branch",
    );
  });

  test("does not push again after a self-mutation commit", () => {
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "dist",
      mutableBuild: true,
    });

    const workflows = synthWorkflows(p);
    const selfMutation = yaml.parse(
      workflows[".github/workflows/self-mutation.yml"],
    );
    expect(selfMutation.jobs.check.if).toContain(
      "!startsWith(github.event.workflow_run.head_commit.message, 'chore: self mutation')",
    );
  });

  test("allowFromForks pushes to pull requests from forks", () => {
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "dist",
      mutableBuild: true,
      mutableBuildOptions: { allowFromForks: true },
    });

    const workflows = synthWorkflows(p);
    const { jobs } = yaml.parse(
      workflows[".github/workflows/self-mutation.yml"],
    );
    const checkoutStep = jobs["self-mutation"].steps.find((s: any) =>
      s.uses?.startsWith("actions/checkout"),
    );
    expect(jobs.check.if).toContain(
      "!(github.event.workflow_run.head_repository.full_name == github.repository) ||",
    );
    expect(checkoutStep.with.repository).toBe(
      "${{ github.event.workflow_run.head_repository.full_name }}",
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
