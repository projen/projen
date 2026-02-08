import { synthSnapshot, TestProject } from "./util";
import { javascript } from "../src";
import { AiInstructions, AiAgent } from "../src/ai-instructions";
import { NodeProject } from "../src/javascript";
import { PythonProject } from "../src/python";

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
    expect(snapshot["AGENTS.md"]).toBeDefined();
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
      "DO NOT manually edit generated files",
    );
    expect(copilotInstructions).toContain("Modify configuration in .projenrc");
  });

  it("default instructions use specified projen command", () => {
    const project = new PythonProject({
      projenCommand: "pix projen",
      moduleName: "projen.hello",
      name: "projen.test-python-project",
      authorName: "John Doe",
      authorEmail: "johndoe@example.com",
      version: "0.1.0",
    });
    new AiInstructions(project);
    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];

    expect(copilotInstructions).toContain("projen");
    expect(copilotInstructions).toContain("pix projen");
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
    expect(snapshot[".kiro/steering/project.md"]).toBeUndefined();
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
    expect(snapshot[".kiro/steering/project.md"]).toBeUndefined();
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

    expect(instructions).toContain(
      "Always use functional programming patterns.",
    );
    expect(instructions).toContain("Prefer immutability.");
  });

  it("addAgentSpecificInstructions adds agent-specific instructions", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project);

    ai.addAgentSpecificInstructions(
      AiAgent.GITHUB_COPILOT,
      "Use descriptive commit messages.",
    );

    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];
    const cursorInstructions = snapshot[".cursor/rules/project.md"];

    expect(copilotInstructions).toContain("Use descriptive commit messages.");
    expect(cursorInstructions).not.toContain(
      "Use descriptive commit messages.",
    );
  });

  it("agentSpecificInstructions option with array", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      agentSpecificInstructions: {
        [AiAgent.CURSOR]: ["Cursor-specific instruction."],
      },
    });

    const snapshot = synthSnapshot(project);
    const cursorInstructions = snapshot[".cursor/rules/project.md"];

    expect(cursorInstructions).toContain("Cursor-specific instruction.");
  });

  it("agentSpecificInstructions option with multiple instructions", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      agentSpecificInstructions: {
        [AiAgent.CLAUDE]: ["First instruction.", "Second instruction."],
      },
    });

    const snapshot = synthSnapshot(project);
    const claudeInstructions = snapshot["CLAUDE.md"];

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
    const kiroFile = project.tryFindFile(".kiro/steering/project.md");
    const codexFile = project.tryFindFile("AGENTS.md");

    expect(copilotFile?.readonly).toBe(true);
    expect(cursorFile?.readonly).toBe(true);
    expect(claudeFile?.readonly).toBe(true);
    expect(amazonQFile?.readonly).toBe(true);
    expect(kiroFile?.readonly).toBe(true);
    expect(codexFile?.readonly).toBe(true);
  });

  it("all agent files have consistent base content", () => {
    const project = new TestProject();
    new AiInstructions(project);

    const snapshot = synthSnapshot(project);
    const copilotContent = snapshot[".github/copilot-instructions.md"];
    const cursorContent = snapshot[".cursor/rules/project.md"];
    const claudeContent = snapshot["CLAUDE.md"];
    const amazonQContent = snapshot[".amazonq/rules/project.md"];
    const kiroContent = snapshot[".kiro/steering/project.md"];
    const codexContent = snapshot["AGENTS.md"];

    expect(copilotContent).toContain("Projen-managed Project Instructions");
    expect(cursorContent).toContain("Projen-managed Project Instructions");
    expect(claudeContent).toContain("Projen-managed Project Instructions");
    expect(amazonQContent).toContain("Projen-managed Project Instructions");
    expect(kiroContent).toContain("Projen-managed Project Instructions");
    expect(codexContent).toContain("Projen-managed Project Instructions");
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
      "General instruction for all agents.",
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

  it("supports constructor instructions option", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      instructions: ["Use functional programming.", "Write tests."],
    });

    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("Use functional programming.");
    expect(instructions).toContain("Write tests.");
  });

  it("supports KIRO agent", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      agents: [AiAgent.KIRO],
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".kiro/steering/project.md"]).toBeDefined();
    expect(snapshot[".github/copilot-instructions.md"]).toBeUndefined();
  });

  it("supports CODEX agent", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      agents: [AiAgent.CODEX],
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["AGENTS.md"]).toBeDefined();
    expect(snapshot[".github/copilot-instructions.md"]).toBeUndefined();
  });

  it("static projen method returns projen instructions", () => {
    const project = new TestProject();
    const instructions = AiInstructions.projen(project);

    expect(instructions).toContain("Projen-managed Project Instructions");
    expect(instructions).toContain("Always use projen for task execution");
    expect(instructions).toContain("DO NOT manually edit generated files");
  });

  it("static bestPractices method returns best practices instructions", () => {
    const project = new TestProject();
    const instructions = AiInstructions.bestPractices(project);

    expect(instructions).toContain("Development Best Practices");
    expect(instructions).toContain("Always run build after changes");
    expect(instructions).toContain("Task completion criteria");
  });

  it("addAgentSpecificInstructions works for non-enabled agents", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project, {
      agents: [AiAgent.GITHUB_COPILOT],
    });

    ai.addAgentSpecificInstructions(AiAgent.CURSOR, "Cursor instruction.");

    const snapshot = synthSnapshot(project);
    expect(snapshot[".cursor/rules/project.md"]).toBeDefined();
    expect(snapshot[".cursor/rules/project.md"]).toContain(
      "Cursor instruction.",
    );
  });

  it("files are added to package ignore", () => {
    const project = new NodeProject({
      name: "@projen/test",
      defaultReleaseBranch: "main",
    });
    new AiInstructions(project);

    const snapshot = synthSnapshot(project);
    expect(snapshot[".npmignore"]).toContain(".github/copilot-instructions.md");
    expect(snapshot[".npmignore"]).toContain(".cursor/rules/project.md");
    expect(snapshot[".npmignore"]).toContain("CLAUDE.md");
    expect(snapshot[".npmignore"]).toContain(".amazonq/rules/project.md");
    expect(snapshot[".npmignore"]).toContain(".kiro/steering/project.md");
    expect(snapshot[".npmignore"]).toContain("AGENTS.md");
  });

  it("handles all agent file paths correctly", () => {
    const project = new TestProject();
    new AiInstructions(project);

    expect(
      project.tryFindFile(".github/copilot-instructions.md"),
    ).toBeDefined();
    expect(project.tryFindFile(".cursor/rules/project.md")).toBeDefined();
    expect(project.tryFindFile("CLAUDE.md")).toBeDefined();
    expect(project.tryFindFile(".amazonq/rules/project.md")).toBeDefined();
    expect(project.tryFindFile(".kiro/steering/project.md")).toBeDefined();
    expect(project.tryFindFile("AGENTS.md")).toBeDefined();
  });

  it("AiInstructionsFile synthesizes content correctly", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project, {
      agents: [AiAgent.GITHUB_COPILOT],
      includeDefaultInstructions: false,
    });

    ai.addAgentSpecificInstructions(
      AiAgent.GITHUB_COPILOT,
      "First instruction",
      "Second instruction",
    );

    const snapshot = synthSnapshot(project);
    const content = snapshot[".github/copilot-instructions.md"];

    expect(content).toBe("First instruction\n\nSecond instruction\n");
  });

  it("constructor agentSpecificInstructions are processed correctly", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      agents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR],
      includeDefaultInstructions: false,
      agentSpecificInstructions: {
        [AiAgent.GITHUB_COPILOT]: ["Copilot instruction"],
        [AiAgent.CURSOR]: ["Cursor instruction"],
      },
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/copilot-instructions.md"]).toContain(
      "Copilot instruction",
    );
    expect(snapshot[".cursor/rules/project.md"]).toContain(
      "Cursor instruction",
    );
    expect(snapshot[".github/copilot-instructions.md"]).not.toContain(
      "Cursor instruction",
    );
    expect(snapshot[".cursor/rules/project.md"]).not.toContain(
      "Copilot instruction",
    );
  });

  it("supports user-added generic instructions", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project);

    ai.addInstructions(
      "Use functional programming patterns.",
      "Prefer immutability.",
      "Always write tests.",
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
      "Write clear documentation.",
    );

    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];

    expect(copilotInstructions).toContain("Use descriptive commit messages.");
    expect(copilotInstructions).toContain("Keep PRs small and focused.");
    expect(copilotInstructions).toContain("Write clear documentation.");
  });

  it("falls back to AGENTS.md for unknown agents", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      agents: ["unknown-agent" as AiAgent],
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["AGENTS.md"]).toBeDefined();
    expect(snapshot["AGENTS.md"]).toContain(
      "Projen-managed Project Instructions",
    );
  });
});
