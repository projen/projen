import { SharedConfig } from "./shared";

/**
 * Configurations provided to run prettier
 *
 * @see https://github.com/prettier/eslint-plugin-prettier
 */
export class PrettierConfigs extends SharedConfig {
  /**
   * The default recommended rules
   */
  public static RECOMMENDED = new PrettierConfigs("recommended");

  private constructor(path: string) {
    super({
      module: "eslint-plugin-prettier",
      name: "prettier",
      path: `configs.${path}`,
    });
  }
}
