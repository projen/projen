import { Component } from '../../component';
import { Definitions } from '../definitions';

/**
 * Options for `Service`.
 */
export interface ServiceOptions {

  readonly image: string;

  readonly variables?: { [name: string]: string };

  readonly memory?: number;
}


/**
 * Service definitions for Bitbucket Pipelines Configuration.
 *
 * Pipelines can spin up separate docker containers for services, which results
 * in faster builds, and easy service editing.
 *
 * @see https://support.atlassian.com/bitbucket-cloud/docs/databases-and-service-containers/
 */
export class Service extends Component {

  public readonly name: string;
  public readonly image: string;
  public readonly variables?: Record<string, string>;
  public readonly memory?: number;

  constructor(
    definitions: Definitions,
    name: string,
    options: ServiceOptions,
  ) {

    super(definitions.project);

    this.name = name;
    this.image = options.image;
    this.variables = options.variables;
    this.memory = options.memory;
  }


  /**
     * @internal
     */
  _render() {

    return {
      image: this.image,
      variables: this.variables,
      memory: this.memory,
    };
  }
}