import { Component } from './component';
import { Project } from './project';
// import { SampleFile } from './sample-file';
// import { YamlFile } from './yaml';


/**
 * https://www.mkdocs.org/user-guide/configuration/
 * Only site_name as siteName is required
 */

/**
 *
 */
export interface MkDocsThemePalatteProps {

  /**
   *
   */
  readonly scheme: string;

  /**
   *
   */
  readonly primary?: string;

  /**
   *
   */
  readonly accent?: string;
}

export interface MkDocsThemeFontProps {

  /**
   *
   */
  readonly text: string;

  /**
   *
   */
  readonly code: string;
}

export interface MkDocsThemeIconProps {

  /**
   * The Theme Icon Logo
   */
  readonly logo: string;
}

/**
 * An Mkdocs Theme
 * The theme itself is optional but if you define one
 * Some fields are required
 * Projen will define its own theme elsewhere
 */
export interface MkDocsThemeProps {

  /**
   * Name of the theme
   */
  readonly name: string;

  /**
   * Directory containing a custom theme
   * @default
   */
  readonly customDir?: string;

  /**
   * List of files to add to the theme
   * The templates must be located in either
   * the theme's template directory
   * or
   * in the custom_dir defined in the theme configuration.
   * @default []
   */
  readonly staticTemplates?: Array<String>;

  /**
   * Whether to enable `highlightjs`
   * @default false
   */
  readonly highLightJss?: boolean;

  /**
   * 79+ styles(colors) available
   * @default github
   */
  readonly hlJsStyle?: string;

  /**
   * If enabled, for what languages
   * @default []
   */
  readonly hlJsLanguages?: Array<String>;

  /**
   * Language to target
   * @default en
     */
  readonly language?: string;

  /**
     * Palatte
     * @default
     */
  readonly palette?: MkDocsThemePalatteProps;

  /**
     * Features
     * @default
     */
  readonly features?: Array<string>;

  /**
     * @default
     */
  readonly font?: MkDocsThemeFontProps;

  /**
     * @default
     */
  readonly icon?: MkDocsThemeIconProps;

  /**
   * The logo
   * @default
   */
  readonly logo?: string;

  /**
     * @default
     */
  readonly favicon?: string;
}

/**
 * MkDocs Navigation (aka a map of pages)
 * Note, siteUrl can affect the relativity of these
 */
export interface MkDocsNavProps {

  /**
   * List of Mkdocs pages
   * @default index.md
   */
  readonly pages?: Record<string, string>;
}

/**
 *
 */
export interface MkDocsMarkDownExtensionProps {

  /**
   * Name of the extension
   */
  readonly name: string;

  /**
   * Extension specific settings
   * @default:
   */
  readonly flags?: Record<string, string>;
}

/**
 *
 */
export interface MkDocsMarkDownPluginProps {

  /**
   * Name of the plugin
   */
  readonly name: string;

  /**
   * Plugin specific settings
   * @default:
   */
  readonly settings?: Record<string, string | Record<string, string>>;
}

/**
 *
 */
export interface MkDocsExtraProps {

  readonly social: any;
}

/**
 *
 */
export interface MkDocsProps {

  /**
     * The documentation site name
     * This is the only required mkdocs.yml param
     * @default `project.name`
     */
  readonly siteName: string;

  /**
     * The documentation site url
     * @default
     */
  readonly siteUrl?: string;

  /**
     * The repository url
     * @default: parsed from `project.repository` minus .git
     */
  readonly repoUrl?: string;

  /**
     * The repository name
     * @default: parsed from `project.repository`
     */
  readonly repoName?: string;

  /**
     * The Browser URL to edit
     * @default: ""
     */
  readonly editUri?: string;

  /**
     * The documentation site description
     * @default `project.description`
     */
  readonly siteDescription?: string;

  /**
     * The documentation site author
     * @default `project.author`
     */
  readonly siteAuthor?: string;

  /**
     * The documentation site copyright
     * @default: `project.copyright`
     */
  readonly copyright?: string;

  /**
   * @example ['token', 'siteDomain']
   * @example ['UA-27795084-5', 'mkdocs.org']
   * @default []
   */
  readonly googleAnalytics?: Array<String>;

  /**
   * What branch to use when gh-deploy
   * @default "gh-pages"
   */
  readonly remoteBranch?: string;

  /**
   * What remote to use when gh-deploy
   * @default origin
   */
  readonly remoteName?: string;

  /**
     * List of the pages in the `docsDir`
     * @default
     */
  readonly nav?: MkDocsNavProps;

  /**
     * The `mkdocs` theme
     * https://github.com/mkdocs/mkdocs/wiki/MkDocs-Themes
     * @default
     */
  readonly theme?: MkDocsThemeProps;

  /**
     * The directory to put docs in
     *
     * @default "docs-mk"
     * docs is the default but is shared with docgen for API via typedoc
     * mkdocs is for themes see `MkDocsThemeProps`
     */
  readonly docsDir?: string;

  /**
     * Extensions to load
     *
     */
  readonly markdownExtensions?: MkDocsMarkDownExtensionProps;

  /**
     * Plugins to load
     * https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins
     */
  readonly plugins?: MkDocsMarkDownPluginProps;

  /**
     * List of JavaScript Files to embed
     * @default []
     */
  readonly extraJavaScript?: [];

  /**
     * List of CSS Files to embed
     * @default []
     */
  readonly extraCss?: Array<String>;

  /**
     * Extra stuff to embed
     * @default
     */
  readonly extra?: MkDocsExtraProps;
}

/**
 *
 */
export class MkDocs extends Component {

  private config: MkDocsProps;

  /**
   *
   * @param project
   * @param props
   */
  constructor(project: Project, props: MkDocsProps) {
    super(project);

    this.config = {
      ...props,
    };
  }
}