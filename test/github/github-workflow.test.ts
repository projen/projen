import { Project } from "../../src";
import { GitHub } from "../../src/github";
import { GithubWorkflow } from "../../src/github/workflows";
import { synthSnapshot } from "../util";

describe("github-workflow", () => {
  const workflowName = "test-workflow";

  test("Default concurrency allowed", () => {
    const project = new Project({ name: "test-project" });
    new GitHub(project);

    new GithubWorkflow(project, workflowName);

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).not.toContain(
      "concurrency"
    );
  });

  test("concurrency set", () => {
    const concurrencyName = "my-concurrency";
    const project = new Project({ name: "test-project" });
    new GitHub(project);

    new GithubWorkflow(project, workflowName, {
      concurrency: concurrencyName,
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).toContain(
      `concurrency: ${concurrencyName}`
    );
  });
});
