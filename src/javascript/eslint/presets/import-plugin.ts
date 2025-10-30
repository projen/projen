import { SharedConfig } from "../shared-config";

/**
 * Configurations provided by eslint-plugin-import
 *
 * @see https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#config---flat-eslintconfigjs
 */
export class ImportPlugin extends SharedConfig {
  /**
   * The default recommended rules
   */
  public static readonly RECOMMENDED = new ImportPlugin("recommended");

  /**
   * Recommended typescript rules
   */
  public static readonly TYPESCRIPT = new ImportPlugin("recommended", "typescript");

  private constructor(...paths: string[]) {
    super(
      ...paths.map((path) => ({
        module: "eslint-plugin-import",
        name: "importPlugin",
        path: `flatConfigs.${path}`,
      }))
    );
    // this.imports.needs("eslint-import-resolver-typescript");
  }
}
