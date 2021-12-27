import { Component } from '../../component';
import { Definitions } from '../definitions';

/**
 * Options for `Cache`.
 */
export interface CacheOptions {
  readonly path: string;
}


/**
 * Cache definitions for Bitbucket Pipelines Configuration.
 *
 * Bitbucket Pipelines is able to cache external build dependencies and
 * directories, such as 3rd-party libraries, between builds providing faster
 * builds, and reducing the number of consumed build minutes.
 *
 * @see https://support.atlassian.com/bitbucket-cloud/docs/cache-dependencies/
 */
export class Cache extends Component {

  public readonly name: string;
  public readonly path: string;

  constructor(
    definitions: Definitions,
    name: string,
    options: CacheOptions,
  ) {

    super(definitions.project);

    this.name = name;
    this.path = options.path;
  }


  /**
     * @internal
     */
  _render() {

    return this.path;
  }
}