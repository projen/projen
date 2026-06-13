import { JsiiBuild } from "./jsii-build";
import type {
  GoPublishOptions,
  MavenPublishOptions,
  NugetPublishOptions,
  PyPiPublishOptions,
} from "../release";
import type { TypeScriptProjectOptions } from "../typescript";
import { TypeScriptProject } from "../typescript";
import { deepMerge } from "../util";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+$/;
const URL_REGEX =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

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

  /**
   * File path for generated docs.
   * @default "API.md"
   */
  readonly docgenFilePath?: string;

  /**
   * Emit a compressed version of the assembly
   * @default false
   */
  readonly compressAssembly?: boolean;

  /**
   * Version of the jsii compiler to use.
   *
   * Set to "*" if you want to manually manage the version of jsii in your
   * project by managing updates to `package.json` on your own.
   *
   * NOTE: The jsii compiler releases since 5.0.0 are not semantically versioned
   * and should remain on the same minor, so we recommend using a `~` dependency
   * (e.g. `~5.0.0`).
   *
   * @default "~5.9.0"
   * @pjnew "~6.0.0"
   */
  readonly jsiiVersion?: string;
}

export enum Stability {
  EXPERIMENTAL = "experimental",
  STABLE = "stable",
  DEPRECATED = "deprecated",
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
  readonly iconUrl?: string;
}

/**
 * Go target configuration
 */
export interface JsiiGoTarget extends GoPublishOptions {
  /**
   * The name of the target repository in which this module will be published (e.g. github.com/owner/repo).
   *
   * The module itself will always be published under a subdirectory named according
   * to the `packageName` of the module (e.g. github.com/foo/bar/pkg).
   *
   * @example github.com/owner/repo
   */
  readonly moduleName: string;

  /**
   * The name of the Go package name.
   *
   * If not specified, package name will be derived from the JavaScript module name
   * by removing non-alphanumeric characters (e.g. @projen/foo-bar will be projenfoobar).
   *
   * @default - derived from the JavaScript module name
   */
  readonly packageName?: string;

  /**
   * A suffix appended at the end of the module version (e.g `"-devprefix"`).
   *
   * @default - none
   */
  readonly versionSuffix?: string;
}

/**
 * Multi-language jsii library project
 *
 * @pjid jsii
 */
export class JsiiProject extends TypeScriptProject {
  constructor(options: JsiiProjectOptions) {
    const { authorEmail, authorUrl } = parseAuthorAddress(options);

    const defaultOptions: Partial<TypeScriptProjectOptions> = {
      repository: options.repositoryUrl,
      authorName: options.author,
      authorEmail,
      authorUrl,
      tsconfig: {
        // jsii uses JSON.parse() and cannot handle comments
        allowComments: false,
        compilerOptions: {
          // jsii strict validation requirements
          target: "ES2022",
          lib: ["es2022"],
          esModuleInterop: true,
          skipLibCheck: true,
          noEmitOnError: true,
          stripInternal: false,
        },
      },
    };

    const forcedOptions = {
      releaseToNpm: false, // we have a jsii release workflow
      docgen: false, // we use jsii-docgen here so disable typescript docgen
    };

    const mergedOptions = deepMerge([
      defaultOptions,
      options,
      forcedOptions,
    ]) as TypeScriptProjectOptions;

    super(mergedOptions);

    // Apply the jsii mixin using the constructs .with() pattern
    this.with(
      new JsiiBuild(
        {
          publishToMaven: options.publishToMaven,
          publishToPypi: options.publishToPypi ?? options.python,
          publishToGo: options.publishToGo,
          publishToNuget: options.publishToNuget ?? options.dotnet,
          compat: options.compat,
          compatIgnore: options.compatIgnore,
          excludeTypescript: options.excludeTypescript,
          docgenFilePath: options.docgenFilePath,
          compressAssembly: options.compressAssembly,
          jsiiVersion: options.jsiiVersion,
          stability: options.stability,
          docgen: options.docgen,
          releaseToNpm: options.releaseToNpm,
          npmTrustedPublishing: options.npmTrustedPublishing,
          codeArtifactOptions: options.codeArtifactOptions,
          workflowNodeVersion: this.nodeVersion,
          workflowBootstrapSteps: this.workflowBootstrapSteps,
        },
        {
          ...this.getJobRunsOnConfig(options),
          ...(options.workflowContainerImage
            ? { container: { image: options.workflowContainerImage } }
            : {}),
        },
      ),
    );
  }

  /**
   * Generates the runs-on config for Jobs.
   * Throws error if 'runsOn' and 'runsOnGroup' are both set.
   *
   * @param options - 'runsOn' or 'runsOnGroup'.
   */
  private getJobRunsOnConfig(options: JsiiProjectOptions) {
    return options.workflowRunsOnGroup
      ? { runsOnGroup: options.workflowRunsOnGroup }
      : options.workflowRunsOn
        ? { runsOn: options.workflowRunsOn }
        : {};
  }
}

function parseAuthorAddress(options: JsiiProjectOptions) {
  let authorEmail = options.authorEmail;
  let authorUrl = options.authorUrl;
  if (options.authorAddress) {
    if (options.authorEmail && options.authorEmail !== options.authorAddress) {
      throw new Error(
        "authorEmail is deprecated and cannot be used in conjunction with authorAddress",
      );
    }

    if (options.authorUrl && options.authorUrl !== options.authorAddress) {
      throw new Error(
        "authorUrl is deprecated and cannot be used in conjunction with authorAddress.",
      );
    }

    if (EMAIL_REGEX.test(options.authorAddress)) {
      authorEmail = options.authorAddress;
    } else if (URL_REGEX.test(options.authorAddress)) {
      authorUrl = options.authorAddress;
    } else {
      throw new Error(
        `authorAddress must be either an email address or a URL: ${options.authorAddress}`,
      );
    }
  }
  return { authorEmail, authorUrl };
}
