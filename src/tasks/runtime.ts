import { spawnSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import * as chalk from 'chalk';
import { TaskManifest, TaskSpec } from './model';
import { Task } from './task';

/**
 * The runtime component of the tasks engine.
 */
export class TaskRuntime {
  public readonly manifest: TaskManifest;

  /**
   * The root directory of the project and the cwd for executing tasks.
   */
  public readonly rootdir: string;

  constructor(rootdir: string) {
    this.rootdir = rootdir;
    const filePath = join(rootdir, Task.MANIFEST_FILE);
    this.manifest = existsSync(filePath)
      ? JSON.parse(readFileSync(filePath, 'utf-8'))
      : { tasks: { } };
  }

  public find(name: string): TaskSpec | undefined {
    if (!this.manifest.tasks) { return undefined; }
    return this.manifest.tasks[name];
  }

  public run(name: string) {
    const cmd = this.find(name);
    if (!cmd) {
      throw new Error(`cannot find command ${cmd}`);
    }

    // evaluating environment
    const cwd = this.rootdir;
    const env = this.renderRuntimeEnvironment(cmd, cwd);

    let firstCommandInSequence = true;

    for (const task of cmd.steps ?? []) {
      if (task.subtask) {
        this.run(task.subtask);
      }

      if (task.shell) {
        const shell = task.shell;

        if (firstCommandInSequence) {
          console.log(`${chalk.magentaBright('-'.repeat(80))}`);
          firstCommandInSequence = false;
        }

        console.log(`${chalk.magentaBright(cmd.name + ' |')} ${shell}`);
        const result = spawnSync(shell, { cwd, shell: true, stdio: 'inherit', env });
        if (result.status !== 0) {
          console.log(chalk.red(`${name} failed in: "${shell}" at ${resolve(cwd)}`));
          process.exit(1);
        }
      }
    }
  }


  private renderRuntimeEnvironment(cmd: TaskSpec, cwd: string) {
    const env: { [name: string]: string | undefined } = {
      ...process.env,
    };

    for (const [key, value] of Object.entries(cmd.env ?? {})) {
      if (value.startsWith('$(') && value.endsWith(')')) {
        const query = value.substring(2, value.length - 1);
        const result = spawnSync(query, { cwd, shell: true });
        if (result.status !== 0) {
          throw new Error(`unable to evaluate environment variable ${key}=${value}: ${result.stderr.toString() ?? 'unknown error'}`);
        }
        env[key] = result.stdout.toString('utf-8').trim();
      } else {
        env[key] = value;
      }

    }
    return env;
  }
}

