import { Component } from '../../component';
import { Step } from './step';

/**
 * Options for `Line`.
 */
export interface LineOptions {}


/**
 * Line of Step Script
 */
export class Line extends Component {

  /**
     * value of script line
     */
  private readonly value:string;

  constructor(
    step: Step,
    value: string,
  ) {

    super( step.project );

    this.value = value;
  }


  /**
     * @internal
     */
  _render() {

    return this.value;
  }
}