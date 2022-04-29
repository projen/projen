import { readFileSync } from "fs";
import { join } from "path";
import { parse as urlparse } from "url";
import {
  accessSync,
  constants,
  existsSync,
  readdirSync,
  readJsonSync,
} from "fs-extra";
import { resolve as resolveJson } from "../_resolve";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { JsonFile } from "../json";
import { Project } from "../project";
import { isAwsCodeArtifactRegistry } from "../release";
import { Task } from "../task";
import { exec, isTruthy, sorted, writeFile } from "../util";
import {
  determineLockfile,
  extractCodeArtifactDetails,
  minVersion,
} from "./util";
import { Wireit } from "./wireit";

const UNLICENSED = "UNLICENSED";
const DEFAULT_NPM_REGISTRY_URL = "https://registry.npmjs.org/";
const GITHUB_PACKAGES_REGISTRY = "npm.pkg.github.com";
const DEFAULT_NPM_TOKEN_SECRET = "NPM_TOKEN";
const DEFAULT_GITHUB_TOKEN_SECRET = "GITHUB_TOKEN";

export interface NodePackageOptions {
  /**
   * The "name" in package.json
   * @default - defaults to project name
   * @featured
   */
  readonly packageName?: string;
  /**
   * The description is just a string that helps people understand the purpose of the package.
   * It can be used when searching for packages in a package manager as well.
   * See https://classic.yarnpkg.com/en/docs/package-json/#toc-description
   * @featured
   */
  readonly description?: string;

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
   * @featured
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
   * @featured
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
   * added both to the `dependencies` section and `bundledDependencies` section of
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
   * Allow the project to include `peerDependencies` and `bundledDependencies`.
   * This is normally only allowed for libraries. For apps, there's no meaning
   * for specifying these.
   *
   * @default true
   */
  readonly allowLibraryDependencies?: boolean;

  /**
   * Keywords to include in `package.json`.
   */
  readonly keywords?: string[];

  /**
   * Module entrypoint (`main` in `package.json`)
   *
   * Set to an empty string to not include `main` in your package.json
   *
   * @default "lib/index.js"
   */
  readonly entrypoint?: string;

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
   * npm scripts to include. If a script has the same name as a standard script,
   * the standard script will be overwritten.
   *
   * @default {}
   */
  readonly scripts?: { [name: string]: string };

  /**
   * The Node Package Manager used to execute scripts
   *
   * @default NodePackageManager.YARN
   */
  readonly packageManager?: NodePackageManager;

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
   * Package's Stability
   */
  readonly stability?: string;

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
   * License's SPDX identifier.
   * See https://github.com/projen/projen/tree/main/license-text for a list of supported licenses.
   * Use the `licensed` option if you want to no license to be specified.
   *
   * @default "Apache-2.0"
   */
  readonly license?: string;

  /**
   * Indicates if a license should be added.
   *
   * @default true
   */
  readonly licensed?: boolean;

  /**
   * The base URL of the npm package registry.
   *
   * Must be a URL (e.g. start with "https://" or "http://")
   *
   * @default "https://registry.npmjs.org"
   */
  readonly npmRegistryUrl?: string;

  /**
   * The host name of the npm registry to publish to. Cannot be set together with `npmRegistryUrl`.
   *
   * @deprecated use `npmRegistryUrl` instead
   */
  readonly npmRegistry?: string;

  /**
   * The url to your project's issue tracker.
   */
  readonly bugsUrl?: string;

  /**
   * The email address to which issues should be reported.
   */
  readonly bugsEmail?: string;

  /**
   * Access level of the npm package.
   *
   * @default - for scoped packages (e.g. `foo@bar`), the default is
   * `NpmAccess.RESTRICTED`, for non-scoped packages, the default is
   * `NpmAccess.PUBLIC`.
   */
  readonly npmAccess?: NpmAccess;

  /**
   * GitHub secret which contains the NPM token to use when publishing packages.
   *
   * @default "NPM_TOKEN"
   */
  readonly npmTokenSecret?: string;

  /**
   * Options for npm packages using AWS CodeArtifact.
   * This is required if publishing packages to, or installing scoped packages from AWS CodeArtifact
   *
   * @default - undefined
   */
  readonly codeArtifactOptions?: CodeArtifactOptions;

  /**
   * Options for privately hosted scoped packages
   *
   * @default - fetch all scoped packages from the public npm registry
   */
  readonly scopedPackagesOptions?: ScopedPackagesOptions[];
}

export interface CodeArtifactOptions {
  /**
   * GitHub secret which contains the AWS access key ID to use when publishing packages to AWS CodeArtifact.
   * This property must be specified only when publishing to AWS CodeArtifact (`npmRegistryUrl` contains AWS CodeArtifact URL).
   *
   * @default "AWS_ACCESS_KEY_ID"
   */
  readonly accessKeyIdSecret?: string;

  /**
   * GitHub secret which contains the AWS secret access key to use when publishing packages to AWS CodeArtifact.
   * This property must be specified only when publishing to AWS CodeArtifact (`npmRegistryUrl` contains AWS CodeArtifact URL).
   *
   * @default "AWS_SECRET_ACCESS_KEY"
   */
  readonly secretAccessKeySecret?: string;

  /**
   * ARN of AWS role to be assumed prior to get authorization token from AWS CodeArtifact
   * This property must be specified only when publishing to AWS CodeArtifact (`registry` contains AWS CodeArtifact URL).
   *
   * @default undefined
   */
  readonly roleToAssume?: string;
}

/**
 * Options for scoped packages
 */
export interface ScopedPackagesOptions {
  /**
   * Scope of the packages
   *
   * @example "@angular"
   */
  readonly scope: string;

  /**
   * URL of the registry for scoped packages
   */
  readonly registryUrl: string;
}

/**
 * Represents the npm `package.json` file.
 */
export class NodePackage extends Component {
  /**
   * The name of the npm package.
   */
  public readonly packageName: string;

  /**
   * The module's entrypoint (e.g. `lib/index.js`).
   */
  public readonly entrypoint: string;

  /**
   * Allow project to take library dependencies.
   */
  public readonly allowLibraryDependencies: boolean;

  /**
   * The package manager to use.
   */
  public readonly packageManager: NodePackageManager;

  /**
   * @deprecated use `addField(x, y)`
   */
  public readonly manifest: any;

  /**
   * Minimum node.js version required by this package.
   * @default - no minimum
   */
  public readonly minNodeVersion?: string;

  /**
   * Maximum node version required by this pacakge.
   * @default - no maximum.
   */
  public readonly maxNodeVersion?: string;

  /**
   * The SPDX license of this module. `undefined` if this package is not licensed.
   */
  public readonly license?: string;

  /**
   * npm registry (e.g. `https://registry.npmjs.org`). Use `npmRegistryHost` to get just the host name.
   */
  public readonly npmRegistryUrl: string;

  /**
   * The npm registry host (e.g. `registry.npmjs.org`).
   */
  public readonly npmRegistry: string;

  /**
   * GitHub secret which contains the NPM token to use when publishing packages.
   */
  public readonly npmTokenSecret?: string;

  /**
   * Options for npm packages using AWS CodeArtifact.
   * This is required if publishing packages to, or installing scoped packages from AWS CodeArtifact
   *
   * @default - undefined
   */
  readonly codeArtifactOptions?: CodeArtifactOptions;

  /**
   * Options for privately hosted scoped packages
   *
   * @default undefined
   */
  readonly scopedPackagesOptions?: ScopedPackagesOptions[];

  /**
   * npm package access level.
   */
  public readonly npmAccess: NpmAccess;

  /**
   * The name of the lock file.
   */
  public readonly lockFile: string;

  private readonly keywords: Set<string> = new Set();
  private readonly bin: Record<string, string> = {};
  private readonly engines: Record<string, string> = {};
  private readonly peerDependencyOptions: PeerDependencyOptions;
  private readonly file: JsonFile;
  private _renderedDeps?: NpmDependencies;

  constructor(project: Project, options: NodePackageOptions = {}) {
    super(project);

    this.packageName = options.packageName ?? project.name;
    this.peerDependencyOptions = {
      pinnedDevDependency: true,
      ...options.peerDependencyOptions,
    };
    this.allowLibraryDependencies = options.allowLibraryDependencies ?? true;
    this.packageManager = options.packageManager ?? NodePackageManager.YARN;
    this.entrypoint = options.entrypoint ?? "lib/index.js";
    this.lockFile = determineLockfile(this.packageManager);

    this.project.annotateGenerated(`/${this.lockFile}`);

    const {
      npmAccess,
      npmRegistry,
      npmRegistryUrl,
      npmTokenSecret,
      codeArtifactOptions,
      scopedPackagesOptions,
    } = this.parseNpmOptions(options);
    this.npmAccess = npmAccess;
    this.npmRegistry = npmRegistry;
    this.npmRegistryUrl = npmRegistryUrl;
    this.npmTokenSecret = npmTokenSecret;
    this.codeArtifactOptions = codeArtifactOptions;
    this.scopedPackagesOptions = scopedPackagesOptions;

    this.processDeps(options);

    this.addCodeArtifactLoginScript();

    const prev = this.readPackageJson() ?? {};

    // empty objects are here to preserve order for backwards compatibility
    this.manifest = {
      name: this.packageName,
      description: options.description,
      repository: !options.repository
        ? undefined
        : {
            type: "git",
            url: options.repository,
            directory: options.repositoryDirectory,
          },
      bin: () => this.renderBin(),
      scripts: () => this.renderScripts(),
      author: this.renderAuthor(options),
      devDependencies: {},
      peerDependencies: {},
      dependencies: {},
      bundledDependencies: [],
      keywords: () => this.renderKeywords(),
      engines: () => this.renderEngines(),
      main: this.entrypoint !== "" ? this.entrypoint : undefined,
      license: () => this.license ?? UNLICENSED,
      homepage: options.homepage,
      publishConfig: () => this.renderPublishConfig(),
      wireit: () => this.renderWireitConfig(),

      // in release CI builds we bump the version before we run "build" so we want
      // to preserve the version number. otherwise, we always set it to 0.0.0
      version: this.determineVersion(prev?.version),
      bugs:
        options.bugsEmail || options.bugsUrl
          ? {
              email: options.bugsEmail,
              url: options.bugsUrl,
            }
          : undefined,
    };

    // override any scripts from options (if specified)
    for (const [cmdname, shell] of Object.entries(options.scripts ?? {})) {
      project.addTask(cmdname, { exec: shell });
    }

    this.file = new JsonFile(this.project, "package.json", {
      obj: this.manifest,
      readonly: false, // we want "yarn add" to work and we have anti-tamper
      newline: false, // when file is edited by npm/yarn it doesn't include a newline
    });

    this.addKeywords(...(options.keywords ?? []));
    this.addBin(options.bin ?? {});

    // automatically add all executable files under "bin"
    if (options.autoDetectBin ?? true) {
      this.autoDiscoverBinaries();
    }

    // node version
    this.minNodeVersion = options.minNodeVersion;
    this.maxNodeVersion = options.maxNodeVersion;
    this.addNodeEngine();

    // license
    if (options.licensed ?? true) {
      this.license = options.license ?? "Apache-2.0";
    }

    // changing package.json should update the cache key and cause the task
    // to be run fresh
    project.defaultTask?.addInputs("package.json");
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
      this.project.deps.addDependency(dep, DependencyType.RUNTIME);
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
      this.project.deps.addDependency(dep, DependencyType.BUILD);
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
      throw new Error(
        `cannot add peer dependencies to an APP project: ${Object.keys(
          deps
        ).join(",")}`
      );
    }

    for (const dep of deps) {
      this.project.deps.addDependency(dep, DependencyType.PEER);
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
      throw new Error(
        `cannot add bundled dependencies to an APP project: ${deps.join(",")}`
      );
    }

    for (const dep of deps) {
      this.project.deps.addDependency(dep, DependencyType.BUNDLED);
    }
  }

  /**
   * Adds an `engines` requirement to your package.
   * @param engine The engine (e.g. `node`)
   * @param version The semantic version requirement (e.g. `^10`)
   */
  public addEngine(engine: string, version: string) {
    this.engines[engine] = version;
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

  public addBin(bins: Record<string, string>) {
    for (const [k, v] of Object.entries(bins)) {
      this.bin[k] = v;
    }
  }

  /**
   * Override the contents of an npm package.json script.
   *
   * @param name The script name
   * @param command The command to execute
   */
  public setScript(name: string, command: string) {
    this.file.addOverride(`scripts.${name}`, command);
  }

  /**
   * Removes the npm script (always successful).
   * @param name The name of the script.
   */
  public removeScript(name: string) {
    this.file.addDeletionOverride(`scripts.${name}`);
  }

  /**
   * Indicates if a script by the given name is defined.
   * @param name The name of the script
   * @deprecated Use `project.tasks.tryFind(name)`
   */
  public hasScript(name: string) {
    return this.project.tasks.tryFind(name) !== undefined;
  }

  /**
   * Directly set fields in `package.json`.
   * @escape
   * @param name field name
   * @param value field value
   */
  public addField(name: string, value: any) {
    this.manifest[name] = value;
  }

  /**
   * Sets the package version.
   * @param version Package version.
   */
  public addVersion(version: string) {
    this.manifest.version = version;
  }

  /**
   * Returns the command to execute in order to install all dependencies (always frozen).
   */
  public get installCommand() {
    return this.renderInstallCommand(true);
  }

  /**
   * Renders `yarn install` or `npm install` with lockfile update (not frozen)
   */
  public get installAndUpdateLockfileCommand() {
    return this.renderInstallCommand(false);
  }

  /**
   * Render a package manager specific command to upgrade all requested dependencies.
   */
  public renderUpgradePackagesCommand(
    exclude: string[],
    include?: string[]
  ): string {
    const project = this.project;
    function upgradePackages(command: string) {
      return () => {
        if (exclude.length === 0 && !include) {
          // request to upgrade all packages
          // separated for asthetic reasons.
          return command;
        }

        // filter by exclude and include.
        return `${command} ${project.deps.all
          .map((d) => d.name)
          .filter((d) => (include ? include.includes(d) : true))
          .filter((d) => !exclude.includes(d))
          .join(" ")}`;
      };
    }

    let lazy = undefined;
    switch (this.packageManager) {
      case NodePackageManager.YARN:
        lazy = upgradePackages("yarn upgrade");
        break;
      case NodePackageManager.NPM:
        lazy = upgradePackages("npm update");
        break;
      case NodePackageManager.PNPM:
        lazy = upgradePackages("pnpm update");
        break;
      default:
        throw new Error(`unexpected package manager ${this.packageManager}`);
    }

    // return a lazy function so that dependencies include ones that were
    // added post project instantiation (i.e using project.addDeps)
    return lazy as unknown as string;
  }

  // ---------------------------------------------------------------------------------------

  public preSynthesize() {
    super.preSynthesize();
    this._renderedDeps = this.renderDependencies();
  }

  public postSynthesize() {
    super.postSynthesize();

    // only run "install" if package.json has changed or if we don't have a
    // `node_modules` directory.
    if (
      this.file.changed ||
      !existsSync(join(this.project.outdir, "node_modules"))
    ) {
      this.installDependencies();
    }

    // resolve "*" deps in package.json and update it. if it was changed,
    // install deps again so that lockfile is updated.
    if (this.resolveDepsAndWritePackageJson()) {
      this.installDependencies();
    }
  }

  /**
   * The command which executes "projen".
   */
  public get projenCommand() {
    return this.project.projenCommand;
  }

  /**
   * Returns `true` if we are running within a CI build.
   */
  private get isAutomatedBuild(): boolean {
    return isTruthy(process.env.CI);
  }

  private determineVersion(currVersion?: string) {
    if (!this.isReleaseBuild) {
      return "0.0.0";
    }

    return currVersion ?? "0.0.0";
  }

  /**
   * Returns `true` if this is a CI release build.
   */
  private get isReleaseBuild(): boolean {
    return isTruthy(process.env.RELEASE);
  }

  // -------------------------------------------------------------------------------------------

  private parseNpmOptions(options: NodePackageOptions) {
    let npmRegistryUrl = options.npmRegistryUrl;
    if (options.npmRegistry) {
      if (npmRegistryUrl) {
        throw new Error(
          'cannot use the deprecated "npmRegistry" together with "npmRegistryUrl". please use "npmRegistryUrl" instead.'
        );
      }

      npmRegistryUrl = `https://${options.npmRegistry}`;
    }

    const npmr = urlparse(npmRegistryUrl ?? DEFAULT_NPM_REGISTRY_URL);
    if (!npmr || !npmr.hostname || !npmr.href) {
      throw new Error(
        `unable to determine npm registry host from url ${npmRegistryUrl}. Is this really a URL?`
      );
    }

    const npmAccess = options.npmAccess ?? defaultNpmAccess(this.packageName);
    if (!isScoped(this.packageName) && npmAccess === NpmAccess.RESTRICTED) {
      throw new Error(
        `"npmAccess" cannot be RESTRICTED for non-scoped npm package "${this.packageName}"`
      );
    }

    const isAwsCodeArtifact = isAwsCodeArtifactRegistry(npmRegistryUrl);
    const hasScopedPackage =
      options.scopedPackagesOptions &&
      options.scopedPackagesOptions.length !== 0;

    if (isAwsCodeArtifact) {
      if (options.npmTokenSecret) {
        throw new Error(
          '"npmTokenSecret" must not be specified when publishing AWS CodeArtifact.'
        );
      }
    } else {
      if (
        (options.codeArtifactOptions?.accessKeyIdSecret ||
          options.codeArtifactOptions?.secretAccessKeySecret ||
          options.codeArtifactOptions?.roleToAssume) &&
        !hasScopedPackage
      ) {
        throw new Error(
          "codeArtifactOptions must only be specified when publishing AWS CodeArtifact or used in scoped packages."
        );
      }
    }

    // apply defaults for AWS CodeArtifact
    let codeArtifactOptions: CodeArtifactOptions | undefined;
    if (isAwsCodeArtifact || hasScopedPackage) {
      codeArtifactOptions = {
        accessKeyIdSecret:
          options.codeArtifactOptions?.accessKeyIdSecret ?? "AWS_ACCESS_KEY_ID",
        secretAccessKeySecret:
          options.codeArtifactOptions?.secretAccessKeySecret ??
          "AWS_SECRET_ACCESS_KEY",
        roleToAssume: options.codeArtifactOptions?.roleToAssume,
      };
    }

    return {
      npmAccess,
      npmRegistry: npmr.hostname + this.renderNpmRegistryPath(npmr.pathname!),
      npmRegistryUrl: npmr.href,
      npmTokenSecret: defaultNpmToken(options.npmTokenSecret, npmr.hostname),
      codeArtifactOptions,
      scopedPackagesOptions: this.parseScopedPackagesOptions(
        options.scopedPackagesOptions
      ),
    };
  }

  private parseScopedPackagesOptions(
    scopedPackagesOptions?: ScopedPackagesOptions[]
  ): ScopedPackagesOptions[] | undefined {
    if (!scopedPackagesOptions) {
      return undefined;
    }

    return scopedPackagesOptions.map((option): ScopedPackagesOptions => {
      if (!isScoped(option.scope)) {
        throw new Error(
          `Scope must start with "@" in options, found ${option.scope}`
        );
      }

      if (!isAwsCodeArtifactRegistry(option.registryUrl)) {
        throw new Error(
          `Only AWS Code artifact scoped registry is supported for now, found ${option.registryUrl}`
        );
      }

      const result: ScopedPackagesOptions = {
        registryUrl: option.registryUrl,
        scope: option.scope,
      };

      return result;
    });
  }

  private addCodeArtifactLoginScript() {
    if (
      !this.scopedPackagesOptions ||
      this.scopedPackagesOptions.length === 0
    ) {
      return;
    }

    this.project.addTask("ca:login", {
      requiredEnv: ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"],
      steps: [
        { exec: "which aws" }, // check that AWS CLI is installed
        ...this.scopedPackagesOptions.map((scopedPackagesOption) => {
          const { registryUrl, scope } = scopedPackagesOption;
          const { domain, region, accountId, registry } =
            extractCodeArtifactDetails(registryUrl);
          // reference: https://docs.aws.amazon.com/codeartifact/latest/ug/npm-auth.html
          const commands = [
            `npm config set ${scope}:registry ${registryUrl}`,
            `CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain ${domain} --region ${region} --domain-owner ${accountId} --query authorizationToken --output text)`,
            `npm config set //${registry}:_authToken=$CODEARTIFACT_AUTH_TOKEN`,
            `npm config set //${registry}:always-auth=true`,
          ];
          return {
            exec: commands.join("; "),
          };
        }),
      ],
    });
  }

  private addNodeEngine() {
    if (!this.minNodeVersion && !this.maxNodeVersion) {
      return;
    }

    let nodeVersion = "";
    if (this.minNodeVersion) {
      nodeVersion += `>= ${this.minNodeVersion}`;
    }
    if (this.maxNodeVersion) {
      nodeVersion += ` <= ${this.maxNodeVersion}`;
    }
    this.addEngine("node", nodeVersion);
  }

  private renderNpmRegistryPath(path: string | undefined): string {
    if (!path || path == "/") {
      return "";
    } else {
      return path;
    }
  }

  private renderInstallCommand(frozen: boolean) {
    switch (this.packageManager) {
      case NodePackageManager.YARN:
        return [
          "yarn install",
          "--check-files", // ensure all modules exist (especially projen which was just removed).
          ...(frozen ? ["--frozen-lockfile"] : []),
        ].join(" ");

      case NodePackageManager.NPM:
        return frozen ? "npm ci" : "npm install";

      case NodePackageManager.PNPM:
        return frozen
          ? "pnpm i --frozen-lockfile"
          : "pnpm i --no-frozen-lockfile";

      default:
        throw new Error(`unexpected package manager ${this.packageManager}`);
    }
  }

  private processDeps(options: NodePackageOptions) {
    this.addDeps(...(options.deps ?? []));
    this.addDevDeps(...(options.devDeps ?? []));
    this.addPeerDeps(...(options.peerDeps ?? []));
    this.addBundledDeps(...(options.bundledDeps ?? []));
  }

  private renderDependencies(): NpmDependencies {
    const devDependencies: Record<string, string> = {};
    const peerDependencies: Record<string, string> = {};
    const dependencies: Record<string, string> = {};
    const bundledDependencies = new Array<string>();

    // synthetic dependencies: add a pinned build dependency to ensure we are
    // testing against the minimum requirement of the peer.
    if (this.peerDependencyOptions.pinnedDevDependency) {
      for (const dep of this.project.deps.all.filter(
        (d) => d.type === DependencyType.PEER
      )) {
        let req = dep.name;

        // skip if we already have a runtime dependency on this peer
        if (
          this.project.deps.tryGetDependency(dep.name, DependencyType.RUNTIME)
        ) {
          continue;
        }

        if (dep.version) {
          const ver = minVersion(dep.version);
          if (!ver) {
            throw new Error(
              `unable to determine minimum semver for peer dependency ${dep.name}@${dep.version}`
            );
          }

          req += "@" + ver;
        }
        this.addDevDeps(req);
      }
    }

    for (const dep of this.project.deps.all) {
      const version = dep.version ?? "*";

      switch (dep.type) {
        case DependencyType.BUNDLED:
          bundledDependencies.push(dep.name);

          if (
            this.project.deps.all.find(
              (d) => d.name === dep.name && d.type === DependencyType.PEER
            )
          ) {
            throw new Error(
              `unable to bundle "${dep.name}". it cannot appear as a peer dependency`
            );
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

    // returns a lazy value to normalize during synthesis
    const normalize = (obj: any) => () => sorted(obj);

    // update the manifest we are about to save into `package.json`
    this.manifest.devDependencies = normalize(devDependencies);
    this.manifest.peerDependencies = normalize(peerDependencies);
    this.manifest.dependencies = normalize(dependencies);
    this.manifest.bundledDependencies = sorted(bundledDependencies);

    // nothing further to do if package.json file does not exist
    const pkg = this.readPackageJson();
    if (!pkg) {
      return { devDependencies, peerDependencies, dependencies };
    }

    const readDeps = (
      user: Record<string, string>,
      current: Record<string, string> = {}
    ) => {
      for (const [name, userVersion] of Object.entries(user)) {
        const currentVersion = current[name];

        // respect user version if it's not '*' or if current version is undefined
        if (userVersion !== "*" || !currentVersion || currentVersion === "*") {
          continue;
        }

        // memoize current version in memory so it is preserved when saving
        user[name] = currentVersion;
      }

      // report removals
      for (const name of Object.keys(current ?? {})) {
        if (!user[name]) {
          this.project.logger.verbose(`${name}: removed`);
        }
      }
    };

    readDeps(devDependencies, pkg.devDependencies);
    readDeps(dependencies, pkg.dependencies);
    readDeps(peerDependencies, pkg.peerDependencies);

    return { devDependencies, dependencies, peerDependencies };
  }

  /**
   * Resolves any deps that do not have a specified version (e.g. `*`) and
   * update `package.json` if needed.
   *
   * @returns `true` if package.json was updated or `false` if not.
   */
  private resolveDepsAndWritePackageJson(): boolean {
    const outdir = this.project.outdir;
    const rootPackageJson = join(outdir, "package.json");

    const original = readFileSync(rootPackageJson, "utf8");
    const pkg = JSON.parse(original);

    const resolveDeps = (
      current: { [name: string]: string },
      user: Record<string, string>
    ) => {
      const result: Record<string, string> = {};
      current = current ?? {};
      user = user ?? {};

      for (const [name, currentDefinition] of Object.entries(user)) {
        // find actual version from node_modules
        let desiredVersion = currentDefinition;

        if (currentDefinition === "*") {
          try {
            const modulePath = require.resolve(`${name}/package.json`, {
              paths: [outdir],
            });
            const module = readJsonSync(modulePath);
            desiredVersion = `^${module.version}`;
          } catch (e) {}

          if (!desiredVersion) {
            this.project.logger.warn(
              `unable to resolve version for ${name} from installed modules`
            );
            continue;
          }
        }

        if (currentDefinition !== desiredVersion) {
          this.project.logger.verbose(
            `${name}: ${currentDefinition} => ${desiredVersion}`
          );
        }

        result[name] = desiredVersion;
      }

      // print removed packages
      for (const name of Object.keys(current)) {
        if (!result[name]) {
          this.project.logger.verbose(`${name} removed`);
        }
      }

      return result;
    };

    const rendered = this._renderedDeps;
    if (!rendered) {
      throw new Error("assertion failed");
    }

    const deps = resolveDeps(pkg.dependencies, rendered.dependencies);
    const devDeps = resolveDeps(pkg.devDependencies, rendered.devDependencies);
    const peerDeps = resolveDeps(
      pkg.peerDependencies,
      rendered.peerDependencies
    );

    if (this.peerDependencyOptions.pinnedDevDependency) {
      for (const [name, version] of Object.entries(peerDeps)) {
        // Skip if we already have a runtime dependency on this peer
        // or if devDependency version is already set.
        // Relies on the "*" devDependency added in the presynth step
        if (deps[name] || rendered.devDependencies[name] !== "*") {
          continue;
        }

        // Take version and pin as dev dependency
        const ver = minVersion(version);
        if (!ver) {
          throw new Error(
            `unable to determine minimum semver for peer dependency ${name}@${version}`
          );
        }

        devDeps[name] = ver;
      }
    }

    pkg.dependencies = sorted(deps);
    pkg.devDependencies = sorted(devDeps);
    pkg.peerDependencies = sorted(peerDeps);

    const jsonContent = JSON.stringify(pkg, undefined, 2);

    const updated =
      this.packageManager === NodePackageManager.NPM
        ? `${jsonContent}\n`
        : jsonContent;

    if (original === updated) {
      return false;
    }

    writeFile(rootPackageJson, updated);
    return true;
  }

  private renderPublishConfig() {
    // omit values if they are the same as the npm defaults
    return resolveJson(
      {
        registry:
          this.npmRegistryUrl !== DEFAULT_NPM_REGISTRY_URL
            ? this.npmRegistryUrl
            : undefined,
        access:
          this.npmAccess !== defaultNpmAccess(this.packageName)
            ? this.npmAccess
            : undefined,
      },
      { omitEmpty: true }
    );
  }

  private renderKeywords() {
    const kwds = Array.from(this.keywords);
    return sorted(kwds.sort());
  }

  private renderEngines() {
    return sorted(this.engines);
  }

  private autoDiscoverBinaries() {
    const binrel = "bin";
    const bindir = join(this.project.outdir, binrel);
    if (existsSync(bindir)) {
      for (const file of readdirSync(bindir)) {
        try {
          accessSync(join(bindir, file), constants.X_OK);
          this.bin[file] = join(binrel, file).replace(/\\/g, "/");
        } catch (e) {
          // not executable, skip
        }
      }
    }
  }

  private renderAuthor(options: NodePackageOptions) {
    let author;
    if (options.authorName) {
      author = {
        name: options.authorName,
        email: options.authorEmail,
        url: options.authorUrl,
        organization: options.authorOrganization ?? false,
      };
    } else {
      if (
        options.authorEmail ||
        options.authorUrl ||
        options.authorOrganization !== undefined
      ) {
        throw new Error(
          '"authorName" is required if specifying "authorEmail" or "authorUrl"'
        );
      }
    }
    return author;
  }

  private renderBin() {
    return sorted(this.bin);
  }

  private renderScripts() {
    const result: any = {};
    const wireit = Wireit.of(this.project);
    for (const task of this.project.tasks.all.sort((x, y) =>
      x.name.localeCompare(y.name)
    )) {
      if (wireit) {
        result[task.name] = "wireit";
      } else {
        result[task.name] = this.npmScriptForTask(task);
      }
    }

    return result;
  }

  private renderWireitConfig() {
    const wireit = Wireit.of(this.project);
    if (wireit) {
      return wireit.renderConfig();
    } else {
      return undefined;
    }
  }

  private npmScriptForTask(task: Task) {
    return `${this.projenCommand} ${task.name}`;
  }

  private readPackageJson() {
    const file = join(this.project.outdir, "package.json");
    if (!existsSync(file)) {
      return undefined;
    }

    return readJsonSync(file);
  }

  private installDependencies() {
    exec(this.renderInstallCommand(this.isAutomatedBuild), {
      cwd: this.project.outdir,
    });
  }
}

export interface PeerDependencyOptions {
  /**
   * Automatically add a pinned dev dependency.
   * @default true
   */
  readonly pinnedDevDependency?: boolean;
}

/**
 * The node package manager to use.
 */
export enum NodePackageManager {
  /**
   * Use `yarn` as the package manager.
   */
  YARN = "yarn",

  /**
   * Use `npm` as the package manager.
   */
  NPM = "npm",

  /**
   * Use `pnpm` as the package manager.
   */
  PNPM = "pnpm",
}

/**
 * Npm package access level
 */
export enum NpmAccess {
  /**
   * Package is public.
   */
  PUBLIC = "public",

  /**
   * Package can only be accessed with credentials.
   */
  RESTRICTED = "restricted",
}

interface NpmDependencies {
  readonly dependencies: Record<string, string>;
  readonly devDependencies: Record<string, string>;
  readonly peerDependencies: Record<string, string>;
}

/**
 * Determines if an npm package is "scoped" (i.e. it starts with "xxx@").
 */
function isScoped(packageName: string) {
  return packageName.includes("@");
}

function defaultNpmAccess(packageName: string) {
  return isScoped(packageName) ? NpmAccess.RESTRICTED : NpmAccess.PUBLIC;
}

export function defaultNpmToken(
  npmToken: string | undefined,
  registry: string | undefined
) {
  // if we are publishing to AWS CdodeArtifact, no NPM_TOKEN used (will be requested using AWS CLI later).
  if (isAwsCodeArtifactRegistry(registry)) {
    return undefined;
  }

  // if we are publishing to GitHub Packages, default to GITHUB_TOKEN.
  const isGitHubPackages = registry === GITHUB_PACKAGES_REGISTRY;
  return (
    npmToken ??
    (isGitHubPackages ? DEFAULT_GITHUB_TOKEN_SECRET : DEFAULT_NPM_TOKEN_SECRET)
  );
}
