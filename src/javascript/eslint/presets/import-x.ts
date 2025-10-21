import { SharedConfig } from "../shared-config";

/**
 * Configurations provided by eslint-plugin-import
 *
 * @see https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#config---flat-eslintconfigjs
 */
export class ImportX extends SharedConfig {
  /**
   * The default recommended rules
   */
  public static RECOMMENDED = new ImportX("recommended");

  /**
   * Recommended typescript rules
   */
  public static TYPESCRIPT = new ImportX("recommended", "typescript");

  private constructor(...paths: string[]) {
    super(
      ...paths.map((path) => ({
        module: "eslint-plugin-import-x",
        name: "importX",
        path: `flatConfigs.${path}`,
      }))
    );
    this.imports.needs("eslint-import-resolver-typescript");
  }
}
