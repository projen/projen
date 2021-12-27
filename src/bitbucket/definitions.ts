import { Component } from '../component';
import { PipelinesYaml } from './configuration';
import { Cache, CacheOptions, Service, ServiceOptions } from './definitions.d';


/**
 * Options for `Definitions`.
 */
export interface DefinitionsOptions {
}

/**
 * Definitions for Bitbucket Pipelines Configuration.
 *
 * Bitbucket Pipelines is able to cache external build dependencies and
 * directories, such as 3rd-party libraries, between builds providing faster
 * builds, and reducing the number of consumed build minutes.
 *
 * @see https://support.atlassian.com/bitbucket-cloud/docs/cache-dependencies/
 */
export class Definitions extends Component {

  /*
     * Custom caches
     */
  private caches: Record<string, Cache>;
  /*
     * Additional services
     */
  private services: Record<string, Service>;

  constructor(
    configuration: PipelinesYaml,
    options: DefinitionsOptions = {},
  ) {

    super( configuration.project );

    this.caches = {};
    this.services = {};

    options = options;
  }

  /**
     * Adds a cache definition.
     * @param name Name of the cache
     * @returns a Cache instance
     */
  public addCache( name: string, options: CacheOptions ) {

    const cache = new Cache(this, name, options);

    this.caches[ name ] = cache;

    return cache;
  }

  /**
     * Adds a service definition.
     * @param name Name of the service
     * @returns a Service instance
     */
  public addService( name: string, options: ServiceOptions ) {

    const service = new Service(this, name, options);

    this.services[ name ] = service;

    return service;
  }


  /**
     * @internal
     */
  public _render() {

    return {
      services: renderServices( this.services ),
      caches: renderCaches( this.caches ),
    };
  }
}


function renderServices( services: Record<string, Service> ) {

  const result: Record<string, unknown> = {};

  for ( const [name, service] of Object.entries( services ) ) {

    result[ name ] = service._render();
  }

  return result;
}


function renderCaches( caches: Record<string, Cache> ) {

  const result: Record<string, unknown> = {};

  for ( const [name, cache] of Object.entries( caches ) ) {

    result[ name ] = cache._render();
  }

  return result;
}