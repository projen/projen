import * as fs from 'fs-extra';
import { Component } from './component';
import { JsonFile } from './json';
import { NodeProject } from './node-project';
import { StartEntryCategory } from './start';

const VERSION_FILE = 'version.json';

export interface VersionOptions {
  /**
   * The name of the release branch where the code and tags are pushed to.
   */
  readonly releaseBranch: string;
}

export class Version extends Component {
  constructor(project: NodeProject, options: VersionOptions) {
    super(project);

    project.setScript('no-changes', '(git log --oneline -1 | grep -q "chore(release):") && echo "No changes to release."');

    project.addTask('bump', {
      description: 'Commits a bump to the package version based on conventional commits',
      category: StartEntryCategory.RELEASE,
      exec: `${project.runScriptCommand} --silent no-changes || standard-version`,
    });

    project.addTask('release', {
      description: `Bumps version & push to ${options.releaseBranch}`,
      category: StartEntryCategory.RELEASE,
      exec: `${project.runScriptCommand} --silent no-changes || (${project.runScriptCommand} bump && git push --follow-tags origin ${options.releaseBranch})`,
    });

    project.addDevDeps(
      'standard-version@^9.0.0',
    );

    project.npmignore?.exclude('/.versionrc.json');
    project.gitignore.include(VERSION_FILE);

    new JsonFile(project, '.versionrc.json', {
      obj: {
        packageFiles: [{ filename: VERSION_FILE, type: 'json' }],
        bumpFiles: [{ filename: VERSION_FILE, type: 'json' }],
        commitAll: true,
        scripts: {
          // run projen after release to update package.json
          postbump: `${project.runScriptCommand} projen && git add .`,
        },
      },
    });
  }

  /**
   * Returns the current version of the project.
   */
  public resolveVersion(outdir: string) {
    const versionFile = `${outdir}/${VERSION_FILE}`;
    if (!fs.existsSync(versionFile)) {
      if (!fs.existsSync(outdir)) {
        fs.mkdirpSync(outdir);
      }
      fs.writeFileSync(versionFile, JSON.stringify({ version: '0.0.0' }));
    }

    return JSON.parse(fs.readFileSync(versionFile, 'utf-8')).version;
  }
}
