import { Task } from '../tasks';

export interface IPythonPackaging {
  /**
   * A task that packages the project for distribution.
   */
  readonly packageTask: Task;

  /**
   * A task that uploads the package to a package package repository.
   */
  readonly uploadTask: Task;
}
