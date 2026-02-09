import { IConstruct } from "constructs";
import { ESLint } from "./eslint";
import { EslintOptions, EslintOverride } from "../eslint";
import { ESLintConfig } from "./config";
import { ConfigWithExtends, Plugin } from "./config-object";
import { ProjenEslintPreset } from "./presets/projen";
import { isResolvable } from "../../_private/data-resolver";
import { Component } from "../../component";
import { Prettier } from "../prettier";

export class EslintLegacy extends Component {
  private eslint: ESLint;

  constructor(scope: IConstruct, options: EslintOptions) {
    super(scope);
    this.eslint = new ESLint(this, {
      linter: false,
      formatter: false,
      commandOptions: {
        fix: false,
      },
      configs: [
        ProjenEslintPreset.configure({
          prettier: options.prettier || Boolean(Prettier.of(this.project)),
          ...options,
        }),
      ],
    });
  }

  /**
   * Returns an immutable copy of the lintPatterns being used by this eslint configuration.
   * @deprecated use `configs`
   */
  public get lintPatterns(): string[] {
    return this.eslint.configs
      .flatMap((config) => (isResolvable(config) ? config.toJSON() : config))
      .flatMap((config: ConfigWithExtends) => config.files ?? []);
  }

  /**
   * Add a file, glob pattern or directory with source files to lint (e.g. [ "src" ])
   * @deprecated use `addConfigs()`
   */
  public addLintPattern(pattern: string) {
    this.eslint.addConfigs(ESLintConfig.files([pattern]));
  }

  /**
   * Add an eslint rule.
   * @deprecated use `addConfigs()`
   */
  public addRules(rules: { [rule: string]: any }) {
    this.eslint.addConfigs(new ESLintConfig({ rules }));
  }

  /**
   * Adds an eslint plugin
   * @param plugins The names of plugins to add
   * @deprecated use `addConfigs()`
   */
  public addPlugins(...plugins: string[]) {
    this.eslint.addConfigs(
      new ESLintConfig({
        plugins: Object.fromEntries(
          plugins.map((p) => [p, Plugin.fromName(p)]),
        ),
      }),
    );
  }

  /**
   * Add an eslint override.
   * @deprecated use `addConfigs()`
   */
  public addOverride(_override: EslintOverride) {
    this.eslint.addConfigs(new ESLintConfig({}));
  }

  /**
   * Do not lint these files.
   * @deprecated use `addConfigs()`
   */
  public addIgnorePattern(pattern: string) {
    this.eslint.addConfigs(ESLintConfig.ignores([pattern]));
  }

  /**
   * Adds an `extends` item to the eslint configuration.
   * @param extendList The list of "extends" to add.
   * @deprecated use `addConfigs()`
   */
  public addExtends(...extendList: string[]) {
    this.eslint.addConfigs({
      extends: extendList,
    });
  }

  /**
   * Add a glob file pattern which allows importing dev dependencies.
   * @param pattern glob pattern.
   * @deprecated use `addConfigs()`
   */
  public allowDevDeps(_pattern: string) {
    // this.addConfigs(ESLintConfig.ignores([pattern]));
  }
}
