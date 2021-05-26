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
   */
  readonly secret?: string;
}

/**
 * Auto approve pull requests that meet a criteria
 */
export class AutoApprove extends Component {
  public readonly label: string;

  constructor(project: Project, options: AutoApproveOptions = {}) {
    super(project);

    this.label = options.label ?? 'auto-approve';
    const usernames = options.allowedUsernames ?? ['github-bot'];
    const secret = options.secret ?? 'GITHUB_TOKEN';

    if (!project.github) {
      return;
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
          'github-token': `\${{ secrets.${secret} }}`,
        },
      }],
    };

    const workflow = new GithubWorkflow(project.github, 'auto-approve');
    workflow.on({
      pullRequest: {
        types: ['labeled', 'opened', 'synchronize', 'reopened', 'ready_for_review'],
      },
    });
    workflow.addJobs({ approve: approveJob });
  }
}