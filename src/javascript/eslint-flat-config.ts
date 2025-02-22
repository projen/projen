import * as fs from "fs";
import * as path from "path";
import { Component } from "../component";
import { EslintCommandOptions, NodeProject } from "../javascript";
import { Project } from "../project";
import { Task } from "../task";
import { TaskStepOptions } from "../task-model";
import { Prettier } from "./prettier";

const MODULE_TYPE = {
  COMMONJS: "commonjs",
  MODULE: "module",
} as const;

type ModuleType = (typeof MODULE_TYPE)[keyof typeof MODULE_TYPE];
type Rules = { [rule: string]: any };

/**
 * ESLint plugin configuration information.
 *
 * @example
 * ```ts
 * // Configuration
 * {
 *   importPath: "typescript-eslint",
 *   moduleName: "tseslint",
 *   pluginAlias: "@typescript-eslint"
 * }
 *
 * // Results in:
 * import tseslint from "typescript-eslint"
 *
 * export default [{
 *   plugins: {
 *     "@typescript-eslint": tseslint
 *   }
 * }]
 * ```
 */
export interface EslintPlugin {
  /**
   * The module import path.
   *
   * @example "typescript-eslint"
   */
  importPath: string;

  /**
   * The local module name to use in the import statement.
   *
   * @example "tseslint"
   */
  moduleName: string;

  /**
   * The plugin alias to use in the ESLint configuration.
   *
   * @example "@typescript-eslint"
   */
  pluginAlias: string;
}

/**
 * ESLint configuration extension information.
 *
 * @example
 * ```ts
 * // Configuration without spread
 * {
 *   importPath: "eslint-plugin-prettier",
 *   moduleName: "prettierPlugin",
 *   configReference: "prettierPlugin"
 * }
 *
 * // Results in:
 * import prettierPlugin from "eslint-plugin-prettier"
 * export default [
 *   prettierPlugin,
 *   // ...
 * ]
 *
 * // Configuration with spread
 * {
 *   importPath: "eslint-plugin-prettier",
 *   moduleName: "prettierPlugin",
 *   configReference: "prettierPlugin",
 *   shouldSpreadConfig: true
 * }
 *
 * // Results in:
 * import prettierPlugin from "eslint-plugin-prettier"
 * export default [
 *   ...prettierPlugin,
 *   // ...
 * ]
 * ```
 */
export interface EslintConfigExtension {
  /**
   * The module import path.
   *
   * @example "eslint-plugin-prettier"
   */
  importPath: string;

  /**
   * The local module name to use in the import statement.
   *
   * @example "prettierPlugin"
   */
  moduleName: string;

  /**
   * The configuration reference to be used in the extends section.
   * This can be a plugin name or a specific configuration path from the plugin.
   *
   * @example
   * - "prettierPlugin" // Direct plugin reference
   * - "eslint.configs.recommended" // Specific configuration path
   */
  configReference: string;

  /**
   * Indicates whether the configuration should be spread using the spread operator.
   * When true, the configuration will be included as `...configReference`,
   * when false, it will be included as `configReference`.
   *
   * @example
   * true  -> ...eslint.configs.recommended
   * false -> eslint.configs.recommended
   *
   * @default false
   */
  shouldSpreadConfig?: boolean;
}

/**
 * ESLint parser configuration information.
 *
 * @example
 * ```ts
 * // Configuration
 * {
 *   importPath: "typescript-eslint",
 *   moduleName: "tseslint",
 *   parserReference: "tseslint.parser"
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
 * ```
 */
export interface EslintParser {
  /**
   * The module import path.
   *
   * @example "typescript-eslint"
   */
  importPath: string;

  /**
   * The local module name to use in the import statement.
   *
   * @example "tseslint"
   */
  moduleName: string;

  /**
   * The reference path to the parser in the module.
   * Specifies how to access the parser from the imported module.
   *
   * @example
   * ```ts
   * // When importing from typescript-eslint as "tseslint"
   * parserReference: "tseslint.parser"
   * // Results in:
   * languageOptions: {
   *   parser: tseslint.parser
   * }
   * ```
   */
  parserReference: string;
}

export interface EslintFlatConfigOptions {
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
   * Files or glob patterns or directories with source files that include tests and build tools.
   * These sources are linted but may also import packages from `devDependencies`.
   *
   * @default []
   */
  readonly devDirs?: string[];

  /**
   * Options for eslint command executed by eslint task
   */
  readonly commandOptions?: EslintFlatConfigCommandOptions;

  /**
   * Enable prettier for code formatting
   * @default false
   */
  readonly prettier?: boolean;

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

export interface EslintFlatConfigCommandOptions {
  /**
   * Whether to fix eslint issues when running the eslint task
   *
   * @default true
   */
  readonly fix?: boolean;

  /**
   * Extra flag arguments to pass to eslint command
   */
  readonly extraArgs?: string[];
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
  readonly rules?: Rules;

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

export class EslintFlatConfig extends Component {
  /**
   * Returns the singleton Eslint component of a project or undefined if there is none.
   */
  public static of(project: Project): EslintFlatConfig | undefined {
    const isEslint = (c: Component): c is EslintFlatConfig =>
      c instanceof EslintFlatConfig;
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
  public get rules(): Rules {
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

  public get eslintTask(): Task {
    return this._eslintTask;
  }

  /**
   * eslint overrides.
   */
  public readonly overrides: EslintFlatConfigOverride[] = [];

  private _config: string = "";
  private _filename: string = "";
  private _rules: Rules = {};
  private _formattingRules: Rules = {};
  private _enablePatterns: Set<string>;
  private _ignorePatterns: Set<string>;
  private _plugins: EslintPlugin[] = [];
  private _extends: EslintConfigExtension[] = [];
  private _eslintTask: Task;
  private readonly _tsconfigPath: string;
  private readonly _devDirs: string[];
  private readonly _tsAlwaysTryTypes: boolean;
  private readonly _moduleType: ModuleType;
  private readonly _nodeProject: NodeProject;

  constructor(project: NodeProject, options: EslintFlatConfigOptions) {
    super(project);

    this._nodeProject = project;

    this.initializeProject(project);
    this.initializePluginsAndExtends();

    // Set options to class properties
    this._devDirs = options.devDirs ?? [];
    this._enablePatterns = new Set([
      ...options.enablePatterns,
      ...this._devDirs,
    ]);
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
    this._moduleType = options.moduleType ?? "module";
    this._filename = `eslint.config.${
      this._moduleType === MODULE_TYPE.MODULE ? "mjs" : "cjs"
    }`;
    this._eslintTask = this.project.addTask("eslint", {
      description: "Runs eslint against the codebase",
    });

    this.initializeRules();
    this.initializeCodeFormatter(project, options);
    this.initializeEslintTask(options.commandOptions);
    this.project.testTask.spawn(this._eslintTask);
    this.synthesize();
  }

  /**
   * Sync the config file with the current state of the class properties.
   */
  public synthesize() {
    this._config = this.generateConfig();
    const projectDir = this.project.outdir;
    const configFile = path.join(projectDir, this._filename);
    fs.writeFileSync(configFile, this._config);
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
  public addRules(rules: Rules) {
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
   * Initialize project dependencies and configurations
   * @param project - The NodeProject instance
   */
  private initializeProject(project: NodeProject): void {
    project.addDevDeps(
      "globals",
      "eslint@^9",
      "@eslint/js@^9",
      "typescript-eslint@^8",
      "@typescript-eslint/parser@^8",
      "eslint-plugin-import",
      "eslint-import-resolver-typescript",
      // `@stylistic/eslint-plugin` is used even if prettier is enabled
      "@stylistic/eslint-plugin@^2"
    );
    project.npmignore?.exclude("eslint.config.mjs");
  }

  /**
   * Initialize plugins and extends for ESLint configuration
   */
  private initializePluginsAndExtends(): void {
    this.addPlugins(
      {
        importPath: "typescript-eslint",
        moduleName: "tseslint",
        pluginAlias: "@typescript-eslint",
      },
      {
        importPath: "eslint-plugin-import",
        moduleName: "importPlugin",
        pluginAlias: "import",
      },
      // `@stylistic/eslint-plugin` is used even if prettier is enabled
      {
        importPath: "@stylistic/eslint-plugin",
        moduleName: "stylistic",
        pluginAlias: "@stylistic",
      }
    );
    this.addExtends(
      {
        importPath: "@eslint/js",
        moduleName: "eslint",
        configReference: "eslint.configs.recommended",
      },
      {
        importPath: "eslint-plugin-import",
        moduleName: "importPlugin",
        configReference: "importPlugin.flatConfigs.typescript",
      }
    );
  }

  /**
   * Initialize default ESLint rules
   */
  private initializeRules(): void {
    this._rules = {
      // Require use of the `import { foo } from 'bar';` form instead of `import foo = require('bar');`
      "@typescript-eslint/no-require-imports": "error",

      // Require all imported dependencies are actually declared in package.json
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: this.renderDevDepsAllowList(), // Only allow importing devDependencies from "devDirs".
          optionalDependencies: false, // Disallow importing optional dependencies (those shouldn't be in use in the project)
          peerDependencies: true, // Allow importing peer dependencies (that aren't also direct dependencies)
        },
      ],

      // Require all imported libraries actually resolve (!!required for import/no-extraneous-dependencies to work!!)
      "import/no-unresolved": "error",

      // Require an ordering on all imports
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external"],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // Cannot import from the same module twice
      "import/no-duplicates": "error",

      // Cannot shadow names
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",

      // Required spacing in property declarations (copied from TSLint, defaults are good)
      "@stylistic/key-spacing": "error",

      // No multiple empty lines
      "@stylistic/no-multiple-empty-lines": "error",

      // One of the easiest mistakes to make
      "@typescript-eslint/no-floating-promises": "error",

      // Make sure that inside try/catch blocks, promises are 'return await'ed
      // (must disable the base rule as it can report incorrect errors)
      "no-return-await": "off",
      "@typescript-eslint/return-await": "error",

      // Useless diff results
      "@stylistic/no-trailing-spaces": "error",

      // Must use foo.bar instead of foo['bar'] if possible
      "dot-notation": "error",

      // Are you sure | is not a typo for || ?
      "no-bitwise": "error",

      // Member ordering
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "public-static-field",
            "public-static-method",
            "protected-static-field",
            "protected-static-method",
            "private-static-field",
            "private-static-method",
            "field",
            "constructor",
            "method",
          ],
        },
      ],
    };
  }

  /**
   * Initialize code formatting configuration for the project.
   * Sets up either Prettier or Stylistic ESLint plugin based on project configuration.
   *
   * @param project - The NodeProject instance
   * @param options - ESLint configuration options
   */
  private initializeCodeFormatter(
    project: NodeProject,
    options: EslintFlatConfigOptions
  ): void {
    if (options.prettier || Prettier.of(project)) {
      this.initializePrettierFormatter();
    } else {
      this.initializeStylisticFormatter();
    }
  }

  /**
   * Initializes code formatting configuration using Prettier.
   * This method performs the following:
   * 1. Adds Prettier-related dependencies
   * 2. Clears formatting rules (to prioritize Prettier's rules)
   * 3. Adds Prettier configuration to ESLint extends
   *
   * @remarks
   * When this method is executed, Stylistic plugin's formatting rules are disabled,
   * and Prettier takes control of all code formatting instead.
   */
  private initializePrettierFormatter() {
    this._nodeProject.addDevDeps("prettier", "eslint-config-prettier");
    this._formattingRules = {};
    this.addExtends({
      importPath: "eslint-config-prettier",
      moduleName: "prettierConfig",
      configReference: "prettierConfig",
    });
  }

  /**
   * Initializes code formatting configuration using the Stylistic ESLint plugin.
   * This method performs the following:
   * 1. Adds Stylistic plugin dependencies
   * 2. Configures the plugin in ESLint
   * 3. Sets up formatting rules for consistent code style
   *
   * @remarks
   * The Stylistic plugin provides granular control over code formatting through ESLint rules,
   * offering an alternative to Prettier for code style enforcement.
   *
   * @returns An object containing the configured formatting rules
   */
  private initializeStylisticFormatter() {
    this._formattingRules = {
      indent: "off",
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "single", { avoidEscape: true }],
      "@stylistic/comma-dangle": ["error", "always-multiline"], // ensures clean diffs, see https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8
      "@stylistic/comma-spacing": ["error", { before: false, after: true }], // space after, no space before
      "@stylistic/no-multi-spaces": ["error", { ignoreEOLComments: false }], // no multi spaces
      "@stylistic/array-bracket-spacing": ["error", "never"], // [1, 2, 3]
      "@stylistic/array-bracket-newline": ["error", "consistent"], // enforce consistent line breaks between brackets
      "@stylistic/object-curly-spacing": ["error", "always"], // { key: 'value' }
      "@stylistic/object-curly-newline": [
        "error",
        { multiline: true, consistent: true },
      ], // enforce consistent line breaks between braces
      "@stylistic/object-property-newline": [
        "error",
        { allowAllPropertiesOnSameLine: true },
      ], // enforce "same line" or "multiple line" on object properties
      "@stylistic/keyword-spacing": "error", // require a space before & after keywords
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }], // enforce one true brace style
      "@stylistic/space-before-blocks": "error", // require space before blocks
      curly: ["error", "multi-line", "consistent"], // require curly braces for multiline control statements
      "@stylistic/member-delimiter-style": "error",
      "@stylistic/semi": ["error", "always"],
      "@stylistic/max-len": [
        "error",
        {
          code: 150,
          ignoreUrls: true, // Most common reason to disable it
          ignoreStrings: true, // These are not fantastic but necessary for error messages
          ignoreTemplateLiterals: true,
          ignoreComments: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "@stylistic/quote-props": ["error", "consistent-as-needed"],
    };
  }

  /**
   * Initializes and updates the ESLint task configuration.
   * This method performs the following:
   * 1. Sets up the base ESLint command
   * 2. Configures command line arguments including config file path
   * 3. Adds the `--fix` flag if the fix option is enabled
   * 4. Updates the ESLint task while preserving existing task settings
   *
   * @param options - Configuration options for the ESLint task
   * @remarks
   * - Preserves existing step options (args, condition, cwd, env, name, receiveArgs) when updating the task
   * - Maintains any externally edited task configurations if they exist
   */
  private initializeEslintTask(options?: EslintCommandOptions) {
    const taskExecCommand = "eslint";
    const extraArgs = options?.extraArgs ?? [];
    const cliArgs = new Set(["--config", this._filename, ...extraArgs]);
    if (options?.fix) {
      cliArgs.add("--fix");
    }
    this._eslintTask.reset(
      [taskExecCommand, ...cliArgs].join(" "),
      this.buildTaskStepOptions(taskExecCommand)
    );
  }

  /**
   * In case of external editing of the eslint task step, we preserve those changes.
   * Otherwise, we return the default task step options.
   *
   * @param taskExecCommand The command that the ESLint tasks executes
   * @returns Either the externally edited, or the default task step options
   */
  private buildTaskStepOptions(taskExecCommand: string): TaskStepOptions {
    const currentEslintTaskStep = this.eslintTask?.steps?.find((step) =>
      step?.exec?.startsWith?.(taskExecCommand)
    );

    if (currentEslintTaskStep) {
      const { args, condition, cwd, env, name, receiveArgs } =
        currentEslintTaskStep;
      return {
        args,
        condition,
        cwd,
        env,
        name,
        receiveArgs,
      };
    }

    return {
      receiveArgs: true,
    };
  }

  /**
   * Generate the complete ESLint configuration
   * @returns ESLint configuration as a string
   */
  private generateConfig(): string {
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
  ${this.generateExtendsConfig()},
  ${this.generateMainConfig()},
  ${this.generateOverridesConfig()}
  {
    ignores: ${this.convertArrayToString(this.ignorePatterns)}
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
        if (acc.find(({ importPath }) => importPath === plugin.importPath)) {
          return acc;
        }
        return [...acc, plugin];
      },
      []
    );
    return uniquePlugins
      .map(({ moduleName, importPath }) =>
        this._moduleType === MODULE_TYPE.MODULE
          ? `import ${moduleName} from "${importPath}"`
          : `const ${moduleName} = require("${importPath}")`
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
  private generateExtendsConfig(): string {
    const eslintConfigExtensions = this._extends.reduce<
      EslintConfigExtension[]
    >((acc, extend) => {
      // If the extend is already in the array, skip it
      if (acc.find(({ importPath }) => importPath === extend.importPath)) {
        return acc;
      }

      // If specified in plugins, rewrite information in extends
      const plugin = this._plugins.find(
        ({ importPath }) => importPath === extend.importPath
      );

      // If the plugin is not found, return the original extend
      if (!plugin) return [...acc, extend];

      // Otherwise, rewrite the configReference with the pluginName
      return [
        ...acc,
        {
          moduleName: plugin.moduleName,
          importPath: plugin.importPath,
          configReference: extend.configReference.replace(
            // replace the first part of the extendsCode with the pluginName
            /^[^.]+/,
            plugin.moduleName
          ),
          shouldSpreadConfig: extend.shouldSpreadConfig,
        },
      ];
    }, []);

    return eslintConfigExtensions
      .map(({ shouldSpreadConfig, configReference }) =>
        shouldSpreadConfig ? `...${configReference}` : configReference
      )
      .join(",\n  ");
  }

  /**
   * Generate main ESLint configuration
   * @returns Main configuration as a string
   */
  private generateMainConfig(): string {
    return `{
    files: ${this.convertArrayToString([...this._enablePatterns])},
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
      ${this.convertPluginsToString(this._plugins, "      ")}
    },
    rules: {
      ${this.convertRulesToString(this.rules, "      ")}
    }
  }`;
  }

  /**
   * Generate overrides configuration for ESLint.
   * Creates configuration objects for each override, including their specific
   * extends, parser options, files patterns, plugins, and rules.
   *
   * @returns A string containing all override configurations, separated by commas
   */
  private generateOverridesConfig(): string {
    return this.overrides
      .map((override) => {
        const plugins = [...this._plugins, ...this._extends];
        const overridePlugins = override.plugins ?? [];
        const overrideIgnorePatterns = override.ignorePatterns ?? [];
        const codeReferences = override.extends
          ? override.extends
              .map((extend) =>
                extend.shouldSpreadConfig
                  ? `...${extend.configReference}`
                  : extend.configReference
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
  },`;
      })
      .join("\n");
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
      ({ importPath }) => importPath === parser.importPath
    );
    if (plugin) {
      return `parser: ${parser.parserReference.replace(
        /^[^.]+/,
        plugin.moduleName
      )}`;
    }
    return `parser: ${parser.parserReference}`;
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
          !plugin.moduleName.includes(".")
        ) {
          return `"${plugin.pluginAlias}": ${plugin.moduleName}.plugin`;
        } else return `"${plugin.pluginAlias}": ${plugin.moduleName}`;
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
    rules: Rules,
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
   * Generates a list of glob patterns for directories where dev dependencies are allowed.
   * Takes the dev directories and transforms them into glob patterns that match all files within those directories.
   *
   * @returns An array of glob patterns in the format `**=\/{dir}/**` for each dev directory
   */
  private renderDevDepsAllowList(): string[] {
    const allowDevDeps = new Set(this._devDirs.map((dir) => `**/${dir}/**`));
    return Array.from(allowDevDeps);
  }
}
