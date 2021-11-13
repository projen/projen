import { SemanticPullRequest } from '../../src/github/semantic-pr';
import { NodeProject, NodeProjectOptions } from '../../src/node-project';
import { synthSnapshot } from '../../src/util/synth';

describe('semantic PR', () => {
  test('default', () => {
    const project = createProject();

    new SemanticPullRequest(project.github!);

    const snapshot = synthSnapshot(project);

    expect(snapshot['.github/workflows/semantic-pr.yml']).toBeDefined();
    expect(snapshot['.github/workflows/semantic-pr.yml']).toMatchSnapshot();
  });

  test('configure scopes', () => {
    const project = createProject();

    new SemanticPullRequest(project.github!, {
      types: ['feat', 'fix'],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['.github/workflows/semantic-pr.yml']).toMatchSnapshot();
  });

  test('require scope', () => {
    const project = createProject();

    new SemanticPullRequest(project.github!, {
      requireScope: true,
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['.github/workflows/semantic-pr.yml']).toMatchSnapshot();
  });
});

type ProjectOptions = Omit<NodeProjectOptions, 'outdir' | 'defaultReleaseBranch' | 'name'>;
function createProject(options: ProjectOptions = {}): NodeProject {
  return new NodeProject({
    defaultReleaseBranch: 'main',
    name: 'node-project',
    semanticPr: false,
    ...options,
  });
}