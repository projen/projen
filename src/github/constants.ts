import { GitIdentity } from '.';
import * as workflow from './workflows-model';

/**
 * Represents the github-actions user.
 *
 * Use this when you need to perform a commit as part of your workflow.
 */
export const DEFAULT_GITHUB_ACTIONS_USER: GitIdentity = {
  name: 'github-actions',
  email: 'github-actions@github.com',
};

/**
 * Workflow flow to configure git with the github actions identity.
 */
export function setGitIdentityStep(id: GitIdentity): workflow.JobStep {
  return {
    name: 'Set git identity',
    run: [
      `git config user.name "${id.name}"`,
      `git config user.email "${id.email}"`,
    ].join('\n'),
  };
};
