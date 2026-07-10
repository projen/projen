import type { CommandResult } from "../command";

/**
 * A language-native package manager the harness can drive.
 *
 * Kept deliberately small: enough to point a package manager at a local
 * registry, install a package by spec, and detect whether the tool is present
 * on the current machine (so unavailable managers are skipped, not failed).
 */
export interface PackageManager {
  /** Stable identifier, e.g. `npm`, `yarn`, `pnpm`, `bun`, `pip`, `uv`. */
  readonly id: string;

  /** Whether this package manager is installed on the current machine. */
  isAvailable(): boolean;

  /**
   * Writes whatever config files are needed so that installs in `dir` resolve
   * packages from `registryUrl` instead of the public registry.
   */
  configureRegistry(dir: string, registryUrl: string): void;

  /**
   * Installs a package spec (e.g. `projen@1.2.3`) into the project at `dir`.
   */
  install(dir: string, spec: string): CommandResult;
}
