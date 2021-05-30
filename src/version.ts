import { Component } from './component';
import { JsonFile } from './json';
import { Project } from './project';
import { Task, TaskCategory } from './tasks';

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
   * The command to use to execute `standard-version`.
   *
   * @default "npx standard-version@^9"
   */
  readonly standardVersionCommand?: string;
}

export class Version extends Component {
  public readonly bumpTask: Task;
  public readonly unbumpTask: Task;
  public readonly changelogFile: string;

  constructor(project: Project, options: VersionOptions) {
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

    const listGitTags = [
      'git',
      '-c "versionsort.suffix=-"', // makes sure pre-release versions are listed after the primary version
      'tag',
      '--sort="-version:refname"', // sort as versions and not lexicographically
      '--list',
      '"v*"', // only tags that start with "v"
    ].join(' ');

    // this is the version used if a tag with a "v" prefix cannot be found in the repo.
    const initialVersion = options.initialVersion ?? 'v0.1.0';
    const standardVersionCommand = options.standardVersionCommand ?? 'npx standard-version@^9';

    this.bumpTask.exec(`${listGitTags} | head -n1 > ${versionFile}`);
    this.bumpTask.exec(`if [ "$(cat ${versionFile})" = "" ]; then echo "${initialVersion}" > ${versionFile}; fi`);
    this.bumpTask.exec(standardVersionCommand);
    this.bumpTask.exec(`rm -f ${versionFile}`);

    this.unbumpTask = project.addTask('unbump', {
      description: 'Restores version to 0.0.0',
      category: TaskCategory.RELEASE,
      exec: `${standardVersionCommand} -r 0.0.0`,
    });

    project.addGitIgnore(`/${this.changelogFile}`);
    project.addGitIgnore(`/${versionFile}`);
    project.addPackageIgnore(`/${this.changelogFile}`);

    project.addPackageIgnore('/.versionrc.json');
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
