import { AutoApprove } from '../../github/auto-approve';
import { NodeProject, NodeProjectOptions } from '../../node-project';
import { mkdtemp, synthSnapshot } from '../util';

describe('auto-approve', () => {
  test('default', () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      secret: 'MY_SECRET',
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['.github/workflows/auto-approve.yml']).toBeDefined();
    expect(snapshot['.github/workflows/auto-approve.yml']).toMatchSnapshot();
  });

  test('configure options', () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      secret: 'MY_SECRET',
      label: 'my-approve',
      allowedUsernames: ['bot-1', 'bot-2'],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['.github/workflows/auto-approve.yml']).toMatchSnapshot();
  });

  test('all users', () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      secret: 'MY_SECRET',
      allowedUsernames: [],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['.github/workflows/auto-approve.yml']).toMatchSnapshot();
  });
});

type ProjectOptions = Omit<NodeProjectOptions, 'outdir' | 'defaultReleaseBranch' | 'name'>;
function createProject(options: ProjectOptions = {}): NodeProject {
  return new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: 'main',
    name: 'node-project',
    ...options,
  });
}