import { Code } from "../../../_private/code";

import { EslintOptions } from "../../eslint";
import { ModuleImports } from "../../private/modules";
import { ESLintConfig, IESLintConfig } from "../config";
import { ConfigWithExtends, Extends, Plugin } from "../config-object";
import { Tseslint } from "./tseslint";

/**
 * Configurations provided by projen
 */
export class Projen implements IESLintConfig {
  /**
   * The default recommended rules
   */
  public static RECOMMENDED = new Projen();

  /**
   * Configure the default rules
   */
  public static configure(options: EslintOptions) {
    return new Projen(options);
  }

  public readonly imports: ModuleImports;
  private readonly configs: IESLintConfig[];

  private constructor(options: EslintOptions = {}) {
    this.imports = new ModuleImports();
    this.imports.needs("@typescript-eslint/eslint-plugin");
    this.imports.needs("eslint-plugin-import");
    const globals = this.imports.default("globals", "globals");

    const tsconfig = options.tsconfigPath ?? "./tsconfig.json";

    this.configs = [
      ESLintConfig.files(["src/**"]),
      ESLintConfig.ignores(options.ignorePatterns ?? ["lib/"]),
      Tseslint.BASE,
      new ESLintConfig({
        plugins: Plugin.fromName("import") as any,
        languageOptions: {
          parserOptions: {
            ecmaVersion: 2018,
            sourceType: "module",
            project: tsconfig,
          },
          globals: Code.literal(`{\n  ...${globals.render()}.jest,\n  ...${globals.render()}.node\n}`),
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
      }),
    ];

    // add imports from sub configs
    this.configs.map((config) => config.imports && this.imports.merge(config.imports));
  }

  public toJSON(): ConfigWithExtends[] {
    return this.configs.flatMap((config) => config.toJSON());
  }
}
