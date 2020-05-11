import { Project, ProjectOptions } from './project';
import * as fs from 'fs';
import { JsonFile } from './json';
import { Semver } from './semver';
import { IgnoreFile } from './ignore-file';
import { License } from './license';
import { GENERATION_DISCLAIMER } from './common';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const PROJEN_VERSION = require('../package.json').version;

export interface CommonOptions {
  readonly bundledDependencies?: string[];
  readonly dependencies?: Record<string, Semver>;
  readonly devDependencies?: Record<string, Semver>;
  readonly peerDependencies?: Record<string, Semver>;
  readonly peerDependencyOptions?: PeerDependencyOptions;
  readonly bin?: Record<string, string>;

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
}

export interface NodeProjectOptions extends ProjectOptions, CommonOptions {
  readonly name: string;
  readonly description?: string;
  readonly repository?: string;
  readonly authorName?: string;
  readonly authorEmail?: string;
  readonly license?: string;
  readonly stability?: string;
  readonly gitignore?: string[];
  readonly npmignore?: string[];
}

export class NodeProject extends Project {
  public readonly gitignore: IgnoreFile;
  public readonly npmignore: IgnoreFile;

  private readonly peerDependencies: Record<string, string> = { };
  private readonly devDependencies: Record<string, string> = { };
  private readonly dependencies: Record<string, string> = { };
  private readonly bundledDependencies: string[] = [];
  private readonly scripts: Record<string, string> = { };
  private readonly bin: Record<string, string> = { };

  private readonly manifest: any;


  constructor(options: NodeProjectOptions) {
    super(options);

    this.manifest = {
      '//': GENERATION_DISCLAIMER,
      name: options.name,
      version: this.resolveVersion(),
      description: options.description,
      main: 'lib/index.js',
      repository: !options.repository ? undefined : {
        type: 'git',
        url: options.repository,
      },
      bin: this.bin,
      scripts: this.scripts,
      author: {
        name: options.authorName,
        email: options.authorEmail,
      },
      devDependencies: this.devDependencies,
      peerDependencies: this.peerDependencies,
      dependencies: this.dependencies,
      bundledDependencies: this.bundledDependencies,
    };

    new JsonFile(this, 'package.json', this.manifest);

    this.addDependencies(options.dependencies ?? {});
    this.addPeerDependencies(options.peerDependencies ?? {});
    this.addDevDependencies(options.devDependencies ?? {});
    this.addBundledDependencies(...options.bundledDependencies ?? []);

    this.gitignore = new IgnoreFile(this, '.gitignore');
    this.npmignore = new IgnoreFile(this, '.npmignore');

    this.addDefaultGitIgnore();

    // set license and produce license file
    const license = options.license ?? 'Apache-2.0';
    this.manifest.license = license;
    new License(this, license);

    this.addScripts({ projen: 'node projen.js && yarn install' });
    this.npmignore.exclude('projen.js');
    this.gitignore.include('projen.js');

    this.addBins(options.bin ?? { });

    const projen = options.projenDevDependency ?? true;
    if (projen) {
      const projenVersion = options.projenVersion ?? Semver.caret(PROJEN_VERSION);
      this.addDevDependencies({ projen: projenVersion });
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
    for (const [ k, v ] of Object.entries(deps)) {
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

  public addFields(fields: { [name: string]: any }) {
    for (const [ name, value ] of Object.entries(fields)) {
      this.manifest[name] = value;
    }
  }

  private resolveVersion() {
    const versionFile = `${this.outdir}/version.json`;
    if (!fs.existsSync(versionFile)) {
      fs.writeFileSync(versionFile, { version: '0.0.0' });
    }


    return JSON.parse(fs.readFileSync(versionFile, 'utf-8')).version;
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