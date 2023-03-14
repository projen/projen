import * as YAML from "yaml";
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

  test("workflow job calling a reusable workflow with a strategy matrix", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const workflow = new GithubWorkflow(project.github!, workflowName);

    workflow.addJob("use-a-matrix", {
      name: "Some reusable workflow",
      uses: "some-user/example-action.yaml@v1",
      permissions: {},
      secrets: "inherit",
      strategy: {
        matrix: {
          domain: {
            fruit: ["apple", "orange", "banana"],
          },
        },
      },
      with: {
        fruit: "${{ matrix.fruit }}",
      },
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).toMatchSnapshot();
  });

  test("workflow job can be removed after creation", () => {
    const project = new TestProject();

    const workflow = new GithubWorkflow(project.github!, workflowName);
    workflow.addJob("working-dir", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [{ uses: "actions/checkout@v3" }],
    });
    workflow.removeJob("working-dir");

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).toMatchSnapshot();

    const workflowYAML = YAML.parse(
      snapshot[`.github/workflows/${workflowName}.yml`]
    );
    expect(workflowYAML.jobs["working-dir"]).toBeUndefined();
  });

  test("workflow job can be updated after creation", () => {
    const project = new TestProject();

    const workflow = new GithubWorkflow(project.github!, workflowName);
    workflow.addJob("working-dir", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [{ uses: "actions/checkout@v3" }],
    });
    workflow.updateJob("working-dir", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [{ uses: "actions/checkout@v2" }],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).toMatchSnapshot();
    const workflowYAML = YAML.parse(
      snapshot[`.github/workflows/${workflowName}.yml`]
    );
    expect(workflowYAML.jobs["working-dir"].steps[0].uses).toEqual(
      "actions/checkout@v2"
    );
  });

  describe("reusable actions", () => {
    test("can use an action on a step", () => {
      const project = new TestProject();

      const ghw = new GithubWorkflow(project.github!, workflowName);
      ghw.addJob("working-dir", {
        runsOn: ["ubuntu-latest"],
        permissions: {},
        steps: [{ uses: "actions/checkout@v3" }],
      });

      const snapshot = synthSnapshot(project);

      expect(
        snapshot[`.github/workflows/${workflowName}.yml`]
      ).toMatchSnapshot();
    });

    test("can override the action used in a step", () => {
      const project = new TestProject();

      const ghw = new GithubWorkflow(project.github!, workflowName);
      ghw.addJob("working-dir", {
        runsOn: ["ubuntu-latest"],
        permissions: {},
        steps: [{ uses: "actions/checkout@v3" }],
      });

      project.github?.actions.set(
        "actions/checkout@v3",
        "replacement/checkout"
      );

      const snapshot = synthSnapshot(project);
      const wf = snapshot[`.github/workflows/${workflowName}.yml`];

      expect(wf).not.toContain("actions/checkout@v3");
      expect(wf).toContain("replacement/checkout");
    });

    test("can override action without explicitly defining version", () => {
      const project = new TestProject();

      const ghw = new GithubWorkflow(project.github!, workflowName);
      ghw.addJob("working-dir", {
        runsOn: ["ubuntu-latest"],
        permissions: {},
        steps: [{ uses: "actions/checkout@v3" }],
      });

      project.github?.actions.set("actions/checkout", "replacement/checkout");

      const snapshot = synthSnapshot(project);
      const wf = snapshot[`.github/workflows/${workflowName}.yml`];

      expect(wf).not.toContain("actions/checkout@v3");
      expect(wf).toContain("replacement/checkout");
    });

    test("can override multiple versions and the default", () => {
      const project = new TestProject();

      const ghw = new GithubWorkflow(project.github!, workflowName);
      ghw.addJob("working-dir", {
        runsOn: ["ubuntu-latest"],
        permissions: {},
        steps: [
          { uses: "actions/checkout@v2" },
          { uses: "actions/checkout@v3" },
        ],
      });

      project.github?.actions.set(
        "actions/checkout@v2",
        "actions/checkout@explicit-v2"
      );
      project.github?.actions.set(
        "actions/checkout",
        "actions/checkout@generic-override"
      );

      const snapshot = synthSnapshot(project);
      const wf = snapshot[`.github/workflows/${workflowName}.yml`];

      expect(wf).toMatchSnapshot();
      expect(wf).not.toContain("actions/checkout@v2");
      expect(wf).not.toContain("actions/checkout@v3");
      expect(wf).toContain("actions/checkout@explicit-v2");
      expect(wf).toContain("actions/checkout@generic-override");
    });
  });
});
