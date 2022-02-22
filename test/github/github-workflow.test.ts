import { GitHub } from "../../src/github";
import { GithubWorkflow } from "../../src/github/workflows";
import { synthSnapshot, TestProject } from "../util";

describe("github-workflow", () => {
  const workflowName = "test-workflow";

  test("Default concurrency allowed", () => {
    const project = new TestProject();
    const github = new GitHub(project);

    new GithubWorkflow(github, workflowName);

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).not.toContain(
      "concurrency"
    );
  });

  test("concurrency set", () => {
    const concurrencyName = "my-concurrency";
    const project = new TestProject();
    const github = new GitHub(project);

    new GithubWorkflow(github, workflowName, {
      concurrency: concurrencyName,
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).toContain(
      `concurrency: ${concurrencyName}`
    );
  });
});
