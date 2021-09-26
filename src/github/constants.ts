/**
 * Represents the github-actions user.
 *
 * Use this when you need to perform a commit as part of your workflow.
 */
export const GITHUB_ACTIONS_USER = {
  name: 'github-actions',
  email: 'github-actions@github.com',
};

/**
 * Workflow flow to configure git with the github actions identity.
 */
export const GIT_IDENTIFY_WORKFLOW_STEP = {
  name: 'Git Identify',
  run: [
    `git config user.name "${GITHUB_ACTIONS_USER.name}"`,
    `git config user.email "${GITHUB_ACTIONS_USER.email}"`,
  ].join('\n'),
};
