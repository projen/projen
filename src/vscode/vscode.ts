import { Component } from '../component';
import { Project } from '../project';
import { VSCodeLaunchConfiguration } from './launchConfiguration';

export class VsCode extends Component {
  constructor(project: Project) {
    super(project);
  }

  public addLaunchConfiguration(entryPoint = 'main.ts') {
    return new VSCodeLaunchConfiguration(this, entryPoint);
  }
}
