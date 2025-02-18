import * as fs from "fs";
import * as path from "path";
import { Project } from "..";
import { Component } from "../component";
import { NodeProject } from "../javascript";
import { Prettier } from "./prettier";

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
   * List of files or glob patterns or directories with source files to lint
   *
   * @example ["src/*.ts"]
   */
  readonly enablePatterns: string[];

  /**
   * List of file patterns that should not be linted, using the same syntax
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
   * Enable import alias for module paths
   * @default undefined
   */
  readonly aliasMap?: { [key: string]: string };

  /**
   * Enable import alias for module paths
   * @default undefined
   */
  readonly aliasExtensions?: string[];

  /**
   * Always try to resolve types under `<root>@types` directory even it doesn't contain any source code.
   * This prevents `import/no-unresolved` eslint errors when importing a `@types/*` module that would otherwise remain unresolved.
   * @default true
   */
  readonly tsAlwaysTryTypes?: boolean;
}

export interface EslintFlatConfigCommandOptions {
  /**
   * Whether to fix eslint issues when running the eslint task
   * @default true
   */
  readonly fix?: boolean;

  /**
   * Extra flag arguments to pass to eslint command
   */
  readonly extraArgs?: string[];
}

/**
 * eslint rules override
 */
export interface EslintFlatConfigOverride {
  /**
   * Files or file patterns on which to apply the override
   *
   * @example ["src/*.ts"]
   */
  readonly enablePatterns: string[];

  /**
   * Pattern(s) to ignore from this override.
   * If a file matches any of the ignored patterns, the configuration won't apply.
   *
   * @example [".gitignore", "node_modules"]
   */
  readonly ignorePatterns?: string[];

  /**
   * The overridden rules
   */
  readonly rules?: { [rule: string]: any };

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

/**
 * Represents eslint configuration.
 */
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
   * Public getter for eslint rules.
   */
  public get rules(): { [rule: string]: any } {
    return { ...this._rules, ...this._formattingRules };
  }

  /**
   * eslint overrides.
   */
  public readonly overrides: EslintFlatConfigOverride[] = [];

  /**
   * eslint configuration.
   */
  public get config(): string {
    return this._config;
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
    return this._ignorePatterns;
  }

  /**
   * Rules for eslint configuration.
   */
  private _rules: { [rule: string]: any } = {};

  /**
   * Formatting rules for eslint configuration.
   */
  private _formattingRules: { [rule: string]: any } = {};

  /**
   * Files or glob patterns or directories that should be linted
   */
  private _enablePatterns: Set<string>;

  /**
   * Plugins items for eslint configuration.
   */
  private _plugins: EslintPlugin[] = [];

  /**
   * Extends items for eslint configuration.
   */
  private _extends: EslintConfigExtension[] = [];

  private _config: string = "";

  private _ignorePatterns: string[] = [];

  private readonly nodeProject: NodeProject;
  private readonly _devDirs: string[];
  private readonly _allowDevDeps: Set<string>;
  private readonly _tsconfigPath: string;
  private readonly _aliasMap: { [key: string]: string };
  private readonly _aliasExtensions: string[];
  private readonly _tsAlwaysTryTypes: boolean;
  constructor(project: NodeProject, options: EslintFlatConfigOptions) {
    super(project);

    this.nodeProject = project;

    this.initializeProject(project);
    this.initializePluginsAndExtends();

    // Set options to class properties
    this._devDirs = options.devDirs ?? [];
    this._enablePatterns = new Set([
      ...options.enablePatterns,
      ...this._devDirs,
    ]);
    this._tsconfigPath = options.tsconfigPath ?? "./tsconfig.json";
    this._aliasMap = options.aliasMap ?? {};
    this._aliasExtensions = options.aliasExtensions ?? [];
    this._tsAlwaysTryTypes = options.tsAlwaysTryTypes ?? true;
    this._allowDevDeps = new Set(this._devDirs.map((dir) => `**/${dir}/**`));
    this.initializeRules();
    this.initializeCodeFormatter(project, options);
    this.initializeIgnorePatterns(options);
  }

  /**
   * Sync the config file with the current state of the class properties.
   */
  public synthesize() {
    this._config = this.generateConfig();
    const projectDir = this.project.outdir;
    const configFile = path.join(projectDir, "eslint.config.mjs");
    console.log("🚀 ~ EslintFlatConfig ~ synthesize ~ configFile:", configFile);
    fs.writeFileSync(configFile, this.config);
  }

  /**
   * Add a file or glob pattern or directory to lint
   *
   * @example "src/*.ts"
   */
  public addEnablePatterns(...patterns: string[]) {
    for (const pattern of patterns) {
      this._enablePatterns.add(pattern);
    }
  }

  /**
   * Do not lint these files.
   *
   * @example ".gitignore"
   */
  public addIgnorePatterns(...patterns: string[]) {
    this._ignorePatterns.push(...patterns);
  }

  /**
   * Add an eslint rule.
   *
   * @example { "no-console": "error" }
   */
  public addRules(rules: { [rule: string]: any }) {
    for (const [k, v] of Object.entries(rules)) {
      this._rules[k] = v;
    }
  }

  /**
   * Adds an eslint plugin
   */
  public addPlugins(...plugins: EslintPlugin[]) {
    this._plugins.push(...plugins);
  }

  /**
   * Add an eslint override.
   */
  public addOverrides(...overrides: EslintFlatConfigOverride[]) {
    this.overrides.push(...overrides);
  }

  /**
   * Adds an `extends` item to the eslint configuration.
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
      "eslint@^9",
      "@eslint/js@^9",
      "typescript-eslint@^8",
      "eslint-import-resolver-typescript",
      "eslint-plugin-import"
    );
    project.npmignore?.exclude("eslint.config.mjs");
  }

  /**
   * Initialize plugins and extends for ESLint configuration
   */
  private initializePluginsAndExtends(): void {
    this._plugins.concat([
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
    ]);
    this._extends.concat([
      {
        importPath: "@eslint/js",
        moduleName: "eslint",
        configReference: "eslint.configs.recommended",
      },
      {
        importPath: "eslint-plugin-import",
        moduleName: "importPlugin",
        configReference: "importPlugin.flatConfigs.typescript",
      },
    ]);
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
          // Only allow importing devDependencies from "devdirs".
          devDependencies: () => this.renderDevDepsAllowList(),
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
            // Constructors
            "constructor", // = ["public-constructor", "protected-constructor", "private-constructor"]
            // Methods
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
   * Initialize ignore patterns for ESLint
   * @param options - ESLint configuration options
   * @returns Array of ignore patterns
   */
  private initializeIgnorePatterns(options: EslintFlatConfigOptions): void {
    this._ignorePatterns = options.ignorePatterns ?? [
      "*.js",
      "*.d.ts",
      "node_modules/",
      "*.generated.ts",
      "coverage",
    ];
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
    this.nodeProject.addDevDeps("prettier", "eslint-config-prettier");
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
    this.nodeProject.addDevDeps("@stylistic/eslint-plugin@^2");
    this.addPlugins({
      importPath: "@stylistic/eslint-plugin",
      moduleName: "stylistic",
      pluginAlias: "@stylistic",
    });
    this._formattingRules = {
      indent: "off",
      "@stylistic/indent": ["error", 2],

      // Style
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

      // Require semicolons
      "@stylistic/semi": ["error", "always"],

      // Max line lengths
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

      // Don't unnecessarily quote properties
      "@stylistic/quote-props": ["error", "consistent-as-needed"],
    };
  }

  /**
   * Generate the complete ESLint configuration
   * @returns ESLint configuration as a string
   */
  private generateConfig(): string {
    return `
import globals from "globals";
${this.generateImports()}

/** @type {import('eslint').Linter.Config[]} */
export default [
  ${this.generateExtendsConfig()},
  ${this.generateMainConfig()},
  ${this.generateOverridesConfig()}
  {
    ignores: ${this.convertArrayToString(this.ignorePatterns)}
  }
];
`;
  }

  /**
   * Generate import statements for ESLint configuration
   * @returns Import statements as a string
   */
  private generateImports(): string {
    const uniquePlugins = [
      ...this._plugins,
      ...this._extends,
      ...this.overrides?.flatMap((override) => [
        ...(override.plugins ?? []),
        ...(override.extends ?? []),
        ...(override.parser ? [override.parser] : []),
      ]),
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
      .map(
        (plugin) => `import ${plugin.moduleName} from "${plugin.importPath}"`
      )
      .join("\n");
  }

  /**
   * Generate extends configuration
   * @returns Extends configuration as a string
   */
  private generateExtendsConfig(): string {
    return this._extends
      .reduce<EslintConfigExtension[]>((acc, extend) => {
        // If the extend is already in the array, skip it
        if (acc.find(({ importPath }) => importPath === extend.importPath)) {
          return acc;
        }

        // If specified in plugins, rewrite information in extends
        const plugin = this._plugins.find(
          ({ importPath }) => importPath === extend.importPath
        );

        if (plugin) {
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
        }
        return [...acc, extend];
      }, [])
      .map((extend) =>
        extend.shouldSpreadConfig
          ? `...${extend.configReference}`
          : extend.configReference
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
        ${
          this._aliasMap
            ? JSON.stringify({
                ...{
                  alias: {
                    map: Object.entries(this._aliasMap).map(([k, v]) => [k, v]),
                    extensions: this._aliasExtensions,
                  },
                },
              }).slice(1, -1)
            : ""
        }
        node: {},
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
   * Generate overrides configuration
   * @private
   * @returns Overrides configuration as a string
   */
  private generateOverridesConfig(): string {
    return this.overrides
      .map((override) => {
        const plugins = [...this._plugins, ...this._extends];
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
    files: [${this.convertArrayToString(override.enablePatterns)}],
    plugins: {
      ${this.convertPluginsToString(override.plugins ?? [], "      ")}
    },
    rules: {
      ${this.convertRulesToString(override.rules ?? {}, "      ")}
    }
  }`;
      })
      .join(",\n");
  }

  /**
   * Replaces parser information based on the plugin list.
   * If a matching plugin is found in the plugin list, updates the parser information using that plugin's information.
   *
   * @param parser - The parser information to be replaced
   * @param plugins - List of plugins and extends
   * @returns Updated parser information. Returns the original parser information if no matching plugin is found
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

  private renderDevDepsAllowList() {
    return Array.from(this._allowDevDeps);
  }

  private convertArrayToString(element: unknown[]): string {
    return `[${element.map((e) => `"${e}"`).join(", ")}]`;
  }

  private convertPluginsToString(
    plugins: EslintPlugin[],
    spaceStringForEachPlugin: string
  ): string {
    if (!plugins.length) return "";
    return plugins
      .map((plugin) => `"${plugin.pluginAlias}": ${plugin.moduleName}`)
      .join(`,\n${spaceStringForEachPlugin}`);
  }

  private convertRulesToString(
    rules: { [rule: string]: any },
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
