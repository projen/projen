import { camel } from "case";
import { IESLintConfig } from "./config";
import { ModuleImports } from "../private/modules";

/**
 * The configuration for a set of files.
 *
 * @see https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects
 */
export interface ConfigObject {
  /**
   * A string to identify the configuration object. Used in error messages and
   * inspection tools.
   */
  readonly name?: string;
  /**
   * Path to the directory where the configuration object should apply.
   * `files` and `ignores` patterns in the configuration object are
   * interpreted as relative to this path.
   */
  readonly basePath?: string;
  /**
   * An array of glob patterns indicating the files that the configuration
   * object should apply to. If not specified, the configuration object applies
   * to all files
   */
  readonly files?: string[];
  /**
   * An array of glob patterns indicating the files that the configuration
   * object should not apply to. If not specified, the configuration object
   * applies to all files matched by files
   */
  readonly ignores?: string[];
  /**
   * The name of the language used for linting. This is used to determine the
   * parser and other language-specific settings.
   * @since 9.7.0
   */
  readonly language?: string;
  /**
   * An object containing settings related to how the language is configured for
   * linting.
   */
  readonly languageOptions?: Record<string, unknown>;
  /**
   * An object containing settings related to the linting process
   */
  readonly linterOptions?: LinterOptionsConfig;
  /**
   * An object containing a name-value mapping of plugin names to plugin objects.
   * When files is specified, these plugins are only available to the matching files.
   */
  readonly plugins?: Record<string, Plugin>;
  /**
   * An object containing the configured rules. When files or ignores are specified,
   * these rule configurations are only available to the matching files.
   */
  readonly rules?: Record<string, unknown>;
  /**
   * An object containing name-value pairs of information that should be
   * available to all rules.
   */
  readonly settings?: Record<string, unknown>;
}

/**
 * Config with extends. Valid only inside of `defineConfig()`.
 */
export interface ConfigWithExtends extends ConfigObject {
  readonly extends?: Extends[];
}

/**
 * Extends an existing config
 * @todo
 */
export class Extends {
  public static fromName(configName: string): Extends {
    return new Extends(configName);
  }

  public static fromConfig(config: IESLintConfig): Extends {
    return new Extends(config);
  }

  private constructor(public readonly config: any) {}

  public toJSON() {
    return this.config;
  }
}

/**
 * Represents the configuration options for the core linter.
 */
export interface LinterOptionsConfig {
  /**
   * Indicates whether or not inline configuration is evaluated.
   */
  readonly noInlineConfig?: boolean;
  /**
   * Indicates what to do when an unused disable directive is found.
   */
  readonly reportUnusedDisableDirectives?: boolean | Severity;
  /**
   * A severity value indicating if and how unused inline configs should be
   * tracked and reported.
   */
  readonly reportUnusedInlineConfigs?: Severity;
}

/**
 * A plugin is an object that contains rules. It can be a local plugin or a
 * shared plugin.
 */
export class Plugin {
  public static fromName(pluginName: string): Plugin {
    if (pluginName.startsWith("@")) {
      return Plugin.fromPackage(`${pluginName}/eslint-plugin`, pluginName);
    }
    return Plugin.fromPackage(`eslint-plugin-${pluginName}`, pluginName);
  }

  public static fromPackage(plugin: string, name: string): Plugin {
    return new Plugin(plugin, name);
  }

  public readonly imports: ModuleImports = new ModuleImports();
  private readonly name: string;
  private readonly alias: string;

  private constructor(pkg: string, name: string) {
    this.name = name;

    // sanitize to a valid JS name
    this.alias = camel(name);
    this.imports.default(pkg, this.alias);
  }

  public toJSON() {
    return {
      [this.name]: () => this.alias,
    };
  }
}

/**
 * The severity levels used in a configuration.
 */
export enum Severity {
  OFF = "off",
  WARN = "warn",
  ERROR = "error",
}
