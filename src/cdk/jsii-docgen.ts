import type { IConstruct } from "constructs";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import type { Project } from "../project";
import type { Task } from "../task";

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
  /**
   * Returns the JsiiDocgen component of a project or undefined if there is none.
   */
  public static of(project: Project): JsiiDocgen | undefined {
    const isJsiiDocgen = (c: Component): c is JsiiDocgen =>
      c instanceof JsiiDocgen;
    return project.components.find(isJsiiDocgen);
  }

  /**
   * The task that generates API documentation.
   */
  public readonly task: Task;

  constructor(scope: IConstruct, options: JsiiDocgenOptions = {}) {
    super(scope);

    const version = options.version ?? "*";
    this.project.deps.requestDependency({
      name: "jsii-docgen",
      version,
      type: DependencyType.BUILD,
    });

    const filePath = options.filePath ?? "API.md";

    this.task = this.project.addTask("docgen", {
      description: "Generate API.md from .jsii manifest",
      execArgs: ["jsii-docgen", "-o", filePath],
    });

    // spawn docgen after compilation (requires the .jsii manifest).
    this.project.postCompileTask.spawn(this.task);
    this.project.gitignore.include(`/${filePath}`);
    this.project.annotateGenerated(`/${filePath}`);
  }
}
