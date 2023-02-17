import { TaskWorkflow } from "../../src/github/task-workflow";
import { Task } from "../../src/task";
import { synthSnapshot, TestProject } from "../util";

describe("task-workflow", () => {
  test("default", () => {
    const project = new TestProject();

    new TaskWorkflow(project.github!, {
      name: "task-workflow",
      task,
      permissions: {},
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[".github/workflows/task-workflow.yml"]).toBeDefined();
    expect(snapshot[".github/workflows/task-workflow.yml"]).toMatchSnapshot();
  });

  test("upload artifacts", () => {
    const project = new TestProject();

    new TaskWorkflow(project.github!, {
      name: "task-workflow",
      task,
      artifactsDirectory: "./artifacts/",
      permissions: {},
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[".github/workflows/task-workflow.yml"]).toMatchSnapshot();
  });

  test("issue comment error", () => {
    const project = new TestProject();

    expect(
      () =>
        new TaskWorkflow(project.github!, {
          name: "task-workflow",
          task,
          triggers: {
            issueComment: {},
          },
          permissions: {},
        })
    ).toThrow(
      /Trigger \"issueComment\" should not be used due to a security concern/
    );
  });

  test("with custom runner", () => {
    const project = new TestProject();

    new TaskWorkflow(project.github!, {
      name: "task-workflow",
      task,
      permissions: {},
      runsOn: ["self-hosted"],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[".github/workflows/task-workflow.yml"]).toContain(
      "runs-on: self-hosted"
    );
  });

  test("enabling LFS on a GitHub repo adds the lfs property to workflows", () => {
    const project = new TestProject({
      githubOptions: {
        lfsPatterns: ["*.bin"],
      },
    });

    new TaskWorkflow(project.github!, {
      name: "task-workflow",
      task,
      permissions: {},
    });

    const snapshot = synthSnapshot(project);

    // LFS is enabled in the workflows
    expect(snapshot[".github/workflows/task-workflow.yml"]).toContain(
      "lfs: true"
    );
    expect(snapshot[".gitattributes"]).toContain("*.bin filter=lfs");
  });

  test("with custom runner, multiple labels", () => {
    const project = new TestProject();

    new TaskWorkflow(project.github!, {
      name: "task-workflow",
      task,
      permissions: {},
      runsOn: ["self-hosted", "ubuntu-18.04"],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[".github/workflows/task-workflow.yml"]).toMatch(
      /runs-on:\n\s+- self-hosted\n\s+- ubuntu-18\.04/m
    );
  });
});

const task = new Task("gh-workflow-test", {
  description: "Task GitHub workflow test",
});
