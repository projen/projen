import { IESLintConfig } from "./config";
import { ConfigWithExtends } from "./config-object";
import { from, js } from "../private/code-template";

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
  private readonly configs: ConfigWithExtends[] = [];

  public constructor(...defs: SharedConfigDefinition[]) {
    for (const def of defs) {
      const alias = from(def.module).default.as(def.name);
      this.configs.push(js`${alias}.${def.path}` as any);
    }
  }

  public toJSON() {
    return [...this.configs];
  }  
}
