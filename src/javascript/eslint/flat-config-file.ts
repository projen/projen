import { IConstruct } from "constructs";
import { FileBase } from "../../file";
import { ModuleType } from "../module-type";
import { IEslintConfig } from "./flat-config";
import { ModuleImports } from "../private/modules";

export interface EslintConfigFileOptions {
  /**
   * The ESLint configurations as an ordered list.
   */
  readonly configs?: IEslintConfig[];

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

export class EslintConfigFile extends FileBase {
  private readonly configs: IEslintConfig[];
  private readonly moduleType: ModuleType;
  private readonly topLevelImports: ModuleImports;

  constructor(scope: IConstruct, options: EslintConfigFileOptions) {
    const moduleType = options.moduleType ?? ModuleType.ESM;
    const filename = moduleType.fileWithExt("eslint.config.js");

    super(scope, filename);

    // Set options to class properties
    this.configs = options.configs ?? [];
    this.moduleType = moduleType;

    // always load defineConfig
    this.topLevelImports = new ModuleImports();
    this.topLevelImports.from("eslint/config", "defineConfig");
  }

  /**
   * Add a configuration to the file.
   */
  public addConfig(config: IEslintConfig) {
    this.configs.push(config);
  }

  /**
   * Sync the config file with the current state of the configs.
   */
  protected synthesizeContent(): string {
    const importParts = this.importStatements();
    const exportStatement =
      this.moduleType === ModuleType.ESM
        ? "export default"
        : "module.exports =";
    const configParts = this.configs.flatMap((c) => c.config ?? []);

    return [
      ...(this.marker ? [`// ${this.marker}`] : []),
      ...importParts,
      "",
      `${exportStatement} defineConfig(`,
      indent(configParts.join(",\n")),
      ");",
      "",
    ].join("\n");
  }

  /**
   * Generate import statements for ESLint configuration based on the module type.
   *
   * @returns An array containing all necessary import statements
   */
  private importStatements(): string[] {
    const imports = new ModuleImports();

    // Load class level imports
    imports.merge(this.topLevelImports);

    // add imports from configs
    for (const config of this.configs) {
      if (config.imports) {
        imports.merge(config.imports);
      }
    }

    if (this.moduleType.isEsm()) {
      return imports.asEsmImports();
    }

    return imports.asCjsRequire();
  }
}

/**
 * Returns a string with every line in the input prefixed by the indentation.
 */
function indent(lines: string, indentation: number = 2): string {
  const prefix = " ".repeat(indentation);
  return lines
    .split("\n")
    .map((line) => prefix + line)
    .join("\n");
}
