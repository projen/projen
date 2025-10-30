import { ICodeResolvable } from "../../code-resolvable";
import { from, js, json } from "../private/code-template";
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
  private readonly defs: SharedConfigDefinition[];

  public constructor(...defs: SharedConfigDefinition[]) {  
    this.defs = defs;
  }

  protected createCode(): ICodeResolvable {
    if (this.defs.length === 1) {
      const def = this.defs[0];
      const alias = from(def.module).default.as(def.name);
      return js`${alias}.${def.path}`;
    } 
    return json({
      extends: this.defs.map(def => {
        const alias = from(def.module).default.as(def.name);
        return js`${alias}.${def.path}` as any;
      })
    });
  }

  public toJSON(): any {
    return this.createCode();
  }
}
