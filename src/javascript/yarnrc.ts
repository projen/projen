import { Component } from "../component";

export enum YarnChecksumBehavior {
  THROW = "throw",
  UPDATE = "update",
  IGNORE = "ignore",
}

export enum YarnDefaultSemverRangePrefix {
  CARET = "^",
  TILDE = "~",
  EMPTY_STRING = "",
}

export enum YarnLogFilterLevel {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
  DISCARD = "discard",
}

export interface YarnLogFilter {
  code?: string;
  text?: string;
  level?: YarnLogFilterLevel;
  pattern?: string;
}

export interface YarnNetworkSetting {
  caFilePath?: string;
  enableNetwork?: boolean;
  httpProxy?: string;
  httpsProxy?: string;
  httpsKeyFilePath?: string;
  httpsCertFilePath?: string;
}

export enum YarnHoistingLimit {
  DEPENDENCIES = "dependencies",
  NONE = "none",
  WORKSPACES = "workspaces",
}

export enum YarnNmMode {
  CLASSIC = "classic",
  HARDLINKS_LOCAL = "hardlinks-local",
  HARDLINKS_GLOBAL = "hardlinks-global",
}

export enum YarnNodeLinker {
  PNP = "pnp",
  PNPM = "pnpm",
  NODE_MODULES = "node-modules",
}

export enum YarnNpmPublishAccess {
  PUBLIC = "public",
  RESTRICTED = "restricted",
}

export interface YarnNpmRegistry {
  npmAlwaysAuth?: boolean;
  npmAuthIdent?: string;
  npmAuthToken?: string;
}

export interface YarnNpmScope {
  npmPublishRegistry?: string;
  npmRegistryServer?: string;
  npmAlwaysAuth?: boolean;
  npmAuthIdent?: string;
  npmAuthToken?: string;
}

export interface YarnPeerDependencyMeta {
  optional?: boolean;
}

export interface YarnPackageExtension {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, Record<string, YarnPeerDependencyMeta>>;
}

export enum YarnPnpFallbackMode {
  NONE = "none",
  DEPENDENCIES_ONLY = "dependencies-only",
  ALL = "all",
}

export enum YarnPnpMode {
  STRICT = "strict",
  loose = "loose",
}

export enum YarnProgressBarStyle {
  PATRICK = "patrick",
  SIMBA = "simba",
  JACK = "jack",
  HOGSFATHER = "hogsfather",
  DEFAULT = "default",
}

export interface YarnSupportedArchitectures {
  os?: string[];
  cpu?: string[];
  libc?: string[];
}

export interface YarnOptions {
  cacheFolder?: string;
  caFilePath?: string;
  changesetBaseRefs?: string[];
  changesetIgnorePatterns?: string[];
  checksumBehavior?: YarnChecksumBehavior;
  cloneConcurrency?: number;
  compressionLevel?: number | string;
  constraintsPath?: string;
  defaultLanguageName?: string;
  defaultProtocol?: string;
  defaultSemverRangePrefix?: YarnDefaultSemverRangePrefix;
  deferredVersionFolder?: string;
  enableColors?: boolean;
  enableGlobalCache?: boolean;
  enableHyperlinks?: boolean;
  enableImmutableCache?: boolean;
  enableImmutableInstalls?: boolean;
  enableInlineBuilds?: boolean;
  enableMessageNames?: boolean;
  enableMirror?: boolean;
  enableNetwork?: boolean;
  enableProgressBars?: boolean;
  enableScripts?: boolean;
  enableStrictSsl?: boolean;
  enableTelemetry?: boolean;
  enableTimers?: boolean;
  enableTransparentWorkspaces?: boolean;
  globalFolder?: string;
  httpProxy?: string;
  httpRetry?: number;
  httpTimeout?: number;
  httpsCertFilePath?: string;
  httpsKeyFilePath?: string;
  httpsProxy?: string;
  ignoreCwd?: boolean;
  ignorePath?: boolean;
  immutablePatterns?: string[];
  initScope?: string;
  initFields?: Record<string, any>;
  installStatePath?: string;
  logFilters?: YarnLogFilter[];
  lockfileFilename?: string;
  networkConcurrency?: number;
  networkSettings?: Record<string, YarnNetworkSetting>;
  nmHoistingLimits?: YarnHoistingLimit;
  nmSelfReferences?: boolean;
  nmMode?: YarnNmMode;
  nodeLinker?: YarnNodeLinker;
  npmAlwaysAuth?: boolean;
  npmAuditRegistry?: string;
  npmAuthIdent?: string;
  npmAuthToken?: string;
  npmPublishAccess?: YarnNpmPublishAccess;
  npmAuditExcludePackages?: string[];
  npmAuditIgnoreAdvisories?: string[];
  npmPublishRegistry?: string;
  npmRegistries?: Record<string, YarnNpmRegistry>;
  npmRegistryServer?: string;
  npmScopes?: Record<string, YarnNpmScope>;
  packageExtensions?: Record<string, YarnPackageExtension>;
  patchFolder?: string;
  pnpDataPath?: string;
  pnpEnableEsmLoader?: boolean;
  pnpEnableInlining?: boolean;
  pnpFallbackMode?: YarnPnpFallbackMode;
  pnpIgnorePatterns?: string[];
  pnpMode?: YarnPnpMode;
  pnpShebang?: string;
  pnpUnpluggedFolder?: string;
  preferAggregateCacheInfo?: boolean;
  preferDeferredVersions?: boolean;
  preferInteractive?: boolean;
  preferTruncatedLines?: boolean;
  progressBarStyle?: YarnProgressBarStyle;
  rcFilename?: string;
  supportedArchitectures?: YarnSupportedArchitectures;
  telemetryInterval?: number;
  telemetryUserId: string;
  unsafeHttpWhitelist?: string[];
  virtualFolder?: string;
  yarnPath?: string;
}

export class Yarnrc extends Component {}
