import { Component } from "../component";
import { IgnoreFile, IgnoreFileOptions } from "../ignore-file";
import { NodeProject } from "../javascript";
import { JsonFile } from "../json";
import { Project } from "../project";
import { SourceCode } from "../source-code";
import { YamlFile } from "../yaml";
/**
 * Options for Prettier
 *
 */
export interface PrettierOptions {
  /**
   * Defines an .prettierIgnore file
   *
   * @default true
   */
  readonly ignoreFile?: boolean;

  /**
   * Configuration options for .prettierignore file
   */
  readonly ignoreFileOptions?: IgnoreFileOptions;

  /**
   * Prettier settings.
   * @default - default settings
   */
  readonly settings?: PrettierSettings;

  /**
   * Provide a list of patterns to override prettier configuration.
   *
   * @default []
   * @see https://prettier.io/docs/en/configuration.html#configuration-overrides
   */
  readonly overrides?: PrettierOverride[];

  /**
   * Write prettier configuration as YAML instead of JSON
   * @default false
   */
  readonly yaml?: boolean;
}
/**
 * Options to set in Prettier directly or through overrides
 *
 * @see https://prettier.io/docs/en/options.html
 */
export interface PrettierSettings {
  /**
   * Include parentheses around a sole arrow function parameter.
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
   * @default EmbeddedLanguageFormatting.AUTO
   */
  readonly embeddedLanguageFormatting?: EmbeddedLanguageFormatting;
  /**
   * Which end of line characters to apply.
   *
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
   * @default ProseWrap.PRESERVE
   */
  readonly proseWrap?: ProseWrap;
  /**
   * Change when properties in objects are quoted.
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
  /**
   * Always include parens. Example: `(x) => x`
   */
  ALWAYS = "always",

  /**
   * Omit parens when possible. Example: `x => x`
   */
  AVOID = "avoid",
}

export enum EmbeddedLanguageFormatting {
  /**
   * Format embedded code if Prettier can automatically identify it.
   */
  AUTO = "auto",

  /**
   * Never automatically format embedded code.
   */
  OFF = "off",
}

export enum EndOfLine {
  /**
   * Maintain existing (mixed values within one file are normalised by looking
   * at what's used after the first line)
   */
  AUTO = "auto",

  /**
   * Carriage Return character only (\r), used very rarely
   */
  CR = "cr",

  /**
   * Carriage Return + Line Feed characters (\r\n), common on Windows
   */
  CRLF = "crlf",

  /**
   * Line Feed only (\n), common on Linux and macOS as well as inside git repos
   */
  LF = "lf",
}

export enum HTMLWhitespaceSensitivity {
  /**
   * Respect the default value of CSS display property.
   */
  CSS = "css",

  /**
   * Whitespaces are considered insignificant.
   */
  IGNORE = "ignore",

  /**
   * Whitespaces are considered significant.
   */
  STRICT = "strict",
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
  readonly options: PrettierSettings;
}

/**
 * Exclude these files from this override.
 *
 * Include these files in this override.
 */
export type Files = string[] | string;

export enum ProseWrap {
  /**
   * Wrap prose if it exceeds the print width.
   */
  ALWAYS = "always",

  /**
   * Do not wrap prose.
   */
  NEVER = "never",

  /**
   * Wrap prose as-is.
   */
  PRESERVE = "preserve",
}

export enum QuoteProps {
  /**
   * Only add quotes around object properties where required.
   */
  ASNEEDED = "as-needed",

  /**
   * If at least one property in an object requires quotes, quote all properties.
   */
  CONSISTENT = "consistent",

  /**
   * Respect the input use of quotes in object properties.
   */
  PRESERVE = "preserve",
}

export enum TrailingComma {
  /**
   * Trailing commas wherever possible (including function arguments).
   */
  ALL = "all",

  /**
   * Trailing commas where valid in ES5 (objects, arrays, etc.)
   */
  ES5 = "es5",

  /**
   * No trailing commas.
   */
  NONE = "none",
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
   * Direct access to the prettier settings
   */
  public readonly settings: PrettierSettings;

  /**
   * The .prettierIgnore file.
   */
  public readonly ignoreFile?: IgnoreFile;

  /**
   * Direct access to the prettier overrides
   *
   * @internal
   */
  private readonly _overrides: PrettierOverride[];

  constructor(project: NodeProject, options: PrettierOptions) {
    super(project);

    this._overrides = options.overrides ?? [];

    if (options.ignoreFile ?? true) {
      this.ignoreFile = new IgnoreFile(
        project,
        ".prettierignore",
        options.ignoreFileOptions,
      );

      project.addPackageIgnore("/.prettierignore");
    }

    project.addDevDeps("prettier");

    this.settings = {
      ...options.settings,
    };

    if (options.yaml) {
      new YamlFile(project, ".prettierrc.yml", {
        obj: () => ({ ...this.settings, overrides: [...this._overrides] }),
        marker: true,
      });
      project.addPackageIgnore("/.prettierrc.yml");
    } else {
      new JsonFile(project, ".prettierrc.json", {
        obj: () => ({ ...this.settings, overrides: [...this._overrides] }),
        marker: false,
      });
      project.addPackageIgnore("/.prettierrc.json");
    }
  }

  /**
   * Add a prettier override
   * @see https://prettier.io/docs/en/configuration.html#configuration-overrides
   * @param {PrettierOverride} override
   */
  public addOverride(override: PrettierOverride) {
    this._overrides.push(override);
  }

  /**
   * Defines Prettier ignore Patterns
   * these patterns will be added to the file .prettierignore
   *
   * @param pattern filepatterns so exclude from prettier formatting
   */
  public addIgnorePattern(pattern: string) {
    this.ignoreFile?.addPatterns(pattern);
  }

  /**
   *  Returns all Prettier overrides
   */
  public get overrides() {
    return [...this._overrides];
  }

  public preSynthesize() {
    // Add automatically generated SourceCode files to .prettierignore as they may not be formatted correctly.
    const isSourceCode = (c: Component): c is SourceCode =>
      c instanceof SourceCode;
    this.project.components.filter(isSourceCode).forEach((c) => {
      this.addIgnorePattern(c.filePath);
    });
  }
}
