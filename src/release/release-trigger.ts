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

  /**
   * Override git-push command.
   *
   * Set to an empty string to disable pushing.
   */
  readonly gitPushCommand?: string;
}

export interface ContinuousReleaseOptions {
  /**
   * Paths for which pushes should trigger a release
   */
  readonly paths?: string[];
}

interface ReleaseTriggerOptions {
  /**
   * Project-level changelog file path.
   *
   * Ignored if `changelog` is false
   */
  readonly changelogPath?: string;

  /**
   * Continuous releases, which will release every commit.
   *
   * @default false
   */
  readonly continuous?: boolean;

  /**
   * Paths for which pushes (continuous release) should trigger a release
   */
  readonly paths?: string[];

  /**
   * Cron schedule for release.
   *
   * Only defined if this is a scheduled release.
   *
   * @example '0 17 * * *' - every day at 5 pm
   */
  readonly schedule?: string;

  /**
   * Override git-push command.
   *
   * Set to an empty string to disable pushing.
   */
  readonly gitPushCommand?: string;
}

/**
 * Used to manage release strategies. This includes release
 * and release artifact automation
 */
export class ReleaseTrigger {
  /**
   * Creates a manual release trigger.
   *
   * Use this option if you want totally manual releases.
   *
   * This will give you a release task that, in addition to the normal
   * release activities will trigger a `publish:git` task. This task will
   * handle project-level changelog management, release tagging, and pushing
   * these artifacts to origin.
   *
   * The command used for pushing can be customised by specifying
   * `gitPushCommand`. Set to an empty string to disable pushing entirely.
   *
   * Simply run `yarn release` to trigger a manual release.
   *
   * @param options release options
   */
  public static manual(options: ManualReleaseOptions = {}) {
    let changelogPath;

    if (options.changelog ?? true) {
      changelogPath = options.changelogPath ?? "CHANGELOG.md";
    }

    return new ReleaseTrigger({
      changelogPath: changelogPath,
      gitPushCommand: options.gitPushCommand,
    });
  }

  /**
   * Creates a scheduled release trigger.
   *
   * Automated releases will occur based on the provided cron schedule.
   *
   * @param options release options.
   */
  public static scheduled(options: ScheduledReleaseOptions) {
    return new ReleaseTrigger({
      schedule: options.schedule,
    });
  }

  /**
   * Creates a continuous release trigger.
   *
   * Automated releases will occur on every commit.
   */
  public static continuous(options: ContinuousReleaseOptions = {}) {
    return new ReleaseTrigger({
      continuous: true,
      paths: options.paths,
    });
  }

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
   * Paths for which pushes will trigger a release when `isContinuous` is `true`
   */
  public readonly paths?: string[];

  /**
   * Override git-push command used when releasing manually.
   *
   * Set to an empty string to disable pushing.
   */
  public readonly gitPushCommand?: string;

  private constructor(options: ReleaseTriggerOptions = {}) {
    this.isContinuous = options.continuous ?? false;
    this.paths = options.paths;
    this.schedule = options.schedule;
    this.changelogPath = options.changelogPath;
    this.gitPushCommand = options.gitPushCommand;
  }

  /**
   * Whether or not this is a manual release trigger.
   */
  public get isManual() {
    return !(this.isContinuous || this.schedule);
  }
}
