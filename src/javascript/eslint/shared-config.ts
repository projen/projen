import { ConfigWithExtends } from "./config-object";
import { from, js } from "../private/code-template";
import { IESLintConfig } from "./config";

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
  public readonly name: string; 
  private readonly config: ConfigWithExtends;

  public constructor(...defs: SharedConfigDefinition[]) {
    this.name = defs.map(def => `${def.module}/${def.name}`).join(', ');
    
    if (defs.length === 1) {
      const alias = from(defs[0].module).default.as(defs[0].name);
      this.config = js`${alias}.${defs[0].path}` as any;
    } else {
      this.config = {
        extends: defs.map(def => {
          const alias = from(def.module).default.as(def.name);
          return js`${alias}.${def.path}` as any;
        })
      }
    }
  }

  public toJSON(): any {
    return this.config;
  }  
}
