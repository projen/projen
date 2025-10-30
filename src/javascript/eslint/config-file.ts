import { IConstruct } from "constructs";
import { FileBase } from "../../file";
import { ModuleType } from "../module-type";
import { IESLintConfig } from "./config";
import { DataResolver } from "../../_private/data-resolver";
import { ConfigWithExtends } from "./config-object";
import { Code } from "../../_private/code";
import { js, from, json, CodeGenerator } from "../private/code-template";

export interface ESLintConfigFileOptions {
  /**
   * The ESLint configurations as an ordered list.
   */
  readonly configs?: IESLintConfig[];

  /**
   * The module type of configuration file.
   * - Set ModuleType.COMMON_JS to generates a `eslint.config.cjs` file.
   * - Set ModuleType.ESM to generates a `eslint.config.mjs` file.
   *
   * @default ModuleType.ESM
   */
  readonly moduleType?: ModuleType;

  /**
   * The filename of configuration file.
   * @default - "eslint.config.mjs" for ESM, "eslint.config.cjs" for CommonJS
   */
  readonly fileName?: string;
}

export class ESLintConfigFile extends FileBase {
  private readonly configs: IESLintConfig[];
  private readonly moduleType: ModuleType;

  constructor(scope: IConstruct, options: ESLintConfigFileOptions = {}) {
    const moduleType = options.moduleType ?? ModuleType.ESM;
    const filename = moduleType.fileWithExt("eslint.config.js");

    super(scope, filename);

    // Set options to class properties
    this.configs = options.configs ?? [];
    this.moduleType = moduleType;
  }

  /**
   * Add a configuration to the file.
   */
  public addConfig(config: IESLintConfig) {
    this.configs.push(config);
  }

  /**
   * Sync the config file with the current state of the configs.
   */
  protected synthesizeContent(): string {
    const defineConfig = from("eslint/config").defineConfig;
    const exportStatement = Code.literal(this.moduleType === ModuleType.ESM ? "export default" : "module.exports =");
    const marker = Code.literal(this.marker ? `// ${this.marker}\n` : '');
    const resolvedConfigs = this.resolveConfigs();
    
    const template = js`${marker}${exportStatement} ${defineConfig}(${json(resolvedConfigs)});\n`;

    const generator = new CodeGenerator();
    return generator.generateFile(template);
  }

  private resolveConfigs(): ConfigWithExtends[] {
    const dataResolver = new DataResolver();
    dataResolver.allowPassThrough(Code.isCodeResolvable);

    const resolvedConfigs = dataResolver.resolve(this.configs.flatMap(c => c.toJSON()), { args: [this.project] });
    return resolvedConfigs;
  }
}
