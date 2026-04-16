import type { GitHub } from "./github";
import { WorkflowSteps } from "./workflow-steps";
import { JobPermission } from "./workflows-model";
import { Component } from "../component";
import type { GroupRunnerOptions } from "../runner-options";
import { filteredRunsOnOptions } from "../runner-options";

/**
 * Options for the DependencyReview component.
 */
export interface DependencyReviewOptions {
  /**
   * The severity level at which the action will fail.
   *
   * @default - no minimum severity (action default is "low")
   */
  readonly failOnSeverity?: "low" | "moderate" | "high" | "critical";

  /**
   * List of allowed SPDX license identifiers.
   *
   * @default - no license allow-list
   */
  readonly allowLicenses?: string[];

  /**
   * Enable or disable the vulnerability check.
   *
   * @default true
   */
  readonly vulnerabilityCheck?: boolean;

  /**
   * Enable or disable the license check.
   *
   * @default true
   */
  readonly licenseCheck?: boolean;

  /**
   * Scopes of dependencies to fail on.
   *
   * @default - no scopes filter (action default is "runtime")
   */
  readonly failOnScopes?: Array<"runtime" | "development" | "unknown">;

  /**
   * Path to an external configuration file.
   *
   * @default - no external config
   */
  readonly configFile?: string;

  /**
   * GitHub Advisory Database IDs that can be skipped during detection.
   *
   * @default - no advisories are skipped
   */
  readonly allowGhsas?: string[];

  /**
   * Packages to block in a PR (in purl format).
   *
   * @default - no packages are denied
   */
  readonly denyPackages?: string[];

  /**
   * Whether to post a comment summary on the PR.
   *
   * @default "always"
   */
  readonly commentSummaryInPr?: "always" | "on-failure" | "never";

  /**
   * When true, the action will only warn and not fail.
   *
   * @default false
   */
  readonly warnOnly?: boolean;

  /**
   * Show OpenSSF Scorecard scores for dependencies.
   *
   * @default true
   */
  readonly showOpenSSFScorecard?: boolean;

  /**
   * Score threshold for OpenSSF Scorecard warnings.
   *
   * @default 3
   */
  readonly warnOnOpenSSFScorecardLevel?: number;

  /**
   * Github Runner selection labels.
   *
   * @default ["ubuntu-latest"]
   */
  readonly runsOn?: string[];

  /**
   * Github Runner Group selection options.
   */
  readonly runsOnGroup?: GroupRunnerOptions;
}

/**
 * Adds a GitHub workflow that runs the dependency-review-action on pull requests.
 *
 * This action scans pull requests for dependency changes and raises an error
 * if any vulnerabilities or invalid licenses are introduced.
 *
 * @see https://github.com/actions/dependency-review-action
 */
export class DependencyReview extends Component {
  constructor(github: GitHub, options: DependencyReviewOptions = {}) {
    super(github.project);

    const commentSummary = options.commentSummaryInPr ?? "always";

    const workflow = github.addWorkflow("dependency-review");
    workflow.on({
      pullRequest: {},
      workflowDispatch: {},
    });

    workflow.addJobs({
      "dependency-review": {
        ...filteredRunsOnOptions(options.runsOn, options.runsOnGroup),
        permissions: {
          contents: JobPermission.READ,
          ...(commentSummary !== "never"
            ? { pullRequests: JobPermission.WRITE }
            : {}),
        },
        steps: [
          WorkflowSteps.checkout(),
          {
            name: "Dependency Review",
            uses: "actions/dependency-review-action@v4",
            with: {
              "fail-on-severity": options.failOnSeverity,
              "allow-licenses": options.allowLicenses?.join(", "),
              "vulnerability-check": options.vulnerabilityCheck,
              "license-check": options.licenseCheck,
              "fail-on-scopes": options.failOnScopes?.join(", "),
              "config-file": options.configFile,
              "allow-ghsas": options.allowGhsas?.join(", "),
              "deny-packages": options.denyPackages?.join(", "),
              "comment-summary-in-pr": commentSummary,
              "warn-only": options.warnOnly,
              "show-openssf-scorecard": options.showOpenSSFScorecard,
              "warn-on-openssf-scorecard-level":
                options.warnOnOpenSSFScorecardLevel,
            },
          },
        ],
      },
    });
  }
}
