import { Component } from "../component";
import { Project } from "../project";
import { YamlFile } from "../yaml";
import { WorkflowJob, Workflow, Job } from "./model";

export interface CircleCiProps {
  readonly orbs?: Record<string, string>;
  readonly enabled?: boolean;
  readonly version?: number;
  readonly workflows?: Workflow[];
  readonly jobs?: Job[];
}

export class Circleci extends Component {
  public readonly file: YamlFile | undefined;
  private options: CircleCiProps;
  private readonly orbs: Record<string, string>;
  private workflows: Workflow[];
  private readonly jobs: Job[];

  constructor(project: Project, options: CircleCiProps = {}) {
    super(project);
    this.options = options;
    this.orbs = options.orbs ?? {};
    this.workflows = options.workflows ?? [];
    this.jobs = options.jobs ?? [];
    const circleCiEnabled = options.enabled || true;
    if (circleCiEnabled) {
      this.file = new YamlFile(project, ".circleci/config.yml", {
        obj: () => this.renderCircleCi(),
      });
    }
  }

  private renderCircleCi() {
    // render dynamic keys for workflow
    const workflowRecords: Record<string, any> = {};
    for (const workflow of this.workflows) {
      const { identifier, ...reduced } = workflow;
      reduced.jobs = this.renderJobs(workflow.jobs);
      workflowRecords[identifier] = reduced;
    }

    // render dynamic keys for jobs
    const jobRecords: Record<string, any> = {};
    for (const job of this.jobs) {
      const { identifier, ...reduced } = job;
      jobRecords[identifier] = reduced;
    }

    return {
      version: this.options.version || 2.1,
      orbs: this.orbs,
      jobs: jobRecords,
      workflows: workflowRecords,
    };
  }

  public addWorkflow(workflow: Workflow) {
    this.workflows = [...this.workflows, workflow];
  }

  private renderJobs(jobs: WorkflowJob[] = []) {
    let result: any = [];
    for (const job of jobs ?? []) {
      const { identifier, ...reduced } = job;
      result = [...result, { [identifier]: reduced }];
    }
    return result;
  }

  public addOrb(name: string, orb: string) {
    if (this.orbs[name] !== undefined) {
      throw new Error(`Circleci Config already contains an orb named ${name}.`);
    }
    this.orbs[name] = orb;
  }
}
