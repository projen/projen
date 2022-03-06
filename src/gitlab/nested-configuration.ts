import { Construct } from "constructs";
import { CiConfigurationOptions } from ".";
import { CiConfiguration } from "./configuration";
import { GitlabConfiguration } from "./gitlab-configuration";

/**
 * A GitLab CI for templates that are created and included in the `.gitlab-ci.yml` file.
 */
export class NestedConfiguration extends CiConfiguration {
  public readonly parent: GitlabConfiguration;
  constructor(
    scope: Construct,
    parent: GitlabConfiguration,
    name: string,
    options?: CiConfigurationOptions
  ) {
    super(scope, name, options);
    this.parent = parent;
  }
}
