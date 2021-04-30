import { Component } from './component';
import { JsonFile } from './json';
import { NodeProject } from './node-project';
import { Task, TaskCategory } from './tasks';

export class Version extends Component {

  public readonly bumpTask: Task;
  public readonly unbumpTask: Task;
  public readonly changelogFile: string;

  constructor(project: NodeProject) {
    super(project);

    const versionFile = '.version.tmp.json';
    this.changelogFile = '.changelog.tmp.md';

    // this command determines if there were any changes since the last release
    // (the top-most commit is not a bump). it is used as a condition for both
    // the `bump` and the `release` tasks.
    const changesSinceLastRelease = '! git log --oneline -1 | grep -q "chore(release):"';

    this.bumpTask = project.addTask('bump', {
      description: 'Bumps version based on latest git tag and generates a changelog entry',
      category: TaskCategory.RELEASE,
      condition: changesSinceLastRelease,
    });

    // the default for "standard-version" is to find a tag across the entire
    // repository but we want to select the last tag accessible from the
    // *current branch*.
    this.bumpTask.exec(`git describe --tags --match="v*" --first-parent --abbrev=0 > ${versionFile}`);
    this.bumpTask.exec('standard-version');

    this.unbumpTask = project.addTask('unbump', {
      description: 'Restores version to 0.0.0',
      category: TaskCategory.RELEASE,
      exec: 'standard-version -r 0.0.0',
    });

    project.addDevDeps(
      'standard-version@^9',
    );

    project.npmignore?.exclude('/.versionrc.json');
    project.gitignore.addPatterns(`/${this.changelogFile}`);
    project.gitignore.addPatterns(`/${versionFile}`);

    new JsonFile(project, '.versionrc.json', {
      obj: {
        packageFiles: [{
          filename: versionFile,
          type: 'plain-text',
        }],
        bumpFiles: ['package.json'],
        commitAll: false,
        infile: this.changelogFile,
        header: '',
        skip: {
          commit: true,
          tag: true,
        },
      },
    });
  }
}
