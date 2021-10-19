import * as path from 'path';
import { PROJEN_DIR, PROJEN_RC } from './common';
import { Component } from './component';
import { Eslint, EslintOptions } from './eslint';
import { NodeProject, NodeProjectOptions } from './node-project';
import { SampleDir } from './sample-file';
import { Task } from './tasks';
import { TextFile } from './textfile';
import { TypeScriptCompilerOptions, TypescriptConfig, TypescriptConfigOptions } from './typescript-config';
import { TypedocDocgen } from './typescript-typedoc';
import { Projenrc, ProjenrcOptions as ProjenrcTsOptions } from './typescript/projenrc';

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
   * Setup eslint.
   *
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
   *
   * NOTE: Typescript is not semantically versioned and should remain on the
   * same minor, so we recommend using a `~` dependency (e.g. `~1.2.3`).
   *
   * @default "latest"
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
   * @default - default options
   */
  readonly tsconfig?: TypescriptConfigOptions;

  /**
   * Custom tsconfig options for the development tsconfig.json file (used for testing).
   * @default - use the production tsconfig options
   */
  readonly tsconfigDev?: TypescriptConfigOptions;

  /**
   * The name of the development tsconfig.json file.
   *
   * @default "tsconfig.dev.json"
   */
  readonly tsconfigDevFile?: string;

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

  /**
   * Use TypeScript for your projenrc file (`.projenrc.ts`).
   *
   * @default false
   */
  readonly projenrcTs?: boolean;

  /**
   * Options for .projenrc.ts
   */
  readonly projenrcTsOptions?: ProjenrcTsOptions;
}

/**
 * TypeScript project
 * @pjid typescript
 */
export class TypeScriptProject extends NodeProject {
  public readonly docgen?: boolean;
  public readonly docsDirectory: string;
  public readonly eslint?: Eslint;
  public readonly tsconfigEslint?: TypescriptConfig;
  public readonly tsconfig?: TypescriptConfig;

  /**
   * A typescript configuration file which covers all files (sources, tests, projen).
   */
  public readonly tsconfigDev: TypescriptConfig;

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

      // disable .projenrc.js if typescript is enabled
      projenrcJs: options.projenrcTs ? false : options.projenrcJs,

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

    this.compileTask.exec('tsc --build');

    this.watchTask = this.addTask('watch', {
      description: 'Watch & compile in the background',
      exec: 'tsc --build -w',
    });

    this.testdir = options.testdir ?? 'test';
    this.gitignore.include(`/${this.testdir}/`);
    this.npmignore?.exclude(`/${this.testdir}/`);

    // if the test directory is under `src/`, then we will run our tests against
    // the javascript files and not let jest compile it for us.
    const compiledTests = this.testdir.startsWith(this.srcdir + path.posix.sep);

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
      });

      this.packageTask.exec('mkdir -p dist/js');
      this.packageTask.exec(`${this.package.packageManager} pack`);
      this.packageTask.exec('mv *.tgz dist/js/');

      this.buildTask.spawn(this.packageTask);
    }

    if (options.entrypointTypes || this.entrypoint !== '') {
      const entrypointTypes = options.entrypointTypes ?? `${path.join(path.dirname(this.entrypoint), path.basename(this.entrypoint, '.js')).replace(/\\/g, '/')}.d.ts`;
      this.package.addField('types', entrypointTypes);
    }

    const compilerOptionDefaults: TypeScriptCompilerOptions = {
      alwaysStrict: true,
      declaration: true,
      esModuleInterop: true,
      experimentalDecorators: true,
      inlineSourceMap: true,
      inlineSources: true,
      lib: ['es2019'],
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
      target: 'ES2019',
    };

    if (!options.disableTsconfig) {
      this.tsconfig = new TypescriptConfig(this, mergeTsconfigOptions({
        include: [`${this.srcdir}/**/*.ts`],
        // exclude: ['node_modules'], // TODO: shouldn't we exclude node_modules?
        compilerOptions: {
          rootDir: this.srcdir,
          outDir: this.libdir,
          ...compilerOptionDefaults,
        },
      }, options.tsconfig));
    }

    const tsconfigDevFile = options.tsconfigDevFile ?? 'tsconfig.dev.json';
    this.tsconfigDev = new TypescriptConfig(this, mergeTsconfigOptions({
      fileName: tsconfigDevFile,
      include: [
        PROJEN_RC,
        `${this.srcdir}/**/*.ts`,
        `${this.testdir}/**/*.ts`,
      ],
      exclude: ['node_modules'],
      compilerOptions: compilerOptionDefaults,
    }, options.tsconfig, options.tsconfigDev));

    this.gitignore.include(`/${this.srcdir}/`);
    this.npmignore?.exclude(`/${this.srcdir}/`);

    if (this.srcdir !== this.libdir) {
      // separated, can ignore the entire libdir
      this.gitignore.exclude(`/${this.libdir}`);
    } else {
      // collocated, can only ignore the compiled output
      this.gitignore.exclude(`/${this.libdir}/**/*.js`);
      this.gitignore.exclude(`/${this.libdir}/**/*.d.ts`);
    }

    this.npmignore?.include(`/${this.libdir}/`);

    this.npmignore?.include(`/${this.libdir}/**/*.js`);
    this.npmignore?.include(`/${this.libdir}/**/*.d.ts`);

    this.gitignore.exclude('/dist/');
    this.npmignore?.exclude('dist'); // jsii-pacmak expects this to be "dist" and not "/dist". otherwise it will tamper with it

    this.npmignore?.exclude('/tsconfig.json');
    this.npmignore?.exclude('/.github/');
    this.npmignore?.exclude('/.vscode/');
    this.npmignore?.exclude('/.idea/');
    this.npmignore?.exclude('/.projenrc.js');
    this.npmignore?.exclude('tsconfig.tsbuildinfo');

    // tests are compiled to `lib/TESTDIR`, so we don't need jest to compile them for us.
    // just run them directly from javascript.
    if (this.jest && compiledTests) {
      this.addDevDeps('@types/jest');

      const testout = path.posix.relative(this.srcdir, this.testdir);
      const libtest = path.posix.join(this.libdir, testout);
      const srctest = this.testdir;

      this.npmignore?.exclude(`/${libtest}/`);
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

      const resolver = new TextFile(this, path.posix.join(PROJEN_DIR, 'jest-snapshot-resolver.js'));
      resolver.addLine('const path = require("path");');
      resolver.addLine(`const libtest = "${libtest}";`);
      resolver.addLine(`const srctest= "${srctest}";`);
      resolver.addLine('module.exports = {');
      resolver.addLine(`  resolveSnapshotPath: ${resolveSnapshotPath.toString()},`);
      resolver.addLine(`  resolveTestPath: ${resolveTestPath.toString()},`);
      resolver.addLine('  testPathForConsistencyCheck: path.join(\'some\', \'__tests__\', \'example.test.js\')');
      resolver.addLine('};');

      this.jest.addSnapshotResolver(`./${resolver.path}`);
    }

    if (this.jest && !compiledTests) {
      this.jest.addTestMatch('**\/__tests__/**\/*.ts?(x)');
      this.jest.addTestMatch('**\/?(*.)+(spec|test).ts?(x)');

      // create a tsconfig for jest that does NOT include outDir and rootDir and
      // includes both "src" and "test" as inputs.
      this.jest.addTypeScriptSupport(this.tsconfigDev);

      // if we test before compilation, remove the lib/ directory before running
      // tests so that we get a clean slate for testing.
      if (!compileBeforeTest) {
        // make sure to delete "lib" *before* running tests to ensure that
        // test code does not take a dependency on "lib" and instead on "src".
        this.testTask.prependExec(`rm -fr ${this.libdir}/`);
      }
    }

    if (options.eslint ?? true) {
      this.eslint = new Eslint(this, {
        tsconfigPath: `./${this.tsconfigDev.fileName}`,
        dirs: [this.srcdir],
        devdirs: [this.testdir, 'build-tools'],
        fileExtensions: ['.ts', '.tsx'],
        ...options.eslintOptions,
      });

      this.tsconfigEslint = this.tsconfigDev;
    }

    const tsver = options.typescriptVersion ? `@${options.typescriptVersion}` : '';

    this.addDevDeps(
      `typescript${tsver}`,
      `@types/node@^${this.package.minNodeVersion ?? '14.17.0'}`, // install the minimum version to ensure compatibility
    );

    // generate sample code in `src` and `lib` if these directories are empty or non-existent.
    if (options.sampleCode ?? true) {
      new SampleCode(this);
    }

    if (this.docgen) {
      new TypedocDocgen(this);
    }

    const projenrcTypeScript = options.projenrcTs ?? false;
    if (projenrcTypeScript) {
      new Projenrc(this, options.projenrcTsOptions);
    }
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

/**
 * @internal
 */
export function mergeTsconfigOptions(...options: (TypescriptConfigOptions | undefined)[]): TypescriptConfigOptions {
  const definedOptions = options.filter(Boolean) as TypescriptConfigOptions[];
  return definedOptions.reduce<TypescriptConfigOptions>((previous, current) => ({
    ...previous,
    ...current,
    include: [
      ...previous.include ?? [],
      ...current.include ?? [],
    ],
    exclude: [
      ...previous.exclude ?? [],
      ...current.exclude ?? [],
    ],
    compilerOptions: {
      ...previous.compilerOptions,
      ...current.compilerOptions,
    },
  }), { compilerOptions: {} });
}
