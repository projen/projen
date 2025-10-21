import { IConstruct } from "constructs";
import { FileBase, IResolver, ResolveOptions } from "../../file";
import { ModuleType } from "../module-type";
import { IESLintConfig } from "./config";
import { ModuleImports } from "../private/modules";

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
  private readonly topLevelImports: ModuleImports;

  constructor(scope: IConstruct, options: ESLintConfigFileOptions = {}) {
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
  public addConfig(config: IESLintConfig) {
    this.configs.push(config);
  }

  /**
   * Sync the config file with the current state of the configs.
   */
  protected synthesizeContent(resolver: IResolver): string {
    const importParts = this.importStatements();
    const exportStatement =
      this.moduleType === ModuleType.ESM
        ? "export default"
        : "module.exports =";
    const configParts = this.configs.flatMap((c) => c.configs ?? []);

    const configResolver = new ESLintConfigResolver(this.project, resolver);

    return [
      ...(this.marker ? [`// ${this.marker}`] : []),
      ...importParts,
      "",
      `${exportStatement} ${configResolver.resolve(configParts)}`,
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

interface ESLintConfigResolveOptions extends ResolveOptions {
  /**
   * The indentation of the resolved config.
   * @default 2
   */
  indentation?: number;
}

/**
 * Resolves an ESLint config to code.
 */
class ESLintConfigResolver implements IResolver {
  private readonly project: IConstruct;
  private readonly parent: IResolver;

  public constructor(project: IConstruct, parent: IResolver) {
    this.project = project;
    this.parent = parent;
  }

  public resolve(value: any, options?: ESLintConfigResolveOptions): string {
    const resolved = this.parent.resolve(value, {
      ...options,
      args: [this.project, ...(options?.args || [])],
    });

    const level = options?.indentation ?? 2;
    return `defineConfig(\n${this.indent(this.resolveToString(resolved, level), level)}\n);`;
  }

  private resolveToString(value: any, indentation = 2): string {
    if (typeof value === "string") {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map((v => this.resolveToString(v, indentation))).join(",\n");
    }

    return JSON.stringify(value, null, indentation);
  }

  /**
   * Returns a string with every line in the input prefixed by the indentation.
   */
  private indent(lines: string, indentation = 2): string {
    const prefix = " ".repeat(indentation);
    return lines
      .split("\n")
      .map((line) => prefix + line)
      .join("\n");
  }
}
