import { GithubWorkflow } from "../../src/github/workflows";
import { synthSnapshot, TestProject } from "../util";

describe("github-workflow", () => {
  const workflowName = "test-workflow";

  test("Default concurrency allowed", () => {
    const project = new TestProject();

    new GithubWorkflow(project.github!, workflowName);

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).not.toContain(
      "concurrency"
    );
  });

  test("concurrency set", () => {
    const concurrencyName = "my-concurrency";
    const project = new TestProject();

    new GithubWorkflow(project.github!, workflowName, {
      concurrency: concurrencyName,
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).toContain(
      `concurrency: ${concurrencyName}`
    );
  });

  test("workflow job calling a reusable workflow", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const workflow = new GithubWorkflow(project.github!, workflowName);

    workflow.addJob("call-another-workflow", {
      name: "Some reusable workflow",
      uses: "some-user/example-action.yaml@v1",
      permissions: {},
      with: {
        foo: true,
        bar: "example",
      },
      secrets: {
        credentials: "super-secret",
      },
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).toMatchSnapshot();
  });

  test("workflow job calling a reusable workflow & inherited secrets", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const workflow = new GithubWorkflow(project.github!, workflowName);

    workflow.addJob("call-another-workflow", {
      name: "Some reusable workflow",
      uses: "some-user/example-action.yaml@v1",
      permissions: {},
      secrets: "inherit",
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).toMatchSnapshot();
  });

  test("working-directory can be set on a Step", () => {
    const project = new TestProject();

    const ghw = new GithubWorkflow(project.github!, workflowName);
    ghw.addJob("working-dir", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [{ run: "ls", workingDirectory: ".github/workflows" }],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).toMatchSnapshot();
  });
});
