/**
 * Generate an annotated release tag using version and changelog files.
 *
 * The tag will be normalized to the format "v<version>" where version comes
 * from the provided version file.
 *
 * The tag annotation message will be set to the content of the provided changelog
 * file.
 *
 * Environment variables:
 *
 * - VERSION_FILE: Version file containing the bumped release version
 * - CHANGELOG_FILE: Changelog to be used for tag annotation
 *
 */
import { tag, TagOptions } from './tag-version';

const changelog = process.env.CHANGELOG;
const versionFile = process.env.VERSION_FILE;

if (!versionFile) {
  throw new Error('VERSION_FILE is required');
}

if (!changelog) {
  throw new Error('CHANGELOG is required');
}

const opts: TagOptions = {
  changelog,
  versionFile,
};

tag(process.cwd(), opts).catch((e: Error) => {
  console.log(e.stack);
  process.exit(1);
});
