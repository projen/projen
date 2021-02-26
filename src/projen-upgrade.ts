import { NodeProject } from './node-project';
import { TaskCategory } from './tasks';

export interface ProjenUpgradeOptions {
  /**
   * The secret name which contains a GitHub Access Token with `repo` and
   * `workflow` permissions. This token is used to submit the upgrade pull
   * request, which will likely include workflow updates.
   *
   * @default - auto-upgrade is disabled
   */
  readonly autoUpgradeSecret?: string;

  /**
   * Apply labels to the PR. For example, you can add the label "auto-merge",
   * which, in-tandem with mergify configuration will automatically merge these
   * PRs if their build passes.
   *
   * @default []
   */
  readonly labels?: string[];

  /**
   * Customize the projenUpgrade schedule in cron expression.
   *
   @default [ '0 6 * * *' ]
   */
  readonly autoUpgradeSchedule?: string[];
}

/**
 * Checks for new versions of projen and creates a PR with an upgrade change.
 */
export class ProjenUpgrade {
  constructor(project: NodeProject, options: ProjenUpgradeOptions = { }) {
    const upgradeTask = project.addTask('projen:upgrade', {
      description: 'upgrades projen to the latest version',
      category: TaskCategory.MAINTAIN,
    });

    upgradeTask.exec('yarn upgrade -L projen');
    upgradeTask.exec('CI="" yarn projen');

    if (options.autoUpgradeSecret) {
      if (!project.github) {
        throw new Error('github workflows are required in order for auto-update');
      }

      const workflow = project.github.addWorkflow('ProjenUpgrade');

      workflow.on({
        schedule: options.autoUpgradeSchedule
          ? options.autoUpgradeSchedule.map(s => ({ cron: s }))
          : [{ cron: '0 6 * * *' }], // 6am every day
        workflow_dispatch: {}, // allow manual triggering
      });

      const withOptions: Record<string, string> = {
        'token': '${{ secrets.' + options.autoUpgradeSecret + ' }}',
        'commit-message': 'chore: upgrade projen',
        'branch': 'auto/projen-upgrade',
        'title': 'chore: upgrade projen',
        'body': 'This PR upgrades projen to the latest version',
      };

      if (options.labels?.length) {
        withOptions.labels = options.labels.join(',');
      }

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
