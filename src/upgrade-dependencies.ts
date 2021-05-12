import { Component } from './component';
import { GithubWorkflow } from './github';
import { NodeProject } from './node-project';

/**
 * Options for `UpgradeDependencies`.
 */
export interface UpgradeDependenciesOptions {

  /**
   * Schedule to run on.
   *
   * @default UpgradeDependenciesSchedule.DAILY
   */
  readonly schedule?: UpgradeDependenciesSchedule;

  /**
   * List of package names to exclude during the upgrade.
   *
   * @default - Nothing is excluded.
   */
  readonly exclude?: string[];

  /**
   * List of package names to include during the upgrade.
   *
   * @default - Everything is included.
   */
  readonly include?: string[];

  /**
   * The name of the workflow that will be created.
   *
   * @default 'upgrade-dependencies'.
   */
  readonly workflowName?: string;

  /**
   * The name of the projen task that will be created.
   *
   * @default 'deps:upgrade'
   */
  readonly taskName?: string;

}

/**
 * How often to check for new versions and raise pull requests for version upgrades.
 */
export enum UpgradeDependenciesSchedule {

  /**
   * Disables automatic upgrades.
   */
  NEVER = 'never',

  /**
   * At 00:00.
   */
  DAILY = 'daily',

  /**
   * At 00:00 on every day-of-week from Monday through Friday.
   */
  WEEKDAY = 'weekday',

  /**
   * At 00:00 on Monday.
   */
  WEEKLY = 'weekly',

  /**
   * At 00:00 on day-of-month 1.
   */
  MONTHLY = 'monthly'
}


/**
 * Upgrade node project dependencies.
 */
export class UpgradeDependencies extends Component {

  public readonly workflow?: GithubWorkflow;

  constructor(project: NodeProject, options: UpgradeDependenciesOptions = {}) {
    super(project);

    project.addDevDeps('npm-check-updates');

    // define a local task. this is valueable on its own to standardize
    // how we upgrade dependencies for all package managers.
    const task = project.addTask(options.taskName ?? 'deps:upgrade');

    const ncuCommand = ['npm-check-updates', '--upgrade', '--target=minor'];
    if (options.exclude) {
      ncuCommand.push(`--reject='${options.exclude.join(',')}'`);
    }
    if (options.include) {
      ncuCommand.push(`--filter=${options.include.join(',')}`);
    }

    task.exec(ncuCommand.join(' '));
    task.exec(project.package.renderInstallCommand(false));

    // then we define a github workflow if possible
    if (project.github) {

      const schedule = options.schedule ?? UpgradeDependenciesSchedule.DAILY;
      const runnerTemp = '${{ runner.temp }}';
      const patchArtifact = 'dependencies.patch';
      const patchFile = `${runnerTemp}/${patchArtifact}`;
      const branchName = 'github-actions/dependencies';
      const buildStepId = 'build';
      const prStepId = 'create-pull-request';
      const buildConclusionOutputName = 'conclusion';
      const buildLogOutputName = 'log';
      const workflowName = options.workflowName ?? 'upgrade-dependencies';

      this.workflow = project.github.addWorkflow(workflowName);
      const triggers: any = { workflow_dispatch: {} };
      if (schedule !== UpgradeDependenciesSchedule.NEVER) {
        triggers.schedule = [{ cron: this.scheduleToCron(schedule) }];
      }
      this.workflow.on(triggers);

      const upgradeAndBuild = {
        'name': 'Upgrade & Build',
        'permissions': 'read-all',
        'runs-on': 'ubuntu-latest',
        'outputs': {
          'build-conclusion': `\${{ steps.${buildStepId}.outputs.${buildConclusionOutputName} }}`,
          'build-log': `\${{ steps.${buildStepId}.outputs.${buildLogOutputName} }}`,
        },
        'steps': [
          {
            name: 'Checkout',
            uses: 'actions/checkout@v2',
          },
          ...project.installWorkflowSteps,
          {
            name: 'Upgrade dependencies',
            run: project.runTaskCommand(task),
          },
          {
            name: 'Build',
            id: buildStepId,
            run: [
              `${project.runTaskCommand(project.buildTask)} && ${this.setOutput(buildConclusionOutputName, 'success')} || ${this.setOutput(buildConclusionOutputName, 'failure')}`,
              `${this.setOutput(buildLogOutputName, 'https://github.com/${REPO}/actions/runs/${{ github.run_id }}')}`,
            ].join('\n'),
            env: {
              GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
              REPO: '${{ github.event.repository.full_name }}',
            },
          },
          {
            name: 'Create Patch',
            run: [
              'git add .',
              `git diff --patch --staged > ${patchFile}`,
            ].join('\n'),
          },
          {
            name: 'Upload patch',
            uses: 'actions/upload-artifact@v2',
            with: { name: patchArtifact, path: patchFile },
          },
        ],
      };

      const createPR: any = {
        'needs': 'upgrade-dependencies',
        'name': 'Create Pull Request',
        'permissions': 'write-all',
        'runs-on': 'ubuntu-latest',
        'steps': [
          {
            name: 'Checkout',
            uses: 'actions/checkout@v2',
          },
          {
            name: 'Download patch',
            uses: 'actions/download-artifact@v2',
            with: { name: patchArtifact, path: runnerTemp },
          },
          {
            name: 'Apply patch',
            run: `[ -s ${patchFile} ] && git apply ${patchFile} || echo "Empty patch. Skipping."`,
          },
          {
            name: 'Create Pull Request',
            id: prStepId,
            uses: 'peter-evans/create-pull-request@v3',
            with: {
              'token': '${{ secrets.GITHUB_TOKEN }}',
              'commit-message': 'Upgrade dependencies',
              'branch': branchName,
              'title': 'chore(deps): Upgrade dependencies',
              'body': [
                'Upgrade dependencies.',
                '',
                "Since this PR was created with a GitHub Action, the build workflow wasn't triggered on it.",
                '> See https://github.com/peter-evans/create-pull-request/issues/48',
                '',
                'In order to validate it, build was executed during the creation of this PR instead.',
                '> See ${{ needs.upgrade-dependencies.outputs.build-log }}',
                '',
                '------',
                '',
                '*Automatically created by projen via GitHubActions*',
              ].join('\n'),
            },
          },
        ],
      };

      if (project.buildWorkflowJobId) {
        createPR.steps.push({
          name: 'Update status check',
          if: `steps.${prStepId}.outputs.pull-request-url != ''`,
          run: 'curl -i --fail '
              + '-X POST '
              + '-H "Accept: application/vnd.github.v3+json" '
              + '-H "Authorization: token ${GITHUB_TOKEN}" https://api.github.com/repos/${REPO}/check-runs '
              + '-d \'{'
                + `"name":"${project.buildWorkflowJobId}",`
                + `"head_sha":"${branchName}",`
                + '"status":"completed",'
                + '"conclusion":"\${{ needs.upgrade-dependencies.outputs.build-conclusion }}",'
                + '"output":{'
                  + `"title":"Created via the ${workflowName} workflow.",`
                  + '"summary":"Build log is available here: ${{ needs.upgrade-dependencies.outputs.build-log }}"'
                + '}'
              + '}\'',
          env: {
            GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
            REPO: '${{ github.event.repository.full_name }}',
          },
        });
      }

      this.workflow.addJobs({
        'upgrade-dependencies': upgradeAndBuild,
        'create-pr': createPR,
      });

    }


  }

  private setOutput(name: string, value: string) {
    return `echo "::set-output name=${name}::${value}"`;
  }

  private scheduleToCron(schedule: UpgradeDependenciesSchedule): string {

    switch (schedule) {
      case UpgradeDependenciesSchedule.DAILY:
        return '0 0 * * *';
      case UpgradeDependenciesSchedule.WEEKDAY:
        return '0 0 * * 1-5';
      case UpgradeDependenciesSchedule.WEEKLY:
        return '0 0 * * 1';
      case UpgradeDependenciesSchedule.MONTHLY:
        return '0 0 1 * *';
      default:
        throw new Error(`Unsupported schedule: ${schedule}`);
    }
  }
}
