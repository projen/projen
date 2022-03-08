import { Construct } from "constructs";
import { GitHub } from ".";
import { Component } from "../component";
import { Project } from "../project";
import { GithubWorkflow } from "./workflows";
import { Job, JobPermission } from "./workflows-model";

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
  constructor(scope: Construct, options: PullRequestLintOptions = {}) {
    super(scope, "PullRequestLint");

    const github = GitHub.of(Project.ofProject(this));
    if (!github) {
      throw new Error(
        "PullRequestLint can only be added to projects with a GitHub component."
      );
    }

    // should only create a workflow if one or more linters are enabled
    if (options.semanticTitle ?? true) {
      const opts = options.semanticTitleOptions ?? {};
      const types = opts.types ?? ["feat", "fix", "chore"];

      const validateJob: Job = {
        name: "Validate PR title",
        runsOn: options.runsOn ?? ["ubuntu-latest"],
        permissions: {
          pullRequests: JobPermission.WRITE,
        },
        steps: [
          {
            uses: "amannn/action-semantic-pull-request@v3.4.6",
            env: {
              GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
            },
            with: {
              types: types.join("\n"),
              requireScope: opts.requireScope ?? false,
            },
          },
        ],
      };

      const workflow = new GithubWorkflow(this, "pull-request-lint");
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
