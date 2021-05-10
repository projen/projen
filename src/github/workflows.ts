import { Component } from '../component';
import { YamlFile } from '../yaml';
import { GitHub } from './github';

export class GithubWorkflow extends Component {
  private readonly name: string;
  private events: { [event: string]: any } = { };
  private jobs: { [jobid: string]: any } = { };
  public readonly file: YamlFile;

  constructor(github: GitHub, name: string) {
    super(github.project);

    this.name = name;
    this.file = new YamlFile(this.project, `.github/workflows/${name.toLocaleLowerCase()}.yml`, {
      obj: () => this.renderWorkflow(),
    });
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

  private renderWorkflow() {
    return {
      name: this.name,
      on: this.events,
      jobs: this.jobs,
    };
  }
}
