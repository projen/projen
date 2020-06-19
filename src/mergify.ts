import { Construct } from 'constructs';
import { Project } from './project';
import { YamlFile } from './yaml';

export interface MergifyRule {
  readonly name: string;
  readonly conditions: string[];
  readonly actions: { [action: string]: any };
}

export interface MergifyOptions {
  readonly rules?: MergifyRule[];
}

export class Mergify extends Construct {
  private readonly rules = new Array<MergifyRule>();

  constructor(project: Project, options: MergifyOptions = { }) {
    super(project, 'mergify');

    new YamlFile(project, '.mergify.yml', {
      obj: {
        pull_request_rules: this.rules,
      },
    });

    (options.rules ?? []).forEach(rule => this.addRule(rule));
  }

  public addRule(rule: MergifyRule) {
    this.rules.push(rule);
  }
}