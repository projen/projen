export interface IPythonEnv {
  /**
   * Initializes the virtual environment if it doesn't exist (called during post-synthesis).
   */
  setupEnvironment(): void;
}
