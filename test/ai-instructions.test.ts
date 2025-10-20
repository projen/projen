import { synthSnapshot, TestProject } from "./util";
import { AiInstructions, AiAgent } from "../src/ai-instructions";

describe("AiInstructions", () => {
  test("generates files for all AI agents by default", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project);

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/copilot-instructions.md"]).toBeDefined();
    expect(snapshot[".cursor/rules/projen.md"]).toBeDefined();
    expect(snapshot["CLAUDE.md"]).toBeDefined();
    expect(snapshot[".amazonq/rules/projen.md"]).toBeDefined();
  });

  test("default instructions include projen-specific guidance", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project);

    // THEN
    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];

    expect(copilotInstructions).toContain("projen");
    expect(copilotInstructions).toContain("npx projen");
    expect(copilotInstructions).toContain(
      "DO NOT manually edit generated files"
    );
    expect(copilotInstructions).toContain("Modify configuration in .projenrc");
  });

  test("can specify which AI agents to support", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project, {
      supportedAiAgents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR],
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/copilot-instructions.md"]).toBeDefined();
    expect(snapshot[".cursor/rules/projen.md"]).toBeDefined();
    expect(snapshot["CLAUDE.md"]).toBeUndefined();
    expect(snapshot[".amazonq/rules/projen.md"]).toBeUndefined();
  });

  test("can specify only one AI agent", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project, {
      supportedAiAgents: [AiAgent.GITHUB_COPILOT],
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/copilot-instructions.md"]).toBeDefined();
    expect(snapshot[".cursor/rules/projen.md"]).toBeUndefined();
    expect(snapshot["CLAUDE.md"]).toBeUndefined();
    expect(snapshot[".amazonq/rules/projen.md"]).toBeUndefined();
  });

  test("extracts task runner from projenCommand - npx", () => {
    // GIVEN
    const project = new TestProject({
      projenCommand: "npx projen",
    });

    // WHEN
    new AiInstructions(project);

    // THEN
    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("npx projen");
    expect(instructions).not.toContain("bunx projen");
  });

  test("extracts task runner from projenCommand - bunx", () => {
    // GIVEN
    const project = new TestProject({
      projenCommand: "bunx projen",
    });

    // WHEN
    new AiInstructions(project);

    // THEN
    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("bunx projen");
    expect(instructions).not.toContain("npx projen");
  });

  test("extracts task runner from projenCommand - pnpm", () => {
    // GIVEN
    const project = new TestProject({
      projenCommand: "pnpm projen",
    });

    // WHEN
    new AiInstructions(project);

    // THEN
    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("pnpm projen");
  });

  test("extracts task runner from projenCommand - yarn", () => {
    // GIVEN
    const project = new TestProject({
      projenCommand: "yarn projen",
    });

    // WHEN
    new AiInstructions(project);

    // THEN
    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("yarn projen");
  });

  test("addCustomInstruction adds general instructions", () => {
    // GIVEN
    const project = new TestProject();
    const ai = new AiInstructions(project);

    // WHEN
    ai.addCustomInstruction("Always use functional programming patterns.");
    ai.addCustomInstruction("Prefer immutability.");

    // THEN
    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("Project-Specific Instructions");
    expect(instructions).toContain(
      "Always use functional programming patterns."
    );
    expect(instructions).toContain("Prefer immutability.");
  });

  test("addAgentInstruction adds agent-specific instructions", () => {
    // GIVEN
    const project = new TestProject();
    const ai = new AiInstructions(project);

    // WHEN
    ai.addAgentInstruction(
      AiAgent.GITHUB_COPILOT,
      "Use descriptive commit messages."
    );

    // THEN
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

  test("perAgentInstructions option with string", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project, {
      perAgentInstructions: {
        [AiAgent.CURSOR]: {
          instructions: ["Cursor-specific instruction."],
        },
      },
    });

    // THEN
    const snapshot = synthSnapshot(project);
    const cursorInstructions = snapshot[".cursor/rules/projen.md"];

    expect(cursorInstructions).toContain("Cursor-Specific Instructions");
    expect(cursorInstructions).toContain("Cursor-specific instruction.");
  });

  test("perAgentInstructions option with array", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project, {
      perAgentInstructions: {
        [AiAgent.CLAUDE]: {
          instructions: ["First instruction.", "Second instruction."],
        },
      },
    });

    // THEN
    const snapshot = synthSnapshot(project);
    const claudeInstructions = snapshot["CLAUDE.md"];

    expect(claudeInstructions).toContain("Claude-Specific Instructions");
    expect(claudeInstructions).toContain("First instruction.");
    expect(claudeInstructions).toContain("Second instruction.");
  });

  test("generated files are marked as readonly", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project);

    // THEN
    const copilotFile = project.tryFindFile(".github/copilot-instructions.md");
    const cursorFile = project.tryFindFile(".cursor/rules/projen.md");
    const claudeFile = project.tryFindFile("CLAUDE.md");
    const amazonQFile = project.tryFindFile(".amazonq/rules/projen.md");

    expect(copilotFile?.readonly).toBe(true);
    expect(cursorFile?.readonly).toBe(true);
    expect(claudeFile?.readonly).toBe(true);
    expect(amazonQFile?.readonly).toBe(true);
  });

  test("all agent files have consistent base content", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project);

    // THEN
    const snapshot = synthSnapshot(project);
    const copilotContent = snapshot[".github/copilot-instructions.md"];
    const cursorContent = snapshot[".cursor/rules/projen.md"];
    const claudeContent = snapshot["CLAUDE.md"];
    const amazonQContent = snapshot[".amazonq/rules/projen.md"];

    // All should contain base projen instructions
    expect(copilotContent).toContain("Projen Project Instructions");
    expect(cursorContent).toContain("Projen Project Instructions");
    expect(claudeContent).toContain("Projen Project Instructions");
    expect(amazonQContent).toContain("Projen Project Instructions");
  });

  test("includes common projen tasks in instructions", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project);

    // THEN
    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("build");
    expect(instructions).toContain("test");
    expect(instructions).toContain("compile");
    expect(instructions).toContain(".projen/tasks.json");
  });

  test("includes dependency management guidance", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project);

    // THEN
    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("Add dependencies through projen");
    expect(instructions).toContain("addDeps()");
    expect(instructions).toContain("addDevDeps()");
  });

  test("includes workflow guidance", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project);

    // THEN
    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("Workflow");
    expect(instructions).toContain("Make changes to .projenrc");
    expect(instructions).toContain("synthesize");
  });

  test("combining general and agent-specific instructions", () => {
    // GIVEN
    const project = new TestProject();
    const ai = new AiInstructions(project, {
      supportedAiAgents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR],
      perAgentInstructions: {
        [AiAgent.GITHUB_COPILOT]: {
          instructions: ["Copilot-specific rule."],
        },
      },
    });

    // WHEN
    ai.addCustomInstruction("General instruction for all agents.");

    // THEN
    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];
    const cursorInstructions = snapshot[".cursor/rules/projen.md"];

    // Both should have general instruction
    expect(copilotInstructions).toContain(
      "General instruction for all agents."
    );
    expect(cursorInstructions).toContain("General instruction for all agents.");

    // Only copilot should have copilot-specific
    expect(copilotInstructions).toContain("Copilot-specific rule.");
    expect(cursorInstructions).not.toContain("Copilot-specific rule.");
  });

  test("snapshots - default configuration", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project);

    // THEN
    expect(synthSnapshot(project)).toMatchSnapshot();
  });

  test("snapshots - custom agents and instructions", () => {
    // GIVEN
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

    // WHEN
    ai.addCustomInstruction("Follow the project's coding standards.");

    // THEN
    expect(synthSnapshot(project)).toMatchSnapshot();
  });

  test("includes build instructions by default", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project);

    // THEN
    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("Development Best Practices");
    expect(instructions).toContain("Always run build after changes");
    expect(instructions).toContain("Task completion criteria");
    expect(instructions).toContain("All tests pass");
    expect(instructions).toContain("no compilation errors");
    expect(instructions).toContain("no linting errors");
  });

  test("can disable build instructions", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new AiInstructions(project, {
      includeBuildInstructions: false,
    });

    // THEN
    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).not.toContain("Development Best Practices");
    expect(instructions).not.toContain("Always run build after changes");
  });

  test("supports variadic addCustomInstruction", () => {
    // GIVEN
    const project = new TestProject();
    const ai = new AiInstructions(project);

    // WHEN
    ai.addCustomInstruction(
      "Use functional programming patterns.",
      "Prefer immutability.",
      "Always write tests."
    );

    // THEN
    const snapshot = synthSnapshot(project);
    const instructions = snapshot[".github/copilot-instructions.md"];

    expect(instructions).toContain("Use functional programming patterns.");
    expect(instructions).toContain("Prefer immutability.");
    expect(instructions).toContain("Always write tests.");
  });

  test("supports variadic addAgentInstruction", () => {
    // GIVEN
    const project = new TestProject();
    const ai = new AiInstructions(project);

    // WHEN
    ai.addAgentInstruction(
      AiAgent.GITHUB_COPILOT,
      "Use descriptive commit messages.",
      "Keep PRs small and focused.",
      "Write clear documentation."
    );

    // THEN
    const snapshot = synthSnapshot(project);
    const copilotInstructions = snapshot[".github/copilot-instructions.md"];

    expect(copilotInstructions).toContain("Use descriptive commit messages.");
    expect(copilotInstructions).toContain("Keep PRs small and focused.");
    expect(copilotInstructions).toContain("Write clear documentation.");
  });
});
