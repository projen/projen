import { IConstruct } from "constructs";
import { DEFAULT_GITHUB_ACTIONS_USER } from "./constants";
import { GitIdentity } from "./task-workflow";
import { CheckoutWith, WorkflowSteps } from "./workflow-steps";
import {
  ContainerOptions,
  Job,
  JobDefaults,
  JobPermissions,
  JobStep,
  JobStepOutput,
  JobStrategy,
  Tools,
} from "./workflows-model";
import { Component } from "../component";
import { GroupRunnerOptions, filteredRunsOnOptions } from "../runner-options";
import { Task } from "../task";
import { ensureNotHiddenPath } from "./private/util";

/**
 * Options to create the Job associated with a TaskWorkflow.
 */
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

  /**
   * Default settings for all steps in the TaskWorkflow Job.
   */
  readonly jobDefaults?: JobDefaults;

  /**
   * The GitHub Actions environment used for the job.
   *
   * @default - no environment used
   */
  readonly environment?: string;
}

/**
 * The primary or initial job of a TaskWorkflow.
 *
 * @implements {Job}
 */
export class TaskWorkflowJob extends Component {
  public readonly runsOn?: string[] | undefined;
  public readonly runsOnGroup?: GroupRunnerOptions | undefined;
  public readonly steps: JobStep[];
  public readonly environment?: string;
  public readonly outputs?: Record<string, JobStepOutput> | undefined;
  public readonly env?: Record<string, string> | undefined;
  public readonly defaults?: JobDefaults | undefined;
  public readonly timeoutMinutes?: number | undefined;
  public readonly continueOnError?: boolean | undefined;
  public readonly container?: ContainerOptions | undefined;
  public readonly services?: Record<string, ContainerOptions> | undefined;
  public readonly tools?: Tools | undefined;
  public readonly name?: string | undefined;
  public readonly needs?: string[] | undefined;
  public readonly permissions: JobPermissions;
  public readonly concurrency?: unknown;
  public readonly if?: string | undefined;
  public readonly strategy?: JobStrategy | undefined;

  /**
   * @param scope should be part of the project the Task belongs to.
   * @param task the main task that is run as part of this job.
   * @param options options to configure the TaskWorkflowJob.
   */
  constructor(scope: IConstruct, task: Task, options: TaskWorkflowJobOptions) {
    super(scope, `${new.target.name}#${task.name}`);
    const preCheckoutSteps = options.preCheckoutSteps ?? [];

    const checkoutWith: { lfs?: boolean } = {};
    if (options.downloadLfs) {
      checkoutWith.lfs = true;
    }
    // 'checkoutWith' can override 'lfs'
    Object.assign(checkoutWith, options.checkoutWith ?? {});

    const preBuildSteps = options.preBuildSteps ?? [];
    const postBuildSteps = options.postBuildSteps ?? [];
    const gitIdentity = options.gitIdentity ?? DEFAULT_GITHUB_ACTIONS_USER;

    if (options.artifactsDirectory) {
      ensureNotHiddenPath(options.artifactsDirectory, "artifactsDirectory");
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

    const runsOnInputs = filteredRunsOnOptions(
      options.runsOn,
      options.runsOnGroup
    );
    this.runsOn = (runsOnInputs as { runsOn: string[] })?.runsOn;
    this.runsOnGroup = (
      runsOnInputs as { runsOnGroup: GroupRunnerOptions }
    )?.runsOnGroup;
    this.container = options.container;
    this.env = options.env;
    this.permissions = options.permissions;
    this.defaults = options?.jobDefaults;
    this.if = options.condition;
    this.outputs = options.outputs;
    this.environment = options.environment;
    this.steps = [
      ...preCheckoutSteps,

      // check out sources.
      WorkflowSteps.checkout({ with: checkoutWith }),

      // sets git identity so we can push later
      WorkflowSteps.setupGitIdentity({ gitIdentity }),

      ...preBuildSteps,

      // run the main build task
      {
        name: task.name,
        run: this.project.runTaskCommand(task),
      },

      ...postBuildSteps,
    ];
  }

  /**
   * @jsii ignore
   * @internal
   */
  public toJSON(): Job {
    return {
      runsOn: this.runsOn,
      runsOnGroup: this.runsOnGroup,
      steps: this.steps,
      environment: this.environment,
      outputs: this.outputs,
      env: this.env,
      defaults: this.defaults,
      timeoutMinutes: this.timeoutMinutes,
      continueOnError: this.continueOnError,
      container: this.container,
      services: this.services,
      tools: this.tools,
      name: this.name,
      needs: this.needs,
      permissions: this.permissions,
      concurrency: this.concurrency,
      if: this.if,
      strategy: this.strategy,
    };
  }
}
