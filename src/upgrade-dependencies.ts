import { Component } from './component';
import { GitHub, GithubWorkflow, workflows } from './github';
import { NodeProject } from './node-project';
import { Task } from './tasks';

function context(value: string) {
  return `\${{ ${value} }}`;
}

function setOutput(name: string, value: string) {
  return `echo "::set-output name=${name}::${value}"`;
}

const RUNNER_TEMP = context('runner.temp');
const DEFAULT_TOKEN = context('secrets.GITHUB_TOKEN');
const REPO = context('github.repository');
const RUN_ID = context('github.run_id');
const RUN_URL = `https://github.com/${REPO}/actions/runs/${RUN_ID}`;
const UBUNTU_LATEST = 'ubuntu-latest';

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
   * Whether or not to ignore projen upgrades.
   *
   * @default true
   */
  readonly ignoreProjen?: boolean;

}

/**
 * Upgrade node project dependencies.
 */
export class UpgradeDependencies extends Component {

  /**
   * The workflow that executes the upgrade.
   */
  public readonly workflow?: GithubWorkflow;

  private readonly options: UpgradeDependenciesOptions;

  private readonly _project: NodeProject;

  private readonly pullRequestTitle: string;

  constructor(project: NodeProject, options: UpgradeDependenciesOptions = {}) {
    super(project);

    this._project = project;
    this.options = options;
    this.pullRequestTitle = options.pullRequestTitle ?? 'upgrade dependencies';

    project.addDevDeps('npm-check-updates@^11');

    const task = this.createTask();

    if (project.github && (options.workflow ?? true)) {
      this.workflow = this.createWorkflow(task, project.github);
    }
  }

  private createTask(): Task {
    const taskName = this.options.taskName ?? 'upgrade';
    const task = this._project.addTask(taskName, {
      // this task should not run in CI mode because its designed to
      // update package.json and lock files.
      env: { CI: '0' },
      description: this.pullRequestTitle,
    });

    const exclude = this.options.exclude ?? [];
    if (this.options.ignoreProjen ?? true) {
      exclude.push('projen');
    }
    const ncuCommand = ['npm-check-updates', '--upgrade', '--target=minor'];
    if (exclude.length > 0) {
      ncuCommand.push(`--reject='${exclude.join(',')}'`);
    }
    if (this.options.include) {
      ncuCommand.push(`--filter='${this.options.include.join(',')}'`);
    }

    task.exec(ncuCommand.join(' '));

    // run "yarn/npm install" to update the lockfile and install any deps (such as projen)
    task.exec(this._project.package.installAndUpdateLockfileCommand);

    // run upgrade command to upgrade transitive deps as well
    task.exec(this._project.package.renderUpgradePackagesCommand(exclude, this.options.include));

    // run "projen" to give projen a chance to update dependencies (it will also run "yarn install")
    task.exec(this._project.projenCommand);

    return task;
  }

  private createWorkflow(task: Task, github: GitHub): GithubWorkflow {
    const schedule = this.options.workflowOptions?.schedule ?? UpgradeDependenciesSchedule.DAILY;

    const workflow = github.addWorkflow(task.name);
    const triggers: workflows.Triggers = {
      workflowDispatch: {},
      schedule: schedule.cron ? schedule.cron.map(e => ({ cron: e })) : undefined,
    };
    workflow.on(triggers);

    const upgrade = this.createUpgrade(task);
    const pr = this.createPr(workflow, upgrade);

    const jobs: Record<string, workflows.Job> = {};
    jobs[upgrade.jobId] = upgrade.job;
    jobs[pr.jobId] = pr.job;

    workflow.addJobs(jobs);
    return workflow;
  }

  private createUpgrade(task: Task): Upgrade {

    const build = this.options.workflowOptions?.rebuild ?? true;
    const patchFile = '.upgrade.tmp.patch';
    const buildStepId = 'build';
    const conclusion = 'conclusion';

    // thats all we should need at this stage since all we do is clone.
    // note that this also prevents new code that is introduced in the upgrade
    // to have write access to anything, in case its somehow executed. (for example during build)
    const permissions: workflows.JobPermissions = {
      contents: workflows.JobPermission.READ,
    };

    const outputs: Record<string, workflows.JobStepOutput> = {};
    const steps: workflows.JobStep[] = [
      {
        name: 'Checkout',
        uses: 'actions/checkout@v2',
      },
      ...this._project.installWorkflowSteps,
      {
        name: 'Upgrade dependencies',
        run: this._project.runTaskCommand(task),
      },
    ];

    if (build) {
      steps.push({
        name: 'Build',
        id: buildStepId,
        run: `${this._project.runTaskCommand(this._project.buildTask)} && ${setOutput(conclusion, 'success')} || ${setOutput(conclusion, 'failure')}`,
      });

      outputs[conclusion] = {
        stepId: buildStepId,
        outputName: conclusion,
      };
    }

    steps.push(
      {
        name: 'Create Patch',
        run: [
          'git add .',
          `git diff --patch --staged > ${patchFile}`,
        ].join('\n'),
      },
      {
        name: 'Upload patch',
        uses: 'actions/upload-artifact@v2',
        with: { name: patchFile, path: patchFile },
      },
    );

    return {
      job: {
        name: 'Upgrade',
        container: this.options.workflowOptions?.container,
        permissions: permissions,
        runsOn: UBUNTU_LATEST,
        outputs: outputs,
        steps: steps,
      },
      jobId: 'upgrade',
      patchFile: patchFile,
      build: build,
      buildConclusionOutput: conclusion,
    };
  }

  private createPr(workflow: GithubWorkflow, upgrade: Upgrade): PR {

    const customToken = this.options.workflowOptions?.secret ? context(`secrets.${this.options.workflowOptions.secret}`) : undefined;
    const workflowName = workflow.name;
    const branchName = `github-actions/${workflowName}`;
    const prStepId = 'create-pr';

    const title = `chore(deps): ${this.pullRequestTitle}`;
    const description = [
      'Upgrades project dependencies. See details in [workflow run].',
      '',
      `[Workflow Run]: ${RUN_URL}`,
      '',
      '------',
      '',
      `*Automatically created by projen via the "${workflow.name}" workflow*`,
    ].join('\n');

    const steps: workflows.JobStep[] = [
      {
        name: 'Checkout',
        uses: 'actions/checkout@v2',
      },
      {
        name: 'Download patch',
        uses: 'actions/download-artifact@v2',
        with: { name: upgrade.patchFile, path: RUNNER_TEMP },
      },
      {
        name: 'Apply patch',
        run: `[ -s ${RUNNER_TEMP}/${upgrade.patchFile} ] && git apply ${RUNNER_TEMP}/${upgrade.patchFile} || echo "Empty patch. Skipping."`,
      },
      {
        name: 'Create Pull Request',
        id: prStepId,
        uses: 'peter-evans/create-pull-request@v3',
        with: {
          // the pr can modify workflow files, so we need to use the custom
          // secret if one is configured.
          'token': customToken ?? DEFAULT_TOKEN,
          'commit-message': `${title}\n\n${description}`,
          'branch': branchName,
          'title': title,
          'labels': this.options.workflowOptions?.labels?.join(',') || undefined,
          'body': description,
        },
      },
    ];

    let writeChecksPermission = false;
    if (this._project.buildWorkflowJobId && upgrade.build) {
      const body = {
        name: this._project.buildWorkflowJobId,
        head_sha: branchName,
        status: 'completed',
        conclusion: context(`needs.${upgrade.jobId}.outputs.${upgrade.buildConclusionOutput}`),
        output: {
          title: `Created via the ${workflowName} workflow.`,
          summary: `Action run URL: ${RUN_URL}`,
        },
      };
      steps.push({
        name: 'Update status check',
        if: `steps.${prStepId}.outputs.pull-request-url != \'\'`,
        run: 'curl -i --fail '
                + '-X POST '
                + '-H "Accept: application/vnd.github.v3+json" '
                + `-H "Authorization: token \${GITHUB_TOKEN}" https://api.github.com/repos/${REPO}/check-runs `
                + `-d '${JSON.stringify(body)}'`,
        env: { GITHUB_TOKEN: DEFAULT_TOKEN },
      });

      // necessary to update status checks
      writeChecksPermission = true;
    }

    return {
      job: {
        name: 'Create Pull Request',
        needs: [upgrade.jobId],
        permissions: {
          contents: workflows.JobPermission.WRITE,
          pullRequests: workflows.JobPermission.WRITE,
          checks: writeChecksPermission ? workflows.JobPermission.WRITE : undefined,
        },
        runsOn: UBUNTU_LATEST,
        steps: steps,
      },
      jobId: 'pr',
    };
  }
}

interface Upgrade {
  readonly job: workflows.Job;
  readonly jobId: string;
  readonly patchFile: string;
  readonly build: boolean;
  readonly buildConclusionOutput: string;
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
   * Which secret to use when creating the PR.
   *
   * When using the default github token, PR's created by this workflow
   * will not trigger any subsequent workflows (i.e the build workflow).
   * This is why this workflow also runs 'build' by default, and manually updates
   * the status check of the PR.
   *
   * If you pass a token that has the `workflow` permissions, you can skip running
   * build in this workflow by specifying `rebuild: false`.
   *
   * @see https://github.com/peter-evans/create-pull-request/issues/48
   * @default - default github token.
   */
  readonly secret?: string;

  /**
   * Labels to apply on the PR.
   *
   * @default - no labels.
   */
  readonly labels?: string[];

  /**
   * Execute 'build' after the upgrade.
   *
   * When true, the workflow will run the project build task after the dependency upgrade.
   * This means that the PR created will include any changes caused by the `build` command,
   * (e.g project synth changes, test snapshots)
   *
   * This is necessary when using the default github token.
   *
   * @see `secret` for more details.
   * @default true
   */
  readonly rebuild?: boolean;

  /**
   * Job container options.
   *
   * @default - defaults
   */
  readonly container?: workflows.ContainerOptions;
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
  public static readonly DAILY = new UpgradeDependenciesSchedule(['0 0 * * *']);

  /**
   * At 00:00 on every day-of-week from Monday through Friday.
   */
  public static readonly WEEKDAY = new UpgradeDependenciesSchedule(['0 0 * * 1-5']);

  /**
   * At 00:00 on Monday.
   */
  public static readonly WEEKLY = new UpgradeDependenciesSchedule(['0 0 * * 1']);

  /**
   * At 00:00 on day-of-month 1.
   */
  public static readonly MONTHLY = new UpgradeDependenciesSchedule(['0 0 1 * *']);

  /**
   * Create a schedule from a raw cron expression.
   */
  public static expressions(cron: string[]) {
    return new UpgradeDependenciesSchedule(cron);
  }

  private constructor(public readonly cron: string[]) {}
}
