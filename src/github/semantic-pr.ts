import { GitHub } from '.';
import { Component } from '../component';
import { Job, JobPermission } from './workflows-model';

/**
 * Options for SemanticPullRequest
 */
export interface SemanticPullRequestOptions {
  /**
   * Configure a list of commit types that are allowed.
   * @default ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert", "release"]
   */
  readonly types?: string[];

  /**
   * Configure that a scope must always be provided.
   * e.g. feat(ui), fix(core)
   * @default false
   */
  readonly requireScope?: boolean;
}

/**
 * Requires pull requests to follow Conventional Commits.
 * @see https://www.conventionalcommits.org/
 */
export class SemanticPullRequest extends Component {
  constructor(github: GitHub, options: SemanticPullRequestOptions = {}) {
    super(github.project);

    const types = options.types ?? [
      'feat',
      'fix',
      'docs',
      'style',
      'refactor',
      'perf',
      'test',
      'build',
      'ci',
      'chore',
      'revert',
      'release',
    ];

    const validateJob: Job = {
      name: 'Validate PR title',
      runsOn: 'ubuntu-latest',
      permissions: {
        pullRequests: JobPermission.WRITE,
      },
      steps: [
        {
          uses: 'amannn/action-semantic-pull-request@v3.4.6',
          env: {
            GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
          },
          with: {
            types: types.join('\n'),
            requireScope: options.requireScope ?? false,
          },
        },
      ],
    };

    const workflow = github.addWorkflow('semantic-pr');
    workflow.on({
      pullRequestTarget: {
        types: ['labeled', 'opened', 'synchronize', 'reopened', 'ready_for_review', 'edited'],
      },
    });
    workflow.addJobs({ validate: validateJob });
  }
}
