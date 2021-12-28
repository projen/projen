import { Component } from '../../component';
import { Cache } from '../definitions.d/cache';
import { Image } from '../model';
import * as util from '../util';
import { Line } from './line';
import { Pipe, PipeOptions } from './pipe';
import { Pipeline } from './pipeline';


export interface CloneOption {
  /**
   * By default, enabled is set to ‘true’. Setting enabled to ‘false’ will
   * disable git clones. If you don’t need access to the source code in your
   * build, you may want to disable clones which will improve the build time
   * and save build minutes.
   */
  readonly enabled: boolean;
}


/**
 * Options for `Step`.
 */
export interface StepOptions {
  /**
     * name of step
     */
  readonly name?: string;
  /**
     * step artifacts
     */
  readonly artifacts?: string[];
  /**
   * runner labels
   *
   * run on the next available runner that has all the required labels.
   */
  readonly runsOn?: string[];
  /**
   * step caches
   */
  readonly caches?: (string|Cache)[];
  /**
   * image specifier
   *
   * You can specify any public or private Docker image that isn't hosted on a
   * private network.
   */
  readonly image?: string|Image;
  /**
   * trigger flag
   *
   * Specifies whether a step will run automatically or only after someone
   * manually triggers it.
   */
  readonly trigger?: string;
  /**
   * deployment flag
   *
   * Sets the type of environment for your deployment step, and it is used in
   * the Deployments dashboard. The Valid values are: test, staging, or
   * production.
   */
  readonly deployment?: string;
  /**
   * step size
   *
   * allocate additional memory to a step, or to the whole pipeline.
   * By specifying the size of 2x, you'll have double the memory available,
   * for example 4 GB memory → 8 GB memory.
   *
   * At this time, valid sizes are 1x and 2x.
   *
   * 2x pipelines will use twice the number of build minutes.
   */
  readonly size?: string;
  /**
   * step timeout
   *
   * the maximum amount of minutes a step can execute at a global level or at a
   * step level. Use a whole number greater than 0 and less than 120.
   */
  readonly maxTime?: number;
  /**
   * Contains settings for when Bitbucket clones your repository into a
   * container.
   */
  readonly clone?: CloneOption;
  /**
   * Enables the use of OpenID Connect with Pipelines and your resource server.
   * The oidc value must be set to true to set up and configure OpenID Connect.
   */
  readonly oidc?: boolean;
  /**
   * This allows steps to be executed only when a condition or rule is
   * satisfied. Currently, the only condition supported is changesets. Use
   * changesets to execute a step only if one of the modified files matches the
   * expression in includePaths.
   */
  readonly changesetIncludePaths?: string[];
}


/**
 * Step for Bitbucket Pipelines Configuration.
 *
 * A pipeline is made up of a list of steps.
 *
 * @see https://support.atlassian.com/bitbucket-cloud/docs/configure-bitbucket-pipelinesyml/
 */
export class Step extends Component {

  /**
   * name of step
   */
  private readonly name?:string;
  /**
   * step commands
   */
  private script: ( Line | Pipe )[];
  /**
   * after step commands
   */
  private afterScript: ( Line | Pipe )[];
  /**
   * step artifacts
   */
  private readonly artifacts?: string[];
  /**
   * runner labels
   *
   * run on the next available runner that has all the required labels.
   */
  private readonly runsOn?: string[];
  /**
   * step caches
   */
  private readonly caches?: (string|Cache)[];
  /**
   * image specifier
   *
   * You can specify any public or private Docker image that isn't hosted on a
   * private network.
   */
  private readonly image?: string|Image;
  /**
   * trigger flag
   *
   * Specifies whether a step will run automatically or only after someone
   * manually triggers it.
   */
  private readonly trigger?: string;
  /**
   * deployment flag
   *
   * Sets the type of environment for your deployment step, and it is used in
   * the Deployments dashboard. The Valid values are: test, staging, or
   * production.
   */
  private readonly deployment?: string;
  /**
   * step size
   *
   * allocate additional memory to a step, or to the whole pipeline.
   * By specifying the size of 2x, you'll have double the memory available,
   * for example 4 GB memory → 8 GB memory.
   *
   * At this time, valid sizes are 1x and 2x.
   *
   * 2x pipelines will use twice the number of build minutes.
   */
  private readonly size?: string;
  /**
   * step timeout
   *
   * the maximum amount of minutes a step can execute at a global level or at a
   * step level. Use a whole number greater than 0 and less than 120.
   */
  private readonly maxTime?: number;
  /**
   * Contains settings for when Bitbucket clones your repository into a
   * container.
   */
  private readonly clone?: CloneOption;
  /**
   * Enables the use of OpenID Connect with Pipelines and your resource server.
   * The oidc value must be set to true to set up and configure OpenID Connect.
   */
  private readonly oidc?: boolean;
  /**
   * This allows steps to be executed only when a condition or rule is
   * satisfied. Currently, the only condition supported is changesets. Use
   * changesets to execute a step only if one of the modified files matches the
   * expression in includePaths.
   */
  readonly changesetIncludePaths?: string[];


  constructor( pipeline: Pipeline|Parallel, options: StepOptions = {}) {

    super( pipeline.project );

    if ( options.trigger !== undefined && options.trigger !== 'manual' && options.trigger !== 'auto' ) {
      throw new Error( 'step trigger must be either \'auto\' or \'manual\'.');
    }

    if ( options.deployment !== undefined &&
         options.deployment !== 'test' &&
         options.deployment !== 'staging' &&
         options.deployment !== 'production' ) {
      throw new Error( 'step deployment must be either \'test\', \'staging\' or \'production\'.');
    }

    if (options.size !== undefined && options.size !== '2x' && options.size !== '4x') {
      throw new Error ('step size must be either \'2x\', or \'4x\'.');
    }

    if (options.maxTime !== undefined && (options.maxTime <= 0 || options.maxTime >= 120)) {
      throw new Error ('step max-time must be greater than 0 and less than 120.');
    }

    this.name = options.name;
    this.script = [];
    this.afterScript = [];
    this.image = options.image;
    this.trigger = options.trigger;
    this.size = options.size;
    this.deployment = options.deployment;
    this.artifacts = options.artifacts;
    this.runsOn = options.runsOn;
    this.maxTime = options.maxTime;
    this.clone = options.clone;
    this.oidc = options.oidc;
    this.changesetIncludePaths = options.changesetIncludePaths;
    this.caches = (options.caches ?? []).map( ( cache:string|Cache ) => {
      if ( cache instanceof Cache ) return cache.name;
      return cache;
    });
  }


  /**
     * Add a script line.
     * @param value a script line
     * @returns this step
     */
  addScriptLine( value: string ) {

    const line = new Line( this, value );

    this.script.push( line );

    return this;
  }


  /**
   * Add a script pipe.
   * @param name the docker image id conformant name of the pipe
   * @param options configuration of the pipe
   * @returns this step
   */
  addScriptPipe( name: string, options?: PipeOptions ) {

    const pipe = new Pipe( this, name, options );

    this.script.push( pipe );

    return this;
  }


  /**
   * Add a after-script line.
   * @param value a script line
   * @returns this step
   */
  addAfterScriptLine( value: string ) {

    const line = new Line( this, value );

    this.afterScript.push( line );

    return this;
  }


  /**
   * Add a after-script pipe.
   * @param name the docker image id conformant name of the pipe
   * @param options configuration of the pipe
   * @returns this step
   */
  addAfterScriptPipe( name: string, options?: PipeOptions ) {

    const pipe = new Pipe( this, name, options );

    this.afterScript.push( pipe );

    return this;
  }


  /**
     * @internal
     */
  public _render() {

    if (this.script.length === 0 ) throw Error( 'no script specified' );

    const afterScript = util.reduceRenderArray(
      this.afterScript.map( ( obj ) => { return obj._render(); } ),
    );

    var condition = undefined;
    if ( (this.changesetIncludePaths ?? []).length > 0 ) {
      condition = {
        changesets: {
          includePaths: this.changesetIncludePaths,
        },
      };
    }

    return util.reduceRenderObject({
      'name': this.name,
      'runs-on': this.runsOn,
      'image': this.image,
      'size': this.size,
      'trigger': this.trigger,
      'max-time': this.maxTime,
      'deployment': this.deployment,
      'script': this.script.map( ( obj ) => { return obj._render(); } ),
      'after-script': afterScript,
      'artifacts': this.artifacts,
      'clone': this.clone,
      'oidc': this.oidc,
      'condition': condition,
      'caches': util.reduceRenderArray( this.caches ),
    });
  }
}


/**
 * Parallelization of Steps
 *
 * Parallel steps enable you to build and test faster, by running a set of
 * self-contained steps at the same time.
 *
 * @see https://support.atlassian.com/bitbucket-cloud/docs/set-up-or-run-parallel-steps/
 */
export class Parallel extends Component {

  /**
     * parallelization steps
     */
  private steps: Step[];

  constructor(
    pipeline: Pipeline,
  ) {

    super( pipeline.project );

    this.steps = [];
  }


  /**
     * Adds a step.
     * @param options step configuration
     * @returns a Step instance
     */
  public addStep( options?: StepOptions ) {

    const step = new Step( this, options );

    this.steps.push( step );

    return step;
  }


  /**
     * @internal
     */
  public _render() {

    const out = this.steps.map( ( step ) => {
      return {
        step: step._render(),
      };
    } );

    return util.reduceRenderArray( out );
  }
}