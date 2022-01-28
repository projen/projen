import { join } from "path";
import * as glob from "glob";
import { Component } from "../component";
import { Project } from "../project";
import { IntegrationTest } from "./integration-test";
import { TYPESCRIPT_INTEG_EXT } from "./internal";

/**
 * Options for `AutoDiscover`.
 */
export interface AutoDiscoverOptions {
  /**
   * Test source tree.
   */
  readonly testdir: string;

  /**
   * Path to the tsconfig file to use for integration tests.
   */
  readonly tsconfigPath: string;

  /**
   * Auto-discover integration test files.
   *
   * @default false
   */
  readonly integrationTestAutoDiscover?: boolean;
}

/**
 * Automatically creates integration test tasks for all .integ.ts files under
 * the test directory of the project.
 */
export class AutoDiscover extends Component {
  constructor(project: Project, options: AutoDiscoverOptions) {
    super(project);

    if (options.integrationTestAutoDiscover ?? false) {
      this.autoDiscoverIntegrationTests(options);
    }
  }

  private autoDiscoverIntegrationTests(options: AutoDiscoverOptions) {
    const entrypoints = glob.sync(`**/*${TYPESCRIPT_INTEG_EXT}`, {
      cwd: join(this.project.outdir, options.testdir),
    });

    for (const entrypoint of entrypoints) {
      new IntegrationTest(this.project, {
        entrypoint: join(options.testdir, entrypoint),
        tsconfigPath: options.tsconfigPath,
      });
    }
  }
}
