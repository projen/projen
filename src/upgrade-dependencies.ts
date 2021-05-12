import { Component } from './component';
import { NodePackageManager } from './node-package';
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
   * Auto approve PR's, allowing mergify to merge them.
   *
   * @default - true if auto-approve workflow is configured for the project, false otherwise.
   */
  readonly autoApprove?: boolean;

  /**
   * List of package names to ignore during the upgrade.
   *
   * @default - All dependencies are upgraded.
   */
  readonly ignore?: string[];

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
  constructor(project: NodeProject, options: UpgradeDependenciesOptions = {}) {
    super(project);

    // first we define the local task. this is valueable on its to standardize
    // how we upgrade dependencies for all package managers.
    project.addDevDeps('npm-check-updates');

    const upgradeTask = project.addTask('deps:upgrade');
    const ignore = options.ignore ?? [];
    upgradeTask.exec(`npm-check-updates --timeout 120000 --upgrade --target=minor --reject '${ignore.join(',')}'`);
    upgradeTask.exec('export CI=""');

    switch (project.package.packageManager) {
      case NodePackageManager.YARN:
        upgradeTask.exec('yarn install');
        break;
      case NodePackageManager.NPM:
        upgradeTask.exec('npm install');
        break;
      case NodePackageManager.PNPM:
        upgradeTask.exec('pnpm install');
        break;
      default:
        throw new Error(`Usupported package manager for dependency upgrades: ${project.package.packageManager}.
          Supported package managers are: ${NodePackageManager.YARN} | ${NodePackageManager.NPM} | ${NodePackageManager.PNPM}`);
    }

    // if github then we can also add a workflow
    if (project.github) {

      const schedule = options.schedule ?? UpgradeDependenciesSchedule.DAILY;
      const runnerTemp = '${{ runner.temp }}';
      const patchArtifact = 'dependencies.patch';
      const patchFile = `${runnerTemp}/${patchArtifact}`;
      const branchName = 'github-actions/dependencies';
      const buildStepId = 'build';
      const buildConclusionOutputName = 'conclusion';
      const buildLogOutputName = 'log';
      const upgradeDependenciesJobName = 'Upgrade & Build';

      const upgradeWorkflow = project.github.addWorkflow('upgrade-dependencies');
      const triggers: any = { workflow_dispatch: {} };
      if (schedule !== UpgradeDependenciesSchedule.NEVER) {
        triggers.schedule = [{ cron: this.scheduleToCron(schedule) }];
      }
      upgradeWorkflow.on({ schedule: [{ cron: this.scheduleToCron(schedule) }], workflow_dispatch: {} });

      const upgradeDependencies = {
        'name': upgradeDependenciesJobName,
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
            run: project.runTaskCommand(upgradeTask),
          },
          {
            name: 'Build',
            id: buildStepId,
            run: [
              `${project.runTaskCommand(project.buildTask)} && ${this.setOutput(buildConclusionOutputName, 'success')} || ${this.setOutput(buildConclusionOutputName, 'failure')}`,
              `id=$(gh run view \${{ github.run_id }} | grep "${upgradeDependenciesJobName}" | grep -oP 'ID [0-9]*' | cut -d ' ' -f 2)`,
              `${this.setOutput(buildLogOutputName, 'https://github.com/${REPO}/runs/${id}')}`,
            ].join('\n'),
            env: {
              GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
              REPO: '${{ github.event.repository.full_name }}',
            },
          },
          {
            name: 'Create Patch',
            run: `git diff > ${patchFile}`,
          },
          {
            name: 'Upload patch',
            uses: 'actions/upload-artifact@v2',
            with: { name: patchArtifact, path: patchFile },
          },
        ],
      };

      const createPullRequest: any = {
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
            run: `git apply ${patchFile}`,
          },
          {
            name: 'Create Pull Request',
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
        createPullRequest.steps.push({
          name: 'Update status check',
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
                  + '"title":"Created via the \'upgrade-dependencies\' workflow.",'
                  + '"summary":"Build log is available here: ${{ needs.upgrade-dependencies.outputs.build-log }}"'
                + '}'
              + '}\'',
          env: {
            GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
            REPO: '${{ github.event.repository.full_name }}',
          },
        });
      }

      upgradeWorkflow.addJobs({
        'upgrade-dependencies': upgradeDependencies,
        'create-pr': createPullRequest,
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
