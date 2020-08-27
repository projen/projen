import { JsonFile } from './json';
import { NodeProject } from './node-project';
import { Semver } from './semver';
import * as fs from 'fs-extra';
import { StartEntryCategory } from './start';

const VERSION_FILE = 'version.json';

export class Version {
  constructor(project: NodeProject) {

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
    project.gitignore.include(VERSION_FILE);

    new JsonFile(project, '.versionrc.json', {
      obj: {
        packageFiles: [ {  filename: VERSION_FILE,  type: 'json' } ],
        bumpFiles: [ { filename: VERSION_FILE, type: 'json' }  ],
        commitAll: true,
        scripts: {
          // run projen after release to update package.json
          postbump: 'yarn projen && git add .',
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
