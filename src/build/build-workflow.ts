import { Component } from "../component";
import { GitIdentity } from "../github";
import { DEFAULT_GITHUB_ACTIONS_USER } from "../github/constants";
import { NodeProject } from "../javascript";
import { Project } from "../project";
import { Task } from "../task";
import { Condition, JobOptions, Step, Tools, Workflow } from "../workflows";

const GIT_PATCH_FILE = ".repo.patch";

const PULL_REQUEST_REF = "${{ github.event.pull_request.head.ref }}";
const BUILD_JOBID = "build";
const SELF_MUTATION_HAPPENED_OUTPUT = "self_mutation_happened";

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
  readonly preBuildSteps?: Step[];

  /**
   * Steps to execute after build.
   * @default []
   */
  readonly postBuildSteps?: Step[];

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
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   */
  readonly runsOn?: string[];

  /**
   * Tools required in the build workflow.
   * @default - no tools are installed
   */
  readonly tools?: Tools;
}

export class BuildWorkflow extends Component {
  private readonly postBuildSteps: Step[];
  private readonly preBuildSteps: Step[];
  private readonly gitIdentity: GitIdentity;
  private readonly buildTask: Task;
  private readonly workflow: Workflow;
  private readonly artifactsDirectory: string;
  // TODO: private readonly defaultRunners: string[] = ["ubuntu-latest"];

  private readonly _postBuildJobs: string[] = [];

  constructor(project: Project, options: BuildWorkflowOptions) {
    super(project);

    this.preBuildSteps = options.preBuildSteps ?? [];
    this.postBuildSteps = options.postBuildSteps ?? [];
    this.gitIdentity = options.gitIdentity ?? DEFAULT_GITHUB_ACTIONS_USER;
    this.buildTask = options.buildTask;
    this.artifactsDirectory = options.artifactsDirectory;
    const mutableBuilds = options.mutableBuild ?? true;

    this.workflow = new Workflow(project, {
      name: "build",
      triggers: {
        manual: true,
        pullRequest: true,
      },
    });

    this.addBuildJob(options);

    if (mutableBuilds) {
      this.addSelfMutationJob();
    }
  }

  private addBuildJob(options: BuildWorkflowOptions) {
    this.workflow.addJob(BUILD_JOBID, {
      image: options.containerImage,
      // TODO: runsOn: options.runsOn ?? this.defaultRunners,
      env: {
        ...options.env,
        CI: "true",
      },
      checkout: true,
      upload: [GIT_PATCH_FILE, "dist"],
      tools: options.tools,
      steps: [
        ...this.preBuildSteps,
        { run: this.project.runTaskCommand(this.buildTask) },
        ...this.postBuildSteps,
        { run: "git add ." },
        {
          run: [
            `if git diff --staged --patch --exit-code > ${GIT_PATCH_FILE}; then`,
            `  ${SELF_MUTATION_HAPPENED_OUTPUT}=1`,
            `else`,
            '  echo "Files were changed during build (see build log). If this was triggered from a fork, you will need to update your branch."',
            `  cat ${GIT_PATCH_FILE}`,
            "  exit 1",
            `fi`,
          ].join("\n"),
        },
      ],
      exports: [SELF_MUTATION_HAPPENED_OUTPUT],
    });
    // this.workflow.addJob(, {
    //   steps: (() => this.renderBuildSteps()) as any,
    //   outputs: {
    //     [SELF_MUTATION_HAPPENED_OUTPUT]: {
    //       stepId: SELF_MUTATION_STEP,
    //       outputName: SELF_MUTATION_HAPPENED_OUTPUT,
    //     },
    //   },
    // });
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
  public addPostBuildSteps(...steps: Step[]): void {
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
  public addPostBuildJob(id: string, job: JobOptions) {
    this.workflow.addJob(id, {
      needs: [BUILD_JOBID],
      download: this.artifactsDirectory ? [this.artifactsDirectory] : [],
      // only run if build did not self-mutate
      condition: Condition.not(
        Condition.isOutputDefined(BUILD_JOBID, SELF_MUTATION_HAPPENED_OUTPUT)
      ),
      ...job,
      steps: job.steps,
    });

    // add to the list of build job IDs
    this._postBuildJobs.push(id);
  }

  /**
   * Run a task as a job within the build workflow which is executed after the
   * build job succeeded.
   *
   * The job will have access to build artifacts and will install project
   * dependencies in order to be able to run any commands used in the tasks.
   *
   * Jobs are executed _only_ if the build did NOT self mutate. If the build
   * self-mutate, the branch will either be updated or the build will fail (in
   * forks), so there is no point in executing the post-build job.
   *
   * @param options Specify tools and other options
   */
  public addPostBuildJobTask(task: Task, options: AddPostBuildJobTaskOptions) {
    this.addPostBuildJobCommands(
      `post-build-${task.name}`,
      [`${this.project.projenCommand} ${task.name}`],
      {
        checkoutRepo: true,
        installDeps: true,
        tools: options.tools,
        runsOn: options.runsOn,
      }
    );
  }

  /**
   * Run a sequence of commands as a job within the build workflow which is
   * executed after the build job succeeded.
   *
   * Jobs are executed _only_ if the build did NOT self mutate. If the build
   * self-mutate, the branch will either be updated or the build will fail (in
   * forks), so there is no point in executing the post-build job.
   *
   * @param options Specify tools and other options
   */
  public addPostBuildJobCommands(
    id: string,
    commands: string[],
    options?: AddPostBuildJobCommandsOptions
  ) {
    const steps: Step[] = [];

    if (
      options?.checkoutRepo &&
      options?.installDeps &&
      this.project instanceof NodeProject
    ) {
      steps.push({
        run: `${this.project.package.installCommand}`,
      });
    }

    steps.push({ run: commands.join("\n") });

    this.addPostBuildJob(id, {
      checkout: options?.checkoutRepo,
      tools: options?.tools,
      // TODO: runsOn: options?.runsOn ?? this.defaultRunners,
      steps,
    });
  }

  private addSelfMutationJob() {
    this.workflow.addJob("self-mutation", {
      // TODO: runsOn: options.runsOn ?? this.defaultRunners,
      mutable: true,
      checkout: true,
      needs: [BUILD_JOBID],
      condition: Condition.and(
        Condition.always(),
        Condition.isOutputDefined(BUILD_JOBID, SELF_MUTATION_HAPPENED_OUTPUT),
        Condition.not(Condition.isFork())
      ),
      download: [GIT_PATCH_FILE],
      steps: [
        {
          run: `[ -s ./${GIT_PATCH_FILE} ] && git apply ./${GIT_PATCH_FILE} || echo "Empty patch. Skipping."`,
        },
        { run: `rm -f ./${GIT_PATCH_FILE}` },
        { run: `git config user.name "${this.gitIdentity.name}"` },
        { run: `git config user.email "${this.gitIdentity.email}"` },
        { run: `git add .` },
        { run: `git commit -m -s "chore: self mutation"` },
        { run: `git push origin HEAD:${PULL_REQUEST_REF}` },
      ],
    });
  }
}

/**
 * Options for `BuildWorkflow.addPostBuildJobTask`
 */
export interface AddPostBuildJobTaskOptions {
  /**
   * Tools that should be installed before the task is run.
   */
  readonly tools?: Tools;

  /**
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   */
  readonly runsOn?: string[];
}

/**
 * Options for `BuildWorkflow.addPostBuildJobCommands`
 */
export interface AddPostBuildJobCommandsOptions {
  /**
   * Tools that should be installed before the commands are run.
   */
  readonly tools?: Tools;

  /**
   * Check out the repository at the pull request branch before commands are
   * run.
   *
   * @default false
   */
  readonly checkoutRepo?: boolean;

  /**
   * Install project dependencies before running commands. `checkoutRepo` must
   * also be set to true.
   *
   * Currently only supported for `NodeProject`.
   *
   * @default false
   */
  readonly installDeps?: boolean;

  /**
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   */
  readonly runsOn?: string[];
}
