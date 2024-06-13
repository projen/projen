import * as inventory from "../inventory";
import { InitProjectOptionHints } from "../option-hints";

const PROJEN_NEW = "__new__";
const TAB = makePadding(2);

/**
 * Options for `renderProjectOptions`.
 */
export interface RenderProjectOptions {
  /**
   * The project type to render.
   */
  readonly type: inventory.ProjectType;

  /**
   * Project arguments as passed to `projen new`.
   */
  readonly args: Record<string, any>;

  /**
   * Include commented out options.
   * @default InitProjectOptionHints.FEATURED
   */
  readonly comments?: InitProjectOptionHints;

  /**
   * Inject a `__new__` attribute to the project constructor with a stringified
   * version of the project parameters and a `jsiiFqn` attribute that includes
   * the FQN of the project type. This is needed in order to generate initial
   * projenrc files.
   *
   * @default false
   */
  readonly bootstrap?: boolean;

  /**
   * A list of fields to omit from the initial projenrc file.
   * @default - none
   */
  readonly omitFromBootstrap?: string[];

  /**
   * Prefix all imports with this string and the full module name
   * This is required when executing options code in a vm
   *
   * @default - only use submodule as prefix
   */
  readonly prefixImports?: string;
}

/**
 * Information passed from `projen new` to the project object when the project
 * is first created. It is used to generate projenrc files in various languages.
 */
interface ProjenInit {
  /**
   * The JSII FQN of the project type.
   */
  readonly fqn: string;

  /**
   * Initial arguments passed to `projen new`.
   */
  readonly args: Record<string, any>;

  /**
   * Include commented out options. Does not apply to projenrc.json files.
   */
  readonly comments: InitProjectOptionHints;
}

/**
 * Renders options as if the project was created via `projen new` (embeds the __new__ field).
 */
export function renderProjenInitOptions(
  fqn: string,
  args: Record<string, any>,
  comments: InitProjectOptionHints = InitProjectOptionHints.NONE
): any {
  return {
    ...args,
    [PROJEN_NEW]: { fqn, args, comments } as ProjenInit,
  };
}

export function resolveInitProject(opts: any) {
  const f = opts[PROJEN_NEW] as ProjenInit;
  if (!f) {
    return undefined;
  }

  const type = inventory.resolveProjectType(f.fqn);
  if (!type) {
    throw new Error(`unable to resolve project type for ${f.fqn}`);
  }
  return {
    args: f.args,
    fqn: f.fqn,
    type: type,
    comments: f.comments,
  };
}

export class ModuleImports {
  private imports: Map<string, Set<string>> = new Map();

  /**
   * Add a named import from a module
   */
  public add(moduleName: string, importName: string) {
    const moduleImports = this.imports.get(moduleName) ?? new Set();
    moduleImports.add(importName);
    this.imports.set(moduleName, moduleImports);
  }

  /**
   * Get all named imports for a module
   */
  public get(moduleName: string): string[] {
    const moduleImports = this.imports.get(moduleName) ?? new Set();
    return Array.from(moduleImports);
  }

  /**
   * Get a list of all used modules
   */
  public get modules(): string[] {
    return Array.from(this.imports.keys());
  }

  /**
   * Return all imports as ESM import statements
   */
  public asEsmImports(): string[] {
    return this.all().map(
      ([moduleName, namedImports]) =>
        `import { ${[...namedImports].join(", ")} } from "${moduleName}";`
    );
  }

  /**
   * Return all imports as CJS require statements
   */
  public asCjsRequire(): string[] {
    return this.all().map(
      ([moduleName, namedImports]) =>
        `const { ${[...namedImports].join(", ")} } = require("${moduleName}");`
    );
  }

  private all(): Array<[string, string[]]> {
    const allImports = Object.fromEntries(this.imports);
    return Object.entries(allImports).map(([key, value]) => [
      key,
      Array.from(value).sort(),
    ]);
  }
}

/**
 * Prints all parameters that can be used in a project type, alongside their descriptions.
 *
 * Parameters in `params` that aren't undefined are rendered as defaults,
 * while all other parameters are rendered as commented out.
 *
 * Returns the printed output and a set of required imports as an object
 * in the form { options, imports }.
 */
export function renderJavaScriptOptions(opts: RenderProjectOptions): {
  renderedOptions: string;
  imports: ModuleImports;
} {
  const renders: Record<string, string> = {};
  const optionsWithDefaults: string[] = [];
  const allImports = new ModuleImports();

  for (const option of opts.type.options) {
    if (option.deprecated) {
      continue;
    }

    const optionName = option.name;

    if (opts.args[optionName] !== undefined) {
      const arg = opts.args[optionName];
      const { js, moduleName, importName } = renderArgAsJavaScript(arg, option);

      renders[optionName] = `${optionName}: ${js},`;
      optionsWithDefaults.push(optionName);

      if (moduleName && importName) {
        allImports.add(moduleName, importName);
        if (opts.prefixImports) {
          const prefix = `${opts.prefixImports}["${moduleName}"].`;
          renders[optionName] = `${optionName}: ${prefix}${js},`;
        }
      }
    } else {
      const defaultValue = option.default?.startsWith("-")
        ? undefined
        : option.default ?? undefined;
      renders[optionName] = `// ${optionName}: ${defaultValue},`;
    }
  }

  const bootstrap = opts.bootstrap ?? false;
  if (bootstrap) {
    for (const arg of opts.omitFromBootstrap ?? []) {
      delete opts.args[arg];
    }
    renders[PROJEN_NEW] = `${PROJEN_NEW}: ${JSON.stringify({
      args: opts.args,
      fqn: opts.type.fqn,
      comments: opts.comments,
    } as ProjenInit)},`;
    optionsWithDefaults.push(PROJEN_NEW);
  }

  // generate rendering
  const result: string[] = [];
  result.push("{");

  // render options with defaults
  optionsWithDefaults.sort();
  for (const optionName of optionsWithDefaults) {
    result.push(`${TAB}${renders[optionName]}`);
  }
  if (result.length > 1) {
    result.push("");
  }

  // render options without defaults as comments
  if (opts.comments === InitProjectOptionHints.ALL) {
    const options = opts.type.options.filter(
      (opt) => !opt.deprecated && opts.args[opt.name] === undefined
    );
    result.push(...renderCommentedOptionsByModule(renders, options));
  } else if (opts.comments === InitProjectOptionHints.FEATURED) {
    const options = opts.type.options.filter(
      (opt) =>
        !opt.deprecated && opts.args[opt.name] === undefined && opt.featured
    );
    result.push(...renderCommentedOptionsInOrder(renders, options));
  } else if (opts.comments === InitProjectOptionHints.NONE) {
    // don't render any extra options
  }

  if (result[result.length - 1] === "") {
    result.pop();
  }
  result.push("}");
  return { renderedOptions: result.join("\n"), imports: allImports };
}

function renderCommentedOptionsByModule(
  renders: Record<string, string>,
  options: inventory.ProjectOption[]
) {
  const optionsByModule: Record<string, inventory.ProjectOption[]> = {};

  for (const option of options) {
    const parentModule = option.parent;
    optionsByModule[parentModule] = optionsByModule[parentModule] ?? [];
    optionsByModule[parentModule].push(option);
  }

  for (const parentModule in optionsByModule) {
    optionsByModule[parentModule].sort((o1, o2) =>
      o1.name.localeCompare(o2.name)
    );
  }

  const result = [];
  const marginSize = Math.max(
    ...options.map((opt) => renders[opt.name].length)
  );
  for (const [moduleName, optionGroup] of Object.entries(
    optionsByModule
  ).sort()) {
    result.push(`${TAB}/* ${moduleName} */`);
    for (const option of optionGroup) {
      const paramRender = renders[option.name];
      const docstring = option.docs || "No documentation found.";
      result.push(
        `${TAB}${paramRender}${makePadding(
          marginSize - paramRender.length + 2
        )}/* ${docstring} */`
      );
    }
    result.push("");
  }
  return result;
}

function renderCommentedOptionsInOrder(
  renders: Record<string, string>,
  options: inventory.ProjectOption[]
) {
  const result = [];
  const marginSize = Math.max(
    ...options.map((opt) => renders[opt.name].length)
  );
  for (const option of options) {
    const paramRender = renders[option.name];
    const docstring = option.docs || "No documentation found.";
    result.push(
      `${TAB}${paramRender}${makePadding(
        marginSize - paramRender.length + 2
      )}/* ${docstring} */`
    );
  }
  return result;
}

/**
 * Renders a value as a JavaScript value, converting strings to enums where
 * appropriate. The type must be JSON-like (string, number, boolean, array,
 * enum, or JSON object).
 *
 * Returns a JavaScript expression as a string, and the names of any
 * necessary imports.
 */
function renderArgAsJavaScript(arg: any, option: inventory.ProjectOption) {
  if (option.kind === "enum") {
    if (!option.fqn) {
      throw new Error(`fqn field is missing from enum option ${option.name}`);
    }
    const parts = option.fqn.split("."); // -> ['projen', 'web', 'MyEnum']
    const enumChoice = String(arg).toUpperCase().replace(/-/g, "_"); // custom-value -> CUSTOM_VALUE
    const js = `${parts.slice(1).join(".")}.${enumChoice}`; // -> web.MyEnum.CUSTOM_VALUE
    const moduleName = parts[0]; // -> projen
    const importName = parts[1]; // -> web
    return { js, moduleName, importName };
  } else if (option.jsonLike) {
    return { js: JSON.stringify(arg) };
  } else {
    throw new Error(
      `Unexpected option ${option.name} - cannot render a value for this option because it does not have a JSON-like type.`
    );
  }
}

function makePadding(paddingLength: number): string {
  return " ".repeat(paddingLength);
}
