import { Component } from '../component';
import { GitHub } from './github';

export interface AutoMergeOptions {
  /**
   * Number of approved code reviews.
   * @default 1
   */
  readonly approvedReviews?: number;

  /**
   * List of labels that will prevent auto-merging.
   * @default ['do-not-merge']
   */
  readonly blockingLabels?: string[];
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

  private readonly conditions = new Array<string>();
  private readonly lazyConditions = new Array<IAddConditionsLater>();

  constructor(github: GitHub, options: AutoMergeOptions = {}) {
    super(github.project);

    const mergify = github.mergify;
    if (!mergify) {
      throw new Error('auto merging requires mergify to be enabled');
    }

    const blockingLabels = options.blockingLabels ?? ['do-not-merge'];
    const blockingCondition = blockingLabels?.length
      ? [`-label~=(${blockingLabels.join('|')})`]
      : [];

    const mergeAction = {
      merge: {
      // squash all commits into a single commit when merging
        method: 'squash',

        // use PR title+body as the commit message
        commit_message_template: [
          '{{ title }} (#{{ number }})',
          '',
          '{{ body }}',
        ].join('\n'),

        // update PR branch so it's up-to-date before merging
        strict: 'smart',
        strict_method: 'merge',
      },

      delete_head_branch: { },
    };

    const approvedReviews = options.approvedReviews ?? 1;

    this.addConditions(`#approved-reviews-by>=${approvedReviews}`);
    this.addConditions(...blockingCondition);

    mergify.addRule({
      name: 'Automatic merge on approval and successful build',
      actions: mergeAction,
      conditions: (() => this.renderConditions()) as any,
    });

    this.project.addPackageIgnore('/.mergify.yml');
  }

  /**
   * Adds conditions to the auto merge rule.
   * @param conditions The conditions to add (mergify syntax)
   */
  public addConditions(...conditions: string[]) {
    this.conditions.push(...conditions);
  }

  /**
   * Adds conditions that will be rendered only during synthesis.
   * @param later The later
   */
  public addConditionsLater(later: IAddConditionsLater) {
    this.lazyConditions.push(later);
  }

  private renderConditions() {
    const output = [...this.conditions];

    for (const later of this.lazyConditions) {
      output.push(...later.renderConditions());
    }

    return output;
  }
}

export interface IAddConditionsLater {
  renderConditions(): string[];
}