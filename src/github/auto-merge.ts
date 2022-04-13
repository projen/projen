import { Component } from "../component";
import { GitHub } from "./github";
import { Mergify } from "./mergify";

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
 * `approvedReviews` specified the number of code review approvals required for
 * the PR to be merged.
 */
export class AutoMerge extends Component {
  /**
   * Mergify configuration for this project.
   */
  public readonly mergify: Mergify;

  private readonly lazyConditions = new Array<IAddConditionsLater>();

  constructor(github: GitHub, options: AutoMergeOptions = {}) {
    super(github.project);

    this.mergify = new Mergify(github);

    const blockingLabels = options.blockingLabels ?? ["do-not-merge"];
    const blockingCondition = blockingLabels?.length
      ? [`-label~=(${blockingLabels.join("|")})`]
      : [];

    const mergeAction = {
      delete_head_branch: {},

      queue: {
        // squash all commits into a single commit when merging
        // method: "squash",
        method: "squash",
        name: "default",
        // use PR title+body as the commit message
        commit_message_template: [
          "{{ title }} (#{{ number }})",
          "",
          "{{ body }}",
        ].join("\n"),
      },
    };

    const approvedReviews = options.approvedReviews ?? 1;

    // add initial conditions (additional conditions can be added later)
    this.addConditions(`#approved-reviews-by>=${approvedReviews}`);
    this.addConditions(...blockingCondition);

    this.mergify.addRule({
      name: "Automatic merge on approval and successful build",
      actions: mergeAction,
      conditions: (() => this.renderConditions()) as any,
    });

    this.mergify.addQueue({
      name: "default",
      conditions: (() => this.renderConditions()) as any,
    });
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
