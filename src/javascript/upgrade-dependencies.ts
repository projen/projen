import { Component } from "../component";
import {
  GithubCredentials,
  GitHub,
  GithubWorkflow,
  GitIdentity,
  workflows,
} from "../github";
import { DEFAULT_GITHUB_ACTIONS_USER } from "../github/constants";
import { WorkflowActions } from "../github/workflow-actions";
import { ContainerOptions, JobStep } from "../github/workflows-model";
import { NodeProject } from "../javascript";
import { Release } from "../release";
import { Task } from "../task";
import { TaskStep } from "../task-model";

function context(value: string) {
  return `\${{ ${value} }}`;
}

const REPO = context("github.repository");
const RUN_ID = context("github.run_id");
const RUN_URL = `https://github.com/${REPO}/actions/runs/${RUN_ID}`;
const CREATE_PATCH_STEP_ID = "create_patch";
const PATCH_CREATED_OUTPUT = "patch_created";

/**
 * Options for `UpgradeDependencies`.
 */
export interface UpgradeDependenciesOptions {
  /**
   * List of package names to exclude during the upgrade.
   *
   * @default - Nothing is excluded.
   */
  readonly exclude?: string[];

  /**
   * List of package names to include during the upgrade.
   *
   * @default - Everything is included.
   */
  readonly include?: string[];

  /**
   * Include a github workflow for creating PR's that upgrades the
   * required dependencies, either by manual dispatch, or by a schedule.
   *
   * If this is `false`, only a local projen task is created, which can be executed manually to
   * upgrade the dependencies.
   *
   * @default - true for root projects, false for sub-projects.
   */
  readonly workflow?: boolean;

  /**
   * Options for the github workflow. Only applies if `workflow` is true.
   *
   * @default - default options.
   */
  readonly workflowOptions?: UpgradeDependenciesWorkflowOptions;

  /**
   * The name of the task that will be created.
   * This will also be the workflow name.
   *
   * @default "upgrade".
   */
  readonly taskName?: string;

  /**
   * Title of the pull request to use (should be all lower-case).
   *
   * @default "upgrade dependencies"
   */
  readonly pullRequestTitle?: string;

  /**
   * Add Signed-off-by line by the committer at the end of the commit log message.
   *
   * @default true
   */
  readonly signoff?: boolean;
}

/**
 * Upgrade node project dependencies.
 */
export class UpgradeDependencies extends Component {
  /**
   * The workflows that execute the upgrades. One workflow per branch.
   */
  public readonly workflows: GithubWorkflow[] = [];

  private readonly options: UpgradeDependenciesOptions;
  private readonly _project: NodeProject;
  private readonly pullRequestTitle: string;

  /**
   * Container definitions for the upgrade workflow.
   */
  public containerOptions?: ContainerOptions;

  /**
   * The upgrade task.
   */
  public readonly upgradeTask: Task;

  /**
   * A task run after the upgrade task.
   */
  public readonly postUpgradeTask: Task;

  private readonly gitIdentity: GitIdentity;
  private readonly postBuildSteps: JobStep[];

  constructor(project: NodeProject, options: UpgradeDependenciesOptions = {}) {
    super(project);

    this._project = project;
    this.options = options;
    this.pullRequestTitle = options.pullRequestTitle ?? "upgrade dependencies";
    this.gitIdentity =
      options.workflowOptions?.gitIdentity ?? DEFAULT_GITHUB_ACTIONS_USER;
    this.postBuildSteps = [];
    this.containerOptions = options.workflowOptions?.container;
    project.addDevDeps("npm-check-updates@^12");

    this.postUpgradeTask =
      project.tasks.tryFind("post-upgrade") ??
      project.tasks.addTask("post-upgrade", {
        description: "Runs after upgrading dependencies",
      });

    this.upgradeTask = project.addTask(options.taskName ?? "upgrade", {
      // this task should not run in CI mode because its designed to
      // update package.json and lock files.
      env: { CI: "0" },
      description: this.pullRequestTitle,
      steps: { toJSON: () => this.renderTaskSteps() } as any,
    });
    this.upgradeTask.lock(); // this task is a lazy value, so make it readonly

    if (this.upgradeTask && project.github && (options.workflow ?? true)) {
      if (options.workflowOptions?.branches) {
        for (const branch of options.workflowOptions.branches) {
          this.workflows.push(
            this.createWorkflow(this.upgradeTask, project.github, branch)
          );
        }
      } else if (Release.of(project)) {
        const release = Release.of(project)!;
        release._forEachBranch((branch: string) => {
          this.workflows.push(
            this.createWorkflow(this.upgradeTask, project.github!, branch)
          );
        });
      } else {
        // represents the default repository branch.
        // just like not specifying anything.
        const defaultBranch = undefined;
        this.workflows.push(
          this.createWorkflow(this.upgradeTask, project.github, defaultBranch)
        );
      }
    }
  }

  /**
   * Add steps to execute a successful build.
   * @param steps workflow steps
   */
  public addPostBuildSteps(...steps: JobStep[]) {
    this.postBuildSteps.push(...steps);
  }

  private renderTaskSteps(): TaskStep[] {
    const exclude = this.options.exclude ?? [];

    // exclude depedencies that has already version pinned (fully or with patch version) by Projen with ncu (but not package manager upgrade)
    // Getting only unique values through set
    const ncuExcludes = [
      ...new Set(
        this.project.deps.all
          .filter((dep) => dep.version && dep.version[0] !== "^")
          .map((dep) => dep.name)
          .concat(exclude)
      ),
    ];

    const ncuIncludes = this.options.include?.filter(
      (item) => !ncuExcludes.includes(item)
    );

    const includeLength = this.options.include?.length ?? 0;
    const ncuIncludesLength = ncuIncludes?.length ?? 0;

    // If all explicit includes already have version pinned, don't add task.
    // Note that without explicit includes task gets added
    if (includeLength > 0 && ncuIncludesLength === 0) {
      return [{ exec: "echo No dependencies to upgrade." }];
    }

    const steps = new Array<TaskStep>();

    // update npm-check-updates before everything else, in case there is a bug
    // in it or one of its dependencies. This will make upgrade workflows
    // slightly more stable and resilient to upstream changes.
    steps.push({
      exec: this._project.package.renderUpgradePackagesCommand(
        [],
        ["npm-check-updates"]
      ),
    });

    for (const dep of ["dev", "optional", "peer", "prod", "bundle"]) {
      const ncuCommand = [
        "npm-check-updates",
        "--dep",
        dep,
        "--upgrade",
        "--target=minor",
      ];
      // Don't add includes and excludes same time
      if (ncuIncludes) {
        ncuCommand.push(`--filter='${ncuIncludes.join(",")}'`);
      } else if (ncuExcludes.length > 0) {
        ncuCommand.push(`--reject='${ncuExcludes.join(",")}'`);
      }

      steps.push({ exec: ncuCommand.join(" ") });
    }

    // run "yarn/npm install" to update the lockfile and install any deps (such as projen)
    steps.push({ exec: this._project.package.installAndUpdateLockfileCommand });

    // run upgrade command to upgrade transitive deps as well
    steps.push({
      exec: this._project.package.renderUpgradePackagesCommand(
        exclude,
        this.options.include
      ),
    });

    // run "projen" to give projen a chance to update dependencies (it will also run "yarn install")
    steps.push({ exec: this._project.projenCommand });

    steps.push({ spawn: this.postUpgradeTask.name });

    return steps;
  }

  private createWorkflow(
    task: Task,
    github: GitHub,
    branch?: string
  ): GithubWorkflow {
    const schedule =
      this.options.workflowOptions?.schedule ??
      UpgradeDependenciesSchedule.DAILY;

    const workflowName = `${task.name}${
      branch ? `-${branch.replace(/\//g, "-")}` : ""
    }`;
    const workflow = github.addWorkflow(workflowName);
    const triggers: workflows.Triggers = {
      workflowDispatch: {},
      schedule: schedule.cron
        ? schedule.cron.map((e) => ({ cron: e }))
        : undefined,
    };
    workflow.on(triggers);

    const upgrade = this.createUpgrade(task, branch);
    const pr = this.createPr(workflow, upgrade);

    const jobs: Record<string, workflows.Job> = {};
    jobs[upgrade.jobId] = upgrade.job;
    jobs[pr.jobId] = pr.job;

    workflow.addJobs(jobs);
    return workflow;
  }

  private createUpgrade(task: Task, branch?: string): Upgrade {
    const runsOn = this.options.workflowOptions?.runsOn ?? ["ubuntu-latest"];

    // thats all we should need at this stage since all we do is clone.
    // note that this also prevents new code that is introduced in the upgrade
    // to have write access to anything, in case its somehow executed. (for example during build)
    const permissions: workflows.JobPermissions = {
      contents: workflows.JobPermission.READ,
    };

    const steps: workflows.JobStep[] = [
      {
        name: "Checkout",
        uses: "actions/checkout@v3",
        with: branch ? { ref: branch } : undefined,
      },
      ...this._project.renderWorkflowSetup({ mutable: false }),
      {
        name: "Upgrade dependencies",
        run: this._project.runTaskCommand(task),
      },
    ];

    steps.push(...this.postBuildSteps);
    steps.push(
      ...WorkflowActions.createUploadGitPatch({
        stepId: CREATE_PATCH_STEP_ID,
        outputName: PATCH_CREATED_OUTPUT,
      })
    );

    return {
      job: {
        name: "Upgrade",
        container: this.containerOptions,
        permissions: permissions,
        runsOn: runsOn ?? ["ubuntu-latest"],
        steps: steps,
        outputs: {
          [PATCH_CREATED_OUTPUT]: {
            stepId: CREATE_PATCH_STEP_ID,
            outputName: PATCH_CREATED_OUTPUT,
          },
        },
      },
      jobId: "upgrade",
      ref: branch,
    };
  }

  private createPr(workflow: GithubWorkflow, upgrade: Upgrade): PR {
    // default to API access method used by all GitHub workflows, unless a
    // custom one is specified
    const apiAccess =
      this.options.workflowOptions?.projenCredentials ??
      workflow.projenCredentials;
    const token = apiAccess.tokenRef;
    const runsOn = this.options.workflowOptions?.runsOn ?? ["ubuntu-latest"];
    const workflowName = workflow.name;
    const branchName = `github-actions/${workflowName}`;
    const prStepId = "create-pr";

    const title = `chore(deps): ${this.pullRequestTitle}`;
    const description = [
      "Upgrades project dependencies. See details in [workflow run].",
      "",
      `[Workflow Run]: ${RUN_URL}`,
      "",
      "------",
      "",
      `*Automatically created by projen via the "${workflow.name}" workflow*`,
    ].join("\n");

    const committer = `${this.gitIdentity.name} <${this.gitIdentity.email}>`;

    const steps: workflows.JobStep[] = [
      ...apiAccess.setupSteps,
      ...WorkflowActions.checkoutWithPatch({
        token: apiAccess.tokenRef,
        ref: upgrade.ref,
      }),
      ...WorkflowActions.setGitIdentity(this.gitIdentity),
      {
        name: "Create Pull Request",
        id: prStepId,
        uses: "peter-evans/create-pull-request@v3",
        with: {
          // the pr can modify workflow files, so we need to use the custom
          // secret if one is configured.
          token: token,
          "commit-message": `${title}\n\n${description}`,
          branch: branchName,
          title: title,
          labels: this.options.workflowOptions?.labels?.join(",") || undefined,
          assignees:
            this.options.workflowOptions?.assignees?.join(",") || undefined,
          body: description,
          author: committer,
          committer: committer,
          signoff: this.options.signoff ?? true,
        },
      },
    ];

    return {
      job: {
        name: "Create Pull Request",
        if: `\${{ needs.${upgrade.jobId}.outputs.${PATCH_CREATED_OUTPUT} }}`,
        needs: [upgrade.jobId],
        permissions: {
          contents: workflows.JobPermission.WRITE,
          pullRequests: workflows.JobPermission.WRITE,
        },
        runsOn: runsOn ?? ["ubuntu-latest"],
        steps: steps,
      },
      jobId: "pr",
    };
  }
}

interface Upgrade {
  readonly ref?: string;
  readonly job: workflows.Job;
  readonly jobId: string;
}

interface PR {
  readonly job: workflows.Job;
  readonly jobId: string;
}

/**
 * Options for `UpgradeDependencies.workflowOptions`.
 */
export interface UpgradeDependenciesWorkflowOptions {
  /**
   * Schedule to run on.
   *
   * @default UpgradeDependenciesSchedule.DAILY
   */
  readonly schedule?: UpgradeDependenciesSchedule;

  /**
   * Choose a method for authenticating with GitHub for creating the PR.
   *
   * When using the default github token, PR's created by this workflow
   * will not trigger any subsequent workflows (i.e the build workflow), so
   * projen requires API access to be provided through e.g. a personal
   * access token or other method.
   *
   * @see https://github.com/peter-evans/create-pull-request/issues/48
   * @default - personal access token named PROJEN_GITHUB_TOKEN
   */
  readonly projenCredentials?: GithubCredentials;

  /**
   * Labels to apply on the PR.
   *
   * @default - no labels.
   */
  readonly labels?: string[];

  /**
   * Assignees to add on the PR.
   *
   * @default - no assignees
   */
  readonly assignees?: string[];

  /**
   * Job container options.
   *
   * @default - defaults
   */
  readonly container?: workflows.ContainerOptions;

  /**
   * List of branches to create PR's for.
   *
   * @default - All release branches configured for the project.
   */
  readonly branches?: string[];

  /**
   * The git identity to use for commits.
   * @default "github-actions@github.com"
   */
  readonly gitIdentity?: GitIdentity;

  /**
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   */
  readonly runsOn?: string[];
}

/**
 * How often to check for new versions and raise pull requests for version upgrades.
 */
export class UpgradeDependenciesSchedule {
  /**
   * Disables automatic upgrades.
   */
  public static readonly NEVER = new UpgradeDependenciesSchedule([]);

  /**
   * At 00:00.
   */
  public static readonly DAILY = new UpgradeDependenciesSchedule(["0 0 * * *"]);

  /**
   * At 00:00 on every day-of-week from Monday through Friday.
   */
  public static readonly WEEKDAY = new UpgradeDependenciesSchedule([
    "0 0 * * 1-5",
  ]);

  /**
   * At 00:00 on Monday.
   */
  public static readonly WEEKLY = new UpgradeDependenciesSchedule([
    "0 0 * * 1",
  ]);

  /**
   * At 00:00 on day-of-month 1.
   */
  public static readonly MONTHLY = new UpgradeDependenciesSchedule([
    "0 0 1 * *",
  ]);

  /**
   * Create a schedule from a raw cron expression.
   */
  public static expressions(cron: string[]) {
    return new UpgradeDependenciesSchedule(cron);
  }

  private constructor(public readonly cron: string[]) {}
}
