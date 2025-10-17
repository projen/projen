import { SharedConfig } from "./shared";

/**
 * Configurations provided by ESLint
 *
 * @see https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations
 */
export class EslintConfigs extends SharedConfig {
  /**
   * Enable all rules
   */
  public static ALL = new EslintConfigs("all");

  /**
   * The default recommended rules
   */
  public static RECOMMENDED = new EslintConfigs("recommended");

  private constructor(path: string) {
    super({
      module: "@eslint/js",
      name: "eslint",
      path: `configs.${path}`,
    });
  }
}
