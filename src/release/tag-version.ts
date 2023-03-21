import { existsSync } from "fs";
import { join } from "path";
import * as utils from "../util";

export interface TagOptions {
  /**
   * Path to release tag file housing the release version.
   *
   * Relative to cwd.
   *
   * @example `dist/releaseTag.txt`
   */
  readonly releaseTagFile: string;

  /**
   * Path to release-specific changelog file.
   *
   * Relative to cwd.
   *
   * @example `dist/changelog.md`
   */
  readonly changelog: string;
}

/**
 * Generate an annotated release tag using version and changelog files.
 *
 * The tag will be normalized to the format "v<version>" where version comes
 * from the provided version file.
 *
 * The tag annotation message will be set to the content of the provided release
 * changelog file.
 *
 * @param cwd working directory (git repository)
 * @param options options
 */
export async function tag(cwd: string, options: TagOptions) {
  const git = (cmd: string) => utils.exec(`git ${cmd}`, { cwd: cwd });

  const releaseTagFilePath = join(cwd, options.releaseTagFile);
  const changelogFilePath = join(cwd, options.changelog);

  if (!existsSync(releaseTagFilePath)) {
    throw new Error(`No release tag file present at ${releaseTagFilePath}`);
  }

  if (!existsSync(changelogFilePath)) {
    throw new Error(`No changelog file present at ${changelogFilePath}`);
  }

  let releaseTag = (await utils.tryReadFile(releaseTagFilePath)).trim();

  if (!releaseTag) {
    throw new Error(`No version present in file at ${releaseTagFilePath}`);
  }

  git(`tag ${releaseTag} -a -F ${changelogFilePath}`);
}
