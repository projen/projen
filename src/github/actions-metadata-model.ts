import { Step } from "./workflows-model";

/**
 * A Github Action Metadata file definition.
 */
export interface ActionMetadata {
  /**
   * The name of your action. GitHub displays the `name` in the Actions tab to
   * help visually identify actions in each job.
   */
  readonly name: string;

  /**
   * The name of the action's author.
   *
   * @default - none
   */
  readonly author?: string;

  /**
   * A short description of the action.
   */
  readonly description: string;

  /**
   * Input parameters allow you to specify data that the action expects to use
   * during runtime. GitHub stores input parameters as environment variables.
   * Input ids with uppercase letters are converted to lowercase during runtime.
   *
   * @default []
   */
  readonly inputs?: Input[];

  /**
   * Output parameters allow you to declare data that an action sets. This is
   * useful for actions that run later in a workflow, as they can use the output
   * data set in previously run actions.
   *
   * If you don't declare an output in your action metadata file, you can still
   * set outputs and use them in a workflow.
   * @see https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-output-parameter
   *
   * @default []
   */
  readonly outputs?: Output[];

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

/**
 * Define an input to a GitHub Action
 */
export interface Input {
  /**
   * The id of the input.
   */
  readonly id: string;

  /**
   * A description of the input parameter
   */
  readonly description: string;

  /**
   * Indicate whether the action requires the input parameter.
   *
   * @default false
   */
  readonly required?: boolean;

  /**
   * The default value when the input parameter is not specified
   * in the workflow file. This is required if `required=true`.
   */
  readonly default?: string;

  /**
   * If this parameter is set, it will be logged as a warning message
   * if the input parameter is used.
   *
   * @default - none
   */
  readonly deprecationMessage?: string;
}

/**
 * Define an output in a GitHub Action
 */
export interface Output {
  /**
   * The id of the output.
   */
  readonly id: string;

  /**
   * The description of the output parameter.
   */
  readonly description: string;

  /**
   * The value that the output parameter will be mapped to.
   * This property is required if you are using composite actions,
   * and must be omitted otherwise.
   */
  readonly value?: string;
}

/**
 * The GitHub Action runtime or composite/docker identifier.
 */
export class RunsUsing {
  /**
   * "node12"
   */
  public static readonly NODE_12 = new RunsUsing("node12");

  /**
   * "node16"
   */
  public static readonly NODE_16 = new RunsUsing("node16");

  /**
   * "composite"
   */
  public static readonly COMPOSITE = new RunsUsing("composite");

  /**
   * "docker"
   */
  public static readonly DOCKER = new RunsUsing("docker");

  /**
   * Supply a custom value for `runs.using`.
   *
   * @param using the value for runs.using
   */
  public constructor(public readonly using: string) {}
}

/**
 * Common interface for the Runs property.
 */
interface Runs {
  /**
   * The runtime used to execute the specified code.
   *
   * For JavaScript actions:
   * - use `RunsUsing.NODE_12` for Node.js v12.
   * - use `RunsUsing.NODE_16` for Node.js v16.
   *
   * For composite actions:
   * - use `RunsUsing.COMPOSITE`
   *
   * For docker container actions:
   * - use `RunsUsing.DOCKER`
   */
  readonly using: string;
}

/**
 * Runs property for a JavaScript Action.
 */
export interface JavaScriptRuns extends Runs {
  /**
   * The file that contains your action code. The runtime specified in the
   * `using` property executes this file.
   */
  readonly main: string;

  /**
   * Allows you to run a script at the start of a job, before the `main`
   * action begins.
   *
   * @default - no pre steps
   */
  readonly pre?: string;

  /**
   * Allows you to define conditions for the `pre` action execution. The
   * `pre` action will only run if the conditions in `preIf` are met.
   *
   * For example, you can include the condition `runner.os == 'linux'` and
   * `pre` will only run on Linux-based runners.
   *
   * @defualt - no conditions
   */
  readonly preIf?: string;

  /**
   * Allows you to run a script at the end of a job, once the `main` action
   * has completed.
   *
   * @default - no post steps
   */
  readonly post?: string;

  /**
   * Allows you to define conditions for the `post` action execution. The
   * `post` action will only run if the conditions in `postIf` are met.
   *
   * For example, you can include the condition `runner.os == 'linux'` and
   * `post` will only run on Linux-based runners.
   *
   * @default - no conditions
   */
  readonly postIf?: string;
}

/**
 * Runs property for a Docker container action.
 */
export interface DockerRuns extends Runs {
  /**
   * Allows you to run a script before the `entrypoint` action begins.
   *
   * @default - no pre script
   */
  readonly preEntrypoint?: string;

  /**
   * Overrides the Docker `ENTRYPOINT` in the Dockerfile, or sets it if one
   * was not already specified.
   *
   * @default - uses `ENTRYPOINT` instruction in Dockerfile.
   */
  readonly entrypoint?: string;

  /**
   * Allows you to run a cleanup script once `entrypoint` action has completed.
   *
   * @default - no post script
   */
  readonly postEntrypoint?: string;

  /**
   * The Docker image to use as the container to run the action.
   */
  readonly image: string;

  /**
   * Specifies a key/value map of environment variables to set in the container
   * environment.
   */
  readonly env?: Record<string, string>;
}

/**
 * Runs property for a composite action.
 */
export interface CompositeRuns extends Runs {
  /**
   * The steps that you plan to run in a composite action.
   */
  readonly steps: ActionStep[];
}

/**
 * Definition for branding the GitHub Action.
 */
export interface Branding {
  /**
   * The background color of the badge. Can be one of:
   * - `white`
   * - `yellow`
   * - `blue`
   * - `green`
   * - `orange`
   * - `red`
   * - `purple`
   * - `gray-dark`
   */
  readonly color: string;

  /**
   * The name of the v4.28.0 Feather icon to use. Brand icons are omitted.
   * See link for additional omitted icons as well as an exhaustive list of
   * currently supported icons:
   *
   * @see https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#brandingicon
   */
  readonly icon: string;
}

/**
 * Definition for a step used in a composite action.
 */
export interface ActionStep extends Step {
  /**
   * Specifies the working directory where the command is run.
   *
   * @default - none
   */
  readonly workingDirectory?: string;
}
