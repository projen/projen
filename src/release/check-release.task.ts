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
const skippedScopes = process.env.SKIPPED_SCOPES;
const skippedTypes = process.env.SKIPPED_TYPES;

const skipConventionalCommitScopes = skippedScopes?.split(",");
if (
  skipConventionalCommitScopes?.some(
    (scope) => typeof scope !== "string" || scope.length < 1
  )
) {
  throw new Error(
    `SKIPPED_SCOPES must be a comma separated list of strings with a length >= 1. Got: ${skippedScopes}`
  );
}

const skipConventionalCommitTypes = skippedTypes?.split(",");
if (
  skipConventionalCommitTypes?.some(
    (scope) => typeof scope !== "string" || scope.length < 1
  )
) {
  throw new Error(
    `SKIPPED_TYPES must be a comma separated list of strings with a length >= 1. Got: ${skippedTypes}`
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
  skipConventionalCommitScopes,
  skipConventionalCommitTypes,
};
logging.debug(opts);

checkRelease(process.cwd(), opts).catch((e: Error) => {
  console.log(e.stack);
  process.exit(1);
});
