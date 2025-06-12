import {
  EslintConfigExtension,
  ESLintRules,
  IESLintConfig,
} from "./eslint-config";
import { NodeProject } from "../../node-project";

export class PrettierConfig implements IESLintConfig {
  public readonly rules: ESLintRules;
  public readonly extensions?: EslintConfigExtension[];

  constructor(project: NodeProject) {
    project.addDevDeps("prettier", "eslint-config-prettier");
    this.rules = {};
    this.extensions = [
      {
        moduleSpecifier: "eslint-config-prettier",
        importedBinding: "prettierConfig",
      },
    ];
  }
}
