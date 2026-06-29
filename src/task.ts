import { warn } from "./logging";
import type {
  TaskCommonOptions,
  TaskSpec,
  TaskStep,
  TaskStepOptions,
} from "./task-model";

export interface TaskOptions extends TaskCommonOptions {
  /**
   * Shell command to execute as the first command of the task.
   *
   * Mutually exclusive with `execArgs`.
   *
   * @default - add steps using `task.exec(command)` or `task.spawn(subtask)`
   */
  readonly exec?: string;

  /**
   * Shell command to execute as the first command of the task, provided as a
   * list of the program followed by its arguments (an "argv").
   *
   * A convenient alternative to `exec`: arguments with spaces or special
   * characters are passed through as-is, with no quoting needed. The elements
   * are not run through a shell, so environment variables (`$FOO`) are not
   * expanded and other shell features are unavailable.
   * @see TaskStep.execArgs
   *
   * Mutually exclusive with `exec`.
   *
   * @default - add steps using `task.execArgs(args)`, `task.exec(command)` or `task.spawn(subtask)`
   */
  readonly execArgs?: string[];

  /**
   * List of task steps to run.
   */
  readonly steps?: TaskStep[];

  /**
   * Should the provided `exec` shell command receive args passed to the task.
   * @see {@link TaskStepOptions.receiveArgs}
   *
   * @default false
   */
  readonly receiveArgs?: boolean;

  /**
   * Should the provided `exec` shell command receive fixed args.
   * @see {@link TaskStepOptions.args}
   *
   * @default - no arguments are passed to the step
   */
  readonly args?: string[];

  /**
   * Other tasks that this task depends on.
   *
   * Dependencies are run (to completion) before this task's steps, whenever
   * this task runs - including when it is run on its own (e.g. `npx projen
   * <task>`), pulled in as a dependency of another task, or reached via a
   * `spawn` step. Within a single invocation, a task reachable through multiple
   * dependency paths runs exactly once.
   *
   * Dependencies are declared on the *dependent* task (unlike `spawn`, which is
   * declared on the caller), so the relationship is defined once and honored
   * everywhere the task is used.
   *
   * @default - no dependencies
   */
  readonly dependsOn?: Task[];
}

/**
 * A task that can be performed on the project. Modeled as a series of shell
 * commands and subtasks.
 */
export class Task {
  /**
   * Task name.
   */
  public readonly name: string;

  private readonly _conditions: string[];
  private readonly _steps: TaskStep[];
  private readonly _dependsOn: Task[];
  private readonly _env: { [name: string]: string };
  private _cwd?: string | undefined;

  private readonly requiredEnv?: string[];
  private _locked: boolean;
  private _description?: string;

  constructor(name: string, props: TaskOptions = {}) {
    this.name = name;
    this._description = props.description;
    this._conditions = props.condition ? [props.condition] : [];
    this._cwd = props.cwd;
    this._locked = false;
    this._env = props.env ?? {};

    this._steps = props.steps ?? [];
    this.requiredEnv = props.requiredEnv;
    this._dependsOn = [];

    for (const dep of props.dependsOn ?? []) {
      this.addDependency(dep);
    }

    if (props.exec && props.steps) {
      throw new Error("cannot specify both exec and steps");
    }

    if (props.execArgs && props.steps) {
      throw new Error("cannot specify both execArgs and steps");
    }

    if (props.exec && props.execArgs) {
      throw new Error("cannot specify both exec and execArgs");
    }

    if (props.exec) {
      this.exec(props.exec, { receiveArgs: props.receiveArgs });
    }

    if (props.execArgs) {
      this.execArgs(props.execArgs, { receiveArgs: props.receiveArgs });
    }
  }

  /**
   * Forbid additional changes to this task.
   */
  public lock() {
    this._locked = true;
  }

  /**
   * Returns the working directory for this task.
   */
  public get cwd(): string | undefined {
    return this._cwd;
  }

  /**
   * Sets the working directory for this task.
   */
  public set cwd(cwd: string | undefined) {
    this._cwd = cwd;
  }

  /**
   * Returns the description of this task.
   */
  public get description(): string | undefined {
    return this._description;
  }

  /**
   * Sets the description of this task.
   */
  public set description(desc: string | undefined) {
    this._description = desc;
  }

  /**
   * A command to execute which determines if the task should be skipped. If it
   * returns a zero exit code, the task will not be executed.
   */
  public get condition(): string | undefined {
    if (this._conditions?.length) {
      return this._conditions.join(" && ");
    }
    return undefined;
  }

  /**
   * Add a command to execute which determines if the task should be skipped.
   *
   * If a condition already exists, the new condition will be appended with ` && ` delimiter.
   * @param condition The command to execute.
   * @see {@link Task.condition}
   */
  public addCondition(...condition: string[]): void {
    this._conditions.push(...condition);
  }

  /**
   * Reset the task so it no longer has any commands.
   * @param command the first command to add to the task after it was cleared.
   */
  public reset(command?: string, options: TaskStepOptions = {}) {
    this.assertUnlocked();

    if (!Array.isArray(this._steps)) {
      this.warnForLazyValue("reset");
      return;
    }

    while (this._steps.length) {
      this._steps.shift();
    }

    if (command) {
      this.exec(command, options);
    }
  }

  /**
   * Adds steps to this task. This is a generic method that accepts any
   * task step (exec, spawn, say, builtin).
   *
   * @param steps The steps to add.
   */
  public addSteps(...steps: TaskStep[]) {
    this._pushSteps("addSteps", steps);
  }

  /**
   * Executes a shell command
   * @param command Shell command
   * @param options Options
   */
  public exec(command: string, options: TaskStepOptions = {}) {
    this._pushSteps("exec", [{ exec: command, ...options }]);
  }

  /**
   * Executes a command provided as a list of the program followed by its
   * arguments (an "argv").
   *
   * A convenient alternative to `Task.exec`: arguments with spaces or
   * special characters are passed through as-is, with no quoting needed. The
   * elements are not run through a shell, so environment variables (`$FOO`) are
   * not expanded and other shell features are unavailable.
   *
   * @example task.execArgs(["echo", "hello world"]);
   *
   * @param command The program followed by its arguments.
   * @param options Options
   */
  public execArgs(command: string[], options: TaskStepOptions = {}) {
    this._pushSteps("execArgs", [{ execArgs: command, ...options }]);
  }

  /**
   * Execute a builtin task.
   *
   * Builtin tasks are programs bundled as part of projen itself and used as
   * helpers for various components.
   *
   * In the future we should support built-in tasks from external modules.
   *
   * @param name The name of the builtin task to execute (e.g.
   * `release/resolve-version`).
   */
  public builtin(name: string) {
    this._pushSteps("builtin", [{ builtin: name }]);
  }

  /**
   * Say something.
   * @param message Your message
   * @param options Options
   */
  public say(message: string, options: TaskStepOptions = {}) {
    this._pushSteps("say", [{ say: message, ...options }]);
  }

  /**
   * Spawns a sub-task.
   * @param subtask The subtask to execute.
   */
  public spawn(subtask: Task, options: TaskStepOptions = {}) {
    this._pushSteps("spawn", [{ spawn: subtask.name, ...options }]);
  }

  /**
   * Declares that this task depends on one or more other tasks.
   *
   * Dependencies are run (to completion) before this task's steps, whenever
   * this task runs. Within a single invocation, a task reachable through
   * multiple dependency paths runs exactly once.
   *
   * Adding a dependency that is already declared is a no-op. Adding a
   * dependency that would introduce a cycle throws.
   *
   * @param tasks The tasks this task should depend on.
   */
  public addDependency(...tasks: Task[]) {
    this.assertUnlocked();

    for (const task of tasks) {
      if (this._dependsOn.includes(task)) {
        continue;
      }
      this.validateNoCircularDependency(task);
      this._dependsOn.push(task);
    }
  }

  /**
   * Removes a previously declared dependency on another task.
   *
   * Removing a dependency that was not declared is a no-op.
   *
   * @param task The task to no longer depend on.
   */
  public removeDependency(task: Task) {
    this.assertUnlocked();

    const index = this._dependsOn.indexOf(task);
    if (index !== -1) {
      this._dependsOn.splice(index, 1);
    }
  }

  /**
   * Returns an immutable copy of the tasks this task depends on, in declaration
   * order.
   */
  public get dependencies(): Task[] {
    return [...this._dependsOn];
  }

  /**
   * Adds steps at the beginning of this task.
   *
   * @param steps The steps to add.
   */
  public prependSteps(...steps: TaskStep[]) {
    this._unshiftSteps("prependSteps", steps);
  }

  /**
   * Adds a command at the beginning of the task.
   * @param shell The command to add.
   */
  public prependExec(shell: string, options: TaskStepOptions = {}) {
    this._unshiftSteps("prependExec", [{ exec: shell, ...options }]);
  }

  /**
   * Adds a spawn instruction at the beginning of the task.
   * @param subtask The subtask to execute.
   */
  public prependSpawn(subtask: Task, options: TaskStepOptions = {}) {
    this._unshiftSteps("prependSpawn", [{ spawn: subtask.name, ...options }]);
  }

  /**
   * Says something at the beginning of the task.
   * @param message Your message
   */
  public prependSay(message: string, options: TaskStepOptions = {}) {
    this._unshiftSteps("prependSay", [{ say: message, ...options }]);
  }

  private _pushSteps(method: string, steps: TaskStep[]) {
    this.assertUnlocked();

    if (!Array.isArray(this._steps)) {
      this.warnForLazyValue(`${method} to`);
      return;
    }

    this._steps.push(...steps);
  }

  private _unshiftSteps(method: string, steps: TaskStep[]) {
    this.assertUnlocked();

    if (!Array.isArray(this._steps)) {
      this.warnForLazyValue(`${method} to`);
      return;
    }

    this._steps.unshift(...steps);
  }

  /**
   * Adds an environment variable to this task.
   * @param name The name of the variable
   * @param value The value. If the value is surrounded by `$()`, we will
   * evaluate it within a subshell and use the result as the value of the
   * environment variable.
   */
  public env(name: string, value: string) {
    this.assertUnlocked();
    this._env[name] = value;
  }

  /**
   * Returns all environment variables in the task level
   */
  public get envVars(): Readonly<{ [name: string]: string }> {
    return this._env;
  }

  /**
   * Returns an immutable copy of all the step specifications of the task.
   */
  public get steps(): TaskStep[] {
    // If the list of steps is a Lazy value, we can't know what the steps
    // are until synthesis occurs, so just return an empty array.
    if (!Array.isArray(this._steps)) {
      return [];
    }
    return [...this._steps];
  }

  /**
   * Insert one or more steps at a given index
   *
   * @param index Steps will be inserted before this index. May be negative to
   * count backwards from the end, or may be `== steps().length` to insert at the end.
   * @param steps The steps to insert
   */
  public insertStep(index: number, ...steps: TaskStep[]): void {
    this.assertUnlocked();

    if (!Array.isArray(this._steps)) {
      this.warnForLazyValue("insert steps into");
      return;
    }

    if (index < -this._steps.length || index > this.steps.length) {
      throw new Error(
        `Cannot insert steps at index ${index} for task ${this.name} because the index is out of bounds for size ${this.steps.length}`,
      );
    }

    this._steps.splice(index, 0, ...steps);
  }

  /**
   *
   * @param index The index of the step to edit
   * @param step The new step to replace the old one entirely, it is not merged with the old step
   */
  public updateStep(index: number, step: TaskStep): void {
    this.assertUnlocked();

    if (!Array.isArray(this._steps)) {
      this.warnForLazyValue("update step for");
      return;
    }

    const existingStep = this._steps[index];
    if (!existingStep) {
      throw new Error(
        `Cannot update step at index ${index} for task ${this.name} because it does not exist`,
      );
    }

    this._steps[index] = step;
  }

  /**
   *
   * @param index The index of the step to remove
   */
  public removeStep(index: number): void {
    this.assertUnlocked();

    if (!Array.isArray(this._steps)) {
      this.warnForLazyValue("remove step from");
      return;
    }

    const existingStep = this._steps[index];
    if (!existingStep) {
      throw new Error(
        `Cannot remove step at index ${index} for task ${this.name} because it does not exist`,
      );
    }

    this._steps.splice(index, 1);
  }

  /**
   * Renders a task spec into the manifest.
   *
   * @internal
   */
  public _renderSpec(): TaskSpec {
    // Ensure task-level env vars are strings
    const env = Object.keys(this._env).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: this.getEnvString(curr, this._env[curr]),
      }),
      {},
    );

    // Ensure step-level env vars are strings
    const steps = Array.isArray(this._steps)
      ? [...this._steps].map((s) => {
          return s.env
            ? {
                ...s,
                env: Object.keys(s.env).reduce(
                  (prev, curr) => ({
                    ...prev,
                    [curr]: this.getEnvString(curr, s.env![curr]),
                  }),
                  {},
                ),
              }
            : s;
        })
      : this._steps;

    return {
      name: this.name,
      description: this.description,
      env: env,
      requiredEnv: this.requiredEnv,
      steps: steps,
      condition: this.condition,
      cwd: this._cwd,
      dependsOn: omitEmptyArray(this._dependsOn.map((t) => ({ task: t.name }))),
    };
  }

  private assertUnlocked() {
    if (this._locked) {
      throw new Error(`Task "${this.name}" is locked for changes`);
    }
  }

  private warnForLazyValue(actionBeingUndertaken: string): void {
    warn(
      `Cannot ${actionBeingUndertaken} task "${this.name}" because it is a lazy value, try using the preSynthesize phase.`,
    );
  }

  /**
   * Ensure that environment variables are persisted as strings
   * to prevent type errors when parsing from tasks.json in future
   */
  private getEnvString(name: string, value: any) {
    if (typeof value !== "string" && value !== undefined) {
      warn(
        `Received non-string value for environment variable ${name}. Value will be stringified.`,
      );
      return String(value);
    } else {
      return value;
    }
  }

  /**
   * Throws if depending on `target` would introduce a circular dependency,
   * i.e. if `target` (transitively) already depends on this task.
   */
  private validateNoCircularDependency(target: Task) {
    const self = this;
    const seen = new Set<Task>();

    recurse(target);

    function recurse(src: Task) {
      if (src === self) {
        throw new Error(
          `Cannot add dependency from task "${self.name}" to "${target.name}": "${target.name}" already depends on "${self.name}"`,
        );
      }
      if (seen.has(src)) {
        return;
      }
      seen.add(src);
      for (const dep of src._dependsOn) {
        recurse(dep);
      }
    }
  }
}

function omitEmptyArray<A>(xs: A[]): A[] | undefined {
  return xs.length > 0 ? xs : undefined;
}
