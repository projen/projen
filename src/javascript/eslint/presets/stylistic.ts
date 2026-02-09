import { Plugin } from "../config-object";
import { SharedConfig } from "../shared-config";

/**
 * Configurations provided by ESLint
 *
 * @ses https://eslint.style/guide/config-presets
 */
export class Stylistic extends SharedConfig {
  /**
   * As ESLint Plugin
   */
  public static readonly PLUGIN: Plugin = Plugin.fromName("@stylistic");

  /**
   * Enable all rules
   */
  public static readonly ALL = new Stylistic("all");

  /**
   * The default recommended config
   */
  public static readonly RECOMMENDED = new Stylistic("recommended");

  private constructor(path: string) {
    super({
      module: "@stylistic/eslint-plugin",
      name: "stylistic",
      path: `configs.${path}`,
    });
  }
}
