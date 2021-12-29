import { Task } from '..';
import { Component } from '../component';
import { GitHub, GithubWorkflow, GitIdentity } from '../github';
import { BUILD_ARTIFACT_NAME, DEFAULT_GITHUB_ACTIONS_USER } from '../github/constants';
import { WorkflowActions } from '../github/workflow-actions';
import { Job, JobPermission, JobStep } from '../github/workflows-model';
import { Project } from '../project';

const BRANCH_REF = '${{ github.event.pull_request.head.ref }}';
const REPO_REF = '${{ github.event.pull_request.head.repo.full_name }}';
const PRIMARY_JOB_ID = 'build';
const SELF_MUTATION_STEP = 'self_mutation';
const SELF_MUTATION_HAPPENED = 'self_mutation_happened';

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

  /**
   * Enable anti-tamper check.
   *
   * @default true
   */
  readonly antitamper?: boolean;
}

export class BuildWorkflow extends Component {
  private readonly postBuildSteps: JobStep[];
  private readonly preBuildSteps: JobStep[];
  private readonly mutableBuilds: boolean;
  private readonly gitIdentity: GitIdentity;
  private readonly buildTask: Task;
  private readonly github: GitHub;
  private readonly workflow: GithubWorkflow;
  private readonly primaryJobId: string;
  private readonly artifactsDirectory?: string;

  private readonly _buildJobIds: string[];
  private uploadArtitactSteps?: JobStep[];
  private readonly antitamper: boolean;

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
    this.mutableBuilds = options.mutableBuild ?? true;
    this.workflow = new GithubWorkflow(github, 'build');
    this.antitamper = options.antitamper ?? true;

    this.workflow.on({
      pullRequest: {},
      workflowDispatch: {}, // allow manual triggering
    });

    this.workflow.addJob(PRIMARY_JOB_ID, {
      runsOn: ['ubuntu-latest'],
      container: options.containerImage ? { image: options.containerImage } : undefined,
      env: {
        CI: 'true',
        ...options.env,
      },
      permissions: {
        contents: JobPermission.WRITE,
      },
      outputs: {
        [SELF_MUTATION_HAPPENED]: {
          stepId: SELF_MUTATION_STEP,
          outputName: SELF_MUTATION_HAPPENED,
        },
      },
      steps: (() => this.renderSteps()) as any,
    });

    this.primaryJobId = PRIMARY_JOB_ID;

    this._buildJobIds = [PRIMARY_JOB_ID];

    if (this.mutableBuilds) {
      this.workflow.addJob('self-mutate', {
        runsOn: ['ubuntu-latest'],
        permissions: {
          contents: JobPermission.WRITE,
        },
        needs: [this.primaryJobId],
        if: `\${{ needs.${this.primaryJobId}.outputs.${SELF_MUTATION_HAPPENED} }}`,
        steps: [
          {
            name: 'Checkout',
            uses: 'actions/checkout@v2',
            with: {
              // we must use a PAT in order to be able to trigger build
              // workflows again, update workflow files, etc. but this is safe
              // here because there is no foreign code execution here just
              // applying the patch and pushing it to the repo.
              token: `\${{ secrets.${this.workflow.projenTokenSecret} }}`,
              repository: REPO_REF,
              ref: BRANCH_REF,
            },
          },
          ...WorkflowActions.downloadApplyGitPatch(),
          ...WorkflowActions.setGitIdentity(this.gitIdentity),
          {
            name: 'Push changes',
            run: [
              '  git add .',
              '  git commit -m "chore: self mutation"',
              `  git push origin HEAD:${BRANCH_REF}`,
            ].join('\n'),
          },
        ],
      });
    }
  }

  /**
   * Returns a list of job IDs that are part of the build.
   */
  public get buildJobIds(): string[] {
    return [...this._buildJobIds];
  }

  /**
   * Adds steps that are executed after the build.
   * @param steps The job steps
   */
  public addPostBuildSteps(...steps: JobStep[]): void {
    this.postBuildSteps.push(...steps);
  }

  /**
   * Adds another job to the build workflow which is executed after the build job succeeded.
   * @param id The id of the new job
   * @param job The job specification
   */
  public addPostBuildJob(id: string, job: Job) {
    const steps = [];

    if (this.artifactsDirectory) {

      // add a step at the end of the build workflow which will upload the
      // artifact so we can download it in each post-build job (do it once).
      if (!this.uploadArtitactSteps) {
        this.uploadArtitactSteps = [{
          name: 'Upload artifact',
          uses: 'actions/upload-artifact@v2.1.1',
          // Setting to always will ensure that this step will run even if
          // the previous ones have failed (e.g. coverage report, internal logs, etc)
          if: 'always()',
          with: {
            name: BUILD_ARTIFACT_NAME,
            path: this.artifactsDirectory,
          },
        }];
      }

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
      needs: [this.primaryJobId],
      if: `\${{ ! needs.${this.primaryJobId}.outputs.${SELF_MUTATION_HAPPENED} }}`, // only run if build did not self-mutate
      ...job,
      steps: steps,
    });

    // add to the list of build job IDs
    this._buildJobIds.push(id);
  }

  /**
   * Called (lazily) during synth to render the build job steps.
   */
  private renderSteps(): JobStep[] {
    const steps = new Array<JobStep>();

    steps.push({
      name: 'Checkout',
      uses: 'actions/checkout@v2',
      with: {
        ref: BRANCH_REF,
        repository: REPO_REF,
      },
    });

    steps.push(...this.preBuildSteps);
    steps.push({
      name: this.buildTask.name,
      run: this.github.project.runTaskCommand(this.buildTask),
    });
    steps.push(...this.postBuildSteps);

    if (this.mutableBuilds) {
      steps.push(
        {
          name: 'Check self-mutation',
          id: SELF_MUTATION_STEP,
          run: `git diff --exit-code || echo "::set-output name=${SELF_MUTATION_HAPPENED}::true"`,
        },
        ...WorkflowActions.createUploadGitPatch({
          if: `\${{ steps.${SELF_MUTATION_STEP}.outputs.${SELF_MUTATION_HAPPENED} }}`,
        }),
      );
    } else if (this.antitamper) {
      // anti-tamper check (fails if there were changes to committed files)
      // this will identify any non-committed files generated during build (e.g. test snapshots)
      steps.push({
        name: 'Anti-tamper check',
        run: 'git diff --ignore-space-at-eol --exit-code',
      });
    }

    if (this.uploadArtitactSteps) {
      steps.push(...this.uploadArtitactSteps);
    }

    return steps;
  }
}
