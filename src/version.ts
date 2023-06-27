import { posix } from "path";
import { Component } from "./component";
import { Project } from "./project";
import { Task } from "./task";

/**
 * Options for `Version`.
 */
export interface VersionOptions {
  /**
   * A name of a .json file to set the `version` field in after a bump.
   *
   * @example "package.json"
   */
  readonly versionInputFile: string;

  /**
   * The name of the directory into which `changelog.md` and `version.txt` files
   * are emitted.
   */
  readonly artifactsDirectory: string;

  /**
   * Custom configuration for versionrc file used by standard-release
   */
  readonly versionrcOptions?: Record<string, any>;

  /**
   * The tag prefix corresponding to this version.
   */
  readonly tagPrefix?: string;

  /**
   * Find commits that should be considered releasable
   * Used to decide if a release is required.
   *
   * @default ReleasableCommits.everyCommit()
   */
  readonly releasableCommits?: ReleasableCommits;
}

export class Version extends Component {
  public static readonly STANDARD_VERSION = "standard-version@^9";

  public readonly bumpTask: Task;
  public readonly unbumpTask: Task;

  /**
   * The name of the changelog file (under `artifactsDirectory`).
   */
  public readonly changelogFileName: string;

  /**
   * The name of the file that contains the version (under `artifactsDirectory`).
   */
  public readonly versionFileName: string;

  /**
   * The name of the file that contains the release tag (under `artifactsDirectory`).
   */
  public readonly releaseTagFileName: string;

  constructor(project: Project, options: VersionOptions) {
    super(project);

    this.changelogFileName = "changelog.md";
    this.versionFileName = "version.txt";
    this.releaseTagFileName = "releasetag.txt";

    const versionInputFile = options.versionInputFile;

    // this command determines if there were any changes since the last release
    // (the top-most commit is not a bump). it is used as a condition for both
    // the `bump` and the `release` tasks.
    const changesSinceLastRelease =
      '! git log --oneline -1 | grep -q "chore(release):"';

    const changelogFile = posix.join(
      options.artifactsDirectory,
      this.changelogFileName
    );
    const bumpFile = posix.join(
      options.artifactsDirectory,
      this.versionFileName
    );
    const releaseTagFile = posix.join(
      options.artifactsDirectory,
      this.releaseTagFileName
    );

    const env: Record<string, string> = {
      OUTFILE: versionInputFile,
      CHANGELOG: changelogFile,
      BUMPFILE: bumpFile,
      RELEASETAG: releaseTagFile,
      RELEASE_TAG_PREFIX: options.tagPrefix ?? "",
      // doesn't work if custom configuration is long
      VERSIONRCOPTIONS: JSON.stringify(options.versionrcOptions),
    };

    if (options.releasableCommits) {
      env.RELEASABLE_COMMITS = options.releasableCommits.cmd;
    }

    this.bumpTask = project.addTask("bump", {
      description:
        "Bumps version based on latest git tag and generates a changelog entry",
      condition: changesSinceLastRelease,
      env: env,
    });

    this.bumpTask.builtin("release/bump-version");

    this.unbumpTask = project.addTask("unbump", {
      description: "Restores version to 0.0.0",
      env: env,
    });

    this.unbumpTask.builtin("release/reset-version");

    project.addGitIgnore(`/${changelogFile}`);
    project.addGitIgnore(`/${bumpFile}`);
    project.addPackageIgnore(`/${changelogFile}`);
    project.addPackageIgnore(`/${bumpFile}`);
  }
}

/**
 * Find commits that should be considered releasable to decide if a release is required.
 */
export class ReleasableCommits {
  /**
   * Release every commit
   *
   * This will only not release if the most recent commit is tagged with the latest matching tag.
   *
   * @param limitToProjectPath Only consider commits relevant to the path of the (sub-)project
   */
  static everyCommit(limitToProjectPath: boolean = false) {
    const cmd = `git log --oneline $LATEST_TAG..HEAD`;

    if (limitToProjectPath) {
      return new ReleasableCommits(`${cmd} -- .`);
    }

    return new ReleasableCommits(cmd);
  }

  /**
   * Limit commits by their conventional commit type
   *
   * This will only release commit that match one of the provided types.
   * Commits are required to follow the conventional commit spec and will be ignored otherwise.
   *
   * @param types List of conventional commit types that should be released
   * @param limitToProjectPath Only consider commits relevant to the path of the (sub-)project
   */
  static ofType(types: string[], limitToProjectPath: boolean = false) {
    // @see: https://github.com/conventional-commits/parser/blob/eeefb961ebf5b9dfea0fea8b06f8ad34a1e439b9/lib/parser.js
    const cmd = `git log --no-merges --oneline $LATEST_TAG..HEAD -E --grep '^(${types.join(
      "|"
    )}){1}(\\([^()\\r\\n]+\\))?(!)?:[^\\S\\r\\n]+.+'`;

    if (limitToProjectPath) {
      return new ReleasableCommits(`${cmd} -- .`);
    }

    return new ReleasableCommits(cmd);
  }

  /**
   * Release only features and fixes
   *
   * Shorthand for `ReleasableCommits.onlyOfType(['feat', 'fix'])`.
   *
   * @param limitToProjectPath Only consider commits relevant to the path of the (sub-)project
   */
  static featuresAndFixes(limitToProjectPath: boolean = false) {
    return ReleasableCommits.ofType(["feat", "fix"], limitToProjectPath);
  }

  /**
   * Use an arbitrary shell command to find releasable commits since the latest tag.
   *
   * A new release will be initiated, if the number of returned commits is greater than zero.
   * Must return a newline separate list of commits that should considered releasable.
   * `$LATEST_TAG` will be replaced with the actual latest tag for the given prefix.*
   *
   * @example "git log --oneline $LATEST_TAG..HEAD -- ."
   */
  static exec(cmd: string) {
    return new ReleasableCommits(cmd);
  }

  private constructor(public cmd: string) {}
}
