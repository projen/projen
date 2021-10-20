import { snake } from 'case';
import { Component } from '../component';
import { kebabCaseKeys } from '../util';
import { YamlFile } from '../yaml';
import { GitHub } from './github';

import * as workflows from './workflows-model';

/**
 * Options for `GithubWorkflow`.
 */
export interface GithubWorkflowOptions {
  /**
   * Force the creation of the workflow even if `workflows` is disabled in `GitHub`.
   *
   * @default false
   */
  readonly force?: boolean;
  /**
   * Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time. Currently in beta.
   *
   * @default - disabled
   * @see https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#concurrency
   */
  readonly concurrency?: string;
}

/**
 * Workflow for GitHub.
 *
 * A workflow is a configurable automated process made up of one or more jobs.
 *
 * @see https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions
 */
export class GithubWorkflow extends Component {
  /**
   * The name of the workflow.
   */
  public readonly name: string;
  /**
   * Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time.
   *
   * @default disabled
   * @experimental
   */
  public readonly concurrency?: string;

  /**
   * The workflow YAML file.
   */
  public readonly file: YamlFile | undefined;

  private events: workflows.Triggers = { };
  private jobs: Record<string, workflows.Job> = { };

  constructor(github: GitHub, name: string, options: GithubWorkflowOptions = {}) {
    super(github.project);

    this.name = name;
    this.concurrency = options.concurrency;

    const workflowsEnabled = github.workflowsEnabled || options.force;

    if (workflowsEnabled) {
      this.file = new YamlFile(this.project, `.github/workflows/${name.toLocaleLowerCase()}.yml`, {
        obj: () => this.renderWorkflow(),
      });
    }
  }

  /**
   * Add events to triggers the workflow.
   *
   * @param events The event(s) to trigger the workflow.
   */
  public on(events: workflows.Triggers) {
    this.events = {
      ...this.events,
      ...events,
    };
  }

  /**
   * Add jobs to the workflow.
   *
   * @param jobs Jobs to add.
   */
  public addJobs(jobs: Record<string, workflows.Job>) {
    // verify that job has a "permissions" statement to ensure workflow can
    // operate in repos with default tokens set to readonly
    for (const [id, job] of Object.entries(jobs)) {
      if (!job.permissions) {
        throw new Error(`${id}: all workflow jobs must have a "permissions" clause to ensure workflow can operate in restricted repositories`);
      }
    }

    this.jobs = {
      ...this.jobs,
      ...jobs,
    };
  }

  private renderWorkflow() {
    return {
      name: this.name,
      on: snakeCaseKeys(this.events),
      concurrency: this.concurrency,
      jobs: renderJobs(this.jobs),
    };
  }
}

function snakeCaseKeys<T = unknown>(obj: T): T {
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeCaseKeys) as any;
  }

  const result: Record<string, unknown> = {};
  for (let [k, v] of Object.entries(obj)) {
    if (typeof v === 'object' && v != null) {
      v = snakeCaseKeys(v);
    }
    result[snake(k)] = v;
  }
  return result as any;
}

function renderJobs(jobs: Record<string, workflows.Job>) {
  const result: Record<string, unknown> = {};
  for (const [name, job] of Object.entries(jobs)) {
    result[name] = renderJob(job);
  }
  return result;

  /** @see https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions */
  function renderJob(job: workflows.Job) {
    return {
      'name': job.name,
      'needs': arrayOrScalar(job.needs),
      'runs-on': job.runsOn,
      'permissions': kebabCaseKeys(job.permissions),
      'environment': job.environment,
      'concurrency': job.concurrency,
      'outputs': renderJobOutputs(job.outputs),
      'env': job.env,
      'defaults': kebabCaseKeys(job.defaults),
      'if': job.if,
      'steps': kebabCaseKeys(job.steps, false),
      'timeout-minutes': job.timeoutMinutes,
      'strategy': renderJobStrategy(job.strategy),
      'continue-on-error': job.continueOnError,
      'container': job.container,
      'services': job.services,
    };
  }

  function renderJobOutputs(output: workflows.Job['outputs']) {
    if (output == null) {
      return undefined;
    }

    const rendered: Record<string, string> = {};
    for (const [name, { stepId, outputName }] of Object.entries(output)) {
      rendered[name] = `\${{ steps.${stepId}.outputs.${outputName} }}`;
    }
    return rendered;
  }

  function renderJobStrategy(strategy: workflows.Job['strategy']) {
    if (strategy == null) {
      return undefined;
    }

    const rendered: Record<string, unknown> = {
      'max-parallel': strategy.maxParallel,
      'fail-fast': strategy.failFast,
    };

    if (strategy.matrix) {
      const matrix: Record<string, unknown> = {
        include: strategy.matrix.include,
        exclude: strategy.matrix.exclude,
      };
      for (const [key, values] of Object.entries(strategy.matrix.domain ?? {})) {
        if (key in matrix) {
          // A domain key was set to `include`, or `exclude`:
          throw new Error(`Illegal job strategy matrix key: ${key}`);
        }
        matrix[key] = values;
      }
      rendered.matrix = matrix;
    }

    return rendered;
  }
}

function arrayOrScalar<T>(arr: T[] | undefined): T | T[] | undefined {
  if (arr == null || arr.length === 0) {
    return arr;
  }
  if (arr.length === 1) {
    return arr[0];
  }
  return arr;
}
