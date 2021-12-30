import { Task } from '..';
import { Component } from '../component';
import { GitHub, GithubWorkflow, GitIdentity } from '../github';
import { BUILD_ARTIFACT_NAME, DEFAULT_GITHUB_ACTIONS_USER } from '../github/constants';
import { WorkflowActions } from '../github/workflow-actions';
import { Job, JobPermission, JobStep } from '../github/workflows-model';
import { Project } from '../project';

const PULL_REQUEST_REF = '${{ github.event.pull_request.head.ref }}';
const PULL_REQUEST_REPOSITORY = '${{ github.event.pull_request.head.repo.full_name }}';
const BUILD_JOBID = 'build';
const SELF_MUTATION_STEP = 'self_mutation';
const SELF_MUTATION_HAPPENED_OUTPUT = 'self_mutation_happened';
const IS_FORK = 'github.event.pull_request.head.repo.full_name != github.repository';
const NOT_FORK = `!(${IS_FORK})`;
const SELF_MUTATION_CONDITION = `needs.${BUILD_JOBID}.outputs.${SELF_MUTATION_HAPPENED_OUTPUT}`;

export interface BuildWorkflowOptions {
  /**
   * The task to execute in order to build the project.
   */
  readonly buildTask: Task;

  /**
   * A name of a directory that includes build artifacts.
   */
  readonly artifactsDirectory: string;

  /**
   * The container image to use for builds.
   * @default - the default workflow container
   */
  readonly containerImage?: string;

  /**
   * Automatically update files modified during builds to pull-request branches.
   * This means that any files synthesized by projen or e.g. test snapshots will
   * always be up-to-date before a PR is merged.
   *
   * Implies that PR builds do not have anti-tamper checks.
   *
   * This is enabled by default only if `githubTokenSecret` is set. Otherwise it
   * is disabled, which implies that file changes that happen during build will
   * not be pushed back to the branch.
   *
   * @default true
   */
  readonly mutableBuild?: boolean;

  /**
   * Steps to execute before the build.
   * @default []
   */
  readonly preBuildSteps?: JobStep[];

  /**
   * Steps to execute after build.
   * @default []
   */
  readonly postBuildSteps?: JobStep[];

  /**
   * Git identity to use for the workflow.
   * @default - default identity
   */
  readonly gitIdentity?: GitIdentity;

  /**
   * Build environment variables.
   * @default {}
   */
  readonly env?: { [key: string]: string };
}

export class BuildWorkflow extends Component {
  private readonly postBuildSteps: JobStep[];
  private readonly preBuildSteps: JobStep[];
  private readonly gitIdentity: GitIdentity;
  private readonly buildTask: Task;
  private readonly github: GitHub;
  private readonly workflow: GithubWorkflow;
  private readonly artifactsDirectory?: string;

  private readonly _postBuildJobs: string[] = [];

  constructor(project: Project, options: BuildWorkflowOptions) {
    super(project);

    const github = GitHub.of(project);
    if (!github) {
      throw new Error('BuildWorkflow is currently only supported for GitHub projects');
    }

    this.github = github;
    this.preBuildSteps = options.preBuildSteps ?? [];
    this.postBuildSteps = options.postBuildSteps ?? [];
    this.gitIdentity = options.gitIdentity ?? DEFAULT_GITHUB_ACTIONS_USER;
    this.buildTask = options.buildTask;
    this.artifactsDirectory = options.artifactsDirectory;
    const mutableBuilds = options.mutableBuild ?? true;

    this.workflow = new GithubWorkflow(github, 'build');
    this.workflow.on({
      pullRequest: {},
      workflowDispatch: {}, // allow manual triggering
    });

    this.addBuildJob(options);

    if (mutableBuilds) {
      this.addSelfMutationJob();
    }
  }

  private addBuildJob(options: BuildWorkflowOptions) {
    this.workflow.addJob(BUILD_JOBID, {
      runsOn: ['ubuntu-latest'],
      container: options.containerImage ? { image: options.containerImage } : undefined,
      env: {
        CI: 'true',
        ...options.env,
      },
      permissions: {
        contents: JobPermission.WRITE,
      },
      steps: (() => this.renderBuildSteps()) as any,
      outputs: {
        [SELF_MUTATION_HAPPENED_OUTPUT]: {
          stepId: SELF_MUTATION_STEP,
          outputName: SELF_MUTATION_HAPPENED_OUTPUT,
        },
      },
    });
  }

  /**
   * Returns a list of job IDs that are part of the build.
   */
  public get buildJobIds(): string[] {
    return [BUILD_JOBID, ...this._postBuildJobs];
  }

  /**
   * Adds steps that are executed after the build.
   * @param steps The job steps
   */
  public addPostBuildSteps(...steps: JobStep[]): void {
    this.postBuildSteps.push(...steps);
  }

  /**
   * Adds another job to the build workflow which is executed after the build
   * job succeeded.
   *
   * Jobs are executed _only_ if the build did NOT self mutate. If the build
   * self-mutate, the branch will either be updated or the build will fail (in
   * forks), so there is no point in executing the post-build job.
   *
   * @param id The id of the new job
   * @param job The job specification
   */
  public addPostBuildJob(id: string, job: Job) {
    const steps = [];

    if (this.artifactsDirectory) {
      steps.push({
        name: 'Download build artifacts',
        uses: 'actions/download-artifact@v2',
        with: {
          name: BUILD_ARTIFACT_NAME,
          path: this.artifactsDirectory,
        },
      });
    }

    steps.push(...job.steps);

    this.workflow.addJob(id, {
      needs: [BUILD_JOBID],
      // only run if build did not self-mutate
      if: `! ${SELF_MUTATION_CONDITION}`,
      ...job,
      steps: steps,
    });

    // add to the list of build job IDs
    this._postBuildJobs.push(id);
  }

  private addSelfMutationJob() {
    this.workflow.addJob('self-mutation', {
      runsOn: ['ubuntu-latest'],
      permissions: {
        contents: JobPermission.WRITE,
      },
      needs: [BUILD_JOBID],
      if: `always() && ${SELF_MUTATION_CONDITION} && ${NOT_FORK}`,
      steps: [
        ...WorkflowActions.checkoutWithPatch({
          // we need to use a PAT so that our push will trigger the build workflow
          token: `\${{ secrets.${this.workflow.projenTokenSecret} }}`,
          ref: PULL_REQUEST_REF,
          repository: PULL_REQUEST_REPOSITORY,
        }),
        ...WorkflowActions.setGitIdentity(this.gitIdentity),
        {
          name: 'Push changes',
          run: [
            '  git add .',
            '  git commit -m "chore: self mutation"',
            `  git push origin HEAD:${PULL_REQUEST_REF}`,
          ].join('\n'),
        },
      ],
    });
  }

  /**
   * Called (lazily) during synth to render the build job steps.
   */
  private renderBuildSteps(): JobStep[] {
    return [
      {
        name: 'Checkout',
        uses: 'actions/checkout@v2',
        with: {
          ref: PULL_REQUEST_REF,
          repository: PULL_REQUEST_REPOSITORY,
        },
      },

      ...this.preBuildSteps,

      {
        name: this.buildTask.name,
        run: this.github.project.runTaskCommand(this.buildTask),
      },

      ...this.postBuildSteps,

      // check for mutations and upload a git patch file as an artifact
      ...WorkflowActions.createUploadGitPatch({
        stepId: SELF_MUTATION_STEP,
        outputName: SELF_MUTATION_HAPPENED_OUTPUT,
        mutationError: 'Files were changed during build (see build log). If this was triggered from a fork, you will need to update your branch.',
      }),

      // upload the build artifact only if we have post-build jobs (otherwise, there's no point)
      ...(this._postBuildJobs.length == 0 ? [] : [{
        name: 'Upload artifact',
        uses: 'actions/upload-artifact@v2.1.1',
        with: {
          name: BUILD_ARTIFACT_NAME,
          path: this.artifactsDirectory,
        },
      }]),
    ];
  }
}
