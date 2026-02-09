import { IConstruct } from "constructs";
import { DataResolver } from "../../_private/data-resolver";
import { CodeResolvable } from "../../code-resolvable";
import { DependencyType } from "../../dependencies";
import { FileBase, IResolver } from "../../file";
import { ModuleType } from "../module-type";
import { IESLintConfig } from "./config";
import { ConfigWithExtends } from "./config-object";
import { js, from, json, CodeTemplate } from "../private/code-template";
import { JavaScriptImportResolver } from "../private/modules";

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

  private _synthed?: { imports: JavaScriptImportResolver; code: CodeTemplate };

  constructor(scope: IConstruct, options: ESLintConfigFileOptions = {}) {
    const moduleType = options.moduleType ?? ModuleType.ESM;
    const filename = moduleType._fileWithExt("eslint.config.js");

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

  public preSynthesize(): void {
    // Phase 1: Resolve value
    const exportStatement =
      this.moduleType === ModuleType.ESM
        ? "export default"
        : "module.exports =";
    const defineConfig = from("eslint/config").defineConfig;
    const resolvedConfigs = this.resolveConfigs();
    const code = js`${exportStatement} ${defineConfig}(${json(resolvedConfigs)});`;

    // Phase 2: Collect imports
    const imports = new JavaScriptImportResolver(this.project);
    code.resolveImports?.(imports);

    // Phase 3: Add dependencies
    imports.dependencies.forEach((m) =>
      this.project.deps.addDependency(m, DependencyType.BUILD),
    );

    this._synthed = {
      imports,
      code,
    };
  }

  /**
   * Sync the config file with the current state of the configs.
   */
  protected synthesizeContent(_resolver: IResolver): string {
    const { imports, code } = this._synthed!;

    // Phase 4: Generate output
    const marker = this.marker ? `// ${this.marker}\n` : "";
    return js`${marker}${imports.asCode(this.moduleType)}\n\n${code}\n`.render();
  }

  private resolveConfigs(): ConfigWithExtends[] {
    const dataResolver = new DataResolver();
    dataResolver.allowPassThrough(CodeResolvable.isCodeResolvable);

    const resolvedConfigs = this.configs.flatMap((c) =>
      dataResolver.resolve(c, { args: [this.project] }),
    );
    return resolvedConfigs;
  }
}
