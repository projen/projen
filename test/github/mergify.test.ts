import { LogLevel } from '../../src/logger';
import { NodeProject, NodeProjectOptions } from '../../src/node-project';
import { mkdtemp, synthSnapshot } from '../util';

describe('mergify', () => {
  test('default', () => {
    // GIVEN
    const project = createProject();

    // WHEN
    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot['.mergify.yml']).toBeDefined();
    expect(snapshot['.mergify.yml']).toMatchSnapshot();
  });

  test('with options', () => {
    // GIVEN
    const project = createProject({
      autoMergeOptions: {
        approvedReviews: 3,
        blockingLabels: ['do-not-merge', 'missing-tests'],
      },
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot['.mergify.yml']).toBeDefined();
    expect(snapshot['.mergify.yml']).toContain('- -label~=(do-not-merge|missing-tests)');
    expect(snapshot['.mergify.yml']).toContain('- "#approved-reviews-by>=3"');
    expect(snapshot['.mergify.yml']).toMatchSnapshot();
  });
});

type ProjectOptions = Omit<NodeProjectOptions, 'outdir' | 'defaultReleaseBranch' | 'name'>;
function createProject(options: ProjectOptions = {}): NodeProject {
  return new NodeProject({
    outdir: mkdtemp(),
    defaultReleaseBranch: 'main',
    name: 'node-project',
    logging: {
      level: LogLevel.OFF,
    },
    ...options,
  });
}