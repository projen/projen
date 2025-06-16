import { NodeProject } from "..";
import { Component } from "../../component";
import { FileBase, IResolver } from "../../file";
import { Project } from "../../project";
import {
  EslintConfigExtension,
  EslintGlobalConf,
  EslintLanguageOptions,
  EslintParser,
  EslintPlugin,
  EslintRules,
  EslintSettings,
  IEslintConfig,
} from "./config/eslint-config";

const MODULE_TYPE = {
  COMMONJS: "commonjs",
  MODULE: "module",
} as const;

export type ModuleType = (typeof MODULE_TYPE)[keyof typeof MODULE_TYPE];

export interface EslintFlatConfigFileOptions {
  /**
   * ESLint configuration.
   */
  readonly config: IEslintConfig;

  /**
   * Path to `tsconfig.json` which should be used by eslint.
   *
   * @default "./tsconfig.json"
   */
  readonly tsconfigPath?: string;

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

export interface IEslintFlatConfigFile {
  readonly content: string;
  readonly filename: string;
  updateConfig(config: IEslintConfig): void;
  synthesize(): void;
}

export class EslintFlatConfigFile
  extends FileBase
  implements IEslintFlatConfigFile
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
   * eslint configuration content.
   */
  public get content(): string {
    return this._content;
  }

  /**
   * eslint configuration filename.
   */
  public readonly filename: string;

  private _content: string = "";
  private _config: IEslintConfig;
  private readonly _tsconfigPath: string;
  private readonly _tsAlwaysTryTypes: boolean;
  private readonly _moduleType: ModuleType;

  constructor(project: NodeProject, options: EslintFlatConfigFileOptions) {
    const moduleType = options.moduleType ?? MODULE_TYPE.MODULE;
    const filename = `eslint.config.${
      moduleType === MODULE_TYPE.MODULE ? "mjs" : "cjs"
    }`;

    super(project, filename);

    // Set options to class properties
    this._config = options.config;
    this._tsconfigPath = options.tsconfigPath ?? "./tsconfig.json";
    this._tsAlwaysTryTypes = options.tsAlwaysTryTypes ?? true;
    this._moduleType = moduleType;
    this.filename = filename;

    this.synthesize();
  }

  /**
   * update ESLint configuration.
   */
  public updateConfig(config: IEslintConfig): void {
    this._config = config;
  }

  /**
   * Sync the config file with the current state of the class properties.
   */
  protected synthesizeContent(resolver: IResolver): string | undefined {
    this._content = this.generateConfig(resolver);
    return this._content;
  }

  /**
   * Generate the complete ESLint configuration
   * @returns ESLint configuration as a string
   */
  private generateConfig(resolver: IResolver): string {
    const overrideConfigs = (
      resolver.resolve(this._config.overrides ?? []) as IEslintConfig[]
    ).map((override) => this.generateOverrideConfig(override));

    const importParts = `
${
  this._moduleType === MODULE_TYPE.MODULE
    ? 'import globals from "globals"'
    : 'const globals = require("globals")'
}
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
    ignores: ${this.convertArrayToString(
      resolver.resolve(this._config.ignorePatterns ?? [])
    )}
  }
];
`
      // NOTE: remove empty lines
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
    const pluginsForOverrides = (this._config.overrides ?? []).flatMap(
      (override) => [
        ...(override.plugins ?? []),
        ...(override.extensions ?? []),
        ...(override.languageOptions?.parser
          ? [override.languageOptions.parser]
          : []),
      ]
    );
    const uniquePlugins = [
      ...(this._config.plugins ?? []),
      ...(this._config.extensions ?? []),
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
    const eslintConfigExtensions = (this._config.extensions ?? []).reduce<
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

      // Otherwise, rewrite the configReference with the pluginName
      return [
        ...acc,
        {
          importedBinding: extend.importedBinding,
          moduleSpecifier: extend.moduleSpecifier,
          configReference: (
            extend.configReference ?? extend.importedBinding
          ).replace(
            // replace the first part of the extendsCode with the pluginName
            /^[^.]+/,
            extend.importedBinding
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
      resolver.resolve([...this._config.enablePatterns])
    )},
    languageOptions: {
      ${this.convertLanguageOptionsToString(
        resolver.resolve(this._config.languageOptions ?? {}),
        "      "
      )}
    },
    settings: {
      ${this.convertSettingsToString(
        resolver.resolve(this._config.settings ?? {}),
        "      "
      )}
    },
    plugins: {
      ${this.convertPluginsToString(
        resolver.resolve(this._config.plugins ?? []),
        "      "
      )}
    },
    rules: {
      ${this.convertRulesToString(
        resolver.resolve(this._config.rules ?? {}),
        "      "
      )}
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
  private generateOverrideConfig(override: IEslintConfig): string {
    const codeReferences =
      override.extensions
        ?.map((extend) =>
          extend.spreadConfig
            ? `...${extend.configReference ?? extend.importedBinding}`
            : extend.configReference ?? extend.importedBinding
        )
        .join(",\n  ") ?? "";

    const sections = [
      codeReferences,
      override.enablePatterns.length &&
        `files: ${this.convertArrayToString(override.enablePatterns)}`,
      override.languageOptions &&
        `languageOptions: {
      ${this.convertLanguageOptionsToString(override.languageOptions, "      ")}
    }`,
      override.settings &&
        `settings: {
      ${this.convertSettingsToString(override.settings, "      ")}
    }`,
      override.plugins?.length &&
        `plugins: {
      ${this.convertPluginsToString(override.plugins, "      ")}
    }`,
      `rules: {
      ${this.convertRulesToString(override.rules ?? {}, "      ")}
    }`,
      override.ignorePatterns?.length &&
        `ignores: ${this.convertArrayToString(override.ignorePatterns)}`,
    ].filter(Boolean);

    return `
  {
    ${sections.join(",\n    ")}
  }`;
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
   * Converts an object containing ESLint rules into a string representation for the configuration file.
   * Each rule is formatted as a key-value pair where the key is the rule name and the value is the stringified rule configuration.
   *
   * @param rules - Object containing ESLint rules and their configurations
   * @param spaceStringForEachRule - Indentation string to use for formatting
   * @returns A formatted string of rule configurations
   */
  private convertRulesToString(
    rules: EslintRules,
    spaceStringForEachRule: string
  ): string {
    if (!Object.keys(rules).length) return "";
    return Object.keys(rules)
      .map(
        (key) => `"${key}": ${JSON.stringify(rules[key as keyof typeof rules])}`
      )
      .join(`,\n${spaceStringForEachRule}`);
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
        }
        return `"${plugin.pluginAlias}": ${plugin.importedBinding}`;
      })
      .join(`,\n${spaceStringForEachPlugin}`);
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
   * Convert language options into a string representation for the ESLint configuration file.
   * @returns Language options as a string
   */
  private convertLanguageOptionsToString(
    languageOptions: EslintLanguageOptions,
    spaceStringForEachLanguageOption: string
  ): string {
    if (!Object.keys(languageOptions).length) return "";
    return [
      Object.keys(languageOptions.globals ?? {}).length &&
        `globals: {${this.generateGlobals(languageOptions.globals!)}}`,
      Object.keys(languageOptions.parser ?? {}).length &&
        this.convertParserToString(languageOptions.parser!, [
          ...(this._config.plugins ?? []),
          ...(this._config.extensions ?? []),
        ]),
      languageOptions.parserOptions &&
        `parserOptions: {
${spaceStringForEachLanguageOption + "  "}${this.generateParserOptions(
          languageOptions.parserOptions,
          spaceStringForEachLanguageOption + "  "
        )}
${spaceStringForEachLanguageOption}}`,
    ]
      .filter(Boolean)
      .join(`,\n${spaceStringForEachLanguageOption}`);
  }

  /**
   * Generate globals configuration
   * @returns Globals configuration as a string
   */
  private generateGlobals(globals: {
    [name: string]: EslintGlobalConf;
  }): string {
    return Object.entries(globals)
      .map(([key, value]) => {
        if (typeof value === "boolean") return `...globals.${key}`;
        return `${key}: "${value}"`;
      })
      .join(", ");
  }

  /**
   * Generate parser options configuration
   * @returns Parser options configuration as a string
   */
  private generateParserOptions(
    parserOptions: NonNullable<EslintLanguageOptions["parserOptions"]>,
    spaceStringForParserOptions: string
  ): string {
    const entries = [
      parserOptions.ecmaVersion &&
        `ecmaVersion: ${
          typeof parserOptions.ecmaVersion === "string"
            ? `"${parserOptions.ecmaVersion}"`
            : parserOptions.ecmaVersion
        }`,
      parserOptions.sourceType && `sourceType: "${parserOptions.sourceType}"`,
      `project: ${
        parserOptions.project === this._tsconfigPath
          ? `"${this._tsconfigPath}"`
          : parserOptions.project
          ? `"${parserOptions.project}"`
          : `"${this._tsconfigPath}"`
      }`,
    ].filter(Boolean);
    return entries.join(`,\n${spaceStringForParserOptions}`);
  }

  /**
   * Convert settings into a string representation for the ESLint configuration file.
   * @returns Settings as a string
   */
  private convertSettingsToString(
    settings: EslintSettings,
    spaceStringForEachSetting: string
  ): string {
    if (!Object.keys(settings).length) return "";
    return Object.entries(settings)
      .map(([key, value]) => {
        return `"${key}": ${this.convertSettingsValueToString(
          value,
          spaceStringForEachSetting
        )}`;
      })
      .join(`,\n${spaceStringForEachSetting}`);
  }

  /**
   * Convert a settings value into a string representation, handling special cases like TypeScript resolver
   */
  private convertSettingsValueToString(
    value: unknown,
    indentation: string
  ): string {
    if (!this.isRecordType(value)) {
      return JSON.stringify(value);
    }
    if (!this.hasTypescriptProperty(value)) {
      return this.convertObjectToString(value, indentation + "  ");
    }

    const typescript = value.typescript;
    if (!this.isRecordType(typescript)) {
      return this.convertObjectToString(value, indentation + "  ");
    }

    return this.convertObjectToString(
      {
        ...value,
        typescript: {
          ...typescript,
          project:
            this.getStringProperty(typescript, "project") ?? this._tsconfigPath,
          alwaysTryTypes:
            this.getBooleanProperty(typescript, "alwaysTryTypes") ??
            this._tsAlwaysTryTypes,
        },
      },
      indentation + "  "
    );
  }

  /**
   * Convert an object to a string representation
   */
  private convertObjectToString(
    obj: Record<string, unknown>,
    indentation: string
  ): string {
    const entries = Object.entries(obj).map(([key, value]) => {
      const valueStr = this.isRecordType(value)
        ? this.convertObjectToString(value, indentation + "  ")
        : JSON.stringify(value);
      return `"${key}": ${valueStr}`;
    });

    return `{
${indentation}${entries.join(`,\n${indentation}`)}
${indentation.slice(2)}}`;
  }

  private isRecordType(arg: unknown): arg is Record<string, unknown> {
    return typeof arg === "object" && arg !== null && !Array.isArray(arg);
  }

  private hasTypescriptProperty(
    obj: Record<string, unknown>
  ): obj is Record<string, unknown> & { typescript: unknown } {
    return (
      "typescript" in obj &&
      typeof obj.typescript === "object" &&
      obj.typescript !== null
    );
  }

  private getStringProperty(
    obj: Record<string, unknown>,
    key: string
  ): string | undefined {
    const value = obj[key];
    return typeof value === "string" ? value : undefined;
  }

  private getBooleanProperty(
    obj: Record<string, unknown>,
    key: string
  ): boolean | undefined {
    const value = obj[key];
    return typeof value === "boolean" ? value : undefined;
  }
}
