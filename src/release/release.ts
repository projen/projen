import * as posixPath from "node:path/posix";
import { IConstruct } from "constructs";
import { Publisher } from "./publisher";
import { ReleaseTrigger } from "./release-trigger";
import { DEFAULT_ARTIFACTS_DIRECTORY } from "../build/private/consts";
import { Component } from "../component";
import {
  GitHub,
  GithubWorkflow,
  TaskWorkflowJob,
  WorkflowSteps,
} from "../github";
import {
  BUILD_ARTIFACT_NAME,
  PERMISSION_BACKUP_FILE,
} from "../github/constants";
import {
  ensureNotHiddenPath,
  projectPathRelativeToRepoRoot,
} from "../github/private/util";
import {
  Job,
  JobPermission,
  JobPermissions,
  JobStep,
} from "../github/workflows-model";
import { Project } from "../project";
import {
  GroupRunnerOptions,
  filteredRunsOnOptions,
  filteredWorkflowRunsOnOptions,
} from "../runner-options";
import { Task } from "../task";
import { workflowNameForProject } from "../util/name";
import { ReleasableCommits, Version } from "../version";

const BUILD_JOBID = "release";
const GIT_REMOTE_STEPID = "git_remote";
const TAG_EXISTS_STEPID = "check_tag_exists";

const LATEST_COMMIT_OUTPUT = "latest_commit";
const TAG_EXISTS_OUTPUT = "tag_exists";

/**
 * Conditional (Github Workflow Job `if`) to check if a release job should be run.
 */
const DEPENDENT_JOB_CONDITIONAL = `needs.${BUILD_JOBID}.outputs.${TAG_EXISTS_OUTPUT} != 'true' && needs.${BUILD_JOBID}.outputs.${LATEST_COMMIT_OUTPUT} == github.sha`;

type BranchHook = (branch: string) => void;

/**
 * Project options for release.
 */
export interface ReleaseProjectOptions {
  /**
   * Automatically release new versions every commit to one of branches in `releaseBranches`.
   *
   * @default true
   *
   * @deprecated Use `releaseTrigger: ReleaseTrigger.continuous()` instead
   */
  readonly releaseEveryCommit?: boolean;

  /**
   * CRON schedule to trigger new releases.
   *
   * @default - no scheduled releases
   *
   * @deprecated Use `releaseTrigger: ReleaseTrigger.scheduled()` instead
   */
  readonly releaseSchedule?: string;

  /**
   * The release trigger to use.
   *
   * @default - Continuous releases (`ReleaseTrigger.continuous()`)
   */
  readonly releaseTrigger?: ReleaseTrigger;

  /**
   * A set of workflow steps to execute in order to setup the workflow
   * container.
   */
  readonly releaseWorkflowSetupSteps?: JobStep[];

  /**
   * Container image to use for GitHub workflows.
   *
   * @default - default image
   */
  readonly workflowContainerImage?: string;

  /**
   * Version requirement of `publib` which is used to publish modules to npm.
   * @default "latest"
   */
  readonly jsiiReleaseVersion?: string;

  /**
   * Steps to execute after build as part of the release workflow.
   * @default []
   */
  readonly postBuildSteps?: JobStep[];

  /**
   * Major version to release from the default branch.
   *
   * If this is specified, we bump the latest version of this major version line.
   * If not specified, we bump the global latest version.
   *
   * @default - Major version is not enforced.
   */
  readonly majorVersion?: number;

  /**
   * Minimal Major version to release
   *
   *
   * This can be useful to set to 1, as breaking changes before the 1.x major
   * release are not incrementing the major version number.
   *
   * Can not be set together with `majorVersion`.
   *
   * @default - No minimum version is being enforced
   */
  readonly minMajorVersion?: number;

  /**
   * Bump versions from the default branch as pre-releases (e.g. "beta",
   * "alpha", "pre").
   *
   * @default - normal semantic versions
   */
  readonly prerelease?: string;

  /**
   * The npmDistTag to use when publishing from the default branch.
   *
   * To set the npm dist-tag for release branches, set the `npmDistTag` property
   * for each branch.
   *
   * @default "latest"
   */
  readonly npmDistTag?: string;

  /**
   * The name of the default release workflow.
   *
   * @default "release"
   */
  readonly releaseWorkflowName?: string;

  /**
   * The GitHub Actions environment used for the release.
   *
   * This can be used to add an explicit approval step to the release
   * or limit who can initiate a release through environment protection rules.
   *
   * When multiple artifacts are released, the environment can be overwritten
   * on a per artifact basis.
   *
   * @default - no environment used, unless set at the artifact level
   */
  readonly releaseEnvironment?: string;

  /**
   * Defines additional release branches. A workflow will be created for each
   * release branch which will publish releases from commits in this branch.
   * Each release branch _must_ be assigned a major version number which is used
   * to enforce that versions published from that branch always use that major
   * version. If multiple branches are used, the `majorVersion` field must also
   * be provided for the default branch.
   *
   * @default - no additional branches are used for release. you can use
   * `addBranch()` to add additional branches.
   */
  readonly releaseBranches?: { [name: string]: BranchOptions };

  /**
   * Create a github issue on every failed publishing task.
   *
   * @default false
   */
  readonly releaseFailureIssue?: boolean;

  /**
   * The label to apply to issues indicating publish failures.
   * Only applies if `releaseFailureIssue` is true.
   *
   * @default "failed-release"
   */
  readonly releaseFailureIssueLabel?: string;

  /**
   * Automatically add the given prefix to release tags.
   * Useful if you are releasing on multiple branches with overlapping
   * version numbers.
   *
   * Note: this prefix is used to detect the latest tagged version
   * when bumping, so if you change this on a project with an existing version
   * history, you may need to manually tag your latest release
   * with the new prefix.
   *
   * @default "v"
   */
  readonly releaseTagPrefix?: string;

  /**
   * Custom configuration used when creating changelog with commit-and-tag-version package.
   * Given values either append to default configuration or overwrite values in it.
   *
   * @default - standard configuration applicable for GitHub repositories
   */
  readonly versionrcOptions?: Record<string, any>;

  /**
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   * @description Defines a target Runner by labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly workflowRunsOn?: string[];

  /**
   * Github Runner Group selection options
   * @description Defines a target Runner Group by name and/or labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly workflowRunsOnGroup?: GroupRunnerOptions;

  /**
   * Define publishing tasks that can be executed manually as well as workflows.
   *
   * Normally, publishing only happens within automated workflows. Enable this
   * in order to create a publishing task for each publishing activity.
   *
   * @default false
   */
  readonly publishTasks?: boolean;

  /**
   * Instead of actually publishing to package managers, just print the publishing command.
   *
   * @default false
   */
  readonly publishDryRun?: boolean;

  /**
   * Find commits that should be considered releasable
   * Used to decide if a release is required.
   *
   * @default ReleasableCommits.everyCommit()
   */
  readonly releasableCommits?: ReleasableCommits;

  /**
   * Build environment variables for release workflows.
   *
   * @default {}
   */
  readonly releaseWorkflowEnv?: { [key: string]: string };

  /**
   * The `commit-and-tag-version` compatible package used to bump the package version, as a dependency string.
   *
   * This can be any compatible package version, including the deprecated `standard-version@9`.
   *
   * @default - A recent version of "commit-and-tag-version"
   */
  readonly bumpPackage?: string;

  /**
   * A shell command to control the next version to release.
   *
   * If present, this shell command will be run before the bump is executed, and
   * it determines what version to release. It will be executed in the following
   * environment:
   *
   * - Working directory: the project directory.
   * - `$VERSION`: the current version. Looks like `1.2.3`.
   * - `$LATEST_TAG`: the most recent tag. Looks like `prefix-v1.2.3`, or may be unset.
   * - `$SUGGESTED_BUMP`: the suggested bump action based on commits. One of `major|minor|patch|none`.
   *
   * The command should print one of the following to `stdout`:
   *
   * - Nothing: the next version number will be determined based on commit history.
   * - `x.y.z`: the next version number will be `x.y.z`.
   * - `major|minor|patch`: the next version number will be the current version number
   *   with the indicated component bumped.
   *
   * This setting cannot be specified together with `minMajorVersion`; the invoked
   * script can be used to achieve the effects of `minMajorVersion`.
   *
   * @default - The next version will be determined based on the commit history and project settings.
   */
  readonly nextVersionCommand?: string;
}

/**
 * Options for `Release`.
 */
export interface ReleaseOptions extends ReleaseProjectOptions {
  /**
   * The task to execute in order to create the release artifacts. Artifacts are
   * expected to reside under `artifactsDirectory` (defaults to `dist/`) once
   * build is complete.
   *
   * @deprecated Use `tasks` instead
   */
  readonly task?: Task;

  /**
   * The tasks to execute in order to create the release artifacts. Artifacts are
   * expected to reside under `artifactsDirectory` (defaults to `dist/`) once
   * build is complete.
   */
  readonly tasks?: Task[];

  /**
   * A name of a .json file to set the `version` field in after a bump.
   *
   * @example "package.json"
   */
  readonly versionFile: string;

  /**
   * The default branch name to release from.
   *
   * Use `majorVersion` to restrict this branch to only publish releases with a
   * specific major version.
   *
   * You can add additional branches using `addBranch()`.
   */
  readonly branch: string;

  /**
   * Create a GitHub release for each release.
   *
   * @default true
   */
  readonly githubRelease?: boolean;

  /**
   * A directory which will contain build artifacts.
   *
   * @default "dist"
   */
  readonly artifactsDirectory: string;

  /**
   * Node version to setup in GitHub workflows if any node-based CLI utilities
   * are needed. For example `publib`, the CLI projen uses to publish releases,
   * is an npm library.
   *
   * @default "lts/*""
   */
  readonly workflowNodeVersion?: string;

  /**
   * Permissions granted to the release workflow job
   * @default `{ contents: JobPermission.WRITE }`
   */
  readonly workflowPermissions?: JobPermissions;
}

/**
 * Manages releases (currently through GitHub workflows).
 *
 * By default, no branches are released. To add branches, call `addBranch()`.
 */
export class Release extends Component {
  public static readonly ANTI_TAMPER_CMD =
    "git diff --ignore-space-at-eol --exit-code";

  /**
   * Returns the `Release` component of a project or `undefined` if the project
   * does not have a Release component.
   */
  public static of(project: Project): Release | undefined {
    const isRelease = (c: Component): c is Release => c instanceof Release;
    return project.components.find(isRelease);
  }

  /**
   * Package publisher.
   */
  public readonly publisher: Publisher;

  /**
   * Location of build artifacts.
   */
  public readonly artifactsDirectory: string;

  private readonly buildTasks: Task[];
  private readonly version: Version;
  private readonly postBuildSteps: JobStep[];
  private readonly versionFile: string;
  private readonly releaseTrigger: ReleaseTrigger;
  private readonly preBuildSteps: JobStep[];
  private readonly containerImage?: string;
  private readonly _branches = new Array<ReleaseBranch>();
  private readonly jobs: Record<string, Job> = {};
  private readonly defaultBranch: ReleaseBranch;
  private readonly github?: GitHub;
  private readonly workflowRunsOn?: string[];
  private readonly workflowRunsOnGroup?: GroupRunnerOptions;
  private readonly workflowPermissions: JobPermissions;
  private readonly releaseWorkflowEnv?: { [key: string]: string };
  private readonly releaseTagFilePath: string;
  private readonly _branchHooks: BranchHook[];

  /**
   * @param scope should be part of the project the Release belongs to.
   * @param options options to configure the Release Component.
   */
  constructor(scope: IConstruct, options: ReleaseOptions) {
    super(scope);

    if (Array.isArray(options.releaseBranches)) {
      throw new Error(
        '"releaseBranches" is no longer an array. See type annotations'
      );
    }

    this.github = GitHub.of(this.project.root);

    // Handle both deprecated task and new tasks options
    if (options.tasks) {
      this.buildTasks = options.tasks;
    } else if (options.task) {
      this.buildTasks = [options.task];
    } else {
      throw new Error(
        "Either 'tasks' or 'task' must be provided, but not both."
      );
    }

    this.preBuildSteps = options.releaseWorkflowSetupSteps ?? [];
    this.postBuildSteps = options.postBuildSteps ?? [];
    this.artifactsDirectory =
      options.artifactsDirectory ?? DEFAULT_ARTIFACTS_DIRECTORY;
    ensureNotHiddenPath(this.artifactsDirectory, "artifactsDirectory");
    this.versionFile = options.versionFile;
    this.releaseTrigger = options.releaseTrigger ?? ReleaseTrigger.continuous();
    this.containerImage = options.workflowContainerImage;
    this.workflowRunsOn = options.workflowRunsOn;
    this.workflowRunsOnGroup = options.workflowRunsOnGroup;
    this.workflowPermissions = {
      contents: JobPermission.WRITE,
      ...options.workflowPermissions,
    };
    this.releaseWorkflowEnv = options.releaseWorkflowEnv;
    this._branchHooks = [];

    /**
     * Use manual releases with no changelog if releaseEveryCommit is explicitly
     * disabled and no other trigger is set.
     *
     * TODO: Remove this when releaseEveryCommit and releaseSchedule are removed
     */
    if (
      !(
        (options.releaseEveryCommit ?? true) ||
        options.releaseSchedule ||
        options.releaseTrigger
      )
    ) {
      this.releaseTrigger = ReleaseTrigger.manual({ changelog: false });
    }

    if (options.releaseSchedule) {
      this.releaseTrigger = ReleaseTrigger.scheduled({
        schedule: options.releaseSchedule,
      });
    }

    this.version = new Version(this.project, {
      versionInputFile: this.versionFile,
      artifactsDirectory: this.artifactsDirectory,
      versionrcOptions: options.versionrcOptions,
      tagPrefix: options.releaseTagPrefix,
      releasableCommits: options.releasableCommits,
      bumpPackage: options.bumpPackage,
      nextVersionCommand: options.nextVersionCommand,
    });

    this.releaseTagFilePath = posixPath.normalize(
      posixPath.join(this.artifactsDirectory, this.version.releaseTagFileName)
    );

    this.publisher = new Publisher(this.project, {
      artifactName: this.artifactsDirectory,
      condition: DEPENDENT_JOB_CONDITIONAL,
      buildJobId: BUILD_JOBID,
      jsiiReleaseVersion: options.jsiiReleaseVersion,
      failureIssue: options.releaseFailureIssue,
      failureIssueLabel: options.releaseFailureIssueLabel,
      ...filteredWorkflowRunsOnOptions(
        options.workflowRunsOn,
        options.workflowRunsOnGroup
      ),
      publishTasks: options.publishTasks,
      dryRun: options.publishDryRun,
      workflowNodeVersion: options.workflowNodeVersion,
      workflowContainerImage: options.workflowContainerImage,
    });

    const githubRelease = options.githubRelease ?? true;
    if (githubRelease) {
      this.publisher.publishToGitHubReleases({
        changelogFile: posixPath.join(
          this.artifactsDirectory,
          this.version.changelogFileName
        ),
        versionFile: posixPath.join(
          this.artifactsDirectory,
          this.version.versionFileName
        ),
        releaseTagFile: posixPath.join(
          this.artifactsDirectory,
          this.version.releaseTagFileName
        ),
      });
    }

    // add the default branch (we need the internal method which does not require majorVersion)
    this.defaultBranch = this._addBranch(options.branch, {
      prerelease: options.prerelease,
      majorVersion: options.majorVersion,
      minMajorVersion: options.minMajorVersion,
      workflowName:
        options.releaseWorkflowName ??
        workflowNameForProject("release", this.project),
      environment: options.releaseEnvironment,
      tagPrefix: options.releaseTagPrefix,
      npmDistTag: options.npmDistTag,
    });

    for (const [name, opts] of Object.entries(options.releaseBranches ?? {})) {
      this.addBranch(name, {
        environment: options.releaseEnvironment,
        ...opts,
      });
    }
  }

  /**
   * Add a hook that should be run for every branch (including those that will
   * be added by future `addBranch` calls).
   * @internal
   */
  public _forEachBranch(hook: BranchHook) {
    for (const branch of this._branches) {
      hook(branch.name);
    }
    this._branchHooks.push(hook);
  }

  /**
   * Adds a release branch.
   *
   * It is a git branch from which releases are published. If a project has more than one release
   * branch, we require that `majorVersion` is also specified for the primary branch in order to
   * ensure branches always release the correct version.
   *
   * @param branch The branch to monitor (e.g. `main`, `v2.x`)
   * @param options Branch definition
   */
  public addBranch(branch: string, options: BranchOptions) {
    this._addBranch(branch, options);

    // run all branch hooks
    for (const hook of this._branchHooks) {
      hook(branch);
    }
  }

  /**
   * Adds a release branch.
   *
   * It is a git branch from which releases are published. If a project has more than one release
   * branch, we require that `majorVersion` is also specified for the primary branch in order to
   * ensure branches always release the correct version.
   *
   * @param branch The branch to monitor (e.g. `main`, `v2.x`)
   * @param options Branch definition
   */
  private _addBranch(
    branch: string,
    options: Partial<BranchOptions>
  ): ReleaseBranch {
    if (this._branches.find((b) => b.name === branch)) {
      throw new Error(`The release branch ${branch} is already defined`);
    }

    // if we add a branch, we require that the default branch will also define a
    // major version.
    if (
      this.defaultBranch &&
      options.majorVersion &&
      this.defaultBranch.majorVersion === undefined
    ) {
      throw new Error(
        'you must specify "majorVersion" for the default branch when adding multiple release branches'
      );
    }

    const releaseBranch: ReleaseBranch = {
      name: branch,
      ...options,
      workflow: this.createWorkflow(branch, options),
    };

    this._branches.push(releaseBranch);

    return releaseBranch;
  }

  public preSynthesize() {
    for (const branch of this._branches) {
      if (!branch.workflow) {
        continue;
      }

      branch.workflow.addJobs(
        this.publisher._renderJobsForBranch(branch.name, branch)
      );
      branch.workflow.addJobs(this.jobs);
    }
  }

  /**
   * Adds jobs to all release workflows.
   * @param jobs The jobs to add (name => job)
   */
  public addJobs(jobs: Record<string, Job>) {
    for (const [name, job] of Object.entries(jobs)) {
      this.jobs[name] = job;
    }
  }

  /**
   * Retrieve all release branch names
   */
  public get branches(): string[] {
    return this._branches.map((b) => b.name);
  }

  /**
   * @returns a workflow or `undefined` if github integration is disabled.
   */
  private createWorkflow(
    branchName: string,
    branch: Partial<BranchOptions>
  ): GithubWorkflow | undefined {
    const workflowName =
      branch.workflowName ??
      workflowNameForProject(`release-${branchName}`, this.project);

    // to avoid race conditions between two commits trying to release the same
    // version, we check if the head sha is identical to the remote sha. if
    // not, we will skip the release and just finish the build.
    const noNewCommits = `\${{ steps.${GIT_REMOTE_STEPID}.outputs.${LATEST_COMMIT_OUTPUT} == github.sha }}`;

    // The arrays are being cloned to avoid accumulating values from previous branches
    const preBuildSteps = [...this.preBuildSteps];

    const env: Record<string, string> = {
      RELEASE: "true",
      ...this.version.envForBranch({
        majorVersion: branch.majorVersion,
        minorVersion: branch.minorVersion,
        minMajorVersion: branch.minMajorVersion,
        prerelease: branch.prerelease,
        tagPrefix: branch.tagPrefix,
      }),
    };

    // the "release" task prepares a release but does not publish anything. the
    // output of the release task is: `dist`, `.version.txt`, and
    // `.changelog.md`. this is what publish tasks expect.

    // if this is the release for "main" or "master", just call it "release".
    // otherwise, "release:BRANCH"
    const releaseTaskName =
      branchName === "main" || branchName === "master"
        ? "release"
        : `release:${branchName}`;
    const releaseTask = this.project.addTask(releaseTaskName, {
      description: `Prepare a release from "${branchName}" branch`,
      env,
    });

    releaseTask.exec(`rm -fr ${this.artifactsDirectory}`);
    releaseTask.spawn(this.version.bumpTask);

    // Spawn all build tasks
    for (const buildTask of this.buildTasks) {
      releaseTask.spawn(buildTask);
    }

    releaseTask.spawn(this.version.unbumpTask);

    // anti-tamper check (fails if there were changes to committed files)
    // this will identify any non-committed files generated during build (e.g. test snapshots)
    releaseTask.exec(Release.ANTI_TAMPER_CMD);

    if (this.releaseTrigger.isManual) {
      const publishTask = this.publisher.publishToGit({
        changelogFile: posixPath.join(
          this.artifactsDirectory,
          this.version.changelogFileName
        ),
        versionFile: posixPath.join(
          this.artifactsDirectory,
          this.version.versionFileName
        ),
        releaseTagFile: posixPath.join(
          this.artifactsDirectory,
          this.version.releaseTagFileName
        ),
        projectChangelogFile: this.releaseTrigger.changelogPath,
        gitBranch: branchName,
        gitPushCommand: this.releaseTrigger.gitPushCommand,
      });

      releaseTask.spawn(publishTask);
    }

    const postBuildSteps = [...this.postBuildSteps];

    // Read the releasetag, then check if it already exists.
    // If it does, we will cancel this release
    postBuildSteps.push(
      WorkflowSteps.tagExists(`$(cat ${this.releaseTagFilePath})`, {
        name: "Check if version has already been tagged",
        id: TAG_EXISTS_STEPID,
      })
    );

    // check if new commits were pushed to the repo while we were building.
    // if new commits have been pushed, we will cancel this release
    postBuildSteps.push({
      name: "Check for new commits",
      id: GIT_REMOTE_STEPID,
      shell: "bash",
      run: [
        `echo "${LATEST_COMMIT_OUTPUT}=$(git ls-remote origin -h \${{ github.ref }} | cut -f1)" >> $GITHUB_OUTPUT`,
        "cat $GITHUB_OUTPUT",
      ].join("\n"),
    });

    const projectPathRelativeToRoot = projectPathRelativeToRepoRoot(
      this.project
    );

    postBuildSteps.push(
      {
        name: "Backup artifact permissions",
        if: noNewCommits,
        continueOnError: true,
        run: `cd ${this.artifactsDirectory} && getfacl -R . > ${PERMISSION_BACKUP_FILE}`,
      },
      WorkflowSteps.uploadArtifact({
        if: noNewCommits,
        with: {
          name: BUILD_ARTIFACT_NAME,
          path: this.project.parent // is subproject
            ? posixPath.join(projectPathRelativeToRoot, this.artifactsDirectory)
            : this.artifactsDirectory,
        },
      })
    );

    if (this.github && !this.releaseTrigger.isManual) {
      // Use target (possible parent) GitHub to create the workflow
      const workflow = new GithubWorkflow(this.github, workflowName, {
        // see https://github.com/projen/projen/issues/3761
        limitConcurrency: true,
      });
      workflow.on({
        schedule: this.releaseTrigger.schedule
          ? [{ cron: this.releaseTrigger.schedule }]
          : undefined,
        push: this.releaseTrigger.isContinuous
          ? { branches: [branchName], paths: this.releaseTrigger.paths }
          : undefined,
        workflowDispatch: {}, // allow manual triggering
      });

      // Create job based on child (only?) project GitHub
      const taskjob = new TaskWorkflowJob(this, releaseTask, {
        outputs: {
          [LATEST_COMMIT_OUTPUT]: {
            stepId: GIT_REMOTE_STEPID,
            outputName: LATEST_COMMIT_OUTPUT,
          },
          [TAG_EXISTS_OUTPUT]: {
            stepId: TAG_EXISTS_STEPID,
            outputName: "exists",
          },
        },
        container: this.containerImage
          ? { image: this.containerImage }
          : undefined,
        env: {
          CI: "true",
          ...this.releaseWorkflowEnv,
        },
        permissions: this.workflowPermissions,
        checkoutWith: {
          // fetch-depth= indicates all history for all branches and tags
          // we must use this in order to fetch all tags
          // and to inspect the history to decide if we should release
          fetchDepth: 0,
        },
        preBuildSteps,
        postBuildSteps,
        jobDefaults: this.project.parent // is subproject
          ? {
              run: {
                workingDirectory: projectPathRelativeToRoot,
              },
            }
          : undefined,
        ...filteredRunsOnOptions(this.workflowRunsOn, this.workflowRunsOnGroup),
      });

      workflow.addJob(BUILD_JOBID, taskjob);

      return workflow;
    } else {
      return undefined;
    }
  }
}

/**
 * Options for a release branch.
 */
export interface BranchOptions {
  /**
   * The name of the release workflow.
   * @default "release-BRANCH"
   */
  readonly workflowName?: string;

  /**
   * The GitHub Actions environment used for the release.
   *
   * This can be used to add an explicit approval step to the release
   * or limit who can initiate a release through environment protection rules.
   *
   * When multiple artifacts are released, the environment can be overwritten
   * on a per artifact basis.
   *
   * @default - no environment used, unless set at the artifact level
   */
  readonly environment?: string;

  /**
   * The major versions released from this branch.
   */
  readonly majorVersion: number;

  /**
   * The minimum major version to release.
   */
  readonly minMajorVersion?: number;

  /**
   * The minor versions released from this branch.
   */
  readonly minorVersion?: number;

  /**
   * Bump the version as a pre-release tag.
   *
   * @default - normal releases
   */
  readonly prerelease?: string;

  /**
   * Automatically add the given prefix to release tags.
   * Useful if you are releasing on multiple branches with overlapping
   * version numbers.
   *
   * Note: this prefix is used to detect the latest tagged version
   * when bumping, so if you change this on a project with an existing version
   * history, you may need to manually tag your latest release
   * with the new prefix.
   *
   * @default - no prefix
   */
  readonly tagPrefix?: string;

  /**
   * The npm distribution tag to use for this branch.
   *
   * @default "latest"
   */
  readonly npmDistTag?: string;
}

interface ReleaseBranch extends Partial<BranchOptions> {
  readonly workflow?: GithubWorkflow;
  readonly name: string;
}
