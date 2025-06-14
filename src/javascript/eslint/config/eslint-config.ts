/**
 * ESLint parser configuration information.
 *
 * @example
 * // Configuration with parserReference
 * {
 *   moduleSpecifier: "typescript-eslint",
 *   importedBinding: "tseslint",
 *   parserReference: "parser"
 * }
 *
 * // Results in:
 * import tseslint from "typescript-eslint"
 *
 * export default [{
 *   languageOptions: {
 *     parser: tseslint.parser
 *   }
 * }]
 *
 * // Configuration without parserReference
 * {
 *   moduleSpecifier: "@typescript-eslint/parser",
 *   importedBinding: "tseslintParser"
 * }
 *
 * // Results in:
 * import tseslintParser from "@typescript-eslint/parser"
 *
 * export default [{
 *   languageOptions: {
 *     parser: tseslintParser
 *   }
 * }]
 */
export interface EslintParser {
  /**
   * The moduleSpecifier that identifies the module to import from.
   * This is the string literal that appears in the FromClause of an ImportDeclaration.
   *
   * @example "typescript-eslint"
   * // In: import tseslint from "typescript-eslint"
   * // typescript-eslint is the moduleSpecifier
   * @see {@link https://tc39.es/ecma262/multipage/ecmascript-language-scripts-and-modules.html#prod-ModuleSpecifier}
   */
  readonly moduleSpecifier: string;

  /**
   * The importedBinding that defines the name to be bound to the module's default export.
   * This is the local name that appears in a default import declaration.
   *
   * @example "tseslint"
   * // In: import tseslint from "typescript-eslint"
   * // tseslint is the importedBinding
   * @see {@link https://tc39.es/ecma262/multipage/ecmascript-language-scripts-and-modules.html#prod-ImportedDefaultBinding}
   */
  readonly importedBinding: string;

  /**
   * The reference path to the parser in the module.
   * When specified, this string will be appended to importedBinding with a dot (.).
   * When omitted, only importedBinding will be used.
   *
   * @example
   * // With parserReference
   * {
   *   moduleSpecifier: "typescript-eslint",
   *   importedBinding: "tseslint",
   *   parserReference: "parser"
   * }
   * // Results in:
   * languageOptions: {
   *   parser: tseslint.parser
   * }
   *
   * // Without parserReference (using importedBinding)
   * {
   *   moduleSpecifier: "@typescript-eslint/parser",
   *   importedBinding: "tseslintParser"
   * }
   * // Results in:
   * languageOptions: {
   *   parser: tseslintParser
   * }
   *
   * @default - same as `importedBinding`
   */
  readonly parserReference?: string;
}

/**
 * ESLint plugin configuration information.
 *
 * @example
 * // Configuration
 * {
 *   moduleSpecifier: "typescript-eslint",
 *   importedBinding: "tseslint",
 *   pluginAlias: "@typescript-eslint"
 * }
 *
 * // Results in:
 * import tseslint from "typescript-eslint"
 *
 * export default [{
 *   plugins: {
 *     "@typescript-eslint": tseslint
 *   }
 * }]
 */
export interface EslintPlugin {
  /**
   * The moduleSpecifier that identifies the module to import from.
   * This is the string literal that appears in the FromClause of an ImportDeclaration.
   *
   * @example "typescript-eslint"
   * // In: import tseslint from "typescript-eslint"
   * // typescript-eslint is the moduleSpecifier
   * @see {@link https://tc39.es/ecma262/multipage/ecmascript-language-scripts-and-modules.html#prod-ModuleSpecifier}
   */
  readonly moduleSpecifier: string;

  /**
   * The importedBinding that defines the name to be bound to the module's default export.
   * This is the local name that appears in a default import declaration.
   *
   * @example "tseslint"
   * // In: import tseslint from "typescript-eslint"
   * // tseslint is the importedBinding
   * @see {@link https://tc39.es/ecma262/multipage/ecmascript-language-scripts-and-modules.html#prod-ImportedDefaultBinding}
   */
  readonly importedBinding: string;

  /**
   * The plugin alias to use in the ESLint configuration.
   *
   * @example "@typescript-eslint"
   */
  readonly pluginAlias: string;
}

/**
 * ESLint configuration extension information.
 *
 * @example
 * // Configuration without spread
 * {
 *   moduleSpecifier: "eslint-plugin-prettier",
 *   importedBinding: "prettierPlugin",
 * }
 *
 * // Results in:
 * import prettierPlugin from "eslint-plugin-prettier"
 * export default [
 *   prettierPlugin,
 *   // ...
 * ]
 *
 * // Configuration with spread
 * {
 *   moduleSpecifier: "eslint-plugin-prettier",
 *   importedBinding: "prettierPlugin",
 *   spreadConfig: true
 * }
 *
 * // Results in:
 * import prettierPlugin from "eslint-plugin-prettier"
 * export default [
 *   ...prettierPlugin,
 *   // ...
 * ]
 */
export interface EslintConfigExtension {
  /**
   * The moduleSpecifier that identifies the module to import from.
   * This is the string literal that appears in the FromClause of an ImportDeclaration.
   *
   * @example "eslint-plugin-prettier"
   * // In: prettierPlugin tseslint from "eslint-plugin-prettier"
   * // eslint-plugin-prettier is the moduleSpecifier
   * @see {@link https://tc39.es/ecma262/multipage/ecmascript-language-scripts-and-modules.html#prod-ModuleSpecifier}
   */
  readonly moduleSpecifier: string;

  /**
   * The importedBinding that defines the name to be bound to the module's default export.
   * This is the local name that appears in a default import declaration.
   *
   * @example "prettierPlugin"
   * // In: import prettierPlugin from "eslint-plugin-prettier"
   * // prettierPlugin is the importedBinding
   * @see {@link https://tc39.es/ecma262/multipage/ecmascript-language-scripts-and-modules.html#prod-ImportedDefaultBinding}
   */
  readonly importedBinding: string;

  /**
   * The configuration reference to be used in the extends section.
   * This can be a plugin name or a specific configuration path from the plugin.
   * When directly referencing the importedBinding (e.g., "prettierPlugin"), this field becomes optional.
   *
   * @example
   * - "prettierPlugin" // Direct plugin reference (optional, uses importedBinding)
   * - "eslint.configs.recommended" // Specific configuration path (required)
   *
   * @default - same as `importedBinding`
   */
  readonly configReference?: string;

  /**
   * Indicates whether the configuration should be spread using the spread operator.
   * When true, the configuration will be included as `...configReference` or `...importedBinding` if configReference is omitted,
   * when false, it will be included as `configReference` or `importedBinding` if configReference is omitted.
   *
   * @example
   * // With configReference
   * true  -> ...eslint.configs.recommended
   * false -> eslint.configs.recommended
   *
   * // Without configReference (using importedBinding)
   * true  -> ...prettierConfig
   * false -> prettierConfig
   *
   * @default false
   */
  readonly spreadConfig?: boolean;
}

export interface EslintRules {
  [rule: string]: any;
}

export interface IEslintConfig {
  /**
   * List of files or glob patterns or directories with source files to enable.
   *
   * @example ["src/*.ts"]
   */
  readonly enablePatterns: string[];

  /**
   * List of files or glob patterns or directories with source files to ignore.
   * as .gitignore patterns.
   *
   * @example [".gitignore", "node_modules"]
   * @default - no ignore patterns
   */
  readonly ignorePatterns?: string[];

  /**
   * ESLint rules to apply.
   * @example { "no-console": "error" }
   * @default - no rules
   */
  readonly rules?: EslintRules;

  /**
   * parser options to apply.
   * @default - no parser options
   */
  readonly parser?: EslintParser;

  /**
   * Plugin(s) to use in ESLint configuration.
   * @default - no plugins
   */
  readonly plugins?: EslintPlugin[];

  /**
   * Extensions to use in ESLint configuration.
   * These are typically configurations from plugins or other ESLint configurations.
   * @default - no extensions
   */
  readonly extensions?: EslintConfigExtension[];

  /**
   * eslint overrides.
   */
  readonly overrides?: Omit<IEslintConfig, "overrides">[];
}
