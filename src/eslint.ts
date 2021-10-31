import { Project } from '.';
import { PROJEN_RC } from './common';
import { Component } from './component';
import { JsonFile } from './json';
import { NodeProject } from './node-project';


export interface EslintOptions {
  /**
   * Path to `tsconfig.json` which should be used by eslint.
   * @default "./tsconfig.json"
   */
  readonly tsconfigPath?: string;

  /**
   * Directories with source files to lint (e.g. [ "src" ])
   */
  readonly dirs: string[];

  /**
   * Directories with source files that include tests and build tools. These
   * sources are linted but may also import packages from `devDependencies`.
   * @default []
   */
  readonly devdirs?: string[];

  /**
   * File types that should be linted (e.g. [ ".js", ".ts" ])
   * @default [".ts"]
   */
  readonly fileExtensions?: string[];

  /**
   * List of file patterns that should not be linted, using the same syntax
   * as .gitignore patterns.
   *
   * @default [ '*.js', '*.d.ts', 'node_modules/', '*.generated.ts', 'coverage' ]
   */
  readonly ignorePatterns?: string[];

  /**
   * Should we lint .projenrc.js
   * @default true
   */
  readonly lintProjenRc?: boolean;

  /**
   * Enable prettier for code formatting
   * @default false
   */
  readonly prettier?: boolean;

  /**
   * Enable import alias for module paths
   * @default undefined
   */
  readonly aliasMap?: { [key: string]: string };

  /**
   * Enable import alias for module paths
   * @default undefined
   */
  readonly aliasExtensions?: string[];
}

/**
 * eslint rules override
 */
export interface EslintOverride {
  /**
   * Files or file patterns on which to apply the override
   */
  readonly files: string[];

  /**
   * The overriden rules
   */
  readonly rules: { [rule: string]: any };
}

/**
 * Represents eslint configuration.
 */
export class Eslint extends Component {

  /**
   * Returns the singletone Eslint component of a project or undefined if there is none.
   */
  public static of(project: Project): Eslint | undefined {
    const isEslint = (c: Component): c is Eslint => c instanceof Eslint;
    return project.components.find(isEslint);
  }

  /**
   * eslint rules.
   */
  public readonly rules: { [rule: string]: any[] };

  /**
   * eslint overrides.
   */
  public readonly overrides: EslintOverride[];

  /**
   * Direct access to the eslint configuration (escape hatch)
   */
  public readonly config: any;

  /**
   * File patterns that should not be linted
   */
  public readonly ignorePatterns: string[];

  private readonly _allowDevDeps: Set<string>;

  constructor(project: NodeProject, options: EslintOptions) {
    super(project);

    project.addDevDeps(
      'eslint',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint-import-resolver-node',
      'eslint-import-resolver-typescript',
      'eslint-plugin-import',
      'json-schema',
    );

    if (options.prettier) {
      project.addDevDeps(
        'prettier',
        'eslint-plugin-prettier',
        'eslint-config-prettier',
      );
    }

    if (options.aliasMap) {
      project.addDevDeps('eslint-import-resolver-alias');
    }

    const devdirs = options.devdirs ?? [];

    const dirs = [...options.dirs, ...devdirs];
    const fileExtensions = options.fileExtensions ?? ['.ts'];

    this._allowDevDeps = new Set((devdirs ?? []).map(dir => `**/${dir}/**`));

    const lintProjenRc = options.lintProjenRc ?? true;

    const eslint = project.addTask('eslint', {
      description: 'Runs eslint against the codebase',
      exec: [
        'eslint',
        `--ext ${fileExtensions.join(',')}`,
        '--fix',
        '--no-error-on-unmatched-pattern',
        ...dirs,
        ...lintProjenRc ? [PROJEN_RC] : [],
      ].join(' '),
    });

    project.testTask.spawn(eslint);

    // exclude some files
    project.npmignore?.exclude('/.eslintrc.json');

    const formattingRules: { [rule: string]: any } = options.prettier ? {
      'prettier/prettier': ['error'],
    } : {
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

      // Require semicolons
      'semi': ['error', 'always'],

      // Max line lengths
      'max-len': ['error', {
        code: 150,
        ignoreUrls: true, // Most common reason to disable it
        ignoreStrings: true, // These are not fantastic but necessary for error messages
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
      }],

      // Don't unnecessarily quote properties
      'quote-props': ['error', 'consistent-as-needed'],
    };

    this.rules = {
      ...formattingRules,
      // Require use of the `import { foo } from 'bar';` form instead of `import foo = require('bar');`
      '@typescript-eslint/no-require-imports': ['error'],

      // Require all imported dependencies are actually declared in package.json
      'import/no-extraneous-dependencies': [
        'error',
        {
          // Only allow importing devDependencies from "devdirs".
          devDependencies: () => this.renderDevDepsAllowList(),
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

      // No multiple empty lines
      'no-multiple-empty-lines': ['error'],

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

    // Overrides for .projenrc.js
    this.overrides = [
      {
        files: [PROJEN_RC],
        rules: {
          '@typescript-eslint/no-require-imports': 'off',
          'import/no-extraneous-dependencies': 'off',
        },
      },
    ];

    this.ignorePatterns = options.ignorePatterns ?? [
      '*.js',
      `!${PROJEN_RC}`,
      '*.d.ts',
      'node_modules/',
      '*.generated.ts',
      'coverage',
    ];

    const tsconfig = options.tsconfigPath ?? './tsconfig.json';

    const plugins = [
      '@typescript-eslint',
      'import',
      ...(options.prettier ? ['prettier'] : []),
    ];

    const extendsConf = [
      'plugin:import/typescript',
      ...(options.prettier ? [
        'prettier',
        'plugin:prettier/recommended',
      ] : []),
    ];

    this.config = {
      env: {
        jest: true,
        node: true,
      },
      root: true,
      plugins,
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: tsconfig,
      },
      extends: extendsConf,
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          ...( options.aliasMap && {
            alias: {
              map: Object.entries(options.aliasMap).map(([k, v]) => [k, v]),
              extensions: options.aliasExtensions,
            },
          }),
          node: {},
          typescript: {
            project: tsconfig,
          },
        },
      },
      ignorePatterns: this.ignorePatterns,
      rules: this.rules,
      overrides: this.overrides,
    };

    new JsonFile(project, '.eslintrc.json', { obj: this.config, marker: false });
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
   * Add an eslint override.
   */
  public addOverride(override: EslintOverride) {
    this.overrides.push(override);
  }

  /**
   * Do not lint these files.
   */
  public addIgnorePattern(pattern: string) {
    this.ignorePatterns.push(pattern);
  }

  /**
   * Add a glob file pattern which allows importing dev dependencies.
   * @param pattern glob pattern.
   */
  public allowDevDeps(pattern: string) {
    this._allowDevDeps.add(pattern);
  }

  private renderDevDepsAllowList() {
    return Array.from(this._allowDevDeps);
  }
}
