import { SharedConfig } from "../shared-config";

/**
 * Configurations provided by ESLint
 *
 * @ses https://eslint.style/guide/config-presets
 */
export class Stylistic extends SharedConfig {
  /**
   * Enable all rules
   */
  public static ALL = new Stylistic("all");

  /**
   * The default recommended config
   */
  public static RECOMMENDED = new Stylistic("recommended");

  private constructor(path: string) {
    super({
      module: "@stylistic/eslint-plugin",
      name: "stylistic",
      path: `configs.${path}`,
    });
  }
}
