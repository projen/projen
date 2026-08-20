import * as YAML from "yaml";
import type { NodeProjectOptions } from "../../src/javascript";
import { NodeProject } from "../../src/javascript";
import { synthSnapshot } from "../util";

/**
 * Tests that `workflowRunsOn` set on the `GitHub` component propagates
 * globally to all workflow-generating components without needing
 * per-component overrides.
 */
describe("global workflowRunsOn propagation", () => {
  describe("workflowRunsOn labels", () => {
    test("propagates to auto-approve workflow", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
        },
        autoApproveOptions: {
          allowedUsernames: ["bot"],
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(
        snapshot[".github/workflows/auto-approve.yml"],
      );

      expect(workflow.jobs.approve["runs-on"]).toEqual("self-hosted");
    });

    test("propagates to stale workflow", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
        },
        stale: true,
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(snapshot[".github/workflows/stale.yml"]);

      expect(workflow.jobs.stale["runs-on"]).toEqual("self-hosted");
    });

    test("propagates to pull-request-lint workflow", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
          pullRequestLint: true,
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(
        snapshot[".github/workflows/pull-request-lint.yml"],
      );

      expect(workflow.jobs.validate["runs-on"]).toEqual("self-hosted");
    });

    test("propagates to dependency-review workflow", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
          dependencyReview: true,
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(
        snapshot[".github/workflows/dependency-review.yml"],
      );

      expect(workflow.jobs["dependency-review"]["runs-on"]).toEqual(
        "self-hosted",
      );
    });

    test("propagates to auto-queue workflow", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
          mergify: false,
          mergeQueue: true,
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(snapshot[".github/workflows/auto-queue.yml"]);

      expect(workflow.jobs.enableAutoQueue["runs-on"]).toEqual("self-hosted");
    });

    test("propagates to backport workflow", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
          pullRequestBackport: true,
          pullRequestBackportOptions: {
            branches: ["main"],
          },
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(snapshot[".github/workflows/backport.yml"]);

      expect(workflow.jobs.backport["runs-on"]).toEqual("self-hosted");
    });

    test("propagates to upgrade workflow", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
        },
        depsUpgrade: true,
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(
        snapshot[".github/workflows/upgrade-main.yml"],
      );

      expect(workflow.jobs.upgrade["runs-on"]).toEqual("self-hosted");
      expect(workflow.jobs.pr["runs-on"]).toEqual("self-hosted");
    });

    test("propagates to build workflow", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(snapshot[".github/workflows/build.yml"]);

      expect(workflow.jobs.build["runs-on"]).toEqual("self-hosted");
    });

    test("propagates to release workflow", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(snapshot[".github/workflows/release.yml"]);

      expect(workflow.jobs.release["runs-on"]).toEqual("self-hosted");
    });

    test("propagates multiple labels to all workflows", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted", "linux", "x64"],
        },
        autoApproveOptions: {
          allowedUsernames: ["bot"],
        },
        stale: true,
      });

      const snapshot = synthSnapshot(project);
      const build = YAML.parse(snapshot[".github/workflows/build.yml"]);
      const approve = YAML.parse(
        snapshot[".github/workflows/auto-approve.yml"],
      );
      const stale = YAML.parse(snapshot[".github/workflows/stale.yml"]);

      const expected = ["self-hosted", "linux", "x64"];
      expect(build.jobs.build["runs-on"]).toEqual(expected);
      expect(approve.jobs.approve["runs-on"]).toEqual(expected);
      expect(stale.jobs.stale["runs-on"]).toEqual(expected);
    });
  });

  describe("workflowRunsOnGroup", () => {
    test("propagates runner group to auto-approve workflow", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOnGroup: {
            group: "Default",
            labels: ["self-hosted", "linux", "x64"],
          },
        },
        autoApproveOptions: {
          allowedUsernames: ["bot"],
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(
        snapshot[".github/workflows/auto-approve.yml"],
      );

      expect(workflow.jobs.approve["runs-on"]).toEqual({
        group: "Default",
        labels: ["self-hosted", "linux", "x64"],
      });
    });

    test("propagates runner group to stale workflow", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOnGroup: {
            group: "Default",
            labels: ["self-hosted", "linux"],
          },
        },
        stale: true,
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(snapshot[".github/workflows/stale.yml"]);

      expect(workflow.jobs.stale["runs-on"]).toEqual({
        group: "Default",
        labels: ["self-hosted", "linux"],
      });
    });

    test("propagates runner group to upgrade workflow", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOnGroup: {
            group: "Default",
            labels: ["self-hosted", "linux"],
          },
        },
        depsUpgrade: true,
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(
        snapshot[".github/workflows/upgrade-main.yml"],
      );

      expect(workflow.jobs.upgrade["runs-on"]).toEqual({
        group: "Default",
        labels: ["self-hosted", "linux"],
      });
      expect(workflow.jobs.pr["runs-on"]).toEqual({
        group: "Default",
        labels: ["self-hosted", "linux"],
      });
    });
  });

  describe("per-component override takes precedence", () => {
    test("auto-approve runsOn overrides global workflowRunsOn", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
        },
        autoApproveOptions: {
          allowedUsernames: ["bot"],
          runsOn: ["custom-runner"],
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(
        snapshot[".github/workflows/auto-approve.yml"],
      );

      expect(workflow.jobs.approve["runs-on"]).toEqual("custom-runner");
    });

    test("stale runsOn overrides global workflowRunsOn", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
        },
        stale: true,
        staleOptions: {
          runsOn: ["custom-runner"],
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(snapshot[".github/workflows/stale.yml"]);

      expect(workflow.jobs.stale["runs-on"]).toEqual("custom-runner");
    });

    test("upgrade workflowOptions.runsOn overrides global workflowRunsOn", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
        },
        depsUpgrade: true,
        depsUpgradeOptions: {
          workflowOptions: {
            runsOn: ["custom-runner"],
          },
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(
        snapshot[".github/workflows/upgrade-main.yml"],
      );

      expect(workflow.jobs.upgrade["runs-on"]).toEqual("custom-runner");
      expect(workflow.jobs.pr["runs-on"]).toEqual("custom-runner");
    });

    test("buildWorkflowOptions.runsOn overrides global workflowRunsOn", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
        },
        buildWorkflowOptions: {
          runsOn: ["custom-runner"],
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(snapshot[".github/workflows/build.yml"]);

      expect(workflow.jobs.build["runs-on"]).toEqual("custom-runner");
    });

    test("pull-request-lint runsOn overrides global workflowRunsOn", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
          pullRequestLint: true,
          pullRequestLintOptions: {
            runsOn: ["custom-runner"],
          },
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(
        snapshot[".github/workflows/pull-request-lint.yml"],
      );

      expect(workflow.jobs.validate["runs-on"]).toEqual("custom-runner");
    });

    test("dependency-review runsOn overrides global workflowRunsOn", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
          dependencyReview: true,
          dependencyReviewOptions: {
            runsOn: ["custom-runner"],
          },
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(
        snapshot[".github/workflows/dependency-review.yml"],
      );

      expect(workflow.jobs["dependency-review"]["runs-on"]).toEqual(
        "custom-runner",
      );
    });

    test("auto-queue runsOn overrides global workflowRunsOn", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
          mergify: false,
          mergeQueue: true,
          mergeQueueOptions: {
            autoQueueOptions: {
              runsOn: ["custom-runner"],
            },
          },
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(snapshot[".github/workflows/auto-queue.yml"]);

      expect(workflow.jobs.enableAutoQueue["runs-on"]).toEqual("custom-runner");
    });

    test("backport runsOn overrides global workflowRunsOn", () => {
      const project = createProject({
        githubOptions: {
          workflowRunsOn: ["self-hosted"],
          pullRequestBackport: true,
          pullRequestBackportOptions: {
            branches: ["main"],
            runsOn: ["custom-runner"],
          },
        },
      });

      const snapshot = synthSnapshot(project);
      const workflow = YAML.parse(snapshot[".github/workflows/backport.yml"]);

      expect(workflow.jobs.backport["runs-on"]).toEqual("custom-runner");
    });
  });
});

type ProjectOptions = Omit<
  NodeProjectOptions,
  "outdir" | "defaultReleaseBranch" | "name"
>;
function createProject(options: ProjectOptions = {}): NodeProject {
  return new NodeProject({
    defaultReleaseBranch: "main",
    name: "test-project",
    ...options,
  });
}
