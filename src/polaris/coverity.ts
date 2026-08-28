import { Component } from "../component";
import type { Project } from "../project";
import { deepMerge } from "../util";
import { YamlFile } from "../yaml";
import type { PolarisCoveritySchema } from "./coverity-config";
import { toJson_PolarisCoveritySchema } from "./coverity-config";

/**
 * Options for `PolarisCoverity`.
 */
export interface PolarisCoverityOptions extends PolarisCoveritySchema {}

/**
 * Manages `coverity.yml`, the configuration file for Coverity on Polaris
 * (Black Duck's SAST scanning tool).
 *
 * @see https://docs.blackduck.com/r/cov_polaris/latest/coverity-on-polaris/configuration-file-schema.html
 */
export class PolarisCoverity extends Component {
  /**
   * The YAML file for the Coverity on Polaris configuration.
   */
  public readonly file: YamlFile;

  constructor(project: Project, options: PolarisCoverityOptions) {
    super(project);

    const resolvedOptions = deepMerge(
      [
        {
          version: 1,
          capture: { encoding: "UTF-8" },
        },
        options,
      ],
      { destructive: true },
    ) as PolarisCoverityOptions;

    this.file = new YamlFile(project, "coverity.yml", {
      obj: () => toJson_PolarisCoveritySchema(resolvedOptions),
      omitEmpty: true,
    });
  }
}
