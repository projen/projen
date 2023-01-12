import { VsCode } from "./vscode";
import { Component } from "../component";
import { JsonFile } from "../json";

/**
 * VS Code Workspace recommended extensions
 * Source: https://code.visualstudio.com/docs/editor/extension-marketplace#_workspace-recommended-extensions
 */
export class VsCodeRecommendedExtensions extends Component {
  /**
   * List of extensions which should be recommended for users of this workspace.
   * The identifier of an extension is always '${publisher}.${name}'. For example: 'ms-python.python'.
   *
   * @default - no recommendations are made
   */
  private readonly recommendations: string[] = [];

  /**
   * List of extensions recommended by VS Code that should not be recommended for users of this workspace.
   * The identifier of an extension is always '${publisher}.${name}'. For example: 'ms-python.python'.
   *
   * @default - no recommendations are marked unwanted
   */
  private readonly unwantedRecommendations: string[] = [];

  constructor(vscode: VsCode) {
    super(vscode.project);

    new JsonFile(vscode.project, ".vscode/extensions.json", {
      omitEmpty: true,
      allowComments: true,
      obj: {
        recommendations: this.recommendations,
        unwantedRecommendations: this.unwantedRecommendations,
      },
    });
  }

  /**
   * Adds a list of VS Code extensions as recommendations for this workspace.
   *
   * @param extensions The extension IDs
   */
  public addRecommendations(...extensions: string[]) {
    this.recommendations.push(...extensions);
  }

  /**
   * Marks a list of VS Code extensions as unwanted recommendations for this workspace.
   * VS Code should not be recommend these extensions for users of this workspace.
   *
   * @param extensions The extension IDs
   */
  public addUnwantedRecommendations(...extensions: string[]) {
    this.unwantedRecommendations.push(...extensions);
  }
}
