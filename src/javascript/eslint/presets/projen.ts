import { EslintOptions } from "../../eslint";
import { ESLintConfig, IESLintConfig } from "../config";
import { ConfigWithExtends, Extends, Plugin } from "../config-object";
import { Tseslint } from "./tseslint";
import { from, js } from "../../private/code-template";
import { IResolvable } from "../../../file";
import { isResolvable } from "../../../_private/data-resolver";
import { ImportPlugin } from "./import-plugin";

/**
 * Configurations provided by projen
 */
export class Projen implements IESLintConfig, IResolvable {
  /**
   * The default recommended rules
   */
  public static readonly RECOMMENDED = new Projen();

  /**
   * Configure the default rules
   */
  public static configure(options: EslintOptions) {
    return new Projen(options);
  }

  private readonly configs: (ConfigWithExtends | IResolvable)[];

  private constructor(options: EslintOptions = {}) {
    const tsconfig = options.tsconfigPath ?? "./tsconfig.json";

    this.configs = [
      ESLintConfig.files(["src/**"]),
      ESLintConfig.ignores(options.ignorePatterns ?? ["lib/"]),
      Tseslint.BASE,
      {
        plugins: {
          import: ImportPlugin.PLUGIN,
          "@typescript-eslint": Plugin.fromName("@typescript-eslint"),
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
              devDependencies: false,
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
