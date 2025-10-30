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
 * Representing a default import
 */
const DEFAULT = Symbol("default");

/**
 * A reference to an import that will be resolved when the code is generated.
 * Each reference can only be used once to prevent naming conflicts.
 */
export class ImportReference extends CodeResolvable {
  private consumed = false;
  private resolvedName?: string;
  private firstUsageStack?: string;
  private readonly creationStack: string;

  constructor(
    private moduleName: string,
    private importName: string | symbol,
    private alias?: string
  ) {
    super();
    this.creationStack = captureStackTrace();
  }

  static create(moduleName: string, importName: string, alias?: string): ImportReference {
    return new ImportReference(moduleName, importName, alias);
  }

  static createDefault(moduleName: string, alias?: string): ImportReference {
    return new ImportReference(moduleName, DEFAULT, alias);
  }

  collectImports(imports: ModuleImports): void {
    const ref = imports.add(this.moduleName, this.importName, this.alias);
    this.resolvedName = ref.render();
  }

  render(): string {
    if (this.consumed) {
      const currentStack = captureStackTrace();
      throw new ImportReferenceError(
        `Import reference already used. Create a new reference for reuse.\n\n` +
        `Reference created:\n    ${this.creationStack}\n` +
        `First use:\n    ${this.firstUsageStack}\n` +
        `Second use:\n    ${currentStack}\n`
      );
    }
    if (!this.resolvedName) {
      throw new Error("Import not resolved. Call collectImports() first.");
    }
    this.consumed = true;
    this.firstUsageStack = captureStackTrace();
    return this.resolvedName;
  }
}

export class CodeTemplate extends CodeResolvable {
  constructor(
    private strings: TemplateStringsArray,
    private values: (string | ICodeResolvable)[]
  ) {
    super();
  }

  collectImports(imports: ModuleImports): void {
    for (const value of this.values) {
      if (CodeResolvable.isCodeResolvable(value)) {
        value.collectImports?.(imports);
      }
    }
  }

  render(): string {
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
 * Creates a proxy that generates import references for any property access.
 * 
 * @example
 * ```typescript
 * const { Component, useState } = from("react");
 * const router = from("express").Router;
 * ```
 */
export function from(moduleName: string): any {
  return new Proxy({}, {
    get: (_, prop: string) => ImportReference.create(moduleName, prop)
  });
}

/**
 * Creates a reference to a default import.
 * 
 * @example
 * ```typescript
 * const express = defaultFrom("express", "app");
 * ```
 */
export function defaultFrom(moduleName: string, alias?: string): ImportReference {
  return ImportReference.createDefault(moduleName, alias);
}

export class JsonTemplate extends CodeResolvable {
  constructor(private data: any) {
    super();
  }

  collectImports(imports: ModuleImports): void {
    this.collectImportsFromValue(this.data, imports);
  }

  private collectImportsFromValue(value: any, imports: ModuleImports): void {
    if (value?.collectImports) {
      value.collectImports(imports);
    } else if (Array.isArray(value)) {
      value.forEach(item => this.collectImportsFromValue(item, imports));
    } else if (value && typeof value === 'object') {
      Object.values(value).forEach(val => this.collectImportsFromValue(val, imports));
    }
  }

  render(): string {
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
export function stringifyWithCode(value: any, indentation = 2): string {
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

  constructor() {
    super();
  }

  /**
   * Creates a new CodeBuilder with the given parts.
   */
  static of(...parts: (string | ICodeResolvable)[]): CodeBuilder {
    return new CodeBuilder().add(...parts);
  }

  add(...parts: (string | ICodeResolvable)[]): this {
    this.parts.push(...parts);
    return this;
  }

  line(...parts: (string | ICodeResolvable)[]): this {
    return this.add(...parts, '\n');
  }

  collectImports(imports: ModuleImports): void {
    this.parts.forEach(part => {
      if (typeof part === 'object' && part.collectImports) {
        part.collectImports(imports);
      }
    });
  }

  render(): string {
    return this.parts.map(part => 
      typeof part === 'string' ? part : part.render()
    ).join('');
  }
}

/**
 * JSII-compatible function for creating code with embedded import references.
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

export class CodeGenerator {
  generateFile(template: ICodeResolvable): string {
    const imports = new ModuleImports();
    
    // Phase 1: Collect all imports
    template.collectImports?.(imports);
    
    // Phase 2: Generate output
    const importStatements = imports.asEsmImports();
    const body = template.render();
    
    return [...importStatements, '', body].join('\n');
  }
}
