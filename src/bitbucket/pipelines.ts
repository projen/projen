import { Component } from '../component';
import { PipelinesYaml } from './configuration';
import { Pipeline, PipelineOptions } from './pipelines.d';
import * as util from './util';


/**
 * Options for `Pipelines`.
 */
export interface PipelinesOptions {}


/**
 * Pipelines for Bitbucket Pipelines Configuration.
 *
 * Bitbucket Pipelines is able to cache external build dependencies and
 * directories, such as 3rd-party libraries, between builds providing faster
 * builds, and reducing the number of consumed build minutes.
 *
 * @see https://support.atlassian.com/bitbucket-cloud/docs/cache-dependencies/
 */
export class Pipelines extends Component {
  /**
     * Pipeline definition for all branches that don't match a
     * pipeline definition in other sections.
     *
     * The default pipeline runs on every push to the repository unless a
     * branch-specific pipeline is defined. You can define a branch pipeline in
     * the branches section.
     *
     * Note: The default pipeline doesn't run on tags or bookmarks.
     */
  private default: Pipeline | undefined;
  /**
     * All branch-specific build pipelines. The names or
     * expressions in this section are matched against branches in your Git
     * repository.
     *
     * See [Branch workflows](https://confluence.atlassian.com/x/iioQMw) for
     * more information about configuring pipelines to  build specific branches
     * in your repository.
     */
  private branches: Record<string, Pipeline>;
  /**
     * Defines all tag-specific build pipelines. The names or expressions in
     * this section are matched against tags and annotated tags in your Git
     * repository.
     */
  private tags: Record<string, Pipeline>;
  /**
     * Defines all bookmark-specific build pipelines.
     */
  private bookmarks: Record<string, Pipeline>;
  /**
     * A special pipeline that only runs on pull requests initiated from within
     * your repository. It merges the destination branch into your working
     * branch before it runs. Pull requests from a forked repository don't
     * trigger the pipeline. If the merge fails, the pipeline stops
     */
  private pullRequests: Record<string, Pipeline>;
  /**
     * Defines pipelines that can only be triggered manually or scheduled from
     * the Bitbucket Cloud interface.
     */
  private custom: Record<string, Pipeline>;


  constructor(
    configuration: PipelinesYaml,
    options: PipelinesOptions = {},
  ) {

    super( configuration.project );

    this.default = undefined;
    this.branches = {};
    this.tags = {};
    this.bookmarks = {};
    this.pullRequests = {};
    this.custom = {};

    options = options;
  }


  /**
     * Adds a default pipeline.
     * @param options Configuration of pipeline
     * @returns a Pipeline instance
     */
  public addDefault( options?: PipelineOptions ) {

    const pipeline = new Pipeline(this, options);

    this.default = pipeline;

    return pipeline;
  }


  /**
     * Adds a branch-specific build pipeline.
     * @param branch name or glob expression of branch
     * @param options Configuration of pipeline
     * @returns a bitbucket.pipelines.Pipeline instance
     */
  public addBranch( branch: string, options?: PipelineOptions ) {

    const pipeline = new Pipeline(this, options);

    this.branches[ branch ] = pipeline;

    return pipeline;
  }


  /**
     * Adds a tag-specific build pipeline.
     * @param tag name or glob expression of tag
     * @param options configuration of pipeline
     * @returns a Pipeline instance
     */
  public addTag( tag: string, options?: PipelineOptions ) {

    const pipeline = new Pipeline(this, options);

    this.tags[ tag ] = pipeline;

    return pipeline;
  }


  /**
     * Adds a bookmark-specific build pipeline.
     * @param bookmark name or glob expression of bookmark
     * @param options configuration of pipeline
     * @returns a Pipeline instance
     */
  public addBookmark( bookmark: string, options?: PipelineOptions ) {

    const pipeline = new Pipeline(this, options);

    this.bookmarks[ bookmark ] = pipeline;

    return pipeline;
  }


  /**
     * Adds a special pipeline that only runs on pull requests initiated from
     * within the repository.
     * @param pullRequest name or glob expression of pull request
     * @param options configuration of pipeline
     * @returns a Pipeline instance
     */
  public addPullRequest( pullRequest: string, options?: PipelineOptions ) {

    const pipeline = new Pipeline(this, options);

    this.tags[ pullRequest ] = pipeline;

    return pipeline;
  }


  /**
     * Adds a custom pipeline.
     * @param name Name of custom pipeline
     * @param options Configuration of pipeline
     * @returns a Pipeline instance
     */
  public addCustom( name: string, options?: PipelineOptions ) {

    const pipeline = new Pipeline(this, options);

    this.custom[ name ] = pipeline;

    return pipeline;
  }

  /**
   * @internal
   */
  public _render() {

    const out = {
      default: ( ! this.default ) ? this.default : this.default._render(),
      branches: renderPipelines( this.branches ),
      tags: renderPipelines( this.tags ),
      bookmarks: renderPipelines( this.bookmarks ),
      pullRequests: renderPipelines( this.pullRequests ),
      custom: renderPipelines( this.custom ),
    };

    return util.reduceRenderObject( out );
  }

  /**
   *
   */
  public anyPipelineDefined() {

    const count = (this.default ? 1 : 0 ) +
                  Object.keys(this.branches).length +
                  Object.keys(this.tags).length +
                  Object.keys(this.bookmarks).length +
                  Object.keys(this.pullRequests).length +
                  Object.keys(this.custom).length;

    if ( count > 0 ) return true;

    return false;
  }
}


function renderPipelines( pipelines: Record<string, Pipeline> ) {

  const result: Record<string, unknown> = {};

  for ( const [index, pipeline] of Object.entries( pipelines ) ) {

    result[ index ] = pipeline._render();
  }

  return util.reduceRenderObject( result );
}