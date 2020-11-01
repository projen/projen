import { Component } from './component';
import { NodeProject } from './node-project';
import { YamlFile, YamlFileOptions } from './yaml';

const GITPOD_FILE = '.gitpod.yml';

export interface GitpodOptions extends YamlFileOptions {

}

export class Gitpod extends Component {
  constructor(project: NodeProject, options: GitpodOptions) {
    super(project);

    new YamlFile(project, GITPOD_FILE, options);
  }
}
