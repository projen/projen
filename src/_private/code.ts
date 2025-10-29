import { CodeLiteral, CodeResolvable, ICodeResolvable } from './code-resolvable';

/**
 * Utility class for creating code references.
 */
export class Code {
  /**
   * Checks if an object is a CodeResolvable instance.
   * @param obj - The object to check
   * @returns True if the object is CodeResolvable
   */
  public static isCodeResolvable(obj: any): obj is ICodeResolvable {
    return  CodeResolvable.isCodeResolvable(obj);
  }

  /**
   * Creates a literal code reference.
   * @param code - The code string to render
   * @returns A new CodeLiteral instance
   */
  public static literal(code: string): ICodeResolvable {
    return new CodeLiteral(code);
  }
}
