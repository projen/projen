import { AutoMerge, Mergify } from '../../github';
import { LogLevel } from '../../logger';
import { NodeProject, NodeProjectOptions } from '../../node-project';
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

  describe('manually enabled with auto-merge', () => {
    test('default', () => {
      // GIVEN
      const project = createProject({ mergify: false });

      // WHEN
      const mergify = new Mergify(project.github!);
      new AutoMerge(project, { mergify: mergify });

      // THEN
      const snapshot = synthSnapshot(project);
      expect(snapshot['.mergify.yml']).toBeDefined();
      expect(snapshot['.mergify.yml']).toMatchSnapshot();
    });

    test('with options', () => {
      // GIVEN
      const project = createProject({ mergify: false });

      // WHEN
      const mergify = new Mergify(project.github!);
      new AutoMerge(project, {
        mergify: mergify,
        withoutLabels: ['do-not-merge', 'missing-tests'],
        approvedReviews: 3,
      });

      // THEN
      const snapshot = synthSnapshot(project);
      expect(snapshot['.mergify.yml']).toBeDefined();
      expect(snapshot['.mergify.yml']).toContain('- -label~=(do-not-merge|missing-tests)');
      expect(snapshot['.mergify.yml']).toContain('- "#approved-reviews-by>=3"');
      expect(snapshot['.mergify.yml']).toMatchSnapshot();
    });
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