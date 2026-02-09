import { Project } from "./project";

const CODE_RESOLVABLE_SYMBOL = Symbol.for("projen.CodeResolvable");

export interface IImportResolver {
  /**
   * The project this resolver belongs to.
   */
  readonly project: Project;
  /**
   * Adds a named import from a module
   */
  from(moduleName: string, importName?: string, as?: string): ICodeResolvable;
}

/**
 * Interface for code that should be rendered as-is without quotes.
 */
export interface ICodeResolvable {
  /**
   * Renders the code as a string.
   * @returns The rendered code
   */
  render(): string;

  /**
   * Resolves imports needed by this code resolvable.
   * @param resolver - The IImportsResolver instance to resolve imports into
   */
  resolveImports?(resolver: IImportResolver): void;
}

/**
 * Abstract base class for code that should be rendered as-is without quotes.
 */
export abstract class CodeResolvable implements ICodeResolvable {
  /**
   * Checks if an object is a CodeResolvable instance.
   * @param obj - The object to check
   * @returns True if the object is CodeResolvable
   */
  public static isCodeResolvable(obj: any): obj is ICodeResolvable {
    return (
      obj && typeof obj === "object" && obj[CODE_RESOLVABLE_SYMBOL] === true
    );
  }

  /**
   * Creates a new CodeResolvable instance and marks it with the symbol.
   */
  public constructor() {
    // mark as CodeResolvable
    Object.defineProperty(this, CODE_RESOLVABLE_SYMBOL, { value: true });
  }

  /**
   * Renders the code as a string.
   * @returns The rendered code
   */
  public abstract render(): string;
}
