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

  /**
   * Apply labels to the PR. For example, you can add the label "auto-merge",
   * which, in-tandem with mergify configuraiton will automatically merge these
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
            ...project.workflowBootstrapSteps,

            // upgrade
            { run: `${project.runScriptCommand} ${script}` },

            // submit a PR
            {
              name: 'Create Pull Request',
              uses: 'peter-evans/create-pull-request@v3',
              with: withOptions,
            },
          ],
        },
      });
    } else {
      project.addTip('Set `autoUpgradeSecret` to enable automatic projen upgrade pull requests');
    }
  }
}
