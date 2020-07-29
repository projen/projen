import { Construct } from 'constructs';
import { JsonFile } from './json';
import { NodeProject } from './node-project';
import { Semver } from './semver';
import * as fs from 'fs-extra';

const VERSION_FILE = 'version.json';

export class Version extends Construct {
  constructor(private readonly project: NodeProject) {
    super(project, 'bump-script');

    project.addScripts({ 'no-changes': '(git log --oneline -1 | grep -q "chore(release):") && echo "No changes to release."' });
    project.addScripts({ bump: 'yarn --silent no-changes || standard-version' });
    project.addScripts({ release: 'yarn --silent no-changes || (yarn bump && git push --follow-tags origin master)' });

    project.addDevDependencies({
      'standard-version': Semver.caret('8.0.1'),
    });

    project.npmignore.comment('standard-version configuration');
    project.npmignore.exclude('/.versionrc.json');

    project.gitignore.comment('always commit version file');
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
  public get current() {
    const versionFile = `${this.project.outdir}/${VERSION_FILE}`;
    if (!fs.existsSync(versionFile)) {
      if (!fs.existsSync(this.project.outdir)) {
        fs.mkdirpSync(this.project.outdir);
      }
      fs.writeFileSync(versionFile, JSON.stringify({ version: '0.0.0' }));
    }

    return JSON.parse(fs.readFileSync(versionFile, 'utf-8')).version;
  }
}