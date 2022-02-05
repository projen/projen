import { join } from "path";
import * as glob from "glob";
import { AutoDiscoverBase, AutoDiscoverIntegrationTestsOptions } from "../cdk";
import { Project } from "../project";
import { AwsCdkDeps } from "./awscdk-deps";
import { IntegrationTest } from "./integration-test";
import { TYPESCRIPT_LAMBDA_EXT } from "./internal";
import { LambdaFunction, LambdaFunctionCommonOptions } from "./lambda-function";

/**
 * Options for `AutoDiscover`.
 */
export interface AutoDiscoverOptions
  extends AutoDiscoverIntegrationTestsOptions {
  /**
   * Options for auto-discovery of AWS Lambda functions.
   */
  readonly lambdaOptions?: LambdaFunctionCommonOptions;

  /**
   * Project source tree (relative to project output directory).
   */
  readonly srcdir: string;

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
 * Automatically discovers and creates `IntegrationTest`s and `LambdaFunction`s
 * from entry points found in the project source and test trees.
 */
export class AutoDiscover extends AutoDiscoverBase {
  protected readonly tsconfigPath: string;
  protected readonly cdkDeps: AwsCdkDeps;

  constructor(project: Project, options: AutoDiscoverOptions) {
    super(project);

    this.cdkDeps = options.cdkDeps;
    this.tsconfigPath = options.tsconfigPath;

    this.autoDiscoverLambdaFunctions(options);
    this.autoDiscoverIntegrationTests(options);
  }

  private autoDiscoverLambdaFunctions(options: AutoDiscoverOptions) {
    const entrypoints = glob.sync(`**/*${TYPESCRIPT_LAMBDA_EXT}`, {
      cwd: join(this.project.outdir, options.srcdir),
    });

    for (const entrypoint of entrypoints) {
      new LambdaFunction(this.project, {
        entrypoint: join(options.srcdir, entrypoint),
        cdkDeps: options.cdkDeps,
        ...options.lambdaOptions,
      });
    }
  }

  protected createIntegrationTest(entrypoint: string): void {
    new IntegrationTest(this.project, {
      entrypoint,
      cdkDeps: this.cdkDeps,
      tsconfigPath: this.tsconfigPath,
    });
  }
}
