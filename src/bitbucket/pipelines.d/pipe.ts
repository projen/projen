import { Component } from '../../component';
import { Step } from './step';

/**
 * Options for `Pipe`.
 */
export interface PipeOptions {
  /**
     * environment variables
     */
  readonly variables?: Record<string, string>;
}


/**
 * Pipe of Step Script
 *
 * Pipes provide a simple way to configure a pipeline. They are especially
 * powerful when you want to work with third-party tools.
 *
 * @see https://support.atlassian.com/bitbucket-cloud/docs/what-are-pipes/
 */
export class Pipe extends Component {

  /**
     * Name (ID) of pipe
     */
  private readonly name:string;
  /**
     * environment variables
     */
  private readonly variables?: Record<string, string>;

  constructor(
    step: Step,
    name: string,
    options: PipeOptions = {},
  ) {

    super( step.project );

    this.name = name;
    this.variables = options.variables;
  }


  /**
     * @internal
     */
  _render() {

    return {
      pipe: this.name,
      variables: this.variables,
    };
  }
}