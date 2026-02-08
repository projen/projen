import { Component } from "./component";
import { FileBase, IResolver } from "./file";
import { Project } from "./project";

/**
 * Supported AI coding assistants and their instruction file locations.
 */
export enum AiAgent {
  /**
   * GitHub Copilot - .github/copilot-instructions.md
   */
  GITHUB_COPILOT = "GitHub Copilot",

  /**
   * Cursor IDE - .cursor/rules/project.md
   */
  CURSOR = "Cursor",

  /**
   * Claude Code - CLAUDE.md
   */
  CLAUDE = "Claude",

  /**
   * Amazon Q - .amazonq/rules/project.md
   */
  AMAZON_Q = "Amazon Q",

  /**
   * Kiro - .kiro/steering/project.md
   */
  KIRO = "Kiro",

  /**
   * OpenAI Codex - AGENTS.md
   */
  CODEX = "Codex",
}

/**
 * Options for configuring AI tool instruction files.
 */
export interface AiInstructionsOptions {
  /**
   * Which AI agents to generate instruction files for.
   *
   * @default - All agents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR, AiAgent.CLAUDE, AiAgent.AMAZON_Q, AiAgent.KIRO, AiAgent.CODEX]
   */
  readonly agents?: AiAgent[];

  /**
   * General instructions applicable to all agents.
   *
   * @default - no agent specific instructions
   */
  readonly instructions?: string[];

  /**
   * Per-agent custom instructions. Allows different instructions for different AI tools.
   *
   * @default - no agent specific instructions
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
  readonly agentSpecificInstructions?: Record<string, string[]>;

  /**
   * Include default instructions for projen and general best practices.
   *
   * Default instructions will only be included for agents provided in the `agents` option.
   * If `agents` is not provided, default instructions will be included for all agents.
   *
   * @default true
   */
  readonly includeDefaultInstructions?: boolean;
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
 *   agents: [AiAgent.GITHUB_COPILOT, AiAgent.CURSOR],
 *   agentSpecificInstructions: {
 *     [AiAgent.GITHUB_COPILOT]: ["Always use descriptive commit messages."],
 *   },
 * });
 *
 * // Add more instructions after instantiation
 * const ai = new AiInstructions(project);
 * ai.addInstructions("Use functional programming patterns.");
 * ai.addInstructions("Always write comprehensive tests.");
 */
export class AiInstructions extends Component {
  /**
   * Returns projen-specific instructions for AI agents.
   */
  public static projen(project: Project): string {
    return projenInstructions(project);
  }

  /**
   * Returns development best practices instructions for AI agents.
   */
  public static bestPractices(project: Project): string {
    return bestPracticesInstructions(project);
  }

  private readonly agents: AiAgent[];
  private readonly files: Map<AiAgent, AiInstructionsFile> = new Map();

  constructor(project: Project, options: AiInstructionsOptions = {}) {
    super(project);

    this.agents =
      options.agents ??
      (Object.values(AiAgent).filter(
        (v) => typeof v === "string",
      ) as AiAgent[]);

    // Assert files for declared agents
    for (const agent of this.agents) {
      this.ensureInstructionsFile(agent);
    }

    if (options.includeDefaultInstructions ?? true) {
      this.addInstructions(
        AiInstructions.projen(project),
        AiInstructions.bestPractices(project),
      );
    }

    if (options.instructions) {
      this.addInstructions(...options.instructions);
    }

    if (options.agentSpecificInstructions) {
      for (const [agent, instructions] of Object.entries(
        options.agentSpecificInstructions,
      )) {
        this.addAgentSpecificInstructions(agent as AiAgent, ...instructions);
      }
    }
  }

  /**
   * Create or return the instructions file.
   */
  private ensureInstructionsFile(agent: AiAgent): AiInstructionsFile {
    if (this.files.has(agent)) {
      return this.files.get(agent)!;
    }

    const filePath = this.getAgentFilePath(agent);
    const file = new AiInstructionsFile(this.project, filePath, {
      committed: true,
      readonly: true,
    });
    this.files.set(agent, file);
    this.project.addPackageIgnore(file.path);
    return file;
  }

  /**
   * Adds instructions that will be included for all selected AI agents.
   *
   * @param instructions The instructions to add.
   * @example
   * aiInstructions.addInstructions("Always use TypeScript strict mode.");
   * aiInstructions.addInstructions("Prefer functional programming.", "Avoid mutations.");
   */
  public addInstructions(...instructions: string[]): void {
    for (const agent of this.files.keys()) {
      this.addAgentSpecificInstructions(agent, ...instructions);
    }
  }

  /**
   * Add instructions for a specific AI agent.
   *
   * This can also be used to add instructions for an AI agent that was previously not enabled.
   *
   * @param agent The AI agent to add instructions for
   * @param instructions The instruction(s) to add
   * @example
   * aiInstructions.addAgentSpecificInstructions(AiAgent.GITHUB_COPILOT, "Use descriptive commit messages.");
   */
  public addAgentSpecificInstructions(
    agent: AiAgent,
    ...instructions: string[]
  ): void {
    const file = this.ensureInstructionsFile(agent);
    file.addInstructions(...instructions);
  }

  /**
   * Get the file path for a given AI agent.
   */
  private getAgentFilePath(agent: AiAgent): string {
    switch (agent) {
      case AiAgent.GITHUB_COPILOT:
        return ".github/copilot-instructions.md";
      case AiAgent.CURSOR:
        return ".cursor/rules/project.md";
      case AiAgent.CLAUDE:
        return "CLAUDE.md";
      case AiAgent.AMAZON_Q:
        return ".amazonq/rules/project.md";
      case AiAgent.KIRO:
        return ".kiro/steering/project.md";
      case AiAgent.CODEX:
        return "AGENTS.md";
      default:
        // Fallback to AGENTS.md for unknown agents
        return "AGENTS.md";
    }
  }
}

export class AiInstructionsFile extends FileBase {
  private readonly instructions: string[] = [];

  /**
   * Adds instructions to the instruction file.
   */
  public addInstructions(...instructions: string[]): void {
    this.instructions.push(...instructions);
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    return resolver.resolve(this.instructions).join("\n\n") + "\n";
  }
}

function bestPracticesInstructions(project: Project): string {
  const projenCommand = project.projenCommand;
  return `# Development Best Practices

- **Always run build after changes**: After modifying any source or test file, run \`${projenCommand} build\` to ensure your changes compile and pass all tests.
- **Task completion criteria**: A task is not considered complete until:
  - All tests pass (\`${projenCommand} test\`)
  - There are no compilation errors (\`${projenCommand} compile\`)
  - There are no linting errors (usually part of the build, if not, run the linter defined in tasks.json)
  - The full build succeeds (\`${projenCommand} build\`)`;
}

function projenInstructions(project: Project): string {
  const projenCommand = project.projenCommand;
  return `# Projen-managed Project Instructions

This project is managed by [projen](https://github.com/projen/projen), a project configuration management tool.

## Important Guidelines

### Task Execution

- **Always use projen for task execution**: Run tasks using \`${projenCommand} <task-name>\` instead of directly using npm, yarn, or other package managers.
- **Check available tasks**: Look in \`.projen/tasks.json\` to see all available tasks, their descriptions, and steps.
- **Common tasks**:
  - \`${projenCommand}\` - Synthesize project configuration files
  - \`${projenCommand} build\` - Builds the project, including running tests
  - \`${projenCommand} test\` - Runs tests only
  - \`${projenCommand} compile\` - Compiles the source code only

### File Modifications

- **DO NOT manually edit generated files**: Files marked with a comment like "~~ Generated by projen. To modify..." should never be edited directly.
- **Modify configuration in .projenrc**: To change project configuration, always edit the \`.projenrc.ts\`, \`.projenrc.py\` or \`.projenrc.json\` etc. file and then run \`${projenCommand}\` to regenerate the project files.
- **Check .projenrc first**: Before suggesting changes to package.json, tsconfig.json, or other configuration files, always check if these are managed by projen and suggest changes to .projenrc instead.

### Dependencies

- **Add dependencies through projen**: Use the projen configuration to add dependencies instead of manually editing package.json or using npm/yarn install directly.
- **Example**: In .projenrc, use methods like \`addDeps()\`, \`addDevDeps()\`, or \`addPeerDeps()\` to add dependencies.

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
