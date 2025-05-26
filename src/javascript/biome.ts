import { deepClone } from "fast-json-patch";
import { Component } from "../component";
import { JsonFile } from "../json";
import { IConfiguration } from "./biome-config";
import { Eslint } from "./eslint";
import { NodeProject } from "../javascript";
import { Prettier } from "./prettier";
import { Task } from "../task";
export * from "./biome-config";

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
   * Full Biome configuration. Note that this configuration dictates the final outcome is value is set.
   *
   * @example if linter is disabled on main level, it can be enabled on fullConfiguration.formatter.enabled.
   */
  readonly overrides?: IConfiguration;
}

/**
 * Default configuration that's used when Eslint was enabled in Projen.
 *
 * Note that Eslint had some formatting options, but those are removed from here and available only within formatter.
 *
 * Generated using `biome migrate eslint`. Some common settings not included here which are in both (Prettier and Eslint) migration configuration
 */
const eslintConfiguration = (projenrcFile?: string): IConfiguration => {
  const include = projenrcFile ? [projenrcFile] : [];

  return {
    linter: {
      enabled: true,
      rules: {
        recommended: false,
        complexity: {
          useLiteralKeys: "error",
        },
        style: {
          useBlockStatements: "error",
        },
      },
      ignore: [
        "**/*.js",
        "**/*.d.ts",
        "**/node_modules/",
        "**/*.generated.ts",
        "**/coverage",
      ],
    },
    overrides: [
      {
        include,
        linter: {
          rules: {},
        },
      },
    ],
  };
};

/**
 * Default configuration that's used when Prettier was enabled in Projen.
 *
 * Generated using `biome migrate prettier`. Some common settings not included here which are in both (Prettier and Eslint) migration configuration
 */
const prettierConfiguration = (): IConfiguration => ({
  formatter: {
    enabled: true,
    useEditorconfig: true,
    formatWithErrors: true,
    indentStyle: "space",
    indentWidth: 2,
    lineEnding: "lf",
    lineWidth: 80,
    attributePosition: "auto",
    bracketSpacing: true,
  },
  organizeImports: {
    enabled: true,
  },
  linter: {
    enabled: false, // Separating clearly linter and formatter
  },
  javascript: {
    formatter: {
      jsxQuoteStyle: "double",
      quoteProperties: "asNeeded",
      trailingCommas: "all",
      semicolons: "asNeeded",
      arrowParentheses: "always",
      bracketSameLine: false,
      quoteStyle: "single",
      attributePosition: "auto",
      bracketSpacing: true,
    },
  },
});

/**
 * Merge 2 objects deeply.
 *
 * Can't type to actual type, as function is called recursively.
 *
 * Note that explicit undefined would override value from target; missing key (implicit undefined) is not affecting to result.
 *
 * @param target Object to start with
 * @param overrides Object that can override values in target
 * @param mergeArrays Should arrays be merged or overwritten from overrides. Defaults to merging.
 */
const mergeConfigurations = (
  target: any,
  overrides: any,
  mergeArrays = true
): any => {
  const results = deepClone(target);

  for (const key in overrides) {
    // Check if override's key is it's own or inherited; we want to handle only it's own.
    if ((overrides as Object).hasOwnProperty(key)) {
      // Handle arrays
      if (overrides[key] instanceof Array && results[key] instanceof Array) {
        if (mergeArrays) {
          // Merge arrays and drop duplicates
          results[key] = [...new Set([...overrides[key], ...results[key]])];
        } else {
          results[key] = overrides[key];
        }
      } else if (
        overrides[key] instanceof Object &&
        results[key] instanceof Object
      ) {
        // Handle objects
        results[key] = mergeConfigurations(
          results[key],
          overrides[key],
          mergeArrays
        );
      } else {
        // Handle primitive values
        results[key] = overrides[key];
      }
    }
  }

  return results;
};

const commonConfiguration: IConfiguration = {
  vcs: { enabled: false, clientKind: "git", useIgnoreFile: false },
  files: {
    ignoreUnknown: false,
    ignore: [],
  },
};

export const _createBiomeConfiguration = (
  options: BiomeOptions,
  projenrcFile?: string
): IConfiguration => {
  const defaultLinter: IConfiguration = options.linter
    ? eslintConfiguration(projenrcFile)
    : {};
  const defaultFormatter: IConfiguration = options.formatter
    ? prettierConfiguration()
    : {};
  const defaultOrganized: IConfiguration = options.organizeImports
    ? { organizeImports: { enabled: true } }
    : { organizeImports: { enabled: false } };

  const defaultConfig = mergeConfigurations(
    mergeConfigurations(
      mergeConfigurations(defaultFormatter, defaultLinter),
      defaultOrganized
    ),
    commonConfiguration
  );

  return mergeConfigurations(
    defaultConfig,
    options.overrides,
    options.mergeArraysInConfiguration
  );
};

export class Biome extends Component {
  public static of(project: NodeProject): Biome | undefined {
    const isBiome = (c: Component): c is Biome => c instanceof Biome;
    return project.components.find(isBiome);
  }

  private readonly configFile: string;
  private readonly optionsWithDefaults: BiomeOptions;
  private readonly biomeConfiguration: IConfiguration;
  private readonly _lintPatterns: Set<string>;
  private readonly biomeCommand = "biome check --write";
  /**
   * Biome task.
   */
  public readonly biomeTask: Task;

  constructor(project: NodeProject, options: BiomeOptions = {}) {
    super(project);
    this.configFile = "biome.jsonc";
    this.optionsWithDefaults = {
      mergeArraysInConfiguration: (options as Object).hasOwnProperty(
        "mergeArraysInConfiguration"
      )
        ? options.mergeArraysInConfiguration
        : true,
      formatter: options.formatter ?? false,
      linter: options.linter ?? true,
      organizeImports: options.organizeImports ?? false,
      version: options.version ?? "^1",
      overrides: options.overrides,
    };

    project.addDevDeps(`@biomejs/biome@${this.optionsWithDefaults.version}`);

    this.biomeConfiguration = _createBiomeConfiguration(
      this.optionsWithDefaults
    );

    new JsonFile(this, this.configFile, {
      obj: this.biomeConfiguration,
      committed: true,
      allowComments: true,
      marker: true,
    });

    this._lintPatterns = new Set([]);

    this.biomeTask = this.createLocalBiomeTask();
    project.testTask.spawn(this.biomeTask);
  }

  public override preSynthesize(): void {
    super.preSynthesize();

    for (const component of this.project.components) {
      if (
        component instanceof Eslint &&
        this.biomeConfiguration.linter?.enabled
      ) {
        throw new Error("Biome linter should not be used together with Eslint");
      }
      if (
        component instanceof Prettier &&
        (this.biomeConfiguration.formatter?.enabled ||
          this.biomeConfiguration.organizeImports?.enabled)
      ) {
        throw new Error(
          "Biome formatter should not be used together with Prettier"
        );
      }
    }
  }

  /**
   * Update the task with the current list of lint patterns and file extensions
   */
  private updateTask() {
    const args = new Set<string>();

    for (const arg of this._lintPatterns) {
      args.add(arg);
    }

    this.biomeTask.reset(
      [
        this.biomeCommand,
        // Allow also external arguments
        "$@",
        ...args,
      ].join(" "),
      {
        args: this.biomeTask.steps[0].args,
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
