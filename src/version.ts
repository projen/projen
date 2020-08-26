import { JsonFile } from './json';
import { NodeProject } from './node-project';
import { Semver } from './semver';
import * as fs from 'fs-extra';
import { StartEntryCategory } from './start';

/**
 * The standard-version "updater" defines how the version file will be bumped.
 */
export enum VersionUpdater {
  /**
   * The `plain-text` updater assumes the file contents represents the version.
   */
  PLAINTEXT = 'plain-text',

  /**
   * The `json` updater assumes the version is available under a `version` key in the provided JSON document.
   */
  JSON = 'json',
}

/**
 * standard-version supports lifecycle scripts. These allow you to execute your own supplementary commands during the
 * release.
 */
export interface LifecycleScriptOptions {
  /**
   * Executed before anything happens. If the prerelease script returns a non-zero exit code, versioning will be aborted,
   * but it has no other effect on the process.
   *
   * @default - no prerelease script
   */
  readonly prerelease?: string;

  /**
   * Executed before the version is bumped. If the prebump script returns a version #, it will be used rather than the
   * version calculated by standard-version.
   *
   * @default - no prebump script
   */
  readonly prebump?: string;

  /**
   * Executed after the version is bumped.
   *
   * @default - no postbump script
   */
  readonly postbump?: string;

  /**
   * Executed before the CHANGELOG is generated.
   *
   * @default - no prechangelog script
   */
  readonly prechangelog?: string;

  /**
   * Executed after the CHANGELOG is generated.
   *
   * @default - no postchangelog script
   */
  readonly postchangelog?: string;

  /**
   * Executed before the commit step.
   *
   * @default - no precommit script
   */
  readonly precommit?: string;

  /**
   * Executed after the commit step.
   *
   * @default - no postcommit script
   */
  readonly postcommit?: string;

  /**
   * Executed before the tagging step.
   *
   * @default - no pretag script
   */
  readonly pretag?: string;

  /**
   * Executed after the tagging step.
   *
   * @default - no posttag script
   */
  readonly posttag?: string;
}

/**
 * standard-version allows for skipping any of the lifecycle steps (bump, changelog, commit, tag).
 */
export interface SkipOptions {
  /**
   * Skip the `bump` lifecycle step.
   *
   * @default false
   */
  readonly bump?: boolean;

  /**
   * Skip the `changelog` lifecycle step.
   *
   * @default false
   */
  readonly changelog?: boolean;

  /**
   * Skip the `commit` lifecycle step.
   *
   * @default false
   */
  readonly commit?: boolean;

  /**
   * Skip the `tag` lifecycle step.
   *
   * @default false
   */
  readonly tag?: boolean;
}

export interface VersionOptions {
  /**
   * Filename used to track the version.
   *
   * @default 'version.json'
   */
  readonly versionFilename?: string;

  /**
   * The standard-version "updater" defines how the version file will be bumped.
   *
   * @default VersionUpdater.JSON
   */
  readonly versionUpdater?: VersionUpdater;

  /**
   * Commit generated artifacts in the release commit.
   *
   * @default false
   */
  readonly commitAll?: boolean;

  /**
   * standard-version allows for skipping any of the lifecycle steps (bump, changelog, commit, tag).
   *
   * @default - no lifecycle steps are skipped
   */
  readonly skip?: SkipOptions;

  /**
   * standard-version supports lifecycle scripts. These allow you to execute your own supplementary commands during
   * the release.
   *
   * @default - no lifecycle scripts
   */
  readonly lifecycleScripts?: LifecycleScriptOptions;
}

export class Version {
  private readonly versionFile: string;
  private readonly versionUpdater: VersionUpdater;

  constructor(project: NodeProject, options?: VersionOptions) {
    this.versionFile = options?.versionFilename ?? 'version.json';
    this.versionUpdater = options?.versionUpdater ?? VersionUpdater.JSON;

    const bumpFiles = [{ filename: this.versionFile, type: this.versionUpdater.toString() }];

    project.addScript('no-changes', '(git log --oneline -1 | grep -q "chore(release):") && echo "No changes to release."');
    project.addScript('bump', 'yarn --silent no-changes || standard-version');
    project.addScript('release', 'yarn --silent no-changes || (yarn bump && git push --follow-tags origin master)');

    project.start?.addEntry('bump', {
      descrtiption: 'Commits a bump to the package version based on conventional commits',
      category: StartEntryCategory.RELEASE,
    });

    project.start?.addEntry('release', {
      descrtiption: 'Bumps version & push to master',
      category: StartEntryCategory.RELEASE,
    });

    project.addDevDependencies({
      'standard-version': Semver.caret('9.0.0'),
    });

    project.npmignore.exclude('/.versionrc.json');
    project.gitignore.include(this.versionFile);

    new JsonFile(project, '.versionrc.json', {
      obj: {
        packageFiles: bumpFiles,
        bumpFiles,
        commitAll: options?.commitAll,
        scripts: options?.lifecycleScripts,
        skip: options?.skip,
      },
    });
  }

  /**
   * Returns the current version of the project.
   */
  public resolveVersion(outdir: string) {
    const versionFilePath = `${outdir}/${this.versionFile}`;
    if (!fs.existsSync(versionFilePath)) {
      if (!fs.existsSync(outdir)) {
        fs.mkdirpSync(outdir);
      }

      const defaultVersionFile = this.versionUpdater == VersionUpdater.JSON
        ? JSON.stringify({ version: '0.0.0' })
        : '0.0.0';
      fs.writeFileSync(versionFilePath, defaultVersionFile);
    }

    const versionFileContents = fs.readFileSync(versionFilePath, 'utf-8');

    switch (this.versionUpdater) {
      case VersionUpdater.JSON:
        return JSON.parse(versionFileContents).version;
      case VersionUpdater.PLAINTEXT:
        return versionFileContents;

      default:
        throw new Error(`VersionUpdater value unhandled: ${this.versionUpdater}`);
    }
  }
}
