import { spawnSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import * as chalk from 'chalk';
import { SequenceManifest, SequenceSpec } from './model';
import { Sequence } from './seq';

export class SequenceRuntime {

  public readonly manifest: SequenceManifest;

  constructor(rootdir: string) {
    const filePath = join(rootdir, Sequence.MANIFEST_FILE);
    this.manifest = existsSync(filePath)
      ? JSON.parse(readFileSync(filePath, 'utf-8'))
      : { seqs: { } };
  }

  public find(name: string): SequenceSpec | undefined {
    if (!this.manifest.seqs) { return undefined; }
    return this.manifest.seqs[name];
  }

  public run(cwd: string, name: string) {
    const cmd = this.find(name);
    if (!cmd) {
      throw new Error(`cannot find command ${cmd}`);
    }

    // evaluating environment
    const env = this.renderRuntimeEnvironment(cmd, cwd);

    let firstCommandInSequence = true;

    for (const task of cmd.commands ?? []) {
      if (task.sequences) {
        for (const seq of task.sequences) {
          this.run(cwd, seq);
        }
      }

      for (const script of task.commands ?? []) {
        if (firstCommandInSequence) {
          console.log(`${chalk.magentaBright('-'.repeat(80))}`);
          firstCommandInSequence = false;
        }

        console.log(`${chalk.magentaBright(cmd.name + ' |')} ${script}`);
        const result = spawnSync(script, { cwd, shell: true, stdio: 'inherit', env });
        if (result.status !== 0) {
          console.log(chalk.red(`${name} failed in: "${script}" at ${resolve(cwd)}`));
          process.exit(1);
        }
      }
    }
  }


  private renderRuntimeEnvironment(cmd: SequenceSpec, cwd: string) {
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

