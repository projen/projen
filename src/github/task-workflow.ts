import { Task } from '../tasks';
import { GitHub } from './github';
import { GithubWorkflow } from './workflows';
import { ContainerOptions, Job, JobPermissions, JobStep, Triggers } from './workflows-model';

const DEFAULT_JOB_ID = 'build';
const UBUNTU_LATEST = 'ubuntu-latest';

export interface TaskGithubWorkflowOptions {
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
   *
   * @default - not set
   */
  readonly artifactsDirectory?: string;

  /**
   * The triggers for the workflow.
   *
   * @default - by default workflows can only be triggered by manually.
   */
  readonly trigger?: Triggers;

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
   * Main build step used in the workflow.
   *
   * @default - by default we will run `projen ${task.name}`
   */
  readonly buildStep?: JobStep;

  /**
   * Actions to run after the main build step.
   *
   * @default - not set
   */
  readonly postBuildSteps?: JobStep[];

  /**
   * Enables anti-tamper checks in the workflow.
   *
   * @default true
   */
  readonly antitamper?: boolean;

  /**
   * Actions to run as the last step in the job.
   *
   * @default - not set
   */
  readonly finalSteps?: JobStep[];

  /**
   * Workflow environment variables.
   * @default {}
   */
  readonly env?: Record<string, string>;

  /**
   * Permissions for the build job.
   */
  readonly permissions: JobPermissions;
}

/**
 * A GitHub workflow for common build tasks within a project.
 */
export class TaskGithubWorkflow extends GithubWorkflow {
  readonly github: GitHub;
  readonly jobId: string;

  constructor(github: GitHub, options: TaskGithubWorkflowOptions) {
    super(github, options.name);
    this.jobId = options.jobId ?? DEFAULT_JOB_ID;
    this.github = github;
    this.createWorkflow(options);
  }

  private getMainStep(options: TaskGithubWorkflowOptions) {
    return options.buildStep ?? {
      name: options.task.name,
      run: `projen ${options.task.name}`,
    };
  }

  protected createWorkflow(options: TaskGithubWorkflowOptions) {
    if (options.trigger) {
      if (options.trigger.issueComment) {
        // https://docs.github.com/en/actions/learn-github-actions/security-hardening-for-github-actions#potential-impact-of-a-compromised-runner
        throw new Error('Trigger "issueComment" should not be used due to a security concern');
      }

      this.on(options.trigger);
    }

    this.on({
      workflowDispatch: {}, // allow manual triggering
    });

    const preCheckoutSteps = options.preCheckoutSteps ?? [];
    const checkoutWith = options.checkoutWith ? { with: options.checkoutWith } : {};
    const preBuildSteps = options.preBuildSteps ?? [];
    const postBuildSteps = options.postBuildSteps ?? [];
    const finalSteps = options.finalSteps ?? [];

    const antitamper = options.antitamper ?? true;
    const antitamperSteps = antitamper ? [{
      name: 'Anti-tamper check',
      run: 'git diff --ignore-space-at-eol --exit-code',
    }] : [];

    if (options.artifactsDirectory) {
      finalSteps.push({
        name: 'Upload artifact',
        uses: 'actions/upload-artifact@v2.1.1',
        if: 'always()',
        with: {
          name: options.artifactsDirectory,
          path: options.artifactsDirectory,
        },
      });
    }

    const job: Mutable<Job> = {
      runsOn: UBUNTU_LATEST,
      container: options.container,
      env: options.env,
      permissions: options.permissions,
      if: options.condition,
      steps: [
        ...preCheckoutSteps,

        // check out sources.
        {
          name: 'Checkout',
          uses: 'actions/checkout@v2',
          ...checkoutWith,
        },

        // perform an anti-tamper check immediately after we run projen.
        ...antitamperSteps,


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
        this.getMainStep(options),

        ...postBuildSteps,

        // anti-tamper check (fails if there were changes to committed files)
        // this will identify any non-committed files generated during build (e.g. test snapshots)
        ...antitamperSteps,

        ...finalSteps,
      ],
    };

    this.addJobs({ [this.jobId]: job });

    return this;
  }
}

type Mutable<T> = { -readonly [P in keyof T]: T[P] };
