import { Project, ProjectOptions } from './project';
import { JsonFile } from './json';
import { Semver } from './semver';
import { IgnoreFile } from './ignore-file';
import { License } from './license';
import { GENERATION_DISCLAIMER, PROJEN_RC, PROJEN_VERSION } from './common';
import { Lazy } from 'constructs';
import { Version } from './version';
import { GithubWorkflow } from './github-workflow';

const ANTITAMPER_COMMAND = [
  {
    name: 'Anti-tamper check',
    run: 'git diff --exit-code',
  },
];

export interface CommonOptions {
  readonly bundledDependencies?: string[];
  readonly dependencies?: Record<string, Semver>;
  readonly devDependencies?: Record<string, Semver>;
  readonly peerDependencies?: Record<string, Semver>;
  readonly peerDependencyOptions?: PeerDependencyOptions;
  readonly bin?: Record<string, string>;
  readonly keywords?: string[];

  /**
   * Should we commit `package.json` to git or ignore?
   *
   * @default false By default `package.json` is *not* committed. This means
   * that after you check out a repository you must run `npx projen` to
   * bootstrap it.
   */
  readonly commitPackageJson?: boolean;

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
}

export interface NodeProjectOptions extends ProjectOptions, CommonOptions {
  readonly name: string;
  readonly description?: string;
  readonly repository?: string;
  readonly repositoryDirectory?: string;
  readonly authorName?: string;
  readonly authorEmail?: string;
  readonly homepage?: string;
  readonly authorUrl?: string;
  readonly license?: string;
  readonly stability?: string;
  readonly gitignore?: string[];
  readonly npmignore?: string[];
  readonly nodeVersion?: Semver;
}

export class NodeProject extends Project {
  public readonly npmignore: IgnoreFile;

  private readonly peerDependencies: Record<string, string> = { };
  private readonly devDependencies: Record<string, string> = { };
  private readonly dependencies: Record<string, string> = { };
  private readonly bundledDependencies: string[] = [];
  private readonly scripts: Record<string, string> = { };
  private readonly bin: Record<string, string> = { };

  private readonly manifest: any;
  private readonly testCommands = new Array<string>();
  private readonly _version: Version;

  /**
   * The PR build GitHub workflow. `undefined` if `buildWorkflow` is disabled.
   */
  protected readonly buildWorkflow?: NodeBuildWorkflow;

  /**
   * The release GitHub workflow. `undefined` if `releaseWorkflow` is disabled.
   */
  protected readonly releaseWorkflow?: NodeBuildWorkflow;

  public readonly nodeVersion: Semver;

  constructor(options: NodeProjectOptions) {
    super(options);

    this.nodeVersion = options.nodeVersion ?? Semver.caret('14.0.2');

    this.manifest = {
      '//': GENERATION_DISCLAIMER,
      name: options.name,
      description: options.description,
      main: 'lib/index.js',
      repository: !options.repository ? undefined : {
        type: 'git',
        url: options.repository,
        directory: options.repositoryDirectory,
      },
      bin: this.bin,
      scripts: this.scripts,
      author: {
        name: options.authorName,
        email: options.authorEmail,
        url: options.authorUrl,
      },
      homepage: options.homepage,
      devDependencies: this.devDependencies,
      peerDependencies: this.peerDependencies,
      dependencies: this.dependencies,
      bundledDependencies: this.bundledDependencies,
      keywords: options.keywords,
      engines: { node: this.nodeVersion.spec },
    };

    const commitPackageJson = options.commitPackageJson ?? false;
    new JsonFile(this, 'package.json', {
      committed: commitPackageJson,
      obj: this.manifest,
    });

    this.addDependencies(options.dependencies ?? {});
    this.addPeerDependencies(options.peerDependencies ?? {});
    this.addDevDependencies(options.devDependencies ?? {});
    this.addBundledDependencies(...options.bundledDependencies ?? []);

    this.npmignore = new IgnoreFile(this, '.npmignore');

    this.addDefaultGitIgnore();

    // set license and produce license file
    const license = options.license ?? 'Apache-2.0';
    this.manifest.license = license;
    new License(this, license);

    this.addScripts({ projen: `node ${PROJEN_RC} && yarn install` });
    this.addScripts({ 'projen:upgrade': 'yarn upgrade projen && yarn projen' });

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

    this.addScripts({ test: Lazy.stringValue({ produce: () => this.renderTestCommand() }) });

    // version is read from a committed file called version.json which is how we bump
    this._version = new Version(this);
    this.manifest.version = this.version;

    if (options.buildWorkflow ?? true) {
      this.buildWorkflow = new NodeBuildWorkflow(this, 'Build', {
        trigger: { pull_request: { } },
        bootstrapSteps: options.workflowBootstrapSteps,
        image: options.workflowContainerImage,
        antitamper: options.antitamper,
      });
    }

    if (options.releaseWorkflow ?? true) {
      this.releaseWorkflow = new NodeBuildWorkflow(this, 'Release', {
        trigger: { push: { branches: [ 'master' ] } },
        uploadArtifact: true,
        bootstrapSteps: options.workflowBootstrapSteps,
        image: options.workflowContainerImage,
        antitamper: options.antitamper,
      });

      if (options.releaseToNpm) {
        this.releaseWorkflow.addJobs({
          release_npm: {
            'name': 'Release to NPM',
            'needs': this.releaseWorkflow.buildJobId,
            'runs-on': 'ubuntu-latest',
            'steps': [
              {
                'name': 'Download build artifacts',
                'uses': 'actions/download-artifact@v1',
                'with': {
                  'name': 'dist',
                },
              },
              {
                'name': 'Release',
                'run': 'npx -p jsii-release jsii-release-npm',
                'env': {
                  'NPM_TOKEN': '${{ secrets.NPM_TOKEN }}',
                },
              },
            ],
          },
        });
      }
    }
  }

  /**
   * Returns the current version of the project.
   */
  public get version() {
    return this._version.current;
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
  
  public addScripts(scripts: { [name: string]: string }) {
    for (const [ name, command ] of Object.entries(scripts)) {
      this.scripts[name] = command;
    }
  }

  public addTestCommands(...commands: string[]) {
    this.testCommands.push(...commands);
  }

  public addFields(fields: { [name: string]: any }) {
    for (const [ name, value ] of Object.entries(fields)) {
      this.manifest[name] = value;
    }
  }

  private renderTestCommand() {
    if (this.testCommands.length === 0) {
      return "echo 'no tests'";
    } else {
      return this.testCommands.join(' && ');
    }
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

  /**
   * Workflow steps to use in order to bootstrap this repo.
   * @default - [ { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' } ]
   */
  readonly bootstrapSteps?: any[];

  readonly uploadArtifact?: boolean;

  /**
   * Checks that after build there are no modified files onn git.
   * @default true
   */
  readonly antitamper?: boolean;

  readonly trigger: { [event: string]: any };
}

export class NodeBuildWorkflow extends GithubWorkflow {
  public readonly buildJobId: string;

  constructor(project: Project, name: string, options: NodeBuildWorkflowOptions) {
    super(project, name);

    this.buildJobId = 'build';

    this.on(options.trigger);

    const job: Record<string, any> = {
      'runs-on': 'ubuntu-latest',
      'steps': [
        { uses: 'actions/checkout@v2' },
        ...options.bootstrapSteps ?? DEFAULT_WORKFLOW_BOOTSTRAP,
        { run: 'yarn build' },
        ...(options.antitamper ?? true) ? ANTITAMPER_COMMAND : [],
      ],
    };

    if (options.image) {
      job.container = { image: options.image };
    }

    if (options.uploadArtifact) {
      job.steps.push({
        name: 'Upload artifact',
        uses: 'actions/upload-artifact@v1',
        with: {
          name: 'dist',
          path: 'dist',
        },
      });
    }

    this.addJobs({ [this.buildJobId]: job });
  }
}
