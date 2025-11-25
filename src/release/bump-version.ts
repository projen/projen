import { promises as fs } from "fs";
import { dirname, join } from "path";
import { Config } from "conventional-changelog-config-spec";
import { compare } from "semver";
import * as logging from "../logging";
import { execCapture, execOrUndefined } from "../util";
import { ReleasableCommits } from "../version";
import {
  BumpType,
  parseBumpType,
  performBump,
  relativeBumpType,
  renderBumpType,
} from "./bump-type";
import { CommitAndTagVersion } from "./commit-tag-version";
import { createVersionHandler } from "./version-handlers";

export interface BumpOptions {
  /**
   * The name of a version file to set `version` (e.g., package.json, pyproject.toml, version.json).
   */
  readonly versionFile: string;

  /**
   * The name of the changelog file to generate.
   */
  readonly changelog: string;

  /**
   * Use a pre-release suffix.
   * @default - normal versioning
   */
  readonly prerelease?: string;

  /**
   * Defines the major version line. This is used to select the latest version
   * and also enforce that new major versions are not released accidentally.
   *
   * Can not be set together with `minMajorVersion`.
   *
   * @default - any version is supported
   */
  readonly majorVersion?: number;

  /**
   * Defines the minimal major version. This is used if you want to start with
   * a specific major version, and increment from there on.
   * This can be useful to set to 1, as breaking changes before the 1.x major
   * release are not incrementing the major version number.
   *
   * Can not be set together with `majorVersion`.
   *
   * @default - No minimum version is being enforced
   */
  readonly minMajorVersion?: number;

  /**
   * Defines the minor version line. This is used to select the latest version
   * and also enforce that new minor versions are not released accidentally.
   *
   * @default - any version is supported
   */
  readonly minorVersion?: number;

  /**
   * The name of a file which will include the output version number (a text file).
   *
   * Relative to cwd.
   *
   * @example ".version.txt"
   */
  readonly bumpFile: string;

  /**
   * The name of the file which will include the release tag (a text file).
   *
   * Relative to cwd.
   *
   * @example ".releasetag.txt"
   */
  readonly releaseTagFile: string;

  /**
   * The prefix applied to release tags. Bumps will be made based on the latest
   * version found with this prefix.
   */
  readonly tagPrefix?: string;

  /**
   * Configuration values that would append to versionrc file or overwrite values
   * coming to that from default one.
   */
  readonly versionrcOptions?: Config;

  /**
   * A shell command to list all release commits since the latest tag.
   *
   * A new release will be initiated, if the number of returned commits is greater than zero.
   *
   * `$LATEST_TAG` will be replaced with the actual latest tag for the given prefix.
   *
   * @default "git log --oneline $LATEST_TAG..HEAD"
   */
  readonly releasableCommits?: string;

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
   *
   * The command should print one of the following to `stdout`:
   *
   * - Nothing: the next version number will be determined based on commit history.
   * - `x.y.z`: the next version number will be `x.y.z`.
   * - `major|minor|patch`: the next version number will be the current version number
   *   with the indicated component bumped.
   *
   * This setting cannot be specified together with `minMajorVersion`; the invoked
   * script can be used to achieve the effects of `minMajorVersion`.
   *
   * @default - The next version will be determined based on the commit history and project settings.
   */
  readonly nextVersionCommand?: string;
}

/**
 * Resolves the latest version from git tags and uses `commit-and-tag-version` to bump
 * to the next version based on commits.
 *
 * This expects `commit-and-tag-version` to be installed in the path.
 *
 * @param cwd working directory (git repository)
 * @param options options
 */
export async function bump(cwd: string, options: BumpOptions) {
  const versionFile = join(cwd, options.versionFile);
  const prerelease = options.prerelease;
  const major = options.majorVersion;
  const minor = options.minorVersion;
  const minMajorVersion = options.minMajorVersion;
  const tagPrefix = options.tagPrefix ?? "";
  const bumpFile = join(cwd, options.bumpFile);
  const changelogFile = join(cwd, options.changelog);
  const releaseTagFile = join(cwd, options.releaseTagFile);

  if (major && minMajorVersion) {
    throw new Error(
      `minMajorVersion and majorVersion cannot be used together.`
    );
  }
  if (options.nextVersionCommand && minMajorVersion) {
    throw new Error(
      `minMajorVersion and nextVersionCommand cannot be used together.`
    );
  }
  if (minor && !major) {
    throw new Error(`minorVersion and majorVersion must be used together.`);
  }

  await fs.mkdir(dirname(bumpFile), { recursive: true });
  await fs.mkdir(dirname(changelogFile), { recursive: true });
  await fs.mkdir(dirname(releaseTagFile), { recursive: true });

  const { latestVersion, latestTag, isFirstRelease } = determineLatestTag({
    cwd,
    major,
    minor,
    prerelease,
    prefix: tagPrefix,
  });

  // Write the current version into the version file so that CATV will know the current version
  const versionHandler = createVersionHandler(versionFile);
  logging.info(
    `Update ${versionFile} to latest resolved version: ${latestVersion}`
  );
  versionHandler.writeVersion(latestVersion);

  // Determine the initial bump status. CATV will always do a patch even if
  // there are no commits, so look at commits ourselves first to decide
  // if we even should do nothing at all.
  const shouldRelease = isFirstRelease
    ? true
    : hasNewInterestingCommits({
        cwd,
        latestTag,
        releasableCommits: options.releasableCommits,
      });

  const catv = new CommitAndTagVersion(options.bumpPackage, cwd, {
    versionFile,
    changelogFile,
    prerelease,
    configOptions: options.versionrcOptions,
    tagPrefix,
  });

  // We used to translate `isFirstRelease` to the `--first-release` flag of CATV.
  // What that does is skip a bump, only generate the changelog.
  //
  // Our `{ bump: none }` does the same, so we don't need to carry over this
  // flag anymore.
  let bumpType: BumpType =
    shouldRelease && !isFirstRelease
      ? relativeBumpType(latestVersion, await catv.dryRun())
      : { bump: "none" };

  logging.info(`Bump from commits: ${renderBumpType(bumpType)}`);
  if (options.nextVersionCommand) {
    const nextVersion = execCapture(options.nextVersionCommand, {
      cwd,
      modEnv: {
        VERSION: latestVersion,
        SUGGESTED_BUMP: renderBumpType(bumpType),
        ...(latestTag ? { LATEST_TAG: latestTag } : {}),
      },
    })
      .toString()
      .trim();

    if (nextVersion) {
      try {
        bumpType = parseBumpType(nextVersion);
        logging.info(
          `Bump from nextVersionCommand: ${renderBumpType(bumpType)}`
        );
      } catch (e) {
        throw new Error(
          `nextVersionCommand "${options.nextVersionCommand}" returned invalid output: ${e}`
        );
      }
    }
  }

  // Respect minMajorVersion to correct the result of the nextVersionCommand
  if (minMajorVersion) {
    const bumpedVersion = performBump(latestVersion, bumpType);
    const [majorVersion] = bumpedVersion.split(".");
    const majorVersionNumber = parseInt(majorVersion, 10);
    if (majorVersionNumber < minMajorVersion) {
      bumpType = { bump: "absolute", absolute: `${minMajorVersion}.0.0` };
    }
  }

  // Invoke CATV with the options we landed on. If we decided not to do a bump,
  // we will use this to regenerate the changelog of the most recent version.
  const newRelease = bumpType.bump !== "none";

  // If we're not doing a new release and this is not the
  // first release, we're just regenerating the previous changelog again.
  if (!newRelease && !isFirstRelease) {
    await catv.regeneratePreviousChangeLog(latestVersion, latestTag);
  } else {
    // Otherwise we're either doing a bump + release, or we're releasing the
    // first version as 0.0.0 (which is already the number in the file so we
    // skip bumping).
    await catv.invoke({
      releaseAs: newRelease ? renderBumpType(bumpType) : undefined,
      skipBump: !newRelease,
    });
  }

  // Validate the version that we ended up with
  const newVersion = versionHandler.readVersion();
  if (!newVersion) {
    throw new Error(`bump failed: ${versionFile} does not have a version set`);
  }
  if (major) {
    if (!newVersion.startsWith(`${major}.`)) {
      throw new Error(
        `bump failed: this branch is configured to only publish v${major} releases - bump resulted in ${newVersion}`
      );
    }
  }
  if (minor) {
    if (!newVersion.startsWith(`${major}.${minor}`)) {
      throw new Error(
        `bump failed: this branch is configured to only publish v${major}.${minor} releases - bump resulted in ${newVersion}`
      );
    }
  }

  // Report curent status into the dist/ directory
  const newTag = `${tagPrefix}v${newVersion}`;
  await fs.writeFile(bumpFile, newVersion);
  await fs.writeFile(releaseTagFile, newTag);
}

/**
 * Determine based on releaseable commits whether we should release or not
 */
function hasNewInterestingCommits(options: {
  releasableCommits?: string;
  latestTag: string;
  cwd: string;
}) {
  const findCommits = (
    options.releasableCommits ?? ReleasableCommits.everyCommit().cmd
  ).replace("$LATEST_TAG", options.latestTag);

  const commitsSinceLastTag = execOrUndefined(findCommits, {
    cwd: options.cwd,
  })?.split("\n");
  const numCommitsSinceLastTag = commitsSinceLastTag?.length ?? 0;
  logging.info(
    `Number of commits since ${options.latestTag}: ${numCommitsSinceLastTag}`
  );

  // Nothing to release right now
  if (numCommitsSinceLastTag === 0) {
    logging.info("No new interesting commits.");
    return false;
  }

  return true;
}

interface LatestTagOptions {
  /**
   * Working directory of the git repository.
   */
  readonly cwd: string;
  /**
   * Major version to select from.
   */
  readonly major?: number;
  /**
   * Minor version to select from.
   */
  readonly minor?: number;
  /**
   * A pre-release suffix.
   */
  readonly prerelease?: string;
  /**
   * A prefix applied to all tags.
   */
  readonly prefix: string;
}

/**
 * Determines the latest release tag.
 * @param major (optional) A major version line to select from
 * @param prerelease (optional) A pre-release suffix.
 * @returns the latest tag, and whether it is the first release or not
 */
function determineLatestTag(options: LatestTagOptions): {
  latestVersion: string;
  latestTag: string;
  isFirstRelease: boolean;
} {
  const { cwd, major, minor, prerelease, prefix } = options;

  // filter only tags for this prefix and major version if specified (start with "vNN.").
  let prefixFilter: string;
  if (major !== undefined && minor !== undefined) {
    prefixFilter = `${prefix}v${major}.${minor}.*`;
  } else if (major !== undefined) {
    prefixFilter = `${prefix}v${major}.*`;
  } else {
    prefixFilter = `${prefix}v*`;
  }

  const listGitTags = [
    "git",
    '-c "versionsort.suffix=-"', // makes sure pre-release versions are listed after the primary version
    "tag",
    '--sort="-version:refname"', // sort as versions and not lexicographically
    "--list",
    `"${prefixFilter}"`,
  ].join(" ");

  const stdout = execCapture(listGitTags, { cwd }).toString("utf8");

  let tags = stdout?.split("\n");

  // if prerelease is set and there are existing prerelease tags, filter versions that end with "-PRE.ddd".
  const prereleaseTags = tags.filter((x) =>
    new RegExp(`-${prerelease}\.[0-9]+$`).test(x)
  );
  if (prerelease && prereleaseTags.length > 0) {
    /**
     * Cover the following case specifically
     * 1 - v1.0.0
     * 2 - v1.0.1-beta.0
     * 3 - v1.0.1-beta.1
     * 4 - v1.0.1
     * 5 - now publish a new release on the prerelease branch
     *    by setting the latestTag as v1.0.1 instead of v1.0.1-beta.1
     */
    const releaseTags = tags.filter((x) =>
      new RegExp(`^v([0-9]+)\.([0-9]+)\.([0-9]+)$`).test(x)
    );
    if (
      releaseTags.length > 0 &&
      compare(releaseTags[0], prereleaseTags[0]) === 1
    ) {
      tags = releaseTags;
    } else {
      tags = prereleaseTags;
    }
  }

  tags = tags.filter((x) => x);

  // if a pre-release tag is used, then add it to the initial version
  let isFirstRelease = false;
  let latestTag;

  if (tags.length > 0) {
    latestTag = tags[0];
  } else {
    const initial = `${prefix}v${major ?? 0}.${minor ?? 0}.0`;
    latestTag = prerelease ? `${initial}-${prerelease}.0` : initial;
    isFirstRelease = true;
  }

  // remove tag prefix (if exists)
  let latestVersion = latestTag;
  if (prefix && latestVersion.startsWith(prefix)) {
    latestVersion = latestVersion.substr(prefix.length);
  }

  // remove "v" prefix (if exists)
  if (latestVersion.startsWith("v")) {
    latestVersion = latestVersion.substring(1);
  }

  return { latestVersion, latestTag, isFirstRelease };
}
