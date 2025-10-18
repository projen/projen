type NamedImport = [string | symbol, string?];

const DEFAULT = Symbol("default");

export class ModuleImports {
  private namedImports: Map<string, Map<string, NamedImport>> = new Map();

  /**
   * Adds a named import from a module
   */
  public from(moduleName: string, importName: string, as?: string) {
    this.add(moduleName, importName, as);
  }

  /**
   * Adds a default import from a module
   */
  public default(moduleName: string, as: string) {
    this.add(moduleName, DEFAULT, as);
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
  private add(moduleName: string, importName: string | symbol, as?: string) {
    const moduleImports = this.namedImports.get(moduleName) ?? new Map();
    const importKey = `${renderName(importName)}:${as || ""}`;
    moduleImports.set(importKey, [importName, as]);
    this.namedImports.set(moduleName, moduleImports);
  }

  /**
   * Get a list of all used modules
   */
  public get modules(): string[] {
    return Array.from(this.namedImports.keys());
  }

  /**
   * Return all imports as ESM import statements
   */
  public asEsmImports(): string[] {
    return this.all().map(
      ([moduleName, namedImports]) =>
        `import { ${namedImports
          .map(renderEsmImport)
          .join(", ")} } from "${moduleName}";`
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
            };`
          );
        }
        return result;
      }

      return `const { ${namedImports
        .map(renderCjsImport)
        .join(", ")} } = require("${moduleName}");`;
    });
  }

  private all(): Array<[string, NamedImport[]]> {
    return Array.from(this.namedImports.entries()).map(([key, value]) => [
      key,
      Array.from(value.values()).sort((a, b) =>
        renderName(a[0]).localeCompare(renderName(b[0]))
      ),
    ]);
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
