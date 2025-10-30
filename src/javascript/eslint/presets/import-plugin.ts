import { IImportResolver } from "../../../code-resolvable";
import { DependencyType } from "../../../dependencies";
import { Plugin } from "../config-object";
import { SharedConfig } from "../shared-config";

class ImportPluginPlugin extends Plugin {
  public constructor() {
    super("eslint-plugin-import", "import");
  } 
  
  public resolveImports(imports: IImportResolver): void {
    imports.project.deps.addDependency("eslint-import-resolver-typescript", DependencyType.BUILD);
    return super.resolveImports?.(imports);
  }
}

/**
 * Configurations provided by eslint-plugin-import
 *
 * @see https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#config---flat-eslintconfigjs
 */
export class ImportPlugin extends SharedConfig {
  /**
   * As ESLint Plugin
   */
  public static readonly PLUGIN: Plugin = new ImportPluginPlugin();

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
  }

  public resolveImports(imports: IImportResolver): void {
    imports.project.deps.addDependency("eslint-import-resolver-typescript", DependencyType.BUILD);
    return super.resolveImports?.(imports);
  }  
}
