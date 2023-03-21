import { promises as fs } from "fs";
import { join } from "path";
import * as logging from "../logging";
import * as utils from "../util";

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
 * Currently assumes a headerless changelog formatted according to
 * [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)
 * rules.
 *
 * @param cwd working directory (git repository)
 * @param options options
 */
export async function updateChangelog(
  cwd: string,
  options: UpdateChangelogOptions
) {
  const inputChangelog = join(cwd, options.inputChangelog);
  const outputChangelog = join(cwd, options.outputChangelog);
  const versionFile = join(cwd, options.versionFile);

  let version = (await utils.tryReadFile(versionFile)).trim();

  if (!version) {
    throw new Error(
      `Unable to determine version from ${versionFile}. Cannot proceed with changelog update. Did you run 'bump'?`
    );
  }

  const inputChangelogContent = await fs.readFile(inputChangelog, "utf-8");
  const changelogVersionSearchPattern = `${version}`;

  if (!inputChangelogContent.includes(changelogVersionSearchPattern)) {
    throw new Error(
      `Supplied version ${version} was not found in input changelog. You may want to check it's content.`
    );
  }

  const outputChangelogContent = await fs.readFile(outputChangelog, {
    encoding: "utf-8",
    flag: "a+",
  });

  if (outputChangelogContent.indexOf(changelogVersionSearchPattern) > -1) {
    logging.info(
      `Changelog already contains an entry for ${version}. Skipping changelog update.`
    );
    return;
  }

  const newChangelog =
    inputChangelogContent.trimEnd() +
    "\n\n" +
    outputChangelogContent.trimStart();

  await fs.writeFile(outputChangelog, newChangelog);

  utils.exec(
    `git add ${outputChangelog} && git commit -m "chore(release): ${version}"`,
    { cwd }
  );
}
