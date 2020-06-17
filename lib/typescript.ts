import { NodeProject, NodeProjectOptions } from './node-project';
import { JsonFile } from './json';
import { JestOptions, Jest } from './jest';
import { Eslint } from './eslint';
import { Semver } from './semver';
import { Mergify, MergifyOptions } from './mergify';

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
}

export class TypeScriptLibraryProject extends NodeProject {
  constructor(options: TypeScriptLibraryProjectOptions) {
    super(options);

    this.addScripts({
      compile: 'tsc',
      watch: 'tsc -w',
      package: 'rm -fr dist && mkdir -p dist/js && yarn pack && mv *.tgz dist/js/',
      build: 'yarn compile && yarn test && yarn run package',
    });

    new JsonFile(this, 'tsconfig.json', {
      obj: {
        include: [ '**/*.ts' ],
        exclude: [ 'node_modules' ],
        compilerOptions: {
          alwaysStrict: true,
          charset: 'utf8',
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
      },
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
      new Jest(this, options.jestOptions);
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
  }
}