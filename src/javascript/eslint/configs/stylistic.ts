import { SharedConfig } from "./shared";

/**
 * Configurations provided by ESLint
 *
 * @ses https://eslint.style/guide/config-presets
 */
export class StylisticConfigs extends SharedConfig {
  /**
   * Enable all rules
   */
  public static ALL = new StylisticConfigs("all");

  /**
   * The default recommended config
   */
  public static RECOMMENDED = new StylisticConfigs("recommended");

  private constructor(path: string) {
    super({
      module: "@stylistic/eslint-plugin",
      name: "stylistic",
      path: `configs.${path}`,
    });
  }
}
