import { Component } from '../../component';
import { Line } from './line';
import { Pipe, PipeOptions } from './pipe';
import { Pipeline } from './pipeline';

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
     * step artifacts
     */
  private readonly artifacts?: string[];

  constructor(
    pipeline: Pipeline|Parallel,
    options: StepOptions,
  ) {

    super( pipeline.project );

    this.name = options.name;
    this.script = [];
    this.artifacts = options.artifacts;
  }


  /**
     * Add a script line.
     * @param value a script line
     * @returns this step
     */
  addLine( value: string ) {

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
  addPipe( name: string, options?: PipeOptions ) {

    const pipe = new Pipe( this, name, options );

    this.script.push( pipe );

    return this;
  }


  /**
     * @internal
     */
  public _render() {

    return {
      name: this.name,
      script: this.script.map( ( obj ) => { return obj._render(); } ),
      artifacts: this.artifacts,
    };
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
  public addStep( options: StepOptions ) {

    const step = new Step( this, options );

    this.steps.push( step );

    return step;
  }


  /**
     * @internal
     */
  public _render() {

    return this.steps.map( ( step ) => {
      return {
        step: step._render(),
      };
    } );
  }
}