import { Testing } from "../../src";
import { GitHub } from "../../src/github";
import { GithubWorkflow } from "../../src/github/workflows";
import { Project } from "../../src/project";

describe("github-workflow", () => {
  const workflowName = "test-workflow";

  test("Default concurrency allowed", () => {
    const project = new Project({ name: "my-project" });
    const github = new GitHub(project);

    new GithubWorkflow(github, workflowName);

    const snapshot = Testing.synth(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).not.toContain(
      "concurrency"
    );
  });

  test("concurrency set", () => {
    const project = new Project({ name: "my-project" });
    const github = new GitHub(project);

    const concurrencyName = "my-concurrency";
    new GithubWorkflow(github, workflowName, {
      concurrency: concurrencyName,
    });

    const snapshot = Testing.synth(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).toContain(
      `concurrency: ${concurrencyName}`
    );
  });
});
