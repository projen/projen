import * as path from 'path';
import { Component } from './component';
import { JsonFile } from './json';
import { NodeProject } from './node-project';
import { Task, TaskCategory } from './tasks';
import { execOrUndefined } from './util';

export interface VersionOptions {
  /**
   * The name of the release branch where the code and tags are pushed to.
   */
  readonly releaseBranch: string;
}

export class Version extends Component {

  public readonly bumpTask: Task;

  constructor(project: NodeProject, options: VersionOptions) {
    super(project);

    // this command determines if there were any changes since the last release
    // (the top-most commit is not a bump). it is used as a condition for both
    // the `bump` and the `release` tasks.
    const changesSinceLastRelease = '! git log --oneline -1 | grep -q "chore(release):"';

    this.bumpTask = project.addTask('bump', {
      description: 'Commits a bump to the package version based on conventional commits',
      category: TaskCategory.RELEASE,
      exec: 'standard-version',
      condition: changesSinceLastRelease,
    });

    const release = project.addTask('release', {
      description: `Bumps version & push to ${options.releaseBranch}`,
      category: TaskCategory.RELEASE,
      condition: changesSinceLastRelease,
    });

    release.spawn(this.bumpTask);
    release.exec(`git push --follow-tags origin ${options.releaseBranch}`);

    project.addDevDeps(
      'standard-version@^9',
    );

    project.npmignore?.exclude('/.versionrc.json');

    let projenCommand = project.package.projenCommand;
    if (project.parent) {
      projenCommand = `cd ${path.relative(project.outdir, project.root.outdir)} && ${project.package.projenCommand}`;
    }
    new JsonFile(project, '.versionrc.json', {
      obj: {
        packageFiles: [],
        bumpFiles: [],
        commitAll: false,
        skip: {
          commit: true,
        },
        scripts: {
          // run projen after release to update package.json
          postbump: `${projenCommand} && git add .`,
        },
      },
    });
  }

  /**
   * Returns the current version of the project.
   */
  public get currentVersion() {
    const tag = execOrUndefined('git describe --abbrev=0 --tags --match "v[0-9]*"', { cwd: this.project.outdir });
    if (!tag) {
      return undefined;
    }

    return tag.slice(1); // skip "v" prefix
  }
}
