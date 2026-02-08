import { IConstruct } from "constructs";
import { Component } from "../component";
import { DependencyType } from "../dependencies";

/**
 * Options for `JsiiDocgen`
 */
export interface JsiiDocgenOptions {
  /**
   * File path for generated docs.
   * @default "API.md"
   */
  readonly filePath?: string;

  /**
   * A semver version string to install a specific version of jsii-docgen.
   *
   * @default '*'
   */
  readonly version?: string;
}

/**
 * Creates a markdown file based on the jsii manifest:
 * - Adds a `docgen` script to package.json
 * - Runs `jsii-docgen` after compilation
 * - Enforces that markdown file is checked in
 */
export class JsiiDocgen extends Component {
  constructor(scope: IConstruct, options: JsiiDocgenOptions = {}) {
    super(scope);

    const version = options.version ?? "*";
    if (
      !this.project.deps.isDependencySatisfied(
        "jsii-docgen",
        DependencyType.BUILD,
        version,
      )
    ) {
      this.project.deps.addDependency(
        `jsii-docgen@${version}`,
        DependencyType.BUILD,
      );
    }

    const filePath = options.filePath ?? "API.md";

    const docgen = this.project.addTask("docgen", {
      description: "Generate API.md from .jsii manifest",
      exec: `jsii-docgen -o ${filePath}`,
    });

    // spawn docgen after compilation (requires the .jsii manifest).
    this.project.postCompileTask.spawn(docgen);
    this.project.gitignore.include(`/${filePath}`);
    this.project.annotateGenerated(`/${filePath}`);
  }
}
