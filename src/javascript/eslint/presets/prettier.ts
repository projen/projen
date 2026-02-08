import { CodeResolvable, IImportResolver } from "../../../code-resolvable";
import { DependencyType } from "../../../dependencies";
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

  public toJSON(): any {
    const code = this.createCode();
    return new class extends CodeResolvable {
      public render(): string {
        return code.render();
      }
      public resolveImports(imports: IImportResolver): void {
        imports.project.deps.addDependency("prettier", DependencyType.BUILD);
        imports.project.deps.addDependency("eslint-config-prettier", DependencyType.BUILD);
        return code.resolveImports?.(imports);
      }
    }();
  } 
}
