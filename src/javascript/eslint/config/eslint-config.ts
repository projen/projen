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

export interface ESLintRules {
  [rule: string]: any;
}

export interface IESLintConfig {
  readonly rules: ESLintRules;
  readonly plugins?: EslintPlugin[];
  readonly extensions?: EslintConfigExtension[];
}
