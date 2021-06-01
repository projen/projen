import { Component } from './component';
import { JsonFile } from './json';
import { Project } from './project';
import { Task, TaskCategory } from './tasks';

/**
 * Options for `Version`.
 */
export interface VersionOptions {
  /**
   * The initial version of the repo. The first release will bump over this
   * version, so it will be v0.1.1 or v0.2.0 (depending on whether the first
   * bump is minor or patch).
   *
   * @default "v0.1.0"
   */
  readonly initialVersion?: string;

  /**
   * A name of a .json file to set the `version` field in after a bump.
   *
   * @example "package.json"
   */
  readonly versionJson: string;

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

    const versionJson = options.versionJson;
    this.changelogFile = '.changelog.tmp.md';

    // this command determines if there were any changes since the last release
    // (the top-most commit is not a bump). it is used as a condition for both
    // the `bump` and the `release` tasks.
    const changesSinceLastRelease = '! git log --oneline -1 | grep -q "chore(release):"';
    const builtinEnv: any = {
      OUTFILE: versionJson,
      INITIAL_VERSION: options.initialVersion ?? 'v0.1.0',
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
        OUTFILE: versionJson,
      },
    });

    this.unbumpTask.builtin('release/reset-version');

    project.addGitIgnore(`/${this.changelogFile}`);
    project.addPackageIgnore(`/${this.changelogFile}`);
    project.addPackageIgnore('/.versionrc.json');
    new JsonFile(project, '.versionrc.json', {
      obj: {
        packageFiles: [{
          filename: versionJson,
          type: 'json',
        }],
        bumpFiles: [options.versionJson],
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
