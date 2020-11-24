import { Component } from '../component';
import { Project } from '../project';
import { Dependabot, DependabotOptions } from './dependabot';
import { Mergify, MergifyRule } from './mergify';
import { PullRequestTemplate } from './pr-template';
import { GithubWorkflow } from './workflows';

export class GitHub extends Component {
  private _mergify?: Mergify;

  constructor(project: Project) {
    super(project);

  }

  public addMergifyRules(...rules: MergifyRule[]) {
    if (!this._mergify) {
      this._mergify = new Mergify(this);
    }

    for (const r of rules) {
      this._mergify.addRule(r);
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