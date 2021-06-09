import { version } from 'yargs';
import { Component } from '../component';
import { YamlFile } from '../yaml';
import { GitHub } from './github';

export interface DependabotOptions {
  /**
   * How often to check for new versions and raise pull requests.
   *
   * @default ScheduleInterval.DAILY
   */
  readonly scheduleInterval?: DependabotScheduleInterval;

  /**
   * The strategy to use when edits manifest and lock files.
   *
   * @default VersioningStrategy.LOCKFILE_ONLY The default is to only update the
   * lock file because package.json is controlled by projen and any outside
   * updates will fail the build.
   */
  readonly versioningStrategy?: VersioningStrategy;

  /**
   * You can use the `ignore` option to customize which dependencies are updated.
   * The ignore option supports the following options.
   * @default []
   */
  readonly ignore?: DependabotIgnore[];

  /**
   * Ignores updates to `projen`.
   *
   * This is required since projen updates may cause changes in committed files
   * and anti-tamper checks will fail.
   *
   * Projen upgrades are covered through the `ProjenUpgrade` class.
   *
   * @default true
   */
  readonly ignoreProjen?: boolean;

  /**
   * List of labels to apply to the created PR's.
   */
  readonly labels?: string[];
}

/**
 * You can use the `ignore` option to customize which dependencies are updated.
 * The ignore option supports the following options.
 */
export interface DependabotIgnore {
  /**
   * Use to ignore updates for dependencies with matching names, optionally
   * using `*` to match zero or more characters.
   *
   * For Java dependencies, the format of the dependency-name attribute is:
   * `groupId:artifactId`, for example: `org.kohsuke:github-api`.
   */
  readonly dependencyName: string;

  /**
   * Use to ignore specific versions or ranges of versions. If you want to
   * define a range, use the standard pattern for the package manager (for
   * example: `^1.0.0` for npm, or `~> 2.0` for Bundler).
   */
  readonly versions?: string[];
}

/**
 * How often to check for new versions and raise pull requests for version
 * updates.
 */
export enum DependabotScheduleInterval {
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
export class Dependabot extends Component {
  /**
   * The raw dependabot configuration.
   * @see https://docs.github.com/en/github/administering-a-repository/configuration-options-for-dependency-updates
   */
  public readonly config: any;

  private readonly ignore: any[];

  constructor(github: GitHub, options: DependabotOptions = {}) {
    super(github.project);

    const project = github.project;

    this.ignore = [];

    this.config = {
      version: 2,
      updates: [
        {
          'package-ecosystem': 'npm',
          'versioning-strategy': 'lockfile-only',
          'directory': '/',
          'schedule': {
            interval: options.scheduleInterval ?? DependabotScheduleInterval.DAILY,
          },
          'ignore': () => this.ignore.length > 0 ? this.ignore : undefined,
          'labels': options.labels ? options.labels : undefined,
        },
      ],
    };

    new YamlFile(project, '.github/dependabot.yml', {
      obj: this.config,
      committed: true,
    });

    for (const i of options.ignore ?? []) {
      this.addIgnore(i.dependencyName, ...(i.versions ?? []));
    }

    if (options.ignoreProjen ?? true) {
      this.addIgnore('projen');
    }
  }

  /**
   * Ignores a dependency from automatic updates.
   *
   * @param dependencyName Use to ignore updates for dependencies with matching
   * names, optionally using `*` to match zero or more characters.
   * @param versions Use to ignore specific versions or ranges of versions. If
   * you want to define a range, use the standard pattern for the package
   * manager (for example: `^1.0.0` for npm, or `~> 2.0` for Bundler).
   */
  public addIgnore(dependencyName: string, ...versions: string[]) {
    this.ignore.push({
      'dependency-name': dependencyName,
      'versions': () => versions.length > 0 ? version : undefined,
    });
  }
}
