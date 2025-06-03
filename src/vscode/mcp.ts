import { Component } from "../component";
import { JsonFile } from "../json";
import { VsCode } from "./vscode";

export interface VsCodeMcpConfigOptions {
  readonly obj: any; // The contents of mcp.json
}

export class VsCodeMcpConfig extends Component {
  public readonly file: JsonFile;

  constructor(vscode: VsCode, options: VsCodeMcpConfigOptions) {
    super(vscode.project);
    this.file = new JsonFile(vscode.project, ".vscode/mcp.json", {
      obj: options.obj,
    });
  }
}
