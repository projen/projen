/**
 * Generate an annotated release tag using version and changelog files.
 *
 * The tag from the release tag from the release tag file will be used as is.
 *
 * The tag annotation message will be set to the content of the provided changelog
 * file.
 *
 * Environment variables:
 *
 * - RELEASE_TAG_FILE: Release Tag file containing the bumped release tag
 * - CHANGELOG_FILE: Changelog to be used for tag annotation
 *
 */
import { tag, TagOptions } from './tag-version';

const changelog = process.env.CHANGELOG;
const releaseTagFile = process.env.RELEASE_TAG_FILE;

if (!releaseTagFile) {
  throw new Error('RELEASE_TAG_FILE is required');
}

if (!changelog) {
  throw new Error('CHANGELOG is required');
}

const opts: TagOptions = {
  changelog,
  releaseTagFile: releaseTagFile,
};

tag(process.cwd(), opts).catch((e: Error) => {
  console.log(e.stack);
  process.exit(1);
});
