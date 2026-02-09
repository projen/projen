import { RESERVED_KEYWORDS } from "./reserved-words";
import { Code } from "../../_private/code";
import { ICodeResolvable, IImportResolver } from "../../code-resolvable";
import { Project } from "../../project";
import { ModuleType } from "../module-type";

type NamedImport = [string, string?];

const DEFAULT = "default";

export class ModuleImports {
  private namedImports = new Map<string, Map<string, NamedImport>>();

  /**
   * Adds a named import from a module
   */
  public from(
    moduleName: string,
    importName?: string,
    as?: string,
  ): ICodeResolvable {
    return this.add(moduleName, importName ?? DEFAULT, as);
  }

  /**
   * Adds a default import from a module
   */
  public default(moduleName: string, as: string): ICodeResolvable {
    return this.add(moduleName, DEFAULT, as);
  }

  /**
   * Merge imports from another ModuleImports instance
   */
  public merge(imports: ModuleImports) {
    for (const [moduleName, namedImports] of imports.namedImports) {
      for (const [importName, as] of namedImports.values()) {
        this.add(moduleName, importName, as);
      }
    }
  }

  /**
   * Adds an import
   */
  private add(
    moduleName: string,
    importName: string,
    as?: string,
  ): ICodeResolvable {
    const name = renderName(importName);
    const moduleImports = this.namedImports.get(moduleName) ?? new Map();

    // Check for exact duplicate first
    const existingName = this.checkForDuplicate(moduleImports, name, as);
    if (existingName) {
      return Code.literal(existingName);
    }

    // Resolve the final name (handling reserved keywords and conflicts)
    const resolvedName = this.resolveName(name, as);
    const finalImportKey = `${name}:${resolvedName === name ? "" : resolvedName}`;

    // Add the import
    moduleImports.set(finalImportKey, [
      importName,
      resolvedName === name ? undefined : resolvedName,
    ]);
    this.namedImports.set(moduleName, moduleImports);

    return Code.literal(resolvedName);
  }

  /**
   * Checks if an import already exists and returns the existing name if found
   */
  private checkForDuplicate(
    moduleImports: Map<string, NamedImport>,
    name: string,
    as?: string,
  ): string | null {
    const importKey = `${name}:${as || ""}`;
    if (moduleImports.has(importKey)) {
      const existingImport = moduleImports.get(importKey)!;
      return existingImport[1] || name;
    }
    return null;
  }

  /**
   * Resolves the final name for an import, handling reserved keywords and naming conflicts
   */
  private resolveName(importName: string, alias?: string): string {
    // Start with the desired name (alias if provided, otherwise import name)
    let desiredName = alias || importName;

    // Handle reserved keywords by appending underscore
    if (RESERVED_KEYWORDS.includes(desiredName)) {
      desiredName = `${desiredName}_`;
    }

    // Collect all currently used names across all modules
    const allUsedNames = new Set<string>();
    for (const moduleImports of this.namedImports.values()) {
      for (const [importName, alias] of moduleImports.values()) {
        const usedName = alias || renderName(importName);
        allUsedNames.add(usedName);
      }
    }

    // Find a unique name if there's a conflict
    let candidateName = desiredName;
    let counter = 1;

    while (allUsedNames.has(candidateName)) {
      candidateName = `${desiredName}${counter}`;
      counter++;
    }

    return candidateName;
  }

  /**
   * Get a list of all used modules.
   * This might include submodules from the same package.
   */
  public get modules(): string[] {
    return Array.from(this.namedImports.keys()).sort();
  }

  /**
   * Get a list of all used packages.
   * This is guaranteed to be a unique list if packages.
   */
  public get dependencies(): string[] {
    const deps = this.modules.map((m) => {
      const parts = !m.startsWith("@") ? 1 : 2;
      return m.split("/", parts).join("/");
    });

    return Array.from(new Set(deps));
  }

  /**
   * Return all imports as a code literal for the given module type
   */
  public asCode(moduleType: ModuleType): ICodeResolvable {
    if (moduleType === ModuleType.COMMON_JS) {
      return Code.literal(this.asCjsRequire().join("\n"));
    }
    return Code.literal(this.asEsmImports().join("\n"));
  }

  /**
   * Return all imports as ESM import statements
   */
  public asEsmImports(): string[] {
    return this.all().map(
      ([moduleName, namedImports]) =>
        `import { ${namedImports
          .map(renderEsmImport)
          .join(", ")} } from "${moduleName}";`,
    );
  }

  /**
   * Return all imports as CJS require statements
   */
  public asCjsRequire(): string[] {
    return this.all().flatMap(([moduleName, namedImports]) => {
      // we have a default import
      const defaultImport = namedImports.find(([name]) => DEFAULT === name);
      if (defaultImport) {
        const otherImports = namedImports.filter(([name]) => DEFAULT !== name);
        const result = [
          `const ${defaultImport[1]} = require("${moduleName}");`,
        ];
        if (otherImports.length > 0) {
          result.push(
            `const { ${otherImports.map(renderCjsImport).join(", ")} } = ${
              defaultImport[1]
            };`,
          );
        }
        return result;
      }

      return `const { ${namedImports
        .map(renderCjsImport)
        .join(", ")} } = require("${moduleName}");`;
    });
  }

  private all(): [string, NamedImport[]][] {
    return Array.from(this.namedImports.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => [
        key,
        Array.from(value.values()).sort((a, b) => {
          // Default imports first
          if (a[0] === DEFAULT && b[0] !== DEFAULT) return -1;
          if (a[0] !== DEFAULT && b[0] === DEFAULT) return 1;
          // Then sort by name
          return renderName(a[0]).localeCompare(renderName(b[0]));
        }),
      ]);
  }
}

export class JavaScriptImportResolver
  extends ModuleImports
  implements IImportResolver
{
  public readonly project: Project;

  public constructor(project: Project) {
    super();
    this.project = project;
  }
}

/**
 * Render a named ESM import.
 */
function renderEsmImport([importName, as]: NamedImport): string {
  if (!as) {
    return renderName(importName);
  }

  return `${renderName(importName)} as ${as}`;
}

/**
 * Render a name for an import.
 */
function renderName(name: string | symbol): string {
  if (typeof name === "symbol") {
    return name.description || "default";
  }

  return name;
}

/**
 * Render a named CJS import.
 */
function renderCjsImport([importName, as]: NamedImport): string {
  const name = renderName(importName);
  if (!as) {
    return name;
  }

  return `${name}: ${as}`;
}
