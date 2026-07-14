import { Component } from "../component";
import type { Project } from "../project";
import { YamlFile } from "../yaml";
import type { PnpmWorkspaceYamlSchema } from "./pnpm-workspace-config";
import { toJson_PnpmWorkspaceYamlSchema } from "./pnpm-workspace-config";

/**
 * Options for `PnpmWorkspaceYaml`.
 *
 * @see https://pnpm.io/pnpm-workspace_yaml
 */
export interface PnpmWorkspaceYamlOptions extends PnpmWorkspaceYamlSchema {}

/**
 * Represents a `pnpm-workspace.yaml` file.
 *
 * @see https://pnpm.io/pnpm-workspace_yaml
 */
export class PnpmWorkspaceYaml extends Component {
  /**
   * Returns the `PnpmWorkspaceYaml` instance associated with a project or
   * `undefined` if there is none.
   */
  public static of(project: Project): PnpmWorkspaceYaml | undefined {
    const isIt = (o: unknown): o is PnpmWorkspaceYaml =>
      o instanceof PnpmWorkspaceYaml;
    return project.components.find(isIt);
  }

  constructor(project: Project, options: PnpmWorkspaceYamlOptions = {}) {
    super(project);

    new YamlFile(project, "pnpm-workspace.yaml", {
      omitEmpty: true,
      obj: () => toJson_PnpmWorkspaceYamlSchema(options),
      readonly: false,
      committed: true,
    });
  }
}
