import { DEFAULT_GITHUB_ACTIONS_USER } from "./constants";
import { GitHub } from "./github";
import { CheckoutWith, WorkflowSteps } from "./workflow-steps";
import { GithubWorkflow } from "./workflows";
import {
  ContainerOptions,
  Job,
  JobPermissions,
  JobStep,
  JobStepOutput,
  Triggers,
} from "./workflows-model";
import { GroupRunnerOptions, filteredRunsOnOptions } from "../runner-options";
import { Task } from "../task";

const DEFAULT_JOB_ID = "build";

export interface TaskWorkflowJobOptions {
  /**
   * @default - default image
   */
  readonly container?: ContainerOptions;

  /**
   * Adds an 'if' condition to the workflow.
   */
  readonly condition?: string;

  /**
   * A directory name which contains artifacts to be uploaded (e.g. `dist`).
   * If this is set, the contents of this directory will be uploaded as an
   * artifact at the end of the workflow run, even if other steps fail.
   *
   * @default - not set
   */
  readonly artifactsDirectory?: string;

  /**
   * Initial steps to run before the source code checkout.
   *
   * @default - not set
   */
  readonly preCheckoutSteps?: JobStep[];

  /**
   * Override for the `with` property of the source code checkout step.
   *
   * @default - not set
   */
  readonly checkoutWith?: CheckoutWith;

  /**
   * Steps to run before the main build step.
   *
   * @default - not set
   */
  readonly preBuildSteps?: JobStep[];

  /**
   * The main task to be executed.
   */
  readonly task: Task;

  /**
   * Actions to run after the main build step.
   *
   * @default - not set
   */
  readonly postBuildSteps?: JobStep[];

  /**
   * Workflow environment variables.
   * @default {}
   */
  readonly env?: Record<string, string>;

  /**
   * Permissions for the build job.
   */
  readonly permissions: JobPermissions;

  /**
   * Mapping of job output names to values/expressions.
   *
   * @default {}
   */
  readonly outputs?: { [name: string]: JobStepOutput };

  /**
   * The git identity to use in this workflow.
   */
  readonly gitIdentity?: GitIdentity;

  /**
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   * @description Defines a target Runner by labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly runsOn?: string[];

  /**
   * Github Runner Group selection options
   * @description Defines a target Runner Group by name and/or labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly runsOnGroup?: GroupRunnerOptions;

  /**
   * Whether to download files from Git LFS for this workflow
   *
   * @default - Use the setting on the corresponding GitHub project
   */
  readonly downloadLfs?: boolean;
}

export interface TaskWorkflowOptions extends TaskWorkflowJobOptions {
  /**
   * The workflow name.
   */
  readonly name: string;

  /**
   * The primary job id.
   * @default "build"
   */
  readonly jobId?: string;

  /**
   * The triggers for the workflow.
   *
   * @default - by default workflows can only be triggered by manually.
   */
  readonly triggers?: Triggers;
}

/**
 * A GitHub workflow for common build tasks within a project.
 */
export class TaskWorkflow extends GithubWorkflow {
  /**
   * Allows for more flexible construction of a Workflow that is similar, but not identical, to the TaskWorkflow.
   *
   * @param github GitHub containing the information about the project being released (source project).
   * @param options TaskWorkflowJobOptions
   * @returns The job that would be created as part of the TaskWorkflow
   */
  public static buildJob(github: GitHub, options: TaskWorkflowJobOptions): Job {
    const preCheckoutSteps = options.preCheckoutSteps ?? [];

    const checkoutWith: { lfs?: boolean } = {};
    if (options.downloadLfs ?? github.downloadLfs) {
      checkoutWith.lfs = true;
    }
    // 'checkoutWith' can override 'lfs'
    Object.assign(checkoutWith, options.checkoutWith ?? {});

    const preBuildSteps = options.preBuildSteps ?? [];
    const postBuildSteps = options.postBuildSteps ?? [];
    const gitIdentity = options.gitIdentity ?? DEFAULT_GITHUB_ACTIONS_USER;

    if (options.artifactsDirectory) {
      postBuildSteps.push(
        WorkflowSteps.uploadArtifact({
          // Setting to always will ensure that this step will run even if
          // the previous ones have failed (e.g. coverage report, internal logs, etc)
          if: "always()",
          with: {
            name: options.artifactsDirectory,
            path: options.artifactsDirectory,
          },
        })
      );
    }

    return {
      ...filteredRunsOnOptions(options.runsOn, options.runsOnGroup),
      container: options.container,
      env: options.env,
      permissions: options.permissions,
      if: options.condition,
      outputs: options.outputs,
      steps: [
        ...preCheckoutSteps,

        // check out sources.
        WorkflowSteps.checkout({ with: checkoutWith }),

        // sets git identity so we can push later
        WorkflowSteps.setupGitIdentity({ gitIdentity }),

        ...preBuildSteps,

        // run the main build task
        {
          name: options.task.name,
          run: github.project.runTaskCommand(options.task),
        },

        ...postBuildSteps,
      ],
    };
  }

  public readonly jobId: string;
  public readonly artifactsDirectory?: string;

  constructor(github: GitHub, options: TaskWorkflowOptions) {
    super(github, options.name);
    this.jobId = options.jobId ?? DEFAULT_JOB_ID;
    this.artifactsDirectory = options.artifactsDirectory;

    if (options.triggers) {
      if (options.triggers.issueComment) {
        // https://docs.github.com/en/actions/learn-github-actions/security-hardening-for-github-actions#potential-impact-of-a-compromised-runner
        throw new Error(
          'Trigger "issueComment" should not be used due to a security concern'
        );
      }

      this.on(options.triggers);
    }

    this.on({
      workflowDispatch: {}, // allow manual triggering
    });

    const job: Job = TaskWorkflow.buildJob(github, options);

    this.addJobs({ [this.jobId]: job });
  }
}

/**
 * Represents the git identity.
 */
export interface GitIdentity {
  /**
   * The name of the user.
   */
  readonly name: string;

  /**
   * The email address of the git user.
   */
  readonly email: string;
}
