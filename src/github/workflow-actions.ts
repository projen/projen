import { GitIdentity } from '.';
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

  public static setGitIdentity(id: GitIdentity): JobStep[] {
    return [{
      name: 'Set git identity',
      run: [
        `git config user.name "${id.name}"`,
        `git config user.email "${id.email}"`,
      ].join('\n'),
    }];
  }
}

export interface WorkflowActionsCommonOptions {
  /**
   * Condition
   * @default - no condition
   */
  readonly if?: string;
}
