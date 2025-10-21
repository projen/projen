import { ModuleImports } from "../../private/modules";
import { IESLintConfig } from "../config";
import { ConfigWithExtends } from "../config-object";

/**
 * The legacy configuration for Projen
 * @todo convert exiting options into default configs
 *
 * @deprecated - use `EslintConfigs.RECOMMENDED` or `TypeScriptEslintConfigs.RECOMMENDED` instead
 */
export class LegacyProjenCompat implements IESLintConfig {
  public readonly imports: ModuleImports;
  public readonly configs: ConfigWithExtends[];

  public constructor() {
    this.imports = new ModuleImports();
    this.configs = [];
  }
}
