import { IConstruct } from "constructs";
import { FileBase } from "../../file";
import { ModuleType } from "../module-type";
import { IESLintConfig } from "./config";
import { ModuleImports } from "../private/modules";
import { DataResolver } from "../../_private/data-resolver";
import { Plugin } from "./config-object";
import { Code } from "../../_private/code";

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
  protected synthesizeContent(): string {
    const pluginImports = new ModuleImports();
    const dataResolver = new DataResolver();
    dataResolver.registerHandler((value) => value instanceof Plugin, (resolver, plugin, options) => {
      pluginImports.merge(plugin.imports);
      return resolver(plugin.toJSON(), options);
    });
    dataResolver.registerPassThrough(Code.isCodeResolvable);

    const resolvedConfigs = dataResolver.resolve(this.configs.flatMap(c => c.toJSON()), { args: [this.project] });

    const importParts = this.importStatements(pluginImports);
    const exportStatement =
      this.moduleType === ModuleType.ESM
        ? "export default"
        : "module.exports =";

    return [
      ...(this.marker ? [`// ${this.marker}`] : []),
      ...importParts,
      "",
      `${exportStatement} defineConfig(${this.stringifyWithCode(resolvedConfigs, 2)});`,
      "",
    ].join("\n");
  }

  private stringifyWithCode(value: any, indentation: number): string {
    const serialize = (val: any, depth = 0): string => {
      if (Code.isCodeResolvable(val)) {
        const code = val.render();
        const lines = code.split('\n');
        if (lines.length === 1) return code;
        const [first, ...rest] = lines;
        const indentedRest = rest.map(line => ' '.repeat(depth * indentation) + line);
        return [first, ...indentedRest].join('\n');
      }

      if (Array.isArray(val)) {
        if (val.length === 0) return '[]';
        const nextIndent = ' '.repeat((depth + 1) * indentation);
        const items = val.map(item => nextIndent + serialize(item, depth + 1)).join(',\n');
        return `[\n${items}\n${' '.repeat(depth * indentation)}]`;
      }
      if (val && typeof val === 'object') {
        const entries = Object.entries(val);
        if (entries.length === 0) return '{}';
        const nextIndent = ' '.repeat((depth + 1) * indentation);
        const props = entries.map(([k, v]) => `${nextIndent}${JSON.stringify(k)}: ${serialize(v, depth + 1)}`).join(',\n');
        return `{\n${props}\n${' '.repeat(depth * indentation)}}`;
      }
      return JSON.stringify(val);
    };
    return serialize(value);
  }

  /**
   * Generate import statements for ESLint configuration based on the module type.
   *
   * @returns An array containing all necessary import statements
   */
  private importStatements(pluginImports?: ModuleImports): string[] {
    const imports = new ModuleImports();

    // Load class level imports
    imports.merge(this.topLevelImports);

    // add imports from configs
    for (const config of this.configs) {
      if (config.imports) {
        imports.merge(config.imports);
      }
    }

    // add plugin imports
    if (pluginImports) {
      imports.merge(pluginImports);
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
export function indent(lines: string, indentation = 2): string {
  const prefix = " ".repeat(indentation);
  return lines
    .split("\n")
    .map((line) => prefix + line)
    .join("\n");
}
