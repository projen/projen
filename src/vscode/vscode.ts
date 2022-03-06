import { Construct } from "constructs";
import { Component } from "../component";
import { VsCodeLaunchConfig } from "./launch-config";

export class VsCode extends Component {
  private _launchConfig?: VsCodeLaunchConfig;

  constructor(scope: Construct) {
    super(scope, "VsCode");
  }

  public get launchConfiguration() {
    if (!this._launchConfig) {
      this._launchConfig = new VsCodeLaunchConfig(this);
    }

    return this._launchConfig;
  }
}
