import { JobStep } from './workflows-model';

/**
 * A set of utility functions for creating GitHub actions in workflows.
 */
export class WorkflowActions {
  /**
   * Dispatches a GitHub workflow.
   *
   * @param options
   * @returns A set of JobSteps
   */
  public static dispatchWorkflow(options: DispatchWorkflowOptions): JobStep[] {
    const githubTokenSecret = options.githubTokenSecret ?? 'GITHUB_TOKEN';
    const repo = options.repo ?? '${{ github.repository }}';
    const ref = options.ref ?? '$(git rev-parse HEAD)';

    return [
      {
        name: `Trigger ${options.workflowId} workflow`,
        if: options.if,
        env: {
          GITHUB_TOKEN: `\${{ secrets.${githubTokenSecret} }}`,
        },
        run: [
          'curl',
          '-i',
          '--fail',
          '-X POST',
          '-H "Accept: application/vnd.github.v3+json"',
          '-H "Authorization: token ${GITHUB_TOKEN}"',
          `--data ${JSON.stringify(JSON.stringify({ ref }))}`, // outer JSON.stringify is for escaping
          `https://api.github.com/repos/${repo}/actions/workflows/${options.workflowId}/dispatches`,
        ].join(' '),
      },
    ];
  }
}

export interface DispatchWorkflowOptions {
  /**
   * The github token secret to use.
   *
   * @default "GITHUB_TOKEN"
   */
  readonly githubTokenSecret?: string;

  /**
   * The repository to use.
   * @default "${{ github.repository }}"
   */
  readonly repo?: string;

  /**
   * The git ref to start the workflow from.
   *
   * Defaults to the last commit in the checked out repository (requires that a repository is checked out).
   *
   * @default "$(git rev-parse HEAD)"
   */
  readonly ref?: string;

  /**
   * Condition
   * @default - no condition
   */
  readonly if?: string;

  /**
   * The file name of the workflow to dispatch (e.g. `build.yml`).
   */
  readonly workflowId: string;
}