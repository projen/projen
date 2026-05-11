import type { Project } from "../../src/project";
import { synthSnapshot, TestProject } from "../util";

test("no workflow", () => {
  // GIVEN
  const p = new TestProject({
    githubOptions: {
      workflows: false,
    },
  });

  // THEN
  const workflows = synthWorkflows(p);
  expect(Object.keys(workflows).length).toEqual(0);
});

test("adding empty workflow", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.github?.addWorkflow("my-workflow");

  // THEN
  const workflows = synthWorkflows(p);
  expect(workflows[".github/workflows/my-workflow.yml"]).toMatchSnapshot();
});

test("setting runName", () => {
  // GIVEN
  const p = new TestProject();
  const wf = p.github!.addWorkflow("run-name");

  // WHEN
  wf.runName = "This is a custom run-name";

  // THEN
  const workflows = synthWorkflows(p);
  expect(workflows[".github/workflows/run-name.yml"]).toMatchSnapshot();
});

test("workflow triggers", () => {
  // GIVEN
  const p = new TestProject();
  const wf = p.github!.addWorkflow("triggers");

  // WHEN
  wf.on({
    schedule: [{ cron: "5 4 * * *" }],
    workflowDispatch: {},
    repositoryDispatch: {},
    workflowCall: {},
    branchProtectionRule: {},
    checkRun: {},
    checkSuite: {},
    create: {},
    delete: {},
    deployment: {},
    deploymentStatus: {},
    discussion: {},
    discussionComment: {},
    fork: {},
    gollum: {},
    issueComment: {},
    issues: {},
    label: {},
    mergeGroup: {
      branches: ["main"],
    },
    milestone: {},
    pageBuild: {},
    pullRequest: {},
    pullRequestReview: {},
    pullRequestReviewComment: {},
    pullRequestTarget: {},
    push: {},
    registryPackage: {},
    release: {},
    status: {},
    watch: {},
    workflowRun: {},
  });

  // THEN
  const workflows = synthWorkflows(p);
  expect(workflows[".github/workflows/triggers.yml"]).toMatchSnapshot();
});

test("throws when adding workflow with existing name", () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });

  // THEN
  expect(() => p.github?.addWorkflow("stale")).toThrow(
    /There is already a Construct with name 'GithubWorkflow#stale' in TestProject/,
  );
});

test("tryFind valid workflow", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.github?.addWorkflow("workflow1");
  p.github?.addWorkflow("workflow2");
  const workflow1 = p.github?.tryFindWorkflow("workflow1");

  // THEN
  const workflows = synthWorkflows(p);
  expect(workflows[".github/workflows/workflow1.yml"]).toBeDefined();
  expect(workflows[".github/workflows/workflow2.yml"]).toBeDefined();
  expect(workflow1).toBeDefined();
  expect(workflow1?.name).toEqual("workflow1");
});

test("tryFind unknown workflow", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.github?.addWorkflow("workflow1");
  p.github?.addWorkflow("workflow2");
  const workflow3 = p.github?.tryFindWorkflow("workflow3");

  // THEN
  const workflows = synthWorkflows(p);
  expect(workflows[".github/workflows/workflow1.yml"]).toBeDefined();
  expect(workflows[".github/workflows/workflow2.yml"]).toBeDefined();
  expect(workflow3).toBeUndefined();
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

describe("setupTools", () => {
  test("all tools default cache to false", () => {
    const p = new TestProject();
    const wf = p.github!.addWorkflow("test-tools");
    wf.addJob("job", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      tools: {
        java: { version: "11" },
        python: { version: "3.x" },
        go: { version: "^1.18.0" },
        dotnet: { version: "6.x" },
        node: { version: "18.x" },
      },
      steps: [{ run: "echo hello" }],
    });

    const workflows = synthWorkflows(p);
    const content = workflows[".github/workflows/test-tools.yml"];
    expect(content).toMatchSnapshot();
  });

  test("tools can enable cache", () => {
    const p = new TestProject();
    const wf = p.github!.addWorkflow("test-tools");
    wf.addJob("job", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      tools: {
        java: { version: "11", cache: true, packageManager: "maven" },
        go: { version: "^1.18.0", cache: true },
        dotnet: { version: "6.x", cache: true },
        node: { version: "18.x", cache: true },
      },
      steps: [{ run: "echo hello" }],
    });

    const workflows = synthWorkflows(p);
    const content = workflows[".github/workflows/test-tools.yml"];
    expect(content).toMatchSnapshot();
  });

  test("python cache requires packageManager", () => {
    const p = new TestProject();
    const wf = p.github!.addWorkflow("test-tools");
    wf.addJob("job", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      tools: {
        python: { version: "3.x", cache: true },
      },
      steps: [{ run: "echo hello" }],
    });

    expect(() => synthWorkflows(p)).toThrow(
      "python.packageManager is required when python.cache is true",
    );
  });

  test("python cache with packageManager", () => {
    const p = new TestProject();
    const wf = p.github!.addWorkflow("test-tools");
    wf.addJob("job", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      tools: {
        python: { version: "3.x", cache: true, packageManager: "poetry" },
      },
      steps: [{ run: "echo hello" }],
    });

    const workflows = synthWorkflows(p);
    const content = workflows[".github/workflows/test-tools.yml"];
    expect(content).toMatchSnapshot();
  });

  test("java cache requires packageManager", () => {
    const p = new TestProject();
    const wf = p.github!.addWorkflow("test-tools");
    wf.addJob("job", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      tools: {
        java: { version: "11", cache: true },
      },
      steps: [{ run: "echo hello" }],
    });

    expect(() => synthWorkflows(p)).toThrow(
      "java.packageManager is required when java.cache is true",
    );
  });

  test("java custom distribution", () => {
    const p = new TestProject();
    const wf = p.github!.addWorkflow("test-tools");
    wf.addJob("job", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      tools: {
        java: { version: "17", distribution: "temurin" },
      },
      steps: [{ run: "echo hello" }],
    });

    const workflows = synthWorkflows(p);
    const content = workflows[".github/workflows/test-tools.yml"];
    expect(content).toMatchSnapshot();
  });

  test("java defaults to corretto distribution", () => {
    const p = new TestProject();
    const wf = p.github!.addWorkflow("test-tools");
    wf.addJob("job", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      tools: {
        java: { version: "11" },
      },
      steps: [{ run: "echo hello" }],
    });

    const workflows = synthWorkflows(p);
    const content = workflows[".github/workflows/test-tools.yml"];
    expect(content).toContain("distribution: corretto");
  });
});
