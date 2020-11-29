import { Component } from '../component';
import { Project } from '../project';
import { VsCodeLaunchConfig } from './launch-config';

export class VsCode extends Component {
  constructor(project: Project) {
    super(project);
  }

  public addLaunchConfiguration() {
    return new VsCodeLaunchConfig(this);
  }
}
