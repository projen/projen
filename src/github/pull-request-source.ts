/**
 * Options for `PullRequestSource.fromBranch`
 */
export interface PullRequestSourceBranchOptions {
  /**
   * The exact branch the pull request comes from.
   *
   * @default - use `branchPrefix`
   */
  readonly branch?: string;

  /**
   * A prefix the branch the pull request comes from must start with.
   *
   * Make sure to include a separator at the end like `/` or `-`.
   *
   * @default - use `branch`
   */
  readonly branchPrefix?: string;

  /**
   * The branches the pull request may target.
   *
   * @default - any target branch
   */
  readonly targetBranches?: string[];

  /**
   * The GitHub usernames that may author the pull request.
   *
   * @default - any author
   */
  readonly authors?: string[];
}

/**
 * Options for `PullRequestSource.fromUsers`
 */
export interface PullRequestSourceUsersOptions {
  /**
   * The GitHub usernames that may author the pull request.
   */
  readonly logins: string[];
}

/**
 * Describes where a pull request comes from.
 *
 * Used to select which pull requests a workflow acts on, e.g. which pull requests are auto-approved.
 */
export class PullRequestSource {
  /**
   * Pull requests from a head branch in this repository.
   *
   * Anyone who can push to the head branch controls the content of the pull request.
   * Protect the matching branches with a ruleset that only allows the intended automation
   * to create, update and delete them.
   */
  public static fromBranch(
    options: PullRequestSourceBranchOptions,
  ): PullRequestSource {
    if (options.branch && options.branchPrefix) {
      throw new Error(
        "Only one of 'branch' or 'branchPrefix' may be specified, not both.",
      );
    }
    if (!options.branch && !options.branchPrefix) {
      throw new Error(
        "PullRequestSource.fromBranch() requires either 'branch' or 'branchPrefix' to be set to a non-empty branch name.",
      );
    }
    requireNotEmpty(
      "targetBranches",
      options.targetBranches,
      "any target branch",
    );
    requireNotEmpty("authors", options.authors, "any author");

    const headRef = "github.event.pull_request.head.ref";
    const conditions = [
      "github.event.pull_request.head.repo.full_name == github.repository",
      options.branch
        ? `${headRef} == ${literal(options.branch)}`
        : `startsWith(${headRef}, ${literal(options.branchPrefix!)})`,
    ];
    if (options.targetBranches) {
      conditions.push(
        anyOf("github.event.pull_request.base.ref", options.targetBranches),
      );
    }
    if (options.authors) {
      conditions.push(
        anyOf("github.event.pull_request.user.login", options.authors),
      );
    }

    return new PullRequestSource(`(${conditions.join(" && ")})`);
  }

  /**
   * Pull requests authored by any of the given users.
   *
   * Anyone with access to the credentials of these users can author a matching pull request.
   */
  public static fromUsers(
    options: PullRequestSourceUsersOptions,
  ): PullRequestSource {
    if (options.logins.length === 0) {
      throw new Error(
        "PullRequestSource.fromUsers() requires at least one GitHub username in 'logins'.",
      );
    }
    return new PullRequestSource(
      anyOf("github.event.pull_request.user.login", options.logins),
    );
  }

  private constructor(private readonly condition: string) {}

  /**
   * A GitHub Actions expression that is true for pull requests from this source.
   *
   * Only valid in workflows triggered by `pull_request` or `pull_request_target` events.
   *
   * @internal
   */
  public _toCondition(): string {
    return this.condition;
  }
}

function requireNotEmpty(
  name: string,
  values: string[] | undefined,
  defaultDescription: string,
) {
  if (values && values.length === 0) {
    throw new Error(
      `'${name}' must not be empty. Omit '${name}' to allow ${defaultDescription}.`,
    );
  }
}

function anyOf(expression: string, values: string[]): string {
  return `(${values.map((v) => `${expression} == ${literal(v)}`).join(" || ")})`;
}

/**
 * Renders a string literal for a GitHub Actions expression.
 */
function literal(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}
