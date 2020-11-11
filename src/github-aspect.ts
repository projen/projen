import { Component } from './component';
import { GithubWorkflow } from './github-workflow';
import { Project } from './project';

export interface GitHubAspectProps {
  readonly workflowBootstrapSteps: any[];
}

export class GithubAspect extends Component {
  public static of(p: Project): GithubAspect | undefined {
    const gh = this.findAll(p);
    if (gh.length > 1) {
      throw new Error('found more then one GitHub component');
    }

    return undefined;
  }

  public static findAll(p: Project): GithubAspect[] {
    return p._components.filter(c => c instanceof GithubAspect) as GithubAspect[];
  }

  public readonly workflowBootstrapSteps: any[];

  constructor(public readonly project: Project, props: GitHubAspectProps) {
    super(project);

    this.workflowBootstrapSteps = props.workflowBootstrapSteps;
  }

  public get workflows(): GithubWorkflow[] {
    return this.project._components.filter(c => c instanceof GithubWorkflow) as GithubWorkflow[];
  }

  public addWorkflow(name: string): GithubWorkflow {
    return new GithubWorkflow(this.project, name);
  }
}

