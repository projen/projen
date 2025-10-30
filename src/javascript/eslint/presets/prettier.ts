import { SharedConfig } from "../shared-config";

/**
 * Configurations provided to run prettier
 *
 * @see https://github.com/prettier/eslint-plugin-prettier
 */
export class Prettier extends SharedConfig {
  /**
   * The default recommended rules
   */
  public static readonly RECOMMENDED = new Prettier("recommended");

  private constructor(path: string) {
    super({
      module: "eslint-plugin-prettier",
      name: "prettier",
      path: `configs.${path}`,
    });
  }
}
