import * as path from "node:path";
import type { IConstruct } from "constructs";
import { resolve } from "./_resolve";
import { PROJEN_DIR, TASKS_MANIFEST_VERSION } from "./common";
import { Component } from "./component";
import type { IResolver } from "./file";
import { JsonFile } from "./json";
import type { Task } from "./task";
import type { TasksManifest } from "./task-model";
import { node } from "./util/exec";

export interface ITaskRunner {
  /**
   * Runs a task.
   * @param task The task to run.
   * @param args List of arguments passed to the task, if supported.
   */
  runTask(task: Task, args?: Array<string | number>): void;
}

export class ProjenTaskRunner extends Component implements ITaskRunner {
  /**
   * The project-relative path of the tasks manifest file.
   */
  public static readonly MANIFEST_FILE = path.posix.join(
    PROJEN_DIR,
    "tasks.json",
  );

  constructor(scope: IConstruct, id?: string) {
    super(scope, id);

    // The runner owns the projen tasks manifest (`.projen/tasks.json`).
    //
    // The file is created here, in the constructor, with *lazy* content so
    // that tasks added to the project later are still included. It cannot be
    // created in `synthesize()` because components created during the synthesis
    // loop are not themselves synthesized (the file would never be written).
    new JsonFile(this.project, ProjenTaskRunner.MANIFEST_FILE, {
      omitEmpty: true,
      obj: (() => this.tasksManifest) as any,
    });
  }

  /**
   * Runs a task by shelling out to the projen CLI. The CLI owns the task
   * runtime, which keeps `src/` decoupled from `src/cli/`.
   */
  public runTask(task: Task, args?: Array<string | number>): void {
    // Resolve the compiled CLI entrypoint relative to the package root (the
    // same approach used by TaskRuntime for builtin tasks). This works both
    // from the compiled `lib/` output and when running from `src/` under
    // ts-jest, where a module-relative `./cli/index.js` would not exist.
    const moduleRoot = path.dirname(require.resolve("../package.json"));
    const cli = path.join(moduleRoot, "lib", "cli", "index.js");
    const argv = [cli, task.name, ...(args ?? []).map((a) => a.toString())];
    try {
      node.run(argv, {
        cwd: this.project.outdir,
        inheritStdio: true,
      });
    } catch (e: any) {
      // `node.run` (execFileSync) throws on a non-zero exit (with a numeric
      // `.status`) or on a spawn failure. Translate a non-zero exit into a
      // task-friendly error; re-throw spawn errors as-is. The child's stderr
      // was already streamed live (inheritStdio), so it need not be re-surfaced.
      if (typeof e?.status === "number") {
        throw new Error(`Task "${task.name}" failed (exit code ${e.status}).`);
      }
      throw e;
    }
  }

  protected get tasksManifest(): TasksManifest {
    const resolver: IResolver = {
      resolve: (obj, options) => resolve(obj, options),
    };

    // The runner owns the on-disk manifest, so it stamps the schema version
    // onto the logical tasks/env produced by `Tasks`. The version lets the task
    // runtime detect manifests produced by a newer (potentially incompatible)
    // version of projen.
    const resolved: TasksManifest =
      this.project.tasks.resolveTasksManifest(resolver) ?? {};

    return {
      manifestVersion: TASKS_MANIFEST_VERSION,
      ...resolved,
    };
  }
}
