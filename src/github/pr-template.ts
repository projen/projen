import { GitHub } from "./github";
import { Component } from "../component";
import { Project } from "../project";
import { TextFile } from "../textfile";

/**
 * Options for `PullRequestTemplate`.
 */
export interface PullRequestTemplateOptions {
  /**
   * The contents of the template. You can use `addLine()` to add additional lines.
   *
   * @default - a standard default template will be created.
   */
  readonly lines?: string[];
}

/**
 * Template for GitHub pull requests.
 */
export class PullRequestTemplate extends TextFile {
  /**
   * Returns the `PullRequestTemplate` instance associated with a project or `undefined` if
   * there is no PullRequestTemplate.
   * @param project The project
   * @returns A PullRequestTemplate
   */
  public static of(project: Project): PullRequestTemplate | undefined {
    const isPrTemplate = (o: Component): o is PullRequestTemplate =>
      o instanceof PullRequestTemplate;
    return project.components.find(isPrTemplate);
  }

  constructor(github: GitHub, options: PullRequestTemplateOptions = {}) {
    super(github.project, ".github/pull_request_template.md", {
      lines:
        options.lines && options.lines?.length > 0
          ? options.lines
          : ["Fixes #"],
      marker: false,
      // GitHub needs to read the file from the repository in order to work.
      committed: true,
    });
  }
}
