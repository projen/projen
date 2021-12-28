import { snake } from 'case';
import { Component } from '../component';
import { Project } from '../project';
import { YamlFile } from '../yaml';
import {
  Default,
  Include,
  Job,
  Service,
  VariableConfig,
  Workflow,
} from './configuration-model';

export interface CiConfigurationOptions {
  readonly default?: Default;
  /**
   * A special job used to upload static sites to Gitlab pages. Requires a `public/` directory
   * with `artifacts.path` pointing to it.
   */
  readonly pages?: Job;
  readonly workflow?: Workflow;
  /**
   * Groups jobs into stages. All jobs in one stage must complete before next stage is
   * executed. Defaults to ['build', 'test', 'deploy'].
   */
  readonly stages?: string[];
  readonly variables?: Record<string, any>;
  readonly jobs?: Record<string, Job>;
}

/**
 * CI for GitLab.
 * A CI is a configurable automated process made up of one or more stages/jobs.
 * @see https://docs.gitlab.com/ee/ci/yaml/
 */
export class CiConfiguration extends Component {
  public readonly project: Project;
  public readonly name: string;
  /** Path to CI file */
  public readonly path: string;
  /**
   * The workflow YAML file.
   */
  public readonly file: YamlFile;
  private default?: Default;
  /**
   * Can be `Include` or `Include[]`. Each `Include` will be a string, or an
   * object with properties for the method if including external YAML file. The external
   * content will be fetched, included and evaluated along the `.gitlab-ci.yml`.
   */
  public readonly include: Array<Include | string> = [];
  /**
   * A special job used to upload static sites to Gitlab pages. Requires a `public/` directory
   * with `artifacts.path` pointing to it.
   */
  private pages?: Job;
  public readonly services: Array<Service | string> = [];
  /**
   * Groups jobs into stages. All jobs in one stage must complete before next stage is
   * executed. Defaults to ['build', 'test', 'deploy'].
   */
  public readonly stages: string[] = [];
  public readonly variables: Record<string, number | VariableConfig | string> = {};
  private workflow?: Workflow;
  public readonly jobs: Record<string, Job> = {};

  constructor(project: Project, name: string, options?: CiConfigurationOptions) {
    super(project);
    this.project = project;
    this.name = name;
    this.path =
      this.name === 'gitlab-ci'
        ? '.gitlab-ci.yml'
        : `.gitlab/ci-templates/${name.toLocaleLowerCase()}.yml`;
    this.file = new YamlFile(this.project, this.path, {
      obj: () => this.renderCI(),
    });
    this.default = options?.default;
    this.pages = options?.pages;
    this.workflow = options?.workflow;
    if (options?.stages) {
      this.addStages(...options.stages);
    }
    if (options?.variables) {
      this.addJobs(options.variables);
    }
    if (options?.jobs) {
      this.addJobs(options.jobs);
    }

  }

  /**
   * Add additional yml/yaml files to the CI includes
   * @param includes The includes to add.
   */
  public addIncludes(...includes: (string | Include)[]) {
    for (const include of includes) {
      if (this.include.includes(include)) {
        throw new Error(`${this.name}: GitLab CI already contains ${include}.`);
      }
      this.include.push(include);
    }
  }

  /**
   * Add additional services.
   * @param services The services to add.
   */
  public addServices(...services: (string | Service)[]) {
    for (const additional of services) {
      for (const existing of this.services) {
        if (this.areEqualServices(existing, additional)) {
          throw new Error(
            `${this.name}: GitLab CI already contains service ${additional}.`,
          );
        }
      }
      this.services.push(additional);
    }
  }

  /**
   * Check if the equality of services by comparing their names and aliases .
   * @param x First service to compare.
   * @param y Second service to compare.
   * @returns Whether the services have the same name and alias.
   */
  private areEqualServices(x: Service | string, y: Service | string): boolean {
    const serviceXName = typeof x == 'string' ? x : x.name;
    const serviceYName = typeof y == 'string' ? x : y.name;
    if (serviceXName === serviceYName) {
      if ((x as Service).alias === (y as Service).alias) {
        return true;
      }
    }
    return false;
  }


  /**
   * Add a globally defined variable to the CI configuration.
   * @param variables The variables to add.
   */
  public addGlobalVariables(
    variables: Record<string, any>,
  ) {
    for (const [key, value] of Object.entries(variables)) {
      if (this.variables[key] !== undefined) {
        throw new Error(
          `${this.name}: GitLab CI already contains variable ${key}.`,
        );
      }
      this.variables[key] = value;
    }
  }

  /**
   * Add stages to the CI configuration if not already present.
   * @param stages stages to add.
   */
  public addStages(...stages: string[]) {
    for (const stage of stages) {
      if (!this.stages.includes(stage)) {
        this.stages.push(stage);
      }
    }
  }

  /**
   * Add jobs and their stages to the CI configuration.
   * @param jobs Jobs to add.
   */
  public addJobs(jobs: Record<string, Job>) {
    for (const [key, value] of Object.entries(jobs)) {
      if (this.jobs[key] !== undefined) {
        throw new Error(`${this.name}: GitLab CI already contains job ${key}.`);
      }
      this.jobs[key] = value;
      if (value.stage) {
        this.addStages(value.stage);
      }
    }
  }

  private renderCI() {
    return {
      default: snakeCaseKeys(this.default),
      include:
        this.include.length > 0 ? snakeCaseKeys(this.include) : undefined,
      pages: snakeCaseKeys(this.pages),
      services:
        this.services.length > 0 ? snakeCaseKeys(this.services) : undefined,
      variables:
        Object.entries(this.variables).length > 0 ? this.variables : undefined,
      workflow: snakeCaseKeys(this.workflow),
      stages: this.stages.length > 0 ? this.stages : undefined,
      ...snakeCaseKeys(this.jobs),
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
