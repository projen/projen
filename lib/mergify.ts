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

  constructor(project: Project) {
    super(project, 'mergify');

    new YamlFile(project, '.mergify.yml', {
      committed: true, // must be committed for mergify to be able to find it dah!
      obj: {
        pull_request_rules: this.rules,
      },
    });
  }

  public addRule(rule: MergifyRule) {
    this.rules.push(rule);
  }
}