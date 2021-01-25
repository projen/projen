export interface IPythonDeps {
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
