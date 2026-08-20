import { Component } from "../component";
import type { Project } from "../project";
import type { Task } from "../task";

/**
 * Adds standard CDKTN tasks to your project.
 */
export class CdktnTasks extends Component {
  /**
   * Gets/updates Terraform providers and modules.
   */
  public readonly get: Task;

  /**
   * Synthesizes your app.
   */
  public readonly synth: Task;

  /**
   * Synthesizes your app and suppresses stdout.
   */
  public readonly synthSilent: Task;

  /**
   * Plan your app deployment.
   */
  public readonly plan: Task;

  /**
   * Deploys your app.
   */
  public readonly deploy: Task;

  /**
   * Destroys all the stacks.
   */
  public readonly destroy: Task;

  /**
   * Diff against the currently deployed stacks.
   */
  public readonly diff: Task;

  /**
   * Watch task.
   */
  public readonly watch: Task;

  constructor(project: Project) {
    super(project);

    this.get = project.addTask("get", {
      description: "Imports and updates Terraform providers and modules",
      execArgs: ["cdktn", "get"],
    });

    this.synth = project.addTask("synth", {
      description: "Synthesizes your CDKTN app into cdktf.out",
      execArgs: ["cdktn", "synth"],
    });

    this.synthSilent = project.addTask("synth:silent", {
      description:
        'Synthesizes your CDKTN app into cdktf.out and suppresses the template in stdout (part of "yarn build")',
      execArgs: ["cdktn", "synth", "-q"],
    });

    this.plan = project.addTask("plan", {
      description: "Plan your CDKTN app deployment",
      execArgs: ["cdktn", "plan"],
      receiveArgs: true,
    });

    this.deploy = project.addTask("deploy", {
      description: "Deploys your CDKTN app",
      execArgs: ["cdktn", "deploy"],
      receiveArgs: true,
    });

    this.destroy = project.addTask("destroy", {
      description: "Destroys your CDKTN app",
      execArgs: ["cdktn", "destroy"],
      receiveArgs: true,
    });

    this.diff = project.addTask("diff", {
      description: "Diffs the currently deployed stacks against your code",
      execArgs: ["cdktn", "diff"],
    });

    // typescript projects already have a "watch" task, we will repurpose it
    const watch = project.tasks.tryFind("watch") ?? project.addTask("watch");

    watch.reset();
    watch.description =
      "Watches changes in your source code and rebuilds and deploys to the current account";

    watch.execArgs(["cdktn", "watch"]);

    this.watch = watch;
  }
}
