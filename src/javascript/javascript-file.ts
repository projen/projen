import { js } from "js-beautify";
import { Project } from "../project";
import { TextFile, TextFileOptions } from "../textfile";

function renderStatement(jsStatement: IJavascriptStatement) {
  if (jsStatement.raw !== undefined) {
    return jsStatement.raw;
  }

  // Validate arguments
  if (!jsStatement.code) {
    throw new Error("`code` must be provided if `raw` is not set");
  }
  if (jsStatement.callWith) {
    if (!jsStatement.asFunction) {
      throw new Error("`asFunction` must be true if `callWith` is set");
    }
  }
  if (jsStatement.exportDefault && jsStatement.exportName !== undefined) {
    throw new Error("Cannot specify `exportName` when `exportDefault` is true");
  }

  let fString = jsStatement.code.toString().trim();

  if (!jsStatement.asFunction) {
    fString = fString.substring(
      fString.indexOf("{") + 1,
      fString.lastIndexOf("}")
    );
  } else {
    if (jsStatement.callWith) {
      fString = `(${fString})(${
        jsStatement.callWith.map((c) => `\`${c.toString()}\``).join(", ") ?? ""
      })`;
    }
  }
  if (jsStatement.setToValue) {
    fString = `const ${jsStatement.setToValue} = ${fString};`;
  }
  if (jsStatement.exportDefault) {
    fString = `module.exports = ${fString};`;
  } else if (jsStatement.exportName) {
    fString = `exports.${jsStatement.exportName} = ${fString};`;
  }
  if (jsStatement.prefix) {
    fString = jsStatement.prefix + fString;
  }
  if (jsStatement.postfix) {
    fString = fString + jsStatement.postfix;
  }
  return fString;
}

export interface IJavascriptStatement {
  /**
   * Creates a const with the given name and sets it equal to the given function
   * asFunction must also be true.
   */
  setToValue?: string;

  /**
   * Use the given function declaration when written to a file
   *
   * @default false Function declaration is stripped
   */
  asFunction?: boolean;

  /**
   * Text added before the given function text
   */
  prefix?: string;

  /**
   * Text added after the given function text
   */
  postfix?: string;

  /**
   * exports.{exportName} = {value}
   */
  exportName?: string;

  /**
   * module.exports = {value}
   */
  exportDefault?: boolean;

  /**
   * Overrides all other options
   */
  raw?: string;

  /**
   * Represents the function as a call with the given string values. Values will be .toString()'d.
   * asFunction must also be true.
   *
   * To call the function with no values, use an empty array.
   */
  callWith?: any[];

  /**
   * Function containing relevant code.
   * Arguments can be used to simulate the variables that would be available
   *
   * Note: This Javascript is not executed in Projen, and it should only use values that would be available in the scope it is executed in.
   */
  code?(..._: any): any;
}

export interface IIFEStatement {
  callWith?: any[];
  fn(..._: any): any;
}

export interface IJavascriptFileOptions {
  /**
   * options passed to underlying TextFile
   */
  textFileOptions?: TextFileOptions;
}

/**
 * A Javascript file
 */
export class JavascriptFile extends TextFile {
  private statements: IJavascriptStatement[];

  constructor(
    project: Project,
    path: string,
    options?: IJavascriptFileOptions
  ) {
    super(project, path, options?.textFileOptions);

    this.statements = [];
  }

  addNewline() {
    this.addStatement({
      raw: "",
    });
  }

  addIIFE(iifeStatement: IIFEStatement): IJavascriptStatement {
    const jsStatement: IJavascriptStatement = {
      ...iifeStatement,
    };

    this.addStatement(jsStatement);

    return jsStatement;
  }

  /**
   * Add new Javascript statement to the end of the list
   */
  addStatement(jsStatement: IJavascriptStatement): void {
    this.statements.push(jsStatement);
  }

  /**
   * Add new Javascript statement to the beginning of the list
   */
  prependStatement(jsStatement: IJavascriptStatement): void {
    this.statements.unshift(jsStatement);
  }

  preSynthesize() {
    if (this.readonly) {
      this.addLine(`// ${this.marker}`);
    }

    const code = this.statements.map((f) => renderStatement(f)).join("\n");

    this.addLine(
      js(code, {
        indent_level: 0,
        indent_empty_lines: false,
        indent_size: 2,
        end_with_newline: true,
        preserve_newlines: true,
        max_preserve_newlines: 2,
      })
    );
  }
}
