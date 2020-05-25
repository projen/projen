import { NodeProject, NodeProjectOptions } from './node-project';
import { JsonFile } from './json';

export interface TypeScriptLibraryProjectOptions extends NodeProjectOptions {

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
  }
}