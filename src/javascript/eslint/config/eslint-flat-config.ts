import {
  EslintConfigExtension,
  EslintPlugin,
  ESLintRules,
  IESLintConfig,
} from "./eslint-config";
import { NodeProject } from "../../node-project";

export interface EslintFlatConfigOptions {
  /**
   * Files or glob patterns or directories with source files that include tests and build tools.
   * These sources are linted but may also import packages from `devDependencies`.
   *
   * @default []
   */
  readonly devDirs?: string[];

  /**
   * The style configuration to use for ESLint.
   * This is used to extend the base ESLint configuration with additional rules and plugins.
   */
  readonly styleConfig: IESLintConfig;
}

export class ESLintFlatConfig implements IESLintConfig {
  public readonly rules: ESLintRules;
  public readonly plugins?: EslintPlugin[] | undefined;
  public readonly extensions?: EslintConfigExtension[];

  constructor(project: NodeProject, options: EslintFlatConfigOptions) {
    project.addDevDeps(
      "globals",
      "eslint@^9",
      "@eslint/js@^9",
      "typescript-eslint@^8",
      "@typescript-eslint/parser@^8",
      "eslint-plugin-import",
      "eslint-import-resolver-typescript"
    );
    this.rules = this.initializeRules(options.devDirs ?? []);
    this.plugins = this.initializePlugins(options.styleConfig);
    this.extensions = this.initializeExtensions(options.styleConfig);
  }

  /**
   * Initialize plugins for ESLint configuration
   */
  private initializePlugins(styleConfig: IESLintConfig): EslintPlugin[] {
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
      ...(styleConfig.plugins ?? []),
    ];
  }

  /**
   * Initialize extends for ESLint configuration
   */
  private initializeExtensions(
    styleConfig: IESLintConfig
  ): EslintConfigExtension[] {
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
      ...(styleConfig.extensions ?? []),
    ];
  }

  private initializeRules(devDirs: string[]): ESLintRules {
    return {
      // Require use of the `import { foo } from 'bar';` form instead of `import foo = require('bar');`
      "@typescript-eslint/no-require-imports": "error",

      // Require all imported dependencies are actually declared in package.json
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: this.renderDevDepsAllowList(devDirs), // Only allow importing devDependencies from "devDirs".
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
