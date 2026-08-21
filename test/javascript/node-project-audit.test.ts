import { NodeProject, NodePackageManager } from "../../src/javascript";
import { synthSnapshot, TestProject } from "../util";

describe("NodeProject audit", () => {
  test("audit is disabled by default", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
    });

    const snapshot = synthSnapshot(project);
    expect(
      JSON.stringify(snapshot["test-project/.projen/tasks.json"]),
    ).not.toContain("audit");
  });

  test("audit can be enabled", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    expect(tasks.tasks.audit).toBeDefined();
    expect(tasks.tasks.audit.description).toBe("Run security audit");
  });

  test("audit uses correct npm command", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      packageManager: NodePackageManager.NPM,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    expect(tasks.tasks.audit.steps[0].execArgs).toEqual([
      "npm",
      "audit",
      "--audit-level=high",
    ]);
  });

  test("audit uses correct yarn classic command", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      packageManager: NodePackageManager.YARN_CLASSIC,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    expect(tasks.tasks.audit.steps[0].execArgs).toEqual([
      "node",
      "-e",
      "const { execSync } = require('child_process'); try { execSync('yarn audit --level high', {stdio: 'inherit'}); } catch(e) { process.exit(e.status < 8 ? 0 : 1); }",
    ]);
  });

  test("audit uses correct yarn berry command", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      packageManager: NodePackageManager.YARN_BERRY,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    expect(tasks.tasks.audit.steps[0].execArgs).toEqual([
      "yarn",
      "npm",
      "audit",
      "--recursive",
      "--severity",
      "high",
    ]);
  });

  test("audit uses correct bun command", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      packageManager: NodePackageManager.BUN,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    expect(tasks.tasks.audit.steps[0].execArgs).toEqual([
      "bun",
      "audit",
      "--audit-level",
      "high",
    ]);
  });

  test("audit uses correct pnpm command", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      packageManager: NodePackageManager.PNPM,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    expect(tasks.tasks.audit.steps[0].execArgs).toEqual([
      "pnpm",
      "audit",
      "--audit-level",
      "high",
    ]);
  });

  test("audit level can be configured", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      auditDepsOptions: { level: "critical" },
      packageManager: NodePackageManager.NPM,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    expect(tasks.tasks.audit.steps[0].execArgs).toEqual([
      "npm",
      "audit",
      "--audit-level=critical",
    ]);
  });

  test("audit can include dev dependencies", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      auditDepsOptions: { prodOnly: false },
      packageManager: NodePackageManager.NPM,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    expect(tasks.tasks.audit.steps[0].execArgs).toEqual([
      "npm",
      "audit",
      "--audit-level=high",
    ]);
  });

  test("audit can exclude dev dependencies", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      auditDepsOptions: { prodOnly: true },
      packageManager: NodePackageManager.NPM,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    expect(tasks.tasks.audit.steps[0].execArgs).toEqual([
      "npm",
      "audit",
      "--audit-level=high",
      "--omit=dev",
    ]);
  });

  test("audit is added to pre-compile task", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    expect(tasks.tasks["pre-compile"].steps).toContainEqual({
      spawn: "audit",
    });
  });

  test("audit with releaseOnly is not added to pre-compile task", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      auditDepsOptions: { runOn: "release" },
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    const preCompileSteps = tasks.tasks["pre-compile"]?.steps || [];

    // Audit task should exist
    expect(tasks.tasks.audit).toBeDefined();
    expect(tasks.tasks.audit.description).toBe("Run security audit");

    // But should not be in pre-compile
    expect(preCompileSteps).not.toContainEqual({
      spawn: "audit",
    });
  });

  test("audit with releaseOnly is added to release task", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      auditDepsOptions: { runOn: "release" },
      release: true,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];

    // Release task should include audit task
    expect(tasks.tasks.release.steps).toContainEqual({
      spawn: "audit",
    });
  });

  test("audit with manual mode creates task but doesn't run automatically", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      auditDepsOptions: { runOn: "manual" },
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    const preCompileSteps = tasks.tasks["pre-compile"]?.steps || [];

    // Audit task should exist
    expect(tasks.tasks.audit).toBeDefined();
    expect(tasks.tasks.audit.description).toBe("Run security audit");

    // But should not be in pre-compile
    expect(preCompileSteps).not.toContainEqual({
      spawn: "audit",
    });
  });

  test("audit with yarn2 uses correct command", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      packageManager: NodePackageManager.YARN2,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    expect(tasks.tasks.audit.steps[0].execArgs).toEqual([
      "yarn",
      "npm",
      "audit",
      "--recursive",
      "--severity",
      "high",
    ]);
  });

  test("audit with yarn uses correct command", () => {
    const project = new TestProject();
    new NodeProject({
      parent: project,
      outdir: "test-project",
      name: "test",
      defaultReleaseBranch: "main",
      auditDeps: true,
      packageManager: NodePackageManager.YARN,
    });

    const snapshot = synthSnapshot(project);
    const tasks = snapshot["test-project/.projen/tasks.json"];
    // yarn classic wraps the command in a node script
    expect(tasks.tasks.audit.steps[0].execArgs[2]).toContain(
      "yarn audit --level high",
    );
  });

  test("audit prodOnly flag works with all package managers", () => {
    const managers: Array<{ manager: NodePackageManager; expected: any }> = [
      {
        manager: NodePackageManager.YARN_CLASSIC,
        // yarn classic wraps the command in a node script
        expected: [
          expect.stringContaining(
            "yarn audit --level high --groups dependencies",
          ),
        ],
      },
      {
        manager: NodePackageManager.YARN_BERRY,
        expected: ["--environment", "production"],
      },
      { manager: NodePackageManager.PNPM, expected: ["--prod"] },
      { manager: NodePackageManager.BUN, expected: ["--production"] },
    ];

    for (const { manager, expected } of managers) {
      const project = new TestProject();
      new NodeProject({
        parent: project,
        outdir: "test-project",
        name: "test",
        defaultReleaseBranch: "main",
        auditDeps: true,
        auditDepsOptions: { prodOnly: true },
        packageManager: manager,
      });

      const snapshot = synthSnapshot(project);
      const tasks = snapshot["test-project/.projen/tasks.json"];
      expect(tasks.tasks.audit.steps[0].execArgs).toEqual(
        expect.arrayContaining(expected),
      );
    }
  });

  test("audit level flags work with all package managers", () => {
    const levels = ["low", "moderate", "critical"];

    for (const level of levels) {
      const project = new TestProject();
      new NodeProject({
        parent: project,
        outdir: "test-project",
        name: "test",
        defaultReleaseBranch: "main",
        auditDeps: true,
        auditDepsOptions: { level: level as any },
        packageManager: NodePackageManager.NPM,
      });

      const snapshot = synthSnapshot(project);
      const tasks = snapshot["test-project/.projen/tasks.json"];
      expect(tasks.tasks.audit.steps[0].execArgs).toContain(
        `--audit-level=${level}`,
      );
    }
  });
});
