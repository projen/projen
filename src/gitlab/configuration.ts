import { snake } from 'case';
import { Component } from '../component';
import { Project } from '../project';
import { YamlFile } from '../yaml';
import {
  Default,
  Include,
  IncludeItem,
  Job,
  Service,
  VariableConfig,
  Workflow,
} from './configuration-model';

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
  // /* Defines scripts that should run *after* the job. Can be set globally or per job. */
  // private afterScript?: Array<string[] | string>;
  // /* Defines scripts that should run *before* the job. Can be set globally or per job. */
  // private beforeScript?: Array<string[] | string>;
  // private cache?: Cache;
  private default?: Default;
  // private image?: Image | string;
  /**
       * Can be `IncludeItem` or `IncludeItem[]`. Each `IncludeItem` will be a string, or an
       * object with properties for the method if including external YAML file. The external
       * content will be fetched, included and evaluated along the `.gitlab-ci.yml`.
       */
  public readonly include: Array<IncludeItem | string> = [];
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
  public readonly variables: Record<string, number | VariableConfig | string> =
    {};
  private workflow?: Workflow;
  public readonly jobs: Record<string, Job> = {};

  constructor(project: Project, name: string) {
    super(project);
    this.project = project;
    this.name = name;
    this.path =
            this.name === 'gitlab-ci'
              ? '.gitlab-ci.yml'
              : `ci-templates/${name.toLocaleLowerCase()}.yml`;
    this.file = new YamlFile(this.project, this.path, {
      obj: () => this.renderCI(),
    });
  }

  /**
       * Set the GitLab default. Throws error if default has been previously set.
       * @param defaultConfig The default to use.
       */
  public configureDefault(defaultConfig: Default) {
    if (this.default === undefined) {
      this.default = defaultConfig;
    } else {
      throw new Error(
        `${this.name}: GitLab CI default has been previously set.`,
      );
    }
  }

  /**
       * Add additional yml/yaml files to the CI includes
       * @param includes The includes to add.
       */
  public addIncludeItems(...includes: (string | Include)[]) {
    for (const include of includes) {
      if (this.include.includes(include)) {
        throw new Error(`${this.name}: GitLab CI already contains ${include}.`);
      }
      this.include.push(include);
    }
  }

  /**
       * Set the GitLab pages job. Throws error if page job has been previously set.
       * @param job The job to use.
       */
  public configurePagesJob(job: Job) {
    if (this.pages === undefined) {
      this.pages = job;
    } else {
      throw new Error(
        `${this.name}: GitLab CI pages job has been previously set.`,
      );
    }
  }

  /**
       * Add additional services
       * @param services The services to add.
       */
  public addServices(...services: Service[]) {
    for (const service of services) {
      if (this.services.includes(service)) {
        throw new Error(
          `${this.name}: GitLab CI already contains service ${service}.`,
        );
      }
      this.services.push(service);
    }
  }

  /**
       * Add a globally defined variable to the CI configuration.
       * @param variables The variables to add.
       */
  public addGlobalVariables(
    variables: Record<string, number | VariableConfig | string>,
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
       * Set the CI workflow configuration. Throws error if timeout settings have been previously set.
       * @param workflow The workflow setting.
       */
  public configureWorkflow(workflow: Workflow) {
    if (this.workflow === undefined) {
      this.workflow = workflow;
    } else {
      throw new Error(
        `${this.name}: GitLab CI default workflow setting has been previously set.`,
      );
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
      // afterScript: this.afterScript,
      // beforeScript: this.beforeScript,
      // cache: snakeCaseKeys(this.cache),
      default: snakeCaseKeys(this.default),
      // image: snakeCaseKeys(this.image),
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
