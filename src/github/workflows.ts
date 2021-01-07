import * as YAML from 'yaml';
import { FileBase, IResolver } from '../file';
import { GitHub } from './github';

export class GithubWorkflow extends FileBase {
  private readonly name: string;
  private events: { [event: string]: any } = { };
  private jobs: { [jobid: string]: any } = { };

  constructor(github: GitHub, name: string) {
    super(github.project, `.github/workflows/${name.toLocaleLowerCase()}.yml`);
    this.name = name;
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

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const workflow = resolver.resolve({
      name: this.name,
      on: this.events,
      jobs: this.jobs,
    });

    return [
      `# ${FileBase.PROJEN_MARKER}`,
      YAML.stringify(workflow),
    ].join('\n');
  }
}
