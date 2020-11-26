import { spawnSync } from 'child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join, resolve } from 'path';
import * as chalk from 'chalk';
import { PROJEN_DIR } from '../common';
import { Component } from '../component';
import { JsonFile } from '../json';
import { Project } from '../project';
import { StartEntryCategory } from '../start';

const FILE_SUFFIX = 'seq.json';

export interface SequenceProps {
  /**
   * The description of this build command.
   * @default - the sequence name
   */
  readonly description?: string;

  /**
   * Category for start menu.
   *
   * @default StartEntryCategory.MISC
   */
  readonly category?: StartEntryCategory;

  /**
   * Shell command to execute as the first command of the sequence.
   * @default - add commands using `seq.shell()` or `seq.run()`
   */
  readonly shell?: string;
}

/**
 * A modeled sequence of shell commands.
 */
export class Sequence extends Component {
  private readonly spec: SequenceSpec;

  /**
   * The name of the sequence.
   */
  public readonly name: string;

  /**
   * The description of the sequence.
   */
  public readonly description: string;

  /**
   * The start menu category of the sequence.
   */
  public readonly category: StartEntryCategory;

  constructor(project: Project, name: string, props: SequenceProps = { }) {
    super(project);

    this.name = name;
    this.description = props.description ?? name;
    this.category = props.category ?? StartEntryCategory.MISC;

    this.spec = {
      name,
      tasks: [],
      description: this.description,
    };

    new JsonFile(project, `${PROJEN_DIR}/${name}.${FILE_SUFFIX}`, {
      obj: this.spec,
      marker: true,
    });

    if (props.shell) {
      this.add(props.shell);
    }
  }

  /**
   * Reset the sequence so it no longer has any commands.
   * @param command the command to add to the sequence after it was cleared.
  */
  public reset(command?: string) {
    while (this.spec.tasks.length) {
      this.spec.tasks.shift();
    }

    if (command) {
      this.add(command);
    }
  }

  /**
   * Executes a shell command
   * @param command Shell command
   */
  public add(command: string) {
    this.addCommands([command]);
  }

  /**
   * Adds a command at the beginning of the sequence.
   * @param command The command to add.
   */
  public prepend(command: string) {
    this.spec.tasks.unshift({
      commands: [command],
    });
  }

  /**
   * Runs another sequence.
   * @param seq The sequences to execute
   */
  public addSequence(seq: Sequence) {
    this.addSequences([seq]);
  }

  /**
   * Adds a build task
   * @param commands The commands to add
   * @param options Task options
   */
  public addCommands(commands: string[], options: TaskOptions = {}) {
    this.spec.tasks.push({
      commands: this.project.renderShellCommands(commands),
      ...options,
    });
  }

  /**
   * Adds another build as a task
   * @param builds
   */
  private addSequences(builds: Sequence[]) {
    for (const t of builds) {
      this.spec.tasks.push({
        sequences: [t.name],
      });
    }
  }
}

export interface TaskOptions {
  readonly sources?: string[];
  readonly artifacts?: string[];

  /**
   * What invalidates the task so it is executed again.
   */
  readonly invalidation?: TaskInvalidation;
}

export interface Task extends TaskOptions {
  readonly commands?: string[];
  readonly sequences?: string[];
}

export enum TaskInvalidation {
  /**
   * Task will always be executed, regardless of the artifact.
   */
  ALWAYS,

  // /**
  //  * Task is only executed if the hash of all files listed in `sources`
  //  * is different from the hash associated with the artifact.
  //  *
  //  * For example, if `sources` is `[ 'file1.txt' ]` and `artifacts` is
  //  * [ `output.foo` ], then a hash will be calculated on `file1.txt` and
  //  * will be stored under `output.foo`
  //  */
  // HASH
}

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
      if (!file.endsWith(FILE_SUFFIX)) {
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

    console.log(`${chalk.magentaBright('-'.repeat(80))}`);

    for (const task of cmd.tasks) {
      if (task.sequences) {
        for (const seq of task.sequences) {
          this.run(cwd, seq);
        }
      }

      for (const script of task.commands ?? []) {
        console.log(`${chalk.magentaBright(cmd.name + ' |')} ${script}`);
        const result = spawnSync(script, { shell: true, stdio: 'inherit', cwd });
        if (result.status !== 0) {
          console.log(chalk.red(`${name} failed in: "${script}" at ${resolve(cwd)}`));
          process.exit(1);
        }
      }
    }
  }

}

export interface SequenceSpec {
  readonly name: string;
  readonly description?: string;
  readonly tasks: Task[];
}