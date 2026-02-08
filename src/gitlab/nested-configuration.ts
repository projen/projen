import { CiConfigurationOptions } from ".";
import { CiConfiguration } from "./configuration";
import { GitlabConfiguration } from "./gitlab-configuration";
import { Project } from "../project";

/**
 * A GitLab CI for templates that are created and included in the `.gitlab-ci.yml` file.
 */
export class NestedConfiguration extends CiConfiguration {
  public readonly parent: GitlabConfiguration;
  constructor(
    project: Project,
    parent: GitlabConfiguration,
    name: string,
    options?: CiConfigurationOptions,
  ) {
    super(project, name, options);
    this.parent = parent;
  }
}
