import { IConstruct } from "constructs";
import { FileBase } from "../../file";
import { ModuleType } from "../module-type";
import { IESLintConfig } from "./config";
import { DataResolver } from "../../_private/data-resolver";
import { Plugin } from "./config-object";
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
  private readonly generator = new CodeGenerator();

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
    const dataResolver = new DataResolver();
    dataResolver.registerHandler((value) => value instanceof Plugin, (resolver, plugin, options) => {
      return resolver(plugin.toJSON(), options);
    });
    dataResolver.registerPassThrough(Code.isCodeResolvable);

    const resolvedConfigs = dataResolver.resolve(this.configs.flatMap(c => c.toJSON()), { args: [this.project] });

    const defineConfig = from("eslint/config").defineConfig;
    const exportStatement = Code.literal(this.moduleType === ModuleType.ESM ? "export default" : "module.exports =");
    const marker = Code.literal(this.marker ? `// ${this.marker}\n` : '');

    const configJson = json(resolvedConfigs);
    
    const template = js`${marker}${exportStatement} ${defineConfig}(${configJson});
`;

    return this.generator.generateFile(template);
  }


}
