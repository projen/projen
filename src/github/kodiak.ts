import type { MergeMethod } from "./auto-queue";
import type { GitHub } from "./github";
import { Component } from "../component";
import { TomlFile } from "../toml";
import { snakeCaseKeys } from "../util";

/**
 * Dependency version bump levels eligible for Kodiak auto-merge.
 */
export enum KodiakDependencyVersion {
  /**
   * Major semver updates.
   */
  MAJOR = "major",

  /**
   * Minor semver updates.
   */
  MINOR = "minor",

  /**
   * Patch semver updates.
   */
  PATCH = "patch",
}

/**
 * Options for Kodiak `[merge.automerge_dependencies]`.
 */
export interface KodiakAutomergeDependencies {
  /**
   * Restrict auto-merging to specific semver upgrade levels.
   *
   * @default - all semver update levels
   */
  readonly versions?: KodiakDependencyVersion[];

  /**
   * Restrict dependency auto-merging to specific bot or user logins.
   *
   * @default - no username filter
   */
  readonly usernames?: string[];
}

/**
 * Options for Kodiak `[merge]`.
 */
export interface KodiakMergeOptions {
  /**
   * Label required on a pull request to trigger auto-merge.
   *
   * @default "automerge"
   */
  readonly automergeLabel?: string;

  /**
   * Whether pull requests must have `automergeLabel` to be merged by Kodiak.
   *
   * @default true
   */
  readonly requireAutomergeLabel?: boolean;

  /**
   * Merge strategy used when merging pull requests.
   *
   * @default MergeMethod.MERGE
   */
  readonly method?: MergeMethod;

  /**
   * Automatically delete the head branch after merging.
   *
   * @default false
   */
  readonly deleteBranchOnMerge?: boolean;

  /**
   * Prevent Kodiak from merging pull requests while still allowing updates.
   *
   * @default false
   */
  readonly doNotMerge?: boolean;

  /**
   * Prioritize pull requests that are already up-to-date and passing checks.
   *
   * @default false
   */
  readonly prioritizeReadyToMerge?: boolean;

  /**
   * Configure automatic merging for dependency update bots such as Dependabot or Renovate.
   *
   * @default - dependency auto-merge is not configured
   */
  readonly automergeDependencies?: KodiakAutomergeDependencies;
}

/**
 * Options for Kodiak `[update]`.
 */
export interface KodiakUpdateOptions {
  /**
   * Automatically update out-of-date pull requests rather than waiting until queued for merge.
   *
   * @default false
   */
  readonly always?: boolean;

  /**
   * Only update pull requests carrying this label.
   *
   * @default - all eligible pull requests are updated
   */
  readonly autoupdateLabel?: string;

  /**
   * Usernames whose pull requests should not be automatically updated.
   *
   * @default - no usernames ignored
   */
  readonly ignoredUsernames?: string[];
}

/**
 * Options for Kodiak `[approve]`.
 */
export interface KodiakApproveOptions {
  /**
   * Automatically approve pull requests opened by these usernames.
   *
   * @default - no usernames auto-approved
   */
  readonly autoApproveUsernames?: string[];
}

/**
 * Configure Kodiak (`.kodiak.toml`).
 *
 * @see https://kodiakhq.com/docs/config-reference
 */
export interface KodiakOptions {
  /**
   * Kodiak configuration format version.
   *
   * @default 1
   */
  readonly version?: number;

  /**
   * Merge settings (`[merge]`).
   *
   * @default - default Kodiak merge behavior
   */
  readonly merge?: KodiakMergeOptions;

  /**
   * Branch update settings (`[update]`).
   *
   * @default - default Kodiak update behavior
   */
  readonly update?: KodiakUpdateOptions;

  /**
   * Auto-approval settings (`[approve]`).
   *
   * @default - no auto-approval rules configured
   */
  readonly approve?: KodiakApproveOptions;
}

/**
 * Configure pull request merging via Kodiak (`.kodiak.toml`).
 *
 * @see https://kodiakhq.com/
 */
export class Kodiak extends Component {
  constructor(github: GitHub, options: KodiakOptions = {}) {
    super(github.project);

    new TomlFile(this.project, ".kodiak.toml", {
      obj: {
        version: options.version ?? 1,
        ...(options.approve
          ? { approve: snakeCaseKeys(options.approve) }
          : undefined),
        ...(options.merge
          ? { merge: snakeCaseKeys(options.merge) }
          : undefined),
        ...(options.update
          ? { update: snakeCaseKeys(options.update) }
          : undefined),
      },
      // Kodiak reads `.kodiak.toml` from the repository.
      committed: true,
    });
  }
}
