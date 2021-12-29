import { JobStep } from './workflows-model';

const GIT_PATCH_FILE = '.upgrade.tmp.patch';
const RUNNER_TEMP = '${{ runner.temp }}';

/**
 * A set of utility functions for creating GitHub actions in workflows.
 */
export class WorkflowActions {

  public static createUploadGitPatch(options: WorkflowActionsCommonOptions = {}): JobStep[] {
    return [
      {
        if: options.if,
        name: 'Create Patch',
        run: [
          'git add .',
          `git diff --patch --staged > ${GIT_PATCH_FILE}`,
        ].join('\n'),
      },
      {
        if: options.if,
        name: 'Upload patch',
        uses: 'actions/upload-artifact@v2',
        with: { name: GIT_PATCH_FILE, path: GIT_PATCH_FILE },
      },
    ];
  }

  public static downloadApplyGitPatch(options: WorkflowActionsCommonOptions = {}): JobStep[] {
    return [
      {
        if: options.if,
        name: 'Download patch',
        uses: 'actions/download-artifact@v2',
        with: { name: GIT_PATCH_FILE, path: RUNNER_TEMP },
      },
      {
        if: options.if,
        name: 'Apply patch',
        run: `[ -s ${RUNNER_TEMP}/${GIT_PATCH_FILE} ] && git apply ${RUNNER_TEMP}/${GIT_PATCH_FILE} || echo "Empty patch. Skipping."`,
      },
    ];
  }

  // /**
  //  * Dispatches a GitHub workflow.
  //  *
  //  * @param options
  //  * @returns A set of JobSteps
  //  */
  // public static dispatchWorkflow(options: DispatchWorkflowOptions): JobStep[] {
  //   const repo = options.repo ?? '${{ github.repository }}';
  //   const ref = options.ref ?? '$GITHUB_REF_NAME';
  //   return this.githubRequest({
  //     name: `Trigger ${options.workflowId} workflow`,
  //     url: `repos/${repo}/actions/workflows/${options.workflowId}/dispatches`,
  //     body: { ref },
  //     ...options,
  //   });
  // }

  // /**
  //  * Sends an authenticated HTTP request to the GitHub API.
  //  * @param options Request options
  //  * @returns Job steps
  //  */
  // public static githubRequest(options: GitHubRequestOptions): JobStep[] {
  //   const githubTokenSecret = options.githubTokenSecret;
  //   const method = options.method ?? 'POST';
  //   const url = options.url;
  //   const curl = [
  //     'curl',
  //     '-i',
  //     '--fail',
  //     `-X ${method}`,
  //     '-H "Accept: application/vnd.github.v3+json"',
  //     '-H "Authorization: token ${GITHUB_TOKEN}"',
  //   ];

  //   if (options.body) {
  //     // outer JSON.stringify is for escaping
  //     curl.push(`--data ${JSON.stringify(JSON.stringify(options.body))}`);
  //   }

  //   curl.push(`https://api.github.com/${url}`);

  //   return [
  //     {
  //       name: options.name,
  //       if: options.if,
  //       env: {
  //         GITHUB_TOKEN: `\${{ secrets.${githubTokenSecret} }}`,
  //       },
  //       run: curl.join(' '),
  //     },
  //   ];
  // }
}

export interface WorkflowActionsCommonOptions {
  // /**
  //  * The github token secret to use.
  //  */
  // readonly githubTokenSecret: string;

  /**
   * Condition
   * @default - no condition
   */
  readonly if?: string;
}

// export interface GitHubRequestOptions extends GitHubRequestCommonOptions {
//   /**
//    * The url (without http://api.github.com)
//    */
//   readonly url: string;
//   /**
//    * The step name.
//    * @default - no name
//    */
//   readonly name?: string;

//   /**
//    * HTTP method.
//    * @default "POST"
//    */
//   readonly method?: string;

//   /**
//    * Request JSON body.
//    * @default - no data is sent
//    */
//   readonly body?: any;
// }

// export interface DispatchWorkflowOptions extends GitHubRequestCommonOptions {

//   /**
//    * The repository to use.
//    * @default "${{ github.repository }}"
//    */
//   readonly repo?: string;

//   /**
//    * The git ref to start the workflow from.
//    *
//    * Defaults to the last commit in the checked out repository (requires that a repository is checked out).
//    *
//    * @default "$GITHUB_REF_NAME"
//    */
//   readonly ref?: string;

//   /**
//    * The file name of the workflow to dispatch (e.g. `build.yml`).
//    */
//   readonly workflowId: string;
// }