import { Component } from '../component';
import { IniFile } from '../ini';
import { NodeProject } from '../node-project';

/**
 * Options to configure the local NodeJS config
 */
export interface NodeConfigOptions {
  /**
   * URL of the registry mirror to use
   *
   * @default - use npmjs default registry
   */
  registry?: string;
}

/**
 * File representing the local NodeJS config in .npmrc
 */
export class NodeConfig extends Component {

  /**
   * The config object. This object can be mutated until the project is
   * synthesized.
   */
  private readonly config: any = {};

  constructor(project: NodeProject, options: NodeConfigOptions = {}) {
    super(project);

    new IniFile(project, '.npmrc', { obj: this.config });

    if (options.registry) {
      this.addConfig('registry', options.registry);
    }
  }

  /**
   * configure a scoped registry
   *
   * @param scope the scope the registry is used for
   * @param url the URL of the registry to use
   */
  public configureRegistry(scope: string, url: string) {
    if (scope) {
      this.addConfig(`${scope}:registry`, url);
    }
  }

  /**
   * configure a generic property
   *
   * @param name the name of the property
   * @param value the value of the property
   */
  public addConfig(name: string, value: string) {
    this.config[name] = value;
  }

}