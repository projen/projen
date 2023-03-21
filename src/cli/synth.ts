import { spawnSync } from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { PROJEN_RC } from "../common";
import * as logging from "../logging";
import { Project } from "../project";
import { TaskRuntime } from "../task-runtime";

const projenModule = path.dirname(require.resolve("../../package.json"));

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

  /**
   * The name of the .projenrc.js file  to use instead of the default.
   * @default ".projenrc.js"
   */
  readonly rcfile?: string;
}

export async function synth(runtime: TaskRuntime, options: SynthOptions) {
  const workdir = runtime.workdir;
  const rcfile = path.resolve(workdir, options.rcfile ?? PROJEN_RC); // TODO: support non javascript projenrc (e.g. java projects)

  // if --rc points to .projenrc.js, then behave as if it wasn't specified.
  if (rcfile === path.resolve(workdir, PROJEN_RC)) {
    delete (options as any).rcfile;
  }

  // if there are no tasks, we assume this is not a projen project (modern
  // projects must at least have the "default" task).
  if (runtime.tasks.length === 0 && !fs.existsSync(rcfile)) {
    logging.error(
      'Unable to find projen project. Use "projen new" to create a new project.'
    );
    process.exit(1);
  }

  // run synth once
  const success = await trySynth();

  if (options.watch) {
    // if we are in watch mode, start the watch loop
    watchLoop();
  } else if (!success) {
    // make sure exit code is non-zero if we are not in watch mode
    process.exit(1);
  }

  async function trySynth() {
    // determine if post synthesis tasks should be executed (e.g. "yarn install").
    process.env.PROJEN_DISABLE_POST = (!options.post).toString();
    try {
      const defaultTask = runtime.tasks.find(
        (t) => t.name === Project.DEFAULT_TASK
      );

      // if "--rc" is specified, ignore the default task
      if (defaultTask) {
        if (!options.rcfile) {
          runtime.runTask(defaultTask.name);
          return true;
        } else {
          logging.warn(
            "Default task skipped. Trying legacy synthesis since --rc is specified"
          );
        }
      }

      // for backwards compatibility, if there is a .projenrc.js file, default to "node .projenrc.js"
      if (tryLegacySynth()) {
        return true;
      }

      throw new Error('Unable to find a task named "default"');
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

  function tryLegacySynth() {
    const rcdir = path.dirname(rcfile);

    if (!fs.existsSync(rcfile)) {
      return false;
    }

    // if node_modules/projen is not a directory or does not exist, create a
    // temporary symlink to the projen that we are currently running in order to
    // allow .projenrc.js to `require()` it.
    const nodeModules = path.resolve(rcdir, "node_modules");
    const projenModulePath = path.resolve(nodeModules, "projen");
    if (
      !fs.existsSync(path.join(projenModulePath, "package.json")) ||
      !fs.statSync(projenModulePath).isDirectory()
    ) {
      fs.rmSync(projenModulePath, { force: true, recursive: true });
      fs.mkdirSync(nodeModules, { recursive: true });
      fs.symlinkSync(
        projenModule,
        projenModulePath,
        os.platform() === "win32" ? "junction" : null
      );
    }

    const ret = spawnSync(process.execPath, [rcfile], {
      stdio: ["inherit", "inherit", "pipe"],
    });
    if (ret.error) {
      throw new Error(`Synthesis failed: ${ret.error}`);
    } else if (ret.status !== 0) {
      logging.error(ret.stderr.toString());
      throw new Error(
        `Synthesis failed: calling "${process.execPath} ${rcfile}" exited with status=${ret.status}`
      );
    }

    return true;
  }
}
