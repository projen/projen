import { join } from 'path';
import { PROJEN_DIR } from '../common';
import { Component } from '../component';
import { JsonFile } from '../json';
import { Project } from '../project';
import { StartEntryCategory } from '../start';
import { TaskSpec, TaskManifest, TaskStep } from './model';

export interface TaskOptions {
  /**
   * The description of this build command.
   * @default - the task name
   */
  readonly description?: string;

  /**
   * Category for start menu.
   *
   * @default StartEntryCategory.MISC
   */
  readonly category?: StartEntryCategory;

  /**
   * Defines environment variables for the execution of this task.
   * Values in this map will be evaluated in a shell, so you can do stuff like `$(echo "foo")`.
   * @default {}
   */
  readonly env?: { [name: string]: string };
}

export interface TaskProps extends TaskOptions {
  /**
   * Shell command to execute as the first command of the task.
   * @default - add commands using `task.add()` or `task.addSubtask()`
   */
  readonly exec?: string;
}

/**
 * A task that can be performed on the project. Modeled as a series of shell
 * commands and subtasks.
 */
export class Task extends Component {
  /**
   * The manifest file where all tasks are declared.
   */
  public static readonly MANIFEST_FILE = join(PROJEN_DIR, 'tasks.json');

  /**
   * Task name.
   */
  public readonly name: string;

  /**
   * The description of the task.
   */
  public readonly description: string;

  /**
   * The start menu category of the task.
   */
  public readonly category: StartEntryCategory;

  private readonly manifest: ProjectTasks;

  private readonly _steps: TaskStep[];
  private readonly _env: { [name: string]: string };

  constructor(project: Project, name: string, props: TaskProps = { }) {
    super(project);

    this.manifest = ProjectTasks.of(project); // get/create

    this.name = name;
    this.description = props.description ?? name;
    this.category = props.category ?? StartEntryCategory.MISC;

    this._env = {};
    this._steps = [];

    this.manifest.addTaskSpec(name, {
      name,
      env: this._env,
      steps: this._steps,
      description: this.description,
    });

    if (props.exec) {
      this.exec(props.exec);
    }
  }

  /**
   * Reset the task so it no longer has any commands.
   * @param command the first command to add to the task after it was cleared.
  */
  public reset(command?: string) {
    while (this._steps.length) {
      this._steps.shift();
    }

    if (command) {
      this.exec(command);
    }
  }

  /**
   * Executes a shell command
   * @param shell Shell command
   */
  public exec(shell: string) {
    this._steps.push({
      exec: this.project.renderShellCommand(shell),
    });
  }

  /**
   * Adds a command at the beginning of the task.
   * @param shell The command to add.
   */
  public prepend(shell: string) {
    this._steps.unshift({
      exec: shell,
    });
  }

  /**
   * Runs a sub-task.
   * @param subtask The subtask to execute.
   */
  public subtask(subtask: Task) {
    this._steps.push({ subtask: subtask.name });
  }

  /**
   * Adds an environment variable to this task.
   * @param name The name of the variable
   * @param value The value. If the value is surrounded by `$()`, we will
   * evaluate it within a subshell and use the result as the value of the
   * environment variable.
   */
  public env(name: string, value: string) {
    this._env[name] = value;
  }

  /**
   * Returns a list of all the shell commands that make up this subtask, which
   * can technically be executed as a shell script.
   *
   * Sub-tasks will be expanded to their specific commands.
   */
  public get commands() {
    const result = new Array<string>();
    for (const task of this._steps) {
      if (task.exec) {
        result.push(task.exec);
      }

      for (const sub of task.subtask ?? []) {
        result.push(`projen ${sub}`);
      }
    }

    return result;
  }
}

class ProjectTasks extends Component {
  public static of(project: Project): ProjectTasks {
    let found = project.components.find(c => c instanceof ProjectTasks) as ProjectTasks | undefined;
    if (!found) {
      found = new ProjectTasks(project);
    }
    return found;
  }

  private readonly tasks: { [name: string]: TaskSpec };
  private readonly env: { [name: string]: string };

  constructor(project: Project) {
    super(project);

    this.tasks = {};
    this.env = {};

    new JsonFile(project, Task.MANIFEST_FILE, {
      marker: true,
      omitEmpty: true,
      obj: {
        tasks: this.tasks,
        env: this.env,
      } as TaskManifest,
    });
  }

  public addTaskSpec(name: string, spec: TaskSpec) {
    if (name in this.tasks) {
      throw new Error(`duplicate task "${name}"`);
    }

    this.tasks[name] = spec;
    return spec;
  }

  /**
   * Adds global environment to be included in all tasks of this project.
   * @param name
   * @param value
   */
  public addEnv(name: string, value: string) {
    this.env[name] = value;
  }
}

