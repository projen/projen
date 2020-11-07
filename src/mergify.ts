import { Component, IComponentScope } from './component';
import { YamlFile } from './yaml';

export interface MergifyRule {
  readonly name: string;
  readonly conditions: string[];
  readonly actions: { [action: string]: any };
}

export interface MergifyOptions {
  readonly rules?: MergifyRule[];
}

export class Mergify extends Component {
  private readonly rules = new Array<MergifyRule>();

  constructor(project: IComponentScope, options: MergifyOptions = { }) {
    super(project);

    new YamlFile(project, '.mergify.yml', {
      obj: {
        pull_request_rules: this.rules,
      },
    });

    (options.rules ?? []).forEach(rule => this.addRule(rule));

    project.addTip('Install Mergify in your GitHub repository to enable automatic merges of approved PRs');
  }

  public addRule(rule: MergifyRule) {
    this.rules.push(rule);
  }
}