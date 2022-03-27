import { Component } from "../component";
import { Project } from "../project";
import { YamlFile } from "../yaml";
import { WorkflowJob, Workflow, Job } from "./model";

/**
 * Options for class {@link Circleci}
 *
 * @see https://circleci.com/docs/2.0/configuration-reference/
 */
export interface CircleCiProps {
  /**
   * Contains a map of CirclCi Orbs
   * ```json
   * orbs: {
   *  node: "circleci/node@5.0.1"
   *  slack: "circleci/slack@4.8.3"
   * }
   * ```
   */
  readonly orbs?: Record<string, string>;
  /**
   * enable the generation of Circleci config file
   * @default enabled
   */
  readonly enabled?: boolean;
  /**
   * pipeline version
   *
   * @default 2.1
   * @see https://circleci.com/docs/2.0/configuration-reference/#version
   */
  readonly version?: number;
  /**
   * List of Workflows of pipeline, e.g.
   * ```json
   * workflows: {
   *   {
   *     identifier: "build",
   *       jobs: [{
   *          identifier: "node/install",
   *          context: ["npm"],
   *       }]
   *   }
   * }
   * ```
   *
   * @see https://circleci.com/docs/2.0/configuration-reference/#workflows
   */
  readonly workflows?: Workflow[];
  /**
   * List of Jobs to create unique steps per pipeline, e.g.
   * ```json
   * jobs: [{
   *  identifier: "compile",
   *  docker: { image: "golang:alpine" }
   *  steps: ["checkout", run: {command: "go build ."}]
   * }]
   * ```
   *
   * @see https://circleci.com/docs/2.0/configuration-reference/#jobs
   */
  readonly jobs?: Job[];
  /**
   * The setup field enables you to conditionally trigger configurations from outside
   * the primary .circleci parent directory, update pipeline parameters, or generate customized configurations.
   *
   * @see https://circleci.com/docs/2.0/configuration-reference/#setup
   */
  readonly setup?: boolean;
}

/**
 * Circleci Class to manage `.circleci/config.yml`.
 * Check test `circleci.test.ts` for more usage examples
 *
 * @see https://circleci.com/docs/2.0/configuration-reference/
 */
export class Circleci extends Component {
  /**
   * The yaml file for the Circleci pipeline
   * */
  public readonly file: YamlFile | undefined;
  /**
   * internal copy of options to share options between functions
   * @private
   */
  private options: CircleCiProps;
  /**
   * internal map of orbs
   * @private
   */
  private readonly orbs: Record<string, string>;
  /**
   * internal list of workflows
   * @private
   */
  private workflows: Workflow[];
  /**
   * internal list of jobs
   * @private
   */
  private readonly jobs: Job[];

  /**
   * create a Circleci Component within project
   * @param project
   * @param options
   */
  constructor(project: Project, options: CircleCiProps = {}) {
    super(project);
    this.options = options;
    this.orbs = options.orbs ?? {};
    this.workflows = options.workflows ?? [];
    this.jobs = options.jobs ?? [];
    const circleCiEnabled = options.enabled || true;
    if (circleCiEnabled) {
      this.file = new YamlFile(project, ".circleci/config.yml", {
        obj: () => this.renderCircleCi(),
      });
    }
  }

  /**
   * function to prepare the rendering of the yaml file.
   * Objects with dynamic keys like workflows and jobs required the field `identifier` to be set.
   * Those object will be reduced by `identifier` field before rendering
   * @private
   */
  private renderCircleCi() {
    // render dynamic keys for workflow
    const workflowRecords: Record<string, any> = {};
    for (const workflow of this.workflows) {
      const { identifier, ...reduced } = workflow;
      reduced.jobs = this.renderJobs(workflow.jobs);
      workflowRecords[identifier] = reduced;
    }

    // render dynamic keys for jobs
    const jobRecords: Record<string, any> = {};
    for (const job of this.jobs) {
      const { identifier, ...reduced } = job;
      jobRecords[identifier] = reduced;
    }

    return {
      version: this.options.version || 2.1,
      setup: this.options.setup,
      orbs: this.orbs,
      jobs: Object.keys(jobRecords).length > 0 ? jobRecords : undefined,
      workflows: workflowRecords,
    };
  }

  /**
   * add new workflow to existing pipeline
   * @param workflow
   */
  public addWorkflow(workflow: Workflow) {
    this.workflows = [...this.workflows, workflow];
  }

  /**
   * reduce objects with `identifier` field
   * @param jobs
   */
  private renderJobs = (jobs: WorkflowJob[] = []): any => {
    let result: any = [];
    for (const job of jobs ?? []) {
      const { identifier, ...reduced } = job;
      result = [...result, { [identifier]: reduced }];
    }
    return result;
  };

  /**
   * Add a Circleci Orb to pipeline. Will throw error if the orb already exists
   * @param name
   * @param orb
   */
  public addOrb(name: string, orb: string) {
    if (this.orbs[name] !== undefined) {
      throw new Error(`Circleci Config already contains an orb named ${name}.`);
    }
    this.orbs[name] = orb;
  }
}
