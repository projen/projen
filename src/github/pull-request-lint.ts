import { GitHub } from ".";
import { Job, JobPermission } from "./workflows-model";
import { Component } from "../component";

/**
 * Options for PullRequestLint
 */
export interface PullRequestLintOptions {
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
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   */
  readonly runsOn?: string[];

  /**
   *  GitHub Base URL for GitHub Enterprise
   *  @see https://github.com/amannn/action-semantic-pull-request
   */
  readonly githubBaseUrl?: string;
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
}

/**
 * Configure validations to run on GitHub pull requests.
 * Only generates a file if at least one linter is configured.
 */
export class PullRequestLint extends Component {
  constructor(github: GitHub, options: PullRequestLintOptions = {}) {
    super(github.project);

    // should only create a workflow if one or more linters are enabled
    if (options.semanticTitle ?? true) {
      const opts = options.semanticTitleOptions ?? {};
      const types = opts.types ?? ["feat", "fix", "chore"];
      const githubBaseUrl = options.githubBaseUrl ?? "${{ github.action_url }}";

      const validateJob: Job = {
        name: "Validate PR title",
        runsOn: options.runsOn ?? ["ubuntu-latest"],
        permissions: {
          pullRequests: JobPermission.WRITE,
        },
        steps: [
          {
            uses: "amannn/action-semantic-pull-request@v5.0.2",
            env: {
              GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
            },
            with: {
              types: types.join("\n"),
              requireScope: opts.requireScope ?? false,
              githubBaseUrl: githubBaseUrl,
            },
          },
        ],
      };

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
      });
      workflow.addJobs({ validate: validateJob });
    }
  }
}
