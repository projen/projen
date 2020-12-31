import { NodeProject, NodeProjectOptions } from '../src';
import { DependencyType } from '../src/deps';
import * as logging from '../src/logging';
import { mkdtemp, synthSnapshot } from './util';

logging.disable();

test('license file is added by default', () => {
  // WHEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: 'test-node-project',
    mergify: false,
    projenDevDependency: false,
  });

  // THEN
  expect(synthSnapshot(project).LICENSE).toContain('Apache License');
});

test('license file is not added if licensed is false', () => {
  // WHEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: 'test-node-project',
    licensed: false,
    mergify: false,
    projenDevDependency: false,
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

function packageJson(project: NodeProject) {
  return synthSnapshot(project)['package.json'];
}

class TestNodeProject extends NodeProject {
  constructor(options: Omit<NodeProjectOptions, 'name'> = {}) {
    super({
      outdir: mkdtemp(),
      name: 'test-node-project',
      ...options,
    });
  }
}