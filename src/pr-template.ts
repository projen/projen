import { IComponentScope } from './component';
import { TextFile } from './textfile';

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
  constructor(project: IComponentScope, options: PullRequestTemplateOptions = { }) {
    super(project, '.github/pull_request_template.md', {
      lines: options.lines ?? [
        'Fixes #',
      ],
    });
  }
}