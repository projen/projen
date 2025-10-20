import { Component } from "./component";
import { Project } from "./project";
import { TextFile } from "./textfile";

/**
 * Supported AI coding assistants and their instruction file locations.
 */
export enum AiAgent {
  /**
   * GitHub Copilot - .github/copilot-instructions.md
   */
  GITHUB_COPILOT = "GitHub Copilot",

  /**
   * Cursor IDE - .cursor/rules/projen.md
   */
  CURSOR = "Cursor",

  /**
   * Claude Code - CLAUDE.md
   */
  CLAUDE = "Claude",

  /**
   * Amazon Q - .amazonq/rules/projen.md
   */
  AMAZON_Q = "Amazon Q",
}

/**
 * Per-agent custom instructions.
 */
export interface AiAgentInstructions {
  /**
   * Custom instructions specific to this AI agent.
   */
  readonly instructions: string[];
}

/**
 * Options for configuring AI tool instruction files.
 */
export interface AiInstructionsOptions {
  /**
   * Which AI agents to generate instruction files for.
   *
   * @default - All agents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR, AiAgent.CLAUDE, AiAgent.AMAZON_Q]
   */
  readonly supportedAiAgents?: AiAgent[];

  /**
   * Per-agent custom instructions. Allows different instructions for different AI tools.
   *
   * @default - no per-agent custom instructions
   * @example
   * {
   *   [AiAgent.GITHUB_COPILOT]: {
   *     instructions: ["Use descriptive commit messages."]
   *   },
   *   [AiAgent.CURSOR]: {
   *     instructions: ["Prefer functional patterns.", "Always add tests."]
   *   }
   * }
   */
  readonly perAgentInstructions?: { [key: string]: AiAgentInstructions };

  /**
   * Include instructions to run build after every change to a source or test file.
   *
   * @default true
   */
  readonly includeBuildInstructions?: boolean;
}

/**
 * Generates instruction files for AI coding assistants with projen-specific guidance.
 *
 * This component creates configuration files that help AI tools like GitHub Copilot,
 * Cursor IDE, Claude Code, and Amazon Q understand that the project is managed by projen
 * and should follow projen conventions.
 *
 * @example
 * const project = new TypeScriptProject({
 *   name: "my-project",
 *   defaultReleaseBranch: "main",
 * });
 *
 * // Basic usage - generates files for all supported AI agents
 * new AiInstructions(project);
 *
 * // Custom usage - specify which agents and add custom instructions
 * new AiInstructions(project, {
 *   supportedAiAgents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR],
 *   perAgentInstructions: {
 *     [AiAgent.GITHUB_COPILOT]: {
 *       instructions: ["Always use descriptive commit messages."],
 *     },
 *   },
 * });
 *
 * // Add more custom instructions after instantiation
 * const ai = new AiInstructions(project);
 * ai.addCustomInstruction("Use functional programming patterns.");
 * ai.addCustomInstruction("Always write comprehensive tests.");
 */
export class AiInstructions extends Component {
  private readonly customInstructions: string[] = [];
  private readonly agents: AiAgent[];
  private readonly perAgentInstructions: { [key: string]: AiAgentInstructions };
  private readonly files: Map<AiAgent, TextFile> = new Map();
  private readonly includeBuildInstructions: boolean;

  constructor(project: Project, options: AiInstructionsOptions = {}) {
    super(project);

    this.agents =
      options.supportedAiAgents ??
      (Object.values(AiAgent).filter(
        (v) => typeof v === "string"
      ) as AiAgent[]);
    this.perAgentInstructions = options.perAgentInstructions ?? {};
    this.includeBuildInstructions = options.includeBuildInstructions ?? true;

    // Create placeholder files that will be populated in preSynthesize
    for (const agent of this.agents) {
      const filePath = this.getAgentFilePath(agent);
      const file = new TextFile(project, filePath, {
        lines: [],
        committed: true,
        readonly: true,
      });
      this.files.set(agent, file);
    }
  }

  /**
   * Add a custom instruction that will be included in all AI agent instruction files.
   *
   * @param instructions The instructions to add.
   * @example
   * aiInstructions.addCustomInstruction("Always use TypeScript strict mode.");
   * aiInstructions.addCustomInstruction("Prefer functional programming.", "Avoid mutations.");
   */
  public addCustomInstruction(...instructions: string[]): void {
    this.customInstructions.push(...instructions);
  }

  /**
   * Add custom instructions for a specific AI agent.
   *
   * @param agent The AI agent to add instructions for
   * @param instructions The instruction(s) to add
   * @example
   * aiInstructions.addAgentInstruction(AiAgent.GITHUB_COPILOT, "Use descriptive commit messages.");
   */
  public addAgentInstruction(agent: AiAgent, ...instructions: string[]): void {
    if (!this.perAgentInstructions[agent]) {
      this.perAgentInstructions[agent] = { instructions: [] };
    }

    this.perAgentInstructions[agent]!.instructions.push(...instructions);
  }

  public preSynthesize(): void {
    super.preSynthesize();

    const project = this.project as Project;
    const projenCommand = project.projenCommand;

    for (const agent of this.agents) {
      const defaultInstructions =
        this.generateDefaultInstructions(projenCommand);
      const fullInstructions = this.buildFullInstructions(
        defaultInstructions,
        agent
      );

      const file = this.files.get(agent)!;
      const lines = fullInstructions.split("\n");
      for (const line of lines) {
        file.addLine(line);
      }
    }
  }

  /**
   * Get the file path for a given AI agent.
   */
  private getAgentFilePath(agent: AiAgent): string {
    switch (agent) {
      case AiAgent.GITHUB_COPILOT:
        return ".github/copilot-instructions.md";
      case AiAgent.CURSOR:
        return ".cursor/rules/projen.md";
      case AiAgent.CLAUDE:
        return "CLAUDE.md";
      case AiAgent.AMAZON_Q:
        return ".amazonq/rules/projen.md";
      default:
        throw new Error(`Unknown AI agent: ${agent}`);
    }
  }

  /**
   * Build the full instructions including default, custom, and agent-specific instructions.
   */
  private buildFullInstructions(
    defaultInstructions: string,
    agent: AiAgent
  ): string {
    const parts: string[] = [defaultInstructions];

    // Add general custom instructions
    if (this.customInstructions.length > 0) {
      parts.push(
        "\n## Project-Specific Instructions\n\n" +
          this.customInstructions.join("\n\n")
      );
    }

    // Add agent-specific instructions
    const agentInstructions = this.perAgentInstructions[agent];
    if (agentInstructions) {
      const instructions = agentInstructions.instructions.join("\n\n");
      parts.push(`\n## ${agent}-Specific Instructions\n\n${instructions}`);
    }

    return parts.join("");
  }

  private generateDefaultInstructions(projenCommand: string): string {
    const buildInstructions = this.includeBuildInstructions
      ? `

### Development Best Practices

- **Always run build after changes**: After modifying any source or test file, run \`${projenCommand} build\` to ensure your changes compile and pass all tests.
- **Task completion criteria**: A task is not considered complete until:
  - All tests pass (\`${projenCommand} test\`)
  - There are no compilation errors (\`${projenCommand} compile\`)
  - There are no linting errors (usually part of the build, if not, run the linter defined in tasks.json)
  - The full build succeeds (\`${projenCommand} build\`)`
      : "";

    return `# Projen Project Instructions

This project is managed by [projen](https://github.com/projen/projen), a project configuration management tool.

## Important Guidelines

### Task Execution

- **Always use projen for task execution**: Run tasks using \`${projenCommand} <task-name>\` instead of directly using npm, yarn, or other package managers.
- **Check available tasks**: Look in \`.projen/tasks.json\` to see all available tasks, their descriptions, and steps.
- **Common tasks**: 
  - \`${projenCommand}\` - Synthesize project configuration files
  - \`${projenCommand} build\` - Build the project
  - \`${projenCommand} test\` - Run tests
  - \`${projenCommand} compile\` - Compile the source code

### File Modifications

- **DO NOT manually edit generated files**: Files marked with a comment like "~~ Generated by projen. To modify, edit .projenrc.js and run \`${projenCommand}\`" should never be edited directly.
- **Modify configuration in .projenrc**: To change project configuration, always edit the \`.projenrc.js\`, \`.projenrc.ts\`, or \`.projenrc.json\` file and then run \`${projenCommand}\` to regenerate the project files.
- **Check .projenrc first**: Before suggesting changes to package.json, tsconfig.json, or other configuration files, always check if these are managed by projen and suggest changes to .projenrc instead.

### Dependencies

- **Add dependencies through projen**: Use the projen configuration to add dependencies instead of manually editing package.json or using npm/yarn install directly.
- **Example**: In .projenrc.js, use methods like \`addDeps()\`, \`addDevDeps()\`, or \`addPeerDeps()\` to add dependencies.
${buildInstructions}

### Workflow

1. Make changes to .projenrc configuration file
2. Run \`${projenCommand}\` to synthesize and update generated files
3. Review the changes
4. Commit both .projenrc and the generated files

## Projen Configuration

This project's configuration is defined in the .projenrc file at the root of the repository. All project metadata, dependencies, scripts, and tooling configuration should be managed through this file.

## Additional Resources

- [Projen Documentation](https://projen.io)
- [Projen GitHub Repository](https://github.com/projen/projen)`;
  }
}
