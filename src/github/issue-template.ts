import * as path from "path";
import { GitHub } from "./github";
import { Component } from "../component";
import { TextFile } from "../textfile";
import { YamlFile } from "../yaml";

export interface ContactLinks {
  /**
   * The name of the contact link.
   */
  readonly name: string;

  /**
   * The URL of the contact link.
   */
  readonly url: string;

  /**
   * A brief description of the contact link.
   */
  readonly about: string;
}

/**
 * Options for configuring issue templates in a repository.
 *
 * @interface IssueTemplateConfigOptions
 * @see {@link https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository#configuring-the-template-chooser}
 */
export interface IssueTemplateConfigOptions {
  /**
   * Indicates whether blank issues (issues without a template) are allowed.
   *
   * @type {boolean} [blankIssuesEnabled=false]
   */
  readonly blankIssuesEnabled?: boolean;

  /**
   * An array of contact links to display in the issue template chooser.
   *
   */
  readonly contactLinks?: ContactLinks[];
}

/**
 * Options for `IssueTemplate`.
 */
export interface IssueTemplateOptions {
  /**
   * An array of issue template file names and their contents.
   * The file names should include the extension (.md or .yml).
   */
  readonly templates: { [fileName: string]: string };

  /**
   * The path within the repository where the issue templates should be created.
   * Defaults to '.github/ISSUE_TEMPLATE'.
   */
  readonly templatePath?: string;

  /**
   * Whether to include a config.yml file for configuring the issue template chooser.
   * Defaults to false.
   */
  readonly includeConfig?: boolean;

  /**
   * Configuration options for the config.yml file.
   * Only applicable if includeConfig is true.
   */
  readonly configOptions?: IssueTemplateConfigOptions;
}

/**
 * Generates Issue Templates for GitHub repositories
 * see  {@link https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests}
 */
export class IssueTemplate extends Component {
  constructor(github: GitHub, options: IssueTemplateOptions) {
    super(github.project);
    const project = github.project;

    const templatePath = options.templatePath || ".github/ISSUE_TEMPLATE";

    // Create issue template files
    for (const [fileName, content] of Object.entries(options.templates)) {
      const filePath = path.join(templatePath, fileName);
      const fileExtension = path.extname(fileName).toLowerCase();
      switch (fileExtension) {
        case ".md":
          new TextFile(project, filePath, {
            lines: [content],
            marker: false,
            committed: true,
          });
          break;
        case ".yml":
          new YamlFile(project, filePath, {
            obj: content,
            marker: false,
            committed: true,
          });
          break;
        default:
          throw new Error(`Unsupported file extension: ${fileExtension}`);
      }
    }

    const includeConfig = options.includeConfig ?? false;

    // Create config.yml file if requested
    if (includeConfig) {
      const blankIssues = options.configOptions?.blankIssuesEnabled;
      const contactLinks = options.configOptions?.contactLinks;

      new YamlFile(project, ".github/config.yml", {
        obj: {
          blank_issues_enabled: blankIssues,
          contact_links: contactLinks,
        },
        marker: false,
        committed: true,
      });
    }
  }
}
