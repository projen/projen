import { GitHub, PullRequestTemplate } from ".";
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
    private readonly options: PullRequestLintOptions = {}
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
    });

    if (checkSemanticTitle) {
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
            uses: "amannn/action-semantic-pull-request@v5.0.2",
            env: {
              GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
            },
            with: {
              types: types.join("\n"),
              requireScope: opts.requireScope ?? false,
              githubBaseUrl: "${{ github.api_url }}",
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

      const conditions: string[] = [
        ...labels.map(
          (l) => `contains(github.event.pull_request.labels.*.name, '${l}')`
        ),
        ...users.map((u) => `github.event.pull_request.user.login == '${u}'`),
      ];

      const script = (core: any) => {
        const actual = process.env.PR_BODY!.replace(/\r?\n/g, "\n");
        const expected = process.env.EXPECTED!.replace(/\r?\n/g, "\n");
        if (!actual.includes(expected)) {
          console.log("%j", actual);
          console.log("%j", expected);
          core.setFailed(`${process.env.HELP}: ${process.env.expected}`);
        }
      };

      const helpMessage =
        "Contributor statement missing from PR description. Please include the following text in the PR description";
      const contributorStatement: Job = {
        name: "Require Contributor Statement",
        runsOn: options.runsOn ?? ["ubuntu-latest"],
        permissions: {
          pullRequests: JobPermission.READ,
        },
        if: conditions.length ? `!(${conditions.join(" || ")})` : undefined,
        env: {
          PR_BODY: "${{ github.event.pull_request.body }}",
          EXPECTED: options.contributorStatement,
          HELP: helpMessage,
        },
        steps: [
          {
            uses: "actions/github-script@v6",
            with: {
              script: fnBody(script),
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

/**
 * Helper to generate a JS script as string from a function object
 * @returns A prettified string of the function's body
 */
function fnBody(fn: (...args: any[]) => any) {
  const def = fn.toString().replace(/\r?\n/g, "\n");
  const body = def
    .substring(def.indexOf("{") + 1, def.lastIndexOf("}"))
    .split("\n");
  const minIndentation = Math.min(
    ...body
      .filter((l) => l.trim()) // ignore empty lines
      .map((l) => l.search(/\S|$/))
  );

  return body
    .map((l) => l.replace(" ".repeat(minIndentation), ""))
    .join("\n")
    .trim();
}
