import { NodeProject } from "../../node-project";
import {
  EslintConfigExtension,
  EslintPlugin,
  EslintRules,
  IEslintConfig,
} from "./eslint-config";

export interface EslintFlatConfigOptions {
  /**
   * Files or glob patterns or directories with source files that include tests and build tools.
   * These sources are linted but may also import packages from `devDependencies`.
   *
   * @default []
   */
  readonly devDirs: string[];
}

export class EslintFlatConfig implements IEslintConfig {
  public get enablePatterns(): string[] {
    return this._enablePatterns.size ? [...this._enablePatterns] : [];
  }
  public get ignorePatterns(): string[] {
    return this._ignorePatterns.size ? [...this._ignorePatterns] : [];
  }
  public get rules(): EslintRules {
    return this._rules;
  }
  public get plugins(): EslintPlugin[] {
    return this._plugins;
  }
  public get extensions(): EslintConfigExtension[] {
    return this._extensions;
  }
  public get overrides(): NonNullable<IEslintConfig["overrides"]> {
    return this._overrides;
  }

  // TODO:
  // public readonly parser?: EslintParser;

  private _enablePatterns: Set<string> = new Set();
  private _ignorePatterns: Set<string> = new Set();
  private _rules: EslintRules;
  private _plugins: EslintPlugin[];
  private _extensions: EslintConfigExtension[];
  // TODO:
  // private _parser?: EslintParser;
  private _overrides: NonNullable<IEslintConfig["overrides"]> = [];

  constructor(project: NodeProject, options?: EslintFlatConfigOptions) {
    project.addDevDeps(
      "globals",
      "eslint@^9",
      "@eslint/js@^9",
      "typescript-eslint@^8",
      "@typescript-eslint/parser@^8",
      "eslint-plugin-import",
      "eslint-import-resolver-typescript"
    );
    this._enablePatterns = new Set(options?.devDirs ?? []);
    this._rules = this.initializeRules(options?.devDirs);
    this._plugins = this.initializePlugins();
    this._extensions = this.initializeExtensions();
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
    if (!this._ignorePatterns) this._ignorePatterns = new Set<string>();
    for (const pattern of patterns) {
      this._ignorePatterns.add(pattern);
    }
  }

  /**
   * Add an eslint rule.
   *
   * @example { "no-console": "error" }
   */
  public addRules(rules: EslintRules) {
    if (!this._rules) this._rules = {};
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
    if (!this._plugins) this._plugins = [];
    this._plugins.push(...plugins);
  }

  /**
   * Initialize plugins for ESLint configuration
   */
  private initializePlugins(): EslintPlugin[] {
    return [
      {
        moduleSpecifier: "typescript-eslint",
        importedBinding: "tseslint",
        pluginAlias: "@typescript-eslint",
      },
      {
        moduleSpecifier: "eslint-plugin-import",
        importedBinding: "importPlugin",
        pluginAlias: "import",
      },
    ];
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
  public addOverrides(...overrides: IEslintConfig[]) {
    this._overrides.push(...overrides);
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
   * @param extensions ESLint configuration extension information.
   */
  public addExtensions(...extensions: EslintConfigExtension[]) {
    if (!this._extensions) this._extensions = [];
    this._extensions.push(...extensions);
  }

  /**
   * Initialize rules for ESLint configuration
   */
  private initializeRules(devDirs?: string[]): EslintRules {
    return {
      // Require use of the `import { foo } from 'bar';` form instead of `import foo = require('bar');`
      "@typescript-eslint/no-require-imports": "error",

      // Require all imported dependencies are actually declared in package.json
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: this.renderDevDepsAllowList(devDirs ?? []), // Only allow importing devDependencies from "devDirs".
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
   * Initialize extends for ESLint configuration
   */
  private initializeExtensions(): EslintConfigExtension[] {
    return [
      {
        moduleSpecifier: "@eslint/js",
        importedBinding: "eslint",
        configReference: "eslint.configs.recommended",
      },
      {
        moduleSpecifier: "eslint-plugin-import",
        importedBinding: "importPlugin",
        configReference: "importPlugin.flatConfigs.typescript",
      },
    ];
  }

  /**
   * Generates a list of glob patterns for directories where dev dependencies are allowed.
   * Takes the dev directories and transforms them into glob patterns that match all files within those directories.
   *
   * @returns An array of glob patterns in the format `**=\/{dir}/**` for each dev directory
   */
  private renderDevDepsAllowList(devDirs: string[]): string[] {
    const allowDevDeps = new Set(devDirs.map((dir) => `**/${dir}/**`));
    return Array.from(allowDevDeps);
  }
}
