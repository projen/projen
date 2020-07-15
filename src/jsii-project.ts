import { CommonOptions } from './node-project';
import { Semver } from './semver';
import { Eslint } from './eslint';
import { JestOptions } from './jest';
import { JsiiDocgen } from './jsii-docgen';
import { Lazy } from 'constructs';
import { TypeScriptProject } from './typescript';

const DEFAULT_JSII_VERSION = '1.6.0';
const DEFAULT_JSII_IMAGE = 'jsii/superchain';


// jsii/superchain has 10.20.1
// nvm has 10.17.0
// @types/node has 10.17.0
const DEFAULT_JSII_MIN_NODE = '10.17.0';

export interface JsiiProjectOptions extends CommonOptions {
  /**
   * @default "."
   */
  readonly rootdir?: string;

  readonly name: string;
  readonly description?: string;
  readonly repository: string;
  readonly authorName: string;
  readonly authorEmail?: string;
  readonly authorUrl?: string;
  readonly authorOrganization?: boolean;
  readonly license?: string;
  readonly stability?: string;

  readonly java?: JsiiJavaTarget;
  readonly python?: JsiiPythonTarget;
  readonly dotnet?: JsiiDotNetTarget;

  readonly jsiiVersion?: Semver;

  /**
   * Install eslint.
   *
   * @default true
   */
  readonly eslint?: boolean;

  /**
   * Use jest for unit tests.
   * @default true
   */
  readonly jest?: boolean;

  /**
   * Jest options
   * @default - defaults
   */
  readonly jestOptions?: JestOptions;

  /**
   * Add mergify configuration
   * @default true
   */
  readonly mergify?: boolean;

  /**
   * Automatically generate API.md from jsii
   * @default true
   */
  readonly docgen?: boolean;

  /**
   * Automatically run API compatibility test against the latest version published to npm after compilation.
   *
   * - You can manually run compatbility tests using `yarn compat` if this feature is disabled.
   * - You can ignore compatibility failures by adding lines to a ".compatignore" file.
   *
   * @default false
   */
  readonly compat?: boolean;

  /**
   * Name of the ignore file for API compatibility tests.
   *
   * @default .compatignore
   */
  readonly compatIgnore?: string;
}

export enum Stability {
  EXPERIMENTAL = 'experimental',
  STABLE = 'stable',
  DEPRECATED = 'deprecated'
}

export interface JsiiJavaTarget {
  readonly javaPackage: string;
  readonly mavenGroupId: string;
  readonly mavenArtifactId: string;
}

export interface JsiiPythonTarget {
  readonly distName: string;
  readonly module: string;
}

export interface JsiiDotNetTarget {
  readonly dotNetNamespace: string;
  readonly packageId: string;
}

/**
 * jsii library project
 */
export class JsiiProject extends TypeScriptProject {
  private readonly compileCommands: string[];

  public readonly eslint?: Eslint;

  constructor(options: JsiiProjectOptions) {
    const minNodeVersion = options.minNodeVersion ?? DEFAULT_JSII_MIN_NODE;

    super({
      ...options,
      workflowContainerImage: options.workflowContainerImage ?? DEFAULT_JSII_IMAGE,
      releaseToNpm: false, // we have a jsii release workflow
      minNodeVersion,
      ...options,
      disableTsconfig: true, // jsii generates its own tsconfig.json
    });

    const srcdir = this.srcdir;
    const libdir = this.libdir;
    // const testdir = this.testdir;

    this.compileCommands = new Array<string>();;

    if (!options.authorEmail && !options.authorUrl) {
      throw new Error('at least "authorEmail" or "authorUrl" are required for jsii projects');
    }

    this.addFields({ types: `${libdir}/index.d.ts` });

    // this is an unhelpful warning
    const jsiiFlags = '--silence-warnings=reserved-word';

    const compatIgnore = options.compatIgnore ?? '.compatignore';

    this.addScripts({
      compile: Lazy.stringValue({ produce: () => this.renderCompileCommand() }),
      watch: `jsii -w ${jsiiFlags}`,
      compat: `npx jsii-diff npm:$(node -p "require(\'./package.json\').name") -k --ignore-file ${compatIgnore} || (echo "\nUNEXPECTED BREAKING CHANGES: add keys such as \'removed:constructs.Node.of\' to ${compatIgnore} to skip.\n" && exit 1)`,
      package: 'jsii-pacmak',

      // we run "test" first because it deletes "lib/"
      build: 'yarn test && yarn compile && yarn run package',
    });

    this.addFields({ stability: options.stability ?? Stability.STABLE });

    if (options.stability === Stability.DEPRECATED) {
      this.addFields({ deprecated: true });
    }

    this.addCompileCommand(`jsii ${jsiiFlags}`);

    const targets: Record<string, any> = { };

    this.addFields({
      jsii: {
        outdir: 'dist',
        targets,
        tsc: {
          outDir: libdir,
          rootDir: srcdir,
        },
      },
    });

    this.publishToNpm();

    if (options.java) {
      targets.java = {
        package: options.java.javaPackage,
        maven: {
          groupId: options.java.mavenGroupId,
          artifactId: options.java.mavenArtifactId,
        },
      };

      this.publishToMaven();
    }

    if (options.python) {
      targets.python = {
        distName: options.python.distName,
        module: options.python.module,
      };

      this.publishToPyPi();
    }

    if (options.dotnet) {
      targets.dotnet = {
        namespace: options.dotnet.dotNetNamespace,
        packageId: options.dotnet.packageId,
      };

      this.publishToNuget();
    }

    const jsiiVersion = options.jsiiVersion ?? Semver.caret(DEFAULT_JSII_VERSION);

    this.addDevDependencies({
      'jsii': jsiiVersion,
      'jsii-diff': jsiiVersion,
      'jsii-pacmak': jsiiVersion,
      'jsii-release': Semver.caret('0.1.6'),
      '@types/node': Semver.caret(minNodeVersion),
    });

    this.gitignore.exclude('.jsii', 'tsconfig.json');
    this.npmignore.include('.jsii');

    if (options.docgen ?? true) {
      new JsiiDocgen(this);
    }

    const compat = options.compat ?? false;
    if (compat) {
      this.addCompileCommand('yarn compat');
    }

    // jsii updates .npmignore, so we make it writable
    this.npmignore.readonly = false;
  }

  /**
   * Adds that will be executed after the jsii compilation
   * @param command The command to execute
   */
  public addCompileCommand(command: string) {
    this.compileCommands.push(command);
  }

  private renderCompileCommand() {
    return this.compileCommands.join(' && ');
  }

  private publishToNpm() {
    if (!this.releaseWorkflow) {
      return;
    }

    this.releaseWorkflow.addJobs({
      release_npm: {
        'name': 'Release to NPM',
        'needs': this.releaseWorkflow.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          image: 'jsii/superchain',
        },
        'steps': [
          {
            name: 'Download build artifacts',
            uses: 'actions/download-artifact@v1',
            with: {
              name: 'dist',
            },
          },
          {
            name: 'Release',
            run: 'npx -p jsii-release jsii-release-npm',
            env: {
              NPM_TOKEN: '${{ secrets.NPM_TOKEN }}',
              NPM_DIST_TAG: this.npmDistTag,
            },
          },
        ],
      },
    });
  }

  private publishToNuget() {
    if (!this.releaseWorkflow) {
      return;
    }
    this.releaseWorkflow.addJobs({
      release_nuget: {
        'name': 'Release to Nuget',
        'needs': this.releaseWorkflow.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          image: 'jsii/superchain',
        },
        'steps': [
          {
            name: 'Download build artifacts',
            uses: 'actions/download-artifact@v1',
            with: {
              name: 'dist',
            },
          },
          {
            name: 'Release',
            run: 'npx -p jsii-release jsii-release-nuget',
            env: {
              NUGET_API_KEY: '${{ secrets.NUGET_API_KEY }}',
            },
          },
        ],
      },
    });
  }

  private publishToMaven() {
    if (!this.releaseWorkflow) {
      return;
    }
    this.releaseWorkflow.addJobs({
      release_maven: {
        'name': 'Release to Maven',
        'needs': this.releaseWorkflow.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          image: 'jsii/superchain',
        },
        'steps': [
          {
            name: 'Download build artifacts',
            uses: 'actions/download-artifact@v1',
            with: {
              name: 'dist',
            },
          },
          {
            name: 'Release',
            run: 'npx -p jsii-release jsii-release-maven',
            env: {
              MAVEN_GPG_PRIVATE_KEY: '${{ secrets.MAVEN_GPG_PRIVATE_KEY }}',
              MAVEN_GPG_PRIVATE_KEY_PASSPHRASE: '${{ secrets.MAVEN_GPG_PRIVATE_KEY_PASSPHRASE }}',
              MAVEN_PASSWORD: '${{ secrets.MAVEN_PASSWORD }}',
              MAVEN_USERNAME: '${{ secrets.MAVEN_USERNAME }}',
              MAVEN_STAGING_PROFILE_ID: '${{ secrets.MAVEN_STAGING_PROFILE_ID }}',
            },
          },
        ],
      },
    });
  }

  private publishToPyPi() {
    if (!this.releaseWorkflow) {
      return;
    }
    this.releaseWorkflow.addJobs({
      release_pypi: {
        'name': 'Release to PyPi',
        'needs': this.releaseWorkflow.buildJobId,
        'runs-on': 'ubuntu-latest',
        'container': {
          image: 'jsii/superchain',
        },
        'steps': [
          {
            name: 'Download build artifacts',
            uses: 'actions/download-artifact@v1',
            with: {
              name: 'dist',
            },
          },
          {
            name: 'Release',
            run: 'npx -p jsii-release jsii-release-pypi',
            env: {
              TWINE_USERNAME: '${{ secrets.TWINE_USERNAME }}',
              TWINE_PASSWORD: '${{ secrets.TWINE_PASSWORD }}',
            },
          },
        ],
      },
    });
  }
}