import { GitHub } from "./github";
import { Component } from "../component";

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

  /**
   * Name of the mergify rule
   * @default 'Automatic merge on approval and successful build'
   */
  readonly ruleName?: string;

  /**
   * Name of the mergify queue
   * @default 'default'
   */
  readonly queueName?: string;
}

/**
 * Automatically merge Pull Requests using Mergify
 *
 * > [!NOTE]
 * > GitHub now natively provides the same features, so you don't need Mergify
 * > anymore. See `GitHubOptions.mergeQueue` and `MergeQueueOptions.autoQueue`.
 *
 * If `buildJob` is specified, the specified GitHub workflow job ID is required
 * to succeed in order for the PR to be merged.
 *
 * `approvedReviews` specified the number of code review approvals required for
 * the PR to be merged.
 *
 * @see https://mergify.com/
 */
export class AutoMerge extends Component {
  private readonly lazyConditions = new Array<IAddConditionsLater>();

  constructor(github: GitHub, options: AutoMergeOptions = {}) {
    super(github.project);

    const mergify = github.mergify;
    if (!mergify) {
      throw new Error("auto merging requires mergify to be enabled");
    }

    const blockingLabels = options.blockingLabels ?? ["do-not-merge"];
    const blockingCondition = blockingLabels?.length
      ? [`-label~=(${blockingLabels.join("|")})`]
      : [];

    const mergeAction = {
      delete_head_branch: {},

      queue: {
        name: "default",
      },
    };

    const approvedReviews = options.approvedReviews ?? 1;

    // add initial conditions (additional conditions can be added later)
    this.addConditions(`#approved-reviews-by>=${approvedReviews}`);
    this.addConditions(...blockingCondition);

    const ruleName =
      options.ruleName ?? "Automatic merge on approval and successful build";
    const queueName = options.queueName ?? "default";

    mergify.addRule({
      name: ruleName,
      actions: mergeAction,
      conditions: (() => this.renderConditions()) as any,
    });

    mergify.addQueue({
      name: queueName,
      updateMethod: "merge",
      queueConditions: (() => this.renderConditions()) as any,
      // squash all commits into a single commit when merging
      mergeMethod: "squash",
      // use PR title+body as the commit message
      commitMessageTemplate: [
        "{{ title }} (#{{ number }})",
        "",
        "{{ body }}",
      ].join("\n"),
    });

    this.project.addPackageIgnore("/.mergify.yml");
  }

  /**
   * Adds conditions to the auto merge rule.
   * @param conditions The conditions to add (mergify syntax)
   */
  public addConditions(...conditions: string[]) {
    this.addConditionsLater({ render: () => conditions });
  }

  /**
   * Adds conditions that will be rendered only during synthesis.
   * @param later The later
   */
  public addConditionsLater(later: IAddConditionsLater) {
    this.lazyConditions.push(later);
  }

  private renderConditions() {
    const output = new Array<string>();

    for (const later of this.lazyConditions) {
      output.push(...later.render());
    }

    return output;
  }
}

export interface IAddConditionsLater {
  render(): string[];
}
