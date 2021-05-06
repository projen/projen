import { Dependency } from "../deps";
import { Task } from "../tasks";

export interface IPythonDeps {
  /**
   * A task that installs and updates dependencies.
   */
  readonly installTask: Task;

  /**
   * Adds a runtime dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  addDependency(spec: string): void;

  /**
   * Adds a dev dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  addDevDependency(spec: string): void;

  /**
   * Installs dependencies (called during post-synthesis).
   */
  installDependencies(): void;
}

export interface IPackageProvider {
  /**
   * An array of packages (may be dynamically generated).
   */
  readonly packages: Dependency[];
}
