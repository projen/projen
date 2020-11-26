import { Component } from './component';
import { JsonFile } from './json';
import { NodeProject } from './node-project';
import { StartEntryCategory } from './start';

export interface EslintOptions {
  readonly tsconfigPath: string;

  /**
   * Directories with source files to lint (e.g. [ "src", "test" ])
   */
  readonly dirs: string[];

  /**
   * File types that should be linted (e.g. [ ".js", ".ts" ])
   */
  readonly fileExtensions: string[];

  /**
   * List of file patterns that should not be linted, using the same syntax
   * as .gitignore patterns.
   *
   * @default [ '*.js', '*.d.ts', 'node_modules/', '*.generated.ts', 'coverage' ]
   */
  readonly ignorePatterns?: string[];
}

export class Eslint extends Component {
  /**
   * eslint rules.
   */
  public readonly rules: { [rule: string]: any[] };

  /**
   * Direct access to the eslint configuration (escape hatch)
   */
  public readonly config: any;

  /**
   * File patterns that should not be linted
   */
  public readonly ignorePatterns: string[];

  constructor(project: NodeProject, options: EslintOptions) {
    super(project);

    project.addDevDeps(
      'eslint',
      '@typescript-eslint/eslint-plugin@^4.3.0',
      '@typescript-eslint/parser@^4.3.0',
      'eslint-import-resolver-node',
      'eslint-import-resolver-typescript',
      'eslint-plugin-import',
      'json-schema',
    );

    const dirs = options.dirs;
    const fileExtensions = options.fileExtensions;

    const cmd = [
      'eslint',
      `--ext ${fileExtensions.join(',')}`,
      '--fix',
      '--no-error-on-unmatched-pattern',
      dirs.join(' '),
    ];
    const eslint = project.addCommand('eslint', cmd.join(' '), {
      description: 'Runs eslint against the codebase',
      category: StartEntryCategory.TEST,
    });

    project.testCmd.addSequence(eslint);

    // exclude some files
    project.npmignore?.exclude('/.eslintrc.json');

    this.rules = {
      // Require use of the `import { foo } from 'bar';` form instead of `import foo = require('bar');`
      '@typescript-eslint/no-require-imports': ['error'],

      // see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
      'indent': ['off'],
      '@typescript-eslint/indent': ['error', 2],

      // Style
      'quotes': ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'], // ensures clean diffs, see https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8
      'comma-spacing': ['error', { before: false, after: true }], // space after, no space before
      'no-multi-spaces': ['error', { ignoreEOLComments: false }], // no multi spaces
      'array-bracket-spacing': ['error', 'never'], // [1, 2, 3]
      'array-bracket-newline': ['error', 'consistent'], // enforce consistent line breaks between brackets
      'object-curly-spacing': ['error', 'always'], // { key: 'value' }
      'object-curly-newline': ['error', { multiline: true, consistent: true }], // enforce consistent line breaks between braces
      'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }], // enforce "same line" or "multiple line" on object properties
      'keyword-spacing': ['error'], // require a space before & after keywords
      'brace-style': ['error', '1tbs', { allowSingleLine: true }], // enforce one true brace style
      'space-before-blocks': ['error'], // require space before blocks
      'curly': ['error', 'multi-line', 'consistent'], // require curly braces for multiline control statements
      '@typescript-eslint/member-delimiter-style': ['error'],

      // Require all imported dependencies are actually declared in package.json
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [ // Only allow importing devDependencies from:
            '**/build-tools/**', // --> Build tools
            '**/test/**', // --> Unit tests
          ],
          optionalDependencies: false, // Disallow importing optional dependencies (those shouldn't be in use in the project)
          peerDependencies: true, // Allow importing peer dependencies (that aren't also direct dependencies)
        },
      ],

      // Require all imported libraries actually resolve (!!required for import/no-extraneous-dependencies to work!!)
      'import/no-unresolved': ['error'],

      // Require an ordering on all imports
      'import/order': ['warn', {
        groups: ['builtin', 'external'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      }],

      // Cannot import from the same module twice
      'no-duplicate-imports': ['error'],

      // Cannot shadow names
      'no-shadow': ['off'],
      '@typescript-eslint/no-shadow': ['error'],

      // Required spacing in property declarations (copied from TSLint, defaults are good)
      'key-spacing': ['error'],

      // Require semicolons
      'semi': ['error', 'always'],

      // Don't unnecessarily quote properties
      'quote-props': ['error', 'consistent-as-needed'],

      // No multiple empty lines
      'no-multiple-empty-lines': ['error'],

      // Max line lengths
      'max-len': ['error', {
        code: 150,
        ignoreUrls: true, // Most common reason to disable it
        ignoreStrings: true, // These are not fantastic but necessary for error messages
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
      }],

      // One of the easiest mistakes to make
      '@typescript-eslint/no-floating-promises': ['error'],

      // Make sure that inside try/catch blocks, promises are 'return await'ed
      // (must disable the base rule as it can report incorrect errors)
      'no-return-await': ['off'],
      '@typescript-eslint/return-await': ['error'],

      // Useless diff results
      'no-trailing-spaces': ['error'],

      // Must use foo.bar instead of foo['bar'] if possible
      'dot-notation': ['error'],

      // Are you sure | is not a typo for || ?
      'no-bitwise': ['error'],

      // Member ordering
      '@typescript-eslint/member-ordering': ['error', {
        default: [
          'public-static-field',
          'public-static-method',
          'protected-static-field',
          'protected-static-method',
          'private-static-field',
          'private-static-method',

          'field',

          // Constructors
          'constructor', // = ["public-constructor", "protected-constructor", "private-constructor"]

          // Methods
          'method',
        ],
      }],
    };

    this.ignorePatterns = options.ignorePatterns ?? [
      '*.js',
      '*.d.ts',
      'node_modules/',
      '*.generated.ts',
      'coverage',
    ];

    const tsconfig = './tsconfig.json';

    this.config = {
      env: {
        jest: true,
        node: true,
      },
      root: true,
      plugins: [
        '@typescript-eslint',
        'import',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: options.tsconfigPath,
      },
      extends: [
        'plugin:import/typescript',
      ],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          node: {},
          typescript: {
            directory: tsconfig,
          },
        },
      },
      ignorePatterns: this.ignorePatterns,
      rules: this.rules,
    };

    new JsonFile(project, '.eslintrc.json', { obj: this.config });
  }

  /**
   * Add an eslint rule.
   */
  public addRules(rules: { [rule: string]: any }) {
    for (const [k, v] of Object.entries(rules)) {
      this.rules[k] = v;
    }
  }

  /**
   * Do not lint these files.
   */
  public addIgnorePattern(pattern: string) {
    this.ignorePatterns.push(pattern);
  }
}