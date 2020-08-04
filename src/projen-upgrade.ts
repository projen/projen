import { NodeProject } from './node-project';
import { GithubWorkflow } from './github-workflow';

/**
 * Checks for new versions of projen and creates a PR with an upgrade change.
 */
export class ProjenUpgrade {
  constructor(project: NodeProject) {
    const script = 'projen:upgrade';

    project.addScript(script,
      'chmod +w package.json',
      'yarn upgrade -L projen',
      'chmod -w package.json',
      'yarn projen');

    const workflow = new GithubWorkflow(project, 'upgrade-projen');

    workflow.on({
      schedule: [ { cron: '0 6 * * *' } ], // 6am every day
      workflow_dispatch: {},               // allow manual triggering
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
            'name': 'Create Pull Request',
            'uses': 'peter-evans/create-pull-request@v3',
            'commit-message': 'chore: upgrade projen',
            'branch': 'auto/projen-upgrade',
            'title': 'chore: upgrade projen',
            'body': 'This PR upgrades projen to the latest version',
          },
        ],
      },
    })
  }
}