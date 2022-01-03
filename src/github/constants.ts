import { GitIdentity } from ".";

/**
 * Name of the artifact produced by the build job. Its contains the entire
 * working directory.
 */
export const BUILD_ARTIFACT_NAME = "build-artifact";

/**
 * Represents the github-actions user.
 *
 * Use this when you need to perform a commit as part of your workflow.
 */
export const DEFAULT_GITHUB_ACTIONS_USER: GitIdentity = {
  name: "github-actions",
  email: "github-actions@github.com",
};
