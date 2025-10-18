import { SharedConfig } from "./shared";

/**
 * Configurations provided by eslint-plugin-import
 *
 * @see https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#config---flat-eslintconfigjs
 */
export class ImportConfigs extends SharedConfig {
  /**
   * The default recommended rules
   */
  public static RECOMMENDED = new ImportConfigs("recommended");

  /**
   * Enable all rules
   */
  public static TYPESCRIPT = new ImportConfigs("typescript");

  private constructor(path: string) {
    super({
      module: "eslint-plugin-import",
      name: "importPlugin",
      path: `flatConfigs.${path}`,
    });
  }
}
