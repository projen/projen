import { Component } from "../component";
import { Project } from "../project";
import { VsCodeLaunchConfig } from "./launch-config";
import { VsCodeSettings } from "./settings";

export class VsCode extends Component {
  private _launchConfig?: VsCodeLaunchConfig;
  private _settings?: VsCodeSettings;

  constructor(project: Project) {
    super(project);
  }

  public get launchConfiguration() {
    if (!this._launchConfig) {
      this._launchConfig = new VsCodeLaunchConfig(this);
    }

    return this._launchConfig;
  }

  public get settings() {
    if (!this._settings) {
      this._settings = new VsCodeSettings(this);
    }

    return this._settings;
  }
}
