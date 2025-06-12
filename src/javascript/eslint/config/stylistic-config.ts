import { NodeProject } from "../../node-project";
import { EslintPlugin, ESLintRules, IESLintConfig } from "./eslint-config";

export class StylisticConfig implements IESLintConfig {
  public readonly rules: ESLintRules;
  public readonly plugins?: EslintPlugin[] | undefined;

  constructor(project: NodeProject) {
    project.addDevDeps("@stylistic/eslint-plugin@^2");
    this.rules = this.initializeRules();
    this.plugins = [
      {
        moduleSpecifier: "@stylistic/eslint-plugin",
        importedBinding: "stylistic",
        pluginAlias: "@stylistic",
      },
    ];
  }

  private initializeRules(): ESLintRules {
    return {
      indent: "off",
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "single", { avoidEscape: true }],
      "@stylistic/comma-dangle": ["error", "always-multiline"], // ensures clean diffs, see https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8
      "@stylistic/comma-spacing": ["error", { before: false, after: true }], // space after, no space before
      "@stylistic/no-multi-spaces": ["error", { ignoreEOLComments: false }], // no multi spaces
      "@stylistic/array-bracket-spacing": ["error", "never"], // [1, 2, 3]
      "@stylistic/array-bracket-newline": ["error", "consistent"], // enforce consistent line breaks between brackets
      "@stylistic/object-curly-spacing": ["error", "always"], // { key: 'value' }
      "@stylistic/object-curly-newline": [
        "error",
        { multiline: true, consistent: true },
      ], // enforce consistent line breaks between braces
      "@stylistic/object-property-newline": [
        "error",
        { allowAllPropertiesOnSameLine: true },
      ], // enforce "same line" or "multiple line" on object properties
      "@stylistic/keyword-spacing": "error", // require a space before & after keywords
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }], // enforce one true brace style
      "@stylistic/space-before-blocks": "error", // require space before blocks
      curly: ["error", "multi-line", "consistent"], // require curly braces for multiline control statements
      "@stylistic/member-delimiter-style": "error",
      "@stylistic/semi": ["error", "always"],
      "@stylistic/max-len": [
        "error",
        {
          code: 150,
          ignoreUrls: true, // Most common reason to disable it
          ignoreStrings: true, // These are not fantastic but necessary for error messages
          ignoreTemplateLiterals: true,
          ignoreComments: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "@stylistic/quote-props": ["error", "consistent-as-needed"],
    };
  }
}
