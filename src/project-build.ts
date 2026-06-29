import { Component } from "./component";
import type { Project } from "./project";
import type { Task } from "./task";

/**
 * Manages a standard build process for all projects.
 *
 * `build` runs the phases in order via explicit `spawn` steps, exactly as
 * before, with two changes that introduce the declarative dependency model
 * incrementally:
 *
 * - `compile` now *depends on* `pre-compile` (rather than `build` spawning
 *   `pre-compile` separately). `pre-compile` therefore runs whenever `compile`
 *   runs, including `npx projen compile` on its own.
 * - `build` *depends on* `default` (root projects only) instead of spawning it,
 *   so the project is re-synthesized before the build phases run.
 *
 * Running `build` resolves to:
 * 1. default (root only, as a dependency)
 * 2. pre-compile (as a dependency of compile)
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

  constructor(project: Project) {
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

    // pre-compile is now a dependency of compile, so it runs whenever compile
    // runs (including `npx projen compile` standalone). `build` no longer
    // spawns it explicitly.
    this.compileTask.addDependency(this.preCompileTask);

    // if this is not a subproject, depend on the "default" task which will
    // synthesize project files before the build phases run.
    if (!this.project.parent && this.project.defaultTask) {
      this.buildTask.addDependency(this.project.defaultTask);
    }

    this.buildTask.spawn(this.compileTask);
    this.buildTask.spawn(this.postCompileTask);
    this.buildTask.spawn(this.testTask);
    this.buildTask.spawn(this.packageTask);

    // do not allow additional build phases
    this.buildTask.lock();
  }
}
