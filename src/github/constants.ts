import { GitIdentity } from ".";

/**
 * Name of the artifact produced by the build job. Its contains the entire
 * working directory.
 */
export const BUILD_ARTIFACT_NAME = "build-artifact";

/**
 * Represents the `github-actions[bot]` user.
 *
 * Use this when you need to perform a commit as part of your workflow.
 */
export const DEFAULT_GITHUB_ACTIONS_USER: GitIdentity = {
  // https://github.com/actions/checkout/blob/08c6903cd8c0fde910a37f88322edcfb5dd907a8/README.md#push-a-commit-using-the-built-in-token
  name: "github-actions[bot]",
  email: "41898282+github-actions[bot]@users.noreply.github.com",
};

/**
 * Name of the permission back up file to include in the build artifact
 * to work around a GitHub Action bug that does not preserve file mode
 * permissions across upload and download actions.
 *
 * See {@link https://github.com/actions/upload-artifact/issues/38}
 */
export const PERMISSION_BACKUP_FILE = "permissions-backup.acl";
