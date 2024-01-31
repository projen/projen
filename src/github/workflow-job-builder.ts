import { IConstruct } from "constructs";
import {
  ContainerOptions,
  Job,
  JobDefaults,
  JobPermission,
  JobPermissions,
  JobStep,
  JobStepOutput,
  JobStrategy,
  Tools,
} from "./workflows-model";
import { Component } from "../component";
import { GroupRunnerOptions, filteredRunsOnOptions } from "../runner-options";

export class WorkflowJobBuilder extends Component implements Job {
  private _runsOn?: string[] | undefined;
  private _runsOnGroup?: GroupRunnerOptions | undefined;
  private _steps: JobStep[] = new Array<JobStep>();
  public readonly environment?: unknown;
  private _outputs?: Record<string, JobStepOutput> | undefined;
  private _env?: Record<string, string> | undefined;
  private _defaults?: JobDefaults | undefined;
  private _timeoutMinutes?: number | undefined;
  private _continueOnError?: boolean | undefined;
  private _container?: ContainerOptions | undefined;
  private _services?: Record<string, ContainerOptions> | undefined;
  private _tools?: Tools | undefined;
  private _name?: string | undefined;
  private _needs?: string[] | undefined;
  private _permissions: JobPermissions;
  public readonly concurrency?: unknown;
  private _if?: string | undefined;
  private _strategy?: JobStrategy | undefined;

  /**
   * @param scope any construct
   * @param options options to configure the Job.
   */
  constructor(scope: IConstruct, options: Job, id?: string) {
    super(scope, id ?? `${new.target.name}#${options.name}`);

    const runsOnInputs = filteredRunsOnOptions(
      options.runsOn,
      options.runsOnGroup
    );
    this._runsOn = (runsOnInputs as { runsOn: string[] })?.runsOn;
    this._runsOnGroup = (
      runsOnInputs as { runsOnGroup: GroupRunnerOptions }
    )?.runsOnGroup;
    this._steps = options.steps;
    this.environment = options.environment;
    this._outputs = options.outputs;
    this._env = options.env;
    this._defaults = options.defaults;
    this._timeoutMinutes = options.timeoutMinutes;
    this._continueOnError = options.continueOnError;
    this._container = options.container;
    this._services = options.services;
    this._tools = options.tools;
    this._name = options.name;
    this._needs = options.needs;
    this._permissions = options.permissions;
    this.concurrency = options.concurrency;
    this._if = options.if;
    this._strategy = options.strategy;
  }

  public get runsOn(): string[] | undefined {
    return this._runsOn;
  }
  public setRunsOn(value: string[] | undefined): WorkflowJobBuilder {
    this._runsOn = value;
    return this;
  }

  public get runsOnGroup(): GroupRunnerOptions | undefined {
    return this._runsOnGroup;
  }
  public setRunsOnGroup(
    value: GroupRunnerOptions | undefined
  ): WorkflowJobBuilder {
    this._runsOnGroup = value;
    return this;
  }

  public get steps(): JobStep[] {
    return [...this._steps];
  }

  /**
   * Add steps to the beginning of the job.
   * @param steps steps to add
   */
  public prependSteps(steps: JobStep[]): WorkflowJobBuilder {
    this._steps.unshift(...steps);
    return this;
  }

  /**
   * Add steps in the middle of the job.
   * @param steps steps to add
   */
  public insertSteps(index: number, steps: JobStep[]): WorkflowJobBuilder {
    this._steps.splice(index, 0, ...steps);
    return this;
  }

  /**
   * Add steps to the end of the job.
   * @param steps steps to add
   */
  public addSteps(steps: JobStep[]): WorkflowJobBuilder {
    this._steps.push(...steps);
    return this;
  }

  /**
   * Remove steps from the job.
   * @param indexes The indexes of the steps to remove
   */
  public removeSteps(indexes: number[]): WorkflowJobBuilder {
    this._steps = this._steps.filter((_, index) => !indexes.includes(index));
    return this;
  }

  public get outputs(): Record<string, JobStepOutput> | undefined {
    return this._outputs;
  }

  /**
   * Add an output to the job.
   * @param name The name of the output
   * @param value An object indicating where the value of the output is generated
   */
  public addOutput(name: string, value: JobStepOutput): WorkflowJobBuilder {
    if (!this._outputs) {
      this._outputs = {};
    }

    this._outputs[name] = value;
    return this;
  }

  /**
   * Remove an output from the job.
   * @param name The name of the output to remove
   */
  public removeOutput(name: string): WorkflowJobBuilder {
    if (this.outputs) {
      delete this.outputs[name];
    }
    return this;
  }

  public get env(): Record<string, string> | undefined {
    return this._env;
  }

  /**
   * Add a single environment variable to the job.
   * @param name The key of the environment variable
   * @param value The value of the environment variable
   */
  public addEnv(name: string, value: string): WorkflowJobBuilder {
    if (!this._env) {
      this._env = {};
    }
    this._env[name] = value;
    return this;
  }

  /**
   * Add several environment variables to the job.
   * @param envs The environment variables to add
   */
  public addEnvs(envs: Record<string, string>): WorkflowJobBuilder {
    if (!this._env) {
      this._env = {};
    }
    Object.assign(this._env, envs);
    return this;
  }

  /**
   * Remove an environment variable from the job.
   * @param name The name of the environment variable to remove
   */
  public removeEnv(name: string): WorkflowJobBuilder {
    if (this.env) {
      delete this.env[name];
    }
    return this;
  }

  public get defaults(): JobDefaults | undefined {
    return this._defaults;
  }
  public setDefaults(value: JobDefaults | undefined) {
    this._defaults = value;
  }

  public get timeoutMinutes(): number | undefined {
    return this._timeoutMinutes;
  }
  public setTimeoutMinutes(value: number | undefined): WorkflowJobBuilder {
    this._timeoutMinutes = value;
    return this;
  }

  public get continueOnError(): boolean | undefined {
    return this._continueOnError;
  }
  public setContinueOnError(value: boolean | undefined): WorkflowJobBuilder {
    this._continueOnError = value;
    return this;
  }

  public get container(): ContainerOptions | undefined {
    return this._container;
  }
  public setContainer(value: ContainerOptions | undefined): WorkflowJobBuilder {
    this._container = value;
    return this;
  }

  public get services(): Record<string, ContainerOptions> | undefined {
    return this._services;
  }
  public setServices(
    value: Record<string, ContainerOptions> | undefined
  ): WorkflowJobBuilder {
    this._services = value;
    return this;
  }

  public get tools(): Tools | undefined {
    return this._tools;
  }
  public setTools(value: Tools | undefined): WorkflowJobBuilder {
    this._tools = value;
    return this;
  }

  public get name(): string | undefined {
    return this._name;
  }
  public setName(value: string | undefined): WorkflowJobBuilder {
    this._name = value;
    return this;
  }

  public get needs(): string[] | undefined {
    return this._needs;
  }

  /**
   * Add a need to the job.
   * @param name The name of the job to add as a need
   */
  public addNeed(name: string): WorkflowJobBuilder {
    if (!this._needs) {
      this._needs = [];
    }

    this._needs.push(name);
    return this;
  }

  /**
   * Remove a need from the job.
   * @param name The name of the job to remove as a need
   */
  public removeNeed(name: string): WorkflowJobBuilder {
    if (this._needs) {
      this._needs = this._needs.filter((need) => need !== name);
    }
    return this;
  }
  public get permissions(): JobPermissions {
    return this._permissions;
  }

  /**
   * Add a permission to the job.
   * @param scope The GitHub Permission scope to apply the permission to
   * @param permission The GitHub JobPermission to apply
   */
  public addPermission(
    scope: keyof JobPermissions,
    permission: JobPermission
  ): WorkflowJobBuilder {
    if (!this._permissions) {
      this._permissions = {};
    }

    this._permissions = {
      ...this._permissions,
      [scope]: permission,
    };

    return this;
  }

  /**
   * Remove a permission from the job.
   * @param scope The GitHub Permission scope to remove the permission from
   */
  public removePermission(scope: keyof JobPermissions): WorkflowJobBuilder {
    if (this.permissions) {
      delete this.permissions[scope];
    }
    return this;
  }

  public get if(): string | undefined {
    return this._if;
  }
  public setIf(value: string | undefined): WorkflowJobBuilder {
    this._if = value;
    return this;
  }

  public get strategy(): JobStrategy | undefined {
    return this._strategy;
  }
  public setStrategy(value: JobStrategy | undefined): WorkflowJobBuilder {
    this._strategy = value;
    return this;
  }

  /**
   * @jsii ignore
   * @internal
   */
  public toJSON(): Job {
    return {
      runsOn: this._runsOn,
      runsOnGroup: this._runsOnGroup,
      steps: this._steps,
      environment: this.environment,
      outputs: this._outputs,
      env: this.env,
      defaults: this._defaults,
      timeoutMinutes: this._timeoutMinutes,
      continueOnError: this._continueOnError,
      container: this._container,
      services: this._services,
      tools: this._tools,
      name: this._name,
      needs: this._needs,
      permissions: this.permissions,
      concurrency: this.concurrency,
      if: this._if,
      strategy: this._strategy,
    };
  }
}
