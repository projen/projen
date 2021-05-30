import { Component } from '../component';
import { workflows, GithubWorkflow } from '../github';
import { Project } from '../project';
import { Publisher } from '../publisher';
import { Task } from '../tasks';
import { Version } from '../version';

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

  constructor(project: Project, options: ReleaseOptions) {
    super(project);

    this.task = options.task;
    this.postBuildSteps = options.postBuildSteps ?? [];
    this.antitamper = options.antitamper ?? true;

    this.version = new Version(project, {
      initialVersion: options.initialVersion,
    });

    const defaultReleaseBranch = options.defaultReleaseBranch ?? 'main';
    const releaseBranches = options.releaseBranches ?? [defaultReleaseBranch];

    const trigger: { [event: string]: any } = { };

    if (options.releaseEveryCommit ?? true) {
      trigger.push = { branches: releaseBranches };
    }

    if (options.releaseSchedule) {
      trigger.schedule = { cron: options.releaseSchedule };
    }

    const artifactDirectory = options.artifactsDirectory ?? 'dist';
    const getVersion = 'v$(node -p \"require(\'./package.json\').version\")';
    const jobId = 'release';

    const releaseSteps: workflows.JobStep[] = [];

    // to avoid race conditions between two commits trying to release the same
    // version, we check if the head sha is identical to the remote sha. if
    // not, we will skip the release and just finish the build.
    const gitRemoteStep = 'git_remote';
    const latestCommitOutput = 'latest_commit';
    const noNewCommits = `\${{ steps.${gitRemoteStep}.outputs.${latestCommitOutput} == github.sha }}`;

    releaseSteps.push({
      name: 'Check for new commits',
      id: gitRemoteStep,
      run: `echo ::set-output name=${latestCommitOutput}::"$(git ls-remote origin -h \${{ github.ref }} | cut -f1)"`,
    });

    releaseSteps.push({
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

    releaseSteps.push({
      name: 'Unbump',
      run: project.runTaskCommand(this.version.unbumpTask),
    });

    releaseSteps.push({
      name: 'Upload artifact',
      if: noNewCommits,
      uses: 'actions/upload-artifact@v2.1.1',
      with: {
        name: artifactDirectory,
        path: artifactDirectory,
      },
    });

    const workflow = this.createBuildWorkflow('Release', {
      jobId: jobId,
      trigger,
      env: {
        RELEASE: 'true',
      },
      permissions: {
        contents: workflows.JobPermission.WRITE,
      },
      preBuildSteps: [
        ...options.releaseWorkflowSetupSteps ?? [],
        {
          name: 'Bump to next version',
          run: project.runTaskCommand(this.version.bumpTask),
        },
      ],
      postSteps: [
        ...this.postBuildSteps,
        ...releaseSteps,
      ],
      image: options.workflowContainerImage,
      checkoutWith: {
        // we must use 'fetch-depth=0' in order to fetch all tags
        // otherwise tags are not checked out
        'fetch-depth': 0,
      },
    });

    this.workflow = workflow;

    this.publisher = new Publisher(project, {
      workflow: workflow,
      artifactName: artifactDirectory,
      buildJobId: jobId,
      jsiiReleaseVersion: options.jsiiReleaseVersion,
    });
  }

  private createBuildWorkflow(name: string, options: NodeBuildWorkflowOptions): GithubWorkflow {
    const buildJobId = options.jobId;

    const github = this.project.github;
    if (!github) { throw new Error('no github support'); }

    const workflow = github.addWorkflow(name);

    if (options.trigger) {
      if (options.trigger.issue_comment) {
        throw new Error('"issue_comment" should not be used as a trigger due to a security issue');
      }

      workflow.on(options.trigger);
    }

    workflow.on({
      workflowDispatch: {}, // allow manual triggering
    });

    const preSteps = options.preBuildSteps ?? [];
    const checkoutWith = options.checkoutWith ? { with: options.checkoutWith } : {};
    const postSteps = options.postSteps ?? [];

    const antitamperSteps = !this.antitamper ? [] : [{
      name: 'Anti-tamper check',
      run: 'git diff --ignore-space-at-eol --exit-code',
    }];

    const job: Mutable<workflows.Job> = {
      runsOn: 'ubuntu-latest',
      env: {
        CI: 'true', // will cause `NodeProject` to execute `yarn install` with `--frozen-lockfile`
        ...options.env ?? {},
      },
      permissions: options.permissions,
      steps: [
        // check out sources.
        {
          name: 'Checkout',
          uses: 'actions/checkout@v2',
          ...checkoutWith,
        },

        // sets git identity so we can push later
        {
          name: 'Set git identity',
          run: [
            'git config user.name "Automation"',
            'git config user.email "github-actions@github.com"',
          ].join('\n'),
        },

        ...preSteps,

        // run the main release task
        {
          name: this.task.name,
          run: this.project.runTaskCommand(this.task),
        },

        ...postSteps,

        // anti-tamper check (fails if there were changes to committed files)
        // this will identify any non-committed files generated during build (e.g. test snapshots)
        ...antitamperSteps,
      ],
    };

    if (options.image) {
      job.container = { image: options.image };
    }

    workflow.addJobs({ [buildJobId]: job });

    return workflow;
  }
}
interface NodeBuildWorkflowOptions {
  /**
   * The primary job id.
   */
  readonly jobId: string;

  /**
   * @default - default image
   */
  readonly image?: string;

  /**
   * What should trigger the workflow?
   *
   * @default - by default workflows can only be triggered by manually.
   */
  readonly trigger?: { [event: string]: any };

  readonly preBuildSteps?: workflows.JobStep[];
  readonly postSteps?: workflows.JobStep[];
  readonly checkoutWith?: { [key: string]: any };

  /**
   * Workflow environment variables.
   * @default {}
   */
  readonly env?: { [name: string]: string };

  /**
   * Permissions for the build job.
   */
  readonly permissions: workflows.JobPermissions;
}

type Mutable<T> = { -readonly [P in keyof T]: T[P] };