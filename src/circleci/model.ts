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
  readonly filter?: Filter;
  readonly matrix?: Matrix;
}

/**
 * The matrix stanza allows you to run a parameterized job multiple times with different arguments.
 * @see https://circleci.com/docs/2.0/configuration-reference/#matrix-requires-version-21
 */
export interface Matrix {
  /** A map of parameter names to every value the job should be called with */
  readonly parameters?: Record<string, string[]>;
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
