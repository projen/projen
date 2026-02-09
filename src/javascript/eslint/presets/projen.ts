import { ImportPlugin } from "./import-plugin";
import { Prettier } from "./prettier";
import { Stylistic } from "./stylistic";
import { Tseslint } from "./tseslint";
import { isResolvable } from "../../../_private/data-resolver";
import { IResolvable } from "../../../file";
import { from, js } from "../../private/code-template";
import { ESLintConfig, IESLintConfig } from "../config";
import { ConfigWithExtends, Extends } from "../config-object";

export interface ProjenEslintPresetOptions {
  /**
   * Path to `tsconfig.json` which should be used by eslint.
   * @default "./tsconfig.json"
   */
  readonly tsconfigPath?: string;

  /**
   * Files or glob patterns or directories with source files to lint (e.g. [ "src" ])
   *
   * @default - all files in the project
   */
  readonly dirs?: string[];

  /**
   * Files or glob patterns or directories with source files that include tests and build tools
   *
   * These sources are linted but may also import packages from `devDependencies`.
   * @default []
   */
  readonly devdirs?: string[];

  /**
   * File types that should be linted (e.g. [ ".js", ".ts" ])
   * @default [".ts"]
   */
  readonly fileExtensions?: string[];

  /**
   * List of file patterns that should not be linted, using the same syntax
   * as .gitignore patterns.
   *
   * @default [ '*.js', '*.d.ts', 'node_modules/', '*.generated.ts', 'coverage' ]
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

/**
 * Configurations provided by projen
 */
export class ProjenEslintPreset implements IESLintConfig, IResolvable {
  /**
   * The default recommended rules
   */
  public static readonly RECOMMENDED = new ProjenEslintPreset();

  /**
   * Configure the default rules
   */
  public static configure(options: ProjenEslintPresetOptions) {
    return new ProjenEslintPreset(options);
  }

  private readonly configs: (ConfigWithExtends | IResolvable)[];

  private constructor(options: ProjenEslintPresetOptions = {}) {
    const tsconfig = options.tsconfigPath ?? "./tsconfig.json";

    const dirs = new Set([...(options.dirs ?? []), ...(options.devdirs ?? [])]);
    const allowDevDeps = new Set(
      (options.devdirs ?? []).map((dir) => `**/${dir}/**`),
    );

    this.configs = [
      ESLintConfig.files(
        (options.fileExtensions ?? [".ts"]).map((ext) => `**/*${ext}`),
      ),
      ESLintConfig.files(Array.from(dirs)),
      ESLintConfig.ignores(options.ignorePatterns ?? ["lib/"]),
      Tseslint.BASE,
      {
        plugins: {
          import: ImportPlugin.PLUGIN,
          "@typescript-eslint": Tseslint.PLUGIN,
        },
        languageOptions: {
          parserOptions: {
            ecmaVersion: 2018,
            sourceType: "module",
            project: tsconfig,
          },
          globals: js`{\n  ...${from("globals").default.jest},\n  ...${from("globals").default.node}\n}`,
        },
        extends: [Extends.fromName("import/typescript")],
        settings: {
          "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
          },
          "import/resolver": {
            ...(options.aliasMap && {
              alias: {
                map: Object.entries(options.aliasMap).map(([k, v]) => [k, v]),
                extensions: options.aliasExtensions,
              },
            }),
            node: {},
            typescript: {
              project: tsconfig,
              ...(options.tsAlwaysTryTypes !== false && {
                alwaysTryTypes: true,
              }),
            },
          },
        },
        rules: {
          curly: ["error", "multi-line", "consistent"],
          "@typescript-eslint/no-require-imports": "error",
          "import/no-extraneous-dependencies": [
            "error",
            {
              devDependencies: Array.from(allowDevDeps),
              optionalDependencies: false,
              peerDependencies: true,
            },
          ],
          "import/no-unresolved": ["error"],
          "import/order": [
            "warn",
            {
              groups: ["builtin", "external"],
              alphabetize: { order: "asc", caseInsensitive: true },
            },
          ],
          "import/no-duplicates": ["error"],
          "no-shadow": ["off"],
          "@typescript-eslint/no-shadow": "error",
          "@typescript-eslint/no-floating-promises": "error",
          "no-return-await": ["off"],
          "@typescript-eslint/return-await": "error",
          "dot-notation": ["error"],
          "no-bitwise": ["error"],
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
        },
      },
      ...this.formatterConfigs(options.prettier ?? false),
    ];
  }

  private formatterConfigs(userPrettier: boolean): IESLintConfig[] {
    if (userPrettier) {
      return [Prettier.RECOMMENDED as any];
    }

    return [
      new ESLintConfig({
        plugins: {
          "@stylistic": Stylistic.PLUGIN,
        },
        rules: {
          // Style
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
          "@stylistic/keyword-spacing": ["error"], // require a space before & after keywords
          "@stylistic/brace-style": [
            "error",
            "1tbs",
            { allowSingleLine: true },
          ], // enforce one true brace style
          "@stylistic/space-before-blocks": ["error"], // require space before blocks
          // @see https://github.com/typescript-eslint/typescript-eslint/issues/8072
          "@stylistic/member-delimiter-style": ["error"],

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

          // Required spacing in property declarations (copied from TSLint, defaults are good)
          "@stylistic/key-spacing": ["error"],

          // No multiple empty lines
          "@stylistic/no-multiple-empty-lines": ["error"],

          // Useless diff results
          "@stylistic/no-trailing-spaces": ["error"],
        },
      }),
    ];
  }

  public toJSON(): any {
    return this.configs.flatMap((config: any) => {
      if (isResolvable(config)) {
        return config.toJSON();
      }
      return config;
    });
  }
}
