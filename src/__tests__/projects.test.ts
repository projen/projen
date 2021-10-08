import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { NewProjectOptionHints } from '..';
import { installPackage } from '../cli/util';
import { Projects } from '../projects';
import { directorySnapshot } from './util';

let cwd = process.cwd();

beforeEach(() => process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'projen-test-'))));
afterEach(() => process.chdir(cwd));

describe('createProject', () => {
  test('creates a project in a directory', () => {
    // GIVEN
    const dir = process.cwd();

    // WHEN
    Projects.createProject({
      comments: NewProjectOptionHints.FEATURED,
      dir: dir,
      post: true,
      synth: true,
      projectFqn: 'projen.TypeScriptProject',
      params: {
        name: 'test-project',
        defaultReleaseBranch: 'main',
      },
    });

    // THEN
    const snapshot = directorySnapshot(dir, {
      excludeGlobs: ['node_modules/**'],
    });
    expect(snapshot['.projenrc.js']).toMatchSnapshot();
    expect(snapshot['package.json']).toBeDefined();
  });

  test('creates a project from an external project type, if it\'s installed', () => {
    // GIVEN
    const dir = process.cwd();
    installPackage(dir, 'cdk-appsync-project@1.1.3');

    // WHEN
    Projects.createProject({
      comments: NewProjectOptionHints.FEATURED,
      dir: dir,
      post: true,
      synth: true,
      projectFqn: 'cdk-appsync-project.AwsCdkAppSyncApp',
      params: {
        name: 'test-project',
        defaultReleaseBranch: 'main',
        cdkVersion: '1.63.0',
        transformerVersion: '1.77.15',
        devDeps: ['cdk-appsync-project@1.1.3'],
      },
    });

    // THEN
    const snapshot = directorySnapshot(dir, {
      excludeGlobs: ['node_modules/**'],
    });
    expect(snapshot['.projenrc.js']).toMatchSnapshot();
    expect(snapshot['package.json']).toBeDefined();
  });
});
