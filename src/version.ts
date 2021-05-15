import { Component } from './component';
import { JsonFile } from './json';
import { NodeProject } from './node-project';
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
}

export class Version extends Component {
  public readonly bumpTask: Task;
  public readonly unbumpTask: Task;
  public readonly changelogFile: string;

  constructor(project: NodeProject, options: VersionOptions) {
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

    this.bumpTask.exec(`echo "{\n  \\"version\\": \\"$(${listGitTags} | head -n1)\\"\n}" > ${versionFile}`);
    this.bumpTask.exec(`if [ "$(cat ${versionFile})" = "" ]; then echo "{\n  \\"version\\": \\"${initialVersion}\\"\n}" > ${versionFile}; fi`);
    this.bumpTask.exec('standard-version');

    this.unbumpTask = project.addTask('unbump', {
      description: 'Restores version to 0.0.0',
      category: TaskCategory.RELEASE,
      exec: 'standard-version -r 0.0.0',
    });

    project.addDevDeps(
      'standard-version@^9',
    );

    project.npmignore?.addPatterns(`/${this.changelogFile}`);
    project.npmignore?.addPatterns(`/${versionFile}`);
    project.npmignore?.addPatterns('/.versionrc.json');
    project.gitignore.addPatterns(`/${this.changelogFile}`);
    project.gitignore.addPatterns(`/${versionFile}`);

    new JsonFile(project, '.versionrc.json', {
      obj: {
        packageFiles: [{
          filename: versionFile,
          type: 'json',
        }],
        bumpFiles: ['.version.tmp.json'],
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
