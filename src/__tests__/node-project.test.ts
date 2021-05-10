import * as yaml from 'yaml';
import { NodeProject, NodeProjectOptions, LogLevel, DependenciesUpgrade } from '..';
import { DependencyType } from '../deps';
import { AutoUpgradeDependencies, Dependabot } from '../github';
import * as logging from '../logging';
import { NodePackage, NpmAccess } from '../node-package';
import { Project } from '../project';
import { mkdtemp, synthSnapshot, TestProject } from './util';

logging.disable();

describe('dependencies upgrade', () => {

  test('defaults to github actions when a projen secret is defined', () => {

    const project = new TestNodeProject({
      projenSecret: 'PROJEN_SECRET',
    });

    expect(project.components.filter(c => c instanceof AutoUpgradeDependencies).length).toEqual(1);

  });

  test('default to dependabot when a projen secret is undefined', () => {

    const project = new TestNodeProject({});
    expect(project.components.filter(c => c instanceof Dependabot).length).toEqual(1);

  });

  test('can be disabled', () => {

    const project = new TestNodeProject({
      dependenciesUpgrade: DependenciesUpgrade.DISABLED,
    });

    expect(project.components.filter(c => c instanceof Dependabot).length).toEqual(0);
    expect(project.components.filter(c => c instanceof AutoUpgradeDependencies).length).toEqual(0);

  });

});

test('license file is added by default', () => {
  // WHEN
  const project = new TestNodeProject();

  // THEN
  expect(synthSnapshot(project).LICENSE).toContain('Apache License');
});

test('license file is not added if licensed is false', () => {
  // WHEN
  const project = new TestNodeProject({
    licensed: false,
  });

  // THEN
  const snapshot = synthSnapshot(project);
  expect(snapshot.LICENSE).toBeUndefined();
  expect(snapshot['.gitignore']).not.toContain('LICENSE');
  expect(snapshot['package.json'].license).toEqual('UNLICENSED');
});

describe('deps', () => {

  test('runtime deps', () => {
    // GIVEN
    const project = new TestNodeProject({
      deps: [
        'aaa@^1.2.3',
        'bbb@~4.5.6',
      ],
    });

    // WHEN
    project.addDeps('ccc');
    project.deps.addDependency('ddd', DependencyType.RUNTIME);

    // THEN
    const pkgjson = packageJson(project);
    expect(pkgjson.dependencies).toStrictEqual({
      aaa: '^1.2.3',
      bbb: '~4.5.6',
      ccc: '*',
      ddd: '*',
    });
    expect(pkgjson.peerDependencies).toStrictEqual({});
  });

  test('dev dependencies', () => {
    // GIVEN
    const project = new TestNodeProject({
      devDeps: [
        'aaa@^1.2.3',
        'bbb@~4.5.6',
      ],
    });

    // WHEN
    project.addDevDeps('ccc');
    project.deps.addDependency('ddd', DependencyType.TEST);
    project.deps.addDependency('eee@^1', DependencyType.DEVENV);
    project.deps.addDependency('fff@^2', DependencyType.BUILD);

    // THEN
    const pkgjson = packageJson(project);
    expect(pkgjson.devDependencies.aaa).toStrictEqual('^1.2.3');
    expect(pkgjson.devDependencies.bbb).toStrictEqual('~4.5.6');
    expect(pkgjson.devDependencies.ccc).toStrictEqual('*');
    expect(pkgjson.devDependencies.ddd).toStrictEqual('*');
    expect(pkgjson.devDependencies.eee).toStrictEqual('^1');
    expect(pkgjson.devDependencies.fff).toStrictEqual('^2');
    expect(pkgjson.peerDependencies).toStrictEqual({});
    expect(pkgjson.dependencieds).toBeUndefined();
  });

  test('peerDependencies', () => {
    // GIVEN
    const project = new TestNodeProject({
      peerDeps: [
        'aaa@^1.2.3',
        'bbb@~4.5.6',
      ],
    });

    // WHEN
    project.addPeerDeps('ccc');
    project.deps.addDependency('ddd', DependencyType.PEER);

    // THEN
    const pkgjson = packageJson(project);
    expect(pkgjson.peerDependencies).toStrictEqual({
      aaa: '^1.2.3',
      bbb: '~4.5.6',
      ccc: '*',
      ddd: '*',
    });

    // devDependencies are added with pinned versions
    expect(pkgjson.devDependencies.aaa).toStrictEqual('1.2.3');
    expect(pkgjson.devDependencies.bbb).toStrictEqual('4.5.6');
    expect(pkgjson.devDependencies.ccc).toStrictEqual('*');
    expect(pkgjson.devDependencies.ddd).toStrictEqual('*');
    expect(pkgjson.dependencieds).toBeUndefined();
  });

  test('peerDependencies without pinnedDevDep', () => {
    // GIVEN
    const project = new TestNodeProject({
      peerDependencyOptions: {
        pinnedDevDependency: false,
      },
      peerDeps: [
        'aaa@^1.2.3',
        'bbb@~4.5.6',
      ],
    });

    // WHEN
    project.addPeerDeps('ccc');
    project.deps.addDependency('ddd', DependencyType.PEER);

    // THEN
    const pkgjson = packageJson(project);
    expect(pkgjson.peerDependencies).toStrictEqual({
      aaa: '^1.2.3',
      bbb: '~4.5.6',
      ccc: '*',
      ddd: '*',
    });

    // sanitize
    ['jest', 'jest-junit', 'projen', 'standard-version'].forEach(d => delete pkgjson.devDependencies[d]);

    expect(pkgjson.devDependencies).toStrictEqual({});
    expect(pkgjson.dependencieds).toBeUndefined();
  });

  test('bundled deps are automatically added as normal deps', () => {
    // GIVEN
    const project = new TestNodeProject({
      bundledDeps: ['hey@2.1.1'],
    });

    // WHEN
    project.addBundledDeps('foo@^1.2.3');
    project.deps.addDependency('bar@~1.0.0', DependencyType.BUNDLED);

    // THEN
    const pkgjson = packageJson(project);
    expect(pkgjson.dependencies).toStrictEqual({
      hey: '2.1.1',
      foo: '^1.2.3',
      bar: '~1.0.0',
    });
    expect(pkgjson.bundledDependencies).toStrictEqual([
      'bar',
      'foo',
      'hey',
    ]);
  });
});

describe('npm publishing options', () => {
  test('defaults', () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const npm = new NodePackage(project, {
      packageName: 'my-package',
    });

    // THEN
    expect(npm.npmAccess).toStrictEqual(NpmAccess.PUBLIC);
    expect(npm.npmDistTag).toStrictEqual('latest');
    expect(npm.npmRegistry).toStrictEqual('registry.npmjs.org');
    expect(npm.npmRegistryUrl).toStrictEqual('https://registry.npmjs.org/');
    expect(npm.npmTokenSecret).toStrictEqual('NPM_TOKEN');

    // since these are all defaults, publishConfig is not defined.
    expect(synthSnapshot(project)['package.json'].publishConfig).toBeUndefined();
  });

  test('scoped packages default to RESTRICTED access', () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const npm = new NodePackage(project, {
      packageName: 'scoped@my-package',
    });

    // THEN
    expect(npm.npmAccess).toStrictEqual(NpmAccess.RESTRICTED);

    // since these are all defaults, publishConfig is not defined.
    expect(packageJson(project).publishConfig).toBeUndefined();
  });

  test('non-scoped package cannot be RESTRICTED', () => {
    // GIVEN
    const project = new TestProject();

    // THEN
    expect(() => new NodePackage(project, {
      packageName: 'my-package',
      npmAccess: NpmAccess.RESTRICTED,
    })).toThrow(/"npmAccess" cannot be RESTRICTED for non-scoped npm package/);
  });

  test('custom settings', () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const npm = new NodePackage(project, {
      packageName: 'scoped@my-package',
      npmDistTag: 'next',
      npmRegistryUrl: 'https://foo.bar',
      npmAccess: NpmAccess.PUBLIC,
      npmTokenSecret: 'GITHUB_TOKEN',
    });

    // THEN
    expect(npm.npmDistTag).toStrictEqual('next');
    expect(npm.npmRegistry).toStrictEqual('foo.bar');
    expect(npm.npmRegistryUrl).toStrictEqual('https://foo.bar/');
    expect(npm.npmAccess).toStrictEqual(NpmAccess.PUBLIC);
    expect(npm.npmTokenSecret).toStrictEqual('GITHUB_TOKEN');
    expect(packageJson(project).publishConfig).toStrictEqual({
      access: 'public',
      registry: 'https://foo.bar/',
      tag: 'next',
    });
  });

  test('deprecated npmRegistry can be used instead of npmRegistryUrl and then https:// is assumed', () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const npm = new NodePackage(project, {
      packageName: 'scoped@my-package',
      npmRegistry: 'foo.bar.com',
    });

    // THEN
    expect(npm.npmRegistry).toStrictEqual('foo.bar.com');
    expect(npm.npmRegistryUrl).toStrictEqual('https://foo.bar.com/');
    expect(packageJson(project).publishConfig).toStrictEqual({
      registry: 'https://foo.bar.com/',
    });
  });
});

test('extend github release workflow', () => {
  const project = new TestNodeProject();

  project.releaseWorkflow?.addJobs({
    publish_docker_hub: {
      'runs-on': 'ubuntu-latest',
      'env': {
        CI: 'true',
      },
      'steps': [
        {
          name: 'Check out the repo',
          uses: 'actions/checkout@v2',
        },
        {
          name: 'Push to Docker Hub',
          uses: 'docker/build-push-action@v1',
          with: {
            username: '${{ secrets.DOCKER_USERNAME }}',
            password: '${{ secrets.DOCKER_PASSWORD }}',
            repository: 'projen/projen-docker',
            tag_with_ref: true,
          },
        },
      ],
    },
  });

  const workflow = synthSnapshot(project)['.github/workflows/release.yml'];
  expect(workflow).toContain('publish_docker_hub:\n    runs-on: ubuntu-latest\n');
  expect(workflow).toContain('username: ${{ secrets.DOCKER_USERNAME }}\n          password: ${{ secrets.DOCKER_PASSWORD }}');
});

describe('scripts', () => {
  test('removeScript will remove tasks and scripts', () => {
    const p = new TestNodeProject();

    p.addTask('chortle', { exec: 'echo "frabjous day!"' });
    p.setScript('slithy-toves', 'gyre && gimble');
    expect(packageJson(p).scripts).toHaveProperty('chortle');
    expect(packageJson(p).scripts).toHaveProperty('slithy-toves');

    p.removeScript('chortle');
    p.removeScript('slithy-toves');
    expect(packageJson(p).scripts).not.toHaveProperty('chortle');
    expect(packageJson(p).scripts).not.toHaveProperty('slithy-toves');
  });
});

test('buildWorkflowMutable will push changes to PR branches', () => {
  // WHEN
  const project = new TestNodeProject({
    mutableBuild: true,
  });

  // THEN
  const workflowYaml = synthSnapshot(project)['.github/workflows/build.yml'];
  const workflow = yaml.parse(workflowYaml);
  expect(workflow.jobs.build.steps).toMatchSnapshot();
});

test('projenDuringBuild can be used to disable "projen synth" during build', () => {
  const enabled = new TestNodeProject({
    projenDuringBuild: true,
  });

  const disabled = new TestNodeProject({
    projenDuringBuild: false,
  });

  const buildTaskEnabled = synthSnapshot(enabled)['.projen/tasks.json'].tasks.build;
  const buildTaskDisabled = synthSnapshot(disabled)['.projen/tasks.json'].tasks.build;
  expect(buildTaskEnabled.steps[0].exec).toEqual('npx projen');
  expect(buildTaskDisabled.steps).toBeUndefined();
});

test('projen synth is only executed for subprojects', () => {
  // GIVEN
  const root = new TestNodeProject();

  // WHEN
  new TestNodeProject({ parent: root, outdir: 'child' });

  // THEN
  const snapshot = synthSnapshot(root);
  const rootBuildTask = snapshot['.projen/tasks.json'].tasks.build;
  const childBuildTask = snapshot['child/.projen/tasks.json'].tasks.build;
  expect(rootBuildTask).toStrictEqual({
    category: '00.build',
    description: 'Full release build (test+compile)',
    name: 'build',
    steps: [{ exec: 'npx projen' }],
  });
  expect(childBuildTask).toStrictEqual({
    category: '00.build',
    description: 'Full release build (test+compile)',
    name: 'build',
  });
});

test('enabling dependabot does not overturn mergify: false', () => {
  // WHEN
  const project = new TestNodeProject({
    dependenciesUpgrade: DependenciesUpgrade.DEPENDABOT,
    mergify: false,
  });

  // THEN
  const snapshot = synthSnapshot(project);
  // Note: brackets important, they prevent "." in filenames to be interpreted
  //       as JSON object path delimiters.
  expect(snapshot).not.toHaveProperty(['.mergify.yml']);
  expect(snapshot).toHaveProperty(['.github/dependabot.yml']);
});

function packageJson(project: Project) {
  return synthSnapshot(project)['package.json'];
}

class TestNodeProject extends NodeProject {
  constructor(options: Partial<NodeProjectOptions> = {}) {
    super({
      outdir: mkdtemp(),
      name: 'test-node-project',
      logging: {
        level: LogLevel.OFF,
      },
      defaultReleaseBranch: 'master',
      ...options,
    });
  }
}
