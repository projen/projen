import { Eslint } from './eslint';
import { JsiiDocgen } from './jsii-docgen';
import { GoPublishOptions, MavenPublishOptions, PyPiPublishOptions, NugetPublishOptions } from './release';
import { TypeScriptProject, TypeScriptProjectOptions } from './typescript';

const DEFAULT_JSII_IMAGE = 'jsii/superchain';

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

export interface JsiiProjectOptions extends TypeScriptProjectOptions {
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
  readonly publishToMaven?: JsiiJavaTarget;

  /**
   * Publish to pypi
   * @default - no publishing
   */
  readonly publishToPypi?: JsiiPythonTarget;

  /**
   * Publish Go bindings to a git repository.
   * @default - no publishing
   */
  readonly publishToGo?: JsiiGoTarget;

  /**
   * @deprecated use `publishToPyPi`
   */
  readonly python?: JsiiPythonTarget;

  /**
   * Publish to NuGet
   * @default - no publishing
   */
  readonly publishToNuget?: JsiiDotNetTarget;

  /**
   * @deprecated use `publishToNuget`
   */
  readonly dotnet?: JsiiDotNetTarget;

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

  /**
   * Accepts a list of glob patterns. Files matching any of those patterns will be excluded from the TypeScript compiler input.
   *
   * By default, jsii will include all *.ts files (except .d.ts files) in the TypeScript compiler input.
   * This can be problematic for example when the package's build or test procedure generates .ts files
   * that cannot be compiled with jsii's compiler settings.
   */
  readonly excludeTypescript?: string[];
}

export enum Stability {
  EXPERIMENTAL = 'experimental',
  STABLE = 'stable',
  DEPRECATED = 'deprecated'
}

export interface JsiiJavaTarget extends MavenPublishOptions {
  readonly javaPackage: string;
  readonly mavenGroupId: string;
  readonly mavenArtifactId: string;
}

export interface JsiiPythonTarget extends PyPiPublishOptions {
  readonly distName: string;
  readonly module: string;
}

export interface JsiiDotNetTarget extends NugetPublishOptions {
  readonly dotNetNamespace: string;
  readonly packageId: string;
}

/**
 * Go target configuration
 */
export interface JsiiGoTarget extends GoPublishOptions {
  /**
   * The name of the target go module.
   *
   * @example github.com/owner/repo
   * @example github.com/owner/repo/subdir
   */
  readonly moduleName: string;

}

/**
 * Multi-language jsii library project
 */
export class JsiiProject extends TypeScriptProject {
  public readonly eslint?: Eslint;

  constructor(options: JsiiProjectOptions) {
    const { authorEmail, authorUrl } = parseAuthorAddress(options);
    super({
      repository: options.repositoryUrl,
      authorName: options.author,
      authorEmail,
      authorUrl,

      ...options,

      workflowContainerImage: options.workflowContainerImage ?? DEFAULT_JSII_IMAGE,

      // this is needed temporarily because our release workflows use the 'gh'
      // cli and its not yet available in jsii/superchain
      releaseWorkflowSetupSteps: options.releaseWorkflowSetupSteps,
      releaseToNpm: false, // we have a jsii release workflow
      disableTsconfig: true, // jsii generates its own tsconfig.json
      docgen: false, // we use jsii-docgen here so disable typescript docgen
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
      exec: `jsii-diff npm:$(node -p "require(\'./package.json\').name") -k --ignore-file ${compatIgnore} || (echo "\nUNEXPECTED BREAKING CHANGES: add keys such as \'removed:constructs.Node.of\' to ${compatIgnore} to skip.\n" && exit 1)`,
    });

    const compat = options.compat ?? false;
    if (compat) {
      this.compileTask.spawn(compatTask);
    }

    this.compileTask.reset(`jsii ${jsiiFlags}`);
    this.watchTask.reset(`jsii -w ${jsiiFlags}`);
    this.packageTask?.reset('jsii-pacmak');

    const targets: Record<string, any> = { };

    const jsii: any = {
      outdir: 'dist',
      targets,
      tsc: {
        outDir: libdir,
        rootDir: srcdir,
      },
    };
    if (options.excludeTypescript) {
      jsii.excludeTypescript = options.excludeTypescript;
    }
    this.addFields({ jsii });

    if (options.releaseToNpm != false) {
      this.publisher?.publishToNpm({
        distTag: this.package.npmDistTag,
        registry: this.package.npmRegistry,
        npmTokenSecret: this.package.npmTokenSecret,
      });
    }

    // we cannot call an option `java` because the java code generated by jsii
    // does not compile due to a conflict between this option name and the `java`
    // package (e.g. when `java.util.Objects` is referenced).
    if ('java' in options) {
      throw new Error('the "java" option is now called "publishToMaven"');
    }

    if (options.publishToMaven) {
      targets.java = {
        package: options.publishToMaven.javaPackage,
        maven: {
          groupId: options.publishToMaven.mavenGroupId,
          artifactId: options.publishToMaven.mavenArtifactId,
        },
      };

      this.publisher?.publishToMaven(options.publishToMaven);
    }

    const pypi = options.publishToPypi ?? options.python;
    if (pypi) {
      targets.python = {
        distName: pypi.distName,
        module: pypi.module,
      };

      this.publisher?.publishToPyPi(pypi);
    }

    const nuget = options.publishToNuget ?? options.dotnet;
    if (nuget) {
      targets.dotnet = {
        namespace: nuget.dotNetNamespace,
        packageId: nuget.packageId,
      };

      this.publisher?.publishToNuget(nuget);
    }

    const golang = options.publishToGo;
    if (golang) {
      targets.go = {
        moduleName: golang.moduleName,
      };

      this.publisher?.publishToGo(golang);
    }

    this.addDevDeps(
      'jsii',
      'jsii-diff',
      'jsii-pacmak',
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

}


function parseAuthorAddress(options: JsiiProjectOptions) {
  let authorEmail = options.authorEmail;
  let authorUrl = options.authorUrl;
  if (options.authorAddress) {
    if (options.authorEmail && options.authorEmail !== options.authorAddress) {
      throw new Error('authorEmail is deprecated and cannot be used in conjunction with authorAddress');
    }

    if (options.authorUrl && options.authorUrl !== options.authorAddress) {
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
