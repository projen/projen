import { posix } from "path";
import type { IConstruct } from "constructs";
import { Component } from "./component";
import { Dependencies, DependencyType } from "./dependencies";
import { NodePackage } from "./javascript/node-package";
import type { Task } from "./task";

/**
 * This command determines if there were any changes since the last release in a
 * cross-platform compatible way. It is used as a condition for both the `bump`
 * and the `release` tasks: it exits 0 (proceed) when the most recent commit is
 * not a release commit, and non-zero (skip) when the most recent commit is a
 * `chore(release):` commit.
 *
 * Explanation:
 *  - `git log --oneline -1`          the most recent commit, one line
 *  - `| grep -v "chore(release):"`   pass the line through only if it is NOT a release commit
 *  - `> /dev/null`                   discard grep's output; only its exit code matters
 *
 * grep exits 0 when it prints at least one non-matching line (a normal commit,
 * so proceed) and 1 when every line matches (a release commit, so skip).
 *
 * IMPORTANT: do NOT reintroduce `grep -q` here (i.e. do not "optimize" this back
 * to `grep -qv`). `grep -q` exits as soon as it has an answer and closes the read
 * end of the pipe. When this condition runs through projen's built-in (dax)
 * shell, that early close races with `git log` still writing to the pipe, and dax
 * surfaces the failed write as a spurious non-zero exit ("stdin pipe broken.
 * Invalid state: WritableStream is closed"). The task runtime cannot distinguish
 * that from a legitimate skip (dax reports it as a plain non-zero code under
 * `.noThrow()`, not as an error), so the bump/release task is silently skipped: a
 * release is missed, or a dependent publishes a broken `^0.0.0` version range.
 * Plain `grep -v ... > /dev/null` reads to EOF instead of short-circuiting, so it
 * never closes the pipe while the writer is active and the race cannot occur. The
 * exit semantics are identical to the previous `grep -qv`.
 */
export const CHANGES_SINCE_LAST_RELEASE =
  'git log --oneline -1 | grep -v "chore(release):" > /dev/null';

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

  /**
   * A shell command to control the next version to release.
   *
   * If present, this shell command will be run before the bump is executed, and
   * it determines what version to release. It will be executed in the following
   * environment:
   *
   * - Working directory: the project directory.
   * - `$VERSION`: the current version. Looks like `1.2.3`.
   * - `$LATEST_TAG`: the most recent tag. Looks like `prefix-v1.2.3`, or may be unset.
   * - `$SUGGESTED_BUMP`: the suggested bump action based on commits. One of `major|minor|patch|none`.
   *
   * The command should print one of the following to `stdout`:
   *
   * - Nothing: the next version number will be determined based on commit history.
   * - `x.y.z`: the next version number will be `x.y.z`.
   * - `major|minor|patch`: the next version number will be the current version number
   *   with the indicated component bumped.
   *
   * @default - The next version will be determined based on the commit history and project settings.
   */
  readonly nextVersionCommand?: string;
}

export class Version extends Component {
  public readonly bumpTask: Task;
  public readonly unbumpTask: Task;

  /**
   * The task that prints the releasable commits since the latest tag. Spawned
   * by `bump`; its shell can be overridden via `task.shell`.
   */
  public readonly releasableCommitsTask: Task;

  /**
   * The task that runs the user's `nextVersionCommand`, if configured. Spawned
   * by `bump`; its shell can be overridden via `task.shell`.
   */
  public readonly nextVersionTask?: Task;

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

  private readonly nextVersionCommand?: string;

  constructor(scope: IConstruct, options: VersionOptions) {
    super(scope);

    this.changelogFileName = "changelog.md";
    this.versionFileName = "version.txt";
    this.releaseTagFileName = "releasetag.txt";
    this.bumpPackage = options.bumpPackage ?? COMMIT_AND_TAG_VERSION_DEFAULT;
    this.nextVersionCommand = options.nextVersionCommand;

    // This component is language independent.
    // However, when in the Node.js ecosystem, we can improve the experience by adding a dev dependency on the bump package.
    const node = NodePackage.of(this.project);
    if (node) {
      const { name: bumpName, version: bumpVersion } =
        Dependencies.parseDependency(this.bumpPackage);
      node.project.deps.requestDependency({
        name: bumpName,
        version: bumpVersion,
        type: DependencyType.BUILD,
      });
    }

    const versionInputFile = options.versionInputFile;

    const changelogFile = posix.join(
      options.artifactsDirectory,
      this.changelogFileName,
    );
    const bumpFile = posix.join(
      options.artifactsDirectory,
      this.versionFileName,
    );
    const releaseTagFile = posix.join(
      options.artifactsDirectory,
      this.releaseTagFileName,
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

    // The command that lists releasable commits, run as its own spawnable task
    // so its shell can be configured independently (see `TaskShell`).
    // `$LATEST_TAG` is provided by `bump` when spawning it.
    this.releasableCommitsTask = this.project.addTask(
      "bump:releasable-commits",
      {
        description: "Print the releasable commits since the latest release",
        exec: (options.releasableCommits ?? ReleasableCommits.everyCommit())
          .cmd,
      },
    );

    // The optional command that decides the next version, also its own task.
    if (this.nextVersionCommand) {
      this.nextVersionTask = this.project.addTask("bump:next-version", {
        description: "Determine the next version to release",
        exec: this.nextVersionCommand,
      });
    }

    // Orchestrates the release bump as a pipeline of builtins and spawned
    // tasks, handing results forward via step `outputEnv` captures.
    this.bumpTask = this.project.addTask("bump", {
      description:
        "Bumps version based on latest git tag and generates a changelog entry",
      condition: CHANGES_SINCE_LAST_RELEASE,
      env: { ...commonEnv },
    });

    this.bumpTask.addSteps(
      { builtin: "release/resolve-latest-tag", outputEnv: "LATEST_TAG" },
      // On a first release the resolved tag is synthetic and does not exist, so
      // there is nothing to diff against - skip listing commits in that case.
      {
        spawn: "bump:releasable-commits",
        outputEnv: "RELEASABLE_COMMITS",
        condition: 'git rev-parse --verify --quiet "refs/tags/$LATEST_TAG"',
      },
      { builtin: "release/suggest-version-bump", outputEnv: "SUGGESTED_BUMP" },
    );
    if (this.nextVersionTask) {
      // `bump:next-version` receives `$VERSION` (the current version); read it
      // from the version file into `VERSION` so it propagates to the spawn.
      this.bumpTask.addSteps(
        {
          exec: `node -e "process.stdout.write(JSON.parse(require('fs').readFileSync(process.env.OUTFILE,'utf8')).version)"`,
          outputEnv: "VERSION",
        },
        { spawn: "bump:next-version", outputEnv: "BUMP_TYPE" },
      );
    }
    this.bumpTask.addSteps({ builtin: "release/apply-version-bump" });

    // Resets the version in the version file back to 0.0.0 after a bump.
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

  /**
   * Return the environment variables to modify the bump command for release branches.
   *
   * These options are used to modify the behavior of the version bumping script
   * for additional branches, by setting environment variables.
   *
   * No settings are inherited from the base `Version` object (but any parameters that
   * control versions do conflict with the use of a `nextVersionCommand`).
   */
  public envForBranch(
    branchOptions: VersionBranchOptions,
  ): Record<string, string> {
    if (this.nextVersionCommand && branchOptions.minMajorVersion) {
      throw new Error(
        "minMajorVersion and nextVersionCommand cannot be used together.",
      );
    }

    const env: Record<string, string> = {};
    if (branchOptions.majorVersion !== undefined) {
      env.MAJOR = branchOptions.majorVersion.toString();
    }

    if (branchOptions.minMajorVersion !== undefined) {
      if (branchOptions.majorVersion !== undefined) {
        throw new Error(
          `minMajorVersion and majorVersion cannot be used together.`,
        );
      }

      env.MIN_MAJOR = branchOptions.minMajorVersion.toString();
    }

    if (branchOptions.prerelease) {
      env.PRERELEASE = branchOptions.prerelease;
    }

    if (branchOptions.tagPrefix) {
      env.RELEASE_TAG_PREFIX = branchOptions.tagPrefix;
    }

    return env;
  }
}

/**
 * Options to pass to `modifyBranchEnvironment`
 */
export interface VersionBranchOptions {
  /**
   * The major versions released from this branch.
   */
  readonly majorVersion?: number;

  /**
   * The minimum major version to release.
   */
  readonly minMajorVersion?: number;

  /**
   * The minor versions released from this branch.
   */
  readonly minorVersion?: number;

  /**
   * Bump the version as a pre-release tag.
   *
   * @default - normal releases
   */
  readonly prerelease?: string;

  /**
   * Automatically add the given prefix to release tags.
   * Useful if you are releasing on multiple branches with overlapping
   * version numbers.
   *
   * Note: this prefix is used to detect the latest tagged version
   * when bumping, so if you change this on a project with an existing version
   * history, you may need to manually tag your latest release
   * with the new prefix.
   *
   * @default - no prefix
   */
  readonly tagPrefix?: string;
}

/**
 * Find commits that should be considered releasable to decide if a release is required.
 *
 * This setting only controls whether a release is triggered, yes or no. The
 * paths used here are independent of the code that controls what commits are inspected
 * to determine the version number.
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
    const cmd = `git log --no-merges --oneline $LATEST_TAG..HEAD -E --grep '^(${allowedTypes}){1}(\\([^()[:space:]]+\\))?(!)?:[[:blank:]]+.+'`;

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
   * `$LATEST_TAG` is available as an environment variable (set to the actual latest tag for the given prefix).
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
