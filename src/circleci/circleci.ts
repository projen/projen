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
  private workflows: IWorkflow[] = [];

  constructor(project: Project, options: CircleCiProps = {}) {
    super(project);
    this.options = options;
    this.workflows = options.workflows ?? [];
    // const circleCiEnabled = options.enabled || true;
    this.file = new YamlFile(project, ".circleci/config.yml", {
      obj: () => this.renderCircleCi(),
    });
    this.initOrbs();
  }

  private renderCircleCi() {
    const workflowRecords: Record<string, any> = {};
    for (const workflow of this.workflows) {
      const { identifier, ...reduced } = workflow;
      reduced.jobs = this.renderJobs(workflow.jobs);
      workflowRecords[identifier] = reduced;
    }

    return {
      version: this.options.version || "2.1",
      orbs: this.orbs,
      workflows: workflowRecords,
    };
  }

  public addWorkflow(workflow: IWorkflow) {
    this.workflows = [...this.workflows, workflow];
  }

  private renderJobs(jobs: IJob[] = []) {
    let result: any = [];
    for (const job of jobs ?? []) {
      const { identifier, ...reduced } = job;
      result = [...result, { [identifier]: reduced }];
    }
    return result;
  }

  private initOrbs() {
    this.orbs = this.options.orbs ?? {};
  }

  public addOrb(name: string, orb: string) {
    if (this.orbs[name] !== undefined) {
      throw new Error(`Circleci Config already contains an orb named ${name}.`);
    }
    this.orbs[name] = orb;
  }
}
