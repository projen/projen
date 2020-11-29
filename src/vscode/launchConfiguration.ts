import { FileBase } from '../file';
import { VsCode } from './vscode';

/**
 * Template for a VSCode Launch Configuration (useful for enabling in-editor debugger)
 */
export class VSCodeLaunchConfiguration extends FileBase {
  private readonly entryPoint: string;

  constructor(vscode: VsCode, entryPoint: string) {
    super(vscode.project, '.vscode/launch.json');
    this.entryPoint = entryPoint;
  }

  protected synthesizeContent() {
    return `{
        "version": "0.2.0",
        "configurations": [
          {
            "type": "node",
            "request": "launch",
            "name": "CDK Debugger",
            "skipFiles": ["<node_internals>/**"],
            "runtimeArgs": [
                "-r",
                "./node_modules/ts-node/register/transpile-only"
            ],
            "args": ["\${workspaceFolder}/src/${this.entryPoint}"]
          }
        ]
      }`;
  }
}
