import assert = require("assert");
import { IResolver } from "./file";
import { JsonFile, JsonFileOptions } from "./json";
import { Project } from "./project";

class CodeToken {
  static tokenMap = new Map<string, (level: number, idt: string) => string>();

  static resolve(code: string, level: number, idt: string) {
    return code.replace(/(?<!\\)\$\{Token\d+\}/g, (token) =>
      CodeToken.resolveToken(token, level, idt)
    );
  }

  static isResolved(code: string) {
    return !/(?<!\\)\$\{Token\d+\}/.test(code);
  }

  static resolveToken(token: string, level: number, idt: string) {
    const resolveValue = CodeToken.tokenMap.get(token);
    if (resolveValue) {
      return resolveValue(level, idt);
    }
    return token;
  }

  readonly token: string;
  constructor(resolveValue: (level: number, idt: string) => string) {
    this.token = `\${Token${CodeToken.tokenMap.size}}`;
    CodeToken.tokenMap.set(this.token, resolveValue);
  }
}

abstract class CodeStringifier {
  token?: string;
  abstract stringify(level: number, idt: string): string;

  resolve(indentation: string | number = 2): string {
    const idt =
      typeof indentation === "number" ? " ".repeat(indentation) : indentation;
    let value = this.stringify(0, idt) ?? "";
    // let count = 0;
    // while (!CodeToken.isResolved(value) && count++ < 10) {
    //   value = CodeToken.resolve(value, 0, idt);
    // }
    return value;
  }

  toString() {
    this.token ??= new CodeToken(
      (level, idt) => this.stringify(level, idt) ?? ""
    ).token;
    return this.token;
  }
}

export class JavascriptFunction extends CodeStringifier {
  static named(
    name: string | undefined,
    properties: Array<unknown>,
    body: unknown
  ) {
    return new JavascriptFunction(name, properties, body);
  }
  static arrow(properties: Array<unknown>, body: unknown) {
    return new JavascriptFunction(undefined, properties, body);
  }
  constructor(
    private readonly name: string | undefined,
    private readonly properties: Array<unknown>,
    private readonly body: unknown
  ) {
    super();
  }
  stringify(level = 0, idt = "  ") {
    const dent = idt ? idt.repeat(level) : "";
    const dentPlus = idt ? idt.repeat(level + 1) : "";

    const header = this.name ? `function ${this.name}` : ``;
    const parametersValue = this.properties
      .map((p) => doStringify(p, 0, ""))
      .join(", ");
    const parameters = `(${parametersValue})`;
    const arrow = this.name ? " " : " => ";
    const bodyValue = (Array.isArray(this.body) ? this.body : [this.body])
      .map((p) => dentPlus + doStringify(p, 0, ""))
      .join("\n");
    const body = CodeToken.resolve(`{\n${bodyValue}\n${dent}}`, level + 1, idt);
    return `${header}${parameters}${arrow}${body}`;
  }
}

export class JavascriptRaw extends CodeStringifier {
  static value(body: string | Array<string>) {
    return new JavascriptRaw(body);
  }
  constructor(private readonly body: string | Array<string>) {
    super();
  }
  stringify(level = 0, idt = "  ") {
    if (typeof this.body === "string") {
      return CodeToken.resolve(this.body, level, idt);
    } else {
      return this.body
        .map((l) => idt.repeat(level) + CodeToken.resolve(l, level, idt))
        .join("\n");
    }
  }
}

export class JavascriptDataStructure extends CodeStringifier {
  static value(body: unknown) {
    return new JavascriptDataStructure(body);
  }
  constructor(private readonly body: unknown) {
    super();
  }
  stringify(level = 0, idt = "  ") {
    return doStringify(this.body, level, idt) ?? "undefined";
  }
}

interface JavascriptDependenciesOptions {
  cjs?: boolean;
}
export class JavascriptDependencies extends CodeStringifier {
  imports: Map<string, Array<string>> = new Map();
  defaultImports: Map<string, string> = new Map();
  froms = new Set<string>();
  cjs: boolean;
  constructor(props: JavascriptDependenciesOptions = {}) {
    super();

    this.cjs = props.cjs ?? false;
  }
  addImport(imports: Array<string> | string, from: string) {
    if (typeof imports === "string") {
      if (this.defaultImports.has(from)) {
        throw new Error(`Default import already exists for ${from}`);
      }
      this.defaultImports.set(from, imports);
      this.froms.add(from);
      return [JavascriptRaw.value(imports)];
    }
    if (this.imports.has(from)) {
      this.imports.set(from, this.imports.get(from)!.concat(imports));
    } else {
      this.imports.set(from, imports);
    }
    this.froms.add(from);
    return imports.map((i) => JavascriptRaw.value(i));
  }
  stringify(level = 0, _idt = "  ") {
    if (level !== 0) {
      throw new Error("JavascriptDependencies cannot be nested");
    }
    const out: Array<string> = [];
    for (const from of this.froms) {
      const imports = this.imports.get(from) ?? [];
      const defaultImport = this.defaultImports.get(from);
      const value = imports.map((i) => i.toString()).join(", ");
      if (defaultImport && imports.length > 0) {
        if (this.cjs) {
          out.push(`const ${defaultImport} = require('${from}');`);
          out.push(`const { ${value} } = ${defaultImport};`);
        } else {
          out.push(`import ${defaultImport}, { ${value} } from '${from}';`);
        }
      } else if (defaultImport) {
        if (this.cjs) {
          out.push(`const ${defaultImport} = require('${from}');`);
        } else {
          out.push(`import ${defaultImport} from '${from}';`);
        }
      } else {
        if (this.cjs) {
          out.push(`const { ${value} } = require('${from}');`);
        } else {
          out.push(`import { ${value} } from '${from}';`);
        }
      }
    }
    return out.join("\n");
  }
}

function doStringify(
  data: unknown,
  level = 0,
  idt: string = "  "
): string | undefined {
  const dent = idt.repeat(level);
  const dentPlus = idt.repeat(level + 1);
  if (data instanceof JavascriptFunction || data instanceof JavascriptRaw) {
    return data.stringify(level, idt ?? "");
  }
  if (typeof data === "number") {
    return data.toString();
  }
  if (data instanceof Date) {
    return `new Date(${JSON.stringify(data.toISOString())})`;
  }
  if (Array.isArray(data)) {
    const r: Array<string> = [];
    for (const val of data) {
      const value = doStringify(val, level + 1, idt);
      if (value) {
        r.push(value);
      }
    }
    if (idt) {
      return r.length === 0
        ? "[]"
        : `[\n${r.map((l) => dentPlus + l).join(",\n")},\n${dent}]`;
    }
    return `[${r.join(", ")}]`;
  }
  if (data && typeof data === "object") {
    const r: Array<string> = [];
    if (!Object.entries(data).length) {
      return "{}";
    }
    r.push("{");
    for (const [key, val] of Object.entries(data)) {
      // Four possible outputs per row:
      // 1. `key: value,`
      // 2. `"key": value`
      // 3. `[key]: "value"`
      // 4. `...key` (value is ignored)

      const value = doStringify(val, level + 1, idt);
      let keyString = key;
      // if the key is a token, resolve it (3,4)
      if (!CodeToken.isResolved(key)) {
        console.log("key", key);
        // and if it starts with `...` then we drop it in place (4)
        const resolvedKey = CodeToken.resolve(key, level, idt);
        if (resolvedKey.match(/^\.\.\./)) {
          r.push(dentPlus + `${resolvedKey},`);
          continue;
        } else {
          // otherwise we wrap it in `[]` (3)
          keyString = `[${resolvedKey}]`;
        }
      } else {
        // if the key is a valid identifier, we use it as is (1)
        // otherwise we quote it and wrap it in quotes (2)
        keyString = keyString.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)
          ? keyString
          : JSON.stringify(keyString);
      }

      // if the value is not undefined, we add it to the output
      // if you want the value to be exactly undefined,
      // then use`JavascriptRaw.value("undefined")`
      if (value !== undefined) {
        r.push(dentPlus + keyString + ": " + value + ",");
      }
    }
    r.push(dent + "}");
    return r.join(idt ? "\n" : " ");
  }
  return JSON.stringify(data);
}

/**
 * Options for the JsConfigFile class.
 */
export interface JavascriptFileOptions
  extends JavascriptDependenciesOptions,
    JsonFileOptions {}

/**
 * Represents a JS configuratin file (e.g. .eslintrc.js).
 * Suppor
 */
export class JavascriptFile extends JsonFile {
  public dependencies: JavascriptDependencies;
  cjs: boolean;
  constructor(
    project: Project,
    filePath: string,
    options: JavascriptFileOptions
  ) {
    super(project, filePath, { ...options, allowComments: false });
    this.dependencies = new JavascriptDependencies();
    this.cjs = options.cjs ?? false;
    if (!options.obj) {
      throw new Error('"obj" cannot be undefined');
    }
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const json = super.synthesizeContent(resolver);
    if (!json) {
      return undefined;
    }
    console.log(json);
    const data = JSON.parse(json);
    const plugins = data.plugins;
    if (plugins) {
      data.plugins = {};
      assert(Array.isArray(plugins), "plugins, if defnined, must be an array");
      for (const plugin of (plugins as Array<string>) ?? []) {
        const pluginFixed =
          "plugin_" + plugin.replace(/^@/g, "").replace(/(\/|-)/g, "_");
        const [pluginToken] = this.dependencies.addImport(pluginFixed, plugin);
        data.plugins[plugin] = pluginToken;
      }
    }

    const markerHeader = this.marker ? `// ${this.marker}\n` : "";

    return new JavascriptRaw(
      `${markerHeader}${this.dependencies}
${
  this.cjs ? `module.exports =` : `export default`
} ${JavascriptDataStructure.value(data)};
`
    ).resolve();
  }
}
