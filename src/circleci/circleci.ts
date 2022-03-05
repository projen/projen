import { Component } from "../component";
import { Project } from "../project";
import { YamlFile } from "../yaml";

export interface CircleCiProps {
  readonly orbs?: IOrb[];
  readonly enabled?: boolean;
  readonly version?: string;
  readonly workflows?: IWorkflow[];
}

export interface IOrb {
  readonly key: string;
  readonly name: string;
  readonly version: string;
  fullOrbName(): string;
}

export class Orb implements IOrb {
  readonly key: string;
  readonly name: string;
  readonly version: string;

  constructor(key: string, name: string, version: string) {
    this.key = key;
    this.name = name;
    this.version = version;
  }
  public fullOrbName(): string {
    return `${this.name}@${this.version}`;
  }
}

export interface IWorkflow {
  readonly name: string;
  readonly jobs: IJob[];
}

export class Workflow implements IWorkflow {
  readonly jobs: IJob[];
  readonly name: string;

  constructor(name: string, jobs: IJob[] = []) {
    this.jobs = jobs;
    this.name = name;
  }
}

export interface IJob {
  readonly name: string;
  readonly requires?: string[];
  readonly context?: string[];
  readonly filters?: any;
  readonly params?: any;
}

export class Circleci extends Component {
  public readonly file: YamlFile | undefined;
  private options: CircleCiProps;
  private orbs: Record<string, string> = {};
  private workflows: Record<string, any> = {};

  constructor(project: Project, options: CircleCiProps = {}) {
    super(project);
    this.options = options;
    const circleCiEnabled = options.enabled || true;
    if (circleCiEnabled) {
      this.file = new YamlFile(project, ".circleci/config.yml", {
        committed: true,
        readonly: true,
        obj: () => this.renderCircleCi(),
      });
    }
  }
  private renderCircleCi() {
    this.initOrbs();
    this.initWorkflow();
    // console.log("have orbs:", this.orbs);
    return {
      version: this.options.version || "2.1",
      orbs: this.orbs,
      workflows: this.workflows,
    };
  }
  private initOrbs() {
    for (const orb of this.options.orbs ?? []) {
      this.addOrb(orb);
    }
  }
  private initWorkflow() {
    for (const workflow of this.options.workflows ?? []) {
      this.addWorkflow(workflow);
    }
  }
  public addOrb(orb: IOrb) {
    console.log("adding orb", orb);
    this.orbs[orb.key] = orb.fullOrbName();
  }
  public addWorkflow(workflow: IWorkflow) {
    console.log("got workflow jobs", workflow.jobs);
    if (workflow.jobs.length === 0) {
      throw new Error("Workflow must have at least one job");
    }
    const jobs: Array<any> = [];
    for (const job of workflow.jobs ?? []) {
      if (hasJobParameters(job)) {
        jobs.push({
          [job.name]: renderJob(job),
        });
      } else {
        jobs.push(job.name);
      }
    }
    this.workflows[workflow.name] = {
      jobs: jobs,
    };
  }
}

function renderJob(job: IJob) {
  return {
    ...(job.params ?? {}),
    ...(job.requires && job.requires.length > 0
      ? { requires: job.requires }
      : {}),
    ...(job.context && job.context.length > 0 ? { context: job.context } : {}),
    ...(job.filters ? { filters: job.filters } : {}),
  };
}

function hasJobParameters(job: IJob) {
  let hasParameters = false;
  if (job.context || job.requires || job.filters) {
    hasParameters = true;
  }
  return hasParameters;
}
