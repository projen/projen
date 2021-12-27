import { Component } from '../component';
import { YamlFile } from '../yaml';
import { Bitbucket } from './bitbucket';
import { Definitions } from './definitions';
import { Image } from './model';
import { Pipelines } from './pipelines';


/**
 * Options for `PipelinesConfiguration`.
 */
export interface PipelinesYamlOptions {
  readonly image?: Image;
}


/**
 * Pipelines Configuration for Bitbucket.
 *
 * Bitbucket Pipelines is an integrated CI/CD service built into Bitbucket.
 *
 * @see https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/
 */
export class PipelinesYaml extends Component {

  public readonly file: YamlFile;
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
  public readonly image?: Image;


  public constructor( bitbucket: Bitbucket, options: PipelinesYamlOptions = {}) {

    super( bitbucket.project );

    this.definitions = new Definitions( this, {});
    this.pipelines = new Pipelines( this, {});
    this.image = options.image;

    this.file = new YamlFile(
      this.project,
      'bitbucket-pipelines.yml',
      { obj: () => this._render() },
    );

    options = options;
  }


  /**
   * @internal
   */
  public _render() {

    return {
      definitions: this.definitions._render(),
      pipelines: this.pipelines._render(),
    };
  }
}