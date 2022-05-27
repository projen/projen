import { Component } from "./component";
import { StandardProject } from "./standard-project";
import { Task } from "./task";

/**
 * Manages a standard build process for all projects.
 *
 * Build spawns these tasks in order:
 * 1. default
 * 2. pre-compile
 * 3. compile
 * 4. post-compile
 * 5. test
 * 6. package
 */
export class ProjectBuild extends Component {
  /**
   * The task responsible for a full release build.
   */
  public readonly buildTask: Task;

  /**
   * Pre-compile task.
   */
  public readonly preCompileTask: Task;

  /**
   * Compiles the code. By default for node.js projects this task is empty.
   */
  public readonly compileTask: Task;

  /**
   * Post-compile task.
   */
  public readonly postCompileTask: Task;

  /**
   * Tests the code.
   */
  public readonly testTask: Task;

  /**
   * The "package" task.
   */
  public readonly packageTask: Task;

  constructor(project: StandardProject) {
    super(project);

    this.preCompileTask = project.tasks.addTask("pre-compile", {
      description: "Prepare the project for compilation",
    });

    this.compileTask = project.tasks.addTask("compile", {
      description: "Only compile",
    });

    this.postCompileTask = project.tasks.addTask("post-compile", {
      description: "Runs after successful compilation",
    });

    this.testTask = project.tasks.addTask("test", {
      description: "Run tests",
    });

    this.packageTask = project.tasks.addTask("package", {
      description: "Creates the distribution package",
    });

    this.buildTask = project.tasks.addTask("build", {
      description: "Full release build",
    });

    // if this is not subproject, execute the "default" task which will
    // synthesize project files.
    if (!this.project.parent && project.defaultTask) {
      this.buildTask.spawn(project.defaultTask);
    }

    this.buildTask.spawn(this.preCompileTask);
    this.buildTask.spawn(this.compileTask);
    this.buildTask.spawn(this.postCompileTask);
    this.buildTask.spawn(this.testTask);
    this.buildTask.spawn(this.packageTask);

    // do not allow additional build phases
    this.buildTask.lock();
  }
}
