export const CODE_RESOLVABLE_SYMBOL = Symbol.for('projen.CodeResolvable');

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
   * Collects imports needed by this code resolvable.
   * @param imports - The ModuleImports instance to collect imports into
   */
  collectImports?(imports: any): void;
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
    return obj && typeof obj === 'object' && obj[CODE_RESOLVABLE_SYMBOL] === true;
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

/**
 * A literal code reference that renders exactly as provided.
 */
export class CodeLiteral extends CodeResolvable {
  /**
   * The code string to render.
   */
  public readonly code: string;

  /**
   * Creates a new CodeLiteral instance.
   * @param code - The code string to render
   */
  constructor(code: string) {
    super();
    this.code = code;
  }

  /**
   * Renders the code exactly as provided.
   * @returns The code string
   */
  public render(): string {
    return this.code;
  }
}
