import { Eslint } from './eslint';
import { JsiiDocgen } from './jsii-docgen';
import { NodeProjectOptions } from './node-project';
import { TaskCategory } from './tasks';
import { TypeScriptProject } from './typescript';

const DEFAULT_JSII_IMAGE = 'jsii/superchain';

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

export interface JsiiProjectOptions extends NodeProjectOptions {
  /**
   * @default "."
   */
  readonly rootdir?: string;

  /**
   * Git repository URL.
   * @default $GIT_REMOTE
   */
  readonly repositoryUrl: string;

  /**
   * The name of the library author.
   * @default $GIT_USER_NAME
   */
  readonly author: string;

  /**
   * Email or URL of the library author.
   * @default $GIT_USER_EMAIL
   */
  readonly authorAddress: string;

  /**
   * Publish to maven
   * @default - no publishing
   */
  readonly java?: JsiiJavaTarget;

  /**
   * Publish to pypi
   * @default - no publishing
   */
  readonly python?: JsiiPythonTarget;

  /**
   * Publish to NuGet
   * @default - no publishing
   */
  readonly dotnet?: JsiiDotNetTarget;

  /**
   * Install eslint.
   *
   * @default true
   */
  readonly eslint?: boolean;

  /**
   * Automatically generate API.md from jsii
   * @default true
   */
  readonly docgen?: boolean;

  /**
   * Automatically run API compatibility test against the latest version published to npm after compilation.
   *
   * - You can manually run compatibility tests using `yarn compat` if this feature is disabled.
   * - You can ignore compatibility failures by adding lines to a ".compatignore" file.
   *
   * @default false
   */
  readonly compat?: boolean;

  /**
   * Name of the ignore file for API compatibility tests.
   *
   * @default ".compatignore"
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

  /**
   * The registry url to use when releasing packages.
   *
   * @default - twine default
   */
  readonly twineRegistryUrl?: string;
}

export interface JsiiDotNetTarget {
  readonly dotNetNamespace: string;
  readonly packageId: string;
}

/**
 * Multi-language jsii library project
 */
export class JsiiProject extends TypeScriptProject {
  public readonly eslint?: Eslint;
  protected readonly twineRegistryUrl?: string;

  constructor(options: JsiiProjectOptions) {
    const { authorEmail, authorUrl } = parseAuthorAddress(options);

    super({
      ...options,
      workflowContainerImage: options.workflowContainerImage ?? DEFAULT_JSII_IMAGE,
      releaseToNpm: false, // we have a jsii release workflow
      repository: options.repositoryUrl,
      authorName: options.author,
      ...options,
      disableTsconfig: true, // jsii generates its own tsconfig.json
      authorEmail,
      authorUrl,
    });

    const srcdir = this.srcdir;
    const libdir = this.libdir;

    this.addFields({ types: `${libdir}/index.d.ts` });

    // this is an unhelpful warning
    const jsiiFlags = [
      '--silence-warnings=reserved-word',
      '--no-fix-peer-dependencies',
    ].join(' ');

    const compatIgnore = options.compatIgnore ?? '.compatignore';

    this.addFields({ stability: options.stability ?? Stability.STABLE });

    if (options.stability === Stability.DEPRECATED) {
      this.addFields({ deprecated: true });
    }

    const compatTask = this.addTask('compat', {
      description: 'Perform API compatibility check against latest version',
      category: TaskCategory.RELEASE,
      exec: `jsii-diff npm:$(node -p "require(\'./package.json\').name") -k --ignore-file ${compatIgnore} || (echo "\nUNEXPECTED BREAKING CHANGES: add keys such as \'removed:constructs.Node.of\' to ${compatIgnore} to skip.\n" && exit 1)`,
    });

    const compat = options.compat ?? false;
    if (compat) {
      this.compileTask.spawn(compatTask);
    } else {
      this.addTip('Set "compat" to "true" to enable automatic API breaking-change validation');
    }

    this.compileTask.reset(`jsii ${jsiiFlags}`);
    this.watchTask.reset(`jsii -w ${jsiiFlags}`);
    this.packageTask?.reset('jsii-pacmak');

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

    let publishing = false;

    if (options.java) {
      targets.java = {
        package: options.java.javaPackage,
        maven: {
          groupId: options.java.mavenGroupId,
          artifactId: options.java.mavenArtifactId,
        },
      };

      this.publishToMaven();
      publishing = true;
    }

    if (options.python) {
      this.twineRegistryUrl = options.python.twineRegistryUrl;
      targets.python = {
        distName: options.python.distName,
        module: options.python.module,
      };

      this.publishToPyPi();
      publishing = true;
    }

    if (options.dotnet) {
      targets.dotnet = {
        namespace: options.dotnet.dotNetNamespace,
        packageId: options.dotnet.packageId,
      };

      this.publishToNuget();
      publishing = true;
    }

    if (!publishing) {
      this.addTip('Use the "java", "python" and "dotnet" options to define publishing settings');
    }

    this.addDevDeps(
      'jsii',
      'jsii-diff',
      'jsii-pacmak',
      'jsii-release',
    );

    this.gitignore.exclude('.jsii', 'tsconfig.json');
    this.npmignore?.include('.jsii');

    if (options.docgen ?? true) {
      new JsiiDocgen(this);
    }

    // jsii updates .npmignore, so we make it writable
    if (this.npmignore) {
      this.npmignore.readonly = false;
    }
  }

  private publishToNpm() {
    if (!this.releaseWorkflow) {
      return;
    }

    this.releaseWorkflow.addJobs({
      release_npm: {
        'name': 'Release to NPM',
        'needs': this.releaseWorkflowJobId,
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
              NPM_REGISTRY: this.npmRegistry,
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
        'needs': this.releaseWorkflowJobId,
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
        'needs': this.releaseWorkflowJobId,
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
        'needs': this.releaseWorkflowJobId,
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
              ...(this.twineRegistryUrl && { TWINE_REPOSITORY_URL: this.twineRegistryUrl }),
            },
          },
        ],
      },
    });
  }
}
function parseAuthorAddress(options: JsiiProjectOptions) {
  let authorEmail = options.authorEmail;
  let authorUrl = options.authorUrl;
  if (options.authorAddress) {
    if (options.authorEmail) {
      throw new Error('authorEmail is deprecated and cannot be used in conjunction with authorAddress');
    }

    if (options.authorUrl) {
      throw new Error('authorUrl is deprecated and cannot be used in conjunction with authorAddress.');
    }

    if (EMAIL_REGEX.test(options.authorAddress)) {
      authorEmail = options.authorAddress;
    } else if (URL_REGEX.test(options.authorAddress)) {
      authorUrl = options.authorAddress;
    } else {
      throw new Error(`authorAddress must be either an email address or a URL: ${options.authorAddress}`);
    }
  }
  return { authorEmail, authorUrl };
}
