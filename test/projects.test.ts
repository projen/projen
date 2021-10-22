import { NewProjectOptionHints } from '../src/option-hints';
import { Projects } from '../src/projects';
import { directorySnapshot } from '../src/util/synth';

describe('createProject', () => {
  test('creates a project in a directory', () => {
    // GIVEN
    const outdir = process.cwd();
    Projects.createProject({
      optionHints: NewProjectOptionHints.FEATURED,
      dir: outdir,
      post: false,
      synth: false,
      projectFqn: 'projen.TypeScriptProject',
      projectOptions: {
        name: 'test-project',
        defaultReleaseBranch: 'main',
      },
    });

    // THEN
    const snapshot = directorySnapshot(outdir, {
      excludeGlobs: ['node_modules/**'],
    });
    expect(snapshot['.projenrc.js']).toMatchSnapshot();
  });

  // test('creates a project and passes in JSON-like project options', () => {
  //   withProjectDir(projectdir => {
  //     // GIVEN
  //     process.chdir(projectdir);

  //     // WHEN
  //     Projects.createProject({
  //       optionHints: NewProjectOptionHints.FEATURED,
  //       dir: projectdir,
  //       post: false,
  //       synth: false,
  //       projectFqn: 'projen.TypeScriptProject',
  //       projectOptions: {
  //         name: 'test-project',
  //         defaultReleaseBranch: 'main',
  //         eslintOptions: {
  //           dirs: ['src', 'test'],
  //           prettier: true,
  //           aliasMap: {
  //             '@src': './src',
  //             '@foo': './src/foo',
  //           },
  //         },
  //       },
  //     });

  //     // THEN
  //     const snapshot = directorySnapshot(projectdir, {
  //       excludeGlobs: ['node_modules/**'],
  //     });
  //     expect(snapshot['.projenrc.js']).toMatchSnapshot();
  //   });
  // });

  // test('creates a project from an external project type, if it\'s installed', () => {
  //   withProjectDir(projectdir => {
  //     // GIVEN
  //     process.chdir(projectdir);
  //     installPackage(projectdir, 'cdk-appsync-project@1.1.3');

  //     // WHEN
  //     Projects.createProject({
  //       optionHints: NewProjectOptionHints.FEATURED,
  //       dir: projectdir,
  //       post: false,
  //       synth: false,
  //       projectFqn: 'cdk-appsync-project.AwsCdkAppSyncApp',
  //       projectOptions: {
  //         name: 'test-project',
  //         defaultReleaseBranch: 'main',
  //         cdkVersion: '1.63.0',
  //         transformerVersion: '1.77.15',
  //         devDeps: ['cdk-appsync-project@1.1.3'],
  //       },
  //     });

  //     // THEN
  //     const snapshot = directorySnapshot(projectdir, {
  //       excludeGlobs: ['node_modules/**'],
  //     });
  //     expect(snapshot['.projenrc.js']).toMatchSnapshot();
  //   });
  // });
});
