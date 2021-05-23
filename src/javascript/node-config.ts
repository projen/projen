import { IniFile } from '../ini';
import { NodeProject } from '../node-project';

export class NodeConfigFile extends IniFile {

  constructor(project: NodeProject) {
    super(project, '.npmrc', {});
  }

  /**
   * configureRegistry
   */
  public configureRegistry(url: string, scope?: string) {
    if (scope) {
      this.addOverride(`${scope}:registry`, url);
    } else {
      this.addOverride('registry', url);
    }
  }

}