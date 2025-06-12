import { NodeProject } from "..";
import { Component } from "../../component";
import { FileBase, IResolver } from "../../file";
import { Project } from "../../project";
import {
  EslintConfigExtension,
  EslintPlugin,
  ESLintRules,
} from "./config/eslint-config";
import {
  ESLintFlatConfig,
  EslintFlatConfigOptions,
} from "./config/eslint-flat-config";

const MODULE_TYPE = {
  COMMONJS: "commonjs",
  MODULE: "module",
} as const;

export type ModuleType = (typeof MODULE_TYPE)[keyof typeof MODULE_TYPE];

/**
 * ESLint parser configuration information.
 *
 * @example
 * // Configuration with parserReference
 * {
 *   moduleSpecifier: "typescript-eslint",
 *   importedBinding: "tseslint",
 *   parserReference: "parser"
 * }
 *
 * // Results in:
 * import tseslint from "typescript-eslint"
 *
 * export default [{
 *   languageOptions: {
 *     parser: tseslint.parser
 *   }
 * }]
 *
 * // Configuration without parserReference
 * {
 *   moduleSpecifier: "@typescript-eslint/parser",
 *   importedBinding: "tseslintParser"
 * }
 *
 * // Results in:
 * import tseslintParser from "@typescript-eslint/parser"
 *
 * export default [{
 *   languageOptions: {
 *     parser: tseslintParser
 *   }
 * }]
 */
export interface EslintParser {
  /**
   * The moduleSpecifier that identifies the module to import from.
   * This is the string literal that appears in the FromClause of an ImportDeclaration.
   *
   * @example "typescript-eslint"
   * // In: import tseslint from "typescript-eslint"
   * // typescript-eslint is the moduleSpecifier
   * @see {@link https://tc39.es/ecma262/multipage/ecmascript-language-scripts-and-modules.html#prod-ModuleSpecifier}
   */
  readonly moduleSpecifier: string;

  /**
   * The importedBinding that defines the name to be bound to the module's default export.
   * This is the local name that appears in a default import declaration.
   *
   * @example "tseslint"
   * // In: import tseslint from "typescript-eslint"
   * // tseslint is the importedBinding
   * @see {@link https://tc39.es/ecma262/multipage/ecmascript-language-scripts-and-modules.html#prod-ImportedDefaultBinding}
   */
  readonly importedBinding: string;

  /**
   * The reference path to the parser in the module.
   * When specified, this string will be appended to importedBinding with a dot (.).
   * When omitted, only importedBinding will be used.
   *
   * @example
   * // With parserReference
   * {
   *   moduleSpecifier: "typescript-eslint",
   *   importedBinding: "tseslint",
   *   parserReference: "parser"
   * }
   * // Results in:
   * languageOptions: {
   *   parser: tseslint.parser
   * }
   *
   * // Without parserReference (using importedBinding)
   * {
   *   moduleSpecifier: "@typescript-eslint/parser",
   *   importedBinding: "tseslintParser"
   * }
   * // Results in:
   * languageOptions: {
   *   parser: tseslintParser
   * }
   *
   * @default - same as `importedBinding`
   */
  readonly parserReference?: string;
}

/**
 * Override information for eslint rules
 */
export interface EslintFlatConfigOverride {
  /**
   * List of files or glob patterns or directories with source files to enable.
   *
   * @example ["src/*.ts"]
   */
  readonly enablePatterns: string[];

  /**
   * List of files or glob patterns or directories with source files to ignore.
   * as .gitignore patterns.
   *
   * @example [".gitignore", "node_modules"]
   */
  readonly ignorePatterns?: string[];

  /**
   * The overridden rules
   */
  readonly rules?: ESLintRules;

  /**
   * The overridden parser
   */
  readonly parser?: EslintParser;

  /**
   * Config(s) to extend in this override
   */
  readonly extends?: EslintConfigExtension[];

  /**
   * Plugin(s) to use in this override
   */
  readonly plugins?: EslintPlugin[];
}

export interface EslintFlatConfigFileOptions extends EslintFlatConfigOptions {
  /**
   * Path to `tsconfig.json` which should be used by eslint.
   *
   * @default "./tsconfig.json"
   */
  readonly tsconfigPath?: string;

  /**
   * List of files or glob patterns or directories with source files to enable.
   *
   * @example ["src/*.ts"]
   */
  readonly enablePatterns: string[];

  /**
   * List of files or glob patterns or directories with source files to ignore.
   * as .gitignore patterns.
   *
   * @default - [ '*.js', '*.d.ts', 'node_modules/', '*.generated.ts', 'coverage' ]
   */
  readonly ignorePatterns?: string[];
  /**
   * Always try to resolve types under `<root>@types` directory even it doesn't contain any source code.
   * This prevents `import/no-unresolved` eslint errors when importing a `@types/*` module that would otherwise remain unresolved.
   * @default true
   */
  readonly tsAlwaysTryTypes?: boolean;

  /**
   * The module type of configuration file.
   * - When specified `module`, generate `eslint.config.mjs` file.
   * - When specified `commonjs`, generate `eslint.config.cjs` file.
   *
   * @default "module"
   */
  readonly moduleType?: ModuleType;
}

export interface IESLintFlatConfigFile {
  readonly config: string;
  readonly rules: ESLintRules;
  readonly enablePatterns: string[];
  readonly ignorePatterns: string[];
  readonly overrides: EslintFlatConfigOverride[];
  readonly filename: string;
  addEnablePatterns(...patterns: string[]): void;
  addIgnorePatterns(...patterns: string[]): void;
  addRules(rules: ESLintRules): void;
  addPlugins(...plugins: EslintPlugin[]): void;
  addOverrides(...overrides: EslintFlatConfigOverride[]): void;
  addExtends(...extendList: EslintConfigExtension[]): void;
}

export class EslintFlatConfigFile
  extends FileBase
  implements IESLintFlatConfigFile
{
  /**
   * Returns the singleton Eslint component of a project or undefined if there is none.
   */
  public static of(project: Project): EslintFlatConfigFile | undefined {
    const isEslint = (c: Component): c is EslintFlatConfigFile =>
      c instanceof EslintFlatConfigFile;
    return project.components.find(isEslint);
  }

  /**
   * eslint configuration.
   */
  public get config(): string {
    return this._config;
  }

  /**
   * Public getter for eslint rules.
   */
  public get rules(): ESLintRules {
    return { ...this._rules, ...this._formattingRules };
  }

  /**
   * File or glob patterns or directories that should be linted
   */
  public get enablePatterns(): string[] {
    return this._enablePatterns.size ? [...this._enablePatterns] : [];
  }

  /**
   * File or glob patterns or directories that should not be linted
   */
  public get ignorePatterns(): string[] {
    return this._ignorePatterns.size ? [...this._ignorePatterns] : [];
  }

  /**
   * eslint overrides.
   */
  public readonly overrides: EslintFlatConfigOverride[] = [];

  /**
   * eslint configuration filename.
   */
  public readonly filename: string;

  private _config: string = "";
  private _rules: ESLintRules = {};
  private _formattingRules: ESLintRules = {};
  private _enablePatterns: Set<string>;
  private _ignorePatterns: Set<string>;
  private _plugins: EslintPlugin[] = [];
  private _extends: EslintConfigExtension[] = [];
  private readonly _tsconfigPath: string;
  private readonly _tsAlwaysTryTypes: boolean;
  private readonly _moduleType: ModuleType;

  constructor(project: NodeProject, options: EslintFlatConfigFileOptions) {
    const moduleType = options.moduleType ?? MODULE_TYPE.MODULE;
    const filename = `eslint.config.${
      moduleType === MODULE_TYPE.MODULE ? "mjs" : "cjs"
    }`;
    const devDirs = options.devDirs ?? [];

    super(project, filename);

    const flatConfig = new ESLintFlatConfig(project, {
      devDirs,
      styleConfig: options.styleConfig,
    });

    // Set options to class properties
    this._enablePatterns = new Set([...options.enablePatterns, ...devDirs]);
    this._ignorePatterns = new Set(
      options.ignorePatterns ?? [
        "*.js",
        "*.d.ts",
        "node_modules/",
        "*.generated.ts",
        "coverage",
      ]
    );
    this._tsconfigPath = options.tsconfigPath ?? "./tsconfig.json";
    this._tsAlwaysTryTypes = options.tsAlwaysTryTypes ?? true;
    this._moduleType = moduleType;
    this.filename = filename;
    this._rules = flatConfig.rules;
    this.synthesize();
  }

  /**
   * Sync the config file with the current state of the class properties.
   */
  protected synthesizeContent(resolver: IResolver): string | undefined {
    this._config = this.generateConfig(resolver);
    return this._config;
  }

  /**
   * Add a file or glob pattern or directory to enable.
   *
   * @example "src/*.ts"
   */
  public addEnablePatterns(...patterns: string[]) {
    for (const pattern of patterns) {
      this._enablePatterns.add(pattern);
    }
  }

  /**
   * Add a file or glob pattern or directory to ignore.
   *
   * @example ".gitignore"
   */
  public addIgnorePatterns(...patterns: string[]) {
    for (const pattern of patterns) {
      this._ignorePatterns.add(pattern);
    }
  }

  /**
   * Add an eslint rule.
   *
   * @example { "no-console": "error" }
   */
  public addRules(rules: ESLintRules) {
    for (const [k, v] of Object.entries(rules)) {
      this._rules[k] = v;
    }
  }

  /**
   * Add eslint plugins
   * If you use a module other than the following, you need to install the module using `project.addDevDeps`.
   * - eslint
   * - @eslint/js
   * - typescript-eslint
   * - eslint-plugin-import
   * - @stylistic/eslint-plugin(when prettier is disabled)
   * - prettier(when prettier is enabled)
   * - eslint-config-prettier(when prettier is enabled)
   *
   * @param plugins ESLint plugin information.
   */
  public addPlugins(...plugins: EslintPlugin[]) {
    this._plugins.push(...plugins);
  }

  /**
   * Add an eslint override.
   * If you use a module other than the following, you need to install the module using `project.addDevDeps`.
   * - eslint
   * - @eslint/js
   * - typescript-eslint
   * - eslint-plugin-import
   * - @stylistic/eslint-plugin(when prettier is disabled)
   * - prettier(when prettier is enabled)
   * - eslint-config-prettier(when prettier is enabled)
   *
   * @param overrides Override information for eslint rules
   */
  public addOverrides(...overrides: EslintFlatConfigOverride[]) {
    this.overrides.push(...overrides);
  }

  /**
   * Adds an `extends` item to the eslint configuration.
   * If you use a module other than the following, you need to install the module using `project.addDevDeps`.
   * - eslint
   * - @eslint/js
   * - typescript-eslint
   * - eslint-plugin-import
   * - @stylistic/eslint-plugin(when prettier is disabled)
   * - prettier(when prettier is enabled)
   * - eslint-config-prettier(when prettier is enabled)
   *
   * @param extendList ESLint configuration extension information.
   */
  public addExtends(...extendList: EslintConfigExtension[]) {
    this._extends.push(...extendList);
  }

  /**
   * Generate the complete ESLint configuration
   * @returns ESLint configuration as a string
   */
  private generateConfig(resolver: IResolver): string {
    const overrideConfigs = (
      resolver.resolve(this.overrides) as EslintFlatConfigOverride[]
    ).map((override) => this.generateOverrideConfig(override));
    const importParts = `
${
  this._moduleType === MODULE_TYPE.MODULE
    ? 'import globals from "globals"'
    : 'const globals = require("globals")'
};
${this.generateImports()}    
`;

    const configParts = `
/** @type {import('eslint').Linter.Config[]} */
${
  this._moduleType === MODULE_TYPE.MODULE
    ? "export default"
    : "module.exports ="
} [
  ${this.generateExtendsConfig(resolver)},
  ${this.generateMainConfig(resolver)},
  ${overrideConfigs.join(",\n")}${overrideConfigs.length ? "," : ""}
  {
    ignores: ${this.convertArrayToString(resolver.resolve(this.ignorePatterns))}
  }
];
` // NOTE: remove empty lines
      .split("\n")
      .filter((line) => line.trim() !== "")
      .join("\n");

    return `${importParts}\n${configParts}`;
  }

  /**
   * Generate import statements for ESLint configuration based on the module type.
   * This method performs the following:
   * 1. Collects plugins, extensions, and parsers from the main configuration and overrides
   * 2. Removes duplicates based on import paths
   * 3. Generates appropriate import statements based on the module type (ESM or CommonJS)
   *
   * @returns A string containing all necessary import statements, one per line
   *
   * @example
   * //When moduleType is "module":
   * // import tseslint from "typescript-eslint"
   * // import importPlugin from "eslint-plugin-import"
   *
   * // When moduleType is "commonjs":
   * // const tseslint = require("typescript-eslint")
   * // const importPlugin = require("eslint-plugin-import")
   */
  private generateImports(): string {
    const pluginsForOverrides = this.overrides?.flatMap((override) => [
      ...(override.plugins ?? []),
      ...(override.extends ?? []),
      ...(override.parser ? [override.parser] : []),
    ]);
    const uniquePlugins = [
      ...this._plugins,
      ...this._extends,
      ...pluginsForOverrides,
    ].reduce<(EslintPlugin | EslintConfigExtension | EslintParser)[]>(
      (acc, plugin) => {
        // If the plugin is already in the array, skip it
        if (
          acc.find(
            ({ moduleSpecifier }) => moduleSpecifier === plugin.moduleSpecifier
          )
        ) {
          return acc;
        }
        return [...acc, plugin];
      },
      []
    );
    return uniquePlugins
      .map(({ importedBinding, moduleSpecifier }) =>
        this._moduleType === MODULE_TYPE.MODULE
          ? `import ${importedBinding} from "${moduleSpecifier}"`
          : `const ${importedBinding} = require("${moduleSpecifier}")`
      )
      .join("\n");
  }

  /**
   * Generate extends configuration for ESLint.
   * Processes the list of configuration extensions, resolving any plugin references
   * and handling spread operators as needed.
   *
   * @returns A string containing the extends configuration, with each extension on a new line
   */
  private generateExtendsConfig(resolver: IResolver): string {
    const eslintConfigExtensions = this._extends.reduce<
      EslintConfigExtension[]
    >((acc, extend) => {
      // If the extend is already in the array, skip it
      if (
        acc.find(
          ({ moduleSpecifier }) => moduleSpecifier === extend.moduleSpecifier
        )
      ) {
        return acc;
      }

      // If specified in plugins, rewrite information in extends
      const plugin = this._plugins.find(
        ({ moduleSpecifier }) => moduleSpecifier === extend.moduleSpecifier
      );

      // If the plugin is not found, return the original extend
      if (!plugin) return [...acc, extend];

      // Otherwise, rewrite the configReference with the pluginName
      return [
        ...acc,
        {
          importedBinding: plugin.importedBinding,
          moduleSpecifier: plugin.moduleSpecifier,
          configReference: (
            extend.configReference ?? extend.importedBinding
          ).replace(
            // replace the first part of the extendsCode with the pluginName
            /^[^.]+/,
            plugin.importedBinding
          ),
          spreadConfig: extend.spreadConfig,
        },
      ];
    }, []);

    return (resolver.resolve(eslintConfigExtensions) as EslintConfigExtension[])
      .map(({ spreadConfig, configReference, importedBinding }) =>
        spreadConfig
          ? `...${configReference ?? importedBinding}`
          : configReference ?? importedBinding
      )
      .join(",\n  ");
  }

  /**
   * Generate main ESLint configuration
   * @returns Main configuration as a string
   */
  private generateMainConfig(resolver: IResolver): string {
    return `{
    files: ${this.convertArrayToString(
      resolver.resolve([...this._enablePatterns])
    )},
    languageOptions: { 
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        project: "${this._tsconfigPath}",
      },
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          project: "${this._tsconfigPath}",
          ${this._tsAlwaysTryTypes !== false ? "alwaysTryTypes: true" : ""},
        }
      },
    },
    plugins: {
      ${this.convertPluginsToString(resolver.resolve(this._plugins), "      ")}
    },
    rules: {
      ${this.convertRulesToString(resolver.resolve(this.rules), "      ")}
    }
  }`;
  }

  /**
   * Generate override configuration for ESLint.
   * Creates configuration object for override, including their specific
   * extends, parser options, files patterns, plugins, and rules.
   *
   * @returns A string containing override configuration
   */
  private generateOverrideConfig(override: EslintFlatConfigOverride): string {
    const plugins = [...this._plugins, ...this._extends];
    const overridePlugins = override.plugins ?? [];
    const overrideIgnorePatterns = override.ignorePatterns ?? [];
    const codeReferences = override.extends
      ? override.extends
          .map((extend) =>
            extend.spreadConfig
              ? `...${extend.configReference ?? extend.importedBinding}`
              : extend.configReference ?? extend.importedBinding
          )
          .join(",\n  ")
      : "";

    return `
  {
    ${codeReferences}${
      override.parser
        ? `
    languageOptions: {
      ${this.convertParserToString(override.parser, plugins)}
    },`
        : ""
    }
    files: ${this.convertArrayToString(override.enablePatterns)},
    ${
      overridePlugins.length
        ? `plugins: {
      ${this.convertPluginsToString(overridePlugins, "      ")}
    },`
        : ""
    }
    rules: {
      ${this.convertRulesToString(override.rules ?? {}, "      ")}
    }
    ${
      overrideIgnorePatterns.length
        ? `ignores: ${this.convertArrayToString(overrideIgnorePatterns)}`
        : ""
    }
  }`;
  }

  /**
   * Converts a parser configuration into a string representation for the ESLint configuration file.
   * If the parser's import path matches a plugin in the provided list, the parser reference is updated
   * to use the plugin's module name.
   *
   * @param parser - The parser configuration to convert
   * @param plugins - List of available plugins and extensions that might contain the parser module
   * @returns A string in the format `parser: moduleName.parser` where moduleName is either from a matching plugin or the original parser
   */
  private convertParserToString(
    parser: EslintParser,
    plugins: (EslintPlugin | EslintConfigExtension)[]
  ): string {
    // If specified in plugins, rewrite information in extends
    const plugin = plugins.find(
      ({ moduleSpecifier }) => moduleSpecifier === parser.moduleSpecifier
    );

    const parserPath = parser.parserReference
      ? `${parser.importedBinding}.${parser.parserReference}`
      : parser.importedBinding;

    if (plugin) {
      return `parser: ${parserPath.replace(/^[^.]+/, plugin.importedBinding)}`;
    }
    return `parser: ${parserPath}`;
  }

  /**
   * Converts an array of elements into a string representation suitable for ESLint configuration.
   * Each element is wrapped in quotes and joined with commas.
   *
   * @param element - The array to convert
   * @returns A string representation of the array with quoted elements
   */
  private convertArrayToString(element: unknown[]): string {
    return `[${element.map((e) => `"${e}"`).join(", ")}]`;
  }

  /**
   * Converts an array of ESLint plugins into a string representation for the configuration file.
   * Each plugin is formatted as a key-value pair where the key is the plugin alias and the value is the module name.
   *
   * @param plugins - Array of ESLint plugin configurations
   * @param spaceStringForEachPlugin - Indentation string to use for formatting
   * @returns A formatted string of plugin configurations
   */
  private convertPluginsToString(
    plugins: EslintPlugin[],
    spaceStringForEachPlugin: string
  ): string {
    if (!plugins.length) return "";
    return plugins
      .map((plugin) => {
        if (
          plugin.pluginAlias === "@typescript-eslint" &&
          !plugin.importedBinding.includes(".")
        ) {
          return `"${plugin.pluginAlias}": ${plugin.importedBinding}.plugin`;
        } else return `"${plugin.pluginAlias}": ${plugin.importedBinding}`;
      })
      .join(`,\n${spaceStringForEachPlugin}`);
  }

  /**
   * Converts an object containing ESLint rules into a string representation for the configuration file.
   * Each rule is formatted as a key-value pair where the key is the rule name and the value is the stringified rule configuration.
   *
   * @param rules - Object containing ESLint rules and their configurations
   * @param spaceStringForEachRule - Indentation string to use for formatting
   * @returns A formatted string of rule configurations
   */
  private convertRulesToString(
    rules: ESLintRules,
    spaceStringForEachRule: string
  ): string {
    if (!Object.keys(rules).length) return "";
    return Object.keys(rules)
      .map(
        (key) => `"${key}": ${JSON.stringify(rules[key as keyof typeof rules])}`
      )
      .join(`,\n${spaceStringForEachRule}`);
  }
}
