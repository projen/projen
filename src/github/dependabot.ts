import { GitHub } from "./github";
import { Component } from "../component";
import { kebabCaseKeys } from "../util";
import { YamlFile } from "../yaml";

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
   * https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#allow
   *
   * Use the allow option to customize which dependencies are updated. This
   * applies to both version and security updates.
   *
   * @default []
   */
  readonly allow?: DependabotAllow[];

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

  /**
   * Map of package registries to use
   * @default - use public registries
   */
  readonly registries?: { [name: string]: DependabotRegistry };

  /**
   * Sets the maximum of pull requests Dependabot opens for version updates.
   * Dependabot will not open any new requests until some of those open requests
   * are merged or closed.
   *
   * @default 5
   */
  readonly openPullRequestsLimit?: number;

  /**
   * Specify individual assignees or teams of assignees for all pull requests raised
   * for a package manager.
   * @default []
   */
  readonly assignees?: string[];

  /**
   * Specify individual reviewers or teams of reviewers for all pull requests raised
   * for a package manager.
   * @default []
   */
  readonly reviewers?: string[];

  /**
   * https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#groups
   *
   * You can create groups to package dependency updates together into a single PR.
   *
   * @default []
   */
  readonly groups?: { [name: string]: DependabotGroup };
}

/**
 * Use to add private registry support for dependabot
 * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#configuration-options-for-private-registries
 */
export interface DependabotRegistry {
  /**
   * Registry type e.g. 'npm-registry' or 'docker-registry'
   */
  readonly type: DependabotRegistryType;

  /**
   * Url for the registry e.g. 'https://npm.pkg.github.com' or 'registry.hub.docker.com'
   */
  readonly url: string;

  /**
   * The username that Dependabot uses to access the registry
   * @default - do not authenticate
   */
  readonly username?: string;

  /**
   * A reference to a Dependabot secret containing the password for the specified user
   * @default undefined
   */
  readonly password?: string;

  /**
   * A reference to a Dependabot secret containing an access key for this registry
   * @default undefined
   */
  readonly key?: string;

  /**
   * Secret token for dependabot access e.g. '${{ secrets.DEPENDABOT_PACKAGE_TOKEN }}'
   * @default undefined
   */
  readonly token?: string;

  /**
   * For registries with type: python-index, if the boolean value is true, pip
   * esolves dependencies by using the specified URL rather than the base URL of
   * the Python Package Index (by default https://pypi.org/simple)
   * @default undefined
   */
  readonly replacesBase?: boolean;

  /**
   * Used with the hex-organization registry type.
   * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#hex-organization
   * @default undefined
   */
  readonly organization?: string;
}

/**
 * Each configuration type requires you to provide particular settings.
 * Some types allow more than one way to connect
 * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#configuration-options-for-private-registries
 */
export enum DependabotRegistryType {
  /**
   * The composer-repository type supports username and password.
   * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#composer-repository
   */
  COMPOSER_REGISTRY = "composer-registry",

  /**
   * The docker-registry type supports username and password.
   * The docker-registry type can also be used to pull from Amazon ECR using static AWS credentials
   * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#docker-registry
   */
  DOCKER_REGISTRY = "docker-registry",

  /**
   * The git type supports username and password
   * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#git
   */
  GIT = "git",

  /**
   * The hex-organization type supports organization and key
   * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#hex-organization
   */
  HEX_ORGANIZATION = "hex-organization",

  /**
   * The maven-repository type supports username and password, or token
   * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#maven-repository
   */
  MAVEN_REPOSITORY = "maven-repository",

  /**
   * The npm-registry type supports username and password, or token
   * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#npm-registry
   */
  NPM_REGISTRY = "npm-registry",

  /**
   * The nuget-feed type supports username and password, or token
   * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#nuget-feed
   */
  NUGET_FEED = "nuget-feed",

  /**
   * The python-index type supports username and password, or token
   * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#python-index
   */
  PYTHON_INDEX = "python-index",

  /**
   * The rubygems-server type supports username and password, or token
   * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#rubygems-server
   */
  RUBYGEMS_SERVER = "rubygems-server",

  /**
   * The terraform-registry type supports a token
   * @see https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#terraform-registry
   */
  TERRAFORM_REGISTRY = "terraform-registry",
}

/**
 * You can use the `allow` option to customize which dependencies are updated.
 * The allow option supports the following options.
 */
export interface DependabotAllow {
  /**
   * Use to allow updates for dependencies with matching names, optionally
   * using `*` to match zero or more characters.
   *
   * For Java dependencies, the format of the dependency-name attribute is:
   * `groupId:artifactId`, for example: `org.kohsuke:github-api`.
   */
  readonly dependencyName: string;
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
 * Defines a single group for dependency updates
 */
export interface DependabotGroup {
  /**
   * Define a list of strings (with or without wildcards) that will match
   * package names to form this dependency group.
   */
  readonly patterns: string[];

  /**
   * Optionally you can use this to exclude certain dependencies from the
   * group.
   */
  readonly excludePatterns?: string[];
}

/**
 * How often to check for new versions and raise pull requests for version
 * updates.
 */
export enum DependabotScheduleInterval {
  /**
   * Runs on every weekday, Monday to Friday.
   */
  DAILY = "daily",

  /**
   * Runs once each week. By default, this is on Monday.
   */
  WEEKLY = "weekly",

  /**
   * Runs once each month. This is on the first day of the month.
   */
  MONTHLY = "monthly",
}

/**
 * The strategy to use when edits manifest and lock files.
 */
export enum VersioningStrategy {
  /**
   * Only create pull requests to update lockfiles updates. Ignore any new
   * versions that would require package manifest changes.
   */
  LOCKFILE_ONLY = "lockfile-only",

  /**
   * - For apps, the version requirements are increased.
   * - For libraries, the range of versions is widened.
   */
  AUTO = "auto",

  /**
   * Relax the version requirement to include both the new and old version, when
   * possible.
   */
  WIDEN = "widen",

  /**
   * Always increase the version requirement to match the new version.
   */
  INCREASE = "increase",

  /**
   * Increase the version requirement only when required by the new version.
   */
  INCREASE_IF_NECESSARY = "increase-if-necessary",
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

  /**
   * Whether or not projen is also upgraded in this config,
   */
  public readonly ignoresProjen: boolean;

  private readonly allow: any[];
  private readonly ignore: any[];

  constructor(github: GitHub, options: DependabotOptions = {}) {
    super(github.project);

    const project = github.project;

    this.allow = [];
    this.ignore = [];
    this.ignoresProjen = options.ignoreProjen ?? true;

    const registries = options.registries
      ? kebabCaseKeys(options.registries)
      : undefined;

    const groups = options.groups ? kebabCaseKeys(options.groups) : undefined;

    this.config = {
      version: 2,
      registries,
      updates: [
        {
          "package-ecosystem": "npm",
          "versioning-strategy": "lockfile-only",
          directory: "/",
          schedule: {
            interval:
              options.scheduleInterval ?? DependabotScheduleInterval.DAILY,
          },
          allow: () => (this.allow.length > 0 ? this.allow : undefined),
          ignore: () => (this.ignore.length > 0 ? this.ignore : undefined),
          labels: options.labels ? options.labels : undefined,
          registries: registries ? Object.keys(registries) : undefined,
          groups: groups ? groups : undefined,
          assignees:
            options.assignees && options.assignees.length > 0
              ? options.assignees
              : undefined,
          reviewers:
            options.reviewers && options.reviewers.length > 0
              ? options.reviewers
              : undefined,
          "open-pull-requests-limit":
            options.openPullRequestsLimit !== undefined
              ? options.openPullRequestsLimit
              : undefined,
        },
      ],
    };

    new YamlFile(project, ".github/dependabot.yml", {
      obj: this.config,
      committed: true,
    });

    for (const i of options.allow ?? []) {
      this.addAllow(i.dependencyName);
    }

    for (const i of options.ignore ?? []) {
      this.addIgnore(i.dependencyName, ...(i.versions ?? []));
    }

    if (this.ignoresProjen) {
      this.addIgnore("projen");
    }
  }

  /**
   * Allows a dependency from automatic updates.
   *
   * @param dependencyName Use to allow updates for dependencies with matching
   * names, optionally using `*` to match zero or more characters.
   */
  public addAllow(dependencyName: string) {
    this.allow.push({
      "dependency-name": dependencyName,
    });
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
      "dependency-name": dependencyName,
      versions: () => (versions.length > 0 ? versions : undefined),
    });
  }
}
