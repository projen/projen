import { CodeResolvable, IImportResolver } from "../../../code-resolvable";
import { DependencyType } from "../../../dependencies";
import { Plugin } from "../config-object";
import { SharedConfig } from "../shared-config";

class ImportXPlugin extends Plugin {
  public constructor() {
    super("eslint-plugin-import-x", "import-x");
  }

  public resolveImports(imports: IImportResolver): void {
    imports.project.deps.addDependency(
      "eslint-import-resolver-typescript",
      DependencyType.BUILD,
    );
    return super.resolveImports?.(imports);
  }
}

/**
 * Configurations provided by eslint-plugin-import
 *
 * @see https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#config---flat-eslintconfigjs
 */
export class ImportX extends SharedConfig {
  /**
   * As ESLint Plugin
   */
  public static readonly PLUGIN: Plugin = new ImportXPlugin();

  /**
   * The default recommended rules
   */
  public static readonly RECOMMENDED = new ImportX("recommended");

  /**
   * Recommended typescript rules
   */
  public static readonly TYPESCRIPT = new ImportX("recommended", "typescript");

  private constructor(...paths: string[]) {
    super(
      ...paths.map((path) => ({
        module: "eslint-plugin-import-x",
        name: "importX",
        path: `flatConfigs.${path}`,
      })),
    );
  }

  public toJSON(): any {
    const code = this.createCode();
    return new (class extends CodeResolvable {
      public render(): string {
        return code.render();
      }
      public resolveImports(imports: IImportResolver): void {
        imports.project.deps.addDependency(
          "eslint-import-resolver-typescript",
          DependencyType.BUILD,
        );
        return code.resolveImports?.(imports);
      }
    })();
  }
}
