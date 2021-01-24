import { Task, TaskOptions } from '../tasks';

export interface IPythonEnv {
  addEnvTask(name: string, props: TaskOptions): Task;
}
