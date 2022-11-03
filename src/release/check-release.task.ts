/**
 * Checks if a release should be skipped. Reads all commits since the latest
 * version from git tags, parses them as conventional commits, and fails with
 * a non-zero exit code if the release should be skipped because every commit
 * did match an ignored commit scope and/or type.
 *
 * Environment variables:
 *
 * - SKIPPED_SCOPES: (optional) fails if all commits match the passed scopes and/or types
 * - SKIPPED_TYPES: (optional) fails if all commits match the passed scopes and/or types
 * - PRERELEASE: (optional) a prerelease tag to use (e.g. "beta")
 * - MAJOR: major version number NN to filter (tags are filtered by "vNN."
 *   prefix). if not specified, the last major version is selected
 * - RELEASE_TAG_PREFIX: (optional) a prefix to apply to the release tag
 *
 */
import * as logging from "../logging";
import { checkRelease, CheckReleaseOptions } from "./check-release";

const prerelease = process.env.PRERELEASE;
const major = process.env.MAJOR;
const prefix = process.env.RELEASE_TAG_PREFIX;
const skippedCommits = process.env.SKIPPED_COMMITS;

const skipConventionalCommits = skippedCommits && JSON.parse(skippedCommits);
if (
  skipConventionalCommits?.some(
    (matcher: any) =>
      !matcher ||
      !Array.isArray(matcher) ||
      !matcher.every(
        (item) =>
          item &&
          typeof item === "object" &&
          (Array.isArray(item.types) || Array.isArray(item.scopes))
      )
  )
) {
  throw new Error(
    `If set, SKIPPED_COMMITS must be a JSON string containing an array of objects with at least one key of the following keys each: scopes, types`
  );
}

const majorVersion =
  major == null || major === "" ? undefined : parseInt(major);
if (Number.isNaN(majorVersion)) {
  throw new Error(`MAJOR must be a number: ${majorVersion}`);
}

const opts: CheckReleaseOptions = {
  majorVersion: majorVersion,
  prerelease: prerelease,
  tagPrefix: prefix,
  skipConventionalCommits,
};
logging.debug(opts);

checkRelease(process.cwd(), opts).catch((e: Error) => {
  console.log(e.stack);
  process.exit(1);
});
