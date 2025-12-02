import * as path from "node:path";
import { deepClone } from "fast-json-patch";
import {
  IndentStyle,
  OverridePattern,
  QuoteStyle,
  Rules,
  toJson_BiomeConfiguration,
  VcsClientKind,
  type BiomeConfiguration,
} from "./biome-config";
import { Component } from "../../component";
import type { NodeProject } from "../../javascript/node-project";
import { JsonFile } from "../../json";
import type { Project } from "../../project";
import type { Task } from "../../task";
import { deepMerge, normalizePersistedPath } from "../../util";
import { tryResolveModule } from "../util";

/**
 * Enabling VCS configuration by default.
 *
 * Note that this differs from `biome init`, as projen can be presumed to use version control
 */
const DEFAULT_CONFIG: Pick<BiomeConfiguration, "vcs" | "files"> = {
  vcs: {
    clientKind: VcsClientKind.GIT,
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
const DEFAULT_LINTER: Pick<BiomeConfiguration, "linter"> = {
  linter: {
    enabled: true,
    rules: {
      recommended: true,
    },
  },
};

/**
 * Default formatting configuration if formatter is enabled.
 */
const DEFAULT_FORMATTER: Pick<BiomeConfiguration, "formatter" | "javascript"> =
  {
    formatter: {
      enabled: true,
      indentStyle: IndentStyle.TAB,
    },
    javascript: {
      formatter: {
        quoteStyle: QuoteStyle.DOUBLE,
      },
    },
  };

/**
 * Default code assist actions
 */
const DEFAULT_ASSIST: Pick<BiomeConfiguration, "assist"> = {
  assist: {
    enabled: true,
    actions: {
      recommended: true,
    },
  },
};

export interface BiomeOptions {
  /**
   * Version of Biome to use
   *
   * @default "^2"
   */
  readonly version?: string;
  /**
   * Enable linting with recommended rules.
   *
   * @default true
   */
  readonly linter?: boolean;
  /**
   * Enable code formatter with recommended settings.
   *
   * @default true
   */
  readonly formatter?: boolean;
  /**
   * Enable code assist with recommended actions.
   *
   * @default true
   */
  readonly assist?: boolean;
  /**
   * Should arrays be merged or overwritten when creating Biome configuration
   *
   * By default arrays are merged and duplicate values are removed
   *
   * @default true
   */
  readonly mergeArraysInConfiguration?: boolean;
  /**
   * Automatically ignore all generated files.
   *
   * This prevents Biome from trying to format or lint files that are marked as generated,
   * which would fail since generated files are typically read-only.
   *
   * @default true
   */
  readonly ignoreGeneratedFiles?: boolean;
  /**
   * Full Biome configuration.
   *
   * This configuration dictates the final outcome if value is set.
   * For example, if the linter is disabled at the top-level, it can be enabled with `biomeConfig.linter.enabled`.
   */
  readonly biomeConfig?: BiomeConfiguration;
}

/**
 * Biome component.
 */
export class Biome extends Component {
  public static of(project: Project): Biome | undefined {
    const isBiome = (c: Component): c is Biome => c instanceof Biome;
    return project.components.find(isBiome);
  }

  private readonly biomeConfiguration: Record<string, any>;
  private readonly _filePatterns: Set<string>;
  private readonly biomeCommand =
    "biome check --no-errors-on-unmatched --write";

  /**
   * Biome task.
   */
  public readonly task: Task;
  /**
   * Biome configuration file content
   */
  public readonly file: JsonFile;

  constructor(project: NodeProject, private options: BiomeOptions = {}) {
    super(project);

    const biomejs = `@biomejs/biome`;
    project.addDevDeps(`${biomejs}@${options.version ?? "^2"}`);

    const defaultConfig: BiomeConfiguration = {
      ...DEFAULT_CONFIG,
      ...(options.linter ?? true ? DEFAULT_LINTER : {}),
      ...(options.formatter ?? true ? DEFAULT_FORMATTER : {}),
      ...(options.assist ?? true ? DEFAULT_ASSIST : {}),
    };

    this._filePatterns = new Set([
      ...deepClone(options.biomeConfig?.files?.includes ?? []),
      ...deepClone(defaultConfig.files?.includes ?? []),
    ]);

    // Get generated file patterns to ignore
    const getGeneratedIgnorePatterns = () => {
      if (options.ignoreGeneratedFiles === false) {
        return [];
      }

      const generatedFiles = this.project.files
        .filter((file) => file.readonly && file.marker)
        .map((file) => `!${file.path}`);

      return generatedFiles;
    };

    this.biomeConfiguration = deepMerge(
      [
        toJson_BiomeConfiguration(deepClone(defaultConfig)),
        toJson_BiomeConfiguration(deepClone(options.biomeConfig ?? {})),
        {
          $schema: () => {
            const resolvedSchema = tryResolveModule(
              `${biomejs}/configuration_schema.json`,
              { paths: [this.project.outdir] }
            );
            if (
              // not found
              !resolvedSchema ||
              // not within the project dir
              !path
                .resolve(resolvedSchema)
                .startsWith(path.resolve(this.project.outdir))
            ) {
              return "https://biomejs.dev/schemas/latest/schema.json";
            }

            return normalizePersistedPath(
              path.relative(this.project.outdir, resolvedSchema)
            );
          },
          files: {
            includes: () => {
              const patterns = Array.from(this._filePatterns);
              const generatedPatterns = getGeneratedIgnorePatterns();
              // Use Set to deduplicate patterns
              return [...new Set([...patterns, ...generatedPatterns])];
            },
          },
        },
      ],
      { mergeArrays: options.mergeArraysInConfiguration ?? true }
    );

    this.file = new (class extends JsonFile {
      public get marker(): string | undefined {
        return `biome-ignore-all format: ${super.marker ?? "generated file"}`;
      }
    })(this, "biome.jsonc", {
      obj: this.biomeConfiguration,
      allowComments: true,
      marker: true,
      readonly: false, // biome will always re-write the config file
    });

    this.task = this.createLocalBiomeTask();
    project.testTask.spawn(this.task);
  }

  /**
   * Add a file pattern to biome.
   *
   * Use ! or !! to ignore a file pattern.
   * @param pattern Biome glob pattern
   * @see https://biomejs.dev/guides/configure-biome/#control-files-via-configuration
   */
  public addFilePattern(pattern: string) {
    this._filePatterns.add(pattern);
  }

  /**
   * Add a biome override to set rules for a specific file pattern.
   * @param override Override object
   * @see https://biomejs.dev/reference/configuration/#overrides
   */
  public addOverride(override: OverridePattern) {
    if (!this.biomeConfiguration.overrides) {
      this.biomeConfiguration.overrides = [];
    }

    this.biomeConfiguration.overrides.push(override);
  }

  /**
   * Expand the linting rules applied.
   *
   * Use `undefined` to remove the rule or group.
   *
   * @param rules Rules to apply.
   * @see https://biomejs.dev/reference/configuration/#linterrulesgroup
   * @example
   * biome.expandLintingRules({
   *   style: undefined,
   *   suspicious: {
   *     noExplicitAny: undefined,
   *     noDuplicateCase: "info",
   *   }
   * })
   */
  public expandLintingRules(rules: Rules) {
    this.biomeConfiguration.linter.rules = deepMerge(
      [this.biomeConfiguration.linter.rules, rules],
      {
        mergeArrays: this.options.mergeArraysInConfiguration ?? true,
        destructive: true,
      }
    );
  }

  private createLocalBiomeTask() {
    return this.project.addTask("biome", {
      description: "Runs Biome against the codebase",
      steps: [
        {
          exec: this.biomeCommand,
          receiveArgs: true,
        },
      ],
    });
  }
}
