import * as path from 'path';
import { PROJEN_DIR, PROJEN_RC } from './common';
import { Component } from './component';
import { Eslint, EslintOptions } from './eslint';
import { JsonFile } from './json';
import { NodeProject, NodeProjectOptions } from './node-project';
import { SampleDir } from './sample-file';
import { Task, TaskCategory } from './tasks';
import { TextFile } from './textfile';
import { TypedocDocgen } from './typescript-typedoc';
import { deepMerge } from './util';

export interface TypeScriptProjectOptions extends NodeProjectOptions {
  /**
   * Typescript  artifacts output directory
   *
   * @default "lib"
   */
  readonly libdir?: string;

  /**
   * Typescript sources directory.
   *
   * @default "src"
   */
  readonly srcdir?: string;

  /**
   * Jest tests directory. Tests files should be named `xxx.test.ts`.
   *
   * If this directory is under `srcdir` (e.g. `src/test`, `src/__tests__`),
   * then tests are going to be compiled into `lib/` and executed as javascript.
   * If the test directory is outside of `src`, then we configure jest to
   * compile the code in-memory.
   *
   * @default "test"
   */
  readonly testdir?: string;

  /**
   *
   * Setup eslint.
   * @default true
   */
  readonly eslint?: boolean;

  /**
   * Eslint options
   * @default - opinionated default options
   */
  readonly eslintOptions?: EslintOptions;

  /**
   * TypeScript version to use.
   * @default "^3.9.5"
   */
  readonly typescriptVersion?: string;

  /**
   * Docgen by Typedoc
   *
   * @default false
   */
  readonly docgen?: boolean;

  /**
   * Docs directory
   *
   * @default "docs"
   */
  readonly docsDirectory?: string;

  /**
   * Custom TSConfig
   */
  readonly tsconfig?: TypescriptConfigOptions;

  /**
   * Do not generate a `tsconfig.json` file (used by jsii projects since
   * tsconfig.json is generated by the jsii compiler).
   *
   * @default false
   */
  readonly disableTsconfig?: boolean;

  /**
   * Compile the code before running tests.
   *
   * @default - if `testdir` is under `src/**`, the default is `true`, otherwise the default is `false.
   */
  readonly compileBeforeTest?: boolean;

  /**
   * Generate one-time sample in `src/` and `test/` if there are no files there.
   * @default true
   */
  readonly sampleCode?: boolean;

  /**
   * The .d.ts file that includes the type declarations for this module.
   * @default - .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)
   */
  readonly entrypointTypes?: string;

  /**
   * Defines a `yarn package` command that will produce a tarball and place it
   * under `dist/js`.
   *
   * @default true
   */
  readonly package?: boolean;
}

/**
 * TypeScript project
 * @pjid typescript
 */
export class TypeScriptProject extends NodeProject {
  public readonly docgen?: boolean;
  public readonly docsDirectory: string;
  public readonly eslint?: Eslint;
  public readonly tsconfig?: TypescriptConfig;

  /**
   * The directory in which the .ts sources reside.
   */
  public readonly srcdir: string;

  /**
   * The directory in which compiled .js files reside.
   */
  public readonly libdir: string;

  /**
   * The directory in which tests reside.
   */
  public readonly testdir: string;

  /**
   * The "watch" task.
   */
  public readonly watchTask: Task;

  /**
   * The "package" task (or undefined if `package` is set to `false`).
   */
  public readonly packageTask?: Task;

  constructor(options: TypeScriptProjectOptions) {
    super({
      ...options,
      jestOptions: {
        ...options.jestOptions,
        jestConfig: {
          ...options.jestOptions?.jestConfig,
          testMatch: [],
        },
      },
    });

    this.srcdir = options.srcdir ?? 'src';
    this.libdir = options.libdir ?? 'lib';

    this.docgen = options.docgen;
    this.docsDirectory = options.docsDirectory ?? 'docs/';

    this.compileTask.exec('tsc');

    this.watchTask = this.addTask('watch', {
      description: 'Watch & compile in the background',
      category: TaskCategory.BUILD,
      exec: 'tsc -w',
    });

    this.testdir = options.testdir ?? 'test';
    this.gitignore.include(`/${this.testdir}`);
    this.npmignore?.exclude(`/${this.testdir}`);

    // if the test directory is under `src/`, then we will run our tests against
    // the javascript files and not let jest compile it for us.
    const compiledTests = this.testdir.startsWith(this.srcdir + path.sep);

    // by default, we first run tests (jest compiles the typescript in the background) and only then we compile.
    const compileBeforeTest = options.compileBeforeTest ?? compiledTests;

    if (compileBeforeTest) {
      this.buildTask.spawn(this.compileTask);
      this.buildTask.spawn(this.testTask);
    } else {
      this.buildTask.spawn(this.testTask);
      this.buildTask.spawn(this.compileTask);
    }

    if (options.package ?? true) {
      this.packageTask = this.addTask('package', {
        description: 'Create an npm tarball',
        category: TaskCategory.RELEASE,
      });

      this.addDevDeps('shx');
      this.packageTask.exec('shx rm -fr dist');
      this.packageTask.exec('shx mkdir -p dist/js');
      this.packageTask.exec(`${this.package.packageManager} pack`);
      this.packageTask.exec('shx mv *.tgz dist/js/');

      this.buildTask.spawn(this.packageTask);
    }

    if (options.entrypointTypes || this.entrypoint !== '') {
      const entrypointTypes = options.entrypointTypes ?? `${path.join(path.dirname(this.entrypoint), path.basename(this.entrypoint, '.js')).replace(/\\/g, '/')}.d.ts`;
      this.package.addField('types', entrypointTypes);
    }

    const compilerOptionDefaults: TypeScriptCompilerOptions = {
      alwaysStrict: true,
      declaration: true,
      experimentalDecorators: true,
      inlineSourceMap: true,
      inlineSources: true,
      lib: ['es2018'],
      module: 'CommonJS',
      noEmitOnError: false,
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
    };

    if (!options.disableTsconfig) {
      const baseTsconfig: TypescriptConfigOptions = {
        include: [`${this.srcdir}/**/*.ts`],
        exclude: [
          'node_modules',
          this.libdir,
        ],
        compilerOptions: {
          rootDir: this.srcdir,
          outDir: this.libdir,
          ...compilerOptionDefaults,
        },
      };
      this.tsconfig = new TypescriptConfig(this,
        deepMerge([baseTsconfig, options.tsconfig]) as TypescriptConfigOptions);
    }

    this.gitignore.exclude(`/${this.libdir}`);
    this.npmignore?.include(`/${this.libdir}`);

    this.gitignore.include(`/${this.srcdir}`);
    this.npmignore?.exclude(`/${this.srcdir}`);

    this.npmignore?.include(`/${this.libdir}/**/*.js`);
    this.npmignore?.include(`/${this.libdir}/**/*.d.ts`);

    this.gitignore.exclude('/dist');
    this.npmignore?.exclude('dist'); // jsii-pacmak expects this to be "dist" and not "/dist". otherwise it will tamper with it

    this.npmignore?.exclude('/tsconfig.json');
    this.npmignore?.exclude('/.github');
    this.npmignore?.exclude('/.vscode');
    this.npmignore?.exclude('/.idea');
    this.npmignore?.exclude('/.projenrc.js');

    // tests are compiled to `lib/TESTDIR`, so we don't need jest to compile them for us.
    // just run them directly from javascript.
    if (this.jest && compiledTests) {
      this.addDevDeps('@types/jest');

      const testout = path.relative(this.srcdir, this.testdir);
      const libtest = path.join(this.libdir, testout);
      const srctest = this.testdir;

      this.jest.addTestMatch(`**/${libtest}/**/?(*.)+(spec|test).js?(x)`);
      this.jest.addWatchIgnorePattern(`/${this.srcdir}/`);

      const resolveSnapshotPath = (test: string, ext: string) => {
        const fullpath = test.replace(libtest, srctest);
        return path.join(path.dirname(fullpath), '__snapshots__', path.basename(fullpath, '.js') + '.ts' + ext);
      };

      const resolveTestPath = (snap: string, ext: string) => {
        const filename = path.basename(snap, '.ts' + ext) + '.js';
        const dir = path.dirname(path.dirname(snap)).replace(srctest, libtest);
        return path.join(dir, filename);
      };

      const resolver = new TextFile(this, path.join(PROJEN_DIR, 'jest-snapshot-resolver.js'));
      resolver.addLine('const path = require("path");');
      resolver.addLine(`const libtest = "${libtest}";`);
      resolver.addLine(`const srctest= "${srctest}";`);
      resolver.addLine('module.exports = {');
      resolver.addLine(`  resolveSnapshotPath: ${resolveSnapshotPath.toString()},`);
      resolver.addLine(`  resolveTestPath: ${resolveTestPath.toString()},`);
      resolver.addLine('  testPathForConsistencyCheck: "some/__tests__/example.test.js"');
      resolver.addLine('};');

      this.jest.addSnapshotResolver(`./${resolver.path}`);
    }

    if (this.jest && !compiledTests) {
      this.jest.addTestMatch('**\/__tests__/**\/*.ts?(x)');
      this.jest.addTestMatch('**\/?(*.)+(spec|test).ts?(x)');
      // create a tsconfig for jest that does NOT include outDir and rootDir and
      // includes both "src" and "test" as inputs.
      const tsconfig = this.jest.generateTypescriptConfig({
        fileName: 'tsconfig.jest.json',
        include: [
          PROJEN_RC,
          `${this.srcdir}/**/*.ts`,
          `${this.testdir}/**/*.ts`,
        ],
        exclude: [
          'node_modules',
        ],
        compilerOptions: compilerOptionDefaults,
      });

      // if we test before compilation, remove the lib/ directory before running
      // tests so that we get a clean slate for testing.
      if (!compileBeforeTest) {
        // make sure to delete "lib" *before* running tests to ensure that
        // test code does not take a dependency on "lib" and instead on "src".
        this.testTask.prependExec(`shx rm -fr ${this.libdir}/`);
      }

      // compile test code
      this.testCompileTask.exec(`tsc --noEmit --project ${tsconfig.fileName}`);
    }

    if (options.eslint ?? true) {
      this.eslint = new Eslint(this, {
        tsconfigPath: './tsconfig.eslint.json',
        dirs: [this.srcdir],
        devdirs: [this.testdir, 'build-tools'],
        fileExtensions: ['.ts', '.tsx'],
        ...options.eslintOptions,
      });

      new TypescriptConfig(this, {
        fileName: 'tsconfig.eslint.json',
        include: [
          PROJEN_RC,
          `${this.srcdir}/**/*.ts`,
          `${this.testdir}/**/*.ts`,
        ],
        exclude: [
          'node_modules',
        ],
        compilerOptions: compilerOptionDefaults,
      });
    }

    this.addDevDeps(
      `typescript@${options.typescriptVersion ?? '^3.9.5'}`,
      `@types/node@^${this.package.minNodeVersion ?? '10.17.0'}`, // install the minimum version to ensure compatibility
    );

    // generate sample code in `src` and `lib` if these directories are empty or non-existent.
    if (options.sampleCode ?? true) {
      new SampleCode(this);
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
   * Specifies a list of glob patterns that match TypeScript files to be included in compilation.
   *
   * @default - all .ts files recursively
   */
  readonly include?: string[];

  /**
   * Filters results from the "include" option.
   *
   * @default - node_modules is excluded by default
   */
  readonly exclude?: string[];

  /**
   * Compiler options to use.
   */
  readonly compilerOptions: TypeScriptCompilerOptions;
}

/**
 * Determines how modules get resolved.
 *
 * @see https://www.typescriptlang.org/docs/handbook/module-resolution.html
 */
export enum TypeScriptModuleResolution {
  /**
   * TypeScript's former default resolution strategy.
   *
   * @see https://www.typescriptlang.org/docs/handbook/module-resolution.html#classic
   */
  CLASSIC = 'classic',

  /**
   * Resolution strategy which attempts to mimic the Node.js module resolution strategy at runtime.
   *
   * @see https://www.typescriptlang.org/docs/handbook/module-resolution.html#node
   */
  NODE = 'node'
}

/**
 * Determines how JSX should get transformed into valid JavaScript.
 *
 * @see https://www.typescriptlang.org/docs/handbook/jsx.html
 */
export enum TypeScriptJsxMode {
  /**
   * Keeps the JSX as part of the output to be further consumed by another transform step (e.g. Babel).
   */
  PRESERVE = 'preserve',

  /**
   * Converts JSX syntax into React.createElement, does not need to go through a JSX transformation before use, and the output will have a .js file extension.
   */
  REACT = 'react',

  /**
   * Keeps all JSX like 'preserve' mode, but output will have a .js extension.
   */
  REACT_NATIVE = 'react-native'
}

export interface TypeScriptCompilerOptions {
  /**
   * Allow JavaScript files to be compiled.
   *
   * @default false
   */
  readonly allowJs?: boolean;

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
   * Emit __importStar and __importDefault helpers for runtime babel
   * ecosystem compatibility and enable --allowSyntheticDefaultImports for
   * typesystem compatibility.
   *
   * @default false
   */
  readonly esModuleInterop?: boolean;

  /**
   * Enables experimental support for decorators, which is in stage 2 of the TC39 standardization process.
   *
   * @default true
   */
  readonly experimentalDecorators?: boolean;

  /**
   * Disallow inconsistently-cased references to the same file.
   *
   * @default false
   */
  readonly forceConsistentCasingInFileNames?: boolean;

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
   * Perform additional checks to ensure that separate compilation (such as
   * with transpileModule or @babel/plugin-transform-typescript) would be safe.
   *
   * @default false
   */
  readonly isolatedModules?: boolean;

  /**
   * Support JSX in .tsx files: "react", "preserve", "react-native"
   *
   * @default undefined
   */
  readonly jsx?: TypeScriptJsxMode;

  /**
   * Reference for type definitions / libraries to use (eg. ES2016, ES5, ES2018).
   *
   * @default [ "es2018" ]
   */
  readonly lib?: string[];

  /**
   * Sets the module system for the program.
   * See https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules.
   *
   * @default "CommonJS"
   */
  readonly module?: string;

  /**
   * Determine how modules get resolved. Either "Node" for Node.js/io.js style resolution, or "Classic".
   *
   * @default "node"
   */
  readonly moduleResolution?: TypeScriptModuleResolution;

  /**
   * Do not emit outputs.
   *
   * @default false
   */
  readonly noEmit?: boolean;

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
   * Skip type checking of all declaration files (*.d.ts).
   *
   * @default false
   */
  readonly skipLibCheck?: boolean;

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
   * @default "ES2018"
   */
  readonly target?: string;

  /**
   * Output directory for the compiled files.
   */
  readonly outDir?: string;

  /**
   * Specifies the root directory of input files.
   *
   * Only use to control the output directory structure with `outDir`.
   */
  readonly rootDir?: string;

  /**
   * Allow default imports from modules with no default export. This does not affect code emit, just typechecking.
   */
  readonly allowSyntheticDefaultImports?: boolean;
}

export class TypescriptConfig {
  public readonly compilerOptions: TypeScriptCompilerOptions;
  public readonly include: string[];
  public readonly exclude: string[];
  public readonly fileName: string;
  public readonly file: JsonFile;

  constructor(project: NodeProject, options: TypescriptConfigOptions) {
    const fileName = options.fileName ?? 'tsconfig.json';

    this.include = options.include ?? ['**/*.ts'];
    this.exclude = options.exclude ?? ['node_modules'];
    this.fileName = fileName;

    this.compilerOptions = options.compilerOptions;

    this.file = new JsonFile(project, fileName, {
      obj: {
        compilerOptions: this.compilerOptions,
        include: this.include,
        exclude: this.exclude,
      },
    });

    project.npmignore?.exclude(`/${fileName}`);
  }
}


class SampleCode extends Component {
  constructor(project: TypeScriptProject) {
    super(project);
    const srcCode = [
      'export class Hello {',
      '  public sayHello() {',
      '    return \'hello, world!\';',
      '  }',
      '}',
    ].join('\n');

    const testCode = [
      "import { Hello } from '../src';",
      '',
      "test('hello', () => {",
      "  expect(new Hello().sayHello()).toBe('hello, world!');",
      '});',
    ].join('\n');

    new SampleDir(project, project.srcdir, {
      files: {
        'index.ts': srcCode,
      },
    });

    new SampleDir(project, project.testdir, {
      files: {
        'hello.test.ts': testCode,
      },
    });
  }
}

/**
 * TypeScript app.
 *
 * @pjid typescript-app
 */
export class TypeScriptAppProject extends TypeScriptProject {
  constructor(options: TypeScriptProjectOptions) {
    super({
      allowLibraryDependencies: false,
      releaseWorkflow: false,
      entrypoint: '', // "main" is not needed in typescript apps
      package: false,
      ...options,
    });
  }
}

/**
 * @deprecated use `TypeScriptProject`
 */
export class TypeScriptLibraryProject extends TypeScriptProject {
};

/**
 * @deprecated use TypeScriptProjectOptions
 */
export interface TypeScriptLibraryProjectOptions extends TypeScriptProjectOptions {
}
