import { GithubWorkflow } from '../../src/github/workflows';
import { synthSnapshot, TestProject } from '../../src/util/synth';

describe('github-workflow', () => {
  const workflowName = 'test-workflow';

  test('Default concurrency allowed', () => {
    const project = new TestProject();

    new GithubWorkflow (project.github!, workflowName);

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).not.toContain('concurrency');
  });

  test('concurrency set', () => {
    const concurrencyName = 'my-concurrency';
    const project = new TestProject();

    new GithubWorkflow (project.github!, workflowName, { concurrency: concurrencyName });

    const snapshot = synthSnapshot(project);

    expect(snapshot[`.github/workflows/${workflowName}.yml`]).toContain(`concurrency: ${concurrencyName}`);
  });
});
