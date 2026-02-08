import { WorkflowJob, Workflow, Job } from "./model";
import { Component } from "../component";
import { Project } from "../project";
import { snakeCaseKeys } from "../util";
import { YamlFile } from "../yaml";

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
 * Check projen's docs for more information.
 *
 * @see https://circleci.com/docs/2.0/configuration-reference/
 */
export class Circleci extends Component {
  /**
   * The yaml file for the Circleci pipeline
   * */
  public readonly file: YamlFile;
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

  constructor(project: Project, options: CircleCiProps = {}) {
    super(project);
    this.options = options;
    this.orbs = options.orbs ?? {};
    this.workflows = options.workflows ?? [];
    this.jobs = options.jobs ?? [];
    this.file = new YamlFile(project, ".circleci/config.yml", {
      obj: () => this.renderCircleCi(),
    });
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
      workflowRecords[identifier] = this.snakeCase(reduced);
    }

    // render dynamic keys for jobs
    const jobRecords: Record<string, any> = {};
    for (const job of this.jobs) {
      const { identifier, ...reduced } = job;
      jobRecords[identifier] = this.snakeCase(reduced);
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
   * reduce objects with `identifier` field for WorkflowJobs.
   * A workflow job can contain `orbParameter` which are passed to orbs.
   * This map is directly added as `Record<string,any>` to job.
   * So we gonna add those after the default field of WorkflowJob.
   * @see https://circleci.com/developer/orbs/orb/circleci/node#usage-install_nodejs
   * @param jobs
   */
  private renderJobs = (jobs: WorkflowJob[] = []): any => {
    let result: any = [];
    for (const job of jobs ?? []) {
      const { identifier, orbParameters, ...reduced } = job;
      if (isObjectContainingFieldExactly(job, "identifier")) {
        result = [...result, identifier];
      } else {
        result = [
          ...result,
          { [identifier]: { ...reduced, ...orbParameters } },
        ];
      }
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

  /**
   * Snake case for listed keys. There are too many exceptions needed to do it recursive without a whitelist.
   * This list needs to be updated once we add field with snake case like `aws_auth`.
   * @param input
   */
  private snakeCase = (input: any): any => {
    const snakeCaseKeyWords = [
      "awsAuth",
      "workingDirectory",
      "resourceClass",
      "dockerLayerCaching",
      "noOutputTimeout",
      "circleciIpRanges",
    ];
    return snakeCaseKeys(input, true, snakeCaseKeyWords);
  };
}

export const isObjectContainingFieldExactly = (
  obj: any,
  field: string,
): boolean => {
  return Object.keys(obj).length == 1 && Object.keys(obj).includes(field);
};
