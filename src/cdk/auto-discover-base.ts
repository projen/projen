import { join } from "path";
import * as glob from "glob";
import { Component } from "../component";
import { Project } from "../project";
import { TYPESCRIPT_INTEG_EXT } from "./internal";

/**
 * Base class for auto-discovering and creating project subcomponents.
 */
export abstract class AutoDiscoverBase extends Component {
  protected constructor(project: Project) {
    super(project);
  }

  protected autoDiscoverIntegrationTests(
    options: AutoDiscoverIntegrationTestsOptions
  ) {
    const entrypoints = glob.sync(`**/*${TYPESCRIPT_INTEG_EXT}`, {
      cwd: join(this.project.outdir, options.testdir),
    });

    for (const entrypoint of entrypoints) {
      this.createIntegrationTest(join(options.testdir, entrypoint));
    }
  }

  /**
   * Create an integration test from the given entrypoint file.
   */
  protected abstract createIntegrationTest(entrypoint: string): void;
}

/**
 * Options for auto-discovering integration tests.
 */
export interface AutoDiscoverIntegrationTestsOptions {
  /**
   * Test source tree path.
   */
  readonly testdir: string;
}
