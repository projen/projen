import { Task } from '../tasks';

export interface IPythonEnv {
  readonly activateTask: Task;
  readonly deactivateTask: Task;
}
