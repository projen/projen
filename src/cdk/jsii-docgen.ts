import { JsiiProject } from "./jsii-project";

/**
 * Options for `JsiiDocgen`
 */
export interface JsiiDocgenOptions {
  /**
   * File path for generated old-docs.
   * @default "API.md"
   */
  readonly filePath?: string;
}

/**
 * Creates a markdown file based on the jsii manifest:
 * - Adds a `docgen` script to package.json
 * - Runs `jsii-docgen` after compilation
 * - Enforces that markdown file is checked in
 */
export class JsiiDocgen {
  constructor(project: JsiiProject, options: JsiiDocgenOptions = {}) {
    project.addDevDeps("jsii-docgen");

    const filePath = options.filePath ?? "API.md";

    const docgen = project.addTask("docgen", {
      description: "Generate API.md from .jsii manifest",
      exec: `jsii-docgen -o ${filePath}`,
    });

    // spawn docgen after compilation (requires the .jsii manifest).
    project.postCompileTask.spawn(docgen);
    project.gitignore.include(`/${filePath}`);
    project.annotateGenerated(`/${filePath}`);
  }
}
