import { Construct, ISynthesisSession } from 'constructs';
import { JsonFile } from './json';
import { NodeProject } from './node-project';
import { Semver } from './semver';
import * as fs from 'fs-extra';

const VERSION_FILE = 'version.json';

export class Version extends Construct {
  constructor(private readonly project: NodeProject) {
    super(project, 'bump-script');

    project.addScripts({ bump: 'standard-version' });
    project.addScripts({ release: 'yarn bump && git push --follow-tags origin master' });
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
      return '0.0.0';
    }
    return JSON.parse(fs.readFileSync(versionFile, 'utf-8')).version;
  }

  public onSynthesize(session: ISynthesisSession) {
    const versionFile = `${session.outdir}/${VERSION_FILE}`;
    // This shouldn't happen but who knows
    if (!fs.existsSync(versionFile)) {
      if (!fs.existsSync(session.outdir)) {
        fs.mkdirpSync(session.outdir);
      }
      fs.writeFileSync(`${session.outdir}/${VERSION_FILE}`, JSON.stringify({ version: '0.0.0' }));
    }
  }
}