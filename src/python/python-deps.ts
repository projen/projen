export interface IPythonDeps {
  /**
   * Adds a runtime dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  addDependency(spec: string): void;

  /**
   * Adds a test dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  addTestDependency(spec: string): void;

  /**
   * Adds a dev dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  addDevDependency(spec: string): void;
}
