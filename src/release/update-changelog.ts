import { join } from 'path';
import { readFile, writeFile } from 'fs-extra';
import * as logging from '../logging';
import { exec } from '../util';
import { Version } from '../version';

export interface UpdateChangelogOptions {
  /**
   * Path to input changelog entry file.
   *
   * Relative to cwd.
   *
   * @example dist/changelog.md
   */
  inputChangelog: string;

  /**
   * Path to project-level changelog.
   *
   * The contents of inputChangelog will be prepended onto
   * this changelog.
   *
   * Relative to cwd
   *
   * @example changelog.md
   */
  outputChangelog: string;

  /**
   * Release version.
   */
  versionFile: string;
}

/**
 * Prepends input changelog entry onto project-level changelog.
 *
 * @param cwd working directory (git repository)
 * @param options options
 */
export async function updateChangelog(
  cwd: string,
  options: UpdateChangelogOptions,
) {
  const inputChangelog = join(cwd, options.inputChangelog);
  const outputChangelog = join(cwd, options.outputChangelog);
  const versionFile = join(cwd, options.versionFile);


  let version = await Version.tryReadVersion(versionFile);

  if (!version) {
    throw new Error(
      `Unable to determine version from ${versionFile}. Cannot proceed with changelog update. Did you run 'bump'?`,
    );
  }

  const inputChangelogContent = await readFile(inputChangelog, 'utf-8');

  if (!inputChangelogContent.includes(version)) {
    throw new Error(
      `Supplied version ${version} was not found in input changelog. You may want to check it's content.`,
    );
  }

  const outputChangelogContent = await readFile(outputChangelog, 'utf-8');

  if (outputChangelogContent.indexOf(`[${version}]`) > -1) {
    logging.info(
      `Changelog already contains an entry for ${version}. Skipping changelog update.`,
    );
    return;
  }

  const newChangelog = inputChangelogContent.trimEnd() + '\n\n' + outputChangelogContent.trimStart();

  await writeFile(
    outputChangelog,
    newChangelog,
  );

  exec(`git add ${outputChangelog} && git commit -m "chore(release): ${version}"`, { cwd });
}
