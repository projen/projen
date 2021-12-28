import { Component } from '../component';
import { Project } from '../project';
import { YamlFile } from '../yaml';
import { Bitbucket } from './bitbucket';
import { Definitions } from './definitions';
import { Image, RepositoryCloneOptions, RepositoryOptions } from './model';
import { Pipelines } from './pipelines';
import * as util from './util';


/**
 * Options for `PipelinesConfiguration`.
 */
export interface PipelinesYamlOptions {
  readonly image?: string|Image;
  /**
   * Contains settings for when we clone your repository into a container.
   */
  readonly clone?: RepositoryCloneOptions;
  /**
   * Contains global settings that apply to all your pipelines
   */
  readonly options?: RepositoryOptions;
}


/**
 * Pipelines Configuration for Bitbucket.
 *
 * Bitbucket Pipelines is an integrated CI/CD service built into Bitbucket.
 *
 * @see https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/
 */
export class PipelinesYaml extends Component {

  public readonly definitions: Definitions;
  public readonly pipelines: Pipelines;
  /*
   * Use Docker images as build environments
   *
   * Bitbucket Pipelines runs your builds in Docker containers. These
   * containers run a Docker image that defines the build environment. You
   * can use the default image provided by Bitbucket or get a custom one.
   *
   * @see https://support.atlassian.com/bitbucket-cloud/docs/use-docker-images-as-build-environments/
   */
  private readonly image?: string|Image;

  /**
   * Contains settings for when we clone your repository into a container.
   */
  private readonly clone?: RepositoryCloneOptions;

  /**
   * Contains global settings that apply to all your pipelines
   */
  private readonly options?: RepositoryOptions;

  constructor( bitbucket: Bitbucket|Project, options: PipelinesYamlOptions = {}) {

    if ( bitbucket instanceof Project ) {
      super( bitbucket );
    } else {

      super( bitbucket.project );
    }

    this.definitions = new Definitions( this, {});
    this.pipelines = new Pipelines( this, {});
    this.image = options.image;
    this.clone = options.clone;
    this.options = options.options;

    new YamlFile(
      this.project,
      'bitbucket-pipelines.yml',
      { obj: () => this._render() },
    );
  }


  /**
   * @internal
   */
  public _render( strict?:boolean ) {

    if ( strict === true && !this.pipelines.anyPipelineDefined() ) {

      throw new Error( 'at least on pipeline must be defined' );
    }

    const out = {
      definitions: this.definitions._render(),
      pipelines: this.pipelines._render(),
      clone: this.clone,
      options: renderOptions( this.options ),
      image: this.image,
    };

    return util.reduceRenderObject( out );
  }
}


function renderOptions( options:RepositoryOptions|undefined ) {

  if ( options !== undefined && options.maxTime !== undefined ) {
    return {
      'max-time': options.maxTime,
    };
  }

  return options;
}