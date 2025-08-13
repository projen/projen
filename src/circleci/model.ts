// @see https://circleci.com/docs/2.0/configuration-reference

/**
 * Used to represent objects with a dynamic key.
 * Dynamic are marked with `<>` in configuration reference like '<workflow_name>' and '<job_name>'
 * This field is required for objects with dynamic keys.
 */
interface INamed {
  /** name of dynamic key **/
  readonly identifier: string;
}

/**
 * Used for orchestrating all jobs. Each workflow consists of the workflow name as a key and a map as a value.
 * A name should be unique within the current config.yml.
 * The top-level keys for the Workflows configuration are version and jobs.
 * @see https://circleci.com/docs/2.0/configuration-reference/#workflows
 */
export interface Workflow extends INamed {
  readonly jobs?: WorkflowJob[];
  readonly triggers?: Triggers[];
  /** when is too dynamic to be casted to interfaces. Check Docu as reference
   * @see https://circleci.com/docs/2.0/configuration-reference/#logic-statement-examples
   */
  readonly when?: any;
}

/**
 * A job may have a type of approval indicating it must be manually approved before downstream jobs may proceed
 * @see https://circleci.com/docs/2.0/configuration-reference/#type
 */
export enum JobType {
  APPROVAL = "approval",
}

/**
 * The resource_class feature allows configuring CPU and RAM resources for each job.
 * Different resource classes are available for different executors, as described in the tables below.
 * @see https://circleci.com/docs/2.0/configuration-reference/#resourceclass
 */
export enum ResourceClass {
  SMALL = "small",
  MEDIUM = "medium",
  MEDIUM_PLUS = "medium+",
  LARGE_X = "xlarge",
  LARGE_2X = "2xlarge",
  LARGE_2X_PLUS = "2xlarge+",
}

/**
 * Specify when to enable or disable the step.
 * @see https://circleci.com/docs/2.0/configuration-reference/#steps
 */
export enum JobWhen {
  ALWAYS = "always",
  ON_SUCCESS = "on_success",
  ON_FAIL = "on_fail",
}

/**
 * Pipeline parameter types
 * @see https://circleci.com/docs/2.0/reusing-config#parameter-syntax
 */
export enum PipelineParameterType {
  STRING = "string",
  BOOLEAN = "boolean",
  INTEGER = "integer",
  ENUM = "enum",
}

/**
 * A Workflow is comprised of one or more uniquely named jobs. Jobs are specified in the jobs map,
 * see Sample 2.0 config.yml for two examples of a job map.
 * The name of the job is the key in the map, and the value is a map describing the job.
 * @see https://circleci.com/docs/2.0/configuration-reference/#jobs
 */
export interface Job extends INamed {}

/**
 * A Job is part of Workflow. A Job can be created with {@link Job} or it can be provided by the orb
 * @see https://circleci.com/docs/2.0/configuration-reference/#jobs-in-workflow
 */
export interface WorkflowJob extends INamed {
  /** A list of jobs that must succeed for the job to start. */
  readonly requires?: string[];
  /** A replacement for the job name. Useful when calling a job multiple times */
  readonly name?: string;
  /** The name of the context(s). The initial default name is org-global. Each context name must be unique. */
  readonly context?: string[];
  /** A job may have a type of approval indicating it must be manually approved before downstream jobs may proceed. */
  readonly type?: JobType;
  /** Job Filters can have the key branches or tags */
  readonly filters?: Filter;
  readonly matrix?: Matrix;
  /** Parameters passed to job when referencing a job from orb */
  readonly orbParameters?: Record<string, string | number | boolean>;
}

/**
 * Parameters are declared by name under a job, command, or executor.
 * @see https://circleci.com/docs/2.0/reusing-config#using-the-parameters-declaration
 */
export interface PipelineParameter {
  /** Used to generate documentation for your orb. */
  readonly description?: string;
  /** The parameter type, required. */
  readonly type: PipelineParameterType;
  /** The default value for the parameter. If not present, the parameter is implied to be required. */
  readonly default?: string | number | boolean;
}

/**
 * The matrix stanza allows you to run a parameterized job multiple times with different arguments.
 * @see https://circleci.com/docs/2.0/configuration-reference/#matrix-requires-version-21
 */
export interface Matrix {
  /** A map of parameter names to every value the job should be called with */
  readonly parameters?: Record<string, string[] | number[]>;
  /** An alias for the matrix, usable from another job’s requires stanza. Defaults to the name of the job being executed */
  readonly alias?: string;
}

/**
 * Specifies which triggers will cause this workflow to be executed.
 * Default behavior is to trigger the workflow when pushing to a branch.
 * @see https://circleci.com/docs/2.0/configuration-reference/#triggers
 */
export interface Triggers {
  readonly schedule?: Schedule;
}

/**
 *  A workflow may have a schedule indicating it runs at a certain time.
 *  @see https://circleci.com/docs/2.0/configuration-reference/#schedule
 */
export interface Schedule {
  /** The cron key is defined using POSIX crontab syntax. */
  readonly cron?: string;
  readonly filters: Filter;
}

/**
 * The branches key controls whether the current branch should have a schedule trigger created for it,
 * where current branch is the branch containing the config.yml file with the trigger stanza.
 * That is, a push on the main branch will only schedule a workflow for the main branch.
 *
 * Branches can have the keys only and ignore which either map to a single string naming a branch.
 * You may also use regular expressions to match against branches by enclosing them with /’s, or map to a list of such strings.
 * Regular expressions must match the entire string.
 *
 * Any branches that match only will run the job.
 * Any branches that match ignore will not run the job.
 * If neither only nor ignore are specified then all branches will run the job.
 * If both only and ignore are specified the only is considered before ignore.
 * @see https://circleci.com/docs/2.0/configuration-reference/#filters
 */
export interface Filter {
  readonly branches?: FilterConfig;
  readonly tags?: FilterConfig;
}

/**
 * set an inclusive or exclusive filter
 * @see https://circleci.com/docs/2.0/configuration-reference/#filters
 */
export interface FilterConfig {
  /** Either a single branch specifier, or a list of branch specifiers */
  readonly only?: string[];
  /** Either a single branch specifier, or a list of branch specifiers */
  readonly ignore?: string[];
}

/**
 * Each job consists of the job’s name as a key and a map as a value. A name should be case insensitive unique within a current jobs list.
 * @see https://circleci.com/docs/2.0/configuration-reference/#job_name
 */
export interface Job {
  readonly docker?: Docker[];
  readonly machine?: Machine;
  readonly macos?: Macos;
  /** Shell to use for execution command in all steps. Can be overridden by shell in each step */
  readonly shell?: string;
  /** Parameters for making a job explicitly configurable in a workflow. */
  readonly parameters?: Record<string, PipelineParameter>;
  /** no type support here, for syntax {@see https://circleci.com/docs/2.0/configuration-reference/#steps} */
  readonly steps?: any[];
  /** In which directory to run the steps. Will be interpreted as an absolute path. Default: `~/project` */
  readonly workingDirectory?: string;
  /** Number of parallel instances of this job to run (default: 1) */
  readonly parallelism?: number;
  /** A map of environment variable names and values. */
  readonly environment?: Record<string, string | number | boolean>;
  /** {@link ResourceClass} */
  readonly resourceClass?: ResourceClass | string;
  /** Enables jobs to go through a set of well-defined IP address ranges */
  readonly circleciIpRanges?: boolean;
}

/**
 * Options for docker executor
 * @see https://circleci.com/docs/2.0/configuration-reference/#docker
 */
export interface Docker {
  /** The name of a custom docker image to use */
  readonly image: string;
  /** The name the container is reachable by. By default, container services are accessible through localhost */
  readonly name?: string;
  /** The command used as executable when launching the container */
  readonly entrypoint?: string[];
  /** The command used as pid 1 (or args for entrypoint) when launching the container */
  readonly command?: string[];
  /** Which user to run commands as within the Docker container */
  readonly user?: string;
  /** A map of environment variable names and values */
  readonly environment?: Record<string, string | number | boolean>;
  /** Authentication for registries using standard docker login credentials */
  readonly auth?: Record<string, string>;
  /** Authentication for AWS Elastic Container Registry (ECR) */
  readonly awsAuth?: Record<string, string>;
}

export interface Machine {
  /**
   * The VM image to use.
   * @see https://circleci.com/docs/2.0/configuration-reference/#available-machine-images
   */
  readonly image: string;
  /** enable docker layer caching
   * @see https://circleci.com/docs/2.0/configuration-reference/#available-machine-images
   */
  readonly dockerLayerCaching?: string;
}

/**
 * CircleCI supports running jobs on macOS, to allow you to build, test,
 * and deploy apps for macOS, iOS, tvOS and watchOS. To run a job in a macOS virtual machine,
 * you must add the macos key to the top-level configuration for the job and specify
 * the version of Xcode you would like to use.
 * @see https://circleci.com/docs/2.0/configuration-reference/#macos
 */
export interface Macos {
  /** The version of Xcode that is installed on the virtual machine */
  readonly xcode: string;
}

/**
 * Execution steps for Job
 * @see https://circleci.com/docs/2.0/configuration-reference/#steps
 */
export interface StepRun {
  readonly run?: Run;
}

/**
 * Used for invoking all command-line programs, taking either a map of configuration values,
 * or, when called in its short-form, a string that will be used as both the command and name.
 * Run commands are executed using non-login shells by default,
 * so you must explicitly source any dotfiles as part of the command.
 *
 * Not used because type incompatible types in steps array
 *
 * @see https://circleci.com/docs/2.0/configuration-reference/#run
 */
export interface Run {
  /** Command to run via the shell */
  readonly command: string;
  /** Title of the step to be shown in the CircleCI UI (default: full command) */
  readonly name?: string;
  /** Shell to use for execution command */
  readonly shell?: string;
  /** Additional environmental variables, locally scoped to command */
  readonly environment?: string;
  /** Whether this step should run in the background (default: false) */
  readonly background?: string;
  /** In which directory to run this step. Will be interpreted relative to the working_directory of the job). (default: .) */
  readonly workingDirectory?: string;
  /** Elapsed time the command can run without output such as “20m”, “1.25h”, “5s”. The default is 10 minutes */
  readonly noOutputTimeout?: string;
  /** Specify when to enable or disable the step. */
  readonly when?: JobWhen | string;
}
