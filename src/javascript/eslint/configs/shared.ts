import { ModuleImports } from "../../private/modules";
import { IEslintConfig } from "../flat-config";

/**
 * The shared configuration properties.
 */
export interface SharedConfigProps {
  readonly module: string;
  readonly name: string;
  readonly path: string;
}

/**
 * An ESLint configuration preset shared via a module.
 */
export class SharedConfig implements IEslintConfig {
  public readonly imports: ModuleImports;
  public readonly config: string[];

  public constructor(props: SharedConfigProps) {
    this.imports = new ModuleImports();
    this.imports.default(props.module, props.name);
    this.config = [`${props.name}.${props.path}`];
  }
}
