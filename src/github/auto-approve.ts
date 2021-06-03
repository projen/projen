import { Project } from '..';
import { Component } from '../component';
import { GithubWorkflow } from './workflows';
import { Job, JobPermission } from './workflows-model';

/**
 * Options for 'AutoApprove'
 */
export interface AutoApproveOptions {
  /**
   * Only pull requests authored by these Github usernames will be auto-approved.
   * @default ['github-bot']
   */
  readonly allowedUsernames?: string[];

  /**
   * Only pull requests with this label will be auto-approved.
   * @default 'auto-approve'
   */
  readonly label?: string;

  /**
   * A GitHub secret name which contains a GitHub Access Token
   * with write permissions for the `pull_request` scope.
   *
   * This token is used to approve pull requests.
   *
   * Github forbids an identity to approve its own pull request.
   * If your project produces automated pull requests using the Github default token -
   * {@link https://docs.github.com/en/actions/reference/authentication-in-a-workflow `GITHUB_TOKEN` }
   * - that you would like auto approved, such as when using the `depsUpgrade` property in
   * `NodeProjectOptions`, then you must use a different token here.
   */
  readonly secret: string;
}

/**
 * Auto approve pull requests that meet a criteria
 */
export class AutoApprove extends Component {
  public readonly label: string;

  constructor(project: Project, options: AutoApproveOptions) {
    super(project);

    this.label = options.label ?? 'auto-approve';
    const usernames = options.allowedUsernames ?? ['github-bot'];

    if (!project.github) {
      throw new Error('auto approval supported only for Github projects');
    }

    let condition = `contains(github.event.pull_request.labels.*.name, '${this.label}')`;
    if (usernames.length > 0) {
      condition += ' && (';
      condition += usernames.map(u => `github.event.pull_request.login == '${u}'`).join(' || ');
      condition += ')';
    }

    const approveJob: Job = {
      runsOn: 'ubuntu-latest',
      permissions: {
        pullRequests: JobPermission.WRITE,
      },
      if: condition,
      steps: [{
        uses: 'hmarr/auto-approve-action@v2.1.0',
        with: {
          'github-token': `\${{ secrets.${options.secret} }}`,
        },
      }],
    };

    const workflow = new GithubWorkflow(project.github, 'auto-approve');
    workflow.on({
      pullRequestTarget: {
        types: ['labeled', 'opened', 'synchronize', 'reopened', 'ready_for_review'],
      },
    });
    workflow.addJobs({ approve: approveJob });
  }
}
