import * as conventionalCommitsParser from "conventional-commits-parser";
import * as gitRawCommits from "git-raw-commits";
import { determineLatestTag } from "./bump-version";

// from: https://learn.microsoft.com/en-us/javascript/api/@azure/keyvault-certificates/requireatleastone?view=azure-node-latest
type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

/**
 * Matches conventional commits. Absence of either types or scopes
 * matches all of them while only checking for the other.
 *
 * Examples:
 * { types: ['fix'], scopes: ['docs'] } matches only "fix(docs)"
 * { types: ['chore', 'ci'] } matches "chore(lib)", "chore:", "ci:", etc.
 * { scopes: ['experimental'] } matches "feat(experimental)", "chore(experimental)", etc.
 */
export type ConventionalCommitMatcher = RequireAtLeastOne<{
  types: string[];
  scopes: string[];
}>;

export interface CheckReleaseOptions {
  /**
   * Skip releasing if only matching commits have been made
   * to the branch since the last release.
   */
  readonly skipConventionalCommits?: ConventionalCommitMatcher[];

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
    options.skipConventionalCommits?.length // there's something to skip
  ) {
    const commitMatchesFilters = createCommitMatchesFilters(
      options.skipConventionalCommits
    );

    const commits = await parseCommits({ latestTag, cwd });
    const allCommitsIgnored = commits.every(commitMatchesFilters);
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

function createCommitMatchesFilters(
  matchers: ConventionalCommitMatcher[]
): (commit: conventionalCommitsParser.Commit) => boolean {
  return (commit: conventionalCommitsParser.Commit) => {
    const hasType = Boolean(commit.type);
    const hasScope = Boolean(commit.scope);
    const isMerge = Boolean(commit.merge);

    // Merge commits are always ignored if the skip feature is used
    if (isMerge) return true;

    // Determine whether to skip based on matchers
    return matchers.some((matcher) => {
      // scope and type need to match
      if (matcher.types?.length && matcher.scopes?.length) {
        return (
          hasType &&
          hasScope &&
          matcher.types.includes(commit.type!) &&
          matcher.scopes.includes(commit.scope!)
        );
      }
      // type needs to match, scope may be any
      if (matcher.types?.length) {
        return hasType && matcher.types.includes(commit.type!);
      }
      // scope needs to match, type may be any
      if (matcher.scopes?.length) {
        return hasScope && matcher.scopes.includes(commit.scope!);
      }

      // nothing did match
      return false;
    });
  };
}
