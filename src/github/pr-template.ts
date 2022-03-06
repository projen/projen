import { Construct } from "constructs";
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
  constructor(scope: Construct, options: PullRequestTemplateOptions = {}) {
    super(scope, ".github/pull_request_template.md", {
      lines:
        options.lines && options.lines?.length > 0
          ? options.lines
          : ["Fixes #"],
      marker: false,
    });
  }
}
