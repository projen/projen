import { Component } from "./component";
import { Project } from "./project";

/**
 * A component representing the projen runtime configuration
 */
export abstract class ProjenrcFile extends Component {
  /**
   * Returns the `Projenrc` instance associated with a project or `undefined` if
   * there is no Projenrc.
   * @param project The project
   * @returns A Projenrc
   */
  public static of(project: Project): ProjenrcFile | undefined {
    const isProjenrc = (o: Component): o is ProjenrcFile =>
      o instanceof ProjenrcFile;
    return project.components.find(isProjenrc);
  }

  /**
   * The path of the projenrc file.
   */
  abstract readonly filePath: string;
}
