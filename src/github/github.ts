import { Component } from '../component';
import { Dependabot, DependabotOptions } from './dependabot';
import { Mergify, MergifyRule } from './mergify';
import { PullRequestTemplate } from './pr-template';
import { GithubWorkflow } from './workflows';

export class GitHub extends Component {
  private mergify?: Mergify;

  public addMergifyRules(...rules: MergifyRule[]) {
    if (!this.mergify) {
      this.mergify = new Mergify(this);
    }

    for (const r of rules) {
      this.mergify.addRule(r);
    }
  }

  public addWorkflow(name: string) {
    return new GithubWorkflow(this, name);
  }

  public addPullRequestTemplate(...content: string[]) {
    return new PullRequestTemplate(this, { lines: content });
  }

  public addDependabot(options?: DependabotOptions) {
    return new Dependabot(this, options);
  }
}