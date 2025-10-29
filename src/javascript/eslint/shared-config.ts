import { IESLintConfig } from "./config";
import { ConfigWithExtends } from "./config-object";
import { ModuleImports } from "../private/modules";
import { Code } from "../../_private/code";

/**
 * A shared configuration definition.
 */
export interface SharedConfigDefinition {
  readonly module: string;
  readonly name: string;
  readonly path: string;
}

/**
 * An ESLint configuration preset shared via a module.
 */
export class SharedConfig implements IESLintConfig {
  public readonly imports: ModuleImports = new ModuleImports();
  private readonly configs: ConfigWithExtends[] = [];

  public constructor(...defs: SharedConfigDefinition[]) {
    for (const def of defs) {
      const alias = this.imports.default(def.module, def.name);
      this.configs.push(Code.literal(`${alias.render()}.${def.path}`) as any);
    }
  }

  public toJSON() {
    return [...this.configs];
  }  
}
