import type { GitHub } from "./github";
import { Component } from "../component";
import { snakeCaseKeys } from "../util";
import { YamlFile } from "../yaml";

/**
 * The Mergify conditional operators that can be used are: `or` and `and`.
 * Note: The number of nested conditions is limited to 3.
 * @see https://docs.mergify.io/conditions/#combining-conditions-with-operators
 */
export interface MergifyConditionalOperator {
  readonly or?: MergifyCondition[];
  readonly and?: MergifyCondition[];
}

export type MergifyCondition = string | MergifyConditionalOperator;

export type MergifyCommitTrailer =
  "co-authored-by" | "approved-by" | "merged-by";

/**
 * Declarative configuration for Mergify `commit_message_format`.
 * @see https://docs.mergify.com/workflow/actions/merge/#customizing-the-commit-message
 */

export interface MergifyCommitMessageFormat {
  /**
   * Commit title format.
   *
   * - `inherit`: use the GitHub repository default merge commit title format
   * - `pr-title`: use the pull request title (with the PR number appended)
   */
  readonly title: "inherit" | "pr-title";

  /**
   * Commit body format.
   *
   * - `inherit`: use the GitHub repository default merge commit body format
   * - `pr-body`: use the pull request body
   * - `empty`: set the commit body to be empty
   */
  readonly body: "inherit" | "pr-body" | "empty";

  /**
   * Optional list of trailers to append to the commit message.
   */
  readonly trailers?: MergifyCommitTrailer[];
}

export interface MergifyRule {
  /**
   * The name of the rule. This is not used by the engine directly,
   * but is used when reporting information about a rule.
   */
  readonly name: string;
  /**
   * A list of Conditions string that must match against the
   * pull request for the rule to be applied.
   * @see https://docs.mergify.io/conditions/#conditions
   */
  readonly conditions: MergifyCondition[];
  /**
   * A dictionary made of Actions that will be executed on the
   * matching pull requests.
   * @see https://docs.mergify.io/actions/#actions
   */
  readonly actions: { [action: string]: any };
}

export interface MergifyQueueBase {
  /**
   * The name of the queue.
   */
  readonly name: string;

  /**
   * Merge method to use.
   *
   * Possible values are `merge`, `squash`, `rebase` or `fast-forward`.
   * `fast-forward` is not supported on queues with `speculative_checks` > 1, `batch_size` > 1, or with `allow_inplace_checks` set to false.
   *
   * @default "merge"
   */
  readonly mergeMethod?: string;

  /**
   * Method to use to update the pull request with its base branch when the speculative check is done in-place.
   *
   * Possible values:
   *  - `merge` to merge the base branch into the pull request.
   *  - `rebase` to rebase the pull request against its base branch.
   *
   * Note that the `rebase` method has some drawbacks, see Mergify docs for details.
   *
   * @see https://docs.mergify.com/actions/queue/#queue-rules
   *
   * @default - `merge` for all merge methods except `fast-forward` where `rebase` is used
   */
  readonly updateMethod?: string;

  /**
   * The list of conditions that needs to match to queue the pull request.
   * @see https://docs.mergify.com/conditions/#conditions
   */
  readonly queueConditions?: MergifyCondition[];

  /**
   * The list of conditions to match to get the queued pull request merged.
   * This automatically includes the queueConditions.
   * In case of speculative merge pull request, the merge conditions are evaluated against the temporary pull request instead of the original one.
   * @see https://docs.mergify.com/conditions/#conditions
   */
  readonly mergeConditions?: MergifyCondition[];
}

export interface MergifyQueueWithCommitMessageFormat extends MergifyQueueBase {
  /**
   * When merging with the merge or squash method, configure the title, body, and trailers of the resulting commit.
   * @see https://docs.mergify.com/workflow/actions/merge/#customizing-the-commit-message
   */
  readonly commitMessageFormat: MergifyCommitMessageFormat;
}

export interface MergifyQueueWithCommitMessageTemplate extends MergifyQueueBase {
  /**
   * Template to use as the commit message when using the merge or squash merge method.
   * @deprecated Use `commitMessageFormat` instead.
   */
  readonly commitMessageTemplate: string;
}

export type MergifyQueue =
  MergifyQueueWithCommitMessageFormat | MergifyQueueWithCommitMessageTemplate;

/**
 * Configure Mergify.
 *
 * This currently only offers a subset of options available.
 * @see https://docs.mergify.com/configuration/file-format/
 */
export interface MergifyOptions {
  /**
   * Pull request automation rules.
   */
  readonly rules?: MergifyRule[];
  /**
   * The available merge queues.
   */
  readonly queues?: MergifyQueue[];
}

export class Mergify extends Component {
  private readonly rules = new Array<MergifyRule>();
  private readonly queues = new Array<MergifyQueue>();
  // The actual YAML file will only be created if at least 1 rule is added.
  private yamlFile?: YamlFile;

  constructor(github: GitHub, options: MergifyOptions = {}) {
    super(github.project);

    for (const rule of options.rules ?? []) {
      this.addRule(rule);
    }

    for (const queue of options.queues ?? []) {
      this.addQueue(queue);
    }
  }

  private createYamlFile() {
    if (this.yamlFile == null) {
      this.yamlFile = new YamlFile(this.project, ".mergify.yml", {
        obj: {
          queue_rules: () => this.queues.map((q) => snakeCaseKeys(q, false)),
          pull_request_rules: this.rules,
          merge_queue: {
            max_parallel_checks: 1,
          },
        },
        // Mergify needs to read the file from the repository in order to work.
        committed: true,
      });
    }
  }

  public addRule(rule: MergifyRule) {
    this.rules.push(rule);
    this.createYamlFile();
  }

  public addQueue(queue: MergifyQueue) {
    const hasCommitMessageFormat = (queue as any).commitMessageFormat != null;
    const hasCommitMessageTemplate =
      (queue as any).commitMessageTemplate != null;

    if (hasCommitMessageFormat === hasCommitMessageTemplate) {
      throw new Error(
        "Exactly one of 'commitMessageFormat' or 'commitMessageTemplate' must be specified.",
      );
    }

    this.queues.push(queue);
    this.createYamlFile();
  }
}
