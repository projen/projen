import * as fs from "fs-extra";
import * as logging from "../logging";
import { Project } from "../project";
import { TaskRuntime } from "../task-runtime";

export interface SynthOptions {
  /**
   * Execute post synthesis commands.
   * @default true
   */
  readonly post?: boolean;

  /**
   * Start watching .projenrc.js and re-synth when changed.
   * @default false
   */
  readonly watch?: boolean;
}

export async function synth(runtime: TaskRuntime, options: SynthOptions) {
  const workdir = runtime.workdir;

  // if there are no tasks, we assume this is not a projen project (modern
  // projects must at least have the "default" task).
  if (runtime.tasks.length === 0) {
    logging.error(
      'Unable to find projen project. Use "projen new" to create a new project.'
    );
    process.exitCode = 1;
    return;
  }

  // run synth once
  const success = await trySynth();

  if (options.watch) {
    // if we are in watch mode, start the watch loop
    watchLoop();
  } else if (!success) {
    // make sure exit code is non-zero if we are not in watch mode
    process.exitCode = 1;
    return;
  }

  async function trySynth() {
    // determine if post synthesis tasks should be executed (e.g. "yarn install").
    process.env.PROJEN_DISABLE_POST = (!options.post).toString();
    try {
      const defaultTask = runtime.tasks.find(
        (t) => t.name === Project.DEFAULT_TASK
      );

      if (!defaultTask) {
        throw new Error('Unable to find a task named "default"');
      }

      runtime.runTask(defaultTask.name);
      return true;
    } catch (e) {
      logging.error(`Synthesis failed: ${(e as any).message}`);
      return false;
    }
  }

  function watchLoop() {
    logging.info(`Watching for changes in ${workdir}...`);
    const watch = fs.watch(workdir, { recursive: true });
    watch.on("change", (event) => {
      // we only care about "change" events
      if (event !== "change") {
        return;
      }

      process.stdout.write("\x1Bc"); // clear screen
      watch.close();
      trySynth()
        .then(() => watchLoop())
        .catch(() => watchLoop());
    });
  }
}
