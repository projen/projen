
import * as path from 'path';
import * as fs from 'fs-extra';
import { Component } from './component';
import { NodeProject } from './node-project';
import { TaskCategory } from './tasks';
import { writeFile } from './util';

export interface CommitlintOptions {
  /**
     * Commitlint config
     *
     * @default "@commitlint/config-conventional"
     */
  readonly commitlintConfig?: string;
}

export class Commitlint extends Component {
  public readonly commitlintConfig: any;

  constructor(project: NodeProject, options: CommitlintOptions) {
    super(project);

    this.commitlintConfig = options.commitlintConfig ?? '@commitlint/config-conventional';

    // Add devDeps depending on commit config
    project.addDevDeps(
      '@commitlint/cli',
      this.commitlintConfig,
    );

    project.gitignore.include(
      'commitlint.config.js',
    );


    // Create husky commit-msg hook
    const outdir = this.project.outdir;
    const githubDir = path.join(outdir, '.git');
    const huskydir = path.join(outdir, '.husky');

    const huskyCommitMessageHook = 'npx --no-install commitlint --edit "$1"';


    // Create hook if its a github repo
    if (fs.pathExistsSync(githubDir)) {
      writeFile(path.join(huskydir, 'commit-msg'), huskyCommitMessageHook, {
        executable: true,
      });

      // Add task to prepare husky
      project.addTask('prepare', {
        description: 'For husky to enable git-hooks',
        category: TaskCategory.MAINTAIN,
        exec: 'husky install',
      });

      project.addDevDeps(
        'husky@^6.0.0',
      );

      project.gitignore.include(
        '.husky/',
      );
    }

    // Create commitlint config based on user input or default
    const commitlintConfig = `module.exports = {extends: ['${this.commitlintConfig}']};`;

    writeFile(path.join(outdir, 'commitlint.config.js'), commitlintConfig, {
      readonly: true,
    });

  }
}