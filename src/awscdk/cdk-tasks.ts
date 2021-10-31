import { Component } from '../component';
import { Project } from '../project';
import { Task } from '../tasks';

/**
 * Adds standard AWS CDK tasks to your project.
 */
export class CdkTasks extends Component {
  /**
   * Synthesizes your app.
   */
  public readonly synth: Task;

  /**
   * Deploys your app.
   */
  public readonly deploy: Task;

  /**
   * Destroys all the stacks.
   */
  public readonly destroy: Task;

  /**
   * Diff against production.
   */
  public readonly diff: Task;

  constructor(project: Project) {
    super(project);

    this.synth = project.addTask('synth', {
      description: 'Synthesizes your cdk app into cdk.out (part of "yarn build")',
      exec: 'cdk synth',
    });

    this.deploy = project.addTask('deploy', {
      description: 'Deploys your CDK app to the AWS cloud',
      exec: 'cdk deploy',
    });

    this.destroy = project.addTask('destroy', {
      description: 'Destroys your cdk app in the AWS cloud',
      exec: 'cdk destroy',
    });

    this.diff = project.addTask('diff', {
      description: 'Diffs the currently deployed app against your code',
      exec: 'cdk diff',
    });
  }
}