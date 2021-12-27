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
    const repo = options.repo ?? '${{ github.repository }}';
    const ref = options.ref ?? '$(git rev-parse HEAD)';
    return this.githubRequest({
      name: `Trigger ${options.workflowId} workflow`,
      url: `repos/${repo}/actions/workflows/${options.workflowId}/dispatches`,
      body: { ref },
      ...options,
    });
  }

  /**
   * Sends an authenticated HTTP request to the GitHub API.
   * @param options Request options
   * @returns Job steps
   */
  public static githubRequest(options: GitHubRequestOptions): JobStep[] {
    const githubTokenSecret = options.githubTokenSecret ?? 'GITHUB_TOKEN';
    const method = options.method ?? 'POST';
    const url = options.url;
    const curl = [
      'curl',
      '-i',
      '--fail',
      `-X ${method}`,
      '-H "Accept: application/vnd.github.v3+json"',
      '-H "Authorization: token ${GITHUB_TOKEN}"',
    ];

    if (options.body) {
      // outer JSON.stringify is for escaping
      curl.push(`--data ${JSON.stringify(JSON.stringify(options.body))}`);
    }

    curl.push(`https://api.github.com/${url}`);

    return [
      {
        name: options.name,
        if: options.if,
        env: {
          GITHUB_TOKEN: `\${{ secrets.${githubTokenSecret} }}`,
        },
        run: curl.join(' '),
      },
    ];
  }
}

export interface GitHubRequestCommonOptions {
  /**
   * The github token secret to use.
   *
   * @default "GITHUB_TOKEN"
   */
  readonly githubTokenSecret?: string;

  /**
   * Condition
   * @default - no condition
   */
  readonly if?: string;
}

export interface GitHubRequestOptions extends GitHubRequestCommonOptions {
  /**
   * The url (without http://api.github.com)
   */
  readonly url: string;
  /**
   * The step name.
   * @default - no name
   */
  readonly name?: string;

  /**
   * HTTP method.
   * @default "POST"
   */
  readonly method?: string;

  /**
   * Request JSON body.
   * @default - no data is sent
   */
  readonly body?: any;
}

export interface DispatchWorkflowOptions extends GitHubRequestCommonOptions {

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
   * The file name of the workflow to dispatch (e.g. `build.yml`).
   */
  readonly workflowId: string;
}