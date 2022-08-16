import { Component } from "../component";
import { Project } from "../project";
import { WorkspaceRecommendedExtensions } from "./extensions";
import { VsCodeLaunchConfig } from "./launch-config";

export class VsCode extends Component {
  private _launchConfig?: VsCodeLaunchConfig;
  private _extensions?: WorkspaceRecommendedExtensions;

  constructor(project: Project) {
    super(project);
  }

  public get launchConfiguration() {
    if (!this._launchConfig) {
      this._launchConfig = new VsCodeLaunchConfig(this);
    }

    return this._launchConfig;
  }

  public get extensions() {
    if (!this._extensions) {
      this._extensions = new WorkspaceRecommendedExtensions(this);
    }

    return this._extensions;
  }
}
