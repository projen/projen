import { Component } from "../component";
import { IniFile } from "../ini";
import { NodeProject } from "../javascript";

/**
 * Options to configure the local NPM config
 */
export interface NpmConfigOptions {
  /**
   * URL of the registry mirror to use
   *
   * You can change this or add scoped registries using the addRegistry method
   *
   * @default - use npmjs default registry
   */
  readonly registry?: string;

  /**
   * Omits empty objects and arrays.
   * @default false
   */
  readonly omitEmpty?: boolean;
}

/**
 * File representing the local NPM config in .npmrc
 */
export class NpmConfig extends Component {
  /**
   * The config object. This object can be mutated until the project is
   * synthesized.
   */
  private readonly config: any = {};

  constructor(project: NodeProject, options: NpmConfigOptions = {}) {
    super(project);

    new IniFile(project, ".npmrc", {
      obj: this.config,
      omitEmpty: options.omitEmpty,
    });

    if (options.registry) {
      this.addRegistry(options.registry);
    }
  }

  /**
   * configure a scoped registry
   *
   * @param url the URL of the registry to use
   * @param scope the scope the registry is used for; leave empty for the default registry
   */
  public addRegistry(url: string, scope?: string) {
    this.addConfig(scope ? `${scope}:registry` : "registry", url);
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
