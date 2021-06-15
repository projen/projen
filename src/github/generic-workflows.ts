import { Task } from '../tasks';
import { GitHub } from './github';
import { GithubWorkflow } from './workflows';
import { ContainerOptions, Job, JobPermissions, JobStep, Triggers } from './workflows-model';

function context(value: string) {
  return `\${{ ${value} }}`;
}

export interface GenericGitHubWorkflowOptions {
  /**
   * The workflow name.
   */
  readonly name: string;

  /**
   * The primary job id.
   * @default "workflow"
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
   * @default undefined
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
   */
  readonly initialSteps?: JobStep[];

  /**
   * Override for the `with` property of the source code checkout step.
   */
  readonly checkoutWith?: Record<string, any>;

  /**
   * Steps to run before the main build step.
   */
  readonly preBuildSteps?: JobStep[];

  /**
   * The main task to be executed.
   */
  readonly task: Task;

  /**
   * Main build step used in the workflow.
   * @default {run: `projen ${task.name}`}
   */
  readonly buildStep?: JobStep;

  /**
   * Steps to run after the main build step.
   */
  readonly postBuildSteps?: JobStep[];

  /**
   * Disables anti-tamper checks in the workflow.
   */
  readonly antitamperDisabled?: boolean;

  /**
   * Job steps to run as the last .
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
 * A GitHub generic workflow.
 */
export class GenericGitHubWorkflow extends GithubWorkflow {
  public static readonly DEFAULT_TOKEN = context('secrets.GITHUB_TOKEN');
  public static readonly DEFAULT_JOB_ID = 'build';
  public static readonly UBUNTU_LATEST = 'ubuntu-latest';

  public static getMainStep(options: GenericGitHubWorkflowOptions) {
    return options.buildStep ?? {
      name: options.task.name,
      run: `projen ${options.task.name}`,
    };
  }

  readonly github: GitHub;
  readonly jobId: string;

  constructor(github: GitHub, options: GenericGitHubWorkflowOptions) {
    super(github, options.name);
    this.jobId = options.jobId ?? GenericGitHubWorkflow.DEFAULT_JOB_ID;
    this.github = github;
    this.createWorkflow(options);
  }

  protected createWorkflow(options: GenericGitHubWorkflowOptions) {
    if (options.trigger) {
      if (options.trigger.issueComment) {
        // https://docs.github.com/en/actions/learn-github-actions/security-hardening-for-github-actions#potential-impact-of-a-compromised-runner
        throw new Error('"issueComment" should not be used as a trigger due to a security concern');
      }

      this.on(options.trigger);
    }

    this.on({
      workflowDispatch: {}, // allow manual triggering
    });

    const initialSteps = options.initialSteps ?? [];
    const checkoutWith = options.checkoutWith ? { with: options.checkoutWith } : {};
    const preBuildSteps = options.preBuildSteps ?? [];
    const postBuildSteps = options.postBuildSteps ?? [];
    const finalSteps = options.finalSteps ?? [];

    const antitamperSteps = options.antitamperDisabled ? [] : [{
      name: 'Anti-tamper check',
      run: 'git diff --ignore-space-at-eol --exit-code',
    }];

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
      runsOn: GenericGitHubWorkflow.UBUNTU_LATEST,
      container: options.container,
      env: options.env,
      permissions: options.permissions,
      if: options.condition,
      steps: [
        ...initialSteps,

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
        GenericGitHubWorkflow.getMainStep(options),

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
