import * as path from 'path';
import * as fs from 'fs-extra';
import * as semver from 'semver';
import { PROJEN_RC, PROJEN_VERSION } from './common';
import { DependencyType } from './deps/model';
import { GithubWorkflow } from './github';
import { DependabotOptions } from './github/dependabot';
import { Mergify, MergifyOptions } from './github/mergify';
import { IgnoreFile } from './ignore-file';
import { Jest, JestOptions } from './jest';
import { JsonFile } from './json';
import { License } from './license';
import * as logging from './logging';
import { Project, ProjectOptions } from './project';
import { ProjenUpgrade } from './projen-upgrade';
import { Semver } from './semver';
import { Task, TaskCategory } from './tasks';
import { exec, isTruthy, writeFile } from './util';
import { Version } from './version';

const PROJEN_SCRIPT = 'projen';

/**
 * The node package manager to use.
 */
export enum NodePackageManager {
  /**
   * Use `yarn` as the package manager.
   */
  YARN = 'yarn',

  /**
   * Use `npm` as the package manager.
   */
  NPM = 'npm'
}

export interface NodeProjectCommonOptions extends ProjectOptions {
  /**
   * Runtime dependencies of this module.
   *
   * The recommendation is to only specify the module name here (e.g.
   * `express`). This will behave similar to `yarn add` or `npm install` in the
   * sense that it will add the module as a dependency to your `package.json`
   * file with the latest version (`^`). You can specify semver requirements in
   * the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
   * this will be what you `package.json` will eventually include.
   *
   * @example [ 'express', 'lodash', 'foo@^2' ]
   * @default []
   */
  readonly deps?: string[];

  /**
   * Build dependencies for this module. These dependencies will only be
   * available in your build environment but will not be fetched when this
   * module is consumed.
   *
   * The recommendation is to only specify the module name here (e.g.
   * `express`). This will behave similar to `yarn add` or `npm install` in the
   * sense that it will add the module as a dependency to your `package.json`
   * file with the latest version (`^`). You can specify semver requirements in
   * the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
   * this will be what you `package.json` will eventually include.
   *
   * @example [ 'typescript', '@types/express' ]
   * @default []
   */
  readonly devDeps?: string[];

  /**
   * Peer dependencies for this module. Dependencies listed here are required to
   * be installed (and satisfied) by the _consumer_ of this library. Using peer
   * dependencies allows you to ensure that only a single module of a certain
   * library exists in the `node_modules` tree of your consumers.
   *
   * Note that prior to npm@7, peer dependencies are _not_ automatically
   * installed, which means that adding peer dependencies to a library will be a
   * breaking change for your customers.
   *
   * Unless `peerDependencyOptions.pinnedDevDependency` is disabled (it is
   * enabled by default), projen will automatically add a dev dependency with a
   * pinned version for each peer dependency. This will ensure that you build &
   * test your module against the lowest peer version required.
   *
   * @default []
   */
  readonly peerDeps?: string[];

  /**
   * List of dependencies to bundle into this module. These modules will be
   * added both to the `dependencies` section and `peerDependencies` section of
   * your `package.json`.
   *
   * The recommendation is to only specify the module name here (e.g.
   * `express`). This will behave similar to `yarn add` or `npm install` in the
   * sense that it will add the module as a dependency to your `package.json`
   * file with the latest version (`^`). You can specify semver requirements in
   * the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
   * this will be what you `package.json` will eventually include.
   */
  readonly bundledDeps?: string[];

  /**
   * Options for `peerDeps`.
   */
  readonly peerDependencyOptions?: PeerDependencyOptions;

  /**
   * Binary programs vended with your module.
   *
   * You can use this option to add/customize how binaries are represented in
   * your `package.json`, but unless `autoDetectBin` is `false`, every
   * executable file under `bin` will automatically be added to this section.
   */
  readonly bin?: Record<string, string>;

  /**
   * Automatically add all executables under the `bin` directory to your
   * `package.json` file under the `bin` section.
   *
   * @default true
   */
  readonly autoDetectBin?: boolean;

  /**
   * Keywords to include in `package.json`.
   */
  readonly keywords?: string[];

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
   * @default "master"
   */
  readonly defaultReleaseBranch?: string;

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
   * Define a GitHub workflow for releasing from "master" when new versions are
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
   * @default [ "master" ]
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
   * Minimum Node.js version to require via package.json `engines` (inclusive).
   *
   * @default - no "engines" specified
   */
  readonly minNodeVersion?: string;

  /**
   * Minimum node.js version to require via `engines` (inclusive).
   *
   * @default - no max
   */
  readonly maxNodeVersion?: string;

  /**
   * The node version to use in GitHub workflows.
   *
   * @default - same as `minNodeVersion`
   */
  readonly workflowNodeVersion?: string;

  /**
   * The dist-tag to use when releasing to npm.
   *
   * @default "latest"
   */
  readonly npmDistTag?: string;

  /**
   * The registry url to use when releasing packages.
   *
   * @default "registry.npmjs.org"
   */
  readonly npmRegistry?: string;

  /**
   * The Node Package Manager used to execute scripts
   *
   * @default NodePackageManager.YARN
   */
  readonly packageManager?: NodePackageManager;

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
   * Compiler artifacts output directory
   *
   * @default "lib"
   */
  readonly libdir?: string;

  /**
   * Typescript sources directory.
   *
   * @default "src"
   */
  readonly srcdir?: string;

  /**
   * Tests directory.
   *
   * @default "test"
   */
  readonly testdir?: string;

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
   * npm scripts to include. If a script has the same name as a standard script,
   * the standard script will be overwritten.
   *
   * @default {}
   */
  readonly scripts?: { [name: string]: string };

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
   * Allow the project to include `peerDependencies` and `bundledDependencies`.
   * This is normally only allowed for libraries. For apps, there's no meaning
   * for specifying these.
   *
   * @default true
   */
  readonly allowLibraryDependencies?: boolean;

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
   * Module entrypoint (`main` in `package.json`)
   *
   * Set to an empty string to not include `main` in your package.json
   *
   * @default "lib/index.js"
   */
  readonly entrypoint?: string;

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
   * Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).
   * @default NpmTaskExecution.PROJEN
   */
  readonly npmTaskExecution?: NpmTaskExecution;

  /**
   * The shell command to use in order to run the projen CLI.
   *
   * Can be used to customize in special environments.
   *
   * @default "npx projen"
   */
  readonly projenCommand?: string;

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

}

export enum NpmTaskExecution {
  /**
   * `package.json` scripts invoke to the projen CLI.
   *
   * @example
   *
   * scripts: {
   *   "compile": "projen compile"
   * }
   */
  PROJEN = 'projen',

  /**
   * Task is implemented directly as a shell script within `package.json`.
   *
   * @example
   *
   * scripts: {
   *   "compile": "tsc"
   * }
   */
  SHELL = 'shell'
}

export interface NodeProjectOptions extends NodeProjectCommonOptions {
  /**
   * This is the name of your package. It gets used in URLs, as an argument on the command line,
   * and as the directory name inside node_modules.
   * See https://classic.yarnpkg.com/en/docs/package-json/#toc-name
   *
   * @default $BASEDIR
   */
  readonly name: string;

  /**
   * The description is just a string that helps people understand the purpose of the package.
   * It can be used when searching for packages in a package manager as well.
   * See https://classic.yarnpkg.com/en/docs/package-json/#toc-description
   */
  readonly description?: string;

  /**
   * The repository is the location where the actual code for your package lives.
   * See https://classic.yarnpkg.com/en/docs/package-json/#toc-repository
   */
  readonly repository?: string;

  /**
   * If the package.json for your package is not in the root directory (for example if it is part of a monorepo),
   * you can specify the directory in which it lives.
   */
  readonly repositoryDirectory?: string;

  /**
   * Author's name
   */
  readonly authorName?: string;

  /**
   * Author's e-mail
   */
  readonly authorEmail?: string;

  /**
   * Author's URL / Website
   */
  readonly authorUrl?: string;

  /**
   * Author's Organization
   */
  readonly authorOrganization?: boolean;

  /**
   * Package's Homepage / Website
   */
  readonly homepage?: string;

  /**
   * License's SPDX identifier.
   * See https://github.com/projen/projen/tree/master/license-text for a list of supported licenses.
   */
  readonly license?: string;

  /**
 * Indicates if a license should be added.
 *
 * @default true
 */
  readonly licensed?: boolean;

  /**
   * Package's Stability
   */
  readonly stability?: string;

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
}

/**
 * Automatic bump modes
 */
export enum AutoRelease {
  /**
   * Automatically bump & release a new version for every commit to "master"
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
  public readonly npmignore?: IgnoreFile;
  public readonly mergify?: Mergify;
  public readonly manifest: any;
  public readonly allowLibraryDependencies: boolean;
  public readonly entrypoint: string;

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

  private readonly peerDependencyOptions: PeerDependencyOptions;
  private readonly scripts: Record<string, string[]>;
  private readonly bin: Record<string, string> = { };
  private readonly keywords: Set<string>;
  private readonly _version: Version;

  /**
   * The PR build GitHub workflow. `undefined` if `buildWorkflow` is disabled.
   */
  protected readonly buildWorkflow?: GithubWorkflow;
  protected readonly buildWorkflowJobId?: string;

  /**
   * The release GitHub workflow. `undefined` if `releaseWorkflow` is disabled.
   */
  protected readonly releaseWorkflow?: GithubWorkflow;
  protected readonly releaseWorkflowJobId?: string;

  public readonly minNodeVersion?: string;
  public readonly maxNodeVersion?: string;

  private readonly nodeVersion?: string;

  /**
   * Indicates if workflows have anti-tamper checks.
   */
  public readonly antitamper: boolean;

  protected readonly npmDistTag: string;

  protected readonly npmRegistry: string;

  /**
   * The package manager to use.
   */
  protected readonly packageManager: NodePackageManager;

  /**
   * The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).
   */
  public readonly runScriptCommand: string;

  /**
   * The directory in which tests reside.
   */
  public readonly testdir: string;

  /**
   * The Jest configuration (if enabled)
   */
  public readonly jest?: Jest;

  /**
   * Determines how tasks are executed when invoked as npm scripts (yarn/npm run xyz).
   */
  public readonly npmTaskExecution: NpmTaskExecution;

  /**
   * The command to use in order to run the projen CLI.
   */
  public readonly projenCommand: string;

  private _renderedDeps?: NpmDependencies;

  constructor(options: NodeProjectOptions) {
    super(options);

    this.scripts = {};
    this.allowLibraryDependencies = options.allowLibraryDependencies ?? true;
    this.peerDependencyOptions = options.peerDependencyOptions ?? {};
    this.packageManager = options.packageManager ?? NodePackageManager.YARN;
    this.npmTaskExecution = options.npmTaskExecution ?? NpmTaskExecution.PROJEN;
    this.runScriptCommand = (() => {
      switch (this.packageManager) {
        case NodePackageManager.NPM: return 'npm run';
        case NodePackageManager.YARN: return 'yarn run';
        default: throw new Error(`unexpected package manager ${this.packageManager}`);
      }
    })();
    this.projenCommand = options.projenCommand ?? 'npx projen';

    this.processDeps(options);

    // node version

    this.minNodeVersion = options.minNodeVersion;
    this.maxNodeVersion = options.maxNodeVersion;
    this.nodeVersion = options.workflowNodeVersion ?? this.minNodeVersion;


    this.keywords = new Set();
    this.addKeywords(...options.keywords ?? []);

    // add PATH for all tasks which includes the project's npm .bin list
    this.tasks.addEnvironment('PATH', '$(npx -c \'node -e "console.log(process.env.PATH)"\')');

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

    let nodeVersion = '';

    if (this.minNodeVersion) {
      nodeVersion += `>= ${this.minNodeVersion}`;
    }

    if (this.maxNodeVersion) {
      nodeVersion += ` <= ${this.maxNodeVersion}`;
    }

    this.npmDistTag = options.npmDistTag ?? 'latest';
    this.npmRegistry = options.npmRegistry ?? 'registry.npmjs.org';

    const renderScripts = () => {
      const result: any = {};
      for (const [name, commands] of Object.entries(this.scripts)) {
        const cmds = commands.length > 0 ? commands : ['echo "n/a"'];
        result[name] = cmds.join(' && ');
      }
      for (const task of this.tasks.all) {
        result[task.name] = this.npmScriptForTask(task);
      }

      return result;
    };

    let author;

    if (options.authorName) {
      author = {
        name: options.authorName,
        email: options.authorEmail,
        url: options.authorUrl,
        organization: options.authorOrganization ?? false,
      };
    } else {
      if (options.authorEmail || options.authorUrl || options.authorOrganization !== undefined) {
        throw new Error('"authorName" is required if specifying "authorEmail" or "authorUrl"');
      }
    }

    this.testdir = options.testdir ?? 'test';

    this.manifest = {
      name: options.name,
      description: options.description,
      repository: !options.repository ? undefined : {
        type: 'git',
        url: options.repository,
        directory: options.repositoryDirectory,
      },
      bin: this.bin,
      scripts: renderScripts,
      author: author,
      homepage: options.homepage,
      devDependencies: {},
      peerDependencies: {},
      dependencies: {},
      bundledDependencies: [],
      keywords: () => Array.from(this.keywords).sort(),
      engines: nodeVersion !== '' ? { node: nodeVersion } : undefined,
    };

    this.entrypoint = options.entrypoint ?? 'lib/index.js';
    this.manifest.main = this.entrypoint !== '' ? this.entrypoint : undefined;

    new JsonFile(this, 'package.json', {
      obj: this.manifest,
      marker: true,
      readonly: false, // we want "yarn add" to work and we have anti-tamper
    });

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

    // set license and produce license file
    if (options.licensed ?? true) {
      const license = options.license ?? 'Apache-2.0';
      this.manifest.license = license;

      new License(this, license, {
        copyrightOwner: options.copyrightOwner ?? options.authorName,
        copyrightPeriod: options.copyrightPeriod,
      });
    } else {
      this.manifest.license = 'UNLICENSED';
    }

    this.setScript(PROJEN_SCRIPT, this.projenCommand);
    this.setScript('start', `${this.projenCommand} start`);

    this.npmignore?.exclude(`/${PROJEN_RC}`);
    this.gitignore.include(`/${PROJEN_RC}`);

    this.addBins(options.bin ?? { });

    const projen = options.projenDevDependency ?? true;
    if (projen) {
      const projenVersion = options.projenVersion ?? `^${PROJEN_VERSION}`;
      this.addDevDeps(`projen@${projenVersion}`);
    }

    const defaultReleaseBranch = options.defaultReleaseBranch ?? 'master';

    // version is read from a committed file called version.json which is how we bump
    this._version = new Version(this, { releaseBranch: defaultReleaseBranch });
    this.manifest.version = (outdir: string) => this._version.resolveVersion(outdir);

    // indicate if we have anti-tamper configured in our workflows. used by e.g. Jest
    // to decide if we can always run with --updateSnapshot
    this.antitamper = (options.buildWorkflow ?? (this.parent ? false : true)) && (options.antitamper ?? true);

    // configure jest if enabled
    // must be before the build/release workflows
    if (options.jest ?? true) {
      this.jest = new Jest(this, {
        ...options.jestOptions,
      });

      this.gitignore.include(`/${this.testdir}`);
      this.npmignore?.exclude(`/${this.testdir}`);
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

      const { workflow, buildJobId } = this.createBuildWorkflow('Release', {
        trigger,
        preBuildSteps: [{
          name: 'Bump to next version',
          run: this.runTaskCommand(this._version.bumpTask),
        }],
        pushBranch: '${{ github.ref }}',
        uploadArtifact: true,
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
      this.releaseWorkflowJobId = buildJobId;

      if (options.releaseToNpm ?? false) {
        this.releaseWorkflow.addJobs({
          release_npm: {
            'name': 'Release to NPM',
            'needs': this.releaseWorkflowJobId,
            'runs-on': 'ubuntu-latest',
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

    // automatically add all executable files under "bin"
    if (options.autoDetectBin ?? true) {
      const bindir = 'bin';

      if (fs.existsSync(bindir)) {
        for (const file of fs.readdirSync(bindir)) {
          try {
            fs.accessSync(path.join(bindir, file), fs.constants.X_OK);
            this.bin[file] = path.join(bindir, file).replace(/\\/g, '/');
          } catch (e) {
            // not executable, skip
          }
        }
      }
    }

    let autoMergeLabel;

    if (options.mergify ?? true) {
      const successfulBuild = this.buildWorkflow
        ? [`status-success=${this.buildWorkflowJobId}`]
        : [];

      const mergeAction = {
        merge: {
          // squash all commits into a single commit when merging
          method: 'squash',

          // use PR title+body as the commit message
          commit_message: 'title+body',

          // update PR branch so it's up-to-date before merging
          strict: 'smart',
          strict_method: 'merge',
        },

        delete_head_branch: { },
      };

      this.github?.addMergifyRules({
        name: 'Automatic merge on approval and successful build',
        actions: mergeAction,
        conditions: [
          '#approved-reviews-by>=1',
          ...successfulBuild,
        ],
      });

      // empty string means disabled.
      autoMergeLabel = options.mergifyAutoMergeLabel ?? 'auto-merge';
      if (autoMergeLabel !== '') {
        this.github?.addMergifyRules({
          name: `Automatic merge PRs with ${autoMergeLabel} label upon successful build`,
          actions: mergeAction,
          conditions: [
            `label=${autoMergeLabel}`,
            ...successfulBuild,
          ],
        });
      }

      this.npmignore?.exclude('/.mergify.yml');
    }

    if (options.dependabot ?? true) {
      this.github?.addDependabot(options.dependabotOptions);
    }

    const projenAutoMerge = options.projenUpgradeAutoMerge ?? true;
    new ProjenUpgrade(this, {
      autoUpgradeSecret: options.projenUpgradeSecret,
      autoUpgradeSchedule: options.projenUpgradeSchedule,
      labels: (projenAutoMerge && autoMergeLabel) ? [autoMergeLabel] : [],
    });

    // override any scripts from options (if specified)
    for (const [cmdname, shell] of Object.entries(options.scripts ?? {})) {
      this.addTask(cmdname, { exec: shell });
    }

    if (options.pullRequestTemplate ?? true) {
      this.github?.addPullRequestTemplate(...options.pullRequestTemplateContents ?? []);
    }

    if (options.rebuildBot ?? (this.parent ? false : true)) {
      this.addRebuildBot(options.rebuildBotCommand ?? 'rebuild');
    }

  }

  public addBins(bins: Record<string, string>) {
    for (const [k, v] of Object.entries(bins)) {
      this.bin[k] = v;
    }
  }

  /**
   * Replaces the contents of an npm package.json script.
   *
   * @param name The script name
   * @param command The command to execute
   */
  public setScript(name: string, command: string) {
    this.scripts[name] = [command];
  }

  /**
   * Removes the npm script (always successful).
   * @param name The name of the script.
   */
  public removeScript(name: string) {
    delete this.scripts[name];
  }


  /**
   * Indicates if a script by the name name is defined.
   * @param name The name of the script
   */
  public hasScript(name: string) {
    return name in this.scripts;
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
      this.manifest[name] = value;
    }
  }

  /**
   * Adds keywords to package.json (deduplicated)
   * @param keywords The keywords to add
   */
  public addKeywords(...keywords: string[]) {
    for (const k of keywords) {
      this.keywords.add(k);
    }
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
      run: this.renderInstallCommand(true),
    });

    // run "projen"
    install.push({
      name: 'Synthesize project files',
      run: this.projenCommand,
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
    for (const dep of deps) {
      this.deps.addDependency(dep, DependencyType.RUNTIME);
    }
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
    for (const dep of deps) {
      this.deps.addDependency(dep, DependencyType.BUILD);

    }
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
    if (Object.keys(deps).length && !this.allowLibraryDependencies) {
      throw new Error(`cannot add peer dependencies to an APP project: ${Object.keys(deps).join(',')}`);
    }

    for (const dep of deps) {
      this.deps.addDependency(dep, DependencyType.PEER);
    }
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
    if (deps.length && !this.allowLibraryDependencies) {
      throw new Error(`cannot add bundled dependencies to an APP project: ${deps.join(',')}`);
    }

    for (const dep of deps) {
      this.deps.addDependency(dep, DependencyType.BUNDLED);
    }
  }

  private processDeps(options: NodeProjectCommonOptions) {
    const deprecate = (key: string, alt: string) => {
      if (Object.keys((options as any)[key] ?? {}).length) {
        throw new Error(`The option "${key}" is no longer supported, use "${alt}" instead (see API docs)`);
      }
    };

    deprecate('dependencies', 'deps');
    deprecate('peerDependencies', 'peerDeps');
    deprecate('devDependencies', 'devDeps');
    deprecate('bundledDependencies', 'bundledDeps');

    this.addDeps(...options.deps ?? []);
    this.addDevDeps(...options.devDeps ?? []);
    this.addPeerDeps(...options.peerDeps ?? []);
    this.addBundledDeps(...options.bundledDeps ?? []);
  }

  public preSynthesize() {
    this._renderedDeps = this.renderDependencies();
  }

  public postSynthesize() {
    super.postSynthesize();

    const outdir = this.outdir;

    // now we run `yarn install`, but before we do that, remove the
    // `node_modules/projen` symlink so that yarn won't hate us.
    const projenModule = path.resolve('node_modules', 'projen');
    try {
      if (fs.lstatSync(projenModule).isSymbolicLink()) {
        fs.unlinkSync(projenModule);
      }
    } catch (e) { }

    exec(this.renderInstallCommand(isTruthy(process.env.CI)), { cwd: outdir });

    this.resolveDepsAndWritePackageJson(outdir);
  }

  private renderInstallCommand(frozen: boolean) {
    switch (this.packageManager) {
      case NodePackageManager.YARN:
        return [
          'yarn install',
          '--check-files', // ensure all modules exist (especially projen which was just removed).
          ...frozen ? ['--frozen-lockfile'] : [],
        ].join(' ');

      case NodePackageManager.NPM:
        return frozen
          ? 'npm ci'
          : 'npm install';

      default:
        throw new Error(`unexpected package manager ${this.packageManager}`);
    }
  }

  private renderDependencies(): NpmDependencies {
    const devDependencies: Record<string, string> = {};
    const peerDependencies: Record<string, string> = {};
    const dependencies: Record<string, string> = {};
    const bundledDependencies = new Array<string>();

    // synthetic dependencies: add a pinned build dependency to ensure we are
    // testing against the minimum requirement of the peer.
    const pinned = this.peerDependencyOptions.pinnedDevDependency ?? true;
    if (pinned) {
      for (const dep of this.deps.all.filter(d => d.type === DependencyType.PEER)) {
        let req = dep.name;
        if (dep.version) {
          const ver = semver.minVersion(dep.version)?.version;
          if (!ver) {
            throw new Error(`unable to determine minimum semver for peer dependency ${dep.name}@${dep.version}`);
          }

          req += '@' + ver;
        }
        this.addDevDeps(req);
      }
    }

    for (const dep of this.deps.all) {
      const version = dep.version ?? '*';

      switch (dep.type) {
        case DependencyType.BUNDLED:
          bundledDependencies.push(dep.name);

          if (this.deps.all.find(d => d.name === dep.name && d.type === DependencyType.PEER)) {
            throw new Error(`unable to bundle "${dep.name}". it cannot appear as a peer dependency`);
          }

          // also add as a runtime dependency
          dependencies[dep.name] = version;
          break;

        case DependencyType.PEER:
          peerDependencies[dep.name] = version;
          break;

        case DependencyType.RUNTIME:
          dependencies[dep.name] = version;
          break;

        case DependencyType.TEST:
        case DependencyType.DEVENV:
        case DependencyType.BUILD:
          devDependencies[dep.name] = version;
          break;
      }
    }

    // update the manifest we are about to save into `package.json`
    this.manifest.devDependencies = devDependencies;
    this.manifest.peerDependencies = peerDependencies;
    this.manifest.dependencies = dependencies;
    this.manifest.bundledDependencies = bundledDependencies;

    // nothing further to do if package.json file does not exist
    const root = path.join(this.outdir, 'package.json');
    if (!fs.existsSync(root)) {
      return { devDependencies, peerDependencies, dependencies };
    }

    const pkg = JSON.parse(fs.readFileSync(root, 'utf-8'));

    const readDeps = (user: Record<string, string>, current: Record<string, string> = {}) => {
      for (const [name, userVersion] of Object.entries(user)) {
        const currentVersion = current[name];

        // respect user version if it's not '*' or if current version is undefined
        if (userVersion !== '*' || !currentVersion || currentVersion === '*') {
          continue;
        }

        // memoize current version in memory so it is preserved when saving
        user[name] = currentVersion;
      }

      // report removals
      for (const name of Object.keys(current ?? {})) {
        if (!user[name]) {
          logging.verbose(`${name}: removed`);
        }
      }
    };

    readDeps(devDependencies, pkg.devDependencies);
    readDeps(dependencies, pkg.dependencies);
    readDeps(peerDependencies, pkg.peerDependencies);

    return { devDependencies, dependencies, peerDependencies };
  }

  private resolveDepsAndWritePackageJson(outdir: string) {
    const root = path.join(outdir, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(root, 'utf-8'));

    const resolveDeps = (current: { [name: string]: string }, user: Record<string, string>) => {
      const result: Record<string, string> = {};

      for (const [name, currentDefinition] of Object.entries(user)) {
        // find actual version from node_modules
        let desiredVersion = currentDefinition;

        if (currentDefinition === '*') {
          try {
            const modulePath = require.resolve(`${name}/package.json`, { paths: [outdir] });
            const module = JSON.parse(fs.readFileSync(modulePath, 'utf-8'));
            desiredVersion = `^${module.version}`;
          } catch (e) { }

          if (!desiredVersion) {
            logging.warn(`unable to resolve version for ${name} from installed modules`);
            continue;
          }
        }

        if (currentDefinition !== desiredVersion) {
          logging.verbose(`${name}: ${currentDefinition} => ${desiredVersion}`);
        }

        result[name] = desiredVersion;
      }

      // print removed packages
      for (const name of Object.keys(current)) {
        if (!result[name]) {
          logging.verbose(`${name} removed`);
        }
      }

      return sorted(result)();
    };

    const rendered = this._renderedDeps;
    if (!rendered) {
      throw new Error('assertion failed');
    }
    pkg.dependencies = resolveDeps(pkg.dependencies, rendered.dependencies);
    pkg.devDependencies = resolveDeps(pkg.devDependencies, rendered.devDependencies);
    pkg.peerDependencies = resolveDeps(pkg.peerDependencies, rendered.peerDependencies);

    writeFile(root, JSON.stringify(pkg, undefined, 2));
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

    workflow.on(options.trigger);

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

    const pushChanges = !options.pushBranch ? [] : [{
      name: 'Push changes',
      run: 'git push --follow-tags origin $BRANCH',
      env: {
        BRANCH: options.pushBranch,
      },
    }];

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

    if (options.uploadArtifact) {
      job.steps.push({
        name: 'Upload artifact',
        uses: 'actions/upload-artifact@v2.1.1',
        with: {
          name: 'dist',
          path: 'dist',
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
    switch (this.npmTaskExecution) {
      case NpmTaskExecution.PROJEN: return `${this.projenCommand} ${task.name}`;
      case NpmTaskExecution.SHELL: return `${this.runScriptCommand} ${task.name}`;
      default:
        throw new Error(`invalid npmTaskExecution mode: ${this.npmTaskExecution}`);
    }
  }

  private npmScriptForTask(task: Task) {
    switch (this.npmTaskExecution) {
      case NpmTaskExecution.PROJEN: return `${this.projenCommand} ${task.name}`;
      case NpmTaskExecution.SHELL: return task.toShellCommand();
      default:
        throw new Error(`invalid npmTaskExecution mode: ${this.npmTaskExecution}`);
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
      trigger: { issue_comment: { types: ['created'] } },
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

export interface PeerDependencyOptions {
  /**
   * Automatically add a pinned dev dependency.
   * @default true
   */
  readonly pinnedDevDependency?: boolean;
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

  readonly uploadArtifact?: boolean;


  readonly trigger: { [event: string]: any };

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

interface NpmDependencies {
  readonly dependencies: Record<string, string>;
  readonly devDependencies: Record<string, string>;
  readonly peerDependencies: Record<string, string>;
}

function sorted<T>(toSort: T) {
  return () => {
    if (Array.isArray(toSort)) {
      return (toSort as unknown[]).sort();
    } else if (toSort != null && typeof toSort === 'object') {
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(toSort).sort(([l], [r]) => l.localeCompare(r))) {
        result[key] = value;
      }
      return result as T;
    } else {
      return toSort;
    }
  };
}
