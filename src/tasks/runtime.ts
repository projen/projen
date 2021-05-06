import { SpawnOptions, spawnSync } from "child_process";
import { existsSync, readFileSync, statSync } from "fs";
import { join, resolve } from "path";
import { format } from "util";
import * as chalk from "chalk";
import * as logging from "../logging";
import { TasksManifest, TaskSpec } from "./model";
import { Tasks } from "./tasks";

/**
 * The runtime component of the tasks engine.
 */
export class TaskRuntime {
  /**
   * The contents of tasks.json
   */
  public readonly manifest: TasksManifest;

  /**
   * The root directory of the project and the cwd for executing tasks.
   */
  public readonly workdir: string;

  constructor(workdir: string) {
    this.workdir = resolve(workdir);
    const manifestPath = join(this.workdir, Tasks.MANIFEST_FILE);
    this.manifest = existsSync(manifestPath)
      ? JSON.parse(readFileSync(manifestPath, "utf-8"))
      : { tasks: {} };
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
    if (!this.manifest.tasks) {
      return undefined;
    }
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
  private readonly env: { [name: string]: string | undefined } = {};
  private readonly parents: string[];

  private readonly workdir: string;

  constructor(
    private readonly runtime: TaskRuntime,
    private readonly task: TaskSpec,
    parents: string[] = []
  ) {
    this.workdir = task.cwd ?? this.runtime.workdir;

    this.parents = parents;
    this.env = { ...process.env };
    this.env = this.resolveEnvironment();

    // evaluate condition
    if (!this.evalCondition(task)) {
      this.log("condition exited with non-zero - skipping");
      return;
    }

    for (const step of task.steps ?? []) {
      if (step.say) {
        logging.info(this.fmtLog(step.say));
      }

      if (step.spawn) {
        this.runtime.runTask(step.spawn, [...this.parents, this.task.name]);
      }

      if (step.exec) {
        const command = step.exec;
        const cwd = step.cwd;
        const result = this.shell({ command, cwd });
        if (result.status !== 0) {
          throw new Error(
            `Task "${
              this.fullname
            }" failed when executing "${command}" (cwd: ${resolve(
              cwd ?? this.workdir
            )})`
          );
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
    const result = this.shell({
      command: task.condition,
      logprefix: "condition: ",
      quiet: true,
    });
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
      ...(this.runtime.manifest.env ?? {}),
      ...(this.task.env ?? {}),
    };

    const output: { [name: string]: string | undefined } = {
      ...process.env,
    };

    for (const [key, value] of Object.entries(env ?? {})) {
      if (value.startsWith("$(") && value.endsWith(")")) {
        const query = value.substring(2, value.length - 1);
        const result = this.shellEval({ command: query });
        if (result.status !== 0) {
          const error = result.error
            ? result.error.stack
            : result.stderr?.toString() ?? "unknown error";
          throw new Error(
            `unable to evaluate environment variable ${key}=${value}: ${error}`
          );
        }
        output[key] = result.stdout.toString("utf-8").trim();
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
    return [...this.parents, this.task.name].join(" » ");
  }

  private log(...args: any[]) {
    logging.verbose(this.fmtLog(...args));
  }

  private fmtLog(...args: any[]) {
    return format(`${chalk.underline(this.fullname)} |`, ...args);
  }

  private shell(options: ShellOptions) {
    const quiet = options.quiet ?? false;
    if (!quiet) {
      const log = new Array<string>();

      if (options.logprefix) {
        log.push(options.logprefix);
      }

      log.push(options.command);

      if (options.cwd) {
        log.push(`(cwd: ${options.cwd})`);
      }

      this.log(log.join(" "));
    }

    const cwd = options.cwd ?? this.workdir;
    if (!existsSync(cwd) || !statSync(cwd).isDirectory()) {
      throw new Error(
        `invalid workdir (cwd): ${cwd} must be an existing directory`
      );
    }

    return spawnSync(options.command, {
      ...options,
      cwd,
      shell: true,
      stdio: "inherit",
      env: this.env,
      ...options.spawnOptions,
    });
  }

  private shellEval(options: ShellOptions) {
    return this.shell({
      quiet: true,
      ...options,
      spawnOptions: {
        stdio: ["inherit", "pipe", "inherit"],
      },
    });
  }
}

interface ShellOptions {
  readonly command: string;
  /**
   * @default - project dir
   */
  readonly cwd?: string;
  readonly logprefix?: string;
  readonly spawnOptions?: SpawnOptions;
  /** @default false */
  readonly quiet?: boolean;
}
