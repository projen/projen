import { NodeProject, NodeProjectOptions } from './node-project';
import { JsonFile } from './json';
import { JestOptions, Jest } from './jest';
import { Eslint } from './eslint';
import { Semver } from './semver';
import { Mergify, MergifyOptions } from './mergify';
import { Construct } from 'constructs';
import { TypedocDocgen } from './typescript-typedoc';

export interface TypeScriptLibraryProjectOptions extends NodeProjectOptions {
  /**
   * Setup jest unit tests
   * @default true
   */
  readonly jest?: boolean;

  /**
   * Jest options
   * @default - default options
   */
  readonly jestOptions?: JestOptions;

  /**
   *
   * Setup eslint.
   * @default true
   */
  readonly eslint?: boolean;

  /**
   * TypeScript version to use.
   * @default ^3.9.5
   */
  readonly typescriptVersion?: Semver;

  /**
   * Adds mergify configuration.
   * @default true
   */
  readonly mergify?: boolean;

  /**
   * Options for mergify
   * @default - default options
   */
  readonly mergifyOptions?: MergifyOptions;

  /**
   * Docgen by Typedoc
   * 
   * @default false
   */
  readonly docgen?: boolean;

  /**
   * Docs directory
   * 
   * @default 'API'
   */
  readonly docsDirectory?: string;

  /**
   * Custom TSConfig
   * 
   */
  readonly tsconfigOptions?: TypescriptConfigOptions;
}

export class TypeScriptLibraryProject extends NodeProject {
  public readonly docgen?: boolean;
  public readonly docsDirectory: string;

  constructor(options: TypeScriptLibraryProjectOptions) {
    super(options);
    
    this.docgen = options.docgen;
    this.docsDirectory = options.docsDirectory || 'API/';

    this.addScripts({
      compile: 'tsc',
      watch: 'tsc -w',
      package: 'rm -fr dist && mkdir -p dist/js && yarn pack && mv *.tgz dist/js/',
      build: 'yarn compile && yarn test && yarn run package',
    });

    const tsconfig = new TypescriptConfig(this, {
      include: [ '**/*.ts' ],
      exclude: [ 'node_modules' ],
      compilerOptions: {
        alwaysStrict: true,
        declaration: true,
        experimentalDecorators: true,
        inlineSourceMap: true,
        inlineSources: true,
        lib: [ 'es2018' ],
        module: 'CommonJS',
        noEmitOnError: true,
        noFallthroughCasesInSwitch: true,
        noImplicitAny: true,
        noImplicitReturns: true,
        noImplicitThis: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        resolveJsonModule: true,
        strict: true,
        strictNullChecks: true,
        strictPropertyInitialization: true,
        stripInternal: true,
        target: 'ES2018',
      },
      ...options.tsconfigOptions,
    });

    this.gitignore.comment('exclude typescript compiler outputs');
    this.gitignore.exclude('*.d.ts');
    this.gitignore.exclude('*.js');

    this.npmignore.comment('exclude typescript sources and configuration');
    this.npmignore.exclude('*.ts', 'tsconfig.json');

    this.npmignore.comment('include javascript files and typescript declarations');
    this.npmignore.include('*.js');
    this.npmignore.include('*.d.ts');

    if (options.jest ?? true) {
      new Jest(this, {
        typescript: tsconfig,
        ...options.jestOptions,
      });
    }

    if (options.eslint ?? true) {
      new Eslint(this);
    }

    this.addDevDependencies({
      'typescript': options.typescriptVersion ?? Semver.caret('3.9.5'),
      '@types/node': Semver.caret(this.minNodeVersion ?? '10.17.0'), // install the minimum version to ensure compatibility
    });

    if (options.mergify ?? true) {
      new Mergify(this, options.mergifyOptions);
    }

    if (this.docgen) {
      new TypedocDocgen(this);
    }
  }
}

export interface TypescriptConfigOptions {
  /**
   * @default "tsconfig.json"
   */
  readonly fileName?: string;
  /**
   * The directory in which typescript sources reside.
   * @default - all .ts files recursively
   */
  readonly include?: string[];

  /**
   * @default - node_modules is excluded by default
   */
  readonly exclude?: string[];

  /**
   * Compiler options to use.
   *
   * @default - see above
   */
  readonly compilerOptions: TypescriptConfigCompilerOptions;
}

export interface TypescriptConfigCompilerOptions {
  /**
   * Ensures that your files are parsed in the ECMAScript strict mode, and emit “use strict”
   * for each source file.
   * 
   * @default true
   */
  readonly alwaysStrict?: boolean;
  
  /**
   * Offers a way to configure the root directory for where declaration files are emitted.
   * 
   */
  readonly declarationDir?: string;

  /**
   * To be specified along with the above
   * 
   */
  readonly declaration?: boolean;
  
  /**
   * Enables experimental support for decorators, which is in stage 2 of the TC39 standardization process.
   * 
   * @default true
   */
  readonly experimentalDecorators?: boolean; 
  
  /**
   * When set, instead of writing out a .js.map file to provide source maps, 
   * TypeScript will embed the source map content in the .js files.  
   *
   * @default true
   */
  readonly inlineSourceMap?: boolean;

  /**
   * When set, TypeScript will include the original content of the .ts file as an embedded 
   * string in the source map. This is often useful in the same cases as inlineSourceMap.
   *
   * @default true
   */
  readonly inlineSources?: boolean;

  /**
   * Reference for type definitions / libraries to use (eg. ES2016, ES5, ES2018).
   *
   * @default [ 'es2018' ]
   */
  readonly lib?: string[];

  /**
   * Sets the module system for the program. 
   * See https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules.
   *
   * @default 'CommonJS'
   */
  readonly module?: string;
  
  /**
   * Do not emit compiler output files like JavaScript source code, source-maps or
   * declarations if any errors were reported.
   *
   * @default true
   */
  readonly noEmitOnError?: boolean;
  
  /**
   * Report errors for fallthrough cases in switch statements. Ensures that any non-empty 
   * case inside a switch statement includes either break or return. This means you won’t 
   * accidentally ship a case fallthrough bug.
   *
   * @default true
   */
  readonly noFallthroughCasesInSwitch?: boolean;

  /**
   * In some cases where no type annotations are present, TypeScript will fall back to a
   * type of any for a variable when it cannot infer the type.
   *
   * @default true
   */
  readonly noImplicitAny?: boolean;
  
  /**
   * When enabled, TypeScript will check all code paths in a function to ensure they 
   * return a value.
   * 
   * @default true
   */
  readonly noImplicitReturns?: boolean;
  /**
   * Raise error on ‘this’ expressions with an implied ‘any’ type.
   * 
   * @default true
   */
  readonly noImplicitThis?: boolean;

  /**
   * Report errors on unused local variables.
   * 
   * @default true
   */
  readonly noUnusedLocals?: boolean;
  
  /**
   * Report errors on unused parameters in functions.
   * 
   * @default true
   */
  readonly noUnusedParameters?: boolean;

  /**
   * Allows importing modules with a ‘.json’ extension, which is a common practice 
   * in node projects. This includes generating a type for the import based on the static JSON shape.
   * 
   * @default true
   */
  readonly resolveJsonModule?: boolean;

  /**
   * The strict flag enables a wide range of type checking behavior that results in stronger guarantees 
   * of program correctness. Turning this on is equivalent to enabling all of the strict mode family 
   * options, which are outlined below. You can then turn off individual strict mode family checks as
   * needed.
   * 
   * @default true  
   */
  readonly strict?: boolean;

  /**
   * When strictNullChecks is false, null and undefined are effectively ignored by the language. 
   * This can lead to unexpected errors at runtime.
   * When strictNullChecks is true, null and undefined have their own distinct types and you’ll 
   * get a type error if you try to use them where a concrete value is expected.
   * 
   * @default true
   */  
  readonly strictNullChecks?: boolean;
  
  /**
   * When set to true, TypeScript will raise an error when a class property was declared but 
   * not set in the constructor. 
   * 
   * @default true
   */
  readonly strictPropertyInitialization?: boolean;

  /**
   * Do not emit declarations for code that has an @internal annotation in it’s JSDoc comment.
   * 
   * @default true
   */
  readonly stripInternal?: boolean;

  /**
   * Modern browsers support all ES6 features, so ES6 is a good choice. You might choose to set
   * a lower target if your code is deployed to older environments, or a higher target if your
   * code is guaranteed to run in newer environments.
   * 
   * @default 'ES2018'
   */
  readonly target?: string;

  /**
   * Output directory for the compiled files.
   */
  readonly outDir?: string;
}

export class TypescriptConfig extends Construct {
  public readonly compilerOptions: TypescriptConfigCompilerOptions;
  public readonly include: string[];
  public readonly exclude: string[];
  public readonly fileName: string;

  constructor(project: NodeProject, options: TypescriptConfigOptions) {
    const fileName = options.fileName ?? 'tsconfig.json';

    super(project, `tsconfig-${fileName}`);

    this.include = options.include ?? [ '**/*.ts' ];
    this.exclude = options.exclude ?? [ 'node_modules' ];
    this.fileName = fileName;

    this.compilerOptions = options.compilerOptions;

    new JsonFile(project, fileName, {
      obj: {
        compilerOptions: this.compilerOptions,
        include: this.include,
        exclude: this.exclude,
      },
    });

    project.npmignore.exclude(`/${fileName}`);
  }
}
