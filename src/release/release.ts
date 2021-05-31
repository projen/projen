import { Component } from '../component';
import { workflows, GithubWorkflow } from '../github';
import { Project } from '../project';
import { Publisher } from '../publisher';
import { Task } from '../tasks';
import { Version } from '../version';

const BUILD_JOBID = 'release';

/**
 * Options for `Release`.
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
   * The name of the main release branch.
   *
   * NOTE: this field is temporarily required as we migrate the default value
   * from "master" to "main". Shortly, it will be made optional with "main" as
   * the default.
   *
   * @default "main"
   */
  readonly defaultReleaseBranch: string;

  /**
   * Branches which trigger a release.
   *
   * Default value is based on defaultReleaseBranch.
   *
   * @default [ "main" ]
   */
  readonly releaseBranches?: string[];

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
  readonly releaseWorkflowSetupSteps?: workflows.JobStep[];

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
   * The initial version of the repo. The first release will bump over this
   * version, so it will be v0.1.1 or v0.2.0 (depending on whether the first
   * bump is minor or patch).
   *
   * @default "v0.1.0"
   */
  readonly initialVersion?: string;

  /**
   * Bump as a pre-release (e.g. "beta", "alpha", "pre").
   *
   * @default - normal semantic versions
   */
  readonly prerelease?: string;

  /**
   * Steps to execute after build as part of the release workflow.
   * @default []
   */
  readonly postBuildSteps?: workflows.JobStep[];

  /**
   * Checks that after build there are no modified files on git.
   * @default true
   */
  readonly antitamper?: boolean;
}

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
  readonly versionJson: string;
}

/**
 * Manages releases (currently through GitHub workflows).
 */
export class Release extends Component {
  /**
   * The publisher - responsible for publishing jobs in the workflow.
   */
  public readonly publisher: Publisher;

  /**
   * The release workflow.
   */
  public readonly workflow: GithubWorkflow;

  private readonly task: Task;
  private readonly version: Version;
  private readonly postBuildSteps: workflows.JobStep[];
  private readonly antitamper: boolean;
  private readonly artifactDirectory: string;

  constructor(project: Project, options: ReleaseOptions) {
    super(project);

    this.task = options.task;
    this.postBuildSteps = options.postBuildSteps ?? [];
    this.antitamper = options.antitamper ?? true;
    this.artifactDirectory = options.artifactsDirectory ?? 'dist';

    this.version = new Version(project, {
      initialVersion: options.initialVersion,
      prerelease: options.prerelease,
      versionJson: options.versionJson,
    });

    this.workflow = this.createWorkflow(options);

    this.publisher = new Publisher(project, {
      workflow: this.workflow,
      artifactName: this.artifactDirectory,
      buildJobId: BUILD_JOBID,
      jsiiReleaseVersion: options.jsiiReleaseVersion,
    });
  }

  private createWorkflow(options: ReleaseOptions): GithubWorkflow {
    const defaultReleaseBranch = options.defaultReleaseBranch ?? 'main';
    const releaseBranches = options.releaseBranches ?? [defaultReleaseBranch];
    const getVersion = 'v$(node -p \"require(\'./package.json\').version\")';

    // to avoid race conditions between two commits trying to release the same
    // version, we check if the head sha is identical to the remote sha. if
    // not, we will skip the release and just finish the build.
    const gitRemoteStep = 'git_remote';
    const latestCommitOutput = 'latest_commit';
    const noNewCommits = `\${{ steps.${gitRemoteStep}.outputs.${latestCommitOutput} == github.sha }}`;

    const steps = new Array<workflows.JobStep>();

    // check out sources.
    steps.push({
      name: 'Checkout',
      uses: 'actions/checkout@v2',
      with: {
        // we must use 'fetch-depth=0' in order to fetch all tags
        // otherwise tags are not checked out
        'fetch-depth': 0,
      },
    });

    // sets git identity so we can push later
    steps.push({
      name: 'Set git identity',
      run: [
        'git config user.name "Automation"',
        'git config user.email "github-actions@github.com"',
      ].join('\n'),
    });

    steps.push(...options.releaseWorkflowSetupSteps ?? []);

    steps.push({
      name: 'Bump to next version',
      run: this.project.runTaskCommand(this.version.bumpTask),
    });

    // run the main build task
    steps.push({
      name: this.task.name,
      run: this.project.runTaskCommand(this.task),
    });

    // run post-build steps
    steps.push(...this.postBuildSteps);

    // revert the bump so anti-tamper will not fail
    steps.push({
      name: 'Unbump',
      run: this.project.runTaskCommand(this.version.unbumpTask),
    });

    // anti-tamper check (fails if there were changes to committed files)
    // this will identify any non-committed files generated during build (e.g. test snapshots)
    if (this.antitamper) {
      steps.push({
        name: 'Anti-tamper check',
        run: 'git diff --ignore-space-at-eol --exit-code',
      });
    }

    // check if new commits were pushed to the repo while we were building.
    // if new commits have been pushed, we will cancel this release
    steps.push({
      name: 'Check for new commits',
      id: gitRemoteStep,
      run: `echo ::set-output name=${latestCommitOutput}::"$(git ls-remote origin -h \${{ github.ref }} | cut -f1)"`,
    });

    // create a github release
    steps.push({
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

    steps.push({
      name: 'Upload artifact',
      if: noNewCommits,
      uses: 'actions/upload-artifact@v2.1.1',
      with: {
        name: this.artifactDirectory,
        path: this.artifactDirectory,
      },
    });


    const github = this.project.github;
    if (!github) { throw new Error('no github support'); }

    const workflow = github.addWorkflow('Release');

    // determine release triggers
    workflow.on({
      schedule: options.releaseSchedule ? [{ cron: options.releaseSchedule }] : undefined,
      push: (options.releaseEveryCommit ?? true) ? { branches: releaseBranches } : undefined,
      workflowDispatch: {}, // allow manual triggering
    });

    // add main build job
    workflow.addJobs({
      [BUILD_JOBID]: {
        runsOn: 'ubuntu-latest',
        container: options.workflowContainerImage ? { image: options.workflowContainerImage } : undefined,
        env: {
          CI: 'true',
          RELEASE: 'true',
        },
        permissions: {
          contents: workflows.JobPermission.WRITE,
        },
        steps: steps,
      },
    });

    return workflow;
  }
}
