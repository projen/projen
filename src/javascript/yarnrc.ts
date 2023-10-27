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
  readonly code?: string;
  readonly text?: string;
  readonly level?: YarnLogFilterLevel;
  readonly pattern?: string;
}

export interface YarnNetworkSetting {
  readonly caFilePath?: string;
  readonly enableNetwork?: boolean;
  readonly httpProxy?: string;
  readonly httpsProxy?: string;
  readonly httpsKeyFilePath?: string;
  readonly httpsCertFilePath?: string;
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
  readonly npmAlwaysAuth?: boolean;
  readonly npmAuthIdent?: string;
  readonly npmAuthToken?: string;
}

export interface YarnNpmScope {
  readonly npmPublishRegistry?: string;
  readonly npmRegistryServer?: string;
  readonly npmAlwaysAuth?: boolean;
  readonly npmAuthIdent?: string;
  readonly npmAuthToken?: string;
}

export interface YarnPeerDependencyMeta {
  readonly optional?: boolean;
}

export interface YarnPackageExtension {
  readonly dependencies?: Record<string, string>;
  readonly peerDependencies?: Record<string, string>;
  readonly peerDependenciesMeta?: Record<
    string,
    Record<string, YarnPeerDependencyMeta>
  >;
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
  readonly os?: string[];
  readonly cpu?: string[];
  readonly libc?: string[];
}

export interface Yarnrc3Options {
  readonly cacheFolder?: string;
  readonly caFilePath?: string;
  readonly changesetBaseRefs?: string[];
  readonly changesetIgnorePatterns?: string[];
  readonly checksumBehavior?: YarnChecksumBehavior;
  readonly cloneConcurrency?: number;
  readonly compressionLevel?: number | string;
  readonly constraintsPath?: string;
  readonly defaultLanguageName?: string;
  readonly defaultProtocol?: string;
  readonly defaultSemverRangePrefix?: YarnDefaultSemverRangePrefix;
  readonly deferredVersionFolder?: string;
  readonly enableColors?: boolean;
  readonly enableGlobalCache?: boolean;
  readonly enableHyperlinks?: boolean;
  readonly enableImmutableCache?: boolean;
  readonly enableImmutableInstalls?: boolean;
  readonly enableInlineBuilds?: boolean;
  readonly enableMessageNames?: boolean;
  readonly enableMirror?: boolean;
  readonly enableNetwork?: boolean;
  readonly enableProgressBars?: boolean;
  readonly enableScripts?: boolean;
  readonly enableStrictSsl?: boolean;
  readonly enableTelemetry?: boolean;
  readonly enableTimers?: boolean;
  readonly enableTransparentWorkspaces?: boolean;
  readonly globalFolder?: string;
  readonly httpProxy?: string;
  readonly httpRetry?: number;
  readonly httpTimeout?: number;
  readonly httpsCertFilePath?: string;
  readonly httpsKeyFilePath?: string;
  readonly httpsProxy?: string;
  readonly ignoreCwd?: boolean;
  readonly ignorePath?: boolean;
  readonly immutablePatterns?: string[];
  readonly initScope?: string;
  readonly initFields?: Record<string, any>;
  readonly installStatePath?: string;
  readonly logFilters?: YarnLogFilter[];
  readonly lockfileFilename?: string;
  readonly networkConcurrency?: number;
  readonly networkSettings?: Record<string, YarnNetworkSetting>;
  readonly nmHoistingLimits?: YarnHoistingLimit;
  readonly nmSelfReferences?: boolean;
  readonly nmMode?: YarnNmMode;
  readonly nodeLinker?: YarnNodeLinker;
  readonly npmAlwaysAuth?: boolean;
  readonly npmAuditRegistry?: string;
  readonly npmAuthIdent?: string;
  readonly npmAuthToken?: string;
  readonly npmPublishAccess?: YarnNpmPublishAccess;
  readonly npmAuditExcludePackages?: string[];
  readonly npmAuditIgnoreAdvisories?: string[];
  readonly npmPublishRegistry?: string;
  readonly npmRegistries?: Record<string, YarnNpmRegistry>;
  readonly npmRegistryServer?: string;
  readonly npmScopes?: Record<string, YarnNpmScope>;
  readonly packageExtensions?: Record<string, YarnPackageExtension>;
  readonly patchFolder?: string;
  readonly pnpDataPath?: string;
  readonly pnpEnableEsmLoader?: boolean;
  readonly pnpEnableInlining?: boolean;
  readonly pnpFallbackMode?: YarnPnpFallbackMode;
  readonly pnpIgnorePatterns?: string[];
  readonly pnpMode?: YarnPnpMode;
  readonly pnpShebang?: string;
  readonly pnpUnpluggedFolder?: string;
  readonly preferAggregateCacheInfo?: boolean;
  readonly preferDeferredVersions?: boolean;
  readonly preferInteractive?: boolean;
  readonly preferTruncatedLines?: boolean;
  readonly progressBarStyle?: YarnProgressBarStyle;
  readonly rcFilename?: string;
  readonly supportedArchitectures?: YarnSupportedArchitectures;
  readonly telemetryInterval?: number;
  readonly telemetryUserId: string;
  readonly unsafeHttpWhitelist?: string[];
  readonly virtualFolder?: string;
  readonly yarnPath?: string;
}

export class Yarnrc extends Component {}
