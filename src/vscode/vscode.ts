import { Component } from '../component';
import { Project } from '../project';
import { VsCodeLaunchConfig } from './launch-config';

export class VsCode extends Component {
  private _launchConfig?: VsCodeLaunchConfig;

  constructor(project: Project) {
    super(project);
  }

  public get launchConfiguration() {
    if (!this._launchConfig) {
      this._launchConfig = new VsCodeLaunchConfig(this);
    }

    return this._launchConfig;
  }
}
