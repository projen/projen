import { synthSnapshot, TestProject } from "./util";
import { AiInstructions, AiAgent } from "../src/ai-instructions";

describe("AiInstructions", () => {
  it("generates files for all AI agents by default", () => {
    const project = new TestProject();
    new AiInstructions(project);

    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/copilot-instructions.md"]).toBeDefined();
    expect(snapshot[".cursor/rules/projen.md"]).toBeDefined();
    expect(snapshot["CLAUDE.md"]).toBeDefined();
    expect(snapshot[".amazonq/rules/projen.md"]).toBeDefined();
  });

  it("default instructions include projen-specific guidance", () => {
    const project = new TestProject();
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

  it("can specify which AI agents to support", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      supportedAiAgents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR],
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/copilot-instructions.md"]).toBeDefined();
    expect(snapshot[".cursor/rules/projen.md"]).toBeDefined();
    expect(snapshot["CLAUDE.md"]).toBeUndefined();
    expect(snapshot[".amazonq/rules/projen.md"]).toBeUndefined();
  });

  it("can specify only one AI agent", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      supportedAiAgents: [AiAgent.GITHUB_COPILOT],
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/copilot-instructions.md"]).toBeDefined();
    expect(snapshot[".cursor/rules/projen.md"]).toBeUndefined();
    expect(snapshot["CLAUDE.md"]).toBeUndefined();
    expect(snapshot[".amazonq/rules/projen.md"]).toBeUndefined();
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

  it("addCustomInstruction adds general instructions", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project);

    ai.addCustomInstruction("Always use functional programming patterns.");
    ai.addCustomInstruction("Prefer immutability.");

    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("Project-Specific Instructions");
    expect(instructions).toContain(
      "Always use functional programming patterns."
    );
    expect(instructions).toContain("Prefer immutability.");
  });

  it("addAgentInstruction adds agent-specific instructions", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project);

    ai.addAgentInstruction(
      AiAgent.GITHUB_COPILOT,
      "Use descriptive commit messages."
    );

    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];
    const cursorInstructions = snapshot[".cursor/rules/projen.md"];

    expect(copilotInstructions).toContain(
      "GitHub Copilot-Specific Instructions"
    );
    expect(copilotInstructions).toContain("Use descriptive commit messages.");
    expect(cursorInstructions).not.toContain(
      "GitHub Copilot-Specific Instructions"
    );
  });

  it("perAgentInstructions option with string", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      perAgentInstructions: {
        [AiAgent.CURSOR]: {
          instructions: ["Cursor-specific instruction."],
        },
      },
    });

    const snapshot = synthSnapshot(project);
    const cursorInstructions = snapshot[".cursor/rules/projen.md"];

    expect(cursorInstructions).toContain("Cursor-Specific Instructions");
    expect(cursorInstructions).toContain("Cursor-specific instruction.");
  });

  it("perAgentInstructions option with array", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      perAgentInstructions: {
        [AiAgent.CLAUDE]: {
          instructions: ["First instruction.", "Second instruction."],
        },
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
    const cursorFile = project.tryFindFile(".cursor/rules/projen.md");
    const claudeFile = project.tryFindFile("CLAUDE.md");
    const amazonQFile = project.tryFindFile(".amazonq/rules/projen.md");

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
    const cursorContent = snapshot[".cursor/rules/projen.md"];
    const claudeContent = snapshot["CLAUDE.md"];
    const amazonQContent = snapshot[".amazonq/rules/projen.md"];

    expect(copilotContent).toContain("Projen Project Instructions");
    expect(cursorContent).toContain("Projen Project Instructions");
    expect(claudeContent).toContain("Projen Project Instructions");
    expect(amazonQContent).toContain("Projen Project Instructions");
  });

  it("combining general and agent-specific instructions", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project, {
      supportedAiAgents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR],
      perAgentInstructions: {
        [AiAgent.GITHUB_COPILOT]: {
          instructions: ["Copilot-specific rule."],
        },
      },
    });

    ai.addCustomInstruction("General instruction for all agents.");

    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];
    const cursorInstructions = snapshot[".cursor/rules/projen.md"];

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
      supportedAiAgents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR],
      perAgentInstructions: {
        [AiAgent.CURSOR]: {
          instructions: ["Use TypeScript strict mode.", "Always write tests."],
        },
      },
    });

    ai.addCustomInstruction("Follow the project's coding standards.");

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

  it("can disable build instructions", () => {
    const project = new TestProject();
    new AiInstructions(project, {
      includeBuildInstructions: false,
    });

    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).not.toContain("Development Best Practices");
    expect(instructions).not.toContain("Always run build after changes");
  });

  it("supports user-added generic instructions", () => {
    const project = new TestProject();
    const ai = new AiInstructions(project);

    ai.addCustomInstruction(
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

    ai.addAgentInstruction(
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
});
