// Shared model for the `GitHubActionsVersions` component and the
// `github/update-github-actions` builtin task: the shape of the JSONC
// manifest and helpers to parse action specs and version refs.

/**
 * A single action entry in the manifest.
 */
export interface ActionsManifestEntry {
  /**
   * The approved version line (e.g. "v7"). Declared in the projenrc
   * (`owner/repo@7`) or resolved and maintained by the update task.
   */
  major?: string;
  /**
   * Whether the major line is declared in the projenrc. Locked majors are
   * never changed by the update task.
   */
  majorLocked?: boolean;
  /**
   * Concrete ref (commit SHA or release tag) within the major line. Written
   * by the update task, never by hand.
   */
  pin?: string;
  /**
   * The human-readable version the pin corresponds to. Present when the pin
   * is not self-describing (i.e. a SHA).
   */
  version?: string;
  /**
   * Whether the pin is an immutable release tag: a release GitHub reports as
   * immutable, meaning the tag cannot be repointed and is as strong a
   * guarantee as a commit SHA. Set from the GitHub API, not by hand.
   */
  isImmutable?: boolean;
}

/**
 * The shape of the github-actions.jsonc manifest.
 */
export interface ActionsManifest {
  /**
   * Map of action name to its entry.
   */
  actions: Record<string, ActionsManifestEntry>;
}

/**
 * A parsed action spec, e.g. `actions/checkout@7`.
 */
export interface ActionSpec {
  /**
   * The action name, e.g. `actions/checkout` or `github/codeql-action/init`.
   */
  readonly name: string;
  /**
   * The normalized major version line (e.g. "v7"), when declared.
   */
  readonly major?: string;
}

const ACTION_NAME_PATTERN = /^[\w.-]+\/[\w.-]+(\/[\w.-]+)*$/;
const MAJOR_PATTERN = /^v?(\d+)$/;

/**
 * Parse an action spec as provided in the projenrc, e.g. `actions/checkout`,
 * `actions/checkout@7` or `actions/checkout@v7`.
 */
export function parseActionSpec(spec: string): ActionSpec {
  const at = spec.indexOf("@");
  const name = at === -1 ? spec : spec.slice(0, at);
  const rawMajor = at === -1 ? undefined : spec.slice(at + 1);

  if (!ACTION_NAME_PATTERN.test(name)) {
    throw new Error(
      `Invalid GitHub Action "${spec}": expected "owner/repo" optionally followed by a major version line, e.g. "actions/checkout@7".`,
    );
  }

  if (rawMajor === undefined) {
    return { name };
  }

  const match = MAJOR_PATTERN.exec(rawMajor);
  if (!match) {
    throw new Error(
      `Invalid version "${rawMajor}" for GitHub Action "${name}": only major version lines may be declared, e.g. "${name}@7". Exact pins are resolved by the "update-github-actions" task.`,
    );
  }

  return { name, major: `v${match[1]}` };
}

/**
 * Extract the numeric major from a ref like "v7" or "v7.0.1".
 */
export function majorNumberOf(ref: string | undefined): number | undefined {
  if (!ref) {
    return undefined;
  }
  const match = /^v(\d+)/.exec(ref);
  return match ? Number(match[1]) : undefined;
}

/**
 * The GitHub repository ("owner/repo") an action lives in. Handles actions
 * in subdirectories, e.g. `github/codeql-action/init`.
 */
export function repoOfAction(action: string): string {
  return action.split("/").slice(0, 2).join("/");
}
