import { IConstruct } from "constructs";
import { AutoQueue, AutoQueueOptions } from "./auto-queue";
import { MergeGroupOptions } from "./workflows-model";
import { github as gh } from "..";
import { Component } from "../component";

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
  constructor(scope: IConstruct, options: MergeQueueOptions = {}) {
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

    const mergeGroup: MergeGroupOptions = options.targetBranches
      ? {
          branches: options.targetBranches,
        }
      : {};

    workflowEngine.tryFindWorkflow("build")?.on({
      mergeGroup,
    });
  }
}
