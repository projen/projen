import { promises as fs, existsSync } from "fs";
import { dirname, join } from "path";
import { Config } from "conventional-changelog-config-spec";
import { compare } from "semver";
import * as logging from "../logging";
import { exec, execCapture, execOrUndefined } from "../util";
import { ReleasableCommits } from "../version";

export interface BumpOptions {
  /**
   * The name of a .json file to set `version`.
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
export async function bump(cwd: string, options: BumpOptions) {
  const versionFile = join(cwd, options.versionFile);
  const prerelease = options.prerelease;
  const major = options.majorVersion;
  const minor = options.minorVersion;
  const minMajorVersion = options.minMajorVersion;
  const prefix = options.tagPrefix ?? "";
  const bumpFile = join(cwd, options.bumpFile);
  const changelogFile = join(cwd, options.changelog);
  const releaseTagFile = join(cwd, options.releaseTagFile);
  if (major && minMajorVersion) {
    throw new Error(
      `minMajorVersion and majorVersion cannot be used together.`
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
    prefix,
  });

  const { contents, newline } = await tryReadVersionFile(versionFile);

  // update version
  contents.version = latestVersion;

  logging.info(
    `Update ${versionFile} to latest resolved version: ${latestVersion}`
  );
  await fs.writeFile(
    versionFile,
    JSON.stringify(contents, undefined, 2) + (newline ? "\n" : "")
  );

  // check for commits since the last release tag
  let skipBump = false;

  // First Release is never skipping bump
  if (!isFirstRelease) {
    const findCommits = (
      options.releasableCommits ?? ReleasableCommits.everyCommit().cmd
    ).replace("$LATEST_TAG", latestTag);
    const commitsSinceLastTag = execOrUndefined(findCommits, { cwd })?.split(
      "\n"
    );
    const numCommitsSinceLastTag = commitsSinceLastTag?.length ?? 0;
    logging.info(
      `Number of commits since ${latestTag}: ${numCommitsSinceLastTag}`
    );

    // Nothing to release right now
    if (numCommitsSinceLastTag === 0) {
      logging.info("Skipping bump...");
      skipBump = true;

      // delete the existing tag (locally)
      // if we don't do this, standard-version generates an empty changelog
      exec(`git tag --delete ${latestTag}`, { cwd });
    }
  }

  // create a standard-version configuration file
  const rcfile = join(cwd, ".versionrc.json");
  await generateVersionrcFile(
    rcfile,
    versionFile,
    changelogFile,
    skipBump,
    prerelease,
    options.versionrcOptions
  );

  const cmd = ["npx", "standard-version@^9"];
  if (isFirstRelease) {
    cmd.push("--first-release");
  }
  if (prefix) {
    cmd.push(`--tag-prefix ${prefix}v`);
  }
  if (minMajorVersion) {
    const [majorVersion] = latestVersion.split(".");
    const majorVersionNumber = parseInt(majorVersion, 10);
    if (majorVersionNumber < minMajorVersion) {
      cmd.push(`--release-as ${minMajorVersion}.0.0`);
    }
  }

  exec(cmd.join(" "), { cwd });

  // add the tag back if it was previously removed
  if (skipBump) {
    exec(`git tag ${latestTag}`, { cwd });
  }

  await fs.rm(rcfile, { force: true, recursive: true });

  const newVersion = (await tryReadVersionFile(versionFile)).version;
  if (!newVersion) {
    throw new Error(`bump failed: ${versionFile} does not have a version set`);
  }

  // if MAJOR is defined, ensure that the new version is within the same major version
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

  await fs.writeFile(bumpFile, newVersion);

  const newTag = `${prefix}v${newVersion}`;
  await fs.writeFile(releaseTagFile, newTag);
}

async function tryReadVersionFile(
  versionFile: string
): Promise<{ contents: any; version?: string; newline: boolean }> {
  if (!existsSync(versionFile)) {
    return { contents: {}, newline: true };
  }
  const raw = await fs.readFile(versionFile, "utf-8");
  const contents = JSON.parse(raw);

  return {
    contents,
    version: contents.version,
    newline: raw.endsWith("\n"),
  };
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

function generateVersionrcFile(
  rcfile: string,
  versionFile: string,
  changelogFile: string,
  skipBump: boolean,
  prerelease?: string,
  configOptions?: Config
) {
  return fs.writeFile(
    rcfile,
    JSON.stringify(
      {
        ...{
          packageFiles: [
            {
              filename: versionFile,
              type: "json",
            },
          ],
          bumpFiles: [
            {
              filename: versionFile,
              type: "json",
            },
          ],
          commitAll: false,
          infile: changelogFile,
          prerelease: prerelease,
          header: "",
          skip: {
            commit: true,
            tag: true,
            bump: skipBump,
          },
          ...configOptions,
        },
      },
      undefined,
      2
    )
  );
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
