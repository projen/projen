import { CiConfigurationOptions } from '.';
import { Project } from '../project';
import { CiConfiguration } from './configuration';
import { NestedConfiguration } from './nested-configuration';

/**
 * A GitLab CI for the main `.gitlab-ci.yml` file.
 */
export class GitlabConfiguration extends CiConfiguration {
  public readonly nestedTemplates: Record<string, NestedConfiguration> = {};
  constructor(project: Project, options?: CiConfigurationOptions) {
    super(project, 'gitlab-ci', options);
  }

  /**
   * Creates and adds nested templates to the includes of the main CI. Additionally adds their stages to the main CI if they are not already present.
   * @param names The template names.
   */
  public createNestedTemplates(...names: string[]) {
    for (const name of names) {
      if (this.nestedTemplates[name] !== undefined) {
        throw new Error(
          `${this.name}: GitLab CI already contains template "${name}".`,
        );
      }
      const template = new NestedConfiguration(this.project, this, name);
      this.nestedTemplates[template.name] = template;
      this.addIncludes({ local: template.path });
      this.addStages(...template.stages);
    }
  }
}
