import { Construct } from "constructs";
import { Component } from "../component";
import { JsiiProject } from "./jsii-project";

/**
 * Options for `JsiiDocgen`
 */
export interface JsiiDocgenOptions {
  /**
   * File path for generated docs.
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
export class JsiiDocgen extends Component {
  constructor(scope: Construct, options: JsiiDocgenOptions = {}) {
    super(scope, "JsiiDocgen");

    const project = JsiiProject.ofJsiiProject(this);
    project.addDevDeps("jsii-docgen");

    const filePath = options.filePath ?? "API.md";

    const docgen = project.addTask("docgen", {
      description: "Generate API.md from .jsii manifest",
      exec: `jsii-docgen -o ${filePath}`,
    });

    // spawn docgen after compilation (requires the .jsii manifest).
    project.postCompileTask.spawn(docgen);
    project.gitignore.include(`/${filePath}`);
  }
}
