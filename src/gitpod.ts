import { Component } from './component';
import { NodeProject } from './node-project';
import { YamlFile } from './yaml';

const GITPOD_FILE = '.gitpod.yml';

export class Gitpod extends Component {
  constructor(project: NodeProject) {
    super(project);

    new YamlFile(project, GITPOD_FILE, {
      obj: {
        tasks: [{
          init: 'yarn install && yarn run build',
          command: 'yarn run start',
        }],
      },
    });
  }
}
