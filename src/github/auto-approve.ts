import { Component } from '../component';
import { Project } from '../project';

/**
 * Options for 'AutoApprove'
 */
export interface AutoApproveOptions {

  /**
   * PR's assigned with this label will be auto-approved.
   *
   * @default pr/auto-approve
   */
  readonly label?: string;
}

/**
 * Configures a GitHub workflow that auto-approves PR's that are assigned with a specific label.
 */
export class AutoApprove extends Component {

  /**
   * The configured label for auto-approvals.
   */
  public readonly label: string;

  constructor(project: Project, options: AutoApproveOptions = {}) {
    super(project);

    if (!project.github) {
      throw new Error('GitHub must be configured to enable auto approvals');
    }

    this.label = options.label ?? 'pr/auto-approve';

    const autoApprove = project.github.addWorkflow('auto-approve');
    autoApprove.on({
      pull_request: { types: ['labeled', 'opened', 'unlabeled'] },
    });
    autoApprove.addJobs({
      approve: {
        'if': `contains(github.event.pull_request.labels.*.name, '${this.label}')`,
        'runs-on': 'ubuntu-latest',
        'steps': [
          {
            uses: 'hmarr/auto-approve-action@v2.0.0',
            with: { 'github-token': '${{ secrets.GITHUB_TOKEN }}' },
          },
        ],
      },
    });

  }
}