import { AutoApprove } from '../../../github';
import { Project, ProjectOptions } from '../../../project';
import { synthSnapshot, TestProject } from '../../util';

test('default options', () => {

  const project = createProject({ projenSecret: 'PROJEN_SECRET' });
  new AutoApprove(project);

  const snapshot = synthSnapshot(project);
  expect(snapshot['.github/workflows/auto-approve.yml']).toBeDefined();
  expect(snapshot['.github/workflows/auto-approve.yml']).toMatchSnapshot();

});

test('custom options', () => {

  const project = createProject({
    projenSecret: 'PROJEN_SECRET',
  });
  new AutoApprove(project, {
    label: 'custom-auto-approve',
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot['.github/workflows/auto-approve.yml']).toBeDefined();
  expect(snapshot['.github/workflows/auto-approve.yml']).toMatchSnapshot();

});

function createProject(options: Omit<ProjectOptions, 'autoApprove' | 'name'> = {}): Project {
  return new TestProject({

    // quirky, but we do this because we test it directly via the
    // AutoApprove class.
    autoApprove: false,

    ...options,
  });
}