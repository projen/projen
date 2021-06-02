//
// Prints the latest version of a repository based on git tags.
// Version is printed without the "v" prefix.
//
// Environment variables:
//
//  OUTFILE: (required) the name of the JSON output file (the "version" field will be updated with the latest version)
//  PRERELEASE: a prerelease tag to use (e.g. "beta").
//  MAJOR: major version number NN to filter (tags are filtered by "vNN." prefix). if not specified, the last major version is selected
//

import { pathExists, readFile, writeFile } from 'fs-extra';
import { execOrUndefined } from '../util';

async function main() {
  const outfile = process.env.OUTFILE;
  const pre = process.env.PRERELEASE;
  const major = process.env.MAJOR;
  const initial = `v${major}.0.0`;

  if (!outfile) {
    throw new Error('OUTFILE is required');
  }

  // filter only tags for this major version if specified (start  with "vNN.").
  const prefix = major ? `v${major}.*` : 'v*';

  const listGitTags = [
    'git',
    '-c "versionsort.suffix=-"', // makes sure pre-release versions are listed after the primary version
    'tag',
    '--sort="-version:refname"', // sort as versions and not lexicographically
    '--list',
    `"${prefix}"`,
  ].join(' ');

  const stdout = execOrUndefined(listGitTags) ?? '';
  let tags = stdout?.split('\n');

  // if "pre" is set, filter versions that end with "-PRE.ddd".
  if (pre) {
    tags = tags.filter(x => new RegExp(`-${pre}\.[0-9]+$`).test(x));
  }

  tags = tags.filter(x => x);

  // if a pre-release tag is used, then add it to the initial version
  const initialWithPre = pre ? `${initial}-${pre}.0` : initial;
  let latest = tags.length ? tags[0] : initialWithPre;

  // remove "v" prefix (if exists)
  if (latest.startsWith('v')) {
    latest = latest.substr(1);
  }

  let content: any = {};
  if (await pathExists(outfile)) {
    content = JSON.parse(await readFile(outfile, 'utf8'));
  }

  content.version = latest;

  console.error(`Update ${outfile} to latest resolved version: ${latest}`);
  await writeFile(outfile, JSON.stringify(content, undefined, 2));
}

main().catch((e: Error) => {
  console.log(e.stack);
  process.exit(1);
});
