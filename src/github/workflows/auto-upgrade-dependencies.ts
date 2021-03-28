import { Component } from '../../component';
import { NodeProject } from '../../node-project';

/**
 * Options for `AutoUpgradeDependencies`.
 */
export interface AutoUpgradeDependenciesOptions {

  /**
   * Schedule to run on.
   *
   * @default AutoUpgradeDependenciesSchedule.DAILY
   */
  readonly schedule?: AutoUpgradeDependenciesSchedule;

  /**
   * Auto approve PR's, allowing mergify to merge them.
   *
   * Note that if the project doesn't have the auto-approve workflow configured,
   * enabling this will throw an error, as auto approval cannot be accomplished.
   *
   * @default - true if auto-approve workflow is configured for the project, false otherwise.
   */
  readonly autoApprove?: boolean;

  /**
   * List of package names to ignore during the upgrade.
   *
   * @default - Only projen itself is ignored.
   */
  readonly ignore?: string[];

}

/**
 * How often to check for new versions and raise pull requests for version updates.
 */
export enum AutoUpgradeDependenciesSchedule {
  /**
   * Runs on every weekday, Monday to Friday.
   */
  DAILY = 'daily',

  /**
   * Runs once each week. By default, this is on Monday.
   */
  WEEKLY = 'weekly',

  /**
   * Runs once each month. This is on the first day of the month.
   */
  MONTHLY = 'monthly'
}


/**
 * Upgrade node project dependencies via a GitHub workflow.
 */
export class AutoUpgradeDependencies extends Component {
  constructor(project: NodeProject, options: AutoUpgradeDependenciesOptions = {}) {
    super(project);

    if (!project.github) {
      throw new Error('GitHub must be configured to enable dependency upgrades via github actions');
    }

    if (!project.projenSecret) {
      throw new Error('Projen secret must be configured to enable dependency upgrades via github actions');
    }

    if (options.autoApprove && !project.autoApprove) {
      throw new Error('Project must have auto-approve configured in order to auto-approve dependency upgrades');
    }

    const labels: string[] = [];

    if ((options.autoApprove ?? true) && project.autoApprove) {
      labels.push(project.autoApprove.label);
    }

    const ignore = ['projen', ...(options.ignore ?? [])];

    const dependencies = project.github.addWorkflow('auto-upgrade-dependencies');
    dependencies.on({
      schedule: [{ cron: this.scheduleToCron(options.schedule ?? AutoUpgradeDependenciesSchedule.DAILY) }],
      workflow_dispatch: {}, // allow manual triggering
    });
    dependencies.addJobs({
      upgrade: {
        'name': 'Upgrade',
        'runs-on': 'ubuntu-latest',
        'steps': [
          {
            name: 'Checkout',
            uses: 'actions/checkout@v2',
          },
          ...project.installWorkflowSteps,
          {
            name: 'Upgrade package.json dependencies',
            run: 'npx npm-check-updates --upgrade --reject projen',
          },
          {
            name: 'Upgrade yarn.lock dependencies',
            run: `yarn install && yarn upgrade --pattern !(${ignore.join('|')})`,
          },
          {
            name: 'Create Pull Request',
            uses: 'peter-evans/create-pull-request@v3',
            with: {
              'token': `\${{ secrets.${project.projenSecret} }}`,
              'commit-message': 'Upgrade dependencies',
              'branch': 'github-actions/dependencies',
              'labels': labels.join(','),
              'title': 'chore(deps): Upgrade dependencies',
              'body': 'Upgrade dependencies\n\n------\n\n*Automatically created by projen via GitHubActions*',
            },
          },
        ],
      },
    });
  }

  private scheduleToCron(schedule: AutoUpgradeDependenciesSchedule): string {

    switch (schedule) {
      case AutoUpgradeDependenciesSchedule.DAILY:
        return '0 8 * * *';
      case AutoUpgradeDependenciesSchedule.WEEKLY:
        return '0 0 * * 0';
      case AutoUpgradeDependenciesSchedule.MONTHLY:
        return '0 0 1 * *';
      default:
        throw new Error(`Unsupported schedule: ${schedule}`);
    }
  }
}
