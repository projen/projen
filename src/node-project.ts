import { Project } from './project';
import { JsonFile } from './json';
import { Semver } from './semver';
import { IgnoreFile } from './ignore-file';
import { License } from './license';
import { GENERATION_DISCLAIMER, PROJEN_RC, PROJEN_VERSION } from './common';
import { Version } from './version';
import { GithubWorkflow } from './github-workflow';
import * as fs from 'fs-extra';
import * as path from 'path';
import { DependabotOptions, Dependabot } from './dependabot';
import { MergifyOptions, Mergify } from './mergify';
import { ProjenUpgrade } from './projen-upgrade';

export interface NodeProjectCommonOptions {
  readonly bundledDependencies?: string[];
  readonly dependencies?: Record<string, Semver>;
  readonly devDependencies?: Record<string, Semver>;
  readonly peerDependencies?: Record<string, Semver>;
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

  readonly keywords?: string[];

  /**
   * Version of projen to install.
   *
   * @default - latest version
   */
  readonly projenVersion?: Semver;

  /**
   * Indicates of "projen" should be installed as a devDependency.
   *
   * @default true
   */
  readonly projenDevDependency?: boolean;

  /**
   * Define a GitHub workflow for building PRs.
   * @default true
   */
  readonly buildWorkflow?: boolean;

  /**
   * Define a GitHub workflow for releasing from "master" when new versions are bumped.
   * @default true
   */
  readonly releaseWorkflow?: boolean;

  /**
   * Automatically release new versions every commit to one of branches in `releaseBranches`.
   * @default true
   */
  readonly releaseEveryCommit?: boolean;

  /**
   * CRON schedule to trigger new releases.
   * @default - no scheduled releases
   */
  readonly releaseSchedule?: string;

  /**
   * Branches which trigger a release.
   *
   * @default [ "master" ]
   */
  readonly releaseBranches?: string[];

  /**
   * Workflow steps to use in order to bootstrap this repo.
   *
   * @default - [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
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
   * @default true
   */
  readonly releaseToNpm?: boolean;

  /**
   * Checks that after build there are no modified files onn git.
   * @default true
   */
  readonly antitamper?: boolean;

  /**
   * Node.js version to require via package.json `engines` (inclusive).
   * @default - no "engines" specified
   */
  readonly minNodeVersion?: string;

  /**
   * Minimum node.js version to require via `engines` (inclusive).
   * @default - no max
   */
  readonly maxNodeVersion?: string;

  /**
   * The node version to use in GitHub workflows.
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
   * License copyright owner.
   *
   * @default - defaults to the value of authorName or "" if `authorName` is undefined.
   */
  readonly copyrightOwner?: string;

  /**
   * The copyright years to put in the LICENSE file.
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
   * @default true;
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
   * @default true
   */
  readonly mergify?: boolean;

  /**
   * Options for mergify
   * @default - default options
   */
  readonly mergifyOptions?: MergifyOptions;

  /**
  * CRON schedule for automatically bumping and releasing a new version.
  *
  * Set to `"never"` to disable the auto-release workflow.
  *
  * @default - every 6 hours
  */
  readonly autoReleaseSchedule?: string;

  /**
   * npm scripts to include. If a script has the same name as a standard script,
   * the standard script will be overwritten.
   *
   * @default {}
   */
  readonly scripts?: { [name: string]: string }

  /**
   * Define a `projen:upgrade` script and a scheduled github workflow which will
   * upgrade projen and submit a PR with the upgrade.
   *
   * @default true
   */
  readonly projenUpgrade?: boolean;
}

export interface NodeProjectOptions extends NodeProjectCommonOptions {
  /**
   * This is the name of your package. It gets used in URLs, as an argument on the command line,
   * and as the directory name inside node_modules.
   * See https://classic.yarnpkg.com/en/docs/package-json/#toc-name
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
   * See https://github.com/eladb/projen/tree/master/license-text for a list of supported licenses.
   */
  readonly license?: string;

  /**
   * Package's Stability
   */
  readonly stability?: string;

  /**
   * Additional entries to .gitignore
   */
  readonly gitignore?: string[];

  /**
   * Additional entries to .npmignore
   */
  readonly npmignore?: string[];
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

export class NodeProject extends Project {
  public readonly npmignore: IgnoreFile;
  public readonly mergify?: Mergify;

  private readonly peerDependencies: Record<string, string> = { };
  private readonly devDependencies: Record<string, string> = { };
  private readonly dependencies: Record<string, string> = { };
  private readonly bundledDependencies: string[] = [];
  private readonly scripts: Record<string, string[]>;
  private readonly bin: Record<string, string> = { };

  public readonly manifest: any;
  private readonly _version: Version;

  /**
   * The PR build GitHub workflow. `undefined` if `buildWorkflow` is disabled.
   */
  protected readonly buildWorkflow?: NodeBuildWorkflow;

  /**
   * The release GitHub workflow. `undefined` if `releaseWorkflow` is disabled.
   */
  protected readonly releaseWorkflow?: NodeBuildWorkflow;

  public readonly minNodeVersion?: string;
  public readonly maxNodeVersion?: string;

  private readonly bootstrapSteps?: any[];

  private readonly nodeVersion?: string;

  /**
   * Indicates if workflows have anti-tamper checks.
   */
  public readonly antitamper: boolean;

  protected readonly npmDistTag: string;

  constructor(options: NodeProjectOptions) {
    super();

    this.minNodeVersion = options.minNodeVersion;
    this.maxNodeVersion = options.maxNodeVersion;

    let nodeVersion = '';

    if (this.minNodeVersion) {
      nodeVersion += `>= ${this.minNodeVersion}`;
    }

    if (this.maxNodeVersion) {
      nodeVersion += ` <= ${this.maxNodeVersion}`;
    }

    this.npmDistTag = options.npmDistTag ?? 'latest';

    this.scripts = {};

    const renderScripts = () => {
      const result: any = {};
      for (const [name, commands] of Object.entries(this.scripts)) {
        const cmds = commands.length > 0 ? commands : [ 'echo "n/a"' ];
        result[name] = cmds.join(' && ');
      }
      return result;
    };

    this.manifest = {
      '//': GENERATION_DISCLAIMER,
      'name': options.name,
      'description': options.description,
      'main': 'lib/index.js',
      'repository': !options.repository ? undefined : {
        type: 'git',
        url: options.repository,
        directory: options.repositoryDirectory,
      },
      'bin': this.bin,
      'scripts': renderScripts,
      'author': {
        name: options.authorName,
        email: options.authorEmail,
        url: options.authorUrl,
        organization: options.authorOrganization ?? false,
      },
      'homepage': options.homepage,
      'devDependencies': this.devDependencies,
      'peerDependencies': this.peerDependencies,
      'dependencies': this.dependencies,
      'bundledDependencies': this.bundledDependencies,
      'keywords': options.keywords,
      'engines': nodeVersion !== '' ? { node: nodeVersion } : undefined,
    };

    new JsonFile(this, 'package.json', {
      obj: this.manifest,
    });

    this.addDependencies(options.dependencies ?? {});
    this.addPeerDependencies(options.peerDependencies ?? {});
    this.addDevDependencies(options.devDependencies ?? {});
    this.addBundledDependencies(...options.bundledDependencies ?? []);

    this.npmignore = new IgnoreFile(this, '.npmignore');
    this.addDefaultGitIgnore();

    if (options.gitignore?.length) {
      this.gitignore.comment('custom gitignore entries')
      for (const i of options.gitignore) {
        this.gitignore.exclude(i);
      }
    }

    if (options.npmignore?.length) {
      this.npmignore.comment('custom npmignore entries')
      for (const i of options.npmignore) {
        this.npmignore.exclude(i);
      }
    }

    // set license and produce license file
    const license = options.license ?? 'Apache-2.0';
    this.manifest.license = license;
    new License(this, license, {
      copyrightOwner: options.copyrightOwner ?? options.authorName,
      copyrightPeriod: options.copyrightPeriod,
    });

    this.addScript('projen', `node ${PROJEN_RC} && yarn install`);

    this.npmignore.comment('exclude project definition from npm module');
    this.npmignore.exclude(`/${PROJEN_RC}`);

    this.npmignore.comment('make sure to commit projen definition');
    this.gitignore.include(`/${PROJEN_RC}`);

    this.addBins(options.bin ?? { });

    const projen = options.projenDevDependency ?? true;
    if (projen) {
      const projenVersion = options.projenVersion ?? Semver.caret(PROJEN_VERSION);
      this.addDevDependencies({ projen: projenVersion });
    }

    // version is read from a committed file called version.json which is how we bump
    this._version = new Version(this);
    this.manifest.version = (outdir: string) => this._version.resolveVersion(outdir);

    this.bootstrapSteps = options.workflowBootstrapSteps;

    // indicate if we have anti-tamper configured in our workflows. used by e.g. Jest
    // to decide if we can always run with --updateSnapshot
    this.antitamper = (options.buildWorkflow ?? true) && (options.antitamper ?? true);
    this.nodeVersion = options.workflowNodeVersion ?? this.minNodeVersion;

    if (options.buildWorkflow ?? true) {
      this.buildWorkflow = new NodeBuildWorkflow(this, 'Build', {
        trigger: {
          pull_request: { },
          push: { },
        },
        image: options.workflowContainerImage,
      });
    }

    if (options.releaseWorkflow ?? true) {
      const releaseBranches = options.releaseBranches ?? [ 'master' ];

      const trigger: { [event: string]: any } = {};

      if (options.releaseEveryCommit ?? true) {
        trigger.push = { branches: releaseBranches };
      }

      if (options.releaseSchedule) {
        trigger.schedule = { cron: options.releaseSchedule };
      }

      this.releaseWorkflow = new NodeBuildWorkflow(this, 'Release', {
        trigger,
        bump: true,
        uploadArtifact: true,
        image: options.workflowContainerImage,
      });

      if (options.releaseToNpm) {
        this.releaseWorkflow.addJobs({
          release_npm: {
            'name': 'Release to NPM',
            'needs': this.releaseWorkflow.buildJobId,
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
                },
              },
            ],
          },
        });
      }
    }

    // automatically add all executable files under "bin"
    if (options.autoDetectBin ?? true) {
      const bindir = 'bin';

      if (fs.existsSync(bindir)) {
        for (const file of fs.readdirSync(bindir)) {
          try {
            fs.accessSync(path.join(bindir, file), fs.constants.X_OK);
            this.bin[file] = path.join(bindir, file);
          } catch (e) {
            // not executable, skip
          }
        }
      }
    }

    if (options.mergify ?? true) {
      this.mergify = new Mergify(this, options.mergifyOptions);

      this.mergify.addRule({
        name: 'Automatic merge on approval and successful build',
        conditions: [
          '#approved-reviews-by>=1',
          ...(this.buildWorkflow ? [ `status-success=${this.buildWorkflow.buildJobId}` ] : []),
        ],
        actions: {
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
        },
      });

      this.npmignore.exclude('/.mergify.yml');
    }

    if (options.dependabot ?? true) {
      new Dependabot(this, options.dependabotOptions);
    }

    if (options.projenUpgrade ?? true) {
      new ProjenUpgrade(this);
    }

    // override any scripts from options (if specified)
    for (const [n, v] of Object.entries(options.scripts ?? {})) {
      this.addScript(n, v);
    }
  }

  public addBins(bins: Record<string, string>) {
    for (const [ k, v ] of Object.entries(bins)) {
      this.bin[k] = v;
    }
  }

  public addDependencies(deps: { [module: string]: Semver }, bundle = false) {
    for (const [ k, v ] of Object.entries(deps)) {
      this.dependencies[k] = v.spec;

      if (bundle) {
        this.addBundledDependencies(k);
      }
    }
  }

  public addBundledDependencies(...deps: string[]) {
    for (const dep of deps) {
      if (!(dep in this.dependencies)) {
        throw new Error(`unable to bundle "${dep}". it has to also be defined as a dependency`);
      }

      if (dep in this.peerDependencies) {
        throw new Error(`unable to bundle "${dep}". it cannot appear as a peer dependency`);
      }

      this.bundledDependencies.push(dep);
    }
  }

  public addDevDependencies(deps: { [module: string]: Semver }) {
    for (const [ k, v ] of Object.entries(deps ?? {})) {
      this.devDependencies[k] = v.spec;
    }
  }

  public addPeerDependencies(deps: { [module: string]: Semver }, options: PeerDependencyOptions = {}) {
    const pinnedDevDependency = options.pinnedDevDependency ?? true;
    for (const [ k, v ] of Object.entries(deps)) {
      this.peerDependencies[k] = v.spec;

      if (pinnedDevDependency) {
        this.addDevDependencies({ [k]: Semver.pinned(v.version) });
      }
    }
  }

  /**
   * Replaces the contents of a set of npm package.json scripts.
   *
   * @param scripts script names and commands
   */
  public addScripts(scripts: { [name: string]: string }) {
    for (const [ name, command ] of Object.entries(scripts)) {
      this.addScript(name, command);
    }
  }

  /**
   * Replaces the contents of an npm package.json script.
   *
   * @param name The script namne
   * @param commands The commands to run (joined by "&&")
   */
  public addScript(name: string, ...commands: string[]) {
    this.scripts[name] = commands;
  }

  /**
   * Appends a command to run for an npm script. Joined by "&&"
   * @param name The name of the script
   * @param commands The commands to append.
   */
  public addScriptCommand(name: string, ...commands: string[]) {
    this.scripts[name] = this.scripts[name] ?? [];
    this.scripts[name].push(...commands);
  }

  /**
   * Adds that will be executed after the jsii compilation
   * @param commands The commands to execute during compile
   */
  public addCompileCommand(...commands: string[]) {
    this.addScriptCommand('compile', ...commands);
  }

  public addTestCommand(...commands: string[]) {
    this.addScriptCommand('test', ...commands);
  }

  public addFields(fields: { [name: string]: any }) {
    for (const [ name, value ] of Object.entries(fields)) {
      this.manifest[name] = value;
    }
  }

  /**
   * Returns a set of steps to checkout and bootstrap the project in a github
   * workflow.
   */
  public get workflowBootstrapSteps() {
    const nodeVersion = !this.nodeVersion ? [] : [
      {
        uses: 'actions/setup-node@v1',
        with: { 'node-version': this.nodeVersion },
      },
    ];

    return [
      // check out sources.
      { uses: 'actions/checkout@v2' },

      // use the correct node version
      ...nodeVersion,

      // bootstrap the repo
      ...this.bootstrapSteps ?? DEFAULT_WORKFLOW_BOOTSTRAP,

      // first anti-tamper check (right after bootstrapping)
      // this will identify any non-committed files genrated by projen
      ...this.workflowAntitamperSteps,
    ];
  }

  /**
   * Returns the set of steps to perform anti-tamper check in a github workflow.
   */
  public get workflowAntitamperSteps(): any[] {
    return this.antitamper
      ? [ { name: 'Anti-tamper check', run: 'git diff --exit-code' } ]
      : [];
  }

  private addDefaultGitIgnore()  {

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
}

export interface PeerDependencyOptions {
  /**
   * Automatically add a pinned dev dependency.
   * @default true
   */
  readonly pinnedDevDependency?: boolean;
}

const DEFAULT_WORKFLOW_BOOTSTRAP = [
  { run: `npx projen@${PROJEN_VERSION}` },
  { run: 'yarn install --frozen-lockfile' },
];

export interface NodeBuildWorkflowOptions  {
  /**
   * @default - default image
   */
  readonly image?: string;

  readonly uploadArtifact?: boolean;


  readonly trigger: { [event: string]: any };

  /**
   * Bump a new version for this build.
   * @default false
   */
  readonly bump?: boolean;
}

export class NodeBuildWorkflow extends GithubWorkflow {
  public readonly buildJobId: string;

  constructor(project: NodeProject, name: string, options: NodeBuildWorkflowOptions) {
    super(project, name);

    this.buildJobId = 'build';

    this.on(options.trigger);

    this.on({
      workflow_dispatch: {}, // allow manual triggering
    });

    const job: any = {
      'runs-on': 'ubuntu-latest',
      'steps': [
        // bootstrap
        ...project.workflowBootstrapSteps,

        // sets git identity so we can push later
        {
          name: 'Set git identity',
          run: [
            'git config user.name "Auto-bump"',
            'git config user.email "github-actions@github.com"',
          ].join('\n'),
        },

        // if there are changes, creates a bump commit
        ...options.bump ? [ { run: 'yarn bump' } ] : [],

        // build (compile + test)
        { run: 'yarn build' },

        // anti-tamper check (fails if there were changes to committed files)
        // this will identify any non-commited files generated during build (e.g. test snapshots)
        ...project.workflowAntitamperSteps,

        // push bump commit
        ...options.bump ? [ { run: 'git push --follow-tags origin $GITHUB_REF' } ] : [],
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

    this.addJobs({ [this.buildJobId]: job });
  }
}
