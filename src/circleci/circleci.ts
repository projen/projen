import { Component } from "../component";
import { Project } from "../project";
import { YamlFile } from "../yaml";

export interface CircleCiProps {
  readonly orbs?: Record<string, string>;
  readonly enabled?: boolean;
  readonly version?: string;
  readonly workflows?: IWorkflow[];
}

interface INamed {
  identifier: string;
}

export interface IWorkflow extends INamed {
  jobs?: IJob[];
}

interface IWorkflowReduced {
  jobs?: IJob[];
}

export enum JobType {
  APPROVAL = "approval",
}

export interface IJob extends INamed {
  requires?: string[];
  name?: string;
  context?: string[];
  type?: JobType;
  filter?: IFilter;
}

export interface IFilter {
  branches?: IFilterConfig;
  tags?: IFilterConfig;
}

export interface IFilterConfig {
  only?: string[];
  ignore?: string[];
}

export class Circleci extends Component {
  public readonly file: YamlFile;
  private options: CircleCiProps;
  private orbs: Record<string, string> = {};
  private workflows: Record<string, IWorkflowReduced> = {};

  constructor(project: Project, options: CircleCiProps = {}) {
    super(project);
    this.options = options;
    // const circleCiEnabled = options.enabled || true;
    this.file = new YamlFile(project, ".circleci/config.yml", {
      obj: () => this.renderCircleCi(),
    });
    this.initWorkflow();
    this.initOrbs();
    this.printDebug();
  }
  private renderCircleCi() {
    return {
      version: this.options.version || "2.1",
      orbs: this.orbs,
      workflows: this.workflows,
    };
  }
  private initOrbs() {
    this.orbs = this.options.orbs ?? {};
  }
  private printDebug() {
    console.log(
      "init config:\n ",
      JSON.stringify(this.renderCircleCi(), null, 2)
    );
  }
  private initWorkflow() {
    for (const workflow of this.options.workflows ?? []) {
      this.addWorkflow(workflow);
    }
  }

  public addOrb(name: string, orb: string) {
    if (this.orbs[name] !== undefined) {
      throw new Error(`Circleci Config already contains an orb named ${name}.`);
    }
    this.orbs[name] = orb;
  }

  private reduceJobs(jobs: IJob[]) {
    const result: any = {};
    for (const job of jobs ?? []) {
      const { identifier, ...jobReduced } = job;
      result[job.identifier] = jobReduced;
    }
    return result;
  }

  public addWorkflow(workflow: IWorkflow) {
    const { identifier, ...workflowReduced } = workflow;
    workflowReduced.jobs = this.reduceJobs(workflow.jobs ?? []);
    this.workflows[workflow.identifier] = workflowReduced;
    console.log("add workflows:\n ", JSON.stringify(this.workflows, null, 2));
  }
}

// function renderJob(job: IJob) {
//   return {
//     ...(job.params ?? {}),
//     ...(job.requires && job.requires.length > 0
//       ? { requires: job.requires }
//       : {}),
//     ...(job.context && job.context.length > 0 ? { context: job.context } : {}),
//     ...(job.filters ? { filters: job.filters } : {}),
//   };
// }

// function hasJobParameters(job: IJob) {
//   let hasParameters = false;
//   if (job.context || job.requires || job.filters) {
//     hasParameters = true;
//   }
//   return hasParameters;
// }
