import type { GitHub } from ".";
import { PullRequestTemplate } from ".";
import { GitHubActions } from "./actions.const";
import type { Job } from "./workflows-model";
import { JobPermission } from "./workflows-model";
import { Component } from "../component";
import type { RunsOnOptions } from "../runner-options";

/**
 * Options for PullRequestLint
 */
export interface PullRequestLintOptions extends RunsOnOptions {
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

/**
 * Configure validations to run on GitHub pull requests.
 * Only generates a file if at least one linter is configured.
 */
export class PullRequestLint extends Component {
  constructor(
    private readonly github: GitHub,
    private readonly options: PullRequestLintOptions = {},
  ) {
    super(github.project);

    const checkSemanticTitle = options.semanticTitle ?? true;
    const checkContributorStatement = Boolean(options.contributorStatement);

    // should only create a workflow if one or more linters are enabled
    if (!checkSemanticTitle && !checkContributorStatement) {
      return;
    }

    const workflow = github.addWorkflow("pull-request-lint");
    workflow.on({
      pullRequestTarget: {
        types: [
          "labeled",
          "opened",
          "synchronize",
          "reopened",
          "ready_for_review",
          "edited",
        ],
      },
      // run on merge group, but use a condition later to always succeed
      // needed so the workflow can be a required status check
      mergeGroup: {},
    });

    // All checks are run against the PR and can only be evaluated within a PR context
    // Needed so jobs can be set as required and will run successfully on merge group checks.
    const prCheck =
      "(github.event_name == 'pull_request' || github.event_name == 'pull_request_target')";

    if (checkSemanticTitle) {
      const opts = options.semanticTitleOptions ?? {};
      const types = opts.types ?? ["feat", "fix", "chore"];

      const validateJob: Job = {
        name: "Validate PR title",
        if: prCheck,
        ...github.runsOnConfig(options),
        permissions: {
          pullRequests: JobPermission.WRITE,
        },
        steps: [
          {
            id: "validate-pr-title",
            uses: GitHubActions.AMANNN_ACTION_SEMANTIC_PULL_REQUEST,
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
      };

      workflow.addJobs({ validate: validateJob });
    }

    if (options.contributorStatement) {
      const opts = options.contributorStatementOptions ?? {};
      const users = opts.exemptUsers ?? [];
      const labels = opts.exemptLabels ?? [];

      const conditions = [prCheck];

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
      const contributorStatement: Job = {
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
            uses: GitHubActions.ACTIONS_GITHUB_SCRIPT,
            with: {
              script: scriptBody,
            },
          },
        ],
      };

      workflow.addJobs({ contributorStatement });
    }
  }

  public preSynthesize(): void {
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
}
