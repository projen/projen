/**
 * Resolves the latest version from git tags and uses `standard-version` to bump
 * to the next version based on commits.
 *
 * This expects `standard-version` to be installed in the path.
 *
 * Environment variables:
 *
 * - OUTFILE: (required) the name of the JSON output file (the "version" field
 *   will be updated with the latest version)
 * - PRERELEASE: (optional) a prerelease tag to use (e.g. "beta")
 * - MAJOR: major version number NN to filter (tags are filtered by "vNN."
 *   prefix). if not specified, the last major version is selected
 * - CHANGELOG: name of changelog file to create
 *
 */
import { pathExists, readFile, remove, writeFile } from 'fs-extra';
import { execOrUndefined } from '../util';

async function main() {
  const versionFile = process.env.OUTFILE;
  const prerelease = process.env.PRERELEASE;
  const major = process.env.MAJOR;
  const infile = process.env.CHANGELOG;

  if (!versionFile) {
    throw new Error('OUTFILE is required');
  }

  if (!infile) {
    throw new Error('CHANGELOG is required');
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
  if (prerelease) {
    tags = tags.filter(x => new RegExp(`-${prerelease}\.[0-9]+$`).test(x));
  }

  tags = tags.filter(x => x);

  // if a pre-release tag is used, then add it to the initial version
  let firstRelease = false;
  let latest;

  if (tags.length > 0) {
    latest = tags[0];
  } else {
    const initial = `v${major}.0.0`;
    latest = prerelease ? `${initial}-${prerelease}.0` : initial;
    firstRelease = true;
  }

  // remove "v" prefix (if exists)
  if (latest.startsWith('v')) {
    latest = latest.substr(1);
  }

  let content: any = {};
  if (await pathExists(versionFile)) {
    content = JSON.parse(await readFile(versionFile, 'utf8'));
  }

  content.version = latest;

  console.error(`Update ${versionFile} to latest resolved version: ${latest}`);
  await writeFile(versionFile, JSON.stringify(content, undefined, 2));

  // create a standard-version configuration file
  const rcfile = '.versionrc.json';
  await writeFile(rcfile, JSON.stringify({
    packageFiles: [{
      filename: versionFile,
      type: 'json',
    }],
    bumpFiles: [versionFile],
    commitAll: false,
    infile: infile,
    prerelease: prerelease,
    header: '',
    skip: {
      commit: true,
      tag: true,
    },
  }, undefined, 2));

  const cmd = ['npx', 'standard-version@^9'];
  if (firstRelease) {
    cmd.push('--first-release');
  }
  execOrUndefined(cmd.join(' '), { stdio: 'inherit' });
  await remove(rcfile);
}

main().catch((e: Error) => {
  console.log(e.stack);
  process.exit(1);
});
