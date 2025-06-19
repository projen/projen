import { Component } from "../component";
import { JsonFile } from "../json";
import { Project } from "../project";

/**
 * VS Code MCP configuration file generator
 */
export class VsCodeMcpConfig extends Component {
  private readonly content: any;
  public readonly file: JsonFile;

  constructor(project: Project, content: any = {}) {
    super(project);
    this.content = content;
    this.file = new JsonFile(project, ".vscode/mcp.json", {
      omitEmpty: false,
      obj: this.content,
    });
  }

  /**
   * Adds or updates a property in the mcp.json file
   * @param key The property key
   * @param value The property value
   */
  public setProperty(key: string, value: unknown) {
    this.content[key] = value;
  }
}
