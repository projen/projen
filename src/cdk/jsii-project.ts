import { Range } from "semver";
import { JsiiPacmakTarget, JSII_TOOLCHAIN } from "./consts";
import { JsiiDocgen } from "./jsii-docgen";
import { Task } from "..";
import { Job, Step } from "../github/workflows-model";
import { Eslint, NodePackageManager } from "../javascript";
import {
  CommonPublishOptions,
  GoPublishOptions,
  MavenPublishOptions,
  NugetPublishOptions,
  PyPiPublishOptions,
} from "../release";
import { filteredRunsOnOptions } from "../runner-options";
import { TypeScriptProject, TypeScriptProjectOptions } from "../typescript";
import { deepMerge } from "../util";

const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const URL_REGEX =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
const REPO_TEMP_DIRECTORY = ".repo";

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
   * @default "1.x"
   * @pjnew "~5.0.0"
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
   * The name of the target go module.
   *
   * @example github.com/owner/repo
   * @example github.com/owner/repo/subdir
   */
  readonly moduleName: string;

  /**
   * The name of the go package.
   *
   * @default - derived from the module name
   */
  readonly packageName?: string;
}

/**
 * Multi-language jsii library project
 *
 * @pjid jsii
 */
export class JsiiProject extends TypeScriptProject {
  public readonly eslint?: Eslint;

  private readonly packageAllTask: Task;

  constructor(options: JsiiProjectOptions) {
    const { authorEmail, authorUrl } = parseAuthorAddress(options);

    // True if jsii version 1.x is compatible with the requested version range.
    const usesLegacyJsii =
      options.jsiiVersion == null ||
      (options.jsiiVersion !== "*" &&
        new Range(options.jsiiVersion).intersects(new Range("1.x")));

    const defaultOptions: Partial<TypeScriptProjectOptions> = {
      repository: options.repositoryUrl,
      authorName: options.author,
      authorEmail,
      authorUrl,
      jestOptions: usesLegacyJsii ? { jestVersion: "^27" } : undefined,
    };

    const forcedOptions = {
      releaseToNpm: false, // we have a jsii release workflow
      disableTsconfig: true, // jsii generates its own tsconfig.json
      docgen: false, // we use jsii-docgen here so disable typescript docgen
    };

    const mergedOptions = deepMerge([
      defaultOptions,
      options,
      forcedOptions,
    ]) as TypeScriptProjectOptions;

    super(mergedOptions);

    const srcdir = this.srcdir;
    const libdir = this.libdir;

    this.addFields({ types: `${libdir}/index.d.ts` });

    const compressAssembly = options.compressAssembly ?? false;

    // this is an unhelpful warning
    const jsiiFlags = ["--silence-warnings=reserved-word"];
    if (compressAssembly) {
      jsiiFlags.push("--compress-assembly");
    }

    const compatIgnore = options.compatIgnore ?? ".compatignore";

    this.addFields({ stability: options.stability ?? Stability.STABLE });

    if (options.stability === Stability.DEPRECATED) {
      this.addFields({ deprecated: true });
    }

    const compatTask = this.addTask("compat", {
      description: "Perform API compatibility check against latest version",
      exec: `jsii-diff npm:$(node -p "require(\'./package.json\').name") -k --ignore-file ${compatIgnore} || (echo "\nUNEXPECTED BREAKING CHANGES: add keys such as \'removed:constructs.Node.of\' to ${compatIgnore} to skip.\n" && exit 1)`,
    });

    const compat = options.compat ?? false;
    if (compat) {
      this.compileTask.spawn(compatTask);
    }

    this.compileTask.reset(["jsii", ...jsiiFlags].join(" "));
    this.watchTask.reset(["jsii", "-w", ...jsiiFlags].join(" "));
    this.packageAllTask = this.addTask("package-all", {
      description: "Packages artifacts for all target languages",
    });

    // in jsii we consider the entire repo (post build) as the build artifact
    // which is then used to create the language bindings in separate jobs.
    const prepareRepoForCI = [
      `rsync -a . .repo --exclude .git --exclude node_modules`,
      `rm -rf ${this.artifactsDirectory}`,
      `mv .repo ${this.artifactsDirectory}`,
    ].join(" && ");

    // when running inside CI we just prepare the repo for packaging, which
    // takes place in separate tasks.
    // outside of CI (i.e locally) we simply package all targets.
    this.packageTask.reset(
      `if [ ! -z \${CI} ]; then ${prepareRepoForCI}; else ${this.runTaskCommand(
        this.packageAllTask
      )}; fi`
    );

    const targets: Record<string, any> = {};

    const jsii: any = {
      outdir: this.artifactsDirectory,
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

    this.release?.publisher.addGitHubPrePublishingSteps(
      {
        name: "Prepare Repository",
        run: `mv ${this.artifactsDirectory} ${REPO_TEMP_DIRECTORY}`,
      },
      {
        name: "Collect GitHub Metadata",
        run: `mv ${REPO_TEMP_DIRECTORY}/${this.artifactsDirectory} ${this.artifactsDirectory}`,
      }
    );

    const extraJobOptions: Partial<Job> = {
      ...this.getJobRunsOnConfig(options),
      ...(options.workflowContainerImage
        ? { container: { image: options.workflowContainerImage } }
        : {}),
    };

    if (options.releaseToNpm != false) {
      const task = this.addPackagingTask("js");
      this.release?.publisher.publishToNpm({
        ...this.pacmakForLanguage("js", task),
        registry: this.package.npmRegistry,
        npmTokenSecret: this.package.npmTokenSecret,
        codeArtifactOptions: options.codeArtifactOptions,
      });
      this.addPackagingTarget("js", task, extraJobOptions);
    }

    // we cannot call an option `java` because the java code generated by jsii
    // does not compile due to a conflict between this option name and the `java`
    // package (e.g. when `java.util.Objects` is referenced).
    if ("java" in options) {
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

      const task = this.addPackagingTask("java");

      this.release?.publisher.publishToMaven({
        ...this.pacmakForLanguage("java", task),
        ...options.publishToMaven,
      });

      this.addPackagingTarget("java", task, extraJobOptions);
    }

    const pypi = options.publishToPypi ?? options.python;
    if (pypi) {
      targets.python = {
        distName: pypi.distName,
        module: pypi.module,
      };

      const task = this.addPackagingTask("python");
      this.release?.publisher.publishToPyPi({
        ...this.pacmakForLanguage("python", task),
        ...pypi,
      });

      this.addPackagingTarget("python", task, extraJobOptions);
    }

    const nuget = options.publishToNuget ?? options.dotnet;
    if (nuget) {
      targets.dotnet = {
        namespace: nuget.dotNetNamespace,
        packageId: nuget.packageId,
        iconUrl: nuget.iconUrl,
      };

      const task = this.addPackagingTask("dotnet");
      this.release?.publisher.publishToNuget({
        ...this.pacmakForLanguage("dotnet", task),
        ...nuget,
      });

      this.addPackagingTarget("dotnet", task, extraJobOptions);
    }

    const golang = options.publishToGo;
    if (golang) {
      targets.go = {
        moduleName: golang.moduleName,
        packageName: golang.packageName,
      };

      const task = this.addPackagingTask("go");
      this.release?.publisher.publishToGo({
        ...this.pacmakForLanguage("go", task),
        ...golang,
      });

      this.addPackagingTarget("go", task, extraJobOptions);
    }

    const jsiiSuffix =
      options.jsiiVersion === "*"
        ? // If jsiiVersion is "*", don't specify anything so the user can manage.
          ""
        : // Otherwise, use `jsiiVersion` or fall back to `1.x`.
          `@${options.jsiiVersion ?? "1.x"}`;
    this.addDevDeps(
      `jsii${jsiiSuffix}`,
      `jsii-rosetta${jsiiSuffix}`,
      "jsii-diff",
      "jsii-pacmak"
    );

    this.gitignore.exclude(".jsii", "tsconfig.json");
    this.npmignore?.include(".jsii");

    if (options.docgen ?? true) {
      new JsiiDocgen(this, { filePath: options.docgenFilePath });
    }

    // jsii updates .npmignore, so we make it writable
    if (this.npmignore) {
      this.npmignore.readonly = false;
    }

    // When using jsii@1,x, we need to add some resolutions to avoid including
    // TypeScript-3.9-incompatble dependencies that break the compiler.
    if (usesLegacyJsii) {
      // https://github.com/projen/projen/issues/2165
      this.package.addPackageResolutions("@types/prettier@2.6.0");

      // https://github.com/projen/projen/issues/2264
      this.package.addPackageResolutions("@types/babel__traverse@7.18.2");
    }
  }

  /**
   * Adds a target language to the build workflow and creates a package task.
   * @param language
   * @returns
   */
  private addPackagingTarget(
    language: JsiiPacmakTarget,
    packTask: Task,
    extraJobOptions: Partial<Job>
  ) {
    if (!this.buildWorkflow) {
      return;
    }
    const pacmak = this.pacmakForLanguage(language, packTask);

    this.buildWorkflow.addPostBuildJob(`package-${language}`, {
      ...filteredRunsOnOptions(
        extraJobOptions.runsOn,
        extraJobOptions.runsOnGroup
      ),
      permissions: {},
      tools: {
        node: { version: this.nodeVersion ?? "16.x" },
        ...pacmak.publishTools,
      },
      steps: pacmak.prePublishSteps ?? [],
      ...extraJobOptions,
    });
  }

  private addPackagingTask(language: JsiiPacmakTarget): Task {
    const packageTask = this.tasks.addTask(`package:${language}`, {
      description: `Create ${language} language bindings`,
    });
    packageTask.exec(`jsii-pacmak -v --target ${language}`);
    this.packageAllTask.spawn(packageTask);
    return packageTask;
  }

  private pacmakForLanguage(
    target: JsiiPacmakTarget,
    packTask: Task
  ): CommonPublishOptions {
    // at this stage, `artifactsDirectory` contains the prebuilt repository.
    // for the publishing to work seamlessely, that directory needs to contain the actual artifact.
    // so we move the repo, create the artifact, and put it in the expected place.
    const prePublishSteps: Array<Step> = [];

    prePublishSteps.push(...this.workflowBootstrapSteps);

    if (this.package.packageManager === NodePackageManager.PNPM) {
      prePublishSteps.push({
        name: "Setup pnpm",
        uses: "pnpm/action-setup@v2.2.4",
        with: { version: this.package.pnpmVersion },
      });
    }

    prePublishSteps.push(
      {
        name: "Prepare Repository",
        run: `mv ${this.artifactsDirectory} ${REPO_TEMP_DIRECTORY}`,
      },
      {
        name: "Install Dependencies",
        run: `cd ${REPO_TEMP_DIRECTORY} && ${this.package.installCommand}`,
      },
      {
        name: `Create ${target} artifact`,
        run: `cd ${REPO_TEMP_DIRECTORY} && npx projen ${packTask.name}`,
      },
      {
        name: `Collect ${target} Artifact`,
        run: `mv ${REPO_TEMP_DIRECTORY}/${this.artifactsDirectory} ${this.artifactsDirectory}`,
      }
    );
    return {
      publishTools: JSII_TOOLCHAIN[target],
      prePublishSteps,
    };
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
        "authorEmail is deprecated and cannot be used in conjunction with authorAddress"
      );
    }

    if (options.authorUrl && options.authorUrl !== options.authorAddress) {
      throw new Error(
        "authorUrl is deprecated and cannot be used in conjunction with authorAddress."
      );
    }

    if (EMAIL_REGEX.test(options.authorAddress)) {
      authorEmail = options.authorAddress;
    } else if (URL_REGEX.test(options.authorAddress)) {
      authorUrl = options.authorAddress;
    } else {
      throw new Error(
        `authorAddress must be either an email address or a URL: ${options.authorAddress}`
      );
    }
  }
  return { authorEmail, authorUrl };
}
