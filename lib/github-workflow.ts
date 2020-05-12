import { FileBase } from './file';
import * as YAML from 'yaml';
import { GENERATION_DISCLAIMER } from './common';
import { Project } from './project';

export interface GithubWorkflowOptions {
  /**
   * @default - same as name
   */
  readonly name?: string;
}

export class GithubWorkflow extends FileBase {

  private readonly name: string;
  private events: { [event: string]: any } = { };
  private jobs: { [jobid: string]: any } = { };

  constructor(project: Project, name: string, options: GithubWorkflowOptions = { }) {
    super(project, `.github/workflows/${name}.yml`, { committed: true });
    
    this.name = options.name ?? name;
  }

  public on(events: { [event: string]: any }) {
    this.events = {
      ...this.events,
      ...events,
    };
  }

  public addJobs(jobs: { [jobid: string]: any }) {
    this.jobs = {
      ...this.jobs,
      ...jobs,
    };
  }

  public get data() {
    const workflow = {
      name: this.name,
      on: this.events,
      jobs: this.jobs,
    };

    return [
      `# ${GENERATION_DISCLAIMER}`,
      YAML.stringify(workflow),
    ].join('\n')
  }
}
