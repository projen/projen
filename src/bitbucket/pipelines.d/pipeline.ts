import { Component } from '../../component';
import { Pipelines } from '../pipelines';
import { Step, StepOptions, Parallel } from './step';

/**
 * Options for `Pipeline`.
 */
export interface PipelineOptions {
}


/**
 * Pipeline
 *
 * @see https://support.atlassian.com/bitbucket-cloud/docs/configure-bitbucket-pipelinesyml/
 */
export class Pipeline extends Component {

  /**
     * Pipeline steps and/or parallelizations
     */
  private steps: ( Step | Parallel )[];

  constructor(
    pipelines: Pipelines,
    options: PipelineOptions,
  ) {

    super( pipelines.project );

    this.steps = [];

    options = options;
  }


  /**
     * Adds a step.
     * @param options step configuration
     * @returns a Parallel instance
     */
  public addStep( options: StepOptions ) {

    const step = new Step( this, options );

    this.steps.push( step );

    return step;
  }


  /**
     * Adds step parallelization.
     * @returns a Parallel instance
     */
  public addParallel() {

    const parallel = new Parallel( this );

    this.steps.push( parallel );

    return parallel;
  }


  /**
     * @internal
     */
  public _render() {

    return this.steps.map( ( step:Step|Parallel ) => {
      return {
        step: step._render(),
      };
    } );
  }
}