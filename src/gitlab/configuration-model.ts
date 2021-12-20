// @see https://docs.gitlab.com/ee/ci/yaml/
// Schema from: https://gitlab.com/gitlab-org/gitlab/-/raw/master/app/assets/javascripts/editor/schema/ci.json
// Initial TypeScript Interfaces from: https://app.quicktype.io/#

/**
 * Cache Definition.
 */
export interface Cache {
  /**
     * Defines when to save the cache, based on the status of the job (Default: Job Success).
     */
  readonly when?: CacheWhen;
}

/**
 * Configure when artifacts are uploaded depended on job status.
 */
export enum CacheWhen {
  /** Upload artifacts regardless of job status. */
  ALWAYS = 'always',
  /** Upload artifacts only when the job fails. */
  ON_FAILURE = 'on_failure',
  /** Upload artifacts only when the job succeeds (this is the default). */
  ON_SUCCESS = 'on_success',
}

/**
 * Default settings for the CI Configuration.
 */
export interface Default {
  /* Defines scripts that should run *after* the job. Can be set globally or per job. */
  readonly afterScript?: Array<string[] | string>;
  readonly artifacts?: Artifacts;
  /* Defines scripts that should run *before* the job. Can be set globally or per job. */
  readonly beforeScript?: Array<string[] | string>;
  readonly cache?: Cache;
  readonly image?: Image | string;
  /* If a job should be canceled when a newer pipeline starts before the job completes (Default: false).*/
  readonly interruptible?: boolean;
  readonly retry?: Retry | number;
  readonly services?: Array<Service | string>;
  readonly tags?: string[];
  readonly timeout?: string;
}

/**
 * Used to specify a list of files and directories that should be attached to the job if it
 * succeeds. Artifacts are sent to Gitlab where they can be downloaded.
 */
export interface Artifacts {
  /**
     * A list of paths to files/folders that should be excluded in the artifact.
     */
  readonly exclude?: string[];
  /**
     * How long artifacts should be kept. They are saved 30 days by default. Artifacts that have
     * expired are removed periodically via cron job. Supports a wide variety of formats, e.g.
     * '1 week', '3 mins 4 sec', '2 hrs 20 min', '2h20min', '6 mos 1 day', '47 yrs 6 mos and
     * 4d', '3 weeks and 2 days'.
     */
  readonly expireIn?: string;
  /**
     * Can be used to expose job artifacts in the merge request UI. GitLab will add a link
     * <expose_as> to the relevant merge request that points to the artifact.
     */
  readonly exposeAs?: string;
  /**
     * Name for the archive created on job success. Can use variables in the name, e.g.
     * '$CI_JOB_NAME'
     */
  readonly name?: string;
  /**
     * A list of paths to files/folders that should be included in the artifact.
     */
  readonly paths?: string[];
  /**
     * Reports will be uploaded as artifacts, and often displayed in the Gitlab UI, such as in
     * Merge Requests.
     */
  readonly reports?: Reports;
  /**
     * Whether to add all untracked files (along with 'artifacts.paths') to the artifact.
     */
  readonly untracked?: boolean;
  /**
     * Configure when artifacts are uploaded depended on job status.
     */
  readonly when?: CacheWhen;
}

/**
 * Reports will be uploaded as artifacts, and often displayed in the Gitlab UI, such as in
 * Merge Requests.
 */
export interface Reports {
  /**
     * Path for file(s) that should be parsed as Cobertura XML coverage report
     */
  readonly cobertura?: string[] | string;
  /**
     * Path to file or list of files with code quality report(s) (such as Code Climate).
     */
  readonly codequality?: string[] | string;
  /**
     * Path to file or list of files with Container scanning vulnerabilities report(s).
     */
  readonly containerScanning?: string[] | string;
  /**
     * Path to file or list of files with DAST vulnerabilities report(s).
     */
  readonly dast?: string[] | string;
  /**
     * Path to file or list of files with Dependency scanning vulnerabilities report(s).
     */
  readonly dependencyScanning?: string[] | string;
  /**
     * Path to file or list of files containing runtime-created variables for this job.
     */
  readonly dotenv?: string[] | string;
  /**
     * Path for file(s) that should be parsed as JUnit XML result
     */
  readonly junit?: string[] | string;
  /**
     * Deprecated in 12.8: Path to file or list of files with license report(s).
     */
  readonly licenseManagement?: string[] | string;
  /**
     * Path to file or list of files with license report(s).
     */
  readonly licenseScanning?: string[] | string;
  /**
     * Path to file or list of files containing code intelligence (Language Server Index Format).
     */
  readonly lsif?: string[] | string;
  /**
     * Path to file or list of files with custom metrics report(s).
     */
  readonly metrics?: string[] | string;
  /**
     * Path to file or list of files with performance metrics report(s).
     */
  readonly performance?: string[] | string;
  /**
     * Path to file or list of files with requirements report(s).
     */
  readonly requirements?: string[] | string;
  /**
     * Path to file or list of files with SAST vulnerabilities report(s).
     */
  readonly sast?: string[] | string;
  /**
     * Path to file or list of files with secret detection report(s).
     */
  readonly secretDetection?: string[] | string;
  /**
     * Path to file or list of files with terraform plan(s).
     */
  readonly terraform?: string[] | string;
}

/**
 * Specifies the docker image to use for the job or globally for all jobs. Job configuration
 * takes precedence over global setting. Requires a certain kind of Gitlab runner executor.
 */
export interface Image {
  /**
     * Command or script that should be executed as the container's entrypoint. It will be
     * translated to Docker's --entrypoint option while creating the container. The syntax is
     * similar to Dockerfile's ENTRYPOINT directive, where each shell token is a separate string
     * in the array.
     */
  readonly entrypoint?: any[];
  /**
     * Full name of the image that should be used. It should contain the Registry part if needed.
     */
  readonly name: string;
}

export interface Retry {
  readonly max?: number;
  /**
     * Either a single or array of error types to trigger job retry.
     */
  readonly when?: any;
}

export interface Service {
  /**
     * Additional alias that can be used to access the service from the job's container. Read
     * Accessing the services for more information.
     */
  readonly alias?: string;
  /**
     * Command or script that should be used as the container's command. It will be translated
     * to arguments passed to Docker after the image's name. The syntax is similar to
     * Dockerfile's CMD directive, where each shell token is a separate string in the array.
     */
  readonly command?: string[];
  /**
     * Command or script that should be executed as the container's entrypoint. It will be
     * translated to Docker's --entrypoint option while creating the container. The syntax is
     * similar to Dockerfile's ENTRYPOINT directive, where each shell token is a separate string
     * in the array.
     */
  readonly entrypoint?: string[];
  /**
     * Full name of the image that should be used. It should contain the Registry part if needed.
     */
  readonly name: string;
}

export interface IncludeItem {
  /**
     * Relative path from local repository root (`/`) to the `yaml`/`yml` file template. The
     * file must be on the same branch, and does not work across git submodules.
     */
  readonly local?: string;
  readonly rules?: IncludeItemRule[];
  readonly file?: string[] | string;
  /**
     * Path to the project, e.g. `group/project`, or `group/sub-group/project`.
     */
  readonly project?: string;
  /**
       * Branch/Tag/Commit-hash for the target project.
    npx projen new --from file:cdk-proserve-app-ts@0.0.0.jsii.tgz --cdk-version-pinning true --cdk-version "2.1.0"
      /**
       * Use a `.gitlab-ci.yml` template as a base, e.g. `Nodejs.gitlab-ci.yml`.
       */
  readonly template?: string;
  /**
     * URL to a `yaml`/`yml` template file using HTTP/HTTPS.
     */
  readonly remote?: string;
}

/**
 * Rules allows for an array of individual rule objects to be evaluated in order, until one
 * matches and dynamically provides attributes to the job.
 */
export interface IncludeItemRule {
  readonly allowFailure?: boolean | AllowFailure;
  readonly changes?: string[];
  readonly exists?: string[];
  readonly if?: string;
  readonly startIn?: string;
  readonly variables?: { [key: string]: number | string };
  readonly when?: JobWhen;
}

/**
 * Exit code that are not considered failure. The job fails for any other exit code.
 *
 * You can list which exit codes are not considered failures. The job fails for any other
 * exit code.
 */
export interface AllowFailure {
  readonly exitCodes: number[] | number;
}

/**
 * Describes the conditions for when to run the job. Defaults to 'on_success'.
 *
 * Execute job only when all jobs from prior stages succeed.
 *
 * Execute job when at least one job from prior stages fails.
 *
 * Execute job regardless of the status from prior stages.
 *
 * Execute the job manually from Gitlab UI or API. Read more:
 * https://docs.gitlab.com/ee/ci/yaml/#when-manual
 *
 * Execute a job after the time limit in 'start_in' expires. Read more:
 * https://docs.gitlab.com/ee/ci/yaml/#when-delayed
 *
 * NEVER execute the job.
 */
export enum JobWhen {
  ALWAYS = 'always',
  DELAYED = 'delayed',
  MANUAL = 'manual',
  NEVER = 'never',
  ON_FAILURE = 'on_failure',
  ON_SUCCESS = 'on_success',
}

export interface Include {
  /**
     * Relative path from local repository root (`/`) to the `yaml`/`yml` file template. The
     * file must be on the same branch, and does not work across git submodules.
     */
  readonly local?: string;
  readonly rules?: IncludeItemRule[];
  readonly file?: string[] | string;
  /**
     * Path to the project, e.g. `group/project`, or `group/sub-group/project`.
     */
  readonly project?: string;
  /**
     * Branch/Tag/Commit-hash for the target project.
     */
  readonly ref?: string;
  /**
     * Use a `.gitlab-ci.yml` template as a base, e.g. `Nodejs.gitlab-ci.yml`.
     */
  readonly template?: string;
  /**
     * URL to a `yaml`/`yml` template file using HTTP/HTTPS.
     */
  readonly remote?: string;
}

/**
 * Jobs are the most fundamental element of a .gitlab-ci.yml file.
 * @see https://docs.gitlab.com/ee/ci/jobs/
 */
export interface Job {
  readonly afterScript?: Array<string[] | string>;
  readonly allowFailure?: boolean | AllowFailure;
  readonly artifacts?: Artifacts;
  readonly beforeScript?: Array<string[] | string>;
  readonly cache?: Cache;
  /**
     * Must be a regular expression, optionally but recommended to be quoted, and must be
     * surrounded with '/'. Example: '/Code coverage: \d+\.\d+/'
     */
  readonly coverage?: string;
  /**
     * Specify a list of job names from earlier stages from which artifacts should be loaded. By
     * default, all previous artifacts are passed. Use an empty array to skip downloading
     * artifacts.
     */
  readonly dependencies?: string[];
  /**
     * Used to associate environment metadata with a deploy. Environment can have a name and URL
     * attached to it, and will be displayed under /environments under the project.
     */
  readonly environment?: Environment | string;
  /**
     * Job will run *except* for when these filtering options match.
     */
  readonly except?: string[] | Filter;
  /**
     * The name of one or more jobs to inherit configuration from.
     */
  readonly extends?: string[] | string;
  readonly image?: Image | string;
  /**
     * Controls inheritance of globally-defined defaults and variables. Boolean values control
     * inheritance of all default: or variables: keywords. To inherit only a subset of default:
     * or variables: keywords, specify what you wish to inherit. Anything not listed is not
     * inherited.
     */
  readonly inherit?: Inherit;
  readonly interruptible?: boolean;
  /**
     * The list of jobs in previous stages whose sole completion is needed to start the current
     * job.
     */
  readonly needs?: Array<Need | string>;
  /**
     * Job will run *only* when these filtering options match.
     */
  readonly only?: string[] | Filter;
  /**
     * Parallel will split up a single job into several, and provide `CI_NODE_INDEX` and
     * `CI_NODE_TOTAL` environment variables for the running jobs.
     */
  readonly parallel?: Parallel | number;
  /**
     * Indicates that the job creates a Release.
     */
  readonly release?: Release;
  /**
     * Limit job concurrency. Can be used to ensure that the Runner will not run certain jobs
     * simultaneously.
     */
  readonly resourceGroup?: string;
  readonly retry?: Retry | number;
  readonly rules?: IncludeItemRule[];
  /**
     * Shell scripts executed by the Runner. The only required property of jobs. Be careful with
     * special characters (e.g. `:`, `{`, `}`, `&`) and use single or double quotes to avoid
     * issues.
     */
  readonly script?: Array<string[] | string> | string;
  readonly secrets?: { [key: string]: { [key: string]: Secret } };
  readonly services?: Array<Service | string>;
  /**
     * Define what stage the job will run in.
     */
  readonly stage?: string;
  readonly startIn?: string;
  readonly tags?: string[];
  readonly timeout?: string;
  /**
     * Trigger allows you to define downstream pipeline trigger. When a job created from trigger
     * definition is started by GitLab, a downstream pipeline gets created. Read more:
     * https://docs.gitlab.com/ee/ci/yaml/README.html#trigger
     */
  readonly trigger?: Trigger | string;
  readonly variables?: { [key: string]: number | string };
  readonly when?: JobWhen;
}

export interface Environment {
  /**
     * Specifies what this job will do. 'start' (default) indicates the job will start the
     * deployment. 'prepare' indicates this will not affect the deployment. 'stop' indicates
     * this will stop the deployment.
     */
  readonly action?: Action;
  /**
     * The amount of time it should take before Gitlab will automatically stop the environment.
     * Supports a wide variety of formats, e.g. '1 week', '3 mins 4 sec', '2 hrs 20 min',
     * '2h20min', '6 mos 1 day', '47 yrs 6 mos and 4d', '3 weeks and 2 days'.
     */
  readonly autoStopIn?: string;
  /**
     * Explicitly specifies the tier of the deployment environment if non-standard environment
     * name is used.
     */
  readonly deploymentTier?: DeploymentTier;
  /**
     * Used to configure the kubernetes deployment for this environment. This is currently not
     * supported for kubernetes clusters that are managed by Gitlab.
     */
  readonly kubernetes?: KubernetesConfig;
  /**
     * The name of the environment, e.g. 'qa', 'staging', 'production'.
     */
  readonly name: string;
  /**
     * The name of a job to execute when the environment is about to be stopped.
     */
  readonly onStop?: string;
  /**
     * When set, this will expose buttons in various places for the current environment in
     * Gitlab, that will take you to the defined URL.
     */
  readonly url?: string;
}

/**
 * Specifies what this job will do. 'start' (default) indicates the job will start the
 * deployment. 'prepare' indicates this will not affect the deployment. 'stop' indicates
 * this will stop the deployment.
 */
export enum Action {
  PREPARE = 'prepare',
  START = 'start',
  STOP = 'stop',
}

/**
 * Explicitly specifies the tier of the deployment environment if non-standard environment
 * name is used.
 */
export enum DeploymentTier {
  DEVELOPMENT = 'development',
  OTHER = 'other',
  PRODUCTION = 'production',
  STAGING = 'staging',
  TESTING = 'testing',
}

/**
 * Used to configure the kubernetes deployment for this environment. This is currently not
 * supported for kubernetes clusters that are managed by Gitlab.
 */
export interface KubernetesConfig {
  /**
     * The kubernetes namespace where this environment should be deployed to.
     */
  readonly namespace?: string;
}

export interface Filter {
  /**
     * Filter job creation based on files that were modified in a git push.
     */
  readonly changes?: string[];
  /**
     * Filter job based on if Kubernetes integration is active.
     */
  readonly kubernetes?: KubernetesEnum;
  readonly refs?: string[];
  /**
     * Filter job by checking comparing values of environment variables. Read more about
     * variable expressions:
     * https://docs.gitlab.com/ee/ci/variables/README.html#variables-expressions
     */
  readonly variables?: string[];
}

/**
 * Filter job based on if Kubernetes integration is active.
 */
export enum KubernetesEnum {
  ACTIVE = 'active',
}

/**
 * Controls inheritance of globally-defined defaults and variables. Boolean values control
 * inheritance of all default: or variables: keywords. To inherit only a subset of default:
 * or variables: keywords, specify what you wish to inherit. Anything not listed is not
 * inherited.
 */
export interface Inherit {
  /**
     * Whether to inherit all globally-defined defaults or not. Or subset of inherited defaults
     */
  readonly default?: DefaultElement[] | boolean;
  /**
     * Whether to inherit all globally-defined variables or not. Or subset of inherited variables
     */
  readonly variables?: string[] | boolean;
}

export enum DefaultElement {
  AFTER_SCRIPT = 'after_script',
  ARTIFACTS = 'artifacts',
  BEFORE_SCRIPT = 'before_script',
  CACHE = 'cache',
  IMAGE = 'image',
  INTERRUPTIBLE = 'interruptible',
  RETRY = 'retry',
  SERVICES = 'services',
  TAGS = 'tags',
  TIMEOUT = 'timeout',
}

export interface Need {
  readonly artifacts?: boolean;
  readonly job: string;
  readonly optional?: boolean;
  readonly pipeline?: string;
  readonly project?: string;
  readonly ref?: string;
}

export interface Parallel {
  /**
     * Defines different variables for jobs that are running in parallel.
     */
  readonly matrix: { [key: string]: any[] | number | string }[];
}

/**
 * Indicates that the job creates a Release.
 */
export interface Release {
  readonly assets?: Assets;
  /**
     * Specifies the longer description of the Release.
     */
  readonly description: string;
  /**
     * The title of each milestone the release is associated with.
     */
  readonly milestones?: string[];
  /**
     * The Release name. If omitted, it is populated with the value of release: tag_name.
     */
  readonly name?: string;
  /**
     * If the release: tag_name doesn’t exist yet, the release is created from ref. ref can be a
     * commit SHA, another tag name, or a branch name.
     */
  readonly ref?: string;
  /**
     * The date and time when the release is ready. Defaults to the current date and time if not
     * defined. Should be enclosed in quotes and expressed in ISO 8601 format.
     */
  readonly releasedAt?: string;
  /**
     * The tag_name must be specified. It can refer to an existing Git tag or can be specified
     * by the user.
     */
  readonly tagName: string;
}

export interface Assets {
  /**
     * Include asset links in the release.
     */
  readonly links: Link[];
}

export interface Link {
  /**
     * The redirect link to the url.
     */
  readonly filepath?: string;
  /**
     * The content kind of what users can download via url.
     */
  readonly linkType?: LinkType;
  /**
     * The name of the link.
     */
  readonly name: string;
  /**
     * The URL to download a file.
     */
  readonly url: string;
}

/**
 * The content kind of what users can download via url.
 */
export enum LinkType {
  IMAGE = 'image',
  OTHER = 'other',
  PACKAGE = 'package',
  RUNBOOK = 'runbook',
}

/**
 * Environment variable name
 */
export interface Secret {
  readonly vault: VaultConfig | string;
}

export interface VaultConfig {
  readonly engine: Engine;
  readonly field: string;
  readonly path: string;
}

export interface Engine {
  readonly name: string;
  readonly path: string;
}

/**
 * Trigger a multi-project pipeline. Read more:
 * https://docs.gitlab.com/ee/ci/yaml/README.html#simple-trigger-syntax-for-multi-project-pipelines
 *
 * Trigger a child pipeline. Read more:
 * https://docs.gitlab.com/ee/ci/yaml/README.html#trigger-syntax-for-child-pipeline
 */
export interface Trigger {
  /**
     * The branch name that a downstream pipeline will use
     */
  readonly branch?: string;
  /**
     * Path to the project, e.g. `group/project`, or `group/sub-group/project`.
     */
  readonly project?: string;
  /**
     * You can mirror the pipeline status from the triggered pipeline to the source bridge job
     * by using strategy: depend
     */
  readonly strategy?: Strategy;
  readonly include?: IncludeElement[] | string;
}

/**
 * References a local file or an artifact from another job to define the pipeline
 * configuration.
 */
export interface IncludeElement {
  /**
     * Relative path from local repository root (`/`) to the local YAML file to define the
     * pipeline configuration.
     */
  readonly local?: string;
  /**
     * Name of the template YAML file to use in the pipeline configuration.
     */
  readonly template?: string;
  /**
     * Relative path to the generated YAML file which is extracted from the artifacts and used
     * as the configuration for triggering the child pipeline.
     */
  readonly artifact?: string;
  /**
     * Job name which generates the artifact
     */
  readonly job?: string;
  /**
     * Relative path from repository root (`/`) to the pipeline configuration YAML file.
     */
  readonly file?: string;
  /**
     * Path to another private project under the same GitLab instance, like `group/project` or
     * `group/sub-group/project`.
     */
  readonly project?: string;
  /**
     * Branch/Tag/Commit hash for the target project.
     */
  readonly ref?: string;
}

/**
 * You can mirror the pipeline status from the triggered pipeline to the source bridge job
 * by using strategy: depend
 */
export enum Strategy {
  DEPEND = 'depend',
}

export interface VariableConfig {
  /**
     * Explains what the variable is used for, what the acceptable values are.
     */
  readonly description?: string;
  readonly value?: string;
}

export interface Workflow {
  readonly rules?: WorkflowRule[];
}

export interface WorkflowRule {
  readonly changes?: string[];
  readonly exists?: string[];
  readonly if?: string;
  readonly variables?: { [key: string]: number | string };
  readonly when?: WorkflowWhen;
}

export enum WorkflowWhen {
  ALWAYS = 'always',
  NEVER = 'never',
}
