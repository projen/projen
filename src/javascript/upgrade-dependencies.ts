import { Component } from "../component";
import { DependencyType } from "../dependencies";
import {
  GithubCredentials,
  GitHub,
  GithubWorkflow,
  GitIdentity,
  workflows,
  WorkflowJobs,
  WorkflowSteps,
} from "../github";
import { DEFAULT_GITHUB_ACTIONS_USER } from "../github/constants";
import { WorkflowActions } from "../github/workflow-actions";
import {
  ContainerOptions,
  JobStep,
  JobPermission,
  JobPermissions,
} from "../github/workflows-model";
import { NodePackageManager, NodeProject } from "../javascript";
import { Release } from "../release";
import { GroupRunnerOptions, filteredRunsOnOptions } from "../runner-options";
import { Task } from "../task";
import { TaskStep } from "../task-model";

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
   * Determines the target version to upgrade dependencies to.
   *
   * @see https://github.com/raineorshine/npm-check-updates#target
   *
   * @default "minor"
   */
  readonly target?: string;

  /**
   * Check peer dependencies of installed packages and filter updates to compatible versions.
   *
   * By default, the upgrade workflow will adhere to version constraints from peer dependencies.
   * Sometimes this is not desirable and can be disabled.
   *
   * @see https://github.com/raineorshine/npm-check-updates#peer
   *
   * @default true
   */
  readonly satisfyPeerDependencies?: boolean;

  /**
   * Include deprecated packages.
   *
   * By default, deprecated versions will be excluded from upgrades.
   *
   * @see https://github.com/raineorshine/npm-check-updates?tab=readme-ov-file#options
   *
   * @default false
   */
  readonly includeDeprecatedVersions?: boolean;

  /**
   * Include a github workflow for creating PR's that upgrades the
   * required dependencies, either by manual dispatch, or by a schedule.
   *
   * If this is `false`, only a local projen task is created, which can be executed manually to
   * upgrade the dependencies.
   *
   * @default - true for root projects, false for subprojects.
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
   * The semantic commit type.
   *
   * @default 'chore'
   */
  readonly semanticCommit?: string;

  /**
   * Add Signed-off-by line by the committer at the end of the commit log message.
   *
   * @default true
   */
  readonly signoff?: boolean;

  /**
   * Specify which dependency types the upgrade should operate on.
   *
   * @default - All dependency types.
   */
  readonly types?: DependencyType[];

  /**
   * Whether to upgrade transitive dependencies.
   *
   * When enabled, the upgrade process will use the package manager's upgrade command
   * to update transitive dependencies. When disabled, only direct dependencies are
   * upgraded using npm-check-updates with the --install=always flag.
   *
   * @default true
   */
  readonly upgradeTransitiveDependencies?: boolean;
}

/**
 * Upgrade node project dependencies.
 */
export class UpgradeDependencies extends Component {
  /**
   * The workflows that execute the upgrades. One workflow per branch.
   */
  public readonly workflows: GithubWorkflow[] = [];

  public readonly project: NodeProject;

  private readonly options: UpgradeDependenciesOptions;
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
  private readonly permissions: JobPermissions;
  private readonly depTypes: DependencyType[];
  private readonly upgradeTarget: string;
  private readonly satisfyPeerDependencies: boolean;
  private readonly includeDeprecatedVersions: boolean;
  private readonly upgradeTransitiveDependencies: boolean;

  constructor(project: NodeProject, options: UpgradeDependenciesOptions = {}) {
    super(project);

    this.project = project;
    this.options = options;
    this.depTypes = this.options.types ?? [
      DependencyType.BUILD,
      DependencyType.BUNDLED,
      DependencyType.DEVENV,
      DependencyType.PEER,
      DependencyType.RUNTIME,
      DependencyType.TEST,
      DependencyType.OPTIONAL,
    ];
    this.upgradeTarget = this.options.target ?? "minor";
    this.satisfyPeerDependencies = this.options.satisfyPeerDependencies ?? true;
    this.includeDeprecatedVersions =
      this.options.includeDeprecatedVersions ?? false;
    this.upgradeTransitiveDependencies =
      this.options.upgradeTransitiveDependencies ?? true;
    this.pullRequestTitle = options.pullRequestTitle ?? "upgrade dependencies";
    this.gitIdentity =
      options.workflowOptions?.gitIdentity ?? DEFAULT_GITHUB_ACTIONS_USER;
    this.permissions = {
      contents: JobPermission.READ,
      ...options.workflowOptions?.permissions,
    };
    this.postBuildSteps = [];
    this.containerOptions = options.workflowOptions?.container;

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

  /**
   * Build npm-check-updates command with common options.
   */
  private buildNcuCommand(
    includePackages: string[],
    options: {
      upgrade?: boolean;
      target?: string;
      install?: boolean;
    } = {}
  ): string {
    function executeCommand(packageManager: NodePackageManager): string {
      switch (packageManager) {
        case NodePackageManager.NPM:
        case NodePackageManager.YARN:
        case NodePackageManager.YARN_CLASSIC:
          return "npx";
        case NodePackageManager.PNPM:
          return "pnpm dlx";
        case NodePackageManager.YARN2:
        case NodePackageManager.YARN_BERRY:
          return "yarn dlx";
        case NodePackageManager.BUN:
          return "bunx";
      }
    }

    const command = [
      `${executeCommand(
        this.project.package.packageManager
      )} npm-check-updates@18`,
    ];

    if (options.upgrade) {
      command.push("--upgrade");
    }

    if (options.target) {
      command.push(`--target=${options.target}`);
    }

    if (options.install) {
      command.push("--install=always");
    }

    command.push(
      `--${this.satisfyPeerDependencies ? "peer" : "no-peer"}`,
      `--${this.includeDeprecatedVersions ? "deprecated" : "no-deprecated"}`,
      `--dep=${this.renderNcuDependencyTypes(this.depTypes)}`,
      `--filter=${includePackages.join(",")}`
    );

    return command.join(" ");
  }

  private renderTaskSteps(): TaskStep[] {
    const steps = new Array<TaskStep>();

    // Package Manager upgrade should always include all deps
    const includeForPackageManagerUpgrade = this.buildDependencyList(true);
    if (includeForPackageManagerUpgrade.length === 0) {
      return [{ exec: "echo No dependencies to upgrade." }];
    }

    // Removing `npm-check-updates` from our dependency tree because it depends on a package
    // that uses an npm-specific feature that causes an invalid dependency tree when using Yarn 1.
    // See https://github.com/projen/projen/pull/3136 for more details.
    const includeForNcu = this.buildDependencyList(false);

    // bump versions in package.json
    if (includeForNcu.length) {
      steps.push({
        exec: this.buildNcuCommand(includeForNcu, {
          upgrade: true,
          target: this.upgradeTarget,
          install: !this.upgradeTransitiveDependencies,
        }),
      });
    }

    // run "yarn/npm install" to update the lockfile and install any deps (such as projen)
    // skip if ncu handles installation via --install=always
    if (this.upgradeTransitiveDependencies) {
      steps.push({
        exec: this.project.package.installAndUpdateLockfileCommand,
      });
    }

    // run upgrade command to upgrade transitive deps as well
    if (this.upgradeTransitiveDependencies) {
      steps.push({
        exec: this.renderUpgradePackagesCommand(
          includeForPackageManagerUpgrade
        ),
      });
    }

    // run "projen" to give projen a chance to update dependencies (it will also run "yarn install")
    steps.push({ exec: this.project.projenCommand });
    steps.push({ spawn: this.postUpgradeTask.name });

    return steps;
  }

  /**
   * Render projen dependencies types to a list of ncu compatible types
   */
  private renderNcuDependencyTypes(types: DependencyType[]) {
    return Array.from(
      new Set(
        types
          .map((type) => {
            switch (type) {
              case DependencyType.PEER:
                return "peer";
              case DependencyType.RUNTIME:
                return "prod";
              case DependencyType.OPTIONAL:
                return "optional";

              case DependencyType.TEST:
              case DependencyType.DEVENV:
              case DependencyType.BUILD:
                return "dev";

              case DependencyType.BUNDLED:
              default:
                return false;
            }
          })
          .filter((type) => Boolean(type))
      )
    ).join(",");
  }

  /**
   * Render a package manager specific command to upgrade all requested dependencies.
   */
  private renderUpgradePackagesCommand(include: string[]): string {
    function upgradePackages(command: string) {
      return () => {
        return `${command} ${include.join(" ")}`;
      };
    }

    const packageManager = this.project.package.packageManager;

    let lazy = undefined;
    switch (packageManager) {
      case NodePackageManager.YARN:
      case NodePackageManager.YARN_CLASSIC:
        lazy = upgradePackages("yarn upgrade");
        break;
      case NodePackageManager.YARN2:
      case NodePackageManager.YARN_BERRY:
        lazy = upgradePackages("yarn up");
        break;
      case NodePackageManager.NPM:
        lazy = upgradePackages("npm update");
        break;
      case NodePackageManager.PNPM:
        lazy = upgradePackages("pnpm update");
        break;
      case NodePackageManager.BUN:
        lazy = upgradePackages("bun update");
        break;
      default:
        throw new Error(`unexpected package manager ${packageManager}`);
    }

    // return a lazy function so that dependencies include ones that were
    // added post project instantiation (i.e using project.addDeps)
    return lazy as unknown as string;
  }

  private buildDependencyList(includeDependenciesWithConstraint: boolean) {
    return Array.from(
      new Set(
        this.options.include ??
          this.filterDependencies(includeDependenciesWithConstraint)
      )
    );
  }

  private filterDependencies(includeConstraint: boolean): string[] {
    const dependencies = [];

    const deps = this.project.deps.all
      // remove those that have a constraint version (unless includeConstraint is true)
      .filter(
        (d) =>
          includeConstraint || this.packageCanBeUpgradedInPackageJson(d.version)
      )
      // remove override dependencies
      .filter((d) => d.type !== DependencyType.OVERRIDE);

    for (const type of this.depTypes) {
      dependencies.push(
        ...deps
          .filter((d) => d.type === type)
          .filter((d) => !(this.options.exclude ?? []).includes(d.name))
      );
    }

    return dependencies.map((d) => d.name);
  }

  /**
   * Projen can alter a package's version in package.json when either the version is omitted, or set to "*".
   * Otherwise, the exact version selected is placed in the package.json file and upgrading is handled through the package manager
   * rather than npm-check-updates.
   *
   * @param version semver from DependencyCoordinates.version, may be undefined
   * @returns whether the version is the default versioning behavior
   */
  private packageCanBeUpgradedInPackageJson(
    version: string | undefined
  ): boolean {
    // No version means "latest"
    return !version || version === "*";
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
      schedule:
        schedule.cron.length > 0
          ? schedule.cron.map((e) => ({ cron: e }))
          : undefined,
    };
    workflow.on(triggers);

    const upgrade = this.createUpgrade(task, github, branch);
    const pr = this.createPr(workflow, upgrade);

    const jobs: Record<string, workflows.Job> = {};
    jobs[upgrade.jobId] = upgrade.job;
    jobs[pr.jobId] = pr.job;

    workflow.addJobs(jobs);
    return workflow;
  }

  private createUpgrade(task: Task, github: GitHub, branch?: string): Upgrade {
    const with_ = {
      ...(branch ? { ref: branch } : {}),
      ...(github.downloadLfs ? { lfs: true } : {}),
    };

    const steps: workflows.JobStep[] = [
      WorkflowSteps.checkout({ with: with_ }),
      ...this.project.renderWorkflowSetup({ mutable: false }),
      {
        name: "Upgrade dependencies",
        run: this.project.runTaskCommand(task),
      },
    ];

    steps.push(...this.postBuildSteps);
    steps.push(
      ...WorkflowActions.uploadGitPatch({
        stepId: CREATE_PATCH_STEP_ID,
        outputName: PATCH_CREATED_OUTPUT,
      })
    );

    return {
      job: {
        name: "Upgrade",
        container: this.containerOptions,
        permissions: this.permissions,
        env: this.options.workflowOptions?.env,
        ...filteredRunsOnOptions(
          this.options.workflowOptions?.runsOn,
          this.options.workflowOptions?.runsOnGroup
        ),
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
    const credentials =
      this.options.workflowOptions?.projenCredentials ??
      workflow.projenCredentials;

    const semanticCommit = this.options.semanticCommit ?? "chore";

    return {
      job: WorkflowJobs.pullRequestFromPatch({
        patch: {
          jobId: upgrade.jobId,
          outputName: PATCH_CREATED_OUTPUT,
          ref: upgrade.ref,
        },
        workflowName: workflow.name,
        credentials,
        ...filteredRunsOnOptions(
          this.options.workflowOptions?.runsOn,
          this.options.workflowOptions?.runsOnGroup
        ),
        pullRequestTitle: `${semanticCommit}(deps): ${this.pullRequestTitle}`,
        pullRequestDescription: "Upgrades project dependencies.",
        gitIdentity: this.gitIdentity,
        assignees: this.options.workflowOptions?.assignees,
        labels: this.options.workflowOptions?.labels,
        signoff: this.options.signoff,
      }),
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
   * @default - default GitHub Actions user
   */
  readonly gitIdentity?: GitIdentity;

  /**
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   * @description Defines a target Runner by labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly runsOn?: string[];

  /**
   * Github Runner Group selection options
   * @description Defines a target Runner Group by name and/or labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly runsOnGroup?: GroupRunnerOptions;

  /**
   * Permissions granted to the upgrade job
   * To limit job permissions for `contents`, the desired permissions have to be explicitly set, e.g.: `{ contents: JobPermission.NONE }`
   * @default `{ contents: JobPermission.READ }`
   */
  readonly permissions?: JobPermissions;

  /**
   * Build environment variables for the upgrade job.
   *
   * @default {}
   */
  readonly env?: { [key: string]: string };
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
