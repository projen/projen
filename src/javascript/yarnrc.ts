import { NodePackage, YarnBerryOptions } from "./node-package";
import { Component } from "../component";
import { Project } from "../project";
import { YamlFile } from "../yaml";

/** https:/v3.yarnpkg.com/configuration/yarnrc#checksumBehavior */
export enum YarnChecksumBehaviorV3 {
  THROW = "throw",
  UPDATE = "update",
  IGNORE = "ignore",
}

/** https://yarnpkg.com/configuration/yarnrc#checksumBehavior */
export enum YarnChecksumBehavior {
  THROW = "throw",
  UPDATE = "update",
  RESET = "reset",
  IGNORE = "ignore",
}

/** https://yarnpkg.com/configuration/yarnrc#defaultSemverRangePrefix */
export enum YarnDefaultSemverRangePrefix {
  CARET = "^",
  TILDE = "~",
  EMPTY_STRING = "",
}

/** https://v3.yarnpkg.com/configuration/yarnrc#logFilters.0.level */
export enum YarnLogFilterLevel {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
  DISCARD = "discard",
}

/** https://yarnpkg.com/configuration/yarnrc#logFilters */
export interface YarnLogFilter {
  readonly code?: string;
  readonly text?: string;
  readonly level?: YarnLogFilterLevel;
  readonly pattern?: string;
}

/** https://v3.yarnpkg.com/configuration/yarnrc#networkSettings */
export interface YarnNetworkSettingV3 {
  readonly caFilePath?: string;
  readonly enableNetwork?: boolean;
  readonly httpProxy?: string;
  readonly httpsProxy?: string;
  readonly httpsKeyFilePath?: string;
  readonly httpsCertFilePath?: string;
}

/** https://yarnpkg.com/configuration/yarnrc#networkSettings */
export interface YarnNetworkSetting {
  readonly httpsCaFilePath?: string;
  readonly enableNetwork?: boolean;
  readonly httpProxy?: string;
  readonly httpsProxy?: string;
  readonly httpsKeyFilePath?: string;
  readonly httpsCertFilePath?: string;
}

/** https://yarnpkg.com/configuration/yarnrc#nmHoistingLimits */
export enum YarnNmHoistingLimit {
  DEPENDENCIES = "dependencies",
  NONE = "none",
  WORKSPACES = "workspaces",
}

/** https://yarnpkg.com/configuration/yarnrc#nmMode */
export enum YarnNmMode {
  CLASSIC = "classic",
  HARDLINKS_LOCAL = "hardlinks-local",
  HARDLINKS_GLOBAL = "hardlinks-global",
}

/** https://yarnpkg.com/configuration/yarnrc#nodeLinker */
export enum YarnNodeLinker {
  PNP = "pnp",
  PNPM = "pnpm",
  NODE_MODULES = "node-modules",
}

/** https://yarnpkg.com/configuration/yarnrc#npmPublishAccess */
export enum YarnNpmPublishAccess {
  PUBLIC = "public",
  RESTRICTED = "restricted",
}

/** https://yarnpkg.com/configuration/yarnrc#npmRegistries */
export interface YarnNpmRegistry {
  readonly npmAlwaysAuth?: boolean;
  readonly npmAuthIdent?: string;
  readonly npmAuthToken?: string;
}

/** https://yarnpkg.com/configuration/yarnrc#npmScopes */
export interface YarnNpmScope {
  readonly npmPublishRegistry?: string;
  readonly npmRegistryServer?: string;
  readonly npmAlwaysAuth?: boolean;
  readonly npmAuthIdent?: string;
  readonly npmAuthToken?: string;
}

/** https://yarnpkg.com/configuration/yarnrc#packageExtensions */
export interface YarnPeerDependencyMeta {
  readonly optional?: boolean;
}

/** https://yarnpkg.com/configuration/yarnrc#packageExtensions */
export interface YarnPackageExtension {
  readonly dependencies?: Record<string, string>;
  readonly peerDependencies?: Record<string, string>;
  readonly peerDependenciesMeta?: Record<
    string,
    Record<string, YarnPeerDependencyMeta>
  >;
}

/** https://yarnpkg.com/configuration/yarnrc#pnpFallbackMode */
export enum YarnPnpFallbackMode {
  NONE = "none",
  DEPENDENCIES_ONLY = "dependencies-only",
  ALL = "all",
}

/** https://yarnpkg.com/configuration/yarnrc#pnpMode */
export enum YarnPnpMode {
  STRICT = "strict",
  LOOSE = "loose",
}

/** https://yarnpkg.com/configuration/yarnrc#progressBarStyle */
export enum YarnProgressBarStyle {
  PATRICK = "patrick",
  SIMBA = "simba",
  JACK = "jack",
  HOGSFATHER = "hogsfather",
  DEFAULT = "default",
}

/** https://yarnpkg.com/configuration/yarnrc#supportedArchitectures */
export interface YarnSupportedArchitectures {
  readonly os?: string[];
  readonly cpu?: string[];
  readonly libc?: string[];
}

/** https://yarnpkg.com/configuration/yarnrc#cacheMigrationMode */
export enum YarnCacheMigrationMode {
  REQUIRED_ONLY = "requied-only",
  MATCH_SPEC = "match-spec",
  ALWAYS = "always",
}

/** https://yarnpkg.com/configuration/yarnrc#winLinkType */
export enum YarnWinLinkType {
  JUNCTIONS = "junctions",
  SYMLINKS = "symlinks",
}

export enum YarnWorkerPoolMode {
  ASYNC = "async",
  WORKERS = "workers",
}

/** Configuration for .yarnrc.yml in Yarn Berry v3 */
export interface YarnrcOptionsV3 {
  /** https://v3.yarnpkg.com/configuration/yarnrc#cacheFolder */
  readonly cacheFolder?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#caFilePath */
  readonly caFilePath?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#changesetBaseRefs */
  readonly changesetBaseRefs?: string[];
  /** https://v3.yarnpkg.com/configuration/yarnrc#changesetIgnorePatterns */
  readonly changesetIgnorePatterns?: string[];
  /** https://v3.yarnpkg.com/configuration/yarnrc#checksumBehavior */
  readonly checksumBehavior?: YarnChecksumBehaviorV3;
  /** https://v3.yarnpkg.com/configuration/yarnrc#cloneConcurrency */
  readonly cloneConcurrency?: number;
  /** https://v3.yarnpkg.com/configuration/yarnrc#compressionLevel */
  readonly compressionLevel?: number | string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#constraintsPath */
  readonly constraintsPath?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#defaultLanguageName */
  readonly defaultLanguageName?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#defaultProtocol */
  readonly defaultProtocol?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#defaultSemverRangePrefix */
  readonly defaultSemverRangePrefix?: YarnDefaultSemverRangePrefix;
  /** https://v3.yarnpkg.com/configuration/yarnrc#deferredVersionFolder */
  readonly deferredVersionFolder?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableColors */
  readonly enableColors?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableGlobalCache */
  readonly enableGlobalCache?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableHyperlinks */
  readonly enableHyperlinks?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableImmutableCache */
  readonly enableImmutableCache?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableImmutableInstalls */
  readonly enableImmutableInstalls?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableInlineBuilds */
  readonly enableInlineBuilds?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableMessageNames */
  readonly enableMessageNames?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableMirror */
  readonly enableMirror?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableNetwork */
  readonly enableNetwork?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableProgressBars */
  readonly enableProgressBars?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableScripts */
  readonly enableScripts?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableStrictSsl */
  readonly enableStrictSsl?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableTelemetry */
  readonly enableTelemetry?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableTimers */
  readonly enableTimers?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#enableTransparentWorkspaces */
  readonly enableTransparentWorkspaces?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#globalFolder */
  readonly globalFolder?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#httpProxy */
  readonly httpProxy?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#httpRetry */
  readonly httpRetry?: number;
  /** https://v3.yarnpkg.com/configuration/yarnrc#httpTimeout */
  readonly httpTimeout?: number;
  /** https://v3.yarnpkg.com/configuration/yarnrc#httpsCertFilePath */
  readonly httpsCertFilePath?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#httpsKeyFilePath */
  readonly httpsKeyFilePath?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#httpsProxy */
  readonly httpsProxy?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#ignoreCwd */
  readonly ignoreCwd?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#ignorePath */
  readonly ignorePath?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#immutablePatterns */
  readonly immutablePatterns?: string[];
  /** https://v3.yarnpkg.com/configuration/yarnrc#initScope */
  readonly initScope?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#initFields */
  readonly initFields?: Record<string, any>;
  /** https://v3.yarnpkg.com/configuration/yarnrc#installStatePath */
  readonly installStatePath?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#logFilters */
  readonly logFilters?: YarnLogFilter[];
  /** https://v3.yarnpkg.com/configuration/yarnrc#lockfileFilename */
  readonly lockfileFilename?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#networkConcurrency */
  readonly networkConcurrency?: number;
  /** https://v3.yarnpkg.com/configuration/yarnrc#networkSettings */
  readonly networkSettings?: Record<string, YarnNetworkSettingV3>;
  /** https://v3.yarnpkg.com/configuration/yarnrc#nmHoistingLimits */
  readonly nmHoistingLimits?: YarnNmHoistingLimit;
  /** https://v3.yarnpkg.com/configuration/yarnrc#nmSelfReferences */
  readonly nmSelfReferences?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#nmMode */
  readonly nmMode?: YarnNmMode;
  /** https://v3.yarnpkg.com/configuration/yarnrc#nodeLinker */
  readonly nodeLinker?: YarnNodeLinker;
  /** https://v3.yarnpkg.com/configuration/yarnrc#npmAlwaysAuth */
  readonly npmAlwaysAuth?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#npmAuditRegistry */
  readonly npmAuditRegistry?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#npmAuthIdent */
  readonly npmAuthIdent?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#npmAuthToken */
  readonly npmAuthToken?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#npmPublishAccess */
  readonly npmPublishAccess?: YarnNpmPublishAccess;
  /** https://v3.yarnpkg.com/configuration/yarnrc#npmAuditExcludePackages */
  readonly npmAuditExcludePackages?: string[];
  /** https://v3.yarnpkg.com/configuration/yarnrc#npmAuditIgnoreAdvisories */
  readonly npmAuditIgnoreAdvisories?: string[];
  /** https://v3.yarnpkg.com/configuration/yarnrc#npmPublishRegistry */
  readonly npmPublishRegistry?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#npmRegistries */
  readonly npmRegistries?: Record<string, YarnNpmRegistry>;
  /** https://v3.yarnpkg.com/configuration/yarnrc#npmRegistryServer */
  readonly npmRegistryServer?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#npmScopes */
  readonly npmScopes?: Record<string, YarnNpmScope>;
  /** https://v3.yarnpkg.com/configuration/yarnrc#packageExtensions */
  readonly packageExtensions?: Record<string, YarnPackageExtension>;
  /** https://v3.yarnpkg.com/configuration/yarnrc#patchFolder */
  readonly patchFolder?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#pnpDataPath */
  readonly pnpDataPath?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#pnpEnableEsmLoader */
  readonly pnpEnableEsmLoader?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#pnpEnableInlining */
  readonly pnpEnableInlining?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#pnpFallbackMode */
  readonly pnpFallbackMode?: YarnPnpFallbackMode;
  /** https://v3.yarnpkg.com/configuration/yarnrc#pnpIgnorePatterns */
  readonly pnpIgnorePatterns?: string[];
  /** https://v3.yarnpkg.com/configuration/yarnrc#pnpMode */
  readonly pnpMode?: YarnPnpMode;
  /** https://v3.yarnpkg.com/configuration/yarnrc#pnpShebang */
  readonly pnpShebang?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#pnpUnpluggedFolder */
  readonly pnpUnpluggedFolder?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#preferAggregateCacheInfo */
  readonly preferAggregateCacheInfo?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#preferDeferredVersions */
  readonly preferDeferredVersions?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#preferInteractive */
  readonly preferInteractive?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#preferTruncatedLines */
  readonly preferTruncatedLines?: boolean;
  /** https://v3.yarnpkg.com/configuration/yarnrc#progressBarStyle */
  readonly progressBarStyle?: YarnProgressBarStyle;
  /** https://v3.yarnpkg.com/configuration/yarnrc#rcFilename */
  readonly rcFilename?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#supportedArchitectures */
  readonly supportedArchitectures?: YarnSupportedArchitectures;
  /** https://v3.yarnpkg.com/configuration/yarnrc#telemetryInterval */
  readonly telemetryInterval?: number;
  /** https://v3.yarnpkg.com/configuration/yarnrc#telemetryUserId */
  readonly telemetryUserId?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#unsafeHttpWhitelist */
  readonly unsafeHttpWhitelist?: string[];
  /** https://v3.yarnpkg.com/configuration/yarnrc#virtualFolder */
  readonly virtualFolder?: string;
  /** https://v3.yarnpkg.com/configuration/yarnrc#yarnPath */
  readonly yarnPath?: string;
}

/** Configuration for .yarnrc.yml in Yarn Berry v4 */
export interface YarnrcOptionsV4 {
  /** https://yarnpkg.com/configuration/yarnrc#cacheFolder */
  readonly cacheFolder?: string;
  /** https://yarnpkg.com/configuration/yarnrc#cacheMigrationMode */
  readonly cacheMigrationMode?: YarnCacheMigrationMode;
  /** https://yarnpkg.com/configuration/yarnrc#httpsCaFilePath */
  readonly httpsCaFilePath?: string;
  /** https://yarnpkg.com/configuration/yarnrc#changesetBaseRefs */
  readonly changesetBaseRefs?: string[];
  /** https://yarnpkg.com/configuration/yarnrc#changesetIgnorePatterns */
  readonly changesetIgnorePatterns?: string[];
  /** https://yarnpkg.com/configuration/yarnrc#checksumBehavior */
  readonly checksumBehavior?: YarnChecksumBehavior;
  /** https://yarnpkg.com/configuration/yarnrc#cloneConcurrency */
  readonly cloneConcurrency?: number;
  /** https://yarnpkg.com/configuration/yarnrc#compressionLevel */
  readonly compressionLevel?: number | string;
  /** https://yarnpkg.com/configuration/yarnrc#constraintsPath */
  readonly constraintsPath?: string;
  /** https://yarnpkg.com/configuration/yarnrc#defaultLanguageName */
  readonly defaultLanguageName?: string;
  /** https://yarnpkg.com/configuration/yarnrc#defaultProtocol */
  readonly defaultProtocol?: string;
  /** https://yarnpkg.com/configuration/yarnrc#defaultSemverRangePrefix */
  readonly defaultSemverRangePrefix?: YarnDefaultSemverRangePrefix;
  /** https://yarnpkg.com/configuration/yarnrc#deferredVersionFolder */
  readonly deferredVersionFolder?: string;
  /** https://yarnpkg.com/configuration/yarnrc#enableColors */
  readonly enableColors?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableConstraintsCheck */
  readonly enableConstraintsCheck?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableGlobalCache */
  readonly enableGlobalCache?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableHardenedMode */
  readonly enableHardenedMode?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableHyperlinks */
  readonly enableHyperlinks?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableImmutableCache */
  readonly enableImmutableCache?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableImmutableInstalls */
  readonly enableImmutableInstalls?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableInlineBuilds */
  readonly enableInlineBuilds?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableInlineHunks */
  readonly enableInlineHunks?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableMessageNames */
  readonly enableMessageNames?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableMirror */
  readonly enableMirror?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableNetwork */
  readonly enableNetwork?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableOfflineMode */
  readonly enableOfflineMode?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableProgressBars */
  readonly enableProgressBars?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableScripts */
  readonly enableScripts?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableStrictSsl */
  readonly enableStrictSsl?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableTelemetry */
  readonly enableTelemetry?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableTimers */
  readonly enableTimers?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#enableTransparentWorkspaces */
  readonly enableTransparentWorkspaces?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#globalFolder */
  readonly globalFolder?: string;
  /** https://yarnpkg.com/configuration/yarnrc#httpProxy */
  readonly httpProxy?: string;
  /** https://yarnpkg.com/configuration/yarnrc#httpRetry */
  readonly httpRetry?: number;
  /** https://yarnpkg.com/configuration/yarnrc#httpTimeout */
  readonly httpTimeout?: number;
  /** https://yarnpkg.com/configuration/yarnrc#httpsCertFilePath */
  readonly httpsCertFilePath?: string;
  /** https://yarnpkg.com/configuration/yarnrc#httpsKeyFilePath */
  readonly httpsKeyFilePath?: string;
  /** https://yarnpkg.com/configuration/yarnrc#httpsProxy */
  readonly httpsProxy?: string;
  /** https://yarnpkg.com/configuration/yarnrc#ignorePath */
  readonly ignorePath?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#immutablePatterns */
  readonly immutablePatterns?: string[];
  /** https://yarnpkg.com/configuration/yarnrc#initScope */
  readonly initScope?: string;
  /** https://yarnpkg.com/configuration/yarnrc#initFields */
  readonly initFields?: Record<string, any>;
  /** https://yarnpkg.com/configuration/yarnrc#injectEnvironmentFiles */
  readonly injectEnvironmentFiles?: string[];
  /** https://yarnpkg.com/configuration/yarnrc#installStatePath */
  readonly installStatePath?: string;
  /** https://yarnpkg.com/configuration/yarnrc#logFilters */
  readonly logFilters?: YarnLogFilter[];
  /** https://yarnpkg.com/configuration/yarnrc#networkConcurrency */
  readonly networkConcurrency?: number;
  /** https://yarnpkg.com/configuration/yarnrc#networkSettings */
  readonly networkSettings?: Record<string, YarnNetworkSetting>;
  /** https://yarnpkg.com/configuration/yarnrc#nmHoistingLimits */
  readonly nmHoistingLimits?: YarnNmHoistingLimit;
  /** https://yarnpkg.com/configuration/yarnrc#nmSelfReferences */
  readonly nmSelfReferences?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#nmMode */
  readonly nmMode?: YarnNmMode;
  /** https://yarnpkg.com/configuration/yarnrc#nodeLinker */
  readonly nodeLinker?: YarnNodeLinker;
  /** https://yarnpkg.com/configuration/yarnrc#winLinkType */
  readonly winLinkType?: YarnWinLinkType;
  /** https://yarnpkg.com/configuration/yarnrc#npmAlwaysAuth */
  readonly npmAlwaysAuth?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#npmAuditRegistry */
  readonly npmAuditRegistry?: string;
  /** https://yarnpkg.com/configuration/yarnrc#npmAuthIdent */
  readonly npmAuthIdent?: string;
  /** https://yarnpkg.com/configuration/yarnrc#npmAuthToken */
  readonly npmAuthToken?: string;
  /** https://yarnpkg.com/configuration/yarnrc#npmPublishAccess */
  readonly npmPublishAccess?: YarnNpmPublishAccess;
  /** https://yarnpkg.com/configuration/yarnrc#npmAuditExcludePackages */
  readonly npmAuditExcludePackages?: string[];
  /** https://yarnpkg.com/configuration/yarnrc#npmAuditIgnoreAdvisories */
  readonly npmAuditIgnoreAdvisories?: string[];
  /** https://yarnpkg.com/configuration/yarnrc#npmPublishRegistry */
  readonly npmPublishRegistry?: string;
  /** https://yarnpkg.com/configuration/yarnrc#npmRegistries */
  readonly npmRegistries?: Record<string, YarnNpmRegistry>;
  /** https://yarnpkg.com/configuration/yarnrc#npmRegistryServer */
  readonly npmRegistryServer?: string;
  /** https://yarnpkg.com/configuration/yarnrc#npmScopes */
  readonly npmScopes?: Record<string, YarnNpmScope>;
  /** https://yarnpkg.com/configuration/yarnrc#packageExtensions */
  readonly packageExtensions?: Record<string, YarnPackageExtension>;
  /** https://yarnpkg.com/configuration/yarnrc#patchFolder */
  readonly patchFolder?: string;
  /** https://yarnpkg.com/configuration/yarnrc#pnpEnableEsmLoader */
  readonly pnpEnableEsmLoader?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#pnpEnableInlining */
  readonly pnpEnableInlining?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#pnpFallbackMode */
  readonly pnpFallbackMode?: YarnPnpFallbackMode;
  /** https://yarnpkg.com/configuration/yarnrc#pnpIgnorePatterns */
  readonly pnpIgnorePatterns?: string[];
  /** https://yarnpkg.com/configuration/yarnrc#pnpMode */
  readonly pnpMode?: YarnPnpMode;
  /** https://yarnpkg.com/configuration/yarnrc#pnpShebang */
  readonly pnpShebang?: string;
  /** https://yarnpkg.com/configuration/yarnrc#pnpUnpluggedFolder */
  readonly pnpUnpluggedFolder?: string;
  /** https://yarnpkg.com/configuration/yarnrc#preferDeferredVersions */
  readonly preferDeferredVersions?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#preferInteractive */
  readonly preferInteractive?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#preferReuse */
  readonly preferReuse?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#preferTruncatedLines */
  readonly preferTruncatedLines?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#progressBarStyle */
  readonly progressBarStyle?: YarnProgressBarStyle;
  /** https://yarnpkg.com/configuration/yarnrc#rcFilename */
  readonly rcFilename?: string;
  /** https://yarnpkg.com/configuration/yarnrc#supportedArchitectures */
  readonly supportedArchitectures?: YarnSupportedArchitectures;
  /** https://yarnpkg.com/configuration/yarnrc#taskPoolConcurrency */
  readonly taskPoolConcurrency?: string;
  /** https://yarnpkg.com/configuration/yarnrc#workerPoolMode */
  readonly workerPoolMode?: YarnWorkerPoolMode;
  /** https://yarnpkg.com/configuration/yarnrc#telemetryInterval */
  readonly telemetryInterval?: number;
  /** https://yarnpkg.com/configuration/yarnrc#telemetryUserId */
  readonly telemetryUserId?: string;
  /** https://yarnpkg.com/configuration/yarnrc#tsEnableAutoTypes */
  readonly tsEnableAutoTypes?: boolean;
  /** https://yarnpkg.com/configuration/yarnrc#unsafeHttpWhitelist */
  readonly unsafeHttpWhitelist?: string[];
  /** https://yarnpkg.com/configuration/yarnrc#virtualFolder */
  readonly virtualFolder?: string;
  /** https://yarnpkg.com/configuration/yarnrc#yarnPath */
  readonly yarnPath?: string;
}

export class Yarnrc extends Component {
  constructor(
    nodePackage: NodePackage,
    project: Project,
    options: YarnBerryOptions = {}
  ) {
    super(project);
    const {
      version = "4.0.0",
      yarnRcOptions = {},
      zeroInstalls = false,
    } = options;

    // Set the `packageManager` field in `package.json` to the version specified. This tells `corepack` which version
    // of `yarn` to use.
    nodePackage.addField("packageManager", `yarn@${version}`);

    new YamlFile(project, ".yarnrc.yml", {
      obj: yarnRcOptions,
    });

    this.configureGitignore(project, zeroInstalls);
  }

  /** See https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored */
  private configureGitignore(project: Project, zeroInstalls: boolean) {
    const { gitignore } = project;

    // These patterns are the same whether or not you're using zero-installs
    gitignore.addPatterns(
      ".yarn/*",
      "!.yarn/patches",
      "!.yarn/plugins",
      "!.yarn/releases",
      "!.yarn/sdks",
      "!.yarn/versions"
    );

    if (zeroInstalls) {
      gitignore.addPatterns("!.yarn/cache");
    } else {
      gitignore.addPatterns("*.pnp.*");
    }
  }
}
