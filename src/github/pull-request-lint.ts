import type { GitHub, GithubWorkflow } from ".";
import { PullRequestTemplate } from ".";
import { ActionRefs } from "./actions.const";
import type {
  Job,
  PullRequestOptions,
  PullRequestTargetOptions,
} from "./workflows-model";
import { JobPermission } from "./workflows-model";
import { Component } from "../component";
import type { RunsOnOptions } from "../runner-options";

/**
 * The pull request event that triggers the pull request lint workflow.
 */
export enum PullRequestLintTrigger {
  /**
   * Run in the context of the base branch, with access to secrets and a read/write token.
   */
  PULL_REQUEST_TARGET = "pull_request_target",

  /**
   * Run in the context of the merge commit, with a read-only token for pull requests from forks.
   */
  PULL_REQUEST = "pull_request",
}

/**
 * Options for PullRequestLint
 */
export interface PullRequestLintOptions extends RunsOnOptions {
  /**
   * The pull request event that triggers the workflow.
   *
   * @default PullRequestLintTrigger.PULL_REQUEST_TARGET
   */
  readonly trigger?: PullRequestLintTrigger;

  /**
   * Add a job that combines the results of all checks into a single status check.
   *
   * Use this job as the required status check, so it does not need updating when checks are added or removed.
   *
   * @default true
   */
  readonly consolidatedStatusCheck?: boolean;

  /**
   * Validate that pull request titles follow Conventional Commits.
   *
   * @default true
   * @see https://www.conventionalcommits.org/
   */
  readonly semanticTitle?: boolean;

  /**
   * Options for validating the conventional commit title linter.
   * @default - title must start with "feat", "fix", or "chore"
   */
  readonly semanticTitleOptions?: SemanticTitleOptions;

  /**
   * Require a contributor statement to be included in the PR description.
   * For example confirming that the contribution has been made by the contributor and complies with the project's license.
   *
   * Appends the statement to the end of the Pull Request template.
   *
   * @default - no contributor statement is required
   */
  readonly contributorStatement?: string;

  /**
   * Options for requiring a contributor statement on Pull Requests
   * @default - none
   */
  readonly contributorStatementOptions?: ContributorStatementOptions;
}

/**
 * Options for linting that PR titles follow Conventional Commits.
 * @see https://www.conventionalcommits.org/
 */
export interface SemanticTitleOptions {
  /**
   * Configure a list of commit types that are allowed.
   * @default ["feat", "fix", "chore"]
   */
  readonly types?: string[];

  /**
   * Configure that a scope must always be provided.
   * e.g. feat(ui), fix(core)
   * @default false
   */
  readonly requireScope?: boolean;

  /**
   * Configure which scopes are allowed (newline-delimited).
   * These are regex patterns auto-wrapped in `^ $`.
   *
   * @default - all scopes allowed
   */
  readonly scopes?: string[];
}

/**
 * Options for requiring a contributor statement on Pull Requests
 */
export interface ContributorStatementOptions {
  /**
   * Pull requests from these GitHub users are exempted from a contributor statement.
   * @default - no users are exempted
   */
  readonly exemptUsers?: string[];
  /**
   * Pull requests with one of these labels are exempted from a contributor statement.
   * @default - no labels are excluded
   */
  readonly exemptLabels?: string[];
}

const CONSOLIDATED_JOB_ID = "pull-request-lint";

// Checks can only be evaluated in a pull request context.
// Skipping them in merge groups lets them be required status checks.
const PR_CHECK =
  "(github.event_name == 'pull_request' || github.event_name == 'pull_request_target')";

/**
 * Configure validations to run on GitHub pull requests.
 * Only generates a file if at least one check is configured.
 */
export class PullRequestLint extends Component {
  private workflow?: GithubWorkflow;
  private readonly checkIds: string[] = [];

  constructor(
    private readonly github: GitHub,
    private readonly options: PullRequestLintOptions = {},
  ) {
    super(github.project);

    if (options.semanticTitle ?? true) {
      const opts = options.semanticTitleOptions ?? {};
      const types = opts.types ?? ["feat", "fix", "chore"];

      this.addCheck("validate", {
        name: "Validate PR title",
        if: PR_CHECK,
        ...github.runsOnConfig(options),
        permissions: {
          pullRequests: JobPermission.READ,
        },
        steps: [
          {
            id: "validate-pr-title",
            uses: ActionRefs.AMANNN_ACTION_SEMANTIC_PULL_REQUEST,
            env: {
              GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
            },
            with: {
              types: types.join("\n"),
              ...(opts.scopes ? { scopes: opts.scopes.join("\n") } : {}),
              requireScope: opts.requireScope ?? false,
            },
          },
        ],
      });
    }

    if (options.contributorStatement) {
      const opts = options.contributorStatementOptions ?? {};
      const users = opts.exemptUsers ?? [];
      const labels = opts.exemptLabels ?? [];

      const conditions = [PR_CHECK];

      const exclusions: string[] = [
        ...labels.map(
          (l) => `contains(github.event.pull_request.labels.*.name, '${l}')`,
        ),
        ...users.map((u) => `github.event.pull_request.user.login == '${u}'`),
      ];

      if (exclusions.length) {
        conditions.push(`!(${exclusions.join(" || ")})`);
      }

      const scriptBody = [
        'const actual = process.env.PR_BODY.replace(/\\r?\\n/g, "\\n");',
        'const expected = process.env.EXPECTED.replace(/\\r?\\n/g, "\\n");',
        "if (!actual.includes(expected)) {",
        '    console.log("%j", actual);',
        '    console.log("%j", expected);',
        "    core.setFailed(`${process.env.HELP}: ${expected}`);",
        "}",
      ].join("\n");

      const helpMessage =
        "Contributor statement missing from PR description. Please include the following text in the PR description";

      this.addCheck("contributorStatement", {
        name: "Require Contributor Statement",
        ...github.runsOnConfig(options),
        permissions: {
          pullRequests: JobPermission.READ,
        },
        if: conditions.join(" && "),
        env: {
          PR_BODY: "${{ github.event.pull_request.body }}",
          EXPECTED: options.contributorStatement,
          HELP: helpMessage,
        },
        steps: [
          {
            uses: ActionRefs.ACTIONS_GITHUB_SCRIPT,
            with: {
              script: scriptBody,
            },
          },
        ],
      });
    }
  }

  /**
   * Adds a job to the pull request lint workflow that is part of the consolidated status check.
   *
   * The job also runs for merge groups. Skip it there with a job condition, a skipped job counts as passing.
   *
   * @param id The job ID, unique within the workflow
   * @param job The job definition
   */
  public addCheck(id: string, job: Job): void {
    if (id === CONSOLIDATED_JOB_ID) {
      throw new Error(
        `The check ID '${CONSOLIDATED_JOB_ID}' is reserved for the consolidated status check. Choose a different ID.`,
      );
    }
    this.ensureWorkflow().addJobs({ [id]: job });
    this.checkIds.push(id);
  }

  public preSynthesize(): void {
    if (this.workflow && (this.options.consolidatedStatusCheck ?? true)) {
      this.workflow.addJobs({
        [CONSOLIDATED_JOB_ID]: this.renderConsolidatedJob(),
      });
    }

    if (this.options.contributorStatement) {
      // Append to PR template in preSynthesize so it's always at the end of the file
      const prTemplate =
        PullRequestTemplate.of(this.project) ??
        this.github.addPullRequestTemplate();
      prTemplate?.addLine("");
      prTemplate?.addLine("---");
      prTemplate?.addLine(this.options.contributorStatement);
      prTemplate?.addLine("");
    }
  }

  private ensureWorkflow(): GithubWorkflow {
    if (this.workflow) {
      return this.workflow;
    }

    const pullRequestTypes: PullRequestOptions & PullRequestTargetOptions = {
      types: [
        "labeled",
        "opened",
        "synchronize",
        "reopened",
        "ready_for_review",
        "edited",
      ],
    };
    const trigger =
      this.options.trigger ?? PullRequestLintTrigger.PULL_REQUEST_TARGET;

    this.workflow = this.github.addWorkflow("pull-request-lint");
    this.workflow.on({
      ...(trigger === PullRequestLintTrigger.PULL_REQUEST
        ? { pullRequest: pullRequestTypes }
        : { pullRequestTarget: pullRequestTypes }),
      // run on merge group, but use a condition later to always succeed
      // needed so the workflow can be a required status check
      mergeGroup: {},
    });

    return this.workflow;
  }

  private renderConsolidatedJob(): Job {
    const ids = this.checkIds;
    return {
      ...this.github.runsOnConfig(this.options),
      permissions: {},
      needs: ids,
      if: "always()",
      steps: [
        ...ids.map((id) => ({
          name: `${id} result`,
          run: `echo \${{ needs.${id}.result }}`,
        })),
        {
          // Checks are skipped in merge groups and for exempt pull requests, which counts as passing.
          if: `\${{ ${ids
            .map(
              (id) =>
                `(needs.${id}.result != 'success' && needs.${id}.result != 'skipped')`,
            )
            .join(" || ")} }}`,
          name: "Set status based on pull request checks",
          run: "exit 1",
        },
      ],
    };
  }
}
