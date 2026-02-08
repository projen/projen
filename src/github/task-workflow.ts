import { GitHub } from "./github";
import { TaskWorkflowJob, TaskWorkflowJobOptions } from "./task-workflow-job";
import { GithubWorkflow } from "./workflows";
import { Triggers } from "./workflows-model";
import { Task } from "../task";

const DEFAULT_JOB_ID = "build";

/**
 * Options to create a TaskWorkflow.
 */
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

  /**
   * The main task to be executed.
   */
  readonly task: Task;
}

/**
 * A GitHub workflow for common build tasks within a project.
 */
export class TaskWorkflow extends GithubWorkflow {
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
          'Trigger "issueComment" should not be used due to a security concern',
        );
      }

      this.on(options.triggers);
    }

    this.on({
      workflowDispatch: {}, // allow manual triggering
    });

    const job = new TaskWorkflowJob(this, options.task, {
      ...options,
      downloadLfs: options.downloadLfs ?? github.downloadLfs,
    });

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
