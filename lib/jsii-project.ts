import { NodeProject, DependencyOptions } from './node-project';
import { Semver } from './semver';
import { Eslint } from './eslint';

export interface JsiiProjectOptions extends DependencyOptions {
  /**
   * @default "."
   */
  readonly rootdir?: string;

  readonly name: string;
  readonly version: string;
  readonly description?: string;
  readonly repository: string;
  readonly authorName: string;
  readonly authorEmail: string;
  readonly license?: string;
  readonly stability?: string;

  readonly java?: JsiiJavaTarget;
  readonly python?: JsiiPythonTarget;
  readonly dotnet?: JsiiDotNetTarget;

  readonly jsiiVersion: Semver;

  /**
   * Install eslint.
   * 
   * @default true
   */
  readonly eslint?: boolean;
}

export enum Stability {
  EXPERIMENTAL = 'experimental',
  STABLE = 'stable',
  DEPRECATED = 'deprecated'
}

export interface JsiiJavaTarget {
  readonly package: string;
  readonly mavenGroupId: string;
  readonly mavenArtifactId: string;
}

export interface JsiiPythonTarget {
  readonly distName: string;
  readonly module: string;
}

export interface JsiiDotNetTarget {
  readonly namespace: string;
  readonly packageId: string;
}

export class JsiiProject extends NodeProject {
  constructor(options: JsiiProjectOptions) {
    super(options);

    this.setFields({ types: 'lib/index.d.ts' });

    this.addScripts({
      compile: 'jsii',
      watch: 'jsii -w',
      test: 'echo ok',
      compat: 'npx jsii-diff npm:$(node -p "require(\'./package.json\').name")',
      package: 'jsii-pacmak',
      bump: 'standard-version',
      build: 'yarn compile && yarn test && yarn run package',
    });

    this.setFields({ stability: options.stability ?? Stability.STABLE });

    if (options.stability === Stability.DEPRECATED) {
      this.setFields({ deprecated: true });
    }

    const targets: Record<string, any> = { };

    this.setFields({
      jsii: {
        outdir: 'dist',
        targets,
      },
    });

    if (options.java) {
      targets.java = {
        package: options.java.package,
        maven: {
          groupId: options.java.mavenGroupId,
          artifactId: options.java.mavenArtifactId,
        },
      };
    }

    if (options.python) {
      targets.python = {
        distName: options.python.distName,
        module: options.python.module,
      };
    }

    if (options.dotnet) {
      targets.dotnet = {
        namespace: options.dotnet.namespace,
        packageId: options.dotnet.packageId,
      }
    }

    this.addDevDependencies({
      'jsii': options.jsiiVersion,
      'jsii-diff': options.jsiiVersion,
      'jsii-pacmak': options.jsiiVersion,
      'jsii-release': Semver.caret('0.1.5'),
      'standard-version': Semver.caret('8.0.0'),
      '@types/node': Semver.caret('13.13.5'),
    });

    const eslint = options.eslint ?? true;
    if (eslint) {
      new Eslint(this, { project: this });
    }

    this.gitignore.exclude(
      'dist',
      'tsconfig.json',
      '.jsii',
      '*.d.ts',
      '*.js',
    );

    // exclude typescript source and config
    this.npmignore.exclude('*.ts', 'tsconfig.json');

    // include javascript files and typescript declarations
    this.npmignore.include('*.js');
    this.npmignore.include('*.d.ts');

    // exclude jsii outdir
    this.npmignore.exclude('dist');
    
    // include .jsii manifest
    this.npmignore.include('.jsii');
  }
}
