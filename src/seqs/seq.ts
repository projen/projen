import { join } from 'path';
import { PROJEN_DIR } from '../common';
import { Component } from '../component';
import { JsonFile } from '../json';
import { Project } from '../project';
import { StartEntryCategory } from '../start';
import { SequenceSpec, SequenceManifest, SequenceCommandOptions, SequenceCommand } from './spec';

export interface SequenceOptions {
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
   * Defines environment variables for the execution of this sequence.
   * Values in this map will be evaluated in a shell, so you can do stuff like `$(echo "foo")`.
   * @default {}
   */
  readonly env?: { [name: string]: string };
}

export interface SequenceProps extends SequenceOptions {
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
  public static readonly MANIFEST_FILE = join(PROJEN_DIR, 'sequences.json');

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

  private readonly manifest: Sequences;

  private readonly _env: { [name: string]: string };
  private readonly _commands: SequenceCommand[];

  constructor(project: Project, name: string, props: SequenceProps = { }) {
    super(project);

    this.manifest = Sequences.of(project); // get/create

    this.name = name;
    this.description = props.description ?? name;
    this.category = props.category ?? StartEntryCategory.MISC;

    this._env = {};
    this._commands = [];

    this.manifest.addSequenceSpec(name, {
      name,
      env: this._env,
      commands: this._commands,
      description: this.description,
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
    while (this._commands.length) {
      this._commands.shift();
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
    this._commands.unshift({
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
   * Adds an environment variable to this sequence.
   * @param name The name of the variable
   * @param value The value. If the value is surrounded by `$()`, we will
   * evaluate it within a subshell and use the result as the value of the
   * environment variable.
   */
  public env(name: string, value: string) {
    this._env[name] = value;
  }

  /**
   * Adds a build task
   * @param commands The commands to add
   * @param options Task options
   */
  public addCommands(commands: string[], options: SequenceCommandOptions = {}) {
    this._commands.push({
      commands: this.project.renderShellCommands(commands),
      ...options,
    });
  }

  /**
   * Returns a list of all the shell commands that make up this sequence, which
   * can technically be executed as a shell script.
   *
   * Sub-sequences will be expanded to their specific commands.
   */
  public get commands() {
    const result = new Array<string>();
    for (const task of this._commands) {
      result.push(...task.commands ?? []);

      for (const seq of task.sequences ?? []) {
        result.push(`projen ${seq}`);
      }
    }

    return result;
  }

  /**
   * Adds another build as a task
   * @param builds
   */
  private addSequences(builds: Sequence[]) {
    for (const t of builds) {
      this._commands.push({
        sequences: [t.name],
      });
    }
  }
}

class Sequences extends Component {
  public static of(project: Project): Sequences {
    let found = project.components.find(c => c instanceof Sequences) as Sequences | undefined;
    if (!found) {
      found = new Sequences(project);
    }
    return found;
  }

  private readonly seqs: { [name: string]: SequenceSpec };
  private readonly env: { [name: string]: string };

  constructor(project: Project) {
    super(project);

    this.seqs = {};
    this.env = {};

    new JsonFile(project, Sequence.MANIFEST_FILE, {
      marker: true,
      obj: {
        seqs: this.seqs,
        env: this.env,
      } as SequenceManifest,
    });
  }

  public addSequenceSpec(name: string, spec: SequenceSpec) {
    if (name in this.seqs) {
      throw new Error(`duplicate sequence "${name}"`);
    }

    this.seqs[name] = spec;
  }

  /**
   * Adds global environment to be included in all sequences of this project.
   * @param name
   * @param value
   */
  public addEnv(name: string, value: string) {
    this.env[name] = value;
  }
}

