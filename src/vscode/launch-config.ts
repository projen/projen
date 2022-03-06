import { Component } from "../component";
import { JsonFile } from "../json";
import { VsCode } from "./vscode";

/**
 * Controls the visibility of the VSCode Debug Console panel during a debugging session
 * Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes
 */
export enum InternalConsoleOptions {
  NEVER_OPEN = "neverOpen",
  OPEN_ON_FIRST_SESSION_START = "openOnFirstSessionStart",
  OPEN_ON_SESSION_START = "openOnSessionStart",
}

/**
 * VSCode launch configuration Presentation interface
 * "using the order, group, and hidden attributes in the presentation object you can sort,
 * group, and hide configurations and compounds in the Debug configuration dropdown
 * and in the Debug quick pick."
 * Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes
 */
export interface Presentation {
  readonly hidden: boolean;
  readonly group: string;
  readonly order: number;
}
/**
 * VSCode launch configuration ServerReadyAction interface
 * "if you want to open a URL in a web browser whenever the program under debugging
 * outputs a specific message to the debug console or integrated terminal."
 * Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes
 */
export interface ServerReadyAction {
  readonly action: string;
  readonly pattern?: string;
  readonly uriFormat?: string;
}

/**
 * Options for a 'VsCodeLaunchConfigurationEntry'
 * Source: https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes
 */
export interface VsCodeLaunchConfigurationEntry {
  readonly type: string;
  readonly request: string;
  readonly name: string;
  readonly args?: string[];
  readonly debugServer?: number;
  readonly internalConsoleOptions?: InternalConsoleOptions;
  readonly runtimeArgs?: string[];
  readonly postDebugTask?: string;
  readonly preLaunchTask?: string;
  readonly presentation?: Presentation;
  readonly program?: string;
  readonly serverReadyAction?: ServerReadyAction;
  readonly skipFiles?: string[];
  readonly outFiles?: string[];
  readonly url?: string;
  readonly webRoot?: string;
}

/**
 * VSCode launch configuration file (launch.json), useful for enabling in-editor debugger
 */
export class VsCodeLaunchConfig extends Component {
  private readonly content: VsCodeLaunchConfiguration;

  constructor(vscode: VsCode) {
    super(vscode, "VsCodeLaunchConfig");

    this.content = {
      version: "0.2.0",
      configurations: [],
    };

    new JsonFile(this, ".vscode/launch.json", {
      obj: this.content,
    });
  }

  /**
   * Adds a VsCodeLaunchConfigurationEntry (e.g. a node.js debugger) to `.vscode/launch.json.
   * Each configuration entry has following mandatory fields: type, request and name.
   * See https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes for details.
   * @param cfg VsCodeLaunchConfigurationEntry
   */
  public addConfiguration(cfg: VsCodeLaunchConfigurationEntry) {
    this.content.configurations.push(cfg);
  }
}

interface VsCodeLaunchConfiguration {
  version: string;
  configurations: VsCodeLaunchConfigurationEntry[];
}
