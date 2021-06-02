import { Component } from './component';
import { Project } from './project';
import { Task, TaskCategory } from './tasks';

/**
 * Options for `Version`.
 */
export interface VersionOptions {
  /**
   * A name of a .json file to set the `version` field in after a bump.
   *
   * @example "package.json"
   */
  readonly versionFile: string;
}

export class Version extends Component {
  public static readonly STANDARD_VERSION = 'standard-version@^9';

  public readonly bumpTask: Task;
  public readonly unbumpTask: Task;
  public readonly changelogFile: string;

  constructor(project: Project, options: VersionOptions) {
    super(project);

    this.changelogFile = '.changelog.tmp.md';

    // this command determines if there were any changes since the last release
    // (the top-most commit is not a bump). it is used as a condition for both
    // the `bump` and the `release` tasks.
    const changesSinceLastRelease = '! git log --oneline -1 | grep -q "chore(release):"';
    const env = {
      OUTFILE: options.versionFile,
      CHANGELOG: this.changelogFile,
    };

    this.bumpTask = project.addTask('bump', {
      description: 'Bumps version based on latest git tag and generates a changelog entry',
      category: TaskCategory.RELEASE,
      condition: changesSinceLastRelease,
      env: env,
    });

    this.bumpTask.builtin('release/bump-version');

    this.unbumpTask = project.addTask('unbump', {
      description: 'Restores version to 0.0.0',
      category: TaskCategory.RELEASE,
      env: env,
    });

    this.unbumpTask.builtin('release/reset-version');

    project.addGitIgnore(`/${this.changelogFile}`);
    project.addPackageIgnore(`/${this.changelogFile}`);
  }
}
