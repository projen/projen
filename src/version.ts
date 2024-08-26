import { posix } from "path";
import { IConstruct } from "constructs";
import { Component } from "./component";
import { Dependencies, DependencyType } from "./dependencies";
import { Task } from "./task";

/**
 * This command determines if there were any changes since the last release in a cross-platform compatible way.
 * It is used as a condition for both the `bump` and the `release` tasks.
 *
 * Explanation:
 *  - log commits                                               | git log
 *  - limit log output to a single line per commit              | --oneline
 *  - looks only at the most recent commit                      | -1
 *  - silent grep output                                        | grep -q
 *  - exits with code 0 if a match is found                     | grep -q "chore(release):"
 *  - exits with code 1 if a match is found (reverse-match)     | grep -qv "chore(release):"
 */
export const CHANGES_SINCE_LAST_RELEASE =
  'git log --oneline -1 | grep -qv "chore(release):"';

/**
 * The default package to be used for commit-and-tag-version
 */
const COMMIT_AND_TAG_VERSION_DEFAULT = "commit-and-tag-version@^12";

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

  /**
   * The `commit-and-tag-version` compatible package used to bump the package version, as a dependency string.
   *
   * This can be any compatible package version, including the deprecated `standard-version@9`.
   *
   * @default "commit-and-tag-version@12"
   */
  readonly bumpPackage?: string;
}

export class Version extends Component {
  /**
   * @deprecated use `Version.bumPackage` on the component instance instead
   */
  public static readonly STANDARD_VERSION = COMMIT_AND_TAG_VERSION_DEFAULT;

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

  /**
   * The package used to bump package versions, as a dependency string.
   * This is a `commit-and-tag-version` compatible package.
   */
  public readonly bumpPackage: string;

  constructor(scope: IConstruct, options: VersionOptions) {
    super(scope);

    this.changelogFileName = "changelog.md";
    this.versionFileName = "version.txt";
    this.releaseTagFileName = "releasetag.txt";
    this.bumpPackage = options.bumpPackage ?? COMMIT_AND_TAG_VERSION_DEFAULT;

    const { name: bumpName, version: bumpVersion } =
      Dependencies.parseDependency(this.bumpPackage);
    if (
      !this.project.deps.isDependencySatisfied(
        bumpName,
        DependencyType.BUILD,
        bumpVersion ?? "*"
      )
    ) {
      this.project.deps.addDependency(this.bumpPackage, DependencyType.BUILD);
    }

    const versionInputFile = options.versionInputFile;

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

    const commonEnv: Record<string, string> = {
      OUTFILE: versionInputFile,
      CHANGELOG: changelogFile,
      BUMPFILE: bumpFile,
      RELEASETAG: releaseTagFile,
      RELEASE_TAG_PREFIX: options.tagPrefix ?? "",
      // doesn't work if custom configuration is long
      VERSIONRCOPTIONS: JSON.stringify(options.versionrcOptions),
      BUMP_PACKAGE: this.bumpPackage,
    };

    if (options.releasableCommits) {
      commonEnv.RELEASABLE_COMMITS = options.releasableCommits.cmd;
    }

    this.bumpTask = this.project.addTask("bump", {
      description:
        "Bumps version based on latest git tag and generates a changelog entry",
      condition: CHANGES_SINCE_LAST_RELEASE,
      env: { ...commonEnv },
    });

    this.bumpTask.builtin("release/bump-version");

    this.unbumpTask = this.project.addTask("unbump", {
      description: "Restores version to 0.0.0",
      env: { ...commonEnv },
    });

    this.unbumpTask.builtin("release/reset-version");

    this.project.addGitIgnore(`/${changelogFile}`);
    this.project.addGitIgnore(`/${bumpFile}`);
    this.project.addPackageIgnore(`/${changelogFile}`);
    this.project.addPackageIgnore(`/${bumpFile}`);
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
   * @param path Consider only commits that are enough to explain how the files that match the specified paths came to be.
   * This path is relative to the current working dir of the `bump` task, i.e. to only consider commits of a subproject use `"."`.
   */
  static everyCommit(path?: string) {
    const cmd = `git log --oneline $LATEST_TAG..HEAD`;
    return new ReleasableCommits(withPath(cmd, path));
  }

  /**
   * Limit commits by their conventional commit type
   *
   * This will only release commit that match one of the provided types.
   * Commits are required to follow the conventional commit spec and will be ignored otherwise.
   *
   * @param types List of conventional commit types that should be released
   * @param path Consider only commits that are enough to explain how the files that match the specified paths came to be.
   * This path is relative to the current working dir of the `bump` task, i.e. to only consider commits of a subproject use `"."`.
   */
  static ofType(types: string[], path?: string) {
    const allowedTypes = types.join("|");

    // @see: https://github.com/conventional-commits/parser/blob/eeefb961ebf5b9dfea0fea8b06f8ad34a1e439b9/lib/parser.js
    // -E requires this to be POSIX Extended Regular Expression, which comes with certain limitations
    // see https://en.wikibooks.org/wiki/Regular_Expressions/POSIX-Extended_Regular_Expressions for details
    const cmd = `git log --no-merges --oneline $LATEST_TAG..HEAD -E --grep "^(${allowedTypes}){1}(\\([^()[:space:]]+\\))?(!)?:[[:blank:]]+.+"`;

    return new ReleasableCommits(withPath(cmd, path));
  }

  /**
   * Release only features and fixes
   *
   * Shorthand for `ReleasableCommits.onlyOfType(['feat', 'fix'])`.
   *
   * @param path Consider only commits that are enough to explain how the files that match the specified paths came to be.
   * This path is relative to the current working dir of the `bump` task, i.e. to only consider commits of a subproject use `"."`.
   */
  static featuresAndFixes(path?: string) {
    return ReleasableCommits.ofType(["feat", "fix"], path);
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

/**
 * Append a path argument to a git command if one is provided
 */
function withPath(cmd: string, path?: string): string {
  if (path !== undefined) {
    return `${cmd} -- ${path}`;
  }

  return cmd;
}
