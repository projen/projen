import { EslintConfigExtension, IEslintConfig } from "./eslint-config";
import { NodeProject } from "../../node-project";

export class PrettierConfig implements IEslintConfig {
  public readonly enablePatterns: string[] = [];
  public readonly extensions: EslintConfigExtension[];

  constructor(project: NodeProject) {
    project.addDevDeps("prettier", "eslint-config-prettier");
    this.extensions = [
      {
        moduleSpecifier: "eslint-config-prettier",
        importedBinding: "prettierConfig",
      },
    ];
  }
}
