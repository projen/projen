import { Construct } from 'constructs';
import { YamlFile } from './yaml';
import { NodeProject } from './node-project';

export interface DependabotOptions {
  /**
   * How often to check for new versions and raise pull requests.
   *
   * @default ScheduleInterval.DAILY
   */
  readonly scheduleInterval?: ScheduleInterval;

  /**
   * The strategy to use when edits manifest and lock files.
   *
   * @default VersioningStrategy.LOCKFILE_ONLY The default is to only update the
   * lock file because package.json is controlled by projen and any outside
   * updates will fail the build.
   */
  readonly versioningStrategy?: VersioningStrategy;

  /**
   * Automatically merge dependabot PRs if build CI build passes.
   * @default true
   */
  readonly autoMerge?: boolean;
}

/**
 * How often to check for new versions and raise pull requests for version
 * updates.
 */
export enum ScheduleInterval {
  /**
   * Runs on every weekday, Monday to Friday.
   */
  DAILY = 'daily',

  /**
   * Runs once each week. By default, this is on Monday.
   */
  WEEKLY = 'weekly',

  /**
   * Runs once each month. This is on the first day of the month.
   */
  MONTHLY = 'monthly'
}

/**
 * The strategy to use when edits manifest and lock files.
 */
export enum VersioningStrategy {
  /**
   * Only create pull requests to update lockfiles updates. Ignore any new
   * versions that would require package manifest changes.
   */
  LOCKFILE_ONLY = 'lockfile-only',

  /**
   * - For apps, the version requirements are increased.
   * - For libraries, the range of versions is widened.
   */
  AUTO = 'auto',

  /**
   * Relax the version requirement to include both the new and old version, when
   * possible.
   */
  WIDEN = 'widen',

  /**
   * Always increase the version requirement to match the new version.
   */
  INCREASE = 'increase',

  /**
   * Increase the version requirement only when required by the new version.
   */
  INCREASE_IF_NECESSARY = 'increase-if-necessary',
}

/**
 * Defines dependabot configuration for node projects.
 *
 * Since module versions are managed in projen, the versioning strategy will be
 * configured to "lockfile-only" which means that only updates that can be done
 * on the lockfile itself will be proposed.
 */
export class Dependabot extends Construct {
  /**
   * The raw dependabot configuration.
   * @see https://docs.github.com/en/github/administering-a-repository/configuration-options-for-dependency-updates
   */
  public readonly config: any;

  constructor(project: NodeProject, options: DependabotOptions = {}) {
    super(project, 'dependabot');

    this.config = {
      version: 2,
      updates: [
        {
          'package-ecosystem': 'npm',
          'versioning-strategy': 'lockfile-only',
          'directory': '/',
          'schedule': {
            interval: options.scheduleInterval ?? ScheduleInterval.DAILY,
          },
        },
      ],
    };

    new YamlFile(project, '.github/dependabot.yml', {
      obj: this.config,
      committed: true,
    });

    if (options.autoMerge ?? true) {
      project.mergify?.addRule({
        name: 'Merge pull requests from dependabot if CI passes',
        conditions: [
          'author=dependabot[bot]',
          'status-success=build',
        ],
        actions: {
          merge: {
            method: 'merge',
            commit_message: 'title+body',
          },
        },
      });
    }
  }
}