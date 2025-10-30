import { from, js, json } from "../private/code-template";
import { IESLintConfig } from "./config";
import { CodeResolvable, ICodeResolvable, IImportResolver } from "../../code-resolvable";

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
export class SharedConfig extends CodeResolvable implements IESLintConfig {

  private readonly config: ICodeResolvable;

  public constructor(...defs: SharedConfigDefinition[]) {  
    super(); 
    if (defs.length === 1) {
      const alias = from(defs[0].module).default.as(defs[0].name);
      this.config = js`${alias}.${defs[0].path}` as any;
    } else {
      this.config = json({
        extends: defs.map(def => {
          const alias = from(def.module).default.as(def.name);
          return js`${alias}.${def.path}` as any;
        })
      })
    }
  }

  public render(): string {
    return this.config.render();
  }

  public resolveImports(imports: IImportResolver): void {
    return this.config.resolveImports?.(imports);
  }
}
