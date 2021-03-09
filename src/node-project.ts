import { PROJEN_DIR, PROJEN_RC, PROJEN_VERSION } from './common';
import { GithubWorkflow } from './github';
import { AutoMerge } from './github/auto-merge';
import { DependabotOptions } from './github/dependabot';
import { MergifyOptions } from './github/mergify';
import { IgnoreFile } from './ignore-file';
import { Jest, JestOptions } from './jest';
import { License } from './license';
import { NodePackage, NpmTaskExecution, NodePackageManager, NodePackageOptions } from './node-package';
import { Project, ProjectOptions } from './project';
import { ProjenUpgrade } from './projen-upgrade';
import { Publisher } from './publisher';
import { Semver } from './semver';
import { Task, TaskCategory } from './tasks';
import { Version } from './version';

const PROJEN_SCRIPT = 'projen';

export interface NodeProjectOptions extends ProjectOptions, NodePackageOptions {
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
   * @default Semver.latest()
   */
  readonly projenVersion?: Semver;

  /**
   * Indicates of "projen" should be installed as a devDependency.
   *
   * @default true
   */
  readonly projenDevDependency?: boolean;

  /**
   * The name of the main release branch.
   *
   * NOTE: this field is temporarily required as we migrate the default value
   * from "master" to "main". Shortly, it will be made optional with "main" as
   * the default.
   *
   * @default "main"
   */
  readonly defaultReleaseBranch: string;

  /**
   * Define a GitHub workflow for building PRs.
   * @default - true if not a subproject
   */
  readonly buildWorkflow?: boolean;

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
   * Define a GitHub workflow for releasing from "main" when new versions are
   * bumped. Requires that `version` will be undefined.
   *
   * @default - true if not a subproject
   */
  readonly releaseWorkflow?: boolean;

  /**
   * Automatically release new versions every commit to one of branches in `releaseBranches`.
   * @default true
   */
  readonly releaseEveryCommit?: boolean;

  /**
   * CRON schedule to trigger new releases.
   *
   * @default - no scheduled releases
   */
  readonly releaseSchedule?: string;

  /**
   * Branches which trigger a release.
   *
   * Default value is based on defaultReleaseBranch.
   *
   * @default [ "main" ]
   */
  readonly releaseBranches?: string[];

  /**
   * Workflow steps to use in order to bootstrap this repo.
   *
   * @default "yarn install --frozen-lockfile && yarn projen"
   */
  readonly workflowBootstrapSteps?: any[];

  /**
   * Container image to use for GitHub workflows.
   *
   * @default - default image
   */
  readonly workflowContainerImage?: string;

  /**
   * Automatically release to npm when new versions are introduced.
   * @default false
   */
  readonly releaseToNpm?: boolean;

  /**
   * Checks that after build there are no modified files on git.
   * @default true
   */
  readonly antitamper?: boolean;

  /**
   * The node version to use in GitHub workflows.
   *
   * @default - same as `minNodeVersion`
   */
  readonly workflowNodeVersion?: string;

  /**
   * Include dependabot configuration.
   *
   * @default true
   */
  readonly dependabot?: boolean;

  /**
   * Options for dependabot.
   *
   * @default - default options
   */
  readonly dependabotOptions?: DependabotOptions;

  /**
   * Adds mergify configuration.
   *
   * @default true
   */
  readonly mergify?: boolean;

  /**
   * Options for mergify
   *
   * @default - default options
   */
  readonly mergifyOptions?: MergifyOptions;

  /**
   * Automatically merge PRs that build successfully and have this label.
   *
   * To disable, set this value to an empty string.
   *
   * @default "auto-merge"
   */
  readonly mergifyAutoMergeLabel?: string;

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
   */
  readonly projenUpgradeSecret?: string;

  /**
   * Automatically merge projen upgrade PRs when build passes.
   * Applies the `mergifyAutoMergeLabel` to the PR if enabled.
   *
   * @default - "true" if mergify auto-merge is enabled (default)
   */
  readonly projenUpgradeAutoMerge?: boolean;

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
   * Additional entries to .npmignore
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
  readonly pullRequestTemplateContents?: string;

  /**
   * Installs a GitHub workflow which is triggered when the comment "@projen
   * rebuild" is added to a pull request. The workflow will run a full build and
   * commit the changes to the pull request branch. This is useful for updating
   * test snapshots and other generated files like API.md.
   *
   * @default - true if not a subproject
   */
  readonly rebuildBot?: boolean;

  /**
   * The pull request bot command to use in order to trigger a rebuild and
   * commit of the contents of the branch. The command must be prefixed by "@projen", e.g. "@projen rebuild"
   * `gh pr review $pr --comment -b "@projen rebuild"`
   *
   * @default "rebuild"
   */
  readonly rebuildBotCommand?: string;

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
   * Version requirement of `jsii-release` which is used to publish modules to npm.
   * @default "latest"
   */
  readonly jsiiReleaseVersion?: string;

  /**
   * A directory which will contain artifacts to be published to npm.
   *
   * @default "dist"
   */
  readonly artifactsDirectory?: string;
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
  DAILY
}

/**
 * Node.js project
 */
export class NodeProject extends Project {
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
  public get allowLibraryDependencies(): boolean { return this.package.allowLibraryDependencies; }

  /**
   * @deprecated use `package.entrypoint`
   */
  public get entrypoint(): string { return this.package.entrypoint; }

  /**
   * Compiles the code. By default for node.js projects this task is empty.
   */
  public readonly compileTask: Task;

  /**
   * Tests the code.
   */
  public readonly testTask: Task;

  /**
   * Compiles the test code.
   */
  public readonly testCompileTask: Task;

  /**
   * The task responsible for a full release build. It spawns: compile + test + release + package
   */
  public readonly buildTask: Task;

  /**
   * Automatic PR merges.
   */
  public readonly autoMerge?: AutoMerge;

  private readonly _version: Version;

  /**
   * The PR build GitHub workflow. `undefined` if `buildWorkflow` is disabled.
   */
  protected readonly buildWorkflow?: GithubWorkflow;
  protected readonly buildWorkflowJobId?: string;

  /**
   * The release GitHub workflow. `undefined` if `releaseWorkflow` is disabled.
   */
  public readonly releaseWorkflow?: GithubWorkflow;

  /**
   * Package publisher. This will be `undefined` if the project does not have a
   * release workflow.
   */
  public readonly publisher?: Publisher;

  /**
   * Minimum node.js version required by this package.
   */
  public get minNodeVersion(): string | undefined { return this.package.minNodeVersion; }

  /**
   * Maximum node version required by this pacakge.
   */
  public get maxNodeVersion(): string | undefined { return this.package.maxNodeVersion; }

  private readonly nodeVersion?: string;

  /**
   * Indicates if workflows have anti-tamper checks.
   */
  public readonly antitamper: boolean;

  /**
   * @deprecated use `package.npmDistTag`
   */
  protected readonly npmDistTag: string;

  /**
   * @deprecated use `package.npmRegistry`
   */
  protected readonly npmRegistry: string;

  /**
   * The package manager to use.
   *
   * @deprecated use `package.packageManager`
   */
  public get packageManager(): NodePackageManager { return this.package.packageManager; }

  /**
   * The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).
   */
  public readonly runScriptCommand: string;

  /**
   * The Jest configuration (if enabled)
   */
  public readonly jest?: Jest;

  /**
   * Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).
   *
   * @deprecated use `package.npmTaskExecution`
   */
  public get npmTaskExecution(): NpmTaskExecution { return this.package.npmTaskExecution; }

  /**
   * The command to use in order to run the projen CLI.
   */
  public get projenCommand(): string { return this.package.projenCommand; }

  /**
   * @deprecated use `package.addField(x, y)`
   */
  public get manifest() {
    return this.package.manifest;
  }

  constructor(options: NodeProjectOptions) {
    super(options);

    this.package = new NodePackage(this, options);

    this.runScriptCommand = (() => {
      switch (this.packageManager) {
        case NodePackageManager.NPM: return 'npm run';
        case NodePackageManager.YARN: return 'yarn run';
        case NodePackageManager.PNPM: return 'pnpm run';
        default: throw new Error(`unexpected package manager ${this.packageManager}`);
      }
    })();

    this.nodeVersion = options.workflowNodeVersion ?? this.package.minNodeVersion;

    // add PATH for all tasks which includes the project's npm .bin list
    this.tasks.addEnvironment('PATH', '$(npx -c "node -e \\\"console.log(process.env.PATH)\\\"")');

    this.compileTask = this.addTask('compile', {
      description: 'Only compile',
      category: TaskCategory.BUILD,
    });

    this.testCompileTask = this.addTask('test:compile', {
      description: 'compiles the test code',
      category: TaskCategory.TEST,
    });

    this.testTask = this.addTask('test', {
      description: 'Run tests',
      category: TaskCategory.TEST,
    });

    this.testTask.spawn(this.testCompileTask);

    this.buildTask = this.addTask('build', {
      description: 'Full release build (test+compile)',
      category: TaskCategory.BUILD,
    });

    this.addLicense(options);

    this.npmDistTag = this.package.npmDistTag;
    this.npmRegistry = this.package.npmRegistry;

    if (options.npmignoreEnabled ?? true) {
      this.npmignore = new IgnoreFile(this, '.npmignore');
    }

    this.addDefaultGitIgnore();

    if (options.gitignore?.length) {
      for (const i of options.gitignore) {
        this.gitignore.exclude(i);
      }
    }

    if (options.npmignore?.length) {
      if (!this.npmignore) {
        throw new Error('.npmignore is not defined for an APP project type. Add "npmIgnore: true" to override this');
      }

      for (const i of options.npmignore) {
        this.npmignore.exclude(i);
      }
    }


    this.setScript(PROJEN_SCRIPT, this.package.projenCommand);
    this.setScript('start', `${this.package.projenCommand} start`);

    this.npmignore?.exclude(`/${PROJEN_RC}`);
    this.npmignore?.exclude(`/${PROJEN_DIR}`);
    this.gitignore.include(`/${PROJEN_RC}`);


    const projen = options.projenDevDependency ?? true;
    if (projen) {
      const projenVersion = options.projenVersion ?? `^${PROJEN_VERSION}`;
      this.addDevDeps(`projen@${projenVersion}`);
    }

    if (!options.defaultReleaseBranch) {
      throw new Error('"defaultReleaseBranch" is temporarily a required option while we migrate its default value from "master" to "main"');
    }

    const defaultReleaseBranch = options.defaultReleaseBranch ?? 'main';

    // version is read from a committed file called version.json which is how we bump
    this._version = new Version(this, { releaseBranch: defaultReleaseBranch });
    this.package.addVersion(this._version.currentVersion);

    // indicate if we have anti-tamper configured in our workflows. used by e.g. Jest
    // to decide if we can always run with --updateSnapshot
    this.antitamper = (options.buildWorkflow ?? (this.parent ? false : true)) && (options.antitamper ?? true);

    // configure jest if enabled
    // must be before the build/release workflows
    if (options.jest ?? true) {
      this.jest = new Jest(this, options.jestOptions);
    }

    if (options.buildWorkflow ?? (this.parent ? false : true)) {
      const { workflow, buildJobId } = this.createBuildWorkflow('Build', {
        trigger: {
          pull_request: { },
        },
        image: options.workflowContainerImage,
        codeCov: options.codeCov ?? false,
        codeCovTokenSecret: options.codeCovTokenSecret,
      });

      this.buildWorkflow = workflow;
      this.buildWorkflowJobId = buildJobId;
    }

    if (options.releaseWorkflow ?? (this.parent ? false : true)) {
      const releaseBranches = options.releaseBranches ?? [defaultReleaseBranch];

      const trigger: { [event: string]: any } = { };

      if (options.releaseEveryCommit ?? true) {
        trigger.push = { branches: releaseBranches };
      }

      if (options.releaseSchedule) {
        trigger.schedule = { cron: options.releaseSchedule };
      }

      const artifactDirectory = options.artifactsDirectory ?? 'dist';

      const { workflow, buildJobId } = this.createBuildWorkflow('Release', {
        trigger,
        preBuildSteps: [{
          name: 'Bump to next version',
          run: this.runTaskCommand(this._version.bumpTask),
        }],
        pushBranch: '${{ github.ref }}',
        artifactDirectory,
        image: options.workflowContainerImage,
        codeCov: options.codeCov ?? false,
        codeCovTokenSecret: options.codeCovTokenSecret,
        checkoutWith: {
          // we must use 'fetch-depth=0' in order to fetch all tags
          // otherwise tags are not checked out
          'fetch-depth': 0,
        },
      });

      this.releaseWorkflow = workflow;

      this.publisher = new Publisher(this, {
        workflow: this.releaseWorkflow,
        artifactName: artifactDirectory,
        buildJobId,
        jsiiReleaseVersion: options.jsiiReleaseVersion,
      });

      if (options.releaseToNpm ?? false) {
        this.publisher.publishToNpm({
          distTag: this.package.npmDistTag,
          registry: this.package.npmRegistry,
        });
      }
    } else {
      // validate that no release options are selected if the release workflow is disabled.
      if (options.releaseToNpm) {
        throw new Error('"releaseToNpm" is not supported for APP projects');
      }

      if (options.releaseBranches) {
        throw new Error('"releaseBranches" is not supported for APP projects');
      }

      if (options.releaseEveryCommit) {
        throw new Error('"releaseEveryCommit" is not supported for APP projects');
      }

      if (options.releaseSchedule) {
        throw new Error('"releaseSchedule" is not supported for APP projects');
      }
    }

    if (options.mergify ?? true) {
      this.autoMerge = new AutoMerge(this, {
        autoMergeLabel: options.mergifyAutoMergeLabel,
        buildJob: this.buildWorkflowJobId,
      });

      this.npmignore?.exclude('/.mergify.yml');
    }

    if (options.dependabot ?? true) {
      this.github?.addDependabot(options.dependabotOptions);
    }

    const projenAutoMerge = options.projenUpgradeAutoMerge ?? true;
    new ProjenUpgrade(this, {
      autoUpgradeSecret: options.projenUpgradeSecret,
      autoUpgradeSchedule: options.projenUpgradeSchedule,
      labels: (projenAutoMerge && this.autoMerge?.autoMergeLabel)
        ? [this.autoMerge.autoMergeLabel]
        : [],
    });

    if (options.pullRequestTemplate ?? true) {
      this.github?.addPullRequestTemplate(...options.pullRequestTemplateContents ?? []);
    }

    if (options.rebuildBot ?? (this.parent ? false : true)) {
      this.addRebuildBot(options.rebuildBotCommand ?? 'rebuild');
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
   * DEPRECATED
   * @deprecated use `project.buildTask.exec()`
   */
  public addBuildCommand(...commands: string[]) {
    for (const c of commands) {
      this.buildTask.exec(c);
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

  public get installWorkflowSteps(): any[] {
    const install = new Array();
    if (this.nodeVersion) {
      install.push({
        name: 'Setup Node.js',
        uses: 'actions/setup-node@v1',
        with: { 'node-version': this.nodeVersion },
      });
    }

    install.push({
      name: 'Install dependencies',
      run: this.package.installCommand,
    });

    // run "projen"
    install.push({
      name: 'Synthesize project files',
      run: this.package.projenCommand,
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

  private addLicense(options: NodeProjectOptions) {
    if (this.package.license) {
      new License(this, this.package.license, {
        copyrightOwner: options.copyrightOwner ?? options.authorName,
        copyrightPeriod: options.copyrightPeriod,
      });
    }
  }

  private addDefaultGitIgnore() {
    this.gitignore.exclude(
      '# Logs',
      'logs',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'lerna-debug.log*',

      '# Diagnostic reports (https://nodejs.org/api/report.html)',
      'report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json',

      '# Runtime data',
      'pids',
      '*.pid',
      '*.seed',
      '*.pid.lock',

      '# Directory for instrumented libs generated by jscoverage/JSCover',
      'lib-cov',

      '# Coverage directory used by tools like istanbul',
      'coverage',
      '*.lcov',

      '# nyc test coverage',
      '.nyc_output',

      '# Compiled binary addons (https://nodejs.org/api/addons.html)',
      'build/Release',

      '# Dependency directories',
      'node_modules/',
      'jspm_packages/',

      '# TypeScript cache',
      '*.tsbuildinfo',


      '# Optional eslint cache',
      '.eslintcache',

      '# Output of \'npm pack\'',
      '*.tgz',

      '# Yarn Integrity file',
      '.yarn-integrity',

      '# parcel-bundler cache (https://parceljs.org/)',
      '.cache',
    );
  }

  private createBuildWorkflow(name: string, options: NodeBuildWorkflowOptions): BuildWorkflow {
    const buildJobId = 'build';

    const github = this.github;
    if (!github) { throw new Error('no github support'); }

    const workflow = github.addWorkflow(name);

    if (options.trigger) {
      if (options.trigger.issue_comment) {
        throw new Error('"issue_comment" should not be used as a trigger due to a security issue');
      }

      workflow.on(options.trigger);
    }

    workflow.on({
      workflow_dispatch: {}, // allow manual triggering
    });

    const condition = options.condition ? { if: options.condition } : {};
    const preBuildSteps = options.preBuildSteps ?? [];
    const preCheckoutSteps = options.preCheckoutSteps ?? [];
    const checkoutWith = options.checkoutWith ? { with: options.checkoutWith } : {};
    const postSteps = options.postSteps ?? [];

    const antitamperSteps = (options.antitamperDisabled || !this.antitamper) ? [] : [{
      name: 'Anti-tamper check',
      run: 'git diff --exit-code',
    }];

    const commitChanges = !options.commit ? [] : [{
      name: 'Commit changes',
      run: `git commit -am "${options.commit}"`,
    }];

    const pushChanges = !options.pushBranch ? [] : [
      {
        name: 'Push commits',
        run: 'git push origin $BRANCH',
        env: {
          BRANCH: options.pushBranch,
        },
      },

      // push tags only after we've managed to push our commits in order to
      // avoid tags being pushed but commits being rejected due to new commits
      // see https://github.com/projen/projen/issues/553
      {
        name: 'Push tags',
        run: 'git push --follow-tags origin $BRANCH',
        env: {
          BRANCH: options.pushBranch,
        },
      },
    ];

    const job: any = {
      'runs-on': 'ubuntu-latest',
      'env': {
        CI: 'true', // will cause `NodeProject` to execute `yarn install` with `--frozen-lockfile`
      },
      ...condition,
      'steps': [
        ...preCheckoutSteps,

        // check out sources.
        {
          name: 'Checkout',
          uses: 'actions/checkout@v2',
          ...checkoutWith,
        },

        // install dependencies
        ...this.installWorkflowSteps,

        // perform an anti-tamper check immediately after we run projen.
        ...antitamperSteps,

        // sets git identity so we can push later
        {
          name: 'Set git identity',
          run: [
            'git config user.name "Auto-bump"',
            'git config user.email "github-actions@github.com"',
          ].join('\n'),
        },

        // if there are changes, creates a bump commit

        ...preBuildSteps,

        // build (compile + test)
        {
          name: 'Build',
          run: this.runTaskCommand(this.buildTask),
        },

        // run codecov if enabled or a secret token name is passed in
        // AND jest must be configured
        ...(options.codeCov || options.codeCovTokenSecret) && this.jest?.config ? [{
          name: 'Upload coverage to Codecov',
          uses: 'codecov/codecov-action@v1',
          with: options.codeCovTokenSecret ? {
            token: `\${{ secrets.${options.codeCovTokenSecret} }}`,
            directory: this.jest.config.coverageDirectory,
          } : {
            directory: this.jest.config.coverageDirectory,
          },
        }] : [],

        // anti-tamper check (fails if there were changes to committed files)
        // this will identify any non-committed files generated during build (e.g. test snapshots)
        ...antitamperSteps,

        // if required, commit changes to the repo
        ...commitChanges,

        // push bump commit
        ...pushChanges,

        ...postSteps,
      ],
    };

    if (options.image) {
      job.container = { image: options.image };
    }

    if (options.artifactDirectory) {
      job.steps.push({
        name: 'Upload artifact',
        uses: 'actions/upload-artifact@v2.1.1',
        with: {
          name: options.artifactDirectory,
          path: options.artifactDirectory,
        },
      });
    }

    workflow.addJobs({ [buildJobId]: job });

    return { workflow, buildJobId };
  }

  /**
   * Returns the shell command to execute in order to run a task. If
   * npmTaskExecution is set to PROJEN, the command will be `npx projen TASK`.
   * If it is set to SHELL, the command will be `yarn run TASK` (or `npm run
   * TASK`).
   *
   * @param task The task for which the command is required
   */
  public runTaskCommand(task: Task) {
    switch (this.package.npmTaskExecution) {
      case NpmTaskExecution.PROJEN: return `${this.package.projenCommand} ${task.name}`;
      case NpmTaskExecution.SHELL: return `${this.runScriptCommand} ${task.name}`;
      default:
        throw new Error(`invalid npmTaskExecution mode: ${this.package.npmTaskExecution}`);
    }
  }

  private addRebuildBot(command: string) {

    const postComment = (message: string) => ({
      name: 'Post comment to issue',
      uses: 'peter-evans/create-or-update-comment@v1',
      with: {
        'issue-number': '${{ github.event.issue.number }}',
        'body': `_projen_: ${message}`,
      },
    });

    this.createBuildWorkflow('rebuild-bot', {
      // trigger: { issue_comment: { types: ['created'] } }, // <--- disabled due to a security issue
      condition: `\${{ github.event.issue.pull_request && contains(github.event.comment.body, '@projen ${command}') }}`,
      antitamperDisabled: true, // definitely do not want that

      // since the "issue_comment" event is not triggered on a branch, we need to resolve
      // the git ref of the pull request before we check out
      preCheckoutSteps: [
        postComment('Rebuild started'),
        {
          name: 'Get pull request branch',
          id: 'query_pull_request',
          env: { PULL_REQUEST_URL: '${{ github.event.issue.pull_request.url }}' },
          run: [
            'rm -f /tmp/pr.json',
            'curl --silent $PULL_REQUEST_URL > /tmp/pr.json',
            'BRANCH_STR=$(cat /tmp/pr.json | jq ".head.ref")',
            'REPO_NAME=$(cat /tmp/pr.json | jq ".head.repo.full_name")',
            'echo "::set-output name=branch::$(node -p $BRANCH_STR)"',
            'echo "::set-output name=repo::$(node -p $REPO_NAME)"',
          ].join('\n'),
        },
      ],

      // tell checkout to use the branch we acquired at the previous step
      checkoutWith: {
        ref: '${{ steps.query_pull_request.outputs.branch }}',
        repository: '${{ steps.query_pull_request.outputs.repo }}',
      },

      // commit changes
      commit: 'chore: update generated files',

      // and push to the pull request branch
      pushBranch: '${{ steps.query_pull_request.outputs.branch }}',

      postSteps: [
        postComment('Rebuild complete. Updates pushed to pull request branch.'),
      ],
    });
  }
}

interface BuildWorkflow {
  readonly workflow: GithubWorkflow;
  readonly buildJobId: string;
}

interface NodeBuildWorkflowOptions {
  /**
   * @default - default image
   */
  readonly image?: string;

  /**
   * Adds an "if" condition to the workflow.
   */
  readonly condition?: any;

  /**
   * A directory name which contains artifacts to be published (e.g. `dist`).
   *
   * javascript artifacts must be under the `js` subdirectory.
   * @default undefined By default artifacts are not uploaded
   */
  readonly artifactDirectory?: string;

  /**
   * What should trigger the workflow?
   *
   * @default - by default workflows can only be triggered by manually.
   */
  readonly trigger?: { [event: string]: any };

  /**
   * Bump a new version for this build.
   * @default false
   */
  // readonly bump?: boolean;

  /**
   * Run codecoverage step
   * Send to https://codecov.io/
   * @default false
   */
  readonly codeCov?: boolean;

  /**
   * The secret name for the https://codecov.io/ token
   */
  readonly codeCovTokenSecret?: string;

  readonly preBuildSteps?: any[];
  readonly preCheckoutSteps?: any[];
  readonly postSteps?: any[];
  readonly checkoutWith?: { [key: string]: any };

  /**
   * Commit any changes with the specified commit message.
   */
  readonly commit?: string;

  /**
   * @default - do not push the changes to a branch
   */
  readonly pushBranch?: string;

  /**
   * Disables anti-tamper checks in the workflow.
   */
  readonly antitamperDisabled?: boolean;
}

export interface NodeWorkflowSteps {
  readonly antitamper: any[];
  readonly install: any[];
}
