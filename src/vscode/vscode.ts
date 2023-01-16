import { VsCodeRecommendedExtensions } from "./extensions";
import { VsCodeLaunchConfig } from "./launch-config";
import { VsCodeSettings } from "./settings";
import { Component } from "../component";
import { Project } from "../project";

export class VsCode extends Component {
  private _launchConfig?: VsCodeLaunchConfig;
  private _settings?: VsCodeSettings;
  private _extensions?: VsCodeRecommendedExtensions;

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

  public get extensions() {
    if (!this._extensions) {
      this._extensions = new VsCodeRecommendedExtensions(this);
    }

    return this._extensions;
  }
}
