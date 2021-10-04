/**
 * Prepends the release changelog entry onto the provided project-level changelog
 *
 * Currently assumes a headerless changelog formatted according to
 * [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)
 * rules.
 *
 * Environment variables:
 *
 * - RELEASE_TAG_FILE: Current release tag file
 * - CHANGELOG_FILE: Release changelog
 * - PROJECT_CHANGELOG_FILE: Project-level changelog
 *
 */
import { updateChangelog, UpdateChangelogOptions } from './update-changelog';

const inputChangelog = process.env.CHANGELOG;
const outputChangelog = process.env.PROJECT_CHANGELOG_FILE;
const releaseTagFile = process.env.VERSION_FILE;

if (!releaseTagFile) {
  throw new Error('RELEASE_TAG_FILE is required');
}

if (!inputChangelog) {
  throw new Error('CHANGELOG is required');
}

if (!outputChangelog) {
  throw new Error('PROJECT_CHANGELOG_FILE is required');
}

const opts: UpdateChangelogOptions = {
  inputChangelog,
  outputChangelog,
  releaseTagFile: releaseTagFile,
};

updateChangelog(process.cwd(), opts).catch((e: Error) => {
  console.log(e.stack);
  process.exit(1);
});
