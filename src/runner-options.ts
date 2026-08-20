export interface GroupRunnerOptions {
  readonly group: string;
  readonly labels?: string[];
}

/**
 * Options for selecting the GitHub Runner that a job runs on.
 */
export interface RunsOnOptions {
  /**
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   * @description Defines a target Runner by labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly runsOn?: string[];

  /**
   * Github Runner Group selection options
   * @description Defines a target Runner Group by name and/or labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly runsOnGroup?: GroupRunnerOptions;
}

/**
 * Resolved `runsOn`/`runsOnGroup` config for a job. Exactly one of the two
 * fields is set.
 */
export interface RunsOnConfig {
  /**
   * Github Runner selection labels.
   * @default - not set if `runsOnGroup` is used
   */
  readonly runsOn?: string[];

  /**
   * Github Runner Group selection options.
   * @default - not set if `runsOn` is used
   */
  readonly runsOnGroup?: GroupRunnerOptions;
}

export function filteredRunsOnOptions(
  runsOn?: string[],
  runsOnGroup?: GroupRunnerOptions,
): { runsOnGroup: GroupRunnerOptions } | { runsOn: string[] } {
  verifyJobConstraints(runsOn, runsOnGroup);

  return runsOnGroup
    ? { runsOnGroup: runsOnGroup }
    : runsOn
      ? { runsOn: runsOn }
      : { runsOn: ["ubuntu-latest"] };
}

export function filteredWorkflowRunsOnOptions(
  workflowRunsOn?: string[],
  workflowRunsOnGroup?: GroupRunnerOptions,
):
  | { workflowRunsOnGroup: GroupRunnerOptions }
  | { workflowRunsOn: string[] }
  | string[] {
  verifyJobConstraints(workflowRunsOn, workflowRunsOnGroup);

  return workflowRunsOnGroup
    ? { workflowRunsOnGroup: workflowRunsOnGroup }
    : workflowRunsOn
      ? { workflowRunsOn: workflowRunsOn }
      : { workflowRunsOn: ["ubuntu-latest"] };
}

function verifyJobConstraints(
  runsOn?: string[],
  runsOnGroup?: GroupRunnerOptions,
): void {
  if (runsOn && runsOnGroup) {
    throw new Error("Cannot specify both `workflowRunsOn` and `runsOn`");
  }
}
