import { Construct } from 'constructs';
import { JsonFile } from './json';
import { NodeProject } from './node-project';
import { Semver } from './semver';

export class BumpScript extends Construct {
  constructor(project: NodeProject) {
    super(project, 'bump-script');

    project.addScripts({
      bump: 'standard-version',
    });

    project.addDevDependencies({
      'standard-version': Semver.caret('8.0.0'),
    });

    project.gitignore.include('.versionrc.json');
    project.npmignore.exclude('.versionrc.json');

    new JsonFile(this, '.versionrc.json', {
      packageFiles: [ {  filename: 'version.json',  type: 'json' } ],
      bumpFiles: [ { filename: 'version.json', type: 'json' }  ],
      commitAll: true,
      scripts: {
        postbump: 'yarn projen && git add .',
      },
    });
  }
}