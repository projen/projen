import { Construct } from "constructs";
import {
  IntegrationTestAutoDiscoverBase,
  IntegrationTestAutoDiscoverBaseOptions,
} from "../cdk";
import { Component } from "../component";
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
  constructor(scope: Construct, options: AutoDiscoverOptions) {
    super(scope, "AutoDiscover");

    if (options.integrationTestAutoDiscover ?? true) {
      new IntegrationTestAutoDiscover(this, options);
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
  constructor(scope: Construct, options: IntegrationTestAutoDiscoverOptions) {
    super(scope, "IntegrationTestAutoDiscover", options);

    for (const entrypoint of this.entrypoints) {
      new IntegrationTest(this, {
        entrypoint,
        tsconfigPath: options.tsconfigPath,
      });
    }
  }
}
