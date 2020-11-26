import { spawnSync } from 'child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join, resolve } from 'path';
import * as chalk from 'chalk';
import { PROJEN_DIR } from '../common';
import { Sequence } from './seq';
import { SequenceSpec } from './spec';

export class Sequences {

  public readonly all: { [name: string]: SequenceSpec };

  constructor(rootdir: string) {
    const dir = join(rootdir, PROJEN_DIR);

    this.all = {};
    if (!existsSync(dir) || !statSync(dir).isDirectory()) {
      return;
    }

    for (const file of readdirSync(dir)) {
      const filePath = join(dir, file);
      if (!file.endsWith(Sequence.FILE_SUFFIX)) {
        continue;
      }

      const cmd = JSON.parse(readFileSync(filePath, 'utf-8')) as SequenceSpec;
      this.all[cmd.name] = cmd;
    }
  }

  public run(cwd: string, name: string) {
    const cmd = this.all[name];
    if (!cmd) {
      throw new Error(`cannot find command ${cmd}`);
    }

    // evaluating environment
    const env: { [name: string]: string | undefined } = {
      ...process.env,
    };

    console.log(`${chalk.magentaBright('-'.repeat(80))}`);

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

    for (const task of cmd.tasks) {
      if (task.sequences) {
        for (const seq of task.sequences) {
          this.run(cwd, seq);
        }
      }

      for (const script of task.commands ?? []) {
        console.log(`${chalk.magentaBright(cmd.name + ' |')} ${script}`);
        const result = spawnSync(script, { cwd, shell: true, stdio: 'inherit', env });
        if (result.status !== 0) {
          console.log(chalk.red(`${name} failed in: "${script}" at ${resolve(cwd)}`));
          process.exit(1);
        }
      }
    }
  }

}

