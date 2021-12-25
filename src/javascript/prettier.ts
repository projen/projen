import { Component } from '../component';
import { NodeProject } from '../javascript';
import { JsonFile } from '../json';
import { Project } from '../project';

export interface PrettierConfig {
  /**
   * Include parentheses around a sole arrow function parameter.
   */
  readonly arrowParens?: ArrowParens;
  /**
   * Put > of opening tags on the last line instead of on a new line.
   */
  readonly bracketSameLine?: boolean;
  /**
   * Print spaces between brackets.
   */
  readonly bracketSpacing?: boolean;
  /**
   * Print (to stderr) where a cursor at the given position would move to after formatting.
   * This option cannot be used with --range-start and --range-end.
   */
  readonly cursorOffset?: number;
  /**
   * Control how Prettier formats quoted code embedded in the file.
   */
  readonly embeddedLanguageFormatting?: EmbeddedLanguageFormatting;
  /**
   * Which end of line characters to apply.
   */
  readonly endOfLine?: EndOfLine;
  /**
   * Specify the input filepath. This will be used to do parser inference.
   */
  readonly filepath?: string;
  /**
   * How to handle whitespaces in HTML.
   */
  readonly htmlWhitespaceSensitivity?: HTMLWhitespaceSensitivity;
  /**
   * Insert @format pragma into file's first docblock comment.
   */
  readonly insertPragma?: boolean;
  /**
   * Use single quotes in JSX.
   */
  readonly jsxSingleQuote?: boolean;
  /**
   * Which parser to use.
   */
  readonly parser?: string;
  /**
   * Add a plugin. Multiple plugins can be passed as separate `--plugin`s.
   */
  readonly plugins?: string[];
  /**
   * Custom directory that contains prettier plugins in node_modules subdirectory.
   * Overrides default behavior when plugins are searched relatively to the location of
   * Prettier.
   * Multiple values are accepted.
   */
  readonly pluginSearchDirs?: string[];
  /**
   * The line length where Prettier will try wrap.
   */
  readonly printWidth?: number;
  /**
   * How to wrap prose.
   */
  readonly proseWrap?: ProseWrap;
  /**
   * Change when properties in objects are quoted.
   */
  readonly quoteProps?: QuoteProps;
  /**
   * Format code ending at a given character offset (exclusive).
   * The range will extend forwards to the end of the selected statement.
   * This option cannot be used with --cursor-offset.
   */
  readonly rangeEnd?: number;
  /**
   * Format code starting at a given character offset.
   * The range will extend backwards to the start of the first line containing the selected
   * statement.
   * This option cannot be used with --cursor-offset.
   */
  readonly rangeStart?: number;
  /**
   * Require either '@prettier' or '@format' to be present in the file's first docblock
   * comment
   * in order for it to be formatted.
   */
  readonly requirePragma?: boolean;
  /**
   * Print semicolons.
   */
  readonly semi?: boolean;
  /**
   * Use single quotes instead of double quotes.
   */
  readonly singleQuote?: boolean;
  /**
   * Number of spaces per indentation level.
   */
  readonly tabWidth?: number;
  /**
   * Print trailing commas wherever possible when multi-line.
   */
  readonly trailingComma?: TrailingComma;
  /**
   * Indent with tabs instead of spaces.
   */
  readonly useTabs?: boolean;
  /**
   * Indent script and style tags in Vue files.
   */
  readonly vueIndentScriptAndStyle?: boolean;
  /**
   * Provide a list of patterns to override prettier configuration.
   */
  readonly overrides?: PrettierOverride[];
}

/**
 * Include parentheses around a sole arrow function parameter.
 *
 * Always include parens. Example: `(x) => x`
 *
 * Omit parens when possible. Example: `x => x`
 */
export enum ArrowParens {
  ALWAYS = 'always',
  AVOID = 'avoid',
}

/**
 * Control how Prettier formats quoted code embedded in the file.
 *
 * Format embedded code if Prettier can automatically identify it.
 *
 * Never automatically format embedded code.
 */
export enum EmbeddedLanguageFormatting {
  AUTO = 'auto',
  OFF = 'off',
}

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
 */
export enum EndOfLine {
  AUTO = 'auto',
  CR = 'cr',
  CRLF = 'crlf',
  LF = 'lf',
}

/**
 * How to handle whitespaces in HTML.
 *
 * Respect the default value of CSS display property.
 *
 * Whitespaces are considered sensitive.
 *
 * Whitespaces are considered insensitive.
 */
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
  readonly files?: Files;
  /**
   * The options to apply for this override.
   */
  readonly options?: PrettierOverrideOptions;
}

/**
 * Exclude these files from this override.
 *
 * Include these files in this override.
 */
export type Files = string[] | string;

/**
 * The options to apply for this override.
 */
export interface PrettierOverrideOptions {
  /**
   * Include parentheses around a sole arrow function parameter.
   */
  readonly arrowParens?: ArrowParens;
  /**
   * Put > of opening tags on the last line instead of on a new line.
   */
  readonly bracketSameLine?: boolean;
  /**
   * Print spaces between brackets.
   */
  readonly bracketSpacing?: boolean;
  /**
   * Print (to stderr) where a cursor at the given position would move to after formatting.
   * This option cannot be used with --range-start and --range-end.
   */
  readonly cursorOffset?: number;
  /**
   * Control how Prettier formats quoted code embedded in the file.
   */
  readonly embeddedLanguageFormatting?: EmbeddedLanguageFormatting;
  /**
   * Which end of line characters to apply.
   */
  readonly endOfLine?: EndOfLine;
  /**
   * Specify the input filepath. This will be used to do parser inference.
   */
  readonly filepath?: string;
  /**
   * How to handle whitespaces in HTML.
   */
  readonly htmlWhitespaceSensitivity?: HTMLWhitespaceSensitivity;
  /**
   * Insert @format pragma into file's first docblock comment.
   */
  readonly insertPragma?: boolean;
  /**
   * Use single quotes in JSX.
   */
  readonly jsxSingleQuote?: boolean;
  /**
   * Which parser to use.
   */
  readonly parser?: string;
  /**
   * Add a plugin. Multiple plugins can be passed as separate `--plugin`s.
   */
  readonly plugins?: string[];
  /**
   * Custom directory that contains prettier plugins in node_modules subdirectory.
   * Overrides default behavior when plugins are searched relatively to the location of
   * Prettier.
   * Multiple values are accepted.
   */
  readonly pluginSearchDirs?: string[];
  /**
   * The line length where Prettier will try wrap.
   */
  readonly printWidth?: number;
  /**
   * How to wrap prose.
   */
  readonly proseWrap?: ProseWrap;
  /**
   * Change when properties in objects are quoted.
   */
  readonly quoteProps?: QuoteProps;
  /**
   * Format code ending at a given character offset (exclusive).
   * The range will extend forwards to the end of the selected statement.
   * This option cannot be used with --cursor-offset.
   */
  readonly rangeEnd?: number;
  /**
   * Format code starting at a given character offset.
   * The range will extend backwards to the start of the first line containing the selected
   * statement.
   * This option cannot be used with --cursor-offset.
   */
  readonly rangeStart?: number;
  /**
   * Require either '@prettier' or '@format' to be present in the file's first docblock
   * comment
   * in order for it to be formatted.
   */
  readonly requirePragma?: boolean;
  /**
   * Print semicolons.
   */
  readonly semi?: boolean;
  /**
   * Use single quotes instead of double quotes.
   */
  readonly singleQuote?: boolean;
  /**
   * Number of spaces per indentation level.
   */
  readonly tabWidth?: number;
  /**
   * Print trailing commas wherever possible when multi-line.
   */
  readonly trailingComma?: TrailingComma;
  /**
   * Indent with tabs instead of spaces.
   */
  readonly useTabs?: boolean;
  /**
   * Indent script and style tags in Vue files.
   */
  readonly vueIndentScriptAndStyle?: boolean;
}

/**
 * How to wrap prose.
 *
 * Wrap prose if it exceeds the print width.
 *
 * Do not wrap prose.
 *
 * Wrap prose as-is.
 */
export enum ProseWrap {
  ALWAYS = 'always',
  NEVER = 'never',
  PRESERVE = 'preserve',
}

/**
 * Change when properties in objects are quoted.
 *
 * Only add quotes around object properties where required.
 *
 * If at least one property in an object requires quotes, quote all properties.
 *
 * Respect the input use of quotes in object properties.
 */
export enum QuoteProps {
  ASNEEDED = 'as-needed',
  CONSISTENT = 'consistent',
  PRESERVE = 'preserve',
}

/**
 * Print trailing commas wherever possible when multi-line.
 *
 * Trailing commas where valid in ES5 (objects, arrays, etc.)
 *
 * No trailing commas.
 *
 * Trailing commas wherever possible (including function arguments).
 */
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
   * Direct access to the prettier configuration (escape hatch)
   */
  public readonly config: PrettierConfig;
  /**
   * Direct access to the prettier overrides (escape hatch)
   */
  public readonly overrides: PrettierOverride[];

  constructor(project: NodeProject, options: PrettierConfig) {
    super(project);

    this.overrides = [];

    project.addDevDeps('prettier');

    this.config = { ...options, overrides: [...this.overrides] };

    new JsonFile(project, '.prettierrc.json', { obj: this.config, marker: false });
  }
  /**
   * Add an prettier override.
   */
  public addOverride(override: PrettierOverride) {
    this.overrides.push(override);
  }
}
