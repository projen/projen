import { GitHub } from "./github";
import { Component } from "../component";
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

export interface MergifyQueue {
  /**
   * The name of the queue.
   */
  readonly name: string;
  /**
   * A list of Conditions string that must match against the
   * pull request for the pull request to be added to the queue.
   * @see https://docs.mergify.com/conditions/#conditions
   */
  readonly conditions: MergifyCondition[];
}

export interface MergifyOptions {
  readonly rules?: MergifyRule[];
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
          queue_rules: this.queues,
          pull_request_rules: this.rules,
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
    this.queues.push(queue);
    this.createYamlFile();
  }
}
