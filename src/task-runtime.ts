import { SpawnOptions, spawnSync } from "child_process";
import { existsSync, readFileSync, statSync } from "fs";
import { dirname, join, resolve } from "path";
import * as path from "path";
import { format } from "util";
import { gray, underline } from "chalk";
import { PROJEN_DIR } from "./common";
import * as logging from "./logging";
import { TasksManifest, TaskSpec, TaskStep } from "./task-model";
import { makeCrossPlatform } from "./util/tasks";

const ENV_TRIM_LEN = 20;
const ARGS_MARKER = "$@";
const QUOTED_ARGS_MARKER = `"${ARGS_MARKER}"`;

/**
 * The runtime component of the tasks engine.
 */
export class TaskRuntime {
  /**
   * The project-relative path of the tasks manifest file.
   */
  public static readonly MANIFEST_FILE = path.posix.join(
    PROJEN_DIR,
    "tasks.json"
  );

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
    const manifestPath = join(this.workdir, TaskRuntime.MANIFEST_FILE);
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
  public runTask(
    name: string,
    parents: string[] = [],
    args: Array<string | number> = [],
    env: { [name: string]: string } = {}
  ) {
    const task = this.tryFindTask(name);
    if (!task) {
      throw new Error(`cannot find command ${task}`);
    }

    new RunTask(this, task, parents, args, env);
  }
}

class RunTask {
  private readonly env: { [name: string]: string | undefined } = {};
  private readonly parents: string[];

  private readonly workdir: string;

  constructor(
    private readonly runtime: TaskRuntime,
    private readonly task: TaskSpec,
    parents: string[] = [],
    args: Array<string | number> = [],
    envParam: { [name: string]: string } = {}
  ) {
    this.workdir = task.cwd ?? this.runtime.workdir;

    this.parents = parents;

    if (!task.steps || task.steps.length === 0) {
      this.logDebug(gray("No actions have been specified for this task."));
      return;
    }

    this.env = this.resolveEnvironment(envParam, parents);

    const envlogs = [];
    for (const [k, v] of Object.entries(this.env)) {
      const vv = v ?? "";
      const trimmed =
        vv.length > ENV_TRIM_LEN ? vv.substr(0, ENV_TRIM_LEN) + "..." : vv;
      envlogs.push(`${k}=${trimmed}`);
    }

    if (envlogs.length) {
      this.logDebug(gray(`${underline("env")}: ${envlogs.join(" ")}`));
    }

    // evaluate condition
    if (!this.evalCondition(task)) {
      this.log("condition exited with non-zero - skipping");
      return;
    }

    // verify we required environment variables are defined
    const merged = { ...process.env, ...this.env };
    const missing = new Array<string>();
    for (const name of task.requiredEnv ?? []) {
      if (!(name in merged)) {
        missing.push(name);
      }
    }

    if (missing.length > 0) {
      throw new Error(
        `missing required environment variables: ${missing.join(",")}`
      );
    }

    for (const step of task.steps) {
      // evaluate step condition
      if (!this.evalCondition(step)) {
        this.log("condition exited with non-zero - skipping");
        continue;
      }

      const argsList: string[] = [
        ...(step.args || []),
        ...(step.receiveArgs ? args : []),
      ].map((a) => a.toString());

      if (step.say) {
        logging.info(this.fmtLog(step.say));
      }

      if (step.spawn) {
        this.runtime.runTask(
          step.spawn,
          [...this.parents, this.task.name],
          argsList,
          step.env
        );
      }

      const execs = step.exec ? [step.exec] : [];

      // Parse step-specific environment variables
      const env = this.evalEnvironment(step.env ?? {});

      if (step.builtin) {
        execs.push(this.renderBuiltin(step.builtin));
      }

      for (const exec of execs) {
        let hasError = false;

        let command = makeCrossPlatform(exec);

        if (command.includes(QUOTED_ARGS_MARKER)) {
          // Poorly imitate bash quoted variable expansion. If "$@" is encountered in bash, elements of the arg array
          // that contain whitespace will be single quoted ('arg'). This preserves whitespace in things like filenames.
          // Imitate that behavior here by single quoting every element of the arg array when a quoted arg marker ("$@")
          // is encountered.
          command = command.replace(
            QUOTED_ARGS_MARKER,
            argsList.map((arg) => `'${arg}'`).join(" ")
          );
        } else if (command.includes(ARGS_MARKER)) {
          command = command.replace(ARGS_MARKER, argsList.join(" "));
        } else {
          command = [command, ...argsList].join(" ");
        }

        const cwd = step.cwd;
        try {
          const result = this.shell({
            command,
            cwd,
            extraEnv: env,
          });
          hasError = result.status !== 0;
        } catch (e) {
          // This is the error 'shx' will throw
          if ((e as any)?.message?.startsWith("non-zero exit code:")) {
            hasError = true;
          }
          throw e;
        }
        if (hasError) {
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
  private evalCondition(taskOrStep: TaskSpec | TaskStep) {
    // no condition, carry on
    if (!taskOrStep.condition) {
      return true;
    }

    this.log(gray(`${underline("condition")}: ${taskOrStep.condition}`));
    const result = this.shell({
      command: taskOrStep.condition,
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
   * Evaluates environment variables from shell commands (e.g. `$(xx)`)
   */
  private evalEnvironment(env: { [name: string]: string }) {
    const output: { [name: string]: string | undefined } = {};

    for (const [key, value] of Object.entries(env ?? {})) {
      if (String(value).startsWith("$(") && String(value).endsWith(")")) {
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
   * Renders the runtime environment for a task. Namely, it supports this syntax
   * `$(xx)` for allowing environment to be evaluated by executing a shell
   * command and obtaining its result.
   */
  private resolveEnvironment(
    envParam: { [name: string]: string },
    parents: string[]
  ) {
    let env = this.runtime.manifest.env ?? {};

    // add env from all parent tasks one by one
    for (const parent of parents) {
      env = {
        ...env,
        ...(this.runtime.tryFindTask(parent)?.env ?? {}),
      };
    }

    // apply task environment, then the specific env last
    env = {
      ...env,
      ...(this.task.env ?? {}),
      ...envParam,
    };

    return this.evalEnvironment(env ?? {});
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

  private logDebug(...args: any[]) {
    logging.debug(this.fmtLog(...args));
  }

  private fmtLog(...args: any[]) {
    return format(`${underline(this.fullname)} |`, ...args);
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
      env: {
        ...process.env,
        ...this.env,
        ...options.extraEnv,
      },
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

  private renderBuiltin(builtin: string) {
    const moduleRoot = dirname(require.resolve("../package.json"));
    const program = require.resolve(
      join(moduleRoot, "lib", `${builtin}.task.js`)
    );
    return `"${process.execPath}" "${program}"`;
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
  readonly extraEnv?: { [name: string]: string | undefined };
}
