import { Dependabot } from '../../github';
import { NodeProject, NodeProjectOptions } from '../../node-project';
import { mkdtemp, synthSnapshot } from '../util';

describe('dependabot', () => {
  test('default', () => {
    const project = createProject();

    new Dependabot(project.github!);

    const snapshot = synthSnapshot(project);
    expect(snapshot['.github/dependabot.yml']).toBeDefined();
    expect(snapshot['.github/dependabot.yml']).toMatchSnapshot();
  });

  test('private registries', () => {
    const project = createProject();

    const registryName = 'npm-registry-npm-pkg-github-com';

    new Dependabot(project.github!, {
      registries: {
        [registryName]: {
          type: 'npm-registry',
          url: 'https://npm.pkg.github.com',
          token: '${{ secrets.TOKEN }}',
        },
      },
    });

    const snapshot = synthSnapshot(project);
    const dependabot = snapshot['.github/dependabot.yml'];
    expect(dependabot).toBeDefined();
    expect(dependabot).toMatchSnapshot();
    expect(dependabot).toContain('registries');
    expect(dependabot).toContain(registryName);
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