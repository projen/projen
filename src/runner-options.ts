export interface GroupRunnerOptions {
  readonly group: string;
  readonly labels?: string[];
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
