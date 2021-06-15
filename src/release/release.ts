import { Component } from '../component';
import { GenericWorkflow } from '../github';
import { Job, JobPermission, JobStep } from '../github/workflows-model';
import { Project } from '../project';
import { Publisher } from '../publisher';
import { Task } from '../tasks';
import { Version } from '../version';

/**
 * Project options for release.
 */
export interface ReleaseProjectOptions {
  /**
   * Automatically release new versions every commit to one of branches in `releaseBranches`.
   * @default true
   */
  readonly releaseEveryCommit?: boolean;

  /**
    * CRON schedule to trigger new releases.
    *
    * @default - no scheduled releases
    */
  readonly releaseSchedule?: string;

  /**
   * A directory which will contain artifacts to be published to npm.
   *
   * @default "dist"
   */
  readonly artifactsDirectory?: string;

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
   * Version requirement of `jsii-release` which is used to publish modules to npm.
   * @default "latest"
   */
  readonly jsiiReleaseVersion?: string;

  /**
   * Steps to execute after build as part of the release workflow.
   * @default []
   */
  readonly postBuildSteps?: JobStep[];

  /**
   * Checks that after build there are no modified files on git.
   * @default true
   */
  readonly antitamper?: boolean;

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
    * Bump versions from the default branch as pre-releases (e.g. "beta",
    * "alpha", "pre").
    *
    * @default - normal semantic versions
    */
  readonly prerelease?: string;

  /**
   * The name of the default release workflow.
   *
   * @default "Release"
   */
  readonly releaseWorkflowName?: string;

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
}

/**
 * Options for `Release`.
 */
export interface ReleaseOptions extends ReleaseProjectOptions {
  /**
   * The task to execute in order to create the release artifacts. Artifacts are
   * expected to reside under `artifactsDirectory` (defaults to `dist/`) once
   * build is complete.
   */
  readonly task: Task;

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
}

/**
 * Manages releases (currently through GitHub workflows).
 *
 * By default, no branches are released. To add branches, call `addBranch()`.
 */
export class Release extends Component {
  public static readonly BUILD_JOBID = 'release';
  /**
   * Package publisher.
   */
  public readonly publisher: Publisher;

  private readonly task: Task;
  private readonly version: Version;
  private readonly postBuildSteps: JobStep[];
  private readonly antitamper: boolean;
  private readonly artifactsDirectory: string;
  private readonly versionFile: string;
  private readonly releaseSchedule?: string;
  private readonly releaseEveryCommit: boolean;
  private readonly preBuildSteps: JobStep[];
  private readonly containerImage?: string;
  private readonly branches = new Array<ReleaseBranch>();
  private readonly jobs: Record<string, Job> = {};
  private readonly defaultBranch: ReleaseBranch;

  constructor(project: Project, options: ReleaseOptions) {
    super(project);

    if (Array.isArray(options.releaseBranches)) {
      throw new Error('"releaseBranches" is no longer an array. See type annotations');
    }

    this.task = options.task;
    this.preBuildSteps = options.releaseWorkflowSetupSteps ?? [];
    this.postBuildSteps = options.postBuildSteps ?? [];
    this.antitamper = options.antitamper ?? true;
    this.artifactsDirectory = options.artifactsDirectory ?? 'dist';
    this.versionFile = options.versionFile;
    this.releaseSchedule = options.releaseSchedule;
    this.releaseEveryCommit = options.releaseEveryCommit ?? true;
    this.containerImage = options.workflowContainerImage;

    this.version = new Version(project, {
      versionFile: options.versionFile,
    });

    this.publisher = new Publisher(project, {
      artifactName: this.artifactsDirectory,
      buildJobId: Release.BUILD_JOBID,
      jsiiReleaseVersion: options.jsiiReleaseVersion,
    });

    // add the default branch
    this.defaultBranch = {
      name: options.branch,
      prerelease: options.prerelease,
      majorVersion: options.majorVersion,
      workflowName: options.releaseWorkflowName ?? 'Release',
    };

    this.branches.push(this.defaultBranch);

    for (const [name, opts] of Object.entries(options.releaseBranches ?? {})) {
      this.addBranch(name, opts);
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
  public addBranch(branch: string, options: BranchOptions) {
    if (this.branches.find(b => b.name === branch)) {
      throw new Error(`The release branch ${branch} is already defined`);
    }

    // if we add a branch, we require that the default branch will also define a
    // major version.
    if (this.defaultBranch.majorVersion === undefined) {
      throw new Error('you must specify "majorVersion" for the default branch when adding multiple release branches');
    }

    this.branches.push({
      name: branch,
      ...options,
    });
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

  // render a workflow per branch and all the jobs to it
  public preSynthesize() {
    for (const branch of this.branches) {
      const workflow = this.createWorkflow(branch);
      workflow.addJobs(this.publisher.render());
      workflow.addJobs(this.jobs);
    }
  }

  private createWorkflow(branch: ReleaseBranch): GenericWorkflow {
    const github = this.project.github;
    if (!github) { throw new Error('no github support'); }

    const workflowName = branch.workflowName ?? `release-${branch.name}`;

    // to avoid race conditions between two commits trying to release the same
    // version, we check if the head sha is identical to the remote sha. if
    // not, we will skip the release and just finish the build.
    const gitRemoteStep = 'git_remote';
    const latestCommitOutput = 'latest_commit';
    const noNewCommits = `\${{ steps.${gitRemoteStep}.outputs.${latestCommitOutput} == github.sha }}`;

    const preBuildSteps = this.preBuildSteps ?? [];

    const env: Record<string, string> = {};

    if (branch.majorVersion !== undefined) {
      env.MAJOR = branch.majorVersion.toString();
    }

    if (branch.prerelease) {
      env.PRERELEASE = branch.prerelease;
    }

    preBuildSteps.push({
      name: 'Bump to next version',
      run: this.project.runTaskCommand(this.version.bumpTask),
      env: Object.keys(env).length ? env : undefined,
    });

    const postBuildSteps = this.postBuildSteps;

    // create a backup of the version JSON file (e.g. package.json) because we
    // are going to revert the bump and we need the version number in order to
    // create the github release.
    const versionJsonBackup = `${this.versionFile}.bak.json`;
    postBuildSteps.push({
      name: 'Backup version file',
      run: `cp -f ${this.versionFile} ${versionJsonBackup}`,
    });

    // revert the bump so anti-tamper will not fail
    postBuildSteps.push({
      name: 'Unbump',
      run: this.project.runTaskCommand(this.version.unbumpTask),
    });

    const finalSteps = new Array<JobStep>();

    // check if new commits were pushed to the repo while we were building.
    // if new commits have been pushed, we will cancel this release
    finalSteps.push({
      name: 'Check for new commits',
      id: gitRemoteStep,
      run: `echo ::set-output name=${latestCommitOutput}::"$(git ls-remote origin -h \${{ github.ref }} | cut -f1)"`,
    });

    // create a github release
    const getVersion = `v$(node -p \"require(\'./${versionJsonBackup}\').version\")`;
    finalSteps.push({
      name: 'Create release',
      if: noNewCommits,
      run: [
        `gh release create ${getVersion}`,
        `-F ${this.version.changelogFile}`,
        `-t ${getVersion}`,
      ].join(' '),
      env: {
        GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
      },
    });

    finalSteps.push({
      name: 'Upload artifact',
      if: noNewCommits,
      uses: 'actions/upload-artifact@v2.1.1',
      with: {
        name: this.artifactsDirectory,
        path: this.artifactsDirectory,
      },
    });

    return new GenericWorkflow(github, {
      name: workflowName,
      jobId: Release.BUILD_JOBID,
      trigger: {
        schedule: this.releaseSchedule ? [{ cron: this.releaseSchedule }] : undefined,
        push: (this.releaseEveryCommit) ? { branches: [branch.name] } : undefined,
      },
      container: this.containerImage ? { image: this.containerImage } : undefined,
      env: {
        CI: 'true',
        RELEASE: 'true',
      },
      permissions: {
        contents: JobPermission.WRITE,
      },
      antitamperDisabled: !this.antitamper,
      preBuildSteps,
      task: this.task,
      buildStep: {
        name: this.task.name,
        run: this.project.runTaskCommand(this.task),
      },
      postBuildSteps,
      finalSteps,
    });
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
   * The major versions released from this branch.
   */
  readonly majorVersion: number;

  /**
   * Bump the version as a pre-release tag.
   *
   * @default - normal releases
   */
  readonly prerelease?: string;
}

interface ReleaseBranch extends Partial<BranchOptions> {
  readonly name: string;
}
