import { Task } from '..';
import { Component } from '../component';
import { GitHub, GithubWorkflow, GitIdentity } from '../github';
import { DEFAULT_GITHUB_ACTIONS_USER, setGitIdentityStep } from '../github/constants';
import { Job, JobPermission, JobStep } from '../github/workflows-model';
import { Project } from '../project';

const BRANCH_REF = '${{ github.event.pull_request.head.ref }}';
const REPO_REF = '${{ github.event.pull_request.head.repo.full_name }}';
const PRIMARY_JOB_ID = 'build';
const GIT_DIFF_STEP = 'git_diff';
const HAS_CHANGES_OUTPUT_NAME = 'has_changes';

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
  * Automatically update files modified during builds to pull-request branches. This means
  * that any files synthesized by projen or e.g. test snapshots will always be up-to-date
  * before a PR is merged.
  *
  * Implies that PR builds do not have anti-tamper checks.
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
  private readonly antitamperSteps: JobStep[];
  private readonly mutableBuilds: boolean;
  private readonly gitIdentity: GitIdentity;
  private readonly buildTask: Task;
  private readonly github: GitHub;
  private readonly workflow: GithubWorkflow;
  private readonly primaryJobId: string;
  private readonly artifactsDirectory?: string;

  private readonly _buildJobIds: string[];
  private uploadArtitactSteps?: JobStep[];

  constructor(project: Project, options: BuildWorkflowOptions) {
    super(project);


    const github = GitHub.of(project);
    if (!github) {
      throw new Error('BuildWorkflow is currently only supported for GitHub projects');
    }

    this.github = github;

    this.preBuildSteps = options.preBuildSteps ?? [];
    this.postBuildSteps = options.postBuildSteps ?? [];
    this.mutableBuilds = options.mutableBuild ?? true;
    this.gitIdentity = options.gitIdentity ?? DEFAULT_GITHUB_ACTIONS_USER;
    this.buildTask = options.buildTask;
    this.artifactsDirectory = options.artifactsDirectory;

    const antitamper = options.antitamper ?? true;

    // disable anti-tamper if build workflow is mutable
    this.antitamperSteps = (!this.mutableBuilds ?? antitamper) ? [{
      // anti-tamper check (fails if there were changes to committed files)
      // this will identify any non-committed files generated during build (e.g. test snapshots)
      name: 'Anti-tamper check',
      run: 'git diff --ignore-space-at-eol --exit-code',
    }] : [];

    this.workflow = new GithubWorkflow(github, 'build');

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
        [HAS_CHANGES_OUTPUT_NAME]: {
          stepId: GIT_DIFF_STEP,
          outputName: HAS_CHANGES_OUTPUT_NAME,
        },
      },
      steps: (() => this.renderSteps()) as any,
    });

    this.primaryJobId = PRIMARY_JOB_ID;

    this._buildJobIds = [PRIMARY_JOB_ID];

    this.workflow.addJob('update-status', {
      runsOn: ['ubuntu-latest'],
      permissions: {
        checks: JobPermission.WRITE,
        actions: JobPermission.WRITE,
      },
      needs: (() => this._buildJobIds) as any, // wait for all build jobs to finish
      if: `\${{ needs.${this.primaryJobId}.outputs.${HAS_CHANGES_OUTPUT_NAME} }}`,
      steps: [
      // if we pushed changes, we need to manually update the status check so
      // that the PR will be green (we won't get here for forks with updates
      // because the push would have failed).
        {
          name: 'Update status check (if changed)',
          run: [
            'gh api',
            '-X POST',
            `/repos/${REPO_REF}/check-runs`,
            `-F name="${PRIMARY_JOB_ID}"`,
            '-F head_sha="$(git rev-parse HEAD)"',
            '-F status="completed"',
            '-F conclusion="success"',
          ].join(' '),
          env: {
            GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
          },
        },

        // if we pushed changes, we need to mark the current commit as failed, so
        // that GitHub auto-merge does not risk merging this commit before the
        // event for the new commit has registered.
        {
          name: 'Cancel workflow (if changed)',
          run: [
            'gh api',
            '-X POST',
            `/repos/${REPO_REF}/actions/runs/\${{ github.run_id }}/cancel`,
          ].join(' '),
          env: {
            GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
          },
        },
      ],
    });
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
      const artfiactName = 'build-artifact';

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
            name: artfiactName,
            path: this.artifactsDirectory,
          },
        }];
      }

      steps.push({
        name: 'Download build artifacts',
        uses: 'actions/download-artifact@v2',
        with: {
          name: artfiactName,
          path: this.artifactsDirectory,
        },
      });
    }

    steps.push(...job.steps);

    this.workflow.addJob(id, {
      needs: [this.primaryJobId],
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
      with: this.mutableBuilds ? {
        ref: BRANCH_REF,
        repository: REPO_REF,
      } : undefined,
    });

    steps.push(setGitIdentityStep(this.gitIdentity));

    steps.push(...this.antitamperSteps);
    steps.push(...this.preBuildSteps);
    steps.push({
      name: this.buildTask.name,
      run: this.github.project.runTaskCommand(this.buildTask),
    });
    steps.push(...this.postBuildSteps);
    steps.push(...this.antitamperSteps);

    // use "git diff --exit code" to check if there were changes in the repo
    // and create a step output that will be used in subsequent steps.
    steps.push({
      name: 'Check for changes',
      id: GIT_DIFF_STEP,
      run: `git diff --exit-code || echo "::set-output name=${HAS_CHANGES_OUTPUT_NAME}::true"`,
    });

    // only if we had changes, commit them and push to the repo note that for
    // forks, this will fail (because the workflow doesn't have permissions.
    // this indicates to users that they need to update their branch manually.
    steps.push({
      if: `steps.${GIT_DIFF_STEP}.outputs.${HAS_CHANGES_OUTPUT_NAME}`,
      name: 'Commit and push changes (if changed)',
      run: `git add . && git commit -m "chore: self mutation" && git push origin HEAD:${BRANCH_REF}`,
    });

    if (this.uploadArtitactSteps) {
      steps.push(...this.uploadArtitactSteps);
    }

    return steps;
  }
}