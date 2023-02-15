/**
 * Manage the versions used for GitHub Actions used in steps
 */
export class GitHubActionsProvider {
  private actions = new Map();

  /**
   * Define an override for a given action.
   * Setting an override for a specific action version will only override the exact same action version.
   * To override all usages of an action, do not set version constraint.
   *
   * @example
   * // Force any use of `actions/checkout` to use a specific commit
   * project.github.actions.set("actions/checkout", "actions/checkout@ac59398");
   *
   * // Only replace usage of `v3` with a specific commit
   * project.github.actions.set("actions/checkout@v3", "actions/checkout@ac59398");
   */
  public set(action: string, override: string): void {
    this.actions.set(action, override);
  }

  /**
   * Resolve an action name to the version that should be used,
   * taking into account any overrides.
   */
  public get(action?: string): string | undefined {
    const parts = action?.split("@", 1);
    // return this.actions.get(parts?.[0]) ?? this.actions.get(action) ?? action;
    return this.actions.get(action) ?? this.actions.get(parts?.[0]) ?? action;
  }
}
