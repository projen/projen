import { SpawnOptions, spawnSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import * as chalk from 'chalk';
import * as logging from '../logging';
import { TasksManifest, TaskSpec } from './model';
import { Tasks } from './tasks';

/**
 * The runtime component of the tasks engine.
 */
export class TaskRuntime {
  public readonly manifest: TasksManifest;

  /**
   * The root directory of the project and the cwd for executing tasks.
   */
  public readonly workdir: string;

  constructor(workdir: string) {
    this.workdir = workdir;
    const manifestPath = join(this.workdir, Tasks.MANIFEST_FILE);
    this.manifest = existsSync(manifestPath)
      ? JSON.parse(readFileSync(manifestPath, 'utf-8'))
      : { tasks: { } };
  }

  /**
   * The tasks in this project.
   */
  public get tasks(): TaskSpec[] {
    return Object.values(this.manifest.tasks ?? {});
  }

  /**
   * Find a task by name, or `undefined` if not found.
   */
  public tryFindTask(name: string): TaskSpec | undefined {
    if (!this.manifest.tasks) { return undefined; }
    return this.manifest.tasks[name];
  }

  /**
   * Runs the task.
   * @param name The task name.
   */
  public runTask(name: string, parents: string[] = []) {
    const task = this.tryFindTask(name);
    if (!task) {
      throw new Error(`cannot find command ${task}`);
    }

    new RunTask(this, task, parents);
  }
}

class RunTask {
  private readonly env: { [name: string]: string | undefined } = { };
  private readonly parents: string[];

  constructor(private readonly runtime: TaskRuntime, private readonly task: TaskSpec, parents: string[] = []) {
    this.parents = parents;
    this.env = { ...process.env };
    this.env = this.resolveEnvironment();

    // evaluate condition
    if (!this.evalCondition(task)) {
      this.log('condition exited with non-zero - skipping');
      return;
    }

    for (const step of task.steps ?? []) {
      if (step.spawn) {
        this.runtime.runTask(step.spawn, [...this.parents, this.task.name]);
      }

      if (step.exec) {
        const exec = step.exec;
        this.log(exec);
        const result = this.shell(exec);
        if (result.status !== 0) {
          throw new Error(`Task "${this.fullname}" failed when executing "${exec}" (cwd: ${resolve(this.runtime.workdir)})`);
        }
      }
    }
  }

  /**
   * Determines if a task should be executed based on "condition".
   *
   * @returns true if the task should be executed or false if the condition
   * evaluates to false (exits with non-zero), indicating that the task should
   * be skipped.
   */
  private evalCondition(task: TaskSpec) {
    // no condition, carry on
    if (!task.condition) {
      return true;
    }

    this.log(`condition: ${task.condition}`);
    const result = this.shell(task.condition);
    if (result.status === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Renders the runtime environment for a task. Namely, it supports this syntax
   * `$(xx)` for allowing environment to be evaluated by executing a shell
   * command and obtaining its result.
   *
   * @param env The user-defined environment
   */
  private resolveEnvironment() {
    const env = {
      ...this.runtime.manifest.env ?? {},
      ...this.task.env ?? {},
    };

    const output: { [name: string]: string | undefined } = {
      ...process.env,
    };

    for (const [key, value] of Object.entries(env ?? {})) {
      if (value.startsWith('$(') && value.endsWith(')')) {
        const query = value.substring(2, value.length - 1);
        const result = this.shellEval(query);
        if (result.status !== 0) {
          throw new Error(`unable to evaluate environment variable ${key}=${value}: ${result.stderr.toString() ?? 'unknown error'}`);
        }
        output[key] = result.stdout.toString('utf-8').trim();
      } else {
        output[key] = value;
      }
    }

    return output;
  }

  /**
   * Returns the "full name" of the task which includes all it's parent task names concatenated by chevrons.
   */
  private get fullname() {
    return [...this.parents, this.task.name].join(' » ');
  }

  private log(...args: any[]) {
    logging.verbose(`${chalk.underline(this.fullname)} |`, ...args);
  }

  private shell(command: string, options: SpawnOptions = {}) {
    return spawnSync(command, { cwd: this.runtime.workdir, shell: true, stdio: 'inherit', env: this.env, ...options });
  }

  private shellEval(command: string, options: SpawnOptions = {}) {
    return this.shell(command, { stdio: ['inherit', 'pipe', 'inherit'], ...options });
  }
}