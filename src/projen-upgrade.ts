import { GithubWorkflow } from './github-workflow';
import { NodeProject } from './node-project';
import { StartEntryCategory } from './start';

export interface ProjenUpgradeOptions {
  /**
   * The secret name which contains a GitHub Access Token with `repo` and
   * `workflow` permissions. This token is used to submit the upgrade pull
   * request, which will likely include workflow updates.
   *
   * @default - auto-upgrade is disabled
   */
  readonly autoUpgradeSecret?: string;
}

/**
 * Checks for new versions of projen and creates a PR with an upgrade change.
 */
export class ProjenUpgrade {
  constructor(project: NodeProject, options: ProjenUpgradeOptions = { }) {
    const script = 'projen:upgrade';

    project.addScript(script,
      'yarn upgrade -L projen',
      'CI="" yarn projen'); // if CI is defined, projen runs yarn with --frozen-lockfile

    project.start?.addEntry(script, {
      desc: 'upgrades projen to the latest version',
      category: StartEntryCategory.MAINTAIN,
    });

    if (options.autoUpgradeSecret) {
      const workflow = new GithubWorkflow(project, 'ProjenUpgrade');

      workflow.on({
        schedule: [{ cron: '0 6 * * *' }], // 6am every day
        workflow_dispatch: {}, // allow manual triggering
      });

      workflow.addJobs({
        upgrade: {
          'runs-on': 'ubuntu-latest',
          'steps': [
            ...project.workflowBootstrapSteps,

            // upgrade
            { run: `yarn ${script}` },

            // submit a PR
            {
              name: 'Create Pull Request',
              uses: 'peter-evans/create-pull-request@v3',
              with: {
                'token': '${{ secrets.' + options.autoUpgradeSecret + ' }}',
                'commit-message': 'chore: upgrade projen',
                'branch': 'auto/projen-upgrade',
                'title': 'chore: upgrade projen',
                'body': 'This PR upgrades projen to the latest version',
              },
            },
          ],
        },
      });
    } else {
      project.addTip('Set `autoUpgradeSecret` to enable automatic projen upgrade pull requests');
    }
  }
}