// @see https://docs.gitlab.com/ee/ci/yaml/
// Schema from: https://gitlab.com/gitlab-org/gitlab/-/raw/master/app/assets/javascripts/editor/schema/ci.json
// Initial TypeScript Interfaces from: https://app.quicktype.io/#

/**
 * Cache Definition.
 * @see https://docs.gitlab.com/ee/ci/yaml/#cache
 */
export interface Cache {
  /** Defines which files or directories to cache. */
  readonly paths?: string[];

  /** Used the to give each cache a unique identifying key. All jobs that use the same cache key use the same cache. */
  readonly key?: string | CacheKeyFiles;

  /** If set to true all files that are untracked in your Git repository will be cached. */
  readonly untracked?: boolean;

  /** Defines the upload and download behaviour of the cache. */
  readonly policy?: CachePolicy;

  /** Defines when to save the cache, based on the status of the job (Default: Job Success). */
  readonly when?: CacheWhen;

  /** Use cache:fallback_keys to specify a list of keys to try to restore cache from if there is no cache found for the cache:key. Caches are retrieved in the order specified in the fallback_keys section. */
  readonly fallbackKeys?: string[];
}

/**
 * Use this construct to generate a new key when one or two specific files change.
 * @see https://docs.gitlab.com/ee/ci/yaml/#cachekeyfiles
 */
export interface CacheKeyFiles {
  /** The files that are checked against. If the SHA checksum changes, the cache becomes invalid. */
  readonly files: string[];
  /** Adds a custom prefix to the checksums computed. */
  readonly prefix?: string;
}

/**
 * Configure the upload and download behaviour of a cache.
 * @see https://docs.gitlab.com/ee/ci/yaml/#cachepolicy
 */
export enum CachePolicy {
  /** Only download the cache when the job starts, but never upload changes when the job finishes. */
  PULL = "pull",
  /** Only upload a cache when the job finishes, but never download the cache when the job starts. */
  PUSH = "push",
  /** The job downloads the cache when the job starts, and uploads changes to the cache when the job ends. */
  PULL_PUSH = "pull-push",
}

/**
 * Configure when artifacts are uploaded depended on job status.
 * @see https://docs.gitlab.com/ee/ci/yaml/#cachewhen
 */
export enum CacheWhen {
  /** Upload artifacts regardless of job status. */
  ALWAYS = "always",
  /** Upload artifacts only when the job fails. */
  ON_FAILURE = "on_failure",
  /** Upload artifacts only when the job succeeds (this is the default). */
  ON_SUCCESS = "on_success",
}

export interface DefaultHooks {
  /** Specify a list of commands to execute on the runner before cloning the Git repository and any submodules https://docs.gitlab.com/ci/yaml/#hookspre_get_sources_script */
  readonly preGetSourcesScript?: string[];
}

/**
 * Default settings for the CI Configuration. Jobs that do not define one or more of the listed keywords use the value defined in the default section.
 * @see https://docs.gitlab.com/ee/ci/yaml/#default
 */
export interface Default {
  /* Defines scripts that should run *after* all jobs. Can be overriden by the job level `afterScript. */
  readonly afterScript?: string[];
  /* List of files and directories that should be attached to the job if it succeeds. Artifacts are sent to Gitlab where they can be downloaded. */
  readonly artifacts?: Artifacts;
  /* Defines scripts that should run *before* all jobs. Can be overriden by the job level `afterScript`. */
  readonly beforeScript?: string[];
  /* A list of cache definitions (max. 4) with the files and directories to cache between jobs. You can only use paths that are in the local working copy. */
  readonly cache?: Cache[];
  /** Specifies the default ID tokens (JSON Web Tokens) that are used for CI/CD authentication to use globally for all jobs. */
  readonly idTokens?: Record<string, IDToken>;
  /* Specifies the default docker image to use globally for all jobs. */
  readonly image?: Image;
  /* If a job should be canceled when a newer pipeline starts before the job completes (Default: false).*/
  readonly interruptible?: boolean;
  /* How many times a job is retried if it fails. If not defined, defaults to 0 and jobs do not retry. */
  readonly retry?: Retry;
  /* Additional Docker images to run scripts in. The service image is linked to the image specified in the  image parameter. */
  readonly services?: Service[];
  /* Used to select a specific runner from the list of all runners that are available for the project. */
  readonly tags?: string[];
  /* A default timeout job written in natural language (Ex. one hour, 3600 seconds, 60 minutes). */
  readonly timeout?: string;
  /** Specify a list of commands to execute on the runner before cloning the Git repository and any submodules https://docs.gitlab.com/ci/yaml/#hookspre_get_sources_script */
  readonly hooks?: DefaultHooks;
}

/**
 * Used to specify a list of files and directories that should be attached to the job if it
 * succeeds. Artifacts are sent to Gitlab where they can be downloaded.
 * @see https://docs.gitlab.com/ee/ci/yaml/#artifacts
 */
export interface Artifacts {
  /** A list of paths to files/folders that should be excluded in the artifact. */
  readonly exclude?: string[];
  /** How long artifacts should be kept. They are saved 30 days by default. Artifacts that have expired are removed periodically via cron job. Supports a wide variety of formats, e.g. '1 week', '3 mins 4 sec', '2 hrs 20 min', '2h20min', '6 mos 1 day', '47 yrs 6 mos and 4d', '3 weeks and 2 days'. */
  readonly expireIn?: string;
  /** Can be used to expose job artifacts in the merge request UI. GitLab will add a link <expose_as> to the relevant merge request that points to the artifact. */
  readonly exposeAs?: string;
  /** Name for the archive created on job success. Can use variables in the name, e.g. '$CI_JOB_NAME' */
  readonly name?: string;
  /** A list of paths to files/folders that should be included in the artifact. */
  readonly paths?: string[];
  /** Reports will be uploaded as artifacts, and often displayed in the Gitlab UI, such as in Merge Requests.*/
  readonly reports?: Reports;
  /** Whether to add all untracked files (along with 'artifacts.paths') to the artifact.*/
  readonly untracked?: boolean;
  /** Configure when artifacts are uploaded depended on job status.*/
  readonly when?: CacheWhen;
}

/**
 * Code coverage report interface
 * @link https://docs.gitlab.com/ee/ci/yaml/artifacts_reports.html#artifactsreportscoverage_report
 */
export interface CoverageReport {
  readonly coverageFormat: string;
  readonly path: string;
}

/**
 * Reports will be uploaded as artifacts, and often displayed in the Gitlab UI, such as in
 * Merge Requests.
 * @see https://docs.gitlab.com/ee/ci/yaml/#artifactsreports
 */
export interface Reports {
  /** Path for file(s) that should be parsed as Cobertura XML coverage report
   * @deprecated per {@link https://docs.gitlab.com/ee/update/deprecations.html#artifactsreportscobertura-keyword} use {@link coverageReport} instead
   */
  readonly cobertura?: string[];
  /** Path to file or list of files with code quality report(s) (such as Code Climate).*/
  readonly codequality?: string[];
  /** Path to file or list of files with Container scanning vulnerabilities report(s).*/
  readonly containerScanning?: string[];
  /** Code coverage report information */
  readonly coverageReport?: CoverageReport;
  /** Path to file or list of files with DAST vulnerabilities report(s).*/
  readonly dast?: string[];
  /** Path to file or list of files with Dependency scanning vulnerabilities report(s).*/
  readonly dependencyScanning?: string[];
  /** Path to file or list of files containing runtime-created variables for this job.*/
  readonly dotenv?: string[];
  /** Path for file(s) that should be parsed as JUnit XML result*/
  readonly junit?: string[];
  /** Deprecated in 12.8: Path to file or list of files with license report(s).*/
  readonly licenseManagement?: string[];
  /** Path to file or list of files with license report(s).*/
  readonly licenseScanning?: string[];
  /** Path to file or list of files containing code intelligence (Language Server Index Format).*/
  readonly lsif?: string[];
  /** Path to file or list of files with custom metrics report(s).*/
  readonly metrics?: string[];
  /** Path to file or list of files with performance metrics report(s).*/
  readonly performance?: string[];
  /** Path to file or list of files with requirements report(s).*/
  readonly requirements?: string[];
  /** Path to file or list of files with SAST vulnerabilities report(s).*/
  readonly sast?: string[];
  /** Path to file or list of files with secret detection report(s).*/
  readonly secretDetection?: string[];
  /** Path to file or list of files with terraform plan(s).*/
  readonly terraform?: string[];
}

/**
 * id_tokens Definition.
 * @see https://docs.gitlab.com/ee/ci/yaml/#id_tokens
 */
export interface IDToken {
  /** The required aud sub-keyword is used to configure the aud claim for the JWT. */
  aud: string[] | string;
}

/**
 * Specifies the docker image to use for the job or globally for all jobs. Job configuration
 * takes precedence over global setting. Requires a certain kind of Gitlab runner executor.
 * @see https://docs.gitlab.com/ee/ci/yaml/#image
 */
export interface Image {
  /** Command or script that should be executed as the container's entrypoint. It will be translated to Docker's --entrypoint option while creating the container. The syntax is similar to Dockerfile's ENTRYPOINT directive, where each shell token is a separate string in the array.*/
  readonly entrypoint?: any[];
  /** Full name of the image that should be used. It should contain the Registry part if needed.*/
  readonly name: string;
}

/**
 * How many times a job is retried if it fails. If not defined, defaults to 0 and jobs do not retry.
 * @see https://docs.gitlab.com/ee/ci/yaml/#retry
 */
export interface Retry {
  /** 0 (default), 1, or 2.*/
  readonly max?: number;
  /** Either a single or array of error types to trigger job retry.*/
  readonly when?: any;
}

/**
 * Used to specify an additional Docker image to run scripts in. The service image is linked to the image specified in the @Default image keyword.
 * @see https://docs.gitlab.com/ee/ci/yaml/#services
 */
export interface Service {
  /** Additional alias that can be used to access the service from the job's container. Read Accessing the services for more information.*/
  readonly alias?: string;
  /** Command or script that should be used as the container's command. It will be translated to arguments passed to Docker after the image's name. The syntax is similar to Dockerfile's CMD directive, where each shell token is a separate string in the array.*/
  readonly command?: string[];
  /** Command or script that should be executed as the container's entrypoint. It will be translated to Docker's --entrypoint option while creating the container. The syntax is similar to Dockerfile's ENTRYPOINT directive, where each shell token is a separate string in the array.*/
  readonly entrypoint?: string[];
  /** Full name of the image that should be used. It should contain the Registry part if needed.*/
  readonly name: string;
  /** The pull policy that the runner uses to fetch the Docker image */
  readonly pullPolicy?: PullPolicy[];
  /** Additional environment variables that are passed exclusively to the service.. */
  readonly variables?: Record<string, string>;
}

/**
 * Describes the conditions for when to pull an image.
 * @see https://docs.gitlab.com/ee/ci/yaml/#servicepull_policy
 */
export enum PullPolicy {
  ALWAYS = "always",
  NEVER = "never",
  IF_NOT_PRESENT = "if-not-present",
}

/**
 * An included YAML file.
 * @see https://docs.gitlab.com/ee/ci/yaml/#include
 */
export interface Include {
  /** Relative path from local repository root (`/`) to the `yaml`/`yml` file template. The file must be on the same branch, and does not work across git submodules.*/
  readonly local?: string;
  /**Rules allows for an array of individual rule objects to be evaluated in order, until one matches and dynamically provides attributes to the job. */
  readonly rules?: IncludeRule[];
  /** Files from another private project on the same GitLab instance. You can use `file` in combination with `project` only. */
  readonly file?: string[];
  /** Path to the project, e.g. `group/project`, or `group/sub-group/project`.*/
  readonly project?: string;
  /** Branch/Tag/Commit-hash for the target project.*/
  readonly ref?: string;
  /** Use a `.gitlab-ci.yml` template as a base, e.g. `Nodejs.gitlab-ci.yml`.*/
  readonly template?: string;
  /** URL to a `yaml`/`yml` template file using HTTP/HTTPS.*/
  readonly remote?: string;
}

/**
 * Rules allows for an array of individual rule objects to be evaluated in order, until one
 * matches and dynamically provides attributes to the job.
 * @see https://docs.gitlab.com/ee/ci/yaml/includes.html#use-rules-with-include
 */
export interface IncludeRule {
  /* Whether a pipeline should continue running when a job fails. */
  readonly allowFailure?: boolean | AllowFailure;
  /* Specify when to add a job to a pipeline by checking for changes to specific files. */
  readonly changes?: string[];
  /* Run a job when certain files exist in the repository. */
  readonly exists?: string[];
  /* Clauses to specify when to add a job to a pipeline.*/
  readonly if?: string;
  /* Specify to update a job’s needs for specific conditions. */
  readonly needs?: string[];
  /* Execute scripts after a waiting period written in natural language (Ex. one hour, 3600 seconds, 60 minutes). */
  readonly startIn?: string;
  /* Use variables in rules to define variables for specific conditions. */
  readonly variables?: Record<string, string>;
  /* Conditions for when to run the job. Defaults to 'on_success' */
  readonly when?: JobWhen;
}

/**
 * Exit code that are not considered failure. The job fails for any other exit code.
 * You can list which exit codes are not considered failures. The job fails for any other
 * exit code.
 * @see https://docs.gitlab.com/ee/ci/yaml/#allow_failure
 */
export interface AllowFailure {
  readonly exitCodes: number[] | number;
}

/**
 * Describes the conditions for when to run the job. Defaults to 'on_success'.
 * @see https://docs.gitlab.com/ee/ci/yaml/#when
 */
export enum JobWhen {
  ALWAYS = "always",
  DELAYED = "delayed",
  MANUAL = "manual",
  NEVER = "never",
  ON_FAILURE = "on_failure",
  ON_SUCCESS = "on_success",
}

/**
 * Jobs are the most fundamental element of a .gitlab-ci.yml file.
 * @see https://docs.gitlab.com/ee/ci/jobs/
 */
export interface Job {
  /* Defines scripts that should run *after* the job. */
  readonly afterScript?: string[];
  /** Whether to allow the pipeline to continue running on job failure (Default: false). */
  readonly allowFailure?: boolean | AllowFailure;
  /* A list of files and directories that should be attached to the job if it succeeds. Artifacts are sent to Gitlab where they can be downloaded. */
  readonly artifacts?: Artifacts;
  /* Defines scripts that should run *before* the job. */
  readonly beforeScript?: string[];
  /* A list of cache definitions (max. 4) with the files and directories to cache between jobs. You can only use paths that are in the local working copy. */
  readonly cache?: Cache[];
  /** Must be a regular expression, optionally but recommended to be quoted, and must be surrounded with '/'. Example: '/Code coverage: \d+\.\d+/'*/
  readonly coverage?: string;
  /** Specify a list of job names from earlier stages from which artifacts should be loaded. By default, all previous artifacts are passed. Use an empty array to skip downloading artifacts.*/
  readonly dependencies?: string[];
  /** Used to associate environment metadata with a deploy. Environment can have a name and URL attached to it, and will be displayed under /environments under the project.*/
  readonly environment?: Environment | string;
  /** Job will run *except* for when these filtering options match.*/
  readonly except?: string[] | Filter;
  /** The name of one or more jobs to inherit configuration from.*/
  readonly extends?: string[];
  /** Configurable ID tokens (JSON Web Tokens) that are used for CI/CD authentication */
  readonly idTokens?: Record<string, IDToken>;
  /* Specifies the default docker image to used for the job. */
  readonly image?: Image;
  /** Controls inheritance of globally-defined defaults and variables. Boolean values control inheritance of all default: or variables: keywords. To inherit only a subset of default: or variables: keywords, specify what you wish to inherit. Anything not listed is not inherited.*/
  readonly inherit?: Inherit;
  /* If a job should be canceled when a newer pipeline starts before the job completes (Default: false).*/
  readonly interruptible?: boolean;
  /** The list of jobs in previous stages whose sole completion is needed to start the current job.*/
  readonly needs?: Array<Need | string>;
  /** Job will run *only* when these filtering options match.*/
  readonly only?: string[] | Filter;
  /** Parallel will split up a single job into several, and provide `CI_NODE_INDEX` and `CI_NODE_TOTAL` environment variables for the running jobs.*/
  readonly parallel?: Parallel | number;
  /** Indicates that the job creates a Release.*/
  readonly release?: Release;
  /** Limit job concurrency. Can be used to ensure that the Runner will not run certain jobs simultaneously.*/
  readonly resourceGroup?: string;
  /* How many times a job is retried if it fails. If not defined, defaults to 0 and jobs do not retry. */
  readonly retry?: Retry;
  /**Rules allows for an array of individual rule objects to be evaluated in order, until one matches and dynamically provides attributes to the job. */
  readonly rules?: IncludeRule[];
  /** Shell scripts executed by the Runner. The only required property of jobs. Be careful with special characters (e.g. `:`, `{`, `}`, `&`) and use single or double quotes to avoid issues.*/
  readonly script?: string[];
  /** CI/CD secrets */
  readonly secrets?: Record<string, Record<string, Secret>>;
  /* Additional Docker images to run scripts in. The service image is linked to the image specified in the  image parameter. */
  readonly services?: Service[];
  /** Define what stage the job will run in.*/
  readonly stage?: string;
  /* Execute scripts after a waiting period written in natural language (Ex. one hour, 3600 seconds, 60 minutes). */
  readonly startIn?: string;
  /* Used to select a specific runner from the list of all runners that are available for the project. */
  readonly tags?: string[];
  /* A default timeout job written in natural language (Ex. one hour, 3600 seconds, 60 minutes). */
  readonly timeout?: string;
  /** Trigger allows you to define downstream pipeline trigger. When a job created from trigger definition is started by GitLab, a downstream pipeline gets created. Read more: https://docs.gitlab.com/ee/ci/yaml/README.html#trigger*/
  readonly trigger?: Trigger | string;
  /** Configurable values that are passed to the Job. */
  readonly variables?: Record<string, string>;
  /** Describes the conditions for when to run the job. Defaults to 'on_success'. */
  readonly when?: JobWhen;
  /* Specify a list of commands to execute on the runner before cloning the Git repository and any submodules https://docs.gitlab.com/ci/yaml/#hookspre_get_sources_script */
  readonly hooks?: DefaultHooks;
}

/**
 * The environment that a job deploys to.
 */
export interface Environment {
  /** Specifies what this job will do. 'start' (default) indicates the job will start the deployment. 'prepare' indicates this will not affect the deployment. 'stop' indicates this will stop the deployment.*/
  readonly action?: Action;
  /** The amount of time it should take before Gitlab will automatically stop the environment. Supports a wide variety of formats, e.g. '1 week', '3 mins 4 sec', '2 hrs 20 min', '2h20min', '6 mos 1 day', '47 yrs 6 mos and 4d', '3 weeks and 2 days'.*/
  readonly autoStopIn?: string;
  /** Explicitly specifies the tier of the deployment environment if non-standard environment name is used.*/
  readonly deploymentTier?: DeploymentTier;
  /** Used to configure the kubernetes deployment for this environment. This is currently not supported for kubernetes clusters that are managed by Gitlab.*/
  readonly kubernetes?: KubernetesConfig;
  /** The name of the environment, e.g. 'qa', 'staging', 'production'.*/
  readonly name: string;
  /** The name of a job to execute when the environment is about to be stopped.*/
  readonly onStop?: string;
  /** When set, this will expose buttons in various places for the current environment in Gitlab, that will take you to the defined URL.*/
  readonly url?: string;
}

/**
 * Specifies what this job will do. 'start' (default) indicates the job will start the
 * deployment. 'prepare' indicates this will not affect the deployment. 'stop' indicates
 * this will stop the deployment.
 */
export enum Action {
  PREPARE = "prepare",
  START = "start",
  STOP = "stop",
}

/**
 * Explicitly specifies the tier of the deployment environment if non-standard environment
 * name is used.
 */
export enum DeploymentTier {
  DEVELOPMENT = "development",
  OTHER = "other",
  PRODUCTION = "production",
  STAGING = "staging",
  TESTING = "testing",
}

/**
 * Used to configure the kubernetes deployment for this environment. This is currently not
 * supported for kubernetes clusters that are managed by Gitlab.
 */
export interface KubernetesConfig {
  /** The kubernetes namespace where this environment should be deployed to.*/
  readonly namespace?: string;
}

/**
 * Filtering options for when a job will run.
 */
export interface Filter {
  /** Filter job creation based on files that were modified in a git push.*/
  readonly changes?: string[];
  /** Filter job based on if Kubernetes integration is active.*/
  readonly kubernetes?: KubernetesEnum;
  /** Control when to add jobs to a pipeline based on branch names or pipeline types. */
  readonly refs?: string[];
  /** Filter job by checking comparing values of environment variables. Read more about variable expressions: https://docs.gitlab.com/ee/ci/variables/README.html#variables-expressions*/
  readonly variables?: string[];
}

/**
 * Filter job based on if Kubernetes integration is active.
 */
export enum KubernetesEnum {
  ACTIVE = "active",
}

/**
 * Controls inheritance of globally-defined defaults and variables. Boolean values control
 * inheritance of all default: or variables: keywords. To inherit only a subset of default:
 * or variables: keywords, specify what you wish to inherit. Anything not listed is not
 * inherited.
 */
export interface Inherit {
  /** Whether to inherit all globally-defined defaults or not. Or subset of inherited defaults*/
  readonly default?: DefaultElement[] | boolean;
  /** Whether to inherit all globally-defined variables or not. Or subset of inherited variables*/
  readonly variables?: string[] | boolean;
}

export enum DefaultElement {
  AFTER_SCRIPT = "after_script",
  ARTIFACTS = "artifacts",
  BEFORE_SCRIPT = "before_script",
  CACHE = "cache",
  IMAGE = "image",
  INTERRUPTIBLE = "interruptible",
  RETRY = "retry",
  SERVICES = "services",
  TAGS = "tags",
  TIMEOUT = "timeout",
}

/**
 * A jobs in a previous stage whose sole completion is needed to start the current job.
 */
export interface Need {
  readonly artifacts?: boolean;
  readonly job: string;
  readonly optional?: boolean;
  readonly pipeline?: string;
  readonly project?: string;
  readonly ref?: string;
}

/**
 * Used to run a job multiple times in parallel in a single pipeline.
 */
export interface Parallel {
  /** Defines different variables for jobs that are running in parallel.*/
  readonly matrix: Record<string, any[]>[];
}

/**
 * Indicates that the job creates a Release.
 */
export interface Release {
  readonly assets?: Assets;
  /** Specifies the longer description of the Release.*/
  readonly description: string;
  /** The title of each milestone the release is associated with.*/
  readonly milestones?: string[];
  /** The Release name. If omitted, it is populated with the value of release: tag_name.*/
  readonly name?: string;
  /** If the release: tag_name doesn’t exist yet, the release is created from ref. ref can be a commit SHA, another tag name, or a branch name.*/
  readonly ref?: string;
  /** The date and time when the release is ready. Defaults to the current date and time if not defined. Should be enclosed in quotes and expressed in ISO 8601 format.*/
  readonly releasedAt?: string;
  /** The tag_name must be specified. It can refer to an existing Git tag or can be specified by the user.*/
  readonly tagName: string;
}

/**
 * Asset configuration for a release.
 */
export interface Assets {
  /** Include asset links in the release.*/
  readonly links: Link[];
}

/**
 * Link configuration for an asset.
 */
export interface Link {
  /** The redirect link to the url.*/
  readonly filepath?: string;
  /** The content kind of what users can download via url.*/
  readonly linkType?: LinkType;
  /** The name of the link.*/
  readonly name: string;
  /** The URL to download a file.*/
  readonly url: string;
}

/**
 * The content kind of what users can download via url.
 */
export enum LinkType {
  IMAGE = "image",
  OTHER = "other",
  PACKAGE = "package",
  RUNBOOK = "runbook",
}

/**
 * A CI/CD secret
 */
export interface Secret {
  /* Specification for a secret provided by a HashiCorp Vault. */
  readonly vault: VaultConfig;
}

/**
 * Specification for a secret provided by a HashiCorp Vault.
 * @see https://www.vaultproject.io/
 */
export interface VaultConfig {
  /* The engine configuration for a secret. */
  readonly engine: Engine;
  /* The name of the field where the password is stored. */
  readonly field: string;
  /** Path to the secret. */
  readonly path: string;
}

/**
 * The engine configuration for a secret.
 */
export interface Engine {
  /** Name of the secrets engine. */
  readonly name: string;
  /** Path to the secrets engine. */
  readonly path: string;
}

/**
 * Trigger a multi-project or a child pipeline. Read more:
 * @see https://docs.gitlab.com/ee/ci/yaml/README.html#simple-trigger-syntax-for-multi-project-pipelines
 * @see https://docs.gitlab.com/ee/ci/yaml/README.html#trigger-syntax-for-child-pipeline
 */
export interface Trigger {
  /** The branch name that a downstream pipeline will use*/
  readonly branch?: string;
  /** Path to the project, e.g. `group/project`, or `group/sub-group/project`.*/
  readonly project?: string;
  /** You can mirror the pipeline status from the triggered pipeline to the source bridge job by using strategy: depend*/
  readonly strategy?: Strategy;
  /** A list of local files or artifacts from other jobs to define the pipeline */
  readonly include?: TriggerInclude[];
}

/**
 * References a local file or an artifact from another job to define the pipeline
 * configuration.
 * @see https://docs.gitlab.com/ee/ci/yaml/#triggerinclude
 */
export interface TriggerInclude {
  /** Relative path from local repository root (`/`) to the local YAML file to define the pipeline configuration.*/
  readonly local?: string;
  /** Name of the template YAML file to use in the pipeline configuration.*/
  readonly template?: string;
  /** Relative path to the generated YAML file which is extracted from the artifacts and used as the configuration for triggering the child pipeline.*/
  readonly artifact?: string;
  /** Job name which generates the artifact*/
  readonly job?: string;
  /** Relative path from repository root (`/`) to the pipeline configuration YAML file.*/
  readonly file?: string;
  /** Path to another private project under the same GitLab instance, like `group/project` or `group/sub-group/project`.*/
  readonly project?: string;
  /** Branch/Tag/Commit hash for the target project.*/
  readonly ref?: string;
}

/**
 * You can mirror the pipeline status from the triggered pipeline to the source bridge job
 * by using strategy: depend
 * @see https://docs.gitlab.com/ee/ci/yaml/#triggerstrategy
 */
export enum Strategy {
  DEPEND = "depend",
}

/**
 * Explains what the global variable is used for, what the acceptable values are.
 * @see https://docs.gitlab.com/ee/ci/yaml/#variables
 */
export interface VariableConfig {
  /** Define a global variable that is prefilled when running a pipeline manually. Must be used with value.  */
  readonly description?: string;
  /** The variable value. */
  readonly value?: string;
}

/**
 * Used to control pipeline behavior.
 * @see https://docs.gitlab.com/ee/ci/yaml/#workflow
 */
export interface Workflow {
  /** You can use name to define a name for pipelines. */
  readonly name?: string;
  /** Used to control whether or not a whole pipeline is created. */
  readonly rules?: WorkflowRule[];
}

/**
 * Used to control whether or not a whole pipeline is created.
 * @see https://docs.gitlab.com/ee/ci/yaml/#workflowrules
 */
export interface WorkflowRule {
  /* Specify when to add a job to a pipeline by checking for changes to specific files. */
  readonly changes?: string[];
  /* Run a job when certain files exist in the repository. */
  readonly exists?: string[];
  /* Clauses to specify when to add a job to a pipeline.*/
  readonly if?: string;
  /* Use variables in rules to define variables for specific conditions. */
  readonly variables?: Record<string, number | string>;
  /* Conditions for when to run the job. Defaults to 'on_success' */
  readonly when?: WorkflowWhen;
}

/**
 * Describes the conditions for when to run the job. Defaults to 'on_success'.
 * The value can only be 'always' or 'never' when used with workflow.
 * @see https://docs.gitlab.com/ee/ci/yaml/#workflowrules
 */
export enum WorkflowWhen {
  ALWAYS = "always",
  NEVER = "never",
}
