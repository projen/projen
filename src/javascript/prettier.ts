import { Component } from '../component';
import { NodeProject } from '../javascript';
import { JsonFile } from '../json';
import { Project } from '../project';
/**
 * Options for Prettier
 *
 * @see https://prettier.io/docs/en/options.html
 */
export interface PrettierOptions extends PrettierBaseOptions {
  /**
   * Provide a list of patterns to override prettier configuration.
   *
   * @default []
   * @see https://prettier.io/docs/en/configuration.html#configuration-overrides
   */
  readonly overrides?: PrettierOverride[];
}
/**
 * Options to set in Prettier directly or through overrides
 *
 * @export
 * @interface PrettierBaseOptions
 */
export interface PrettierBaseOptions {
  /**
    * Include parentheses around a sole arrow function parameter.
    *
    * Always include parens. Example: `(x) => x`
    *
    * Omit parens when possible. Example: `x => x`
    *
    * @default ArrowParens.ALWAYS
    */
  readonly arrowParens?: ArrowParens;
  /**
    * Put > of opening tags on the last line instead of on a new line.
    *
    * @default false
    */
  readonly bracketSameLine?: boolean;
  /**
    * Print spaces between brackets.
    *
    * @default true
    */
  readonly bracketSpacing?: boolean;
  /**
    * Print (to stderr) where a cursor at the given position would move to after formatting.
    * This option cannot be used with --range-start and --range-end.
    *
    * @default -1
    */
  readonly cursorOffset?: number;
  /**
    * Control how Prettier formats quoted code embedded in the file.
    *
    * Format embedded code if Prettier can automatically identify it.
    *
    * Never automatically format embedded code.
    *
    * @default EmbeddedLanguageFormatting.AUTO
    */
  readonly embeddedLanguageFormatting?: EmbeddedLanguageFormatting;
  /**
    * Which end of line characters to apply.
    *
    * Line Feed only (\n), common on Linux and macOS as well as inside git repos
    *
    * Carriage Return + Line Feed characters (\r\n), common on Windows
    *
    * Carriage Return character only (\r), used very rarely
    *
    * Maintain existing
    * (mixed values within one file are normalised by looking at what's used after the first
    * line)
    * @default EndOfLine.LF
    */
  readonly endOfLine?: EndOfLine;
  /**
    * Specify the input filepath. This will be used to do parser inference.
    * @default none
    */
  readonly filepath?: string;
  /**
    * How to handle whitespaces in HTML.
    *
    * Respect the default value of CSS display property.
    *
    * Whitespaces are considered sensitive.
    *
    * Whitespaces are considered insensitive.
    *
    * @default HTMLWhitespaceSensitivity.CSS
    */
  readonly htmlWhitespaceSensitivity?: HTMLWhitespaceSensitivity;
  /**
    * Insert @format pragma into file's first docblock comment.
    *
    * @default false
    */
  readonly insertPragma?: boolean;
  /**
    * Use single quotes in JSX.
    *
    * @default false
    */
  readonly jsxSingleQuote?: boolean;
  /**
    * Which parser to use.
    *
    * @default - Prettier automatically infers the parser from the input file path, so you shouldn’t have to change this setting.
    */
  readonly parser?: string;
  /**
    * Add a plugin. Multiple plugins can be passed as separate `--plugin`s.
    *
    * @default []
    */
  readonly plugins?: string[];
  /**
    * Custom directory that contains prettier plugins in node_modules subdirectory.
    * Overrides default behavior when plugins are searched relatively to the location of
    * Prettier.
    * Multiple values are accepted.
    *
    * @default []
    */
  readonly pluginSearchDirs?: string[];
  /**
    * The line length where Prettier will try wrap.
    *
    * @default 80
    */
  readonly printWidth?: number;
  /**
    * How to wrap prose.
    *
    * Wrap prose if it exceeds the print width.
    *
    * Do not wrap prose.
    *
    * Wrap prose as-is.
    *
    * @default ProseWrap.PRESERVE
    */
  readonly proseWrap?: ProseWrap;
  /**
    * Change when properties in objects are quoted.
    *
    * Only add quotes around object properties where required.
    *
    * If at least one property in an object requires quotes, quote all properties.
    *
    * Respect the input use of quotes in object properties.
    *
    * @default QuoteProps.ASNEEDED
    */
  readonly quoteProps?: QuoteProps;
  /**
    * Format code ending at a given character offset (exclusive).
    * The range will extend forwards to the end of the selected statement.
    * This option cannot be used with --cursor-offset.
    *
    * @default null
    */
  readonly rangeEnd?: number;
  /**
    * Format code starting at a given character offset.
    * The range will extend backwards to the start of the first line containing the selected
    * statement.
    * This option cannot be used with --cursor-offset.
    *
    * @default 0
    */
  readonly rangeStart?: number;
  /**
    * Require either '@prettier' or '@format' to be present in the file's first docblock
    * comment
    * in order for it to be formatted.
    *
    * @default false
    */
  readonly requirePragma?: boolean;
  /**
    * Print semicolons.
    *
    * @default true
    */
  readonly semi?: boolean;
  /**
    * Use single quotes instead of double quotes.
    *
    * @default false
    */
  readonly singleQuote?: boolean;
  /**
    * Number of spaces per indentation level.
    *
    * @default 2
    */
  readonly tabWidth?: number;
  /**
    * Print trailing commas wherever possible when multi-line.
    *
    * Trailing commas where valid in ES5 (objects, arrays, etc.)
    *
    * No trailing commas.
    *
    * Trailing commas wherever possible (including function arguments).
    *
    * @default TrailingComma.ES5
    */
  readonly trailingComma?: TrailingComma;
  /**
    * Indent with tabs instead of spaces.
    *
    * @default false
    */
  readonly useTabs?: boolean;
  /**
    * Indent script and style tags in Vue files.
    *
    * @default false
    */
  readonly vueIndentScriptAndStyle?: boolean;
}

export enum ArrowParens {
  ALWAYS = 'always',
  AVOID = 'avoid',
}

export enum EmbeddedLanguageFormatting {
  AUTO = 'auto',
  OFF = 'off',
}

export enum EndOfLine {
  AUTO = 'auto',
  CR = 'cr',
  CRLF = 'crlf',
  LF = 'lf',
}

export enum HTMLWhitespaceSensitivity {
  CSS = 'css',
  IGNORE = 'ignore',
  STRICT = 'strict',
}

export interface PrettierOverride {
  /**
   * Exclude these files from this override.
   */
  readonly excludeFiles?: Files;
  /**
   * Include these files in this override.
   */
  readonly files: Files;
  /**
   * The options to apply for this override.
   */
  readonly options: PrettierBaseOptions;
}

/**
 * Exclude these files from this override.
 *
 * Include these files in this override.
 */
export type Files = string[] | string;

export enum ProseWrap {
  ALWAYS = 'always',
  NEVER = 'never',
  PRESERVE = 'preserve',
}

export enum QuoteProps {
  ASNEEDED = 'as-needed',
  CONSISTENT = 'consistent',
  PRESERVE = 'preserve',
}

export enum TrailingComma {
  ALL = 'all',
  ES5 = 'es5',
  NONE = 'none',
}

/**
 * Represents prettier configuration.
 */
export class Prettier extends Component {
  public static of(project: Project): Prettier | undefined {
    const isPrettier = (c: Component): c is Prettier => c instanceof Prettier;
    return project.components.find(isPrettier);
  }
  /**
   * Direct access to the prettier configuration
   */
  public readonly config: PrettierOptions;
  /**
   * Direct access to the prettier overrides
   *
   * @internal
   */
  public readonly _overrides: PrettierOverride[];

  constructor(project: NodeProject, options: PrettierOptions) {
    super(project);

    this._overrides = options.overrides ?? [];

    project.addDevDeps('prettier');

    this.config = { ...options, overrides: [...this._overrides] };

    new JsonFile(project, '.prettierrc.json', { obj: this.config, marker: false });
  }

  /**
   * Add a prettier override
   * @see https://prettier.io/docs/en/configuration.html#configuration-overrides
   * @param {PrettierOverride} override
   */
  public addOverride(override: PrettierOverride) {
    this.overrides.push(override);
  }

  /**
   *  Access to the Prettieroverrides to extend those
   */
  public get overrides() { return [...this._overrides]; }
}
