import { NodeProject } from '../node-project';
import { Task } from '../tasks';
import { GitHub } from './github';
import { GithubWorkflow } from './workflows';
import { ContainerOptions, Job, JobPermissions, JobStep, Triggers } from './workflows-model';

function context(value: string) {
  return `\${{ ${value} }}`;
}

export interface GenericWorkflowOptions {
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
   * What should trigger the workflow?
   *
   * @default - by default workflows can only be triggered by manually.
   */
  readonly trigger?: Triggers;

  readonly preCheckoutSteps?: JobStep[];
  readonly checkoutWith?: Record<string, any>;
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

  readonly postSteps?: JobStep[];

  /**
   * Disables anti-tamper checks in the workflow.
   */
  readonly antitamperDisabled?: boolean;

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
export class GenericWorkflow extends GithubWorkflow {
  public static readonly DEFAULT_TOKEN = context('secrets.GITHUB_TOKEN');
  public static readonly DEFAULT_JOB_ID = 'workflow';
  public static readonly UBUNTU_LATEST = 'ubuntu-latest';

  readonly github: GitHub;
  readonly jobId: string;

  constructor(github: GitHub, options: GenericWorkflowOptions) {
    super(github, options.name);
    this.jobId = options.jobId ?? GenericWorkflow.DEFAULT_JOB_ID;
    this.github = github;
    this.definedWorkflow(options);
  }

  protected getMainStep(options: GenericWorkflowOptions) {
    return options.buildStep ?? {
      name: options.task.name,
      run: `projen ${options.task.name}`,
    };
  }

  protected definedWorkflow(options: GenericWorkflowOptions) {
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

    const preCheckoutSteps = options.preCheckoutSteps ?? [];
    const checkoutWith = options.checkoutWith ? { with: options.checkoutWith } : {};
    const preBuildSteps = options.preBuildSteps ?? [];
    const postSteps = options.postSteps ?? [];

    const antitamperSteps = options.antitamperDisabled ? [] : [{
      name: 'Anti-tamper check',
      run: 'git diff --ignore-space-at-eol --exit-code',
    }];

    const job: Mutable<Job> = {
      runsOn: GenericWorkflow.UBUNTU_LATEST,
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

        ...postSteps,

        // anti-tamper check (fails if there were changes to committed files)
        // this will identify any non-committed files generated during build (e.g. test snapshots)
        ...antitamperSteps,
      ],
    };

    if (options.artifactsDirectory) {
      job.steps.push({
        name: 'Upload artifact',
        uses: 'actions/upload-artifact@v2.1.1',
        if: 'always()',
        with: {
          name: options.artifactsDirectory,
          path: options.artifactsDirectory,
        },
      });
    }

    this.addJobs({ [this.jobId]: job });

    return this;
  }
}

export type NodeWorkflowOptions = Omit<GenericWorkflowOptions, 'buildStep'>;

/**
 * A GitHub generic workflow for Node.js projects.
 */
export class NodeWorkflow extends GenericWorkflow {

  readonly project: NodeProject;

  constructor(github: GitHub, options: NodeWorkflowOptions) {
    const project = github.project as NodeProject;
    super(github, {
      ...options,
      env: {
        CI: 'true', // will cause `NodeProject` to execute `yarn install` with `--frozen-lockfile`
        ...options.env ?? {},
      },
      antitamperDisabled: options.antitamperDisabled || !project.antitamper,
      buildStep: {
        name: options.task.name,
        run: project.runTaskCommand(options.task),
      },
    });
    this.project = project;
  }

}

type Mutable<T> = { -readonly [P in keyof T]: T[P] };
