import { SharedConfig } from "../shared-config";

/**
 * Configurations provided by ESLint JavaScript Plugin
 *
 * @see https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations
 */
export class ESLintJs extends SharedConfig {
  /**
   * Enable all rules
   */
  public static readonly ALL = new ESLintJs("all");

  /**
   * The default recommended rules
   */
  public static readonly RECOMMENDED = new ESLintJs("recommended");

  private constructor(path: string) {
    super({
      module: "@eslint/js",
      name: "js",
      path: `configs.${path}`,
    });
  }
}
