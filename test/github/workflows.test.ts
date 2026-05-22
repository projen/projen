import * as YAML from "yaml";
import type { JobStep } from "../../src/github/workflows-model";
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

/**
 * Creates a workflow with a job containing the given steps.
 * Returns the workflow so step mutation methods can be tested.
 */
function createWorkflowWithSteps(steps: JobStep[]) {
  const p = new TestProject();
  const wf = p.github!.addWorkflow("test-wf");
  wf.addJob("build", {
    runsOn: ["ubuntu-latest"],
    permissions: {},
    steps: steps.map((s) => ({ ...s })),
  });
  return { p, wf };
}

function synthSteps(p: Project): any[] {
  const snapshot = synthSnapshot(p);
  const wf = YAML.parse(snapshot[".github/workflows/test-wf.yml"]);
  return wf.jobs.build.steps;
}

const SAMPLE_STEPS: JobStep[] = [
  { id: "checkout", name: "Checkout", uses: "actions/checkout@v6" },
  {
    id: "setup_node",
    name: "Setup Node",
    uses: "actions/setup-node@v6",
    with: { "node-version": "22.x" },
  },
  { id: "install", name: "Install dependencies", run: "npm ci" },
  {
    id: "test",
    name: "Run tests",
    run: "npx jest --coverage",
    env: { CI: "true" },
  },
];

describe("step mutation API", () => {
  describe("getStep", () => {
    test("returns step by id", () => {
      const { wf } = createWorkflowWithSteps(SAMPLE_STEPS);
      const step = wf.getStep("build", "setup_node");
      expect(step.id).toBe("setup_node");
      expect(step.name).toBe("Setup Node");
      expect(step.uses).toBe("actions/setup-node@v6");
    });

    test("returns step by name when id does not match", () => {
      const { wf } = createWorkflowWithSteps([
        { name: "Checkout", uses: "actions/checkout@v6" },
        { id: "install", name: "Install", run: "npm ci" },
      ]);
      const step = wf.getStep("build", "Checkout");
      expect(step.name).toBe("Checkout");
    });

    test("id takes priority over name", () => {
      const { wf } = createWorkflowWithSteps([
        { id: "Checkout", name: "Something else", run: "echo id-match" },
        { name: "Checkout", uses: "actions/checkout@v6" },
      ]);
      const step = wf.getStep("build", "Checkout");
      expect(step.run).toBe("echo id-match");
    });

    test("returned step is frozen", () => {
      const { wf } = createWorkflowWithSteps(SAMPLE_STEPS);
      const step = wf.getStep("build", "checkout");
      expect(() => {
        (step as any).name = "mutated";
      }).toThrow();
    });

    test("throws for missing step", () => {
      const { wf } = createWorkflowWithSteps(SAMPLE_STEPS);
      expect(() => wf.getStep("build", "nonexistent")).toThrow(
        /Step "nonexistent" not found in job "build"/,
      );
    });

    test("throws for missing job", () => {
      const { wf } = createWorkflowWithSteps(SAMPLE_STEPS);
      expect(() => wf.getStep("deploy", "checkout")).toThrow(
        /Job "deploy" not found in workflow "test-wf"/,
      );
    });

    test("throws for reusable workflow job", () => {
      const p = new TestProject();
      const wf = p.github!.addWorkflow("test-wf");
      wf.addJob("reusable", {
        permissions: {},
        uses: "org/repo/.github/workflows/reusable.yml@main",
      });
      expect(() => wf.getStep("reusable", "checkout")).toThrow(
        /Job "reusable" is a reusable workflow call and does not have steps/,
      );
    });

    test("throws for ambiguous name match", () => {
      const { wf } = createWorkflowWithSteps([
        { name: "Run", run: "echo a" },
        { name: "Run", run: "echo b" },
      ]);
      expect(() => wf.getStep("build", "Run")).toThrow(
        /Multiple steps match name "Run" in job "build"/,
      );
    });
  });

  describe("appendStep", () => {
    test("appends step to end", () => {
      const { wf, p } = createWorkflowWithSteps(SAMPLE_STEPS);
      wf.appendStep("build", { id: "lint", name: "Lint", run: "npx eslint" });

      const steps = synthSteps(p);
      expect(steps).toHaveLength(5);
      expect(steps[4].id).toBe("lint");
    });

    test("throws on duplicate id", () => {
      const { wf } = createWorkflowWithSteps(SAMPLE_STEPS);
      expect(() =>
        wf.appendStep("build", { id: "checkout", name: "Dup", run: "echo" }),
      ).toThrow(/Step ID "checkout" already exists in job "build"/);
    });

    test("throws when id not set", () => {
      const { wf } = createWorkflowWithSteps(SAMPLE_STEPS);
      expect(() =>
        wf.appendStep("build", { name: "No ID", run: "echo" }),
      ).toThrow(/Step must have an "id"/);
    });
  });

  describe("replaceStep", () => {
    test("replaces in-place preserving position", () => {
      const { wf, p } = createWorkflowWithSteps(SAMPLE_STEPS);
      wf.replaceStep("build", "setup_node", {
        id: "setup_node",
        name: "Setup Node Custom",
        uses: "actions/setup-node@v6",
        with: {
          "node-version": "20.x",
          "registry-url": "https://registry.example.com",
        },
      });

      const steps = synthSteps(p);
      expect(steps).toHaveLength(4);
      expect(steps[1].id).toBe("setup_node");
      expect(steps[1].name).toBe("Setup Node Custom");
      expect(steps[1].with["node-version"]).toBe("20.x");
    });

    test("defaults id to original when omitted", () => {
      const { wf, p } = createWorkflowWithSteps(SAMPLE_STEPS);
      wf.replaceStep("build", "install", {
        name: "Install Custom",
        run: "yarn install --frozen-lockfile",
      });

      const steps = synthSteps(p);
      expect(steps[2].id).toBe("install");
      expect(steps[2].run).toBe("yarn install --frozen-lockfile");
    });

    test("can target step by name", () => {
      const { wf } = createWorkflowWithSteps([
        { name: "Checkout", uses: "actions/checkout@v6" },
        { id: "install", name: "Install", run: "npm ci" },
      ]);
      wf.replaceStep("build", "Checkout", {
        id: "checkout",
        name: "Checkout",
        uses: "actions/checkout@v6",
        with: { "fetch-depth": "0" },
      });
      const step = wf.getStep("build", "checkout");
      expect(step.with).toEqual({ "fetch-depth": "0" });
    });
  });

  describe("patchStep", () => {
    test("shallow-merges only specified fields", () => {
      const { wf, p } = createWorkflowWithSteps(SAMPLE_STEPS);
      wf.patchStep("build", "setup_node", {
        with: { "node-version": "20.x" },
      });

      const steps = synthSteps(p);
      expect(steps[1].id).toBe("setup_node");
      expect(steps[1].name).toBe("Setup Node");
      expect(steps[1].uses).toBe("actions/setup-node@v6");
      expect(steps[1].with["node-version"]).toBe("20.x");
    });

    test("preserves position", () => {
      const { wf, p } = createWorkflowWithSteps(SAMPLE_STEPS);
      wf.patchStep("build", "install", { run: "yarn install" });

      const steps = synthSteps(p);
      expect(steps[2].run).toBe("yarn install");
      expect(steps[0].id).toBe("checkout");
      expect(steps[3].id).toBe("test");
    });

    test("always preserves original step id", () => {
      const { wf } = createWorkflowWithSteps(SAMPLE_STEPS);
      wf.patchStep("build", "install", { id: "different_id", run: "yarn" });
      const step = wf.getStep("build", "install");
      expect(step.id).toBe("install");
    });

    test("env spreading pattern from issue", () => {
      const { wf, p } = createWorkflowWithSteps(SAMPLE_STEPS);
      const current = wf.getStep("build", "install");
      wf.patchStep("build", "install", {
        env: { ...current.env, NODE_AUTH_TOKEN: "my-token" },
      });

      const steps = synthSteps(p);
      expect(steps[2].env).toEqual({ NODE_AUTH_TOKEN: "my-token" });
    });

    test("run appending pattern from issue", () => {
      const { wf, p } = createWorkflowWithSteps(SAMPLE_STEPS);
      const current = wf.getStep("build", "test");
      wf.patchStep("build", "test", {
        run: `${current.run} --testPathIgnorePatterns "integration/*"`,
      });

      const steps = synthSteps(p);
      expect(steps[3].run).toBe(
        'npx jest --coverage --testPathIgnorePatterns "integration/*"',
      );
    });
  });

  describe("removeStep", () => {
    test("removes by id", () => {
      const { wf, p } = createWorkflowWithSteps(SAMPLE_STEPS);
      wf.removeStep("build", "setup_node");

      const steps = synthSteps(p);
      expect(steps).toHaveLength(3);
      expect(steps.map((s: any) => s.id)).toEqual([
        "checkout",
        "install",
        "test",
      ]);
    });

    test("throws for missing step", () => {
      const { wf } = createWorkflowWithSteps(SAMPLE_STEPS);
      expect(() => wf.removeStep("build", "nonexistent")).toThrow(
        /Step "nonexistent" not found/,
      );
    });
  });

  describe("insertStepBefore", () => {
    test("inserts at correct position", () => {
      const { wf, p } = createWorkflowWithSteps(SAMPLE_STEPS);
      wf.insertStepBefore("build", "install", {
        id: "auth",
        name: "Auth",
        run: "echo auth",
      });

      const steps = synthSteps(p);
      expect(steps).toHaveLength(5);
      expect(steps.map((s: any) => s.id)).toEqual([
        "checkout",
        "setup_node",
        "auth",
        "install",
        "test",
      ]);
    });

    test("throws for missing ref step", () => {
      const { wf } = createWorkflowWithSteps(SAMPLE_STEPS);
      expect(() =>
        wf.insertStepBefore("build", "nonexistent", {
          id: "new",
          run: "echo",
        }),
      ).toThrow(/Step "nonexistent" not found/);
    });

    test("throws on duplicate id", () => {
      const { wf } = createWorkflowWithSteps(SAMPLE_STEPS);
      expect(() =>
        wf.insertStepBefore("build", "install", {
          id: "checkout",
          run: "echo",
        }),
      ).toThrow(/Step ID "checkout" already exists/);
    });

    test("throws when id not set", () => {
      const { wf } = createWorkflowWithSteps(SAMPLE_STEPS);
      expect(() =>
        wf.insertStepBefore("build", "install", { name: "No ID", run: "echo" }),
      ).toThrow(/Step must have an "id"/);
    });
  });

  describe("insertStepAfter", () => {
    test("inserts at correct position", () => {
      const { wf, p } = createWorkflowWithSteps(SAMPLE_STEPS);
      wf.insertStepAfter("build", "setup_node", {
        id: "jfrog",
        name: "Setup JFrog",
        uses: "jfrog/setup-jfrog-cli@v4",
      });

      const steps = synthSteps(p);
      expect(steps).toHaveLength(5);
      expect(steps.map((s: any) => s.id)).toEqual([
        "checkout",
        "setup_node",
        "jfrog",
        "install",
        "test",
      ]);
    });

    test("inserts after last step", () => {
      const { wf, p } = createWorkflowWithSteps(SAMPLE_STEPS);
      wf.insertStepAfter("build", "test", {
        id: "report",
        name: "Upload Report",
        run: "echo report",
      });

      const steps = synthSteps(p);
      expect(steps).toHaveLength(5);
      expect(steps[4].id).toBe("report");
    });

    test("can reference step by name", () => {
      const { wf, p } = createWorkflowWithSteps([
        { name: "Checkout", uses: "actions/checkout@v6" },
        { id: "install", name: "Install", run: "npm ci" },
      ]);
      wf.insertStepAfter("build", "Checkout", {
        id: "setup",
        name: "Setup",
        run: "echo setup",
      });

      const steps = synthSteps(p);
      expect(steps).toHaveLength(3);
      expect(steps[1].id).toBe("setup");
    });
  });
});

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
