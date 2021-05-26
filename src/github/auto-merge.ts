import { Component } from '../component';
import { Project } from '../project';

export interface AutoMergeOptions {
  /**
   * The GitHub job ID of the build workflow.
   */
  readonly buildJob?: string;

  /**
   * Number of approved code reviews.
   * @default 1
   */
  readonly approvedReviews?: number;
}

/**
 * Sets up mergify to merging approved pull requests.
 *
 * If `buildJob` is specified, the specified GitHub workflow job ID is required
 * to succeed in order for the PR to be merged.
 *
 * `approvedReviews` specified the number of code review approvals required for
 * the PR to be merged.
 */
export class AutoMerge extends Component {
  constructor(project: Project, options: AutoMergeOptions = { }) {
    super(project);

    const successfulBuild = options.buildJob
      ? [`status-success=${options.buildJob}`]
      : [];

    const mergeAction = {
      merge: {
      // squash all commits into a single commit when merging
        method: 'squash',

        // use PR title+body as the commit message
        commit_message: 'title+body',

        // update PR branch so it's up-to-date before merging
        strict: 'smart',
        strict_method: 'merge',
      },

      delete_head_branch: { },
    };

    const approvedReviews = options.approvedReviews ?? 1;

    project.github?.mergify?.addRule({
      name: 'Automatic merge on approval and successful build',
      actions: mergeAction,
      conditions: [
        `#approved-reviews-by>=${approvedReviews}`,
        ...successfulBuild,
      ],
    });
  }
}
