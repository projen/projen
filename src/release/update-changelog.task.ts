/**
 * Prepends the release changelog entry onto the provided project-level changelog
 *
 * Environment variables:
 *
 * - VERSION_FILE: Current release version file
 * - CHANGELOG_FILE: Release changelog
 * - PROJECT_CHANGELOG_FILE: Project-level changelog
 *
 */
import { updateChangelog, UpdateChangelogOptions } from './update-changelog';

const inputChangelog = process.env.CHANGELOG;
const outputChangelog = process.env.PROJECT_CHANGELOG_FILE;
const versionFile = process.env.VERSION_FILE;

if (!versionFile) {
  throw new Error('VERSION_FILE is required');
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
  versionFile,
};

updateChangelog(process.cwd(), opts).catch((e: Error) => {
  console.log(e.stack);
  process.exit(1);
});
