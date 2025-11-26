import { Task } from "../task";

export interface IPythonPackaging {
  /**
   * A task that uploads the package to a package repository.
   */
  readonly publishTask: Task;
}
