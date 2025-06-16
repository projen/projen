import { deepClone } from "fast-json-patch";
import type { IConfiguration } from "./biome-config";
import { Component } from "../../component";
import type { NodeProject } from "../../javascript/node-project";
import { JsonFile } from "../../json";
import type { Project } from "../../project";
import type { Task } from "../../task";
import { deepMerge } from "../../util";

/**
 * Enabling VCS configuration by default.
 *
 * Note that this differs from `biome init`, as projen can be presumed to use version control
 */
const DEFAULT_CONFIG: Pick<IConfiguration, "vcs" | "files"> = {
  vcs: {
    clientKind: "git",
    enabled: true,
    useIgnoreFile: true,
  },
  files: {
    ignoreUnknown: false,
  },
};

/**
 * Default linting configuration if linter is enabled.
 *
 * Ignores by default following patterns: '*.js', '*.d.ts', 'node_modules/', '*.generated.ts', 'coverage'.
 */
const DEFAULT_LINTER: Pick<IConfiguration, "linter"> = {
  linter: {
    enabled: true,
    rules: {
      recommended: true,
    },
    // Default ignore's from Projen
    ignore: [
      "**/*.js",
      "**/*.d.ts",
      "**/node_modules/",
      "**/*.generated.ts",
      "**/coverage",
    ],
  },
};

/**
 * Default formatting configuration if formatter is enabled.
 */
const DEFAULT_FORMATTER: Pick<IConfiguration, "formatter" | "javascript"> = {
  formatter: {
    enabled: true,
    indentStyle: "tab",
  },
  javascript: {
    formatter: {
      quoteStyle: "double",
    },
  },
};

/**
 * Default formatting configuration if organize imports is enabled.
 */
const DEFAULT_ORGANIZE_IMPORTS: Pick<IConfiguration, "organizeImports"> = {
  organizeImports: {
    enabled: true,
  },
};

export interface BiomeOptions {
  /**
   * Version of Biome to use
   *
   * @default "^1"
   */
  readonly version?: string;
  /**
   * Enable linting. Replaces Eslint.
   *
   * @default true
   */
  readonly linter?: boolean;
  /**
   * Enable code formatter. Replaces mainly Prettier
   *
   * @default false
   */
  readonly formatter?: boolean;
  /**
   * Enable import sorting/organizing. Replaces mainly Prettier
   *
   * @default false
   */
  readonly organizeImports?: boolean;
  /**
   * Should arrays be merged or overwritten when creating Biome configuration
   *
   * By default arrays are merged and duplicate values are removed
   *
   * @default true
   */
  readonly mergeArraysInConfiguration?: boolean;
  /**
   * Full Biome configuration. Note that this configuration dictates the final outcome if value is set.
   *
   * @example if linter is disabled on main level, it can be enabled on fullConfiguration.formatter.enabled.
   */
  readonly biomeConfig?: IConfiguration;
}

export class Biome extends Component {
  public static of(project: Project): Biome | undefined {
    const isBiome = (c: Component): c is Biome => c instanceof Biome;
    return project.components.find(isBiome);
  }

  private readonly biomeConfiguration: IConfiguration;
  private readonly _lintPatterns: Set<string>;
  private readonly biomeCommand = "biome check --write";
  /**
   * Biome task.
   */
  public readonly task: Task;
  /**
   * Biome configuration file content
   */
  public readonly file: JsonFile;

  constructor(project: NodeProject, options: BiomeOptions = {}) {
    super(project);
    project.addDevDeps(`@biomejs/biome@${options.version ?? "^1"}`);

    const defaultConfig: IConfiguration = {
      ...DEFAULT_CONFIG,
      ...(options.linter ?? true ? DEFAULT_LINTER : {}),
      ...(options.formatter ?? false ? DEFAULT_FORMATTER : {}),
      ...(options.organizeImports ?? false ? DEFAULT_ORGANIZE_IMPORTS : {}),
    };

    this.biomeConfiguration = deepMerge(
      [deepClone(defaultConfig), deepClone(options.biomeConfig ?? {})],
      { mergeArrays: options.mergeArraysInConfiguration ?? true }
    );

    this.file = new JsonFile(this, "biome.jsonc", {
      obj: this.biomeConfiguration,
      allowComments: true,
      marker: true,
    });

    this._lintPatterns = new Set([]);

    this.task = this.createLocalBiomeTask();
    project.testTask.spawn(this.task);
  }

  /**
   * Update the task with the current list of lint patterns and file extensions
   */
  private updateTask() {
    const args = new Set<string>();

    for (const arg of this._lintPatterns) {
      args.add(arg);
    }

    this.task.reset(
      [
        this.biomeCommand,
        // Allow also external arguments
        "$@",
        ...args,
      ].join(" "),
      {
        args: this.task.steps[0].args,
      }
    );
  }

  public addLintPattern(pattern: string) {
    this._lintPatterns.add(pattern);
    this.updateTask();
  }

  private createLocalBiomeTask() {
    return this.project.addTask("biome", {
      description: "Runs Biome against the codebase",
      steps: [
        {
          exec: this.biomeCommand,
        },
      ],
    });
  }
}
