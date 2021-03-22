import { DependabotOptions } from './github';
import { NodeProject } from './node-project';

export interface GitHubActionsDepenenciesUpgradeOptions {

  /**
   * Cron expression that determines the upgrade schedule.
   *
   * @default '0 8 * * 1' (every monday at 8AM)
   */
  readonly schedule?: string;

  /**
   * Auto approve PR's, allowing mergify to merge them.
   *
   * @default true
   */
  readonly autoApprove?: boolean;

}

export class DependenciesUpgrade {

  public static readonly DISABLED: DependenciesUpgrade = new DependenciesUpgrade('disabled');

  public static readonly DEPENDABOT: DependenciesUpgrade = new DependenciesUpgrade('dependabot');

  public static readonly GITHUB_ACTIONS: DependenciesUpgrade = new DependenciesUpgrade('github-actions');

  public static githubActions(options: GitHubActionsDepenenciesUpgradeOptions = {}): DependenciesUpgrade {
    return new DependenciesUpgrade('github-actions', options);
  }

  public static dependabot(options: DependabotOptions = {}): DependenciesUpgrade {
    return new DependenciesUpgrade('dependabot', options);
  }

  private constructor(
    private readonly type: 'github-actions' | 'dependabot' | 'disabled',
    private readonly options?: DependabotOptions | GitHubActionsDepenenciesUpgradeOptions) {

  }

  public bind(project: NodeProject) {

    switch (this.type) {
      case 'disabled':
        break;
      case 'dependabot':
        this.bindDependabot(project);
        break;
      case 'github-actions':
        this.bindGitHubActions(project);
        break;
      default:
        throw new Error(`Unsupported dependency upgrade type: ${this.type}`);
    }
  }

  private bindDependabot(project: NodeProject) {
    project.github?.addDependabot(this.options as DependabotOptions);
  }

  private bindGitHubActions(project: NodeProject) {

    if (!project.github) {
      throw new Error('GitHub must be configured to enable dependency upgrades via github actions');
    }

    if (!project.projenSecret) {
      throw new Error('Projen secret must be configured to enable dependency upgrades via github actions');
    }

    const options = (this.options ?? {}) as GitHubActionsDepenenciesUpgradeOptions;

    if (options.autoApprove && !project.autoApprove) {
      throw new Error('Project must have auto-approve configured in order to auto-approve dependency upgrades');
    }

    const labels: string[] = [];

    if (options.autoApprove ?? true) {
      labels.push(project.autoApprove!.label);
    }

    const dependencies = project.github.addWorkflow('dependencies-upgrade');
    dependencies.on({
      schedule: [{ cron: options.schedule ?? '0 8 * * 1' }],
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
            run: 'yarn install',
          },
          {
            name: 'Create Pull Request',
            uses: 'peter-evans/create-pull-request@v3',
            with: {
              'token': `{{ secrets.${project.projenSecret} }}`,
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

}
