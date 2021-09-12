import { join } from 'path';
import { pathExists } from 'fs-extra';
import * as utils from '../util';

export interface TagOptions {
  /**
   * Path to version file housing the release version.
   *
   * Relative to cwd.
   *
   * @example `dist/version.txt`
   */
  readonly versionFile: string;

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

  const versionFilePath = join(cwd, options.versionFile);
  const changelogFilePath = join(cwd, options.changelog);

  if (!pathExists(versionFilePath)) {
    throw new Error(`No version file present at ${versionFilePath}`);
  }

  if (!pathExists(changelogFilePath)) {
    throw new Error(`No changelog file present at ${changelogFilePath}`);
  }

  let version = await utils.tryReadVersion(versionFilePath);

  if (!version) {
    throw new Error(`No version present in file at ${versionFilePath}`);
  }

  git(`tag v${version} -a -F ${changelogFilePath}`);
}
