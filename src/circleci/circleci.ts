import { Component } from "../component";
import { Project } from "../project";
import { kebabCaseKeys } from "../util";
import { YamlFile } from "../yaml";

export interface CircleciOptions {
  readonly orbs?: Record<string, string>;
  readonly enabled?: boolean;
  readonly version?: string;
  readonly workflows?: { [name: string]: Workflow };
}

export interface Workflow {
  readonly jobs: { [name: string]: Job }[];
}

export enum JobType {
  APPROVAL = "approval",
}

export interface Job {
  requires?: string[];
  name?: string;
  context?: string[];
  type?: JobType;
  filter?: Filter;
}

export interface Filter {
  branches?: FilterConfig;
  tags?: FilterConfig;
}

export interface FilterConfig {
  only?: string[];
  ignore?: string[];
}

export class Circleci extends Component {
  public readonly file: YamlFile;
  private options: CircleciOptions;
  private orbs: Record<string, string> = {};
  private workflows?: { [name: string]: Workflow };

  constructor(project: Project, options: CircleciOptions = {}) {
    super(project);
    this.options = options;
    this.workflows = options.workflows;
    this.orbs = options.orbs ?? {};
    // const circleCiEnabled = options.enabled || true;
    this.file = new YamlFile(project, ".circleci/config.yml", {
      obj: () => this.renderCircleci(),
    });
    // this.initWorkflow();
    // this.initOrbs();
    // this.printDebug();
  }
  private renderCircleci() {
    const workflows = kebabCaseKeys(this.workflows);
    return {
      version: this.options.version || "2.1",
      orbs: this.orbs,
      workflows: workflows,
    };
  }
  // private initOrbs() {
  //   this.orbs = this.options.orbs ?? {};
  // }
  public printDebug() {
    return JSON.stringify(this.renderCircleci(), null, 2);
  }
  // private initWorkflow() {
  //   for (const workflow of this.options.workflows) {
  //     this.addWorkflow(workflow);
  //   }
  // }

  public addOrb(name: string, orb: string) {
    if (this.orbs[name] !== undefined) {
      throw new Error(`Circleci Config already contains an orb named ${name}.`);
    }
    this.orbs[name] = orb;
  }

  // private reduceJobs(jobs: IJob[]) {
  //   const result: any = {};
  //   for (const job of jobs ?? []) {
  //     const { identifier, ...jobReduced } = job;
  //     result[job.identifier] = jobReduced;
  //   }
  //   return result;
  // }

  public addWorkflow(name: string, workflow: Workflow) {
    this.workflows = {
      ...this.workflows,
      ...{ [name]: workflow },
    };
    // const { identifier, ...workflowReduced } = workflow;
    // workflowReduced.jobs = this.reduceJobs(workflow.jobs ?? []);
    // this.workflows[workflow.identifier] = workflowReduced;
    // console.log("add workflows:\n ", JSON.stringify(this.workflows, null, 2));
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
