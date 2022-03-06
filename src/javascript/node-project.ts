import { join } from "path";
import { Construct, IConstruct } from "constructs";
import { BuildWorkflow } from "../build";
import { PROJEN_DIR, PROJEN_RC } from "../common";
import {
  AutoMerge,
  DependabotOptions,
  GitHubProject,
  GitHubProjectOptions,
  GitIdentity,
} from "../github";
import { DEFAULT_GITHUB_ACTIONS_USER } from "../github/constants";
import { JobStep, Triggers } from "../github/workflows-model";
import { IgnoreFile } from "../ignore-file";
import {
  Prettier,
  PrettierOptions,
  UpgradeDependencies,
  UpgradeDependenciesOptions,
} from "../javascript";
import { License } from "../license";
import { Publisher, Release, ReleaseProjectOptions } from "../release";
import { Task } from "../task";
import { deepMerge } from "../util";
import { Version } from "../version";
import { Bundler, BundlerOptions } from "./bundler";
import { Jest, JestOptions } from "./jest";
import {
  NodePackage,
  NodePackageManager,
  NodePackageOptions,
} from "./node-package";
import { Projenrc, ProjenrcOptions } from "./projenrc";
import { UpgradeDependenciesSchedule } from "./upgrade-dependencies";

const PROJEN_SCRIPT = "projen";

export interface NodeProjectOptions
  extends GitHubProjectOptions,
    NodePackageOptions,
    ReleaseProjectOptions {
  /**
   * License copyright owner.
   *
   * @default - defaults to the value of authorName or "" if `authorName` is undefined.
   */
  readonly copyrightOwner?: string;

  /**
   * The copyright years to put in the LICENSE file.
   *
   * @default - current year
   */
  readonly copyrightPeriod?: string;

  /**
   * Version of projen to install.
   *
   * @default - Defaults to the latest version.
   */
  readonly projenVersion?: string;

  /**
   * Indicates of "projen" should be installed as a devDependency.
   *
   * @default true
   */
  readonly projenDevDependency?: boolean;

  /**
   * Define a GitHub workflow for building PRs.
   * @default - true if not a subproject
   */
  readonly buildWorkflow?: boolean;

  /**
   * Automatically update files modified during builds to pull-request branches. This means
   * that any files synthesized by projen or e.g. test snapshots will always be up-to-date
   * before a PR is merged.
   *
   * Implies that PR builds do not have anti-tamper checks.
   *
   * @default true
   */
  readonly mutableBuild?: boolean;

  /**
   * Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/
   * Uses codecov/codecov-action@v1
   * A secret is required for private repos. Configured with @codeCovTokenSecret
   * @default false
   */
  readonly codeCov?: boolean;

  /**
   * Define the secret name for a specified https://codecov.io/ token
   * A secret is required to send coverage for private repositories
   * @default - if this option is not specified, only public repositories are supported
   */
  readonly codeCovTokenSecret?: string;

  /**
   * DEPRECATED: renamed to `release`.
   *
   * @default - true if not a subproject
   * @deprecated see `release`.
   */
  readonly releaseWorkflow?: boolean;

  /**
   * Add release management to this project.
   *
   * @default - true (false for subprojects)
   */
  readonly release?: boolean;

  /**
   * The name of the main release branch.
   *
   * @default "main"
   */
  readonly defaultReleaseBranch: string;

  /**
   * Workflow steps to use in order to bootstrap this repo.
   *
   * @default "yarn install --frozen-lockfile && yarn projen"
   */
  readonly workflowBootstrapSteps?: any[];

  /**
   * The git identity to use in workflows.
   *
   * @default - GitHub Actions
   */
  readonly workflowGitIdentity?: GitIdentity;

  /**
   * Automatically release to npm when new versions are introduced.
   * @default false
   */
  readonly releaseToNpm?: boolean;

  /**
   * The node version to use in GitHub workflows.
   *
   * @default - same as `minNodeVersion`
   */
  readonly workflowNodeVersion?: string;

  /**
   * Use dependabot to handle dependency upgrades.
   * Cannot be used in conjunction with `depsUpgrade`.
   *
   * @default false
   */
  readonly dependabot?: boolean;

  /**
   * Options for dependabot.
   *
   * @default - default options
   */
  readonly dependabotOptions?: DependabotOptions;

  /**
   * Use github workflows to handle dependency upgrades.
   * Cannot be used in conjunction with `dependabot`.
   *
   * @default true
   */
  readonly depsUpgrade?: boolean;

  /**
   * Options for depsUpgrade.
   *
   * @default - default options
   */
  readonly depsUpgradeOptions?: UpgradeDependenciesOptions;

  /**
   * Periodically submits a pull request for projen upgrades (executes `yarn
   * projen:upgrade`).
   *
   * This setting is a GitHub secret name which contains a GitHub Access Token
   * with `repo` and `workflow` permissions.
   *
   * This token is used to submit the upgrade pull request, which will likely
   * include workflow updates.
   *
   * To create a personal access token see https://github.com/settings/tokens
   *
   * @default - no automatic projen upgrade pull requests
   *
   * @deprecated use `githubTokenSecret` instead.
   */
  readonly projenUpgradeSecret?: string;

  /**
   * Automatically approve projen upgrade PRs, allowing them to be
   * merged by mergify (if configued).
   *
   * Throw if set to true but `autoApproveOptions` are not defined.
   *
   * @default false
   * @deprecated use `autoApproveProjenUpgrades`.
   */
  readonly projenUpgradeAutoMerge?: boolean;

  /**
   * Automatically approve projen upgrade PRs, allowing them to be
   * merged by mergify (if configued).
   *
   * Throw if set to true but `autoApproveOptions` are not defined.
   *
   * @default false
   */
  readonly autoApproveProjenUpgrades?: boolean;

  /**
   * Automatically approve deps upgrade PRs, allowing them to be
   * merged by mergify (if configued).
   *
   * Throw if set to true but `autoApproveOptions` are not defined.
   *
   * @default - true
   */
  readonly autoApproveUpgrades?: boolean;

  /**
   * Customize the projenUpgrade schedule in cron expression.
   *
   @default [ "0 6 * * *" ]
   */
  readonly projenUpgradeSchedule?: string[];

  /**
   * Defines an .npmignore file. Normally this is only needed for libraries that
   * are packaged as tarballs.
   *
   * @default true
   */
  readonly npmignoreEnabled?: boolean;

  /**
   * Additional entries to .npmignore.
   * @deprecated - use `project.addPackageIgnore`
   */
  readonly npmignore?: string[];

  /**
   * Include a GitHub pull request template.
   *
   * @default true
   */
  readonly pullRequestTemplate?: boolean;

  /**
   * The contents of the pull request template.
   *
   * @default - default content
   */
  readonly pullRequestTemplateContents?: string[];

  /**
   * Setup prettier.
   *
   * @default false
   */
  readonly prettier?: boolean;

  /**
   * Prettier options
   * @default - default options
   */
  readonly prettierOptions?: PrettierOptions;

  /**
   * Additional entries to .gitignore
   */
  readonly gitignore?: string[];

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
   * Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable
   * .projenrc.js generation.
   *
   * @default - true if projenrcJson is false
   */
  readonly projenrcJs?: boolean;

  /**
   * Options for .projenrc.js
   * @default - default options
   */
  readonly projenrcJsOptions?: ProjenrcOptions;

  /**
   * Options for `Bundler`.
   */
  readonly bundlerOptions?: BundlerOptions;

  /**
   * A directory which will contain build artifacts.
   *
   * @default "dist"
   */
  readonly artifactsDirectory?: string;

  /**
   * Defines a `package` task that will produce an npm tarball under the
   * artifacts directory (e.g. `dist`).
   *
   * @default true
   */
  readonly package?: boolean;

  /**
   * Build workflow triggers
   * @default "{ pullRequest: {}, workflowDispatch: {} }"
   */
  readonly buildWorkflowTriggers?: Triggers;
}

/**
 * Automatic bump modes
 */
export enum AutoRelease {
  /**
   * Automatically bump & release a new version for every commit to "main"
   */
  EVERY_COMMIT,

  /**
   * Automatically bump & release a new version on a daily basis.
   */
  DAILY,
}

/**
 * Node.js project
 *
 * @pjid node
 */
export class NodeProject extends GitHubProject {
  /**
   * Returns the immediate NodeProject a construct belongs to.
   * @param construct the construct
   */
  public static ofNode(construct: IConstruct): NodeProject {
    if (construct instanceof NodeProject) {
      return construct;
    }

    const parent = construct.node.scope as Construct;
    if (!parent) {
      throw new Error(
        "cannot find a parent NodeProject (directly or indirectly)"
      );
    }

    return NodeProject.ofNode(parent);
  }

  /**
   * API for managing the node package.
   */
  public readonly package: NodePackage;

  /**
   * The .npmignore file.
   */
  public readonly npmignore?: IgnoreFile;

  /**
   * @deprecated use `package.allowLibraryDependencies`
   */
  public get allowLibraryDependencies(): boolean {
    return this.package.allowLibraryDependencies;
  }

  /**
   * @deprecated use `package.entrypoint`
   */
  public get entrypoint(): string {
    return this.package.entrypoint;
  }

  /**
   * Automatic PR merges.
   */
  public readonly autoMerge?: AutoMerge;

  /**
   * The PR build GitHub workflow. `undefined` if `buildWorkflow` is disabled.
   */
  public readonly buildWorkflow?: BuildWorkflow;

  /**
   * Package publisher. This will be `undefined` if the project does not have a
   * release workflow.
   *
   * @deprecated use `release.publisher`.
   */
  public readonly publisher?: Publisher;

  /**
   * Release management.
   */
  public readonly release?: Release;

  /**
   * Minimum node.js version required by this package.
   */
  public get minNodeVersion(): string | undefined {
    return this.package.minNodeVersion;
  }

  /**
   * Maximum node version required by this pacakge.
   */
  public get maxNodeVersion(): string | undefined {
    return this.package.maxNodeVersion;
  }

  private readonly nodeVersion?: string;

  /**
   * The package manager to use.
   *
   * @deprecated use `package.packageManager`
   */
  public get packageManager(): NodePackageManager {
    return this.package.packageManager;
  }

  /**
   * The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).
   */
  public readonly runScriptCommand: string;

  /**
   * The Jest configuration (if enabled)
   */
  public readonly jest?: Jest;

  /**
   * @deprecated use `package.addField(x, y)`
   */
  public get manifest() {
    return this.package.manifest;
  }

  public readonly bundler: Bundler;

  /**
   * The build output directory. An npm tarball will be created under the `js`
   * subdirectory. For example, if this is set to `dist` (the default), the npm
   * tarball will be placed under `dist/js/boom-boom-1.2.3.tg`.
   */
  public readonly artifactsDirectory: string;

  /**
   * The location of the npm tarball after build (`${artifactsDirectory}/js`).
   */
  public readonly artifactsJavascriptDirectory: string;

  /**
   * The upgrade workflow.
   */
  public readonly upgradeWorkflow?: UpgradeDependencies;

  private readonly workflowBootstrapSteps: JobStep[];
  private readonly workflowGitIdentity: GitIdentity;
  public readonly prettier?: Prettier;

  constructor(options: NodeProjectOptions) {
    super(options);

    this.package = new NodePackage(this, options);
    this.workflowBootstrapSteps = options.workflowBootstrapSteps ?? [];
    this.workflowGitIdentity =
      options.workflowGitIdentity ?? DEFAULT_GITHUB_ACTIONS_USER;
    this.artifactsDirectory = options.artifactsDirectory ?? "dist";
    this.artifactsJavascriptDirectory = join(this.artifactsDirectory, "js");

    this.runScriptCommand = (() => {
      switch (this.packageManager) {
        case NodePackageManager.NPM:
          return "npm run";
        case NodePackageManager.YARN:
          return "yarn run";
        case NodePackageManager.PNPM:
          return "pnpm run";
        default:
          throw new Error(`unexpected package manager ${this.packageManager}`);
      }
    })();

    this.nodeVersion =
      options.workflowNodeVersion ?? this.package.minNodeVersion;

    // add PATH for all tasks which includes the project's npm .bin list
    this.tasks.addEnvironment(
      "PATH",
      '$(npx -c "node -e \\"console.log(process.env.PATH)\\"")'
    );

    this.addLicense(options);

    if (options.npmignoreEnabled ?? true) {
      this.npmignore = new IgnoreFile(this, ".npmignore");
    }

    this.addDefaultGitIgnore();

    if (options.gitignore?.length) {
      for (const i of options.gitignore) {
        this.gitignore.exclude(i);
      }
    }

    if (options.npmignore?.length) {
      if (!this.npmignore) {
        throw new Error(
          '.npmignore is not defined for an APP project type. Add "npmIgnore: true" to override this'
        );
      }

      for (const i of options.npmignore) {
        this.npmignore.exclude(i);
      }
    }

    if (!this.ejected) {
      this.setScript(PROJEN_SCRIPT, this.package.projenCommand);
    }

    this.npmignore?.exclude(`/${PROJEN_RC}`);
    this.npmignore?.exclude(`/${PROJEN_DIR}/`);
    this.gitignore.include(`/${PROJEN_RC}`);

    const projen = options.projenDevDependency ?? true;
    if (projen && !this.ejected) {
      const postfix = options.projenVersion ? `@${options.projenVersion}` : "";
      this.addDevDeps(`projen${postfix}`);
    }

    if (!options.defaultReleaseBranch) {
      throw new Error(
        '"defaultReleaseBranch" is temporarily a required option while we migrate its default value from "master" to "main"'
      );
    }

    const buildEnabled = options.buildWorkflow ?? (this.parent ? false : true);

    // configure jest if enabled
    // must be before the build/release workflows
    if (options.jest ?? true) {
      this.jest = new Jest(this, options.jestOptions);
    }

    if (buildEnabled && this.github) {
      this.buildWorkflow = new BuildWorkflow(this, {
        buildTask: this.buildTask,
        artifactsDirectory: this.artifactsDirectory,
        containerImage: options.workflowContainerImage,
        gitIdentity: this.workflowGitIdentity,
        mutableBuild: options.mutableBuild,
        preBuildSteps: this.renderWorkflowSetup({
          mutable: options.mutableBuild ?? true,
        }),
        postBuildSteps: options.postBuildSteps,
        runsOn: options.workflowRunsOn,
        workflowTriggers: options.buildWorkflowTriggers,
      });

      // run codecov if enabled or a secret token name is passed in
      // AND jest must be configured
      if (
        (options.codeCov || options.codeCovTokenSecret) &&
        this.jest?.config
      ) {
        this.buildWorkflow.addPostBuildSteps({
          name: "Upload coverage to Codecov",
          uses: "codecov/codecov-action@v1",
          with: options.codeCovTokenSecret
            ? {
                token: `\${{ secrets.${options.codeCovTokenSecret} }}`,
                directory: this.jest.config.coverageDirectory,
              }
            : {
                directory: this.jest.config.coverageDirectory,
              },
        });
      }
    }

    const release =
      options.release ??
      options.releaseWorkflow ??
      (this.parent ? false : true);
    if (release) {
      this.addDevDeps(Version.STANDARD_VERSION);

      this.release = new Release(this, {
        versionFile: "package.json", // this is where "version" is set after bump
        task: this.buildTask,
        branch: options.defaultReleaseBranch ?? "main",
        artifactsDirectory: this.artifactsDirectory,
        ...options,

        releaseWorkflowSetupSteps: [
          ...this.renderWorkflowSetup({ mutable: false }),
          ...(options.releaseWorkflowSetupSteps ?? []),
        ],
      });

      this.publisher = this.release.publisher;

      if (options.releaseToNpm ?? false) {
        this.release.publisher.publishToNpm({
          registry: this.package.npmRegistry,
          npmTokenSecret: this.package.npmTokenSecret,
          codeArtifactOptions: {
            accessKeyIdSecret: options.codeArtifactOptions?.accessKeyIdSecret,
            secretAccessKeySecret:
              options.codeArtifactOptions?.secretAccessKeySecret,
            roleToAssume: options.codeArtifactOptions?.roleToAssume,
          },
        });
      }
    } else {
      // validate that no release options are selected if the release workflow is disabled.
      if (options.releaseToNpm) {
        throw new Error('"releaseToNpm" is not supported for APP projects');
      }

      if (options.releaseEveryCommit) {
        throw new Error(
          '"releaseEveryCommit" is not supported for APP projects'
        );
      }

      if (options.releaseSchedule) {
        throw new Error('"releaseSchedule" is not supported for APP projects');
      }
    }

    if (this.github?.mergify && this.buildWorkflow?.buildJobIds) {
      this.autoMerge = new AutoMerge(this.github, options.autoMergeOptions);
      this.autoMerge.addConditionsLater({
        render: () =>
          this.buildWorkflow?.buildJobIds.map((id) => `status-success=${id}`) ??
          [],
      });
    }

    const dependabot = options.dependabot ?? false;
    const depsUpgrade = options.depsUpgrade ?? !dependabot;

    if (dependabot && depsUpgrade) {
      throw new Error(
        "'dependabot' cannot be configured together with 'depsUpgrade'"
      );
    }

    if (
      options.projenUpgradeAutoMerge !== undefined &&
      options.autoApproveProjenUpgrades !== undefined
    ) {
      throw new Error(
        "'projenUpgradeAutoMerge' cannot be configured together with 'autoApproveProjenUpgrades'"
      );
    }

    const projenAutoApprove =
      options.autoApproveProjenUpgrades ??
      options.projenUpgradeAutoMerge ??
      false;
    const depsAutoApprove = options.autoApproveUpgrades ?? false;

    if (projenAutoApprove && !this.autoApprove && this.github) {
      throw new Error(
        "Automatic approval of projen upgrades requires configuring `autoApproveOptions`"
      );
    }

    if (depsAutoApprove && !this.autoApprove && this.github) {
      throw new Error(
        "Automatic approval of dependencies upgrades requires configuring `autoApproveOptions`"
      );
    }

    const autoApproveLabel = (condition: boolean) =>
      condition && this.autoApprove?.label
        ? [this.autoApprove.label]
        : undefined;

    let ignoresProjen;
    if (dependabot) {
      const defaultOptions = {
        labels: autoApproveLabel(depsAutoApprove),
      };
      const dependabotConf = this.github?.addDependabot(
        deepMerge([defaultOptions, options.dependabotOptions ?? {}])
      );
      ignoresProjen = dependabotConf?.ignoresProjen;
    }

    if (depsUpgrade) {
      const defaultOptions: UpgradeDependenciesOptions = {
        // if projen secret is defined we can also upgrade projen here.
        ignoreProjen: !options.projenUpgradeSecret,
        workflowOptions: {
          // if projen secret is defined, use it (otherwise default to GITHUB_TOKEN).
          secret: options.projenUpgradeSecret,
          container: options.workflowContainerImage
            ? {
                image: options.workflowContainerImage,
              }
            : undefined,
          labels: autoApproveLabel(depsAutoApprove),
          gitIdentity: this.workflowGitIdentity,
        },
      };
      const upgradeDependencies = new UpgradeDependencies(
        this,
        "UpgradeDependencies",
        deepMerge([defaultOptions, options.depsUpgradeOptions ?? {}])
      );
      ignoresProjen = upgradeDependencies.ignoresProjen;
      this.upgradeWorkflow = upgradeDependencies;
    }

    // create a dedicated workflow to upgrade projen itself if needed
    if (ignoresProjen && this.package.packageName !== "projen") {
      new UpgradeDependencies(this, "UpgradeDependencies-projen", {
        include: ["projen"],
        taskName: "upgrade-projen",
        pullRequestTitle: "upgrade projen",
        ignoreProjen: false,
        workflow: !!options.projenUpgradeSecret,
        workflowOptions: {
          schedule: UpgradeDependenciesSchedule.expressions(
            options.projenUpgradeSchedule ?? ["0 6 * * *"]
          ),
          container: options.workflowContainerImage
            ? { image: options.workflowContainerImage }
            : undefined,
          secret: options.projenUpgradeSecret,
          labels: autoApproveLabel(projenAutoApprove),
          gitIdentity: this.workflowGitIdentity,
        },
      });
    }

    if (options.pullRequestTemplate ?? true) {
      this.github?.addPullRequestTemplate(
        ...(options.pullRequestTemplateContents ?? [])
      );
    }

    const projenrcJs = options.projenrcJs ?? !options.projenrcJson;
    if (projenrcJs) {
      new Projenrc(this, options.projenrcJsOptions);
    }

    // add a bundler component - this enables things like Lambda bundling and in the future web bundling.
    this.bundler = new Bundler(this, options.bundlerOptions);

    if (options.package ?? true) {
      this.packageTask.exec(`mkdir -p ${this.artifactsJavascriptDirectory}`);

      // always use npm here - yarn doesn't add much value
      // sadly we cannot use --pack-destination because it is not supported by older npm
      this.packageTask.exec(
        `mv $(npm pack) ${this.artifactsJavascriptDirectory}/`
      );
    }

    if (options.prettier ?? false) {
      this.prettier = new Prettier(this, { ...options.prettierOptions });
    }
  }

  public addBins(bins: Record<string, string>) {
    this.package.addBin(bins);
  }

  /**
   * Replaces the contents of an npm package.json script.
   *
   * @param name The script name
   * @param command The command to execute
   */
  public setScript(name: string, command: string) {
    this.package.setScript(name, command);
  }

  /**
   * Removes the npm script (always successful).
   * @param name The name of the script.
   */
  public removeScript(name: string) {
    this.package.removeScript(name);
  }

  /**
   * Indicates if a script by the name name is defined.
   * @param name The name of the script
   */
  public hasScript(name: string) {
    return this.package.hasScript(name);
  }

  /**
   * DEPRECATED
   * @deprecated use `project.compileTask.exec()`
   */
  public addCompileCommand(...commands: string[]) {
    for (const c of commands) {
      this.compileTask.exec(c);
    }
  }

  /**
   * DEPRECATED
   * @deprecated use `project.testTask.exec()`
   */
  public addTestCommand(...commands: string[]) {
    for (const c of commands) {
      this.testTask.exec(c);
    }
  }

  /**
   * Directly set fields in `package.json`.
   * @param fields The fields to set
   */
  public addFields(fields: { [name: string]: any }) {
    for (const [name, value] of Object.entries(fields)) {
      this.package.addField(name, value);
    }
  }

  /**
   * Adds keywords to package.json (deduplicated)
   * @param keywords The keywords to add
   */
  public addKeywords(...keywords: string[]) {
    this.package.addKeywords(...keywords);
  }

  /**
   * Returns the set of workflow steps which should be executed to bootstrap a
   * workflow.
   *
   * @param options Options.
   * @returns Job steps
   */
  public renderWorkflowSetup(
    options: RenderWorkflowSetupOptions = {}
  ): JobStep[] {
    const install = new Array<JobStep>();

    // first run the workflow bootstrap steps
    install.push(...this.workflowBootstrapSteps);

    if (this.nodeVersion) {
      install.push({
        name: "Setup Node.js",
        uses: "actions/setup-node@v2.2.0",
        with: { "node-version": this.nodeVersion },
      });
    }

    if (this.package.packageManager === NodePackageManager.PNPM) {
      install.push({
        name: "Setup pnpm",
        uses: "pnpm/action-setup@v2.0.1",
        with: { version: "6.14.7" }, // current latest. Should probably become tunable.
      });
    }

    const mutable = options.mutable ?? false;

    install.push({
      name: "Install dependencies",
      run: mutable
        ? this.package.installAndUpdateLockfileCommand
        : this.package.installCommand,
    });

    return install;
  }

  /**
   * Defines normal dependencies.
   *
   * @param deps Names modules to install. By default, the the dependency will
   * be installed in the next `npx projen` run and the version will be recorded
   * in your `package.json` file. You can upgrade manually or using `yarn
   * add/upgrade`. If you wish to specify a version range use this syntax:
   * `module@^7`.
   */
  public addDeps(...deps: string[]) {
    return this.package.addDeps(...deps);
  }

  /**
   * Defines development/test dependencies.
   *
   * @param deps Names modules to install. By default, the the dependency will
   * be installed in the next `npx projen` run and the version will be recorded
   * in your `package.json` file. You can upgrade manually or using `yarn
   * add/upgrade`. If you wish to specify a version range use this syntax:
   * `module@^7`.
   */
  public addDevDeps(...deps: string[]) {
    return this.package.addDevDeps(...deps);
  }

  /**
   * Defines peer dependencies.
   *
   * When adding peer dependencies, a devDependency will also be added on the
   * pinned version of the declared peer. This will ensure that you are testing
   * your code against the minimum version required from your consumers.
   *
   * @param deps Names modules to install. By default, the the dependency will
   * be installed in the next `npx projen` run and the version will be recorded
   * in your `package.json` file. You can upgrade manually or using `yarn
   * add/upgrade`. If you wish to specify a version range use this syntax:
   * `module@^7`.
   */
  public addPeerDeps(...deps: string[]) {
    return this.package.addPeerDeps(...deps);
  }

  /**
   * Defines bundled dependencies.
   *
   * Bundled dependencies will be added as normal dependencies as well as to the
   * `bundledDependencies` section of your `package.json`.
   *
   * @param deps Names modules to install. By default, the the dependency will
   * be installed in the next `npx projen` run and the version will be recorded
   * in your `package.json` file. You can upgrade manually or using `yarn
   * add/upgrade`. If you wish to specify a version range use this syntax:
   * `module@^7`.
   */
  public addBundledDeps(...deps: string[]) {
    return this.package.addBundledDeps(...deps);
  }

  public addPackageIgnore(pattern: string) {
    this.npmignore?.addPatterns(pattern);
  }

  private addLicense(options: NodeProjectOptions) {
    if (this.package.license) {
      new License(this, {
        spdx: this.package.license,
        copyrightOwner: options.copyrightOwner ?? options.authorName,
        copyrightPeriod: options.copyrightPeriod,
      });
    }
  }

  private addDefaultGitIgnore() {
    this.gitignore.exclude(
      "# Logs",
      "logs",
      "*.log",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      "lerna-debug.log*",

      "# Diagnostic reports (https://nodejs.org/api/report.html)",
      "report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json",

      "# Runtime data",
      "pids",
      "*.pid",
      "*.seed",
      "*.pid.lock",

      "# Directory for instrumented libs generated by jscoverage/JSCover",
      "lib-cov",

      "# Coverage directory used by tools like istanbul",
      "coverage",
      "*.lcov",

      "# nyc test coverage",
      ".nyc_output",

      "# Compiled binary addons (https://nodejs.org/api/addons.html)",
      "build/Release",

      "# Dependency directories",
      "node_modules/",
      "jspm_packages/",

      "# TypeScript cache",
      "*.tsbuildinfo",

      "# Optional eslint cache",
      ".eslintcache",

      "# Output of 'npm pack'",
      "*.tgz",

      "# Yarn Integrity file",
      ".yarn-integrity",

      "# parcel-bundler cache (https://parceljs.org/)",
      ".cache"
    );
  }

  /**
   * Returns the shell command to execute in order to run a task. This will
   * typically be `npx projen TASK`.
   *
   * @param task The task for which the command is required
   */
  public runTaskCommand(task: Task) {
    return `${this.package.projenCommand} ${task.name}`;
  }

  /**
   * The job ID of the build workflow.
   */
  public get buildWorkflowJobId() {
    return this.buildWorkflow?.buildJobIds[0];
  }
}

/**
 * Options for `renderInstallSteps()`.
 */
export interface RenderWorkflowSetupOptions {
  /**
   * Should the pacakge lockfile be updated?
   * @default false
   */
  readonly mutable?: boolean;
}
