import { Component } from '../component';
import { YamlFile } from '../yaml';
import { GitHub } from './github';

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

export interface MergifyOptions {
  readonly rules?: MergifyRule[];

  /**
   * Include an item in the pull request check list that enforces
   * pull request titles follow Conventional Commits.
   *
   * @default true
   * @see https://www.conventionalcommits.org/
   */
  readonly conventionalCommits?: boolean;
}

export class Mergify extends Component {
  private readonly rules = new Array<MergifyRule>();
  // The actual YAML file will only be created if at least 1 rule is added.
  private yamlFile?: YamlFile;

  constructor(github: GitHub, options: MergifyOptions = { }) {
    super(github.project);

    for (const rule of options.rules ?? []) {
      this.addRule(rule);
    }

    if (options.conventionalCommits ?? true) {
      this.addRule({
        name: 'Conventional Commit',
        conditions: [
          'title~=^(fix|feat|docs|style|refactor|perf|test|build|ci|chore|revert|release)(?:\\(.+\\))?:',
        ],
        actions: {
          post_check: {
            title: [
              '{% if check_succeed %}',
              'Title follows Conventional Commit',
              '{% else %}',
              'Title does not follow Conventional Commit',
              '{% endif %}',
            ].join('\n'),
            summary: [
              '{% if not check_succeed %}',
              'Your pull request title must follow [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/).',
              '{% endif %}',
            ].join('\n'),
          },
        },
      });
    }
  }

  public addRule(rule: MergifyRule) {
    this.rules.push(rule);
    if (this.yamlFile == null) {
      this.yamlFile = new YamlFile(this.project, '.mergify.yml', {
        obj: {
          pull_request_rules: this.rules,
        },
      });
    }
  }
}
