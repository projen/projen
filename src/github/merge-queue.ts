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
    private readonly options: MergeQueueOptions = {},
  ) {
    super(scope);

    const workflowEngine = gh.GitHub.of(this.project);
    if (!workflowEngine) {
      throw new Error(
        `Cannot add ${
          new.target.name
        } to project without GitHub enabled. Please enable GitHub for this project.`,
      );
    }

    const autoMerge = options.autoQueue ?? true;
    if (autoMerge) {
      // Validate the autoQueue.targetBranches w.r.t. the mergeQueue.targetBranches
      //
      // - mergeQueue.targetBranches: those branches we CAN use merge queues for
      // - autoQueue.targetBranches: those branches we AUTOMATICALLY use merge queues for (subset of former)
      //
      //                                 mergeBranches
      //                       |   undefined   |   defined    |
      //                       |---------------|--------------|
      //  auto       undefined |      ok       |     copy     |
      //  Branches     defined |      ok       |   validate   |
      //                       |---------------|--------------|
      if (options.autoQueueOptions?.targetBranches && options.targetBranches) {
        if (
          !isSubset(
            options.autoQueueOptions?.targetBranches,
            options.targetBranches,
          )
        ) {
          throw new Error(
            `autoQueueOptions.targetBranches (${JSON.stringify(
              options.autoQueueOptions?.targetBranches,
            )} must be a subset of targetBranches (${JSON.stringify(
              options.targetBranches,
            )})`,
          );
        }
      }

      new AutoQueue(this, {
        ...options.autoQueueOptions,
        // Copy over maximal set of merge branches if necessary
        targetBranches:
          options.autoQueueOptions?.targetBranches ?? options.targetBranches,
      });
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

function isSubset(xs: string[], ys: string[]) {
  return xs.every((x) => ys.includes(x));
}
