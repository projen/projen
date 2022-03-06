import { Construct } from "constructs";
import { Component } from "../component";
import { Project } from "../project";
import { Task } from "../task";

/**
 * Adds standard AWS CDK tasks to your project.
 */
export class CdkTasks extends Component {
  /**
   * Synthesizes your app.
   */
  public readonly synth: Task;

  /**
   * Synthesizes your app and suppresses stdout.
   */
  public readonly synthSilent: Task;

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

  /**
   * Watch task.
   */
  public readonly watch: Task;

  constructor(scope: Construct) {
    super(scope, "CdkTasks");

    const project = Project.of(this);

    this.synth = project.addTask("synth", {
      description: "Synthesizes your cdk app into cdk.out",
      exec: "cdk synth",
    });

    this.synthSilent = project.addTask("synth:silent", {
      description:
        'Synthesizes your cdk app into cdk.out and suppresses the template in stdout (part of "yarn build")',
      exec: "cdk synth > /dev/null", // redirect to /dev/null to hide template
    });

    this.deploy = project.addTask("deploy", {
      description: "Deploys your CDK app to the AWS cloud",
      exec: "cdk deploy",
    });

    this.destroy = project.addTask("destroy", {
      description: "Destroys your cdk app in the AWS cloud",
      exec: "cdk destroy",
    });

    this.diff = project.addTask("diff", {
      description: "Diffs the currently deployed app against your code",
      exec: "cdk diff",
    });

    // typescript projects already have a "watch" task, we we will repurpose it
    const watch = project.tasks.tryFind("watch") ?? project.addTask("watch");

    watch.reset();
    watch.description =
      "Watches changes in your source code and rebuilds and deploys to the current account";

    // deploy first because surprisingly watch is not deploying first
    // see https://github.com/aws/aws-cdk/issues/17776
    watch.exec("cdk deploy --hotswap");

    // now we are ready to watch
    watch.exec("cdk watch");

    this.watch = watch;
  }
}
