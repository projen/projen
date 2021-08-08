import { Task } from '../tasks';
import { GitHub } from './github';
import { GithubWorkflow } from './workflows';
import { ContainerOptions, Job, JobPermissions, JobStep, JobStepOutput, Triggers } from './workflows-model';

const DEFAULT_JOB_ID = 'build';
const UBUNTU_LATEST = 'ubuntu-latest';

export interface TaskWorkflowOptions {
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
   * The triggers for the workflow.
   *
   * @default - by default workflows can only be triggered by manually.
   */
  readonly triggers?: Triggers;

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
  readonly checkoutWith?: Record<string, any>;

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
}

/**
 * A GitHub workflow for common build tasks within a project.
 */
export class TaskWorkflow extends GithubWorkflow {
  private readonly github: GitHub;
  public readonly jobId: string;

  constructor(github: GitHub, options: TaskWorkflowOptions) {
    super(github, options.name);
    this.jobId = options.jobId ?? DEFAULT_JOB_ID;
    this.github = github;

    if (options.triggers) {
      if (options.triggers.issueComment) {
        // https://docs.github.com/en/actions/learn-github-actions/security-hardening-for-github-actions#potential-impact-of-a-compromised-runner
        throw new Error('Trigger "issueComment" should not be used due to a security concern');
      }

      this.on(options.triggers);
    }

    this.on({
      workflowDispatch: {}, // allow manual triggering
    });

    const preCheckoutSteps = options.preCheckoutSteps ?? [];
    const checkoutWith = options.checkoutWith ? { with: options.checkoutWith } : {};
    const preBuildSteps = options.preBuildSteps ?? [];
    const postBuildSteps = options.postBuildSteps ?? [];

    if (options.artifactsDirectory) {
      postBuildSteps.push({
        name: 'Upload artifact',
        uses: 'actions/upload-artifact@v2.1.1',
        // Setting to always will ensure that this step will run even if
        // the previous ones have failed (e.g. coverage report, internal logs, etc)
        if: 'always()',
        with: {
          name: options.artifactsDirectory,
          path: options.artifactsDirectory,
        },
      });
    }

    const job: Job = {
      runsOn: UBUNTU_LATEST,
      container: options.container,
      env: options.env,
      permissions: options.permissions,
      if: options.condition,
      outputs: options.outputs,
      steps: [
        ...preCheckoutSteps,

        // check out sources.
        {
          name: 'Checkout',
          uses: 'actions/checkout@v2',
          ...checkoutWith,
        },

        // sets git identity so we can push later
        {
          name: 'Set git identity',
          run: [
            'git config user.name "Automation"',
            'git config user.email "github-actions@github.com"',
          ].join('\n'),
        },

        ...preBuildSteps,

        // run the main build task
        {
          name: options.task.name,
          run: this.github.project.runTaskCommand(options.task),
        },

        ...postBuildSteps,
      ],
    };

    this.addJobs({ [this.jobId]: job });
  }
}
