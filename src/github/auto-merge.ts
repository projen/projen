import { Construct } from "constructs";
import { Component } from "../component";
import { Project } from "../project";
import { GitHub } from "./github";

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
  private readonly lazyConditions = new Array<IAddConditionsLater>();

  constructor(scope: Construct, options: AutoMergeOptions = {}) {
    super(scope, "AutoMerge");

    const mergify = GitHub.of(Project.ofProject(this))?.mergify;
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

    mergify.addRule({
      name: "Automatic merge on approval and successful build",
      actions: mergeAction,
      conditions: (() => this.renderConditions()) as any,
    });

    mergify.addQueue({
      name: "default",
      conditions: (() => this.renderConditions()) as any,
    });

    Project.ofProject(this).addPackageIgnore("/.mergify.yml");
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
