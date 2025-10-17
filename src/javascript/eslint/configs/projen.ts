import { ModuleImports } from "../../private/modules";
import { IEslintConfig } from "../flat-config";

/**
 * The legacy configuration for Projen
 *
 * @deprecated - use `EslintConfigs.RECOMMENDED` or `TypeScriptEslintConfigs.RECOMMENDED` instead
 */
export class ProjenLegacyConfig implements IEslintConfig {
  public readonly imports: ModuleImports;
  public readonly config: string[];

  public constructor() {
    this.imports = new ModuleImports();
    this.config = [];
  }
}
