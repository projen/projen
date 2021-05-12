import { NodePackageManager } from './node-package';
import { NodeProject } from './node-project';
import { TaskCategory } from './tasks';

export interface ProjenUpgradeOptions {

  /**
   * Customize the projenUpgrade schedule in cron expression.
   *
   * @default [ '0 6 * * *' ]
   */
  readonly autoUpgradeSchedule?: string[];

}

/**
 * Checks for new versions of projen and creates a PR with an upgrade change.
 */
export class ProjenUpgrade {
  constructor(project: NodeProject, options: ProjenUpgradeOptions = {}) {
    const upgradeTask = project.addTask('projen:upgrade', {
      description: 'upgrades projen to the latest version',
      category: TaskCategory.MAINTAIN,
    });

    switch (project.package.packageManager) {
      case NodePackageManager.NPM:
        upgradeTask.exec('npm update projen');
        upgradeTask.exec('CI="" npm run projen');
        break;
      case NodePackageManager.YARN:
        upgradeTask.exec('yarn upgrade -L projen');
        upgradeTask.exec('CI="" yarn projen');
        break;
      case NodePackageManager.PNPM:
        upgradeTask.exec('pnpm update -L projen');
        upgradeTask.exec('CI="" pnpm run projen');
        break;
      default: throw new Error(`unexpected package manager ${project.package.packageManager}`);
    }

    if (project.projenSecret) {

      if (!project.github) {
        throw new Error('GitHub must be configured to enable auto projen upgrades');
      }

      const workflow = project.github.addWorkflow('ProjenUpgrade');

      workflow.on({
        schedule: options.autoUpgradeSchedule
          ? options.autoUpgradeSchedule.map(s => ({ cron: s }))
          : [{ cron: '0 6 * * *' }], // 6am every day
        workflow_dispatch: {}, // allow manual triggering
      });

      const withOptions: Record<string, string> = {
        'token': '${{ secrets.' + project.projenSecret + ' }}',
        'commit-message': 'chore: upgrade projen',
        'branch': 'auto/projen-upgrade',
        'title': 'chore: upgrade projen',
        'body': 'This PR upgrades projen to the latest version',
      };

      workflow.addJobs({
        upgrade: {
          'runs-on': 'ubuntu-latest',
          'steps': [
            // check out sources.
            {
              name: 'Checkout',
              uses: 'actions/checkout@v2',
            },

            // install dependencies (and runs projen)
            ...project.installWorkflowSteps,

            // upgrade
            {
              name: 'Upgrade projen',
              run: project.runTaskCommand(upgradeTask),
            },

            // submit a PR
            {
              name: 'Create pull request',
              uses: 'peter-evans/create-pull-request@v3',
              with: withOptions,
            },
          ],
        },
      });
    }
  }
}
