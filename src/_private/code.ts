import {
  CodeResolvable,
  ICodeResolvable,
  IImportResolver,
} from "../code-resolvable";

/**
 * Utility class for creating code resolvables.
 */
export class Code {
  /**
   * Creates a literal code reference.
   * @param code - The code string to render
   * @returns A new CodeLiteral instance
   */
  public static literal(code: string): ICodeResolvable {
    return new CodeLiteral(code);
  }

  /**
   * JSII-compatible code builder that doesn't rely on template literals.
   * Supports method chaining and function argument syntax.
   *
   * @returns A new CodeLiteral instance
   *
   * @example
   * const Component = from("react").Component;
   * const template = Code.for("const comp = ", Component, ";");
   */
  public static for(...parts: (string | ICodeResolvable)[]): CodeBuilder {
    return CodeBuilder.of(...parts);
  }
}

/**
 * JSII-compatible code builder that doesn't rely on template literals.
 * Supports method chaining and function argument syntax.
 */
class CodeBuilder extends CodeResolvable {
  private parts: (string | ICodeResolvable)[] = [];

  /**
   * Creates a new empty code builder.
   */
  private constructor() {
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
    return this.add(...parts, "\n");
  }

  /**
   * Resolves imports from all embedded code references.
   * @param imports - The ModuleImports instance to resolve imports into
   */
  public resolveImports(imports: IImportResolver): void {
    this.parts.forEach((part) => {
      if (typeof part === "object" && part.resolveImports) {
        part.resolveImports(imports);
      }
    });
  }

  /**
   * Renders all code parts into a single string.
   * @returns The rendered code string
   */
  public render(): string {
    return this.parts
      .map((part) => (typeof part === "string" ? part : part.render()))
      .join("");
  }
}

/**
 * A literal code reference that renders exactly as provided.
 */
class CodeLiteral extends CodeResolvable {
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
