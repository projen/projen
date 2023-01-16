import { CiConfigurationOptions } from ".";
import { CiConfiguration } from "./configuration";
import { NestedConfiguration } from "./nested-configuration";
import { Project } from "../project";

/**
 * A GitLab CI for the main `.gitlab-ci.yml` file.
 */
export class GitlabConfiguration extends CiConfiguration {
  public readonly nestedTemplates: Record<string, NestedConfiguration> = {};
  constructor(project: Project, options?: CiConfigurationOptions) {
    super(project, "gitlab-ci", options);
  }

  /**
   * Creates and adds nested templates to the includes of the main CI.
   * Additionally adds their stages to the main CI if they are not already present.
   * You can futher customize nested templates through the `nestedTemplates` property.
   * E.g. gitlabConfig.nestedTemplates['templateName']?.addStages('stageName')
   * @param config a record the names and configuraitons of the templates.
   */
  public createNestedTemplates(config: Record<string, CiConfigurationOptions>) {
    for (const [name, options] of Object.entries(config)) {
      if (this.nestedTemplates[name] !== undefined) {
        throw new Error(
          `${this.name}: GitLab CI already contains template "${name}".`
        );
      }
      const template = new NestedConfiguration(
        this.project,
        this,
        name,
        options
      );
      this.nestedTemplates[template.name] = template;
      this.addIncludes({ local: template.path });
      this.addStages(...template.stages);
    }
  }
}
