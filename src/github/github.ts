import { Component } from '../component';
import { Project } from '../project';
import { Dependabot, DependabotOptions } from './dependabot';
import { Mergify, MergifyRule } from './mergify';
import { PullRequestTemplate } from './pr-template';
import { GithubWorkflow } from './workflows';

export class GitHub extends Component {
  private mergify?: Mergify;

  constructor(project: Project) {
    super(project);

    //   this.project.readme?.addBadge({
    //     name: 'Github repo dependents',
    //     imgUrl: 'https://badgen.net/github/dependents-repo/ORG/REPO',
    //   });

    //   this.project.readme?.addBadge({
    //     name: 'Github package dependents',
    //     imgUrl: 'https://badgen.net/github/dependents-pkg/ORG/REPO',
    //   });
  }

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