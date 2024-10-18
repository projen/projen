import { IConstruct } from "constructs";
import { AutoQueue, AutoQueueOptions } from "./auto-queue";
import { Component } from "../component";
import { MergeGroupOptions } from "./workflows-model";
import * as gh from "../github";
import { GitHub } from "../github";

/**
 * Options for 'MergeQueue'
 */
export interface MergeQueueOptions {
  /**
   * Should pull requests be queued automatically to be merged once they pass required checks
   * @default true
   */
  readonly autoQueue?: boolean;

  /**
   * Configure auto-queue pull requests
   * @default - see AutoQueueOptions
   */
  readonly autoQueueOptions?: AutoQueueOptions;

  /**
   * The branches that can be merged into using MergeQueue
   *
   * @default - all branches
   */
  readonly targetBranches?: string[];
}

/**
 * Merge pull requests using a merge queue
 */
export class MergeQueue extends Component {
  constructor(
    scope: IConstruct,
    private readonly options: MergeQueueOptions = {}
  ) {
    super(scope);

    const workflowEngine = gh.GitHub.of(this.project);
    if (!workflowEngine) {
      throw new Error(
        `Cannot add ${
          new.target.name
        } to project without GitHub enabled. Please enable GitHub for this project.`
      );
    }

    const autoMerge = options.autoQueue ?? true;
    if (autoMerge) {
      new AutoQueue(this, options.autoQueueOptions);
    }
  }

  preSynthesize() {
    const targetBranches = this.options.targetBranches;
    const mergeGroup: MergeGroupOptions = targetBranches
      ? {
          branches: targetBranches,
        }
      : {};

    const workflowEngine = GitHub.of(this.project);
    workflowEngine?.tryFindWorkflow("build")?.on({
      mergeGroup,
    });
  }
}
