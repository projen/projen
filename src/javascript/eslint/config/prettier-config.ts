import {
  EslintConfigExtension,
  EslintParser,
  EslintPlugin,
  EslintRules,
  IEslintConfig,
} from "./eslint-config";
import { NodeProject } from "../../node-project";

export class PrettierConfig implements IEslintConfig {
  public readonly enablePatterns: string[] = [];
  public readonly ignorePatterns?: string[];
  public readonly rules?: EslintRules;
  public readonly parser?: EslintParser;
  public readonly plugins?: EslintPlugin[];
  public readonly extensions?: EslintConfigExtension[];

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
