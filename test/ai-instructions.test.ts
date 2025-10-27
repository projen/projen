import { synthSnapshot, TestProject } from "./util";
import { javascript } from "../src";
import { AiInstructions, AiAgent } from "../src/ai-instructions";

describe("AiInstructions", () => {
  it("generates files for all AI agents by default", () => {
    const project = new TestProject();
    new AiInstructions(project);

    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/copilot-instructions.md"]).toBeDefined();
    expect(snapshot[".cursor/rules/project.md"]).toBeDefined();
    expect(snapshot["CLAUDE.md"]).toBeDefined();
    expect(snapshot[".amazonq/rules/project.md"]).toBeDefined();
    expect(snapshot[".kiro/steering/project.md"]).toBeDefined();
  });

  it("has default instructions that include projen-specific guidance", () => {
    const project = new javascript.NodeProject({
      defaultReleaseBranch: "main",
      name: "my-node-project",
    });
    new AiInstructions(project);

    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];

    expect(copilotInstructions).toContain("projen");
    expect(copilotInstructions).toContain("npx projen");
    expect(copilotInstructions).toContain(
      "DO NOT manually edit generated files"
    );
    expect(copilotInstructions).toContain("Modify configuration in .projenrc");
  });
  // This is being skipped because of a bug that's causing the projen command to be npx projen for bun projects
  it.skip("has default instructions that include projen-specific guidance for bun projects", () => {
    const project = new javascript.NodeProject({
      packageManager: javascript.NodePackageManager.BUN,
      defaultReleaseBranch: "main",
      name: "my-bun-project",
    });
    new AiInstructions(project);
    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];

    expect(copilotInstructions).toContain("projen");
    expect(copilotInstructions).toContain("bun run projen");
    expect(copilotInstructions).not.toContain("npx projen");
  });

  it("can specify which AI agents to support", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      agents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR],
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/copilot-instructions.md"]).toBeDefined();
    expect(snapshot[".cursor/rules/project.md"]).toBeDefined();
    expect(snapshot["CLAUDE.md"]).toBeUndefined();
    expect(snapshot[".amazonq/rules/project.md"]).toBeUndefined();
  });

  it("can specify only one AI agent", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      agents: [AiAgent.GITHUB_COPILOT],
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/copilot-instructions.md"]).toBeDefined();
    expect(snapshot[".cursor/rules/project.md"]).toBeUndefined();
    expect(snapshot["CLAUDE.md"]).toBeUndefined();
    expect(snapshot[".amazonq/rules/project.md"]).toBeUndefined();
  });

  it("extracts task runner from projenCommand - npx", () => {
    const project = new TestProject({
      projenCommand: "npx projen",
    });
    new AiInstructions(project);

    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("npx projen");
    expect(instructions).not.toContain("bunx projen");
  });

  it("extracts task runner from projenCommand - bunx", () => {
    const project = new TestProject({
      projenCommand: "bunx projen",
    });
    new AiInstructions(project);

    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("bunx projen");
    expect(instructions).not.toContain("npx projen");
  });

  it("addInstructions adds general instructions", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project);

    ai.addInstructions("Always use functional programming patterns.");
    ai.addInstructions("Prefer immutability.");

    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("Project-Specific Instructions");
    expect(instructions).toContain(
      "Always use functional programming patterns."
    );
    expect(instructions).toContain("Prefer immutability.");
  });

  it("addAgentSpecificInstructions adds agent-specific instructions", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project);

    ai.addAgentSpecificInstructions(
      AiAgent.GITHUB_COPILOT,
      "Use descriptive commit messages."
    );

    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];
    const cursorInstructions = snapshot[".cursor/rules/project.md"];

    expect(copilotInstructions).toContain(
      "GitHub Copilot-Specific Instructions"
    );
    expect(copilotInstructions).toContain("Use descriptive commit messages.");
    expect(cursorInstructions).not.toContain(
      "GitHub Copilot-Specific Instructions"
    );
  });

  it("agentSpecificInstructions option with string", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      agentSpecificInstructions: {
        [AiAgent.CURSOR]: ["Cursor-specific instruction."],
      },
    });

    const snapshot = synthSnapshot(project);
    const cursorInstructions = snapshot[".cursor/rules/project.md"];

    expect(cursorInstructions).toContain("Cursor-Specific Instructions");
    expect(cursorInstructions).toContain("Cursor-specific instruction.");
  });

  it("agentSpecificInstructions option with array", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      agentSpecificInstructions: {
        [AiAgent.CLAUDE]: ["First instruction.", "Second instruction."],
      },
    });

    const snapshot = synthSnapshot(project);
    const claudeInstructions = snapshot["CLAUDE.md"];

    expect(claudeInstructions).toContain("Claude-Specific Instructions");
    expect(claudeInstructions).toContain("First instruction.");
    expect(claudeInstructions).toContain("Second instruction.");
  });

  it("generated files are marked as readonly", () => {
    const project = new TestProject();
    new AiInstructions(project);

    const copilotFile = project.tryFindFile(".github/copilot-instructions.md");
    const cursorFile = project.tryFindFile(".cursor/rules/project.md");
    const claudeFile = project.tryFindFile("CLAUDE.md");
    const amazonQFile = project.tryFindFile(".amazonq/rules/project.md");

    expect(copilotFile?.readonly).toBe(true);
    expect(cursorFile?.readonly).toBe(true);
    expect(claudeFile?.readonly).toBe(true);
    expect(amazonQFile?.readonly).toBe(true);
  });

  it("all agent files have consistent base content", () => {
    const project = new TestProject();
    new AiInstructions(project);

    const snapshot = synthSnapshot(project);
    const copilotContent = snapshot[".github/copilot-instructions.md"];
    const cursorContent = snapshot[".cursor/rules/project.md"];
    const claudeContent = snapshot["CLAUDE.md"];
    const amazonQContent = snapshot[".amazonq/rules/project.md"];

    expect(copilotContent).toContain("Projen Project Instructions");
    expect(cursorContent).toContain("Projen Project Instructions");
    expect(claudeContent).toContain("Projen Project Instructions");
    expect(amazonQContent).toContain("Projen Project Instructions");
  });

  it("combining general and agent-specific instructions", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project, {
      agents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR],
      agentSpecificInstructions: {
        [AiAgent.GITHUB_COPILOT]: ["Copilot-specific rule."],
      },
    });

    ai.addInstructions("General instruction for all agents.");

    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];
    const cursorInstructions = snapshot[".cursor/rules/project.md"];

    expect(copilotInstructions).toContain(
      "General instruction for all agents."
    );
    expect(cursorInstructions).toContain("General instruction for all agents.");

    expect(copilotInstructions).toContain("Copilot-specific rule.");
    expect(cursorInstructions).not.toContain("Copilot-specific rule.");
  });

  it("snapshots - default configuration", () => {
    const project = new TestProject();
    new AiInstructions(project);

    expect(synthSnapshot(project)).toMatchSnapshot();
  });

  it("snapshots - custom agents and instructions", () => {
    const project = new TestProject({
      projenCommand: "bunx projen",
    });
    const ai = new AiInstructions(project, {
      agents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR],
      agentSpecificInstructions: {
        [AiAgent.CURSOR]: [
          "Use TypeScript strict mode.",
          "Always write tests.",
        ],
      },
    });

    ai.addInstructions("Follow the project's coding standards.");

    expect(synthSnapshot(project)).toMatchSnapshot();
  });

  it("includes build instructions by default", () => {
    const project = new TestProject();
    new AiInstructions(project);

    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("Development Best Practices");
    expect(instructions).toContain("Always run build after changes");
    expect(instructions).toContain("Task completion criteria");
    expect(instructions).toContain("All tests pass");
    expect(instructions).toContain("no compilation errors");
    expect(instructions).toContain("no linting errors");
  });

  it("can disable default instructions", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      includeDefaultInstructions: false,
    });

    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).not.toContain("Development Best Practices");
    expect(instructions).not.toContain("Always run build after changes");
  });

  it("supports user-added generic instructions", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project);

    ai.addInstructions(
      "Use functional programming patterns.",
      "Prefer immutability.",
      "Always write tests."
    );

    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("Use functional programming patterns.");
    expect(instructions).toContain("Prefer immutability.");
    expect(instructions).toContain("Always write tests.");
  });

  it("supports user-added agent-specific instructions", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project);

    ai.addAgentSpecificInstructions(
      AiAgent.GITHUB_COPILOT,
      "Use descriptive commit messages.",
      "Keep PRs small and focused.",
      "Write clear documentation."
    );

    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];

    expect(copilotInstructions).toContain("Use descriptive commit messages.");
    expect(copilotInstructions).toContain("Keep PRs small and focused.");
    expect(copilotInstructions).toContain("Write clear documentation.");
  });

  it("throws an error when an invalid agent is specified", () => {
    const project = new TestProject();

    expect(() => {
      new AiInstructions(project, {
        agents: ["invalid-agent" as AiAgent],
      });
    }).toThrowError(/Unknown AI agent: invalid-agent/);
  });
});
