import { IConstruct } from "constructs";
import { AutoApprove } from "./auto-approve";
import { GitHub } from "./github";
import { GithubWorkflow } from "./workflows";
import { Component } from "../component";
import { JsonFile } from "../json";
import { Release } from "../release";

export interface PullRequestBackportOptions {
  /**
   * The name of the workflow.
   *
   * @default "backport"
   */
  readonly workflowName?: string;

  /**
   * Should this created Backport PRs with conflicts.
   *
   * Conflicts will have to be resolved manually, but a PR is always created.
   * Set to `false` to prevent the backport PR from being created if there are conflicts.
   *
   * @default true
   */
  readonly createWithConflicts?: boolean;

  /**
   * The labels added to the created backport PR.
   *
   * @default ["backport"]
   */
  readonly backportPRLabels?: string[];

  /**
   * The prefix used to name backport branches.
   *
   * Make sure to include a separator at the end like `/` or `_`.
   *
   * @default "backport/"
   */
  readonly backportBranchNamePrefix?: string;

  /**
   * Automatically approve backport PRs if the 'auto approve' workflow is available.
   *
   * @default true
   */
  readonly autoApproveBackport?: boolean;

  /**
   * List of branches that can be a target for backports
   *
   * @default - allow backports to all release branches
   */
  readonly branches?: string[];

  /**
   * The prefix used to detect PRs that should be backported.
   *
   * @default "backport-to-"
   */
  readonly labelPrefix?: string;
}

export class PullRequestBackport extends Component {
  public readonly file: JsonFile;
  public readonly workflow: GithubWorkflow;

  public constructor(
    scope: IConstruct,
    options: PullRequestBackportOptions = {}
  ) {
    super(scope);

    const workflowEngine = GitHub.of(this.project);
    if (!workflowEngine) {
      throw new Error(
        `Cannot add ${
          new.target.name
        } to project without GitHub enabled. Please enable GitHub for this project.`
      );
    }

    const branches =
      options.branches ?? Release.of(this.project as any)?.branches ?? [];
    if (branches.length === 0) {
      this.project.logger.warn(
        "PullRequestBackport could not find any target branches. Backports will not be available. Please add release branches or configure `branches` manually."
      );
    }

    const targetPrLabelsRaw = options.backportPRLabels ?? ["backport"];
    const targetPrLabels = [...targetPrLabelsRaw];

    const shouldAutoApprove = options.autoApproveBackport ?? true;
    if (shouldAutoApprove) {
      const autoApprove = this.project.components.find(
        (c): c is AutoApprove => c instanceof AutoApprove
      );
      if (autoApprove?.label) {
        targetPrLabels.push(autoApprove.label);
      }
    }

    const backportBranchNamePrefix =
      options.backportBranchNamePrefix ?? "backport/";
    const labelPrefix = options.labelPrefix ?? "backport-to-";

    // Configuration
    this.file = new JsonFile(this, ".backportrc.json", {
      obj: {
        commitConflicts: options.createWithConflicts ?? true,
        targetPRLabels: targetPrLabels,
        backportBranchName: `${backportBranchNamePrefix}{{targetBranch}}-{{refValues}}`,
        prTitle:
          "{{sourcePullRequest.title}} (backport #{{sourcePullRequest.number}})",
        targetBranchChoices: branches,
      },
      // File needs to be available to the GitHub Workflow
      committed: true,
    });
    this.project.addPackageIgnore(this.file.path);

    // Workflow
    this.workflow = new GithubWorkflow(
      workflowEngine,
      options.workflowName ?? "backport"
    );
    this.workflow.on({
      pullRequestTarget: {
        types: ["labeled", "unlabeled", "closed"],
      },
    });

    // condition to detect if the PR is a backport PR
    // we prefer to match the PR using labels, but will fallback to matching the branch name prefix
    const branchCondition = `startsWith(github.head_ref, '${backportBranchNamePrefix}')`;
    const labelConditions: string[] = targetPrLabelsRaw.map(
      (label) => `contains(github.event.pull_request.labels.*.name, '${label}')`
    );
    const isBackportPr = labelConditions.length
      ? `(${labelConditions.join(" && ")})`
      : `${branchCondition})`;

    const checkStep = "check_labels";
    const checkOutput = "matched";
    const labelPrefixEscaped = labelPrefix.replace(/"/g, '\\"');

    this.workflow.addJob("backport", {
      name: "Backport PR",
      runsOn: ["ubuntu-latest"],
      permissions: {},
      // Only ever run this job if the PR is merged and not a backport PR itself
      if: `github.event.pull_request.merged == true && !${isBackportPr}`,
      steps: [
        ...workflowEngine.projenCredentials.setupSteps,
        // We need a custom step to check if the PR has any of the labels that indicate that the PR should be backported.
        // This is not currently possible with GH Actions expression by itself, so we use a bash script.
        {
          id: checkStep,
          name: "Check for backport labels",
          shell: "bash",
          run: [
            "labels='${{ toJSON(github.event.pull_request.labels.*.name) }}'",
            `matched=$(echo $labels | jq '.|map(select(startswith("${labelPrefixEscaped}"))) | length')`,
            `echo "${checkOutput}=$matched"`,
            `echo "${checkOutput}=$matched" >> $GITHUB_OUTPUT`,
          ].join("\n"),
        },
        {
          name: "Backport Action",
          uses: "sqren/backport-github-action@v9.5.1",
          // only run this step if we have found matching labels in the previous step
          // this is to prevent workflow failures because the action fails when pre-conditions are not met
          // and causes any PR to be marked with a red X, leading to error blindness.
          if: `fromJSON(steps.${checkStep}.outputs.${checkOutput}) > 0`,
          with: {
            github_token: workflowEngine.projenCredentials.tokenRef,
            auto_backport_label_prefix: labelPrefix,
          },
        },
      ],
    });
  }
}
