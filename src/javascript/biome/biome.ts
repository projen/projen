import { deepClone } from "fast-json-patch";
import { Component } from "../../component";
import { JsonFile } from "../../json";
import { ProjenrcFile } from "../../projenrc";
import { TypeScriptProject } from "../../typescript";
import type { IConfiguration } from "./biome-config";
import type { NodeProject } from "../../javascript";

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
  readonly overrides?: IConfiguration;
}

/**
 * Enabling VCS configuration by default.
 *
 * Note that this differs from `biome init`, as projen can be presumed to use version control
 */
const baseConfiguration: IConfiguration = {
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
 * Default linting configuration for Biome when it's initialized.
 *
 * Ignores by default following patterns: '*.js', '*.d.ts', 'node_modules/', '*.generated.ts', 'coverage'.
 */
const defaultLinterConfiguration: IConfiguration = {
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
 * Default formatting configuration for Biome when it's initialized.
 *
 * Note that this enables also import organizer.
 */
const defaultFormatterConfiguration: IConfiguration = {
  formatter: {
    enabled: true,
    indentStyle: "tab",
  },
  organizeImports: {
    enabled: true,
  },
  linter: {
    enabled: false, // Separating clearly linter and formatter
  },
  javascript: {
    formatter: {
      quoteStyle: "double",
    },
  },
};

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
      if (Array.isArray(overrides[key]) && Array.isArray(results[key])) {
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
  options: BiomeOptions
): IConfiguration => {
  const defaultLinter: IConfiguration = options.linter
    ? defaultLinterConfiguration
    : {};
  const defaultFormatter: IConfiguration = options.formatter
    ? defaultFormatterConfiguration
    : {};
  const defaultOrganized: IConfiguration = options.organizeImports
    ? { organizeImports: { enabled: true } }
    : { organizeImports: { enabled: false } };

  const defaultConfig = mergeConfigurations(
    mergeConfigurations(
      baseConfiguration,
      mergeConfigurations(
        mergeConfigurations(defaultFormatter, defaultLinter),
        defaultOrganized
      )
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
  private readonly projenrcFile?: string;
  /**
   * Biome configuration file content
   */
  public readonly file: JsonFile;

  constructor(project: NodeProject, options: BiomeOptions = {}) {
    super(project);
    this.configFile = "biome.jsonc";
    this.projenrcFile = this.project.components.find(
      (component) => component instanceof ProjenrcFile
    )?.filePath;
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

    this.file = new JsonFile(this, this.configFile, {
      obj: this.biomeConfiguration,
      committed: true,
      allowComments: true,
      marker: true,
    });

    const localTask = this.createLocalBiomeTask();
    project.testTask.spawn(localTask);
  }

  private createLocalBiomeTask() {
    const targetDirs: string[] = [];
    this.projenrcFile && targetDirs.push(this.projenrcFile);

    if (this.project instanceof TypeScriptProject) {
      targetDirs.push(this.project.srcdir);
      targetDirs.push(this.project.testdir);
    }

    return this.project.addTask("biome", {
      description: "Runs Biome against the codebase",
      steps: [
        {
          exec: `biome check --write ${targetDirs.join(" ")}`,
        },
      ],
    });
  }
}
