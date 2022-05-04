import {
  IntegrationTestAutoDiscoverBase,
  IntegrationTestAutoDiscoverBaseOptions,
} from "../cdk";
import { Component } from "../component";
import { StandardProject } from "../standard-project";
import { IntegrationTest } from "./integration-test";

/**
 * Options for `AutoDiscover`.
 */
export interface AutoDiscoverOptions
  extends IntegrationTestAutoDiscoverOptions {
  /**
   * Automatically discover integration tests
   *
   * @default true
   */
  readonly integrationTestAutoDiscover?: boolean;
}

/**
 * Automatically discovers and creates `IntegrationTest`s from entry points
 * found in the test tree.
 */
export class AutoDiscover extends Component {
  constructor(project: StandardProject, options: AutoDiscoverOptions) {
    super(project);

    if (options.integrationTestAutoDiscover ?? true) {
      new IntegrationTestAutoDiscover(project, options);
    }
  }
}

export interface IntegrationTestAutoDiscoverOptions
  extends IntegrationTestAutoDiscoverBaseOptions {
  /**
   * Path to the tsconfig file to use for integration tests.
   */
  readonly tsconfigPath: string;
}

/**
 * Discovers and creates integration tests from files in the test root.
 */
export class IntegrationTestAutoDiscover extends IntegrationTestAutoDiscoverBase {
  constructor(
    project: StandardProject,
    options: IntegrationTestAutoDiscoverOptions
  ) {
    super(project, options);

    for (const entrypoint of this.entrypoints) {
      new IntegrationTest(project, {
        entrypoint,
        tsconfigPath: options.tsconfigPath,
      });
    }
  }
}
