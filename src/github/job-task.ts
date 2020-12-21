import { Task, TaskOptions, Tasks, TaskStepOptions } from '../tasks';

export interface JobTaskOptions extends TaskOptions {

}

export class JobTask extends Task {
  constructor(tasks: Tasks, name: string, options: JobTaskOptions) {
    super(tasks, name, options);


  }

  public action(uses: string, options: ActionOptions) {

  }

}

export interface ActionOptions extends TaskStepOptions {
  readonly with: { [name: string]: string };
}