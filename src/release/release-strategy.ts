import { Project } from '..';

export interface ScheduledReleaseOptions {
  /**
   * Cron schedule for releases.
   *
   * Only defined if this is a scheduled release.
   *
   * @example '0 17 * * *' - every day at 5 pm
   */
  readonly schedule: string;
}

export interface ManualReleaseOptions {
  /**
   * Run the publish task as part of releases.
   *
   * @default false
   */
  readonly publish?: boolean;

  /**
   * Push release artifacts to the remote as part of releases.
   *
   * @default false
   */
  readonly pushArtifacts?: boolean;

  /**
   * Maintain a project-level changelog.
   *
   * @default true
   */
  readonly changelog?: boolean;

  /**
   * Project-level changelog file path.
   *
   * Ignored if `changelog` is false.
   *
   * @default 'CHANGELOG.md'
   */
  readonly changelogPath?: string;
}

interface ReleaseStrategyOptions {
  /**
   * Project-level changelog file path.
   *
   * Ignored if `changelog` is false
   */
  readonly changelogPath?: string;

  /**
   * Whether or not this is a continuous release.
   *
   * @default false
   */
  readonly continuous?: boolean;

  /**
   * Cron schedule for release.
   *
   * Only defined if this is a scheduled release.
   *
   * @example '0 17 * * *' - every day at 5 pm
   */
  readonly schedule?: string;

  /**
   * The publish task name for a given release strategy
   *
   * Leave undefined if not applicable or publishing should not occur.
   */
  readonly publishTaskName?: string;

  /**
   * Push release artifacts to the remote as part of releases.
   *
   * Can be left undefined if not relevant for a given release strategy.
   *
   * @default undefined
   */
  readonly pushArtifacts?: boolean;
}

/**
 * Used to manage release strategies. This includes release
 * and release artifact automation
 */
export class ReleaseStrategy {
  /**
   * Creates a manual release strategy.
   *
   * Use this option if you want totally manual releases.
   *
   * This will give you the same release task + a git publish command
   * that will handle project-level changelog management and release
   * tagging.
   *
   * To release you can run `yarn release` followed by `yarn publish:git`,
   * then push the generated artifacts.
   *
   * @param options release options
   */
  public static manual(options: ManualReleaseOptions = {}) {
    const publish = options.publish ?? false;
    let changelogPath;

    if (options.changelog ?? true) {
      changelogPath = options.changelogPath ?? 'CHANGELOG.md';
    }

    return new ReleaseStrategy({
      changelogPath: changelogPath,
      publishTaskName: publish ? 'publish:git' : undefined,
      pushArtifacts: options.pushArtifacts ?? false,
    });
  }

  /**
   * Creates a scheduled release strategy.
   *
   * Automated releases will occur based on the provided cron schedule.
   *
   * @param options release options.
   */
  public static scheduled(options: ScheduledReleaseOptions) {
    return new ReleaseStrategy({
      schedule: options.schedule,
    });
  }

  /**
   * Creates a continuous release strategy.
   *
   * Automated releases will occur on every commit.
   */
  public static continuous() {
    return new ReleaseStrategy({
      continuous: true,
    });
  }

  private readonly publishTaskName: string;

  /**
   * Project-level changelog file path.
   */
  public readonly changelogPath?: string;

  /**
   * Cron schedule for releases.
   *
   * Only defined if this is a scheduled release.
   *
   * @example '0 17 * * *' - every day at 5 pm
   */
  public readonly schedule?: string;

  /**
   * Whether or not this is a continuous release.
   */
  public readonly isContinuous: boolean;

  /**
   * Push release artifacts to the remote as part of releases.
   *
   * Undefined if not relevant for a given release strategy.
   */
  readonly pushArtifacts?: boolean;

  private constructor(options: ReleaseStrategyOptions = {}) {
    this.isContinuous = options.continuous ?? false;
    this.schedule = options.schedule;
    this.changelogPath = options.changelogPath;
    this.publishTaskName = options.publishTaskName ?? '';
    this.pushArtifacts = options.pushArtifacts;
  }

  /**
   * Returns the publish task for a given release strategy.
   * @param project Project
   * @returns Publish task if one is found
   */
  public publishTask(project: Project) {
    return project.tasks.tryFind(this.publishTaskName);
  }

  /**
   * Whether or not this is a manual release strategy.
   */
  public get isManual() {
    return !(this.isContinuous || this.schedule);
  }
}
