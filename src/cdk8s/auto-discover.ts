import { AutoDiscoverBase, AutoDiscoverIntegrationTestsOptions } from "../cdk";
import { Project } from "../project";
import { IntegrationTest } from "./integration-test";

/**
 * Options for `AutoDiscover`.
 */
export interface AutoDiscoverOptions
  extends AutoDiscoverIntegrationTestsOptions {
  /**
   * Path to the tsconfig file to use for integration tests.
   */
  readonly tsconfigPath: string;
}

/**
 * Automatically discovers and creates `IntegrationTest`s from entry points
 * found in the test tree.
 */
export class AutoDiscover extends AutoDiscoverBase {
  private readonly tsconfigPath: string;

  constructor(project: Project, options: AutoDiscoverOptions) {
    super(project);

    this.tsconfigPath = options.tsconfigPath;

    this.autoDiscoverIntegrationTests(options);
  }

  protected createIntegrationTest(entrypoint: string): void {
    new IntegrationTest(this.project, {
      entrypoint,
      tsconfigPath: this.tsconfigPath,
    });
  }
}
