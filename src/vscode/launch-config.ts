import { Component } from '../component';
import { JsonFile } from '../json';
import { VsCode } from './vscode';

interface VsCodeLaunchConfiguration {
  version: string;
  configurations: VsCodeLaunchConfigurationEntry[];
}

/**
 * Options for a 'VsCodeLaunchConfigurationEntry'
 */
export interface VsCodeLaunchConfigurationEntry {
  readonly type: string;
  readonly request: string;
  readonly name: string;
  readonly skipFiles: string[];
  readonly runtimeArgs?: string[];
  readonly args?: string[];
  readonly program?: string;
  readonly preLaunchTask?: string;
  readonly outFiles?: string[];
}

/**
 * VSCode launch configuration file (launch.json), useful for enabling in-editor debugger
 */
export class VsCodeLaunchConfig extends Component {
  private readonly content: VsCodeLaunchConfiguration;

  constructor(vscode: VsCode) {
    super(vscode.project);

    this.content = {
      version: '0.2.0',
      configurations: [],
    };

    new JsonFile(vscode.project, '.vscode/launch.json', {
      obj: this.content,
    });
  }

  public addConfiguration(cfg: VsCodeLaunchConfigurationEntry) {
    this.content.configurations.push(cfg);
  }
}
