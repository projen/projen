import { TextFile } from "../textfile";
import { GitHub } from "./github";

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
