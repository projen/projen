import {
  Input,
  Output,
  JavaScriptRuns,
  DockerRuns,
  CompositeRuns,
  Branding,
} from "../github/actions-metadata-model";

/**
 * A Github Action Metadata file definition.
 */
export interface GitHubActionMetadata {
  /**
   * The name of your action. GitHub displays the `name` in the Actions tab to
   * help visually identify actions in each job.
   *
   * @default this.name
   */
  readonly name?: string;

  /**
   * The name of the action's author.
   *
   * @default - none
   */
  readonly author?: string;

  /**
   * A short description of the action.
   *
   * @default - a basic description is provided for you
   */
  readonly description?: string;

  /**
   * Input parameters allow you to specify data that the action expects to use
   * during runtime. GitHub stores input parameters as environment variables.
   * Input ids with uppercase letters are converted to lowercase during runtime.
   *
   * @default {}
   */
  readonly inputs?: Record<string, Input>;

  /**
   * Output parameters allow you to declare data that an action sets. This is
   * useful for actions that run later in a workflow, as they can use the output
   * data set in previously run actions.
   *
   * If you don't declare an output in your action metadata file, you can still
   * set outputs and use them in a workflow.
   * @see https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-output-parameter
   *
   * @default {}
   */
  readonly outputs?: Record<string, Output>;

  /**
   * Specifies whether this is a JavaScript action, a composite action, or a Docker
   * container action and how the action is executed.
   */
  readonly runs: JavaScriptRuns | CompositeRuns | DockerRuns;

  /**
   * You can use a color and a Feather icon to create a badge to personalize and
   * distinguish your action. Badges are shown next to your action name in
   * GitHub Marketplace.
   *
   * @see https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#branding
   *
   * @default - no branding
   */
  readonly branding?: Branding;
}
