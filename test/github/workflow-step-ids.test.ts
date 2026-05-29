import { GithubWorkflow } from "../../src/github/workflows";
import type { Job } from "../../src/github/workflows-model";
import { JobPermission } from "../../src/github/workflows-model";
import { synthSnapshot, TestProject } from "../util";

/**
 * These tests cover the ID assignment logic in assignStepIds().
 *
 * Key invariants:
 * - Every step gets an id assigned eagerly when addJob is called.
 * - Explicit IDs are never renamed (they may be referenced elsewhere).
 * - Duplicate explicit IDs in the same job are a user error and should throw.
 * - Derived/auto IDs are disambiguated around explicit IDs with _2, _3, etc.
 * - A user can always find any step by its id via getStep().
 */

describe("step id assignment", () => {
  const workflowName = "id-test";

  test("step with a name gets a snake_case id derived from the name", () => {
    const project = new TestProject();
    const workflow = new GithubWorkflow(project.github!, workflowName);

    workflow.addJob("build", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [{ name: "Install Dependencies", run: "npm ci" }],
    });

    const step = workflow.getStep("build", "install_dependencies");
    expect(step.id).toBe("install_dependencies");
    expect(step.name).toBe("Install Dependencies");
  });

  test("step with no name and no id gets a content-hash id", () => {
    const project = new TestProject();
    const workflow = new GithubWorkflow(project.github!, workflowName);

    workflow.addJob("build", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [{ run: "echo hello" }],
    });

    const job = workflow.getJob("build") as Job;
    const step = job.steps[0];
    expect(step.id).toMatch(/^auto_[a-f0-9]{8}$/);
    // The generated id is addressable via the public step API
    expect(workflow.getStep("build", step.id!).run).toBe("echo hello");
  });

  test("duplicate name-derived ids get _2, _3 suffixes", () => {
    const project = new TestProject();
    const workflow = new GithubWorkflow(project.github!, workflowName);

    workflow.addJob("build", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [
        { name: "Run Tests", run: "npm test -- --unit" },
        { name: "Run Tests", run: "npm test -- --integration" },
        { name: "Run Tests", run: "npm test -- --e2e" },
      ],
    });

    expect(workflow.getStep("build", "run_tests").run).toBe(
      "npm test -- --unit",
    );
    expect(workflow.getStep("build", "run_tests_2").run).toBe(
      "npm test -- --integration",
    );
    expect(workflow.getStep("build", "run_tests_3").run).toBe(
      "npm test -- --e2e",
    );
  });

  test("duplicate content-hash ids get _2 suffix", () => {
    const project = new TestProject();
    const workflow = new GithubWorkflow(project.github!, workflowName);

    workflow.addJob("build", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [{ run: "echo hello" }, { run: "echo hello" }],
    });

    const job = workflow.getJob("build") as Job;
    expect(job.steps[0].id).toMatch(/^auto_[a-f0-9]{8}$/);
    expect(job.steps[1].id).toMatch(/^auto_[a-f0-9]{8}_2$/);
  });

  test("all steps are referenceable by id via getStep immediately after addJob", () => {
    const project = new TestProject();
    const workflow = new GithubWorkflow(project.github!, workflowName);

    workflow.addJob("build", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [
        { id: "explicit", name: "Explicit Step", run: "echo explicit" },
        { name: "Named Step", run: "echo named" },
        { run: "echo anonymous" },
      ],
    });

    const job = workflow.getJob("build") as Job;

    // Every step should have an id, and each should be addressable via getStep
    for (const step of job.steps) {
      expect(step.id).toBeDefined();
      expect(step.id).not.toBe("");
      expect(workflow.getStep("build", step.id!)).toBeDefined();
    }

    expect(workflow.getStep("build", "explicit").run).toBe("echo explicit");
    expect(workflow.getStep("build", "named_step").run).toBe("echo named");
  });
});

describe("duplicate step id disambiguation", () => {
  const workflowName = "dedup-test";

  test("duplicate explicit ids throw an error", () => {
    const project = new TestProject();
    const workflow = new GithubWorkflow(project.github!, workflowName);

    // Duplicate explicit IDs are a user error — addJob should throw
    expect(() =>
      workflow.addJob("build", {
        runsOn: ["ubuntu-latest"],
        permissions: {},
        steps: [
          { id: "setup", name: "Setup A", run: "echo a" },
          { id: "setup", name: "Setup B", run: "echo b" },
        ],
      }),
    ).toThrow(/duplicate.*step.*id.*setup/i);
  });

  test("explicit id is preserved when a name-derived id would collide", () => {
    const project = new TestProject();
    const workflow = new GithubWorkflow(project.github!, workflowName);

    // The explicit id "checkout" is reserved; the name-derived "Checkout"
    // must get a suffix instead of claiming the base id
    workflow.addJob("build", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [
        { id: "checkout", run: "git checkout main" },
        { name: "Checkout", run: "git checkout dev" },
      ],
    });

    // User can find their explicit-id step via the public API
    expect(workflow.getStep("build", "checkout").run).toBe("git checkout main");

    // Synth succeeds without error (no collision)
    expect(() => synthSnapshot(project)).not.toThrow();
  });

  test("explicit id is preserved even when it appears after the colliding name", () => {
    const project = new TestProject();
    const workflow = new GithubWorkflow(project.github!, workflowName);

    // The derived id from "Checkout" would normally claim "checkout",
    // but the explicit id on the second step must be reserved first
    workflow.addJob("build", {
      runsOn: ["ubuntu-latest"],
      permissions: {},
      steps: [
        { name: "Checkout", run: "git checkout dev" },
        { id: "checkout", run: "git checkout main" },
      ],
    });

    // User can still find their explicit-id step via the public API
    expect(workflow.getStep("build", "checkout").run).toBe("git checkout main");

    // Synth succeeds without error (no collision)
    expect(() => synthSnapshot(project)).not.toThrow();
  });
});

describe("step id reference integrity", () => {
  const workflowName = "ref-test";

  test("job outputs can reference explicit step ids even when names collide", () => {
    // Simulates a real projenrc: user defines a step with an explicit id,
    // references it in job outputs, and expects the reference to remain
    // valid even when another step's name would derive the same id.
    const project = new TestProject();
    const workflow = new GithubWorkflow(project.github!, workflowName);

    const STEP_ID = "check_result";

    workflow.addJob("build", {
      runsOn: ["ubuntu-latest"],
      permissions: { contents: JobPermission.READ },
      steps: [
        // This step's name would derive "check_result", colliding with the
        // explicit id below — but should NOT steal it
        { name: "Check Result", run: 'echo "result=ok" >> $GITHUB_OUTPUT' },
        {
          id: STEP_ID,
          name: "Final Check",
          run: 'echo "status=done" >> $GITHUB_OUTPUT',
        },
      ],
      outputs: {
        status: {
          stepId: STEP_ID,
          outputName: "status",
        },
      },
    });

    // The user can look up their step by its explicit id
    const step = workflow.getStep("build", STEP_ID);
    expect(step.name).toBe("Final Check");

    // The job outputs reference the same stepId the user set
    const job = workflow.getJob("build") as Job;
    expect(job.outputs!.status.stepId).toBe(STEP_ID);

    // Synthesis succeeds — the explicit id is preserved through rendering,
    // so the output expression ${{ steps.check_result.outputs.status }}
    // resolves to the correct step.
    expect(() => synthSnapshot(project)).not.toThrow();
  });

  test("inline if expressions can reference explicit step ids even when names collide", () => {
    // Simulates the WorkflowActions.uploadGitPatch pattern: a step with an
    // explicit id sets outputs, and a later step references it in an `if`.
    const project = new TestProject();
    const workflow = new GithubWorkflow(project.github!, workflowName);

    const STEP_ID = "find_mutations";

    workflow.addJob("release", {
      runsOn: ["ubuntu-latest"],
      permissions: { contents: JobPermission.WRITE },
      steps: [
        // This step's name would derive "find_mutations", colliding with
        // the explicit id below
        { name: "Find Mutations", run: "echo first" },
        {
          id: STEP_ID,
          name: "Check for mutations",
          run: [
            "git add .",
            'git diff --staged --patch --exit-code > .repo.patch || echo "self_mutation_happened=true" >> $GITHUB_OUTPUT',
          ].join("\n"),
        },
        {
          name: "Upload patch",
          if: `steps.${STEP_ID}.outputs.self_mutation_happened`,
          run: "echo uploading",
        },
      ],
    });

    // The user can find their explicit-id step and the step that references it
    const producer = workflow.getStep("release", STEP_ID);
    expect(producer.name).toBe("Check for mutations");

    const consumer = workflow.getStep("release", "upload_patch");
    expect(consumer.if).toContain(`steps.${STEP_ID}.outputs`);

    // Synthesis succeeds — the explicit id is preserved, so the `if`
    // expression resolves to the correct step.
    expect(() => synthSnapshot(project)).not.toThrow();
  });
});
