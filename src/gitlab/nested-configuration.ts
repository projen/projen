import { Project } from '../project';
import { CiConfiguration } from './configuration';
import { GitlabConfiguration } from './gitlab-configuration';

/**
 * A GitLab CI for templates that are created and included in the `.gitlab-ci.yml` file.
 */
export class NestedConfiguration extends CiConfiguration {
  public readonly parent: GitlabConfiguration;
  constructor(project: Project, parent: GitlabConfiguration, name: string) {
    super(project, name);
    this.parent = parent;
  }
  /**
       * Add stages to the Nested configuration and the main CI file if not already present.
       * @param stages stages to add.
       */
  public addStages(...stages: string[]) {
    for (const stage of stages) {
      if (!this.stages.includes(stage)) {
        this.stages.push(stage);
      }
      this.parent.addStages(stage);
    }
  }
}
