import { resolve } from "../_resolve";
import { Component } from "../component";
import { JsonFile } from "../json";
import type { Project } from "../project";
import type { NodeConfigSchema } from "./node-config";
import { toJson_NodeConfigSchema } from "./node-config";

/**
 * Options for `NodeConfigFile`.
 *
 * @see https://nodejs.org/api/cli.html#configuration-via-nodeconfig
 */
export interface NodeConfigFileOptions extends NodeConfigSchema {
  /**
   * The path of the generated Node.js configuration file.
   *
   * @default "node.config.json"
   */
  readonly filePath?: string;
}

/**
 * Represents a Node.js configuration file, loaded via
 * `--experimental-config-file`.
 *
 * @see https://nodejs.org/api/cli.html#configuration-via-nodeconfig
 */
export class NodeConfigFile extends Component {
  /**
   * Returns the `NodeConfigFile` instance associated with a project or
   * `undefined` if there is none.
   */
  public static of(project: Project): NodeConfigFile | undefined {
    const isIt = (o: unknown): o is NodeConfigFile =>
      o instanceof NodeConfigFile;
    return project.components.find(isIt);
  }

  /**
   * Escape hatch for the generated configuration file.
   */
  public readonly config: NodeConfigSchema;

  /**
   * The underlying Node.js configuration file.
   */
  public readonly file: JsonFile;

  constructor(project: Project, options: NodeConfigFileOptions = {}) {
    super(project);

    const { filePath = "node.config.json", ...config } = options;
    this.config = config;

    this.file = new JsonFile(project, filePath, {
      // resolve first so that any lazily-computed values (e.g. a function
      // returning the current state of a live collection) in `this.config`
      // are evaluated before the generated schema mapper reads them.
      obj: () => toJson_NodeConfigSchema(resolve(this.config)),
      omitEmpty: true,
      marker: false,
    });
  }
}
