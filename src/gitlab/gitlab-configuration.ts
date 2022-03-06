import { Construct } from "constructs";
import { CiConfigurationOptions } from ".";
import { Project } from "../project";
import { CiConfiguration } from "./configuration";
import { NestedConfiguration } from "./nested-configuration";

/**
 * A GitLab CI for the main `.gitlab-ci.yml` file.
 */
export class GitlabConfiguration extends CiConfiguration {
  public readonly nestedTemplates: Record<string, NestedConfiguration> = {};
  constructor(scope: Construct, options?: CiConfigurationOptions) {
    super(scope, "gitlab-ci", options);
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
        Project.of(this),
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
