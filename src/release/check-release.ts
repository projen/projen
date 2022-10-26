import * as conventionalCommitsParser from "conventional-commits-parser";
import * as gitRawCommits from "git-raw-commits";
import { determineLatestTag } from "./bump-version";

export interface CheckReleaseOptions {
  /**
   * Skip releasing if only commits matching these types have been made
   * to the branch since the last release
   *
   * e.g. ["chore"] skips if e.g. the only commit was "chore: update Readme"
   */
  readonly skipConventionalCommitTypes?: string[];

  /**
   * Skip releasing if only commits matching these scopes have been made
   * to the branch since the last release
   *
   * e.g. ["docs"] skips if e.g. the only commit was "fix(docs): fix docs typo"
   */
  readonly skipConventionalCommitScopes?: string[];

  /**
   * An optional pre-release suffix. Used to determine the lastest tag of the
   * last released version
   */
  readonly prerelease?: string;

  /**
   * Defines the major version line. Used to determine the lastest tag of the
   * last released version
   */
  readonly majorVersion?: number;

  /**
   * The prefix applied to release tags. Used to determine the lastest tag of the
   * last released version
   */
  readonly tagPrefix?: string;
}

/**
 * Resolves the latest version from git tags and uses `standard-version` to bump
 * to the next version based on commits.
 *
 * This expects `standard-version` to be installed in the path.
 *
 * @param cwd working directory (git repository)
 * @param options options
 */
export async function checkRelease(cwd: string, options: CheckReleaseOptions) {
  const prerelease = options.prerelease;
  const major = options.majorVersion;
  const prefix = options.tagPrefix ?? "";

  const { latestTag, isFirstRelease } = determineLatestTag({
    cwd,
    major,
    prerelease,
    prefix,
  });

  if (
    !isFirstRelease && // don't skip the first ever release
    (options.skipConventionalCommitTypes?.length || // there's something to skip
      options.skipConventionalCommitScopes?.length)
  ) {
    const commits = await parseCommits({ latestTag, cwd });
    const allCommitsIgnored = commits.every(
      (commit) =>
        (commit.scope &&
          options.skipConventionalCommitScopes?.includes(commit.scope)) ||
        (commit.type &&
          options.skipConventionalCommitTypes?.includes(commit.type))
    );
    if (allCommitsIgnored) {
      throw new Error(
        "No new commits have been added that warrant a release. All new commits were ignored"
      );
    }
  }
}

interface ParseCommitOptions {
  /**
   * Working directory of the git repository.
   */
  cwd: string;
  /**
   * Tag of the previously released version.
   */
  latestTag: string;
}

async function parseCommits(
  options: ParseCommitOptions
): Promise<conventionalCommitsParser.Commit[]> {
  return new Promise<conventionalCommitsParser.Commit[]>((resolve, reject) => {
    const commits: conventionalCommitsParser.Commit[] = [];
    gitRawCommits({ from: options.latestTag }, { cwd: options.cwd })
      .pipe(conventionalCommitsParser())
      .on("data", (d: conventionalCommitsParser.Commit) => {
        commits.push(d);
      })
      .on("error", reject)
      .on("end", () => resolve(commits));
  });
}
