import { AwsCdkDeps } from "./awscdk-deps";
import {
  IntegrationTest,
  IntegrationTestCommonOptions,
} from "./integration-test";
import {
  TYPESCRIPT_EDGE_LAMBDA_EXT,
  TYPESCRIPT_LAMBDA_EXT,
  TYPESCRIPT_LAMBDA_EXTENSION_EXT,
} from "./internal";
import {
  LambdaExtension,
  LambdaExtensionCommonOptions,
} from "./lambda-extension";
import { LambdaFunction, LambdaFunctionCommonOptions } from "./lambda-function";
import {
  AutoDiscoverBase,
  IntegrationTestAutoDiscoverBase,
  IntegrationTestAutoDiscoverBaseOptions,
} from "../cdk";
import { Component } from "../component";
import { Project } from "../project";

/**
 * Common options for auto discovering project subcomponents.
 */
export interface AutoDiscoverCommonOptions {
  /**
   * Path to the tsconfig file to use for integration tests.
   */
  readonly tsconfigPath: string;

  /**
   * AWS CDK dependency manager.
   */
  readonly cdkDeps: AwsCdkDeps;
}

/**
 * Options for `IntegrationTestAutoDiscover`
 */
export interface IntegrationTestAutoDiscoverOptions
  extends AutoDiscoverCommonOptions, IntegrationTestAutoDiscoverBaseOptions {
  /**
   * Options for integration tests.
   */
  readonly integrationTestOptions?: IntegrationTestCommonOptions;
}

/**
 * Creates integration tests from entry points discovered in the test tree.
 */
export class IntegrationTestAutoDiscover extends IntegrationTestAutoDiscoverBase {
  constructor(project: Project, options: IntegrationTestAutoDiscoverOptions) {
    super(project, options);

    for (const entrypoint of this.entrypoints) {
      new IntegrationTest(this.project, {
        entrypoint,
        cdkDeps: options.cdkDeps,
        tsconfigPath: options.tsconfigPath,
        ...options.integrationTestOptions,
      });
    }
  }
}

/**
 * Options for `LambdaAutoDiscover`
 */
export interface LambdaAutoDiscoverOptions extends AutoDiscoverCommonOptions {
  /**
   * Project source tree (relative to project output directory).
   */
  readonly srcdir: string;

  /**
   * Options for AWS Lambda functions.
   */
  readonly lambdaOptions?: LambdaFunctionCommonOptions;
}

/**
 * Creates lambdas from entry points discovered in the project's source tree.
 */
export class LambdaAutoDiscover extends AutoDiscoverBase {
  constructor(project: Project, options: LambdaAutoDiscoverOptions) {
    super(project, {
      projectdir: options.srcdir,
      extension: TYPESCRIPT_LAMBDA_EXT,
    });

    for (const entrypoint of this.entrypoints) {
      new LambdaFunction(this.project, {
        entrypoint,
        cdkDeps: options.cdkDeps,
        ...options.lambdaOptions,
      });
    }
  }
}

/**
 * Options for `EdgeLambdaAutoDiscover`
 */
export interface EdgeLambdaAutoDiscoverOptions extends AutoDiscoverCommonOptions {
  /**
   * Project source tree (relative to project output directory).
   */
  readonly srcdir: string;

  /**
   * Options for AWS Lambda functions.
   */
  readonly lambdaOptions?: LambdaFunctionCommonOptions;
}

/**
 * Creates edge lambdas from entry points discovered in the project's source tree.
 */
export class EdgeLambdaAutoDiscover extends AutoDiscoverBase {
  constructor(project: Project, options: EdgeLambdaAutoDiscoverOptions) {
    super(project, {
      projectdir: options.srcdir,
      extension: TYPESCRIPT_EDGE_LAMBDA_EXT,
    });

    for (const entrypoint of this.entrypoints) {
      new LambdaFunction(this.project, {
        entrypoint,
        cdkDeps: options.cdkDeps,
        ...options.lambdaOptions,
        edgeLambda: true,
      });
    }
  }
}

/**
 * Options for `LambdaExtensionAutoDiscover`
 */
export interface LambdaExtensionAutoDiscoverOptions extends AutoDiscoverCommonOptions {
  /**
   * Project source tree (relative to project output directory).
   */
  readonly srcdir: string;

  /**
   * Options for lambda extensions.
   */
  readonly lambdaExtensionOptions?: LambdaExtensionCommonOptions;
}

/**
 * Creates Lambda Extensions from entrypoints discovered in the project's
 * source tree.
 */
export class LambdaExtensionAutoDiscover extends AutoDiscoverBase {
  constructor(project: Project, options: LambdaExtensionAutoDiscoverOptions) {
    super(project, {
      projectdir: options.srcdir,
      extension: TYPESCRIPT_LAMBDA_EXTENSION_EXT,
    });

    for (const entrypoint of this.entrypoints) {
      new LambdaExtension(this.project, {
        entrypoint,
        cdkDeps: options.cdkDeps,
        ...options.lambdaExtensionOptions,
      });
    }
  }
}

/**
 * Options for `AutoDiscover`
 */
export interface AutoDiscoverOptions
  extends
    LambdaAutoDiscoverOptions,
    LambdaExtensionAutoDiscoverOptions,
    IntegrationTestAutoDiscoverOptions {
  /**
   * Auto-discover lambda functions.
   *
   * @default true
   */
  readonly lambdaAutoDiscover?: boolean;

  /**
   * Auto-discover edge lambda functions.
   *
   * @default true
   */
  readonly edgeLambdaAutoDiscover?: boolean;

  /**
   * Auto-discover lambda extensions.
   *
   * @default true
   */
  readonly lambdaExtensionAutoDiscover?: boolean;

  /**
   * Auto-discover integration tests.
   *
   * @default true
   */
  readonly integrationTestAutoDiscover?: boolean;
}

/**
 * Discovers and creates integration tests and lambdas from code in the
 * project's source and test trees.
 */
export class AutoDiscover extends Component {
  constructor(project: Project, options: AutoDiscoverOptions) {
    super(project);

    if (options.lambdaAutoDiscover ?? true) {
      new LambdaAutoDiscover(this.project, {
        cdkDeps: options.cdkDeps,
        tsconfigPath: options.tsconfigPath,
        srcdir: options.srcdir,
        lambdaOptions: options.lambdaOptions,
      });
    }

    if (options.edgeLambdaAutoDiscover ?? true) {
      new EdgeLambdaAutoDiscover(this.project, {
        cdkDeps: options.cdkDeps,
        tsconfigPath: options.tsconfigPath,
        srcdir: options.srcdir,
        lambdaOptions: options.lambdaOptions,
      });
    }

    if (options.lambdaExtensionAutoDiscover ?? true) {
      new LambdaExtensionAutoDiscover(this.project, {
        cdkDeps: options.cdkDeps,
        tsconfigPath: options.tsconfigPath,
        srcdir: options.srcdir,
        lambdaExtensionOptions: options.lambdaExtensionOptions,
      });
    }

    if (options.integrationTestAutoDiscover ?? true) {
      new IntegrationTestAutoDiscover(this.project, {
        cdkDeps: options.cdkDeps,
        testdir: options.testdir,
        tsconfigPath: options.tsconfigPath,
        integrationTestOptions: options.integrationTestOptions,
      });
    }
  }
}
