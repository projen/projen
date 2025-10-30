import { CodeResolvable, ICodeResolvable } from '../../_private/code-resolvable';
import { ModuleImports } from './modules';

/**
 * Custom error that suppresses the normal stack trace
 */
class ImportReferenceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImportReferenceError';
    // Keep the stack trace for debugging
    this.stack = undefined;
  }
}

/**
 * Captures a stack trace with increased limit for debugging
 */
function captureStackTrace(): string {
  const originalLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = 100;
  const stack = new Error().stack;
  Error.stackTraceLimit = originalLimit;
  return cleanStackTrace(stack);
}

/**
 * Cleans up a stack trace to show only the first relevant user code line
 */
function cleanStackTrace(stack?: string): string {
  if (!stack) return 'Unknown location';
  
  const lines = stack.split('\n');
  
  // Find first line that's not internal code after skipping Error frame
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line && 
        (line.includes('.ts:') || line.includes('.js:')) && 
        !line.includes('node:internal') && 
        !line.includes('node_modules') &&
        !line.includes('Module._compile') &&
        !line.includes('require.extensions') &&
        !line.includes('/projen/lib/javascript/private/code-template') &&
        !line.includes('/projen/src/javascript/private/code-template')
      ) {
      return line.trim();
    }
  }
  
  return lines[1]?.trim() || 'Unknown location';
}

/**
 * Base class for code references.
 * Each reference can only be used once to prevent naming conflicts.
 */
export class CodeReference extends CodeResolvable {
  protected _refName: string;
  private consumed = false;
  private firstUsageStack?: string;
  private creationStack: string;

  /**
   * Creates a new code reference.
   * @param refName - The name this reference will render as
   */
  constructor(refName: string) {
    super();
    this._refName = refName;
    this.creationStack = captureStackTrace();
  }

  /**
   * Gets the resolved reference name.
   */
  protected get refName(): string {
    return this._refName;
  }

  /**
   * Sets the resolved reference name.
   */
  protected set refName(value: string) {
    this._refName = value;
  }

  /**
   * Creates a reference to a nested property of this code reference.
   * @param propertyPath - The property path to access (e.g., "config.rules")
   * @returns A new CodeReference for the nested property
   */
  public path(propertyPath: string): CodeReference {
    return new CodeReference(`${this.refName}.${propertyPath}`);
  }

  /**
   * Renders this code reference as a string.
   * Can only be called once per reference to prevent naming conflicts.
   * @returns The resolved name of this reference
   * @throws ImportReferenceError if called more than once
   */
  public render(): string {
    if (this.consumed) {
      const currentStack = captureStackTrace();
      throw new ImportReferenceError(
        `Code reference already used. Create a new reference for reuse.\n\n` +
        `Reference created:\n    ${this.creationStack}\n` +
        `First use:\n    ${this.firstUsageStack}\n` +
        `Second use:\n    ${currentStack}\n`
      );
    }

    this.consumed = true;
    this.firstUsageStack = captureStackTrace();
    return this.refName;
  }
}

/**
 * A reference to an import that will be resolved when the code is generated.
 */
export class ImportReference extends CodeReference {
  private _importsCollected = false;

  /**
   * Gets the resolved reference name. Throws if collectImports hasn't been called yet.
   * @throws ImportReferenceError if collectImports hasn't been called
   */
  protected get refName(): string {
    if (!this._importsCollected) {
      throw new ImportReferenceError(
        'ImportReference must have collectImports() called before use. ' +
        'This usually happens automatically during code generation.'
      );
    }
    return this._refName;
  }

  protected set refName(value: string) {
    this._refName = value;
  }

  /**
   * Gets the resolved reference name for use by ImportPathReference.
   * @returns The resolved name after imports have been collected
   */
  public getResolvedName(): string {
    return this._refName;
  }



  /**
   * Creates a proxy that generates import references for any property access.
   * 
   * @example
   * ```typescript
   * const { Component, useState } = from("react");
   * const router = from("express").Router;
   * const aliased = from("react").default.as("MyReact");
   * ```
   */
  public static from(moduleName: string): any {
    return new Proxy({}, {
      get: (_, prop: string) => {
        const ref = ImportReference.createWithProxy(moduleName, prop);
        
        // Add as() method for aliasing
        if (prop === ImportReference.DEFAULT) {
          (ref as any).as = (alias: string) => ImportReference.createWithProxy(moduleName, prop, alias);
        }
        
        return ref;
      }
    });
  }

  private constructor(
    private moduleName: string,
    private importName: string,
    private alias?: string
  ) {
    super(alias || importName);
  }

  /**
   * Representing a default import
   */
  protected static DEFAULT = "default";

  private static createWithProxy(moduleName: string, importName: string, alias?: string): ImportReference {
    const ref = new ImportReference(moduleName, importName, alias);
    return ref.createProxy(ref);
  }

  /**
   * Creates a proxy for any object that supports unlimited property chaining.
   * @param target - The target object to wrap (ImportReference or ImportPathReference)
   * @returns A proxy that supports further nesting
   */
  private createProxy(target: ImportReference | ImportPathReference): any {
    return new Proxy(target, {
      get: (proxyTarget, prop: string) => {
        // If the property exists on the target, return it (bound if it's a function)
        if (prop in proxyTarget) {
          const value = (proxyTarget as any)[prop];
          return typeof value === 'function' ? value.bind(proxyTarget) : value;
        }
        
        // For nested property access, create a path reference and wrap it in a proxy
        const pathRef = proxyTarget.path(prop);
        return this.createProxy(pathRef);
      }
    });
  }

  /**
   * Creates a reference to a nested property of this import reference.
   * @param propertyPath - The property path to access (e.g., "config.rules")
   * @returns A new ImportPathReference for the nested property
   */
  public path(propertyPath: string): ImportPathReference {
    return new ImportPathReference(this, propertyPath);
  }

  /**
   * Collects the import statement for this reference.
   * @param imports - The ModuleImports instance to add this import to
   */
  public collectImports(imports: ModuleImports): void {
    if (this._importsCollected) {
      return; // Already collected
    }

    if (this.importName === ImportReference.DEFAULT) {
      // For default imports, we need an alias. If none provided, use module name
      const alias = this.alias || this.moduleName.split('/').pop() || 'default';
      const ref = imports.default(this.moduleName, alias);
      this.refName = ref.render();
    } else {
      const ref = imports.from(this.moduleName, this.importName, this.alias);
      this.refName = ref.render();
    }
    
    this._importsCollected = true;
  }
}

/**
 * A reference to a nested property of an import.
 * This class handles the simple case of accessing properties on imported values.
 */
export class ImportPathReference extends CodeReference {
  /**
   * Creates a new import path reference.
   * @param parentImport - The import reference this path extends
   * @param propertyPath - The property path to access
   */
  constructor(
    private parentImport: ImportReference,
    private propertyPath: string
  ) {
    super(parentImport.getResolvedName());
  }

  /**
   * Collects imports by delegating to the parent import, then resolving the full path.
   * @param imports - The ModuleImports instance to collect imports into
   */
  public collectImports(imports: ModuleImports): void {
    this.parentImport.collectImports(imports);
    this.refName = `${this.parentImport.getResolvedName()}.${this.propertyPath}`;
  }

  /**
   * Creates a reference to a nested property of this path reference.
   * @param propertyPath - The additional property path to access
   * @returns A new ImportPathReference for the deeper nested property
   */
  public path(propertyPath: string): ImportPathReference {
    return new ImportPathReference(this.parentImport, `${this.propertyPath}.${propertyPath}`);
  }
}

/**
 * Creates a proxy that generates import references for any property access.
 * 
 * @example
 * ```typescript
 * const { Component, useState } = from("react");
 * const router = from("express").Router;
 * const aliased = from("react").default.as("MyReact");
 * const nested = from("react").Component.foobar;
 * ```
 */
export function from(moduleName: string): any {
  return ImportReference.from(moduleName);
}

/**
 * Template for generating code with embedded import references.
 * Created by the js`` tagged template function.
 */
export class CodeTemplate extends CodeResolvable {
  /**
   * Creates a new code template.
   * @param strings - Template string parts
   * @param values - Values to interpolate (strings or code references)
   */
  constructor(
    private strings: TemplateStringsArray,
    private values: (string | ICodeResolvable)[]
  ) {
    super();
  }

  /**
   * Collects imports from all embedded code references.
   * @param imports - The ModuleImports instance to collect imports into
   */
  public collectImports(imports: ModuleImports): void {
    for (const value of this.values) {
      if (CodeResolvable.isCodeResolvable(value)) {
        value.collectImports?.(imports);
      }
    }
  }

  /**
   * Renders the template by interpolating all values.
   * @returns The rendered code string
   */
  public render(): string {
    return this.strings.reduce((result, str, i) => {
      const val =  CodeResolvable.isCodeResolvable(this.values[i]) ? this.values[i].render() : this.values[i];
      return  result + str + (val || '')
    }, '');
  }
}

/**
 * Tagged template function for creating code with embedded import references.
 * 
 * @example
 * ```typescript
 * const Component = from("react").Component;
 * const code = js`const comp = ${Component};`;
 * ```
 */
export function js(strings: TemplateStringsArray, ...values: (string | ICodeResolvable)[]): CodeTemplate {
  return new CodeTemplate(strings, values);
}

/**
 * Template for generating JSON with embedded code references.
 * Code references are rendered as raw code without quotes.
 */
class JsonTemplate extends CodeResolvable {
  /**
   * Creates a new JSON template.
   * @param data - The data structure to serialize, may contain code references
   */
  constructor(private data: any) {
    super();
  }

  /**
   * Collects imports from all embedded code references in the data structure.
   * @param imports - The ModuleImports instance to collect imports into
   */
  public collectImports(imports: ModuleImports): void {
    this.collectImportsFromValue(this.data, imports);
  }

  private collectImportsFromValue(value: any, imports: ModuleImports): void {
    if (CodeResolvable.isCodeResolvable(value) && value?.collectImports) {
      value.collectImports(imports);
    } else if (Array.isArray(value)) {
      value.forEach(item => this.collectImportsFromValue(item, imports));
    } else if (value && typeof value === 'object') {
      Object.values(value).forEach(val => this.collectImportsFromValue(val, imports));
    }
  }

  /**
   * Renders the JSON with embedded code references as raw code.
   * @returns The JSON string with code references rendered without quotes
   */
  public render(): string {
    return stringifyWithCode(this.data, 2);
  }
}

/**
 * Creates a JSON template that can contain embedded import references.
 * 
 * @example
 * ```typescript
 * const config = json({
 *   parser: from("@typescript-eslint/parser").parser,
 *   plugins: [from("eslint-plugin-react").plugin]
 * });
 * ```
 */
export function json(data: any): JsonTemplate {
  return new JsonTemplate(data);
}

/**
 * Stringifies a value to JSON, but renders ICodeResolvable objects as raw code.
 * 
 * @param value - The value to stringify
 * @param indentation - Number of spaces for indentation
 */
function stringifyWithCode(value: any, indentation = 2): string {
  const serialize = (val: any, depth = 0): string => {
    if (val?.render && typeof val.render === 'function') {
      const code = val.render();
      const lines = code.split('\n');
      if (lines.length === 1) return code;
      const [first, ...rest] = lines;
      const indentedRest = rest.map((line: string) => ' '.repeat(depth * indentation) + line);
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
 * JSII-compatible code builder that doesn't rely on template literals.
 * Supports method chaining and function argument syntax.
 */
export class CodeBuilder extends CodeResolvable {
  private parts: (string | ICodeResolvable)[] = [];

  /**
   * Creates a new empty code builder.
   */
  constructor() {
    super();
  }

  /**
   * Creates a new CodeBuilder with the given parts.
   * @param parts - Initial code parts (strings or code references)
   * @returns A new CodeBuilder instance
   */
  static of(...parts: (string | ICodeResolvable)[]): CodeBuilder {
    return new CodeBuilder().add(...parts);
  }

  /**
   * Adds code parts to this builder.
   * @param parts - Code parts to add (strings or code references)
   * @returns This builder for method chaining
   */
  public add(...parts: (string | ICodeResolvable)[]): this {
    this.parts.push(...parts);
    return this;
  }

  /**
   * Adds code parts followed by a newline.
   * @param parts - Code parts to add (strings or code references)
   * @returns This builder for method chaining
   */
  public line(...parts: (string | ICodeResolvable)[]): this {
    return this.add(...parts, '\n');
  }

  /**
   * Collects imports from all embedded code references.
   * @param imports - The ModuleImports instance to collect imports into
   */
  public collectImports(imports: ModuleImports): void {
    this.parts.forEach(part => {
      if (typeof part === 'object' && part.collectImports) {
        part.collectImports(imports);
      }
    });
  }

  /**
   * Renders all code parts into a single string.
   * @returns The rendered code string
   */
  public render(): string {
    return this.parts.map(part => 
      typeof part === 'string' ? part : part.render()
    ).join('');
  }
}

/**
 * JSII-compatible function for creating code with embedded import references.
 * 
 * @param parts - Code parts to combine (strings or code references)
 * @returns A new CodeBuilder instance
 * 
 * @example
 * ```typescript
 * const Component = from("react").Component;
 * const template = code("const comp = ", Component, ";");
 * ```
 */
export function code(...parts: (string | ICodeResolvable)[]): CodeBuilder {
  return CodeBuilder.of(...parts);
}
