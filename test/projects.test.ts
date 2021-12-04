import { installPackage } from '../src/cli/util';
import { NewProjectOptionHints } from '../src/option-hints';
import { Projects } from '../src/projects';
import { directorySnapshot, withProjectDir } from '../src/util/synth';

describe('createProject', () => {
  test('creates a project in a directory', () => {
    withProjectDir(projectdir => {
      // GIVEN
      Projects.createProject({
        optionHints: NewProjectOptionHints.FEATURED,
        dir: projectdir,
        post: false,
        synth: false,
        projectFqn: 'projen.typescript.TypeScriptProject',
        projectOptions: {
          name: 'test-project',
          defaultReleaseBranch: 'main',
        },
      });

      // THEN
      const snapshot = directorySnapshot(projectdir, {
        excludeGlobs: ['node_modules/**'],
      });
      expect(snapshot['.projenrc.js']).toMatchSnapshot();
    }, { chdir: true });
  });

  test('creates a project and passes in JSON-like project options', () => {
    withProjectDir(projectdir => {
      // GIVEN
      Projects.createProject({
        optionHints: NewProjectOptionHints.FEATURED,
        dir: projectdir,
        post: false,
        synth: false,
        projectFqn: 'projen.typescript.TypeScriptProject',
        projectOptions: {
          name: 'test-project',
          defaultReleaseBranch: 'main',
          eslintOptions: {
            dirs: ['src', 'test'],
            prettier: true,
            aliasMap: {
              '@src': './src',
              '@foo': './src/foo',
            },
          },
        },
      });

      // THEN
      const snapshot = directorySnapshot(projectdir, {
        excludeGlobs: ['node_modules/**'],
      });
      expect(snapshot['.projenrc.js']).toMatchSnapshot();
    }, { chdir: true });
  });

  test('creates a project from an external project type, if it\'s installed', () => {
    withProjectDir(projectdir => {
      // GIVEN
      installPackage(projectdir, '@taimos/projen@0.0.127');

      // WHEN
      Projects.createProject({
        optionHints: NewProjectOptionHints.FEATURED,
        dir: projectdir,
        post: false,
        synth: false,
        projectFqn: '@taimos/projen.TaimosTypescriptLibrary',
        projectOptions: {
          name: 'test-project',
          defaultReleaseBranch: 'main',
        },
      });

      // THEN
      const snapshot = directorySnapshot(projectdir, {
        excludeGlobs: ['node_modules/**'],
      });
      expect(snapshot['.projenrc.js']).toMatchSnapshot();
    }, { chdir: true });
  });
});
