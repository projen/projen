export interface AutomatedReleaseOptions {
  /**
   * Whether or not to include a project-level changelog.
   *
   * @default false
   */
  readonly changelog?: boolean;
}

export interface ContinuousReleaseOptions extends AutomatedReleaseOptions {}

export interface ScheduledReleaseOptions extends AutomatedReleaseOptions {
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
   * Whether or not to include a project-level changelog.
   *
   * @default true
   */
  readonly changelog?: boolean;
}

interface ReleaseOptions {
  /**
   * Whether or not a project-level changelog should be maintained.
   *
   * @default false
   */
  readonly changelog?: boolean;

  /**
   * Whether or not this is a continuous release.
   *
   * @default false
   */
  readonly continuous?: boolean;

  /**
   * Cron schedule for releases.
   *
   * Only defined if this is a scheduled release.
   *
   * @example '0 17 * * *' - every day at 5 pm
   *
   * @default undefined
   */
  readonly schedule?: string;
}

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
    return new ReleaseStrategy({
      changelog: options.changelog ?? true,
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
      changelog: options.changelog,
    });
  }

  /**
   * Creates a continuous release strategy.
   *
   * Automated releases will occur on every commit.
   *
   * @param options release options
   */
  public static continuous(options: ContinuousReleaseOptions = {}) {
    return new ReleaseStrategy({
      continuous: true,
      changelog: options.changelog,
    });
  }

  /**
   * Whether or not a project-level changelog should be maintained.
   */
  public readonly changelog: boolean;

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

  private constructor(options: ReleaseOptions = {}) {
    this.isContinuous = options.continuous ?? false;
    this.schedule = options.schedule;
    this.changelog = options.changelog ?? false;
  }

  /**
   * Whether or not this is a manual release strategy.
   */
  public get isManual() {
    return !(this.isContinuous || this.schedule);
  }
}
