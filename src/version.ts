import { Component } from './component';
import { JsonFile } from './json';
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

  /**
   * Bump the version as a pre-release tag.
   *
   * @default - normal releases
   */
  readonly prerelease?: string;
}

export class Version extends Component {
  public static readonly STANDARD_VERSION = 'standard-version@^9';

  public readonly bumpTask: Task;
  public readonly unbumpTask: Task;
  public readonly changelogFile: string;

  constructor(project: Project, options: VersionOptions) {
    super(project);

    const versionFile = options.versionFile;
    this.changelogFile = '.changelog.tmp.md';

    // this command determines if there were any changes since the last release
    // (the top-most commit is not a bump). it is used as a condition for both
    // the `bump` and the `release` tasks.
    const changesSinceLastRelease = '! git log --oneline -1 | grep -q "chore(release):"';
    const builtinEnv: any = {
      OUTFILE: versionFile,
    };

    if (options.prerelease) {
      builtinEnv.PRERELEASE = options.prerelease;
    }

    this.bumpTask = project.addTask('bump', {
      description: 'Bumps version based on latest git tag and generates a changelog entry',
      category: TaskCategory.RELEASE,
      condition: changesSinceLastRelease,
      env: builtinEnv,
    });


    // run `standard-version` through npx so it can be executed from
    // node_modules if installed or install on-demand for other project types.
    const standardVersion = `npx ${Version.STANDARD_VERSION}`;

    this.bumpTask.builtin('release/resolve-version');
    this.bumpTask.exec(standardVersion);

    this.unbumpTask = project.addTask('unbump', {
      description: 'Restores version to 0.0.0',
      category: TaskCategory.RELEASE,
      env: {
        OUTFILE: versionFile,
      },
    });

    this.unbumpTask.builtin('release/reset-version');

    project.addGitIgnore(`/${this.changelogFile}`);
    project.addPackageIgnore(`/${this.changelogFile}`);
    project.addPackageIgnore('/.versionrc.json');
    new JsonFile(project, '.versionrc.json', {
      obj: {
        packageFiles: [{
          filename: versionFile,
          type: 'json',
        }],
        bumpFiles: [options.versionFile],
        commitAll: false,
        infile: this.changelogFile,
        prerelease: options.prerelease,
        header: '',
        skip: {
          commit: true,
          tag: true,
        },
      },
    });
  }
}
