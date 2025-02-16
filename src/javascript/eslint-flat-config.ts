import * as fs from "fs";
import { Project } from "..";
import { Component } from "../component";
import { NodeProject } from "../javascript";
import { Prettier } from "./prettier";

/**
 * plugin information for eslint configuration
 *
 * @example {importPath: "typescript-eslint", moduleName: "tseslint", alias: "@typescript-eslint"}
 * ```ts
 * import tseslint from "typescript-eslint" // import $moduleName from $importPath
 *
 * export default [
 *   ...
 *   {
 *     plugins: {
 *       "@typescript-eslint": tseslint // "$alias": $moduleName
 *     }
 *   }
 * ]
 * ```
 */
export interface Plugin {
  /**
   * the import path of the plugin
   *
   * @example "typescript-eslint"
   */
  importPath: string;

  /**
   * the name of the plugin
   *
   * @example "tseslint"
   */
  moduleName: string;

  /**
   * the alias to use in the config
   *
   * @example "@typescript-eslint"
   */
  alias: string;
}

/**
 * extends items for eslint configuration.
 * @example
 * ### When needSpread is false
 * {importPath: "eslint-plugin-prettier", moduleName: "prettierPlugin", extendsCode: "prettierPlugin"}
 * ```ts
 * import prettierPlugin from "eslint-plugin-prettier" // import $moduleName from $importPath
 *
 * export default [
 *   prettierPlugin // $extendsCode
 *   {
 *     ...
 *   }
 * ]
 * ```
 *
 * ### When needSpread is true
 * {importPath: "eslint-plugin-prettier", moduleName: "prettierPlugin", extendsCode: "prettierPlugin", needSpread: true}
 * ```ts
 * import prettierPlugin from "eslint-plugin-prettier" // import $moduleName from $importPath
 *
 * export default [
 *   ...prettierPlugin, // ...$extendsCode
 *   {
 *     ...
 *   }
 * ]
 * ```
 */
export interface Extend {
  /**
   * the import path of the plugin
   *
   * @example "eslint-plugin-prettier"
   */
  importPath: string;

  /**
   * the name of the plugin
   *
   * @example "prettierPlugin"
   */
  moduleName: string;

  /**
   * the code to use in the config
   *
   * @example "prettierPlugin"
   */
  extendsCode: string;

  /**
   * whether to spread the extends code
   *
   * @default false
   */
  needSpread?: boolean;
}

/**
 * parser items for eslint configuration.
 * @example
 * {importPath: "typescript-eslint", moduleName: "tseslint", parserCode: "tseslint.parser"}
 * ```ts
 * import tseslint from "typescript-eslint" // import $moduleName from $importPath
 *
 * export default [
 *   {
 *     languageOptions: {
 *       parser: tseslint.parser, // $parserCode
 *     }
 *   }
 * ]
 * ```
 */
export interface Parser {
  /**
   * the import path of the parser
   *
   * @example "typescript-eslint"
   */
  importPath: string;

  /**
   * the module name of the parser
   *
   * @example "tseslint"
   */
  moduleName: string;

  /**
   * the code to use in the parser
   *
   * @example "tseslint.parser"
   */
  parserCode: string;
}

export interface EslintFlatConfigOptions {
  /**
   * Path to `tsconfig.json` which should be used by eslint.
   *
   * @default "./tsconfig.json"
   */
  readonly tsconfigPath?: string;

  /**
   * Files or glob patterns or directories with source files to lint
   *
   * @example ["src/*.ts"]
   */
  readonly enablePatterns: string[];

  /**
   * Files or glob patterns or directories with source files that include tests and build tools.
   * These sources are linted but may also import packages from `devDependencies`.
   *
   * @default []
   */
  readonly devDirs?: string[];

  /**
   * File types that should be linted (e.g. [ ".js", ".ts" ])
   *
   * @default [".ts"]
   */
  readonly fileExtensions?: string[];

  /**
   * Options for eslint command executed by eslint task
   */
  readonly commandOptions?: EslintFlatConfigCommandOptions;

  /**
   * List of file patterns that should not be linted, using the same syntax
   * as .gitignore patterns.
   *
   * @default - [ '*.js', '*.d.ts', 'node_modules/', '*.generated.ts', 'coverage' ]
   */
  readonly ignorePatterns?: string[];

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
   */
  readonly enablePatterns: string[];

  /**
   * Pattern(s) to ignore from this override.
   * If a file matches any of the ignored patterns, the configuration won’t apply.
   */
  readonly ignorePatterns?: string[];

  /**
   * The overridden rules
   */
  readonly rules?: { [rule: string]: any };

  /**
   * The overridden parser
   */
  readonly parser?: Parser;

  /**
   * Config(s) to extend in this override
   */
  readonly extends?: Extend[];

  /**
   * Plugin(s) to use in this override
   */
  readonly plugins?: Plugin[];
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
   * eslint rules.
   */
  public readonly rules: { [rule: string]: any };

  /**
   * eslint overrides.
   */
  public readonly overrides: EslintFlatConfigOverride[] = [];

  /**
   * Direct access to the eslint configuration (escape hatch)
   */
  public readonly config: string;

  /**
   * File patterns that should not be linted
   */
  public readonly ignorePatterns: string[];

  /**
   * plugins items for eslint configuration.
   */
  private readonly _plugins: Plugin[] = [];

  /**
   * extends items for eslint configuration.
   */
  private readonly _extends: Extend[] = [];
  private _formattingRules: { [rule: string]: any };
  private readonly _devDirs: string[];
  private readonly _allowDevDeps: Set<string>;
  private readonly _lintPatterns: Set<string>;
  private readonly nodeProject: NodeProject;

  constructor(project: NodeProject, options: EslintFlatConfigOptions) {
    super(project);

    this.nodeProject = project;

    project.addDevDeps(
      "eslint@^9",
      "@eslint/js@^9",
      "typescript-eslint@^8",
      "eslint-import-resolver-typescript",
      "eslint-plugin-import"
    );

    this._devDirs = options.devDirs ?? [];
    this._lintPatterns = new Set([...options.enablePatterns, ...this._devDirs]);
    this._allowDevDeps = new Set(this._devDirs.map((dir) => `**/${dir}/**`));

    // exclude some files
    project.npmignore?.exclude("/.eslint.config.mjs");

    this._formattingRules = {
      // @see https://github.com/typescript-eslint/typescript-eslint/issues/8072
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

    this.rules = {
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

    this.ignorePatterns = options.ignorePatterns ?? [
      "*.js",
      "*.d.ts",
      "node_modules/",
      "*.generated.ts",
      "coverage",
    ];

    const tsconfig = options.tsconfigPath ?? "./tsconfig.json";

    const rules = { ...this.rules, ...this._formattingRules };

    this.addPlugins({
      importPath: "typescript-eslint",
      moduleName: "tseslint",
      alias: "@typescript-eslint",
    });
    this.addPlugins({
      importPath: "eslint-plugin-import",
      moduleName: "importPlugin",
      alias: "import",
    });
    this.addExtends({
      importPath: "@eslint/js",
      moduleName: "eslint",
      extendsCode: "eslint.configs.recommended",
    });
    this.addExtends({
      importPath: "eslint-plugin-import",
      moduleName: "importPlugin",
      extendsCode: "importPlugin.flatConfigs.typescript",
    });

    // if the user enabled prettier explicitly _or_ if the project has a
    // `Prettier` component, we shall tweak our configuration accordingly.
    if (options.prettier || Prettier.of(project)) {
      this.enablePrettier();
    } else {
      this.nodeProject.addDevDeps("@stylistic/eslint-plugin@^2");
      this.addPlugins({
        importPath: "@stylistic/eslint-plugin",
        moduleName: "stylistic",
        alias: "@stylistic",
      });
    }

    this.config = `
import globals from "globals";
${this.generateUniqueImportSrc([
  ...this._plugins,
  ...this._extends,
  ...this.overrides?.flatMap((override) => [
    ...(override.plugins ?? []),
    ...(override.extends ?? []),
    ...(override.parser ? [override.parser] : []),
  ]),
]).join("\n")}

/** @type {import('eslint').Linter.Config[]} */
export default [
  ${this.generateUniqueExtends(this._extends, this._plugins)
    .map((extend) =>
      extend.needSpread ? `...${extend.extendsCode}` : extend.extendsCode
    )
    .join(",\n  ")},
  {
    files: [${[...this._lintPatterns]
      .map((pattern) => `"${pattern}"`)
      .join(", ")}],
    languageOptions: { 
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        project: "${tsconfig}",
      },
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        ${
          options.aliasMap
            ? JSON.stringify({
                ...{
                  alias: {
                    map: Object.entries(options.aliasMap).map(([k, v]) => [
                      k,
                      v,
                    ]),
                    extensions: options.aliasExtensions,
                  },
                },
              }).slice(1, -1)
            : ""
        }
        node: {},
        typescript: {
          project: "${tsconfig}",
          ${options.tsAlwaysTryTypes !== false ? "alwaysTryTypes: true" : ""},
        }
      },
    },
    plugins: {
      ${this._plugins
        .map((plugin) => `"${plugin.alias}": ${plugin.moduleName}`)
        .join(",\n      ")}
    },
    rules: {
      ${Object.keys(rules)
        .map(
          (key) =>
            `"${key}": ${JSON.stringify(rules[key as keyof typeof rules])}`
        )
        .join(",\n      ")}
    }
  },
  ${this.overrides.map(
    (override) => `
  {
    ${
      override.extends
        ? override.extends
            .map((extend) =>
              extend.needSpread
                ? `...${extend.extendsCode}`
                : extend.extendsCode
            )
            .join(",\n  ")
        : ""
    }
    ${
      override.parser
        ? `languageOptions: {
      parser: ${
        this.replaceParser(override.parser, [
          ...this._plugins,
          ...this._extends,
        ]).parserCode
      }
    },`
        : ""
    }
    files: [${override.enablePatterns
      .map((pattern) => `"${pattern}"`)
      .join(", ")}],
    plugins: {
      ${override.plugins
        ?.map((plugin) => `"${plugin.alias}": ${plugin.moduleName}`)
        .join(",\n      ")}
    },
    rules: {
      ${Object.keys(override.rules ?? {})
        .map(
          (key) =>
            `"${key}": ${JSON.stringify(
              override.rules?.[key as keyof typeof override.rules]
            )}`
        )
        .join(",\n      ")}
    }
  }`
  )}
  {
    ignores: [${this.ignorePatterns
      .map((pattern) => `"${pattern}"`)
      .join(", ")}]
  }
];
`;

    fs.writeFileSync("eslint.config.mjs", this.config);
  }

  /**
   * Returns an immutable copy of the lintPatterns being used by this eslint configuration.
   */
  public get lintPatterns(): string[] {
    if (this._lintPatterns.size) {
      return [...this._lintPatterns];
    }
    return [];
  }

  /**
   * Add a file, glob pattern or directory with source files to lint (e.g. [ "src" ])
   */
  public addLintPattern(pattern: string) {
    this._lintPatterns.add(pattern);
  }

  /**
   * Add an eslint rule.
   */
  public addRules(rules: { [rule: string]: any }) {
    for (const [k, v] of Object.entries(rules)) {
      this.rules[k] = v;
    }
  }

  /**
   * Adds an eslint plugin
   */
  public addPlugins(...plugins: Plugin[]) {
    for (const plugin of plugins) {
      this._plugins.push(plugin);
    }
  }

  /**
   * Add an eslint override.
   */
  public addOverride(override: EslintFlatConfigOverride) {
    this.overrides.push(override);
  }

  /**
   * Do not lint these files.
   */
  public addIgnorePattern(pattern: string) {
    this.ignorePatterns.push(pattern);
  }

  /**
   * Adds an `extends` item to the eslint configuration.
   */
  public addExtends(...extendList: Extend[]) {
    for (const extend of extendList) {
      this._extends.push(extend);
    }
  }

  /**
   * Add a glob file pattern which allows importing dev dependencies.
   * @param pattern glob pattern.
   */
  public addAllowDevDeps(pattern: string) {
    this._allowDevDeps.add(pattern);
  }

  /**
   * Generate unique plugins from the given list.
   */
  private generateUniqueImportSrc(
    plugins: (Plugin | Extend | Parser)[]
  ): string[] {
    const uniquePlugins = plugins.reduce<(Plugin | Extend | Parser)[]>(
      (acc, plugin) => {
        if (acc.find(({ importPath }) => importPath === plugin.importPath)) {
          return acc;
        }
        return [...acc, plugin];
      },
      []
    );
    return uniquePlugins.map(
      (plugin) => `import ${plugin.moduleName} from "${plugin.importPath}"`
    );
  }

  /**
   * Generate unique plugins from the given list.
   * @param extendList The list of extends to generate unique plugins from.
   * @param plugins The list of plugins to generate unique plugins from.
   *
   * @return The list of unique extends.
   */
  private generateUniqueExtends(
    extendList: Extend[],
    plugins: Plugin[]
  ): Extend[] {
    return extendList.reduce<Extend[]>((acc, extend) => {
      if (acc.find(({ importPath }) => importPath === extend.importPath)) {
        return acc;
      }
      // If specified in plugins, rewrite information in extends
      const plugin = plugins.find(
        ({ importPath }) => importPath === extend.importPath
      );
      if (!plugin) {
        return [...acc, extend];
      }
      return [
        ...acc,
        {
          moduleName: plugin.moduleName,
          importPath: plugin.importPath,
          extendsCode: extend.extendsCode.replace(/^[^.]+/, plugin.moduleName), // replace the first part of the extendsCode with the pluginName
          needSpread: extend.needSpread,
        },
      ];
    }, []);
  }

  /**
   * Generate unique plugins from the given list.
   * @param parsers The list of extends to generate unique plugins from.
   * @param plugins The list of plugins to generate unique plugins from.
   *
   * @return The list of unique extends.
   */
  private replaceParser(parser: Parser, plugins: (Plugin | Extend)[]): Parser {
    // If specified in plugins, rewrite information in extends
    const plugin = plugins.find(
      ({ importPath }) => importPath === parser.importPath
    );
    if (plugin) {
      return {
        moduleName: plugin.moduleName,
        importPath: plugin.importPath,
        parserCode: parser.parserCode.replace(/^[^.]+/, plugin.moduleName), // replace the first part of the extendsCode with the pluginName
      };
    }
    return parser;
  }

  /**
   * Enables prettier for code formatting.
   */
  private enablePrettier() {
    this.nodeProject.addDevDeps("prettier", "eslint-config-prettier");
    this._formattingRules = {};
    this.addExtends({
      importPath: "eslint-config-prettier",
      moduleName: "prettierConfig",
      extendsCode: "prettierConfig",
    });
  }

  private renderDevDepsAllowList() {
    return Array.from(this._allowDevDeps);
  }
}
