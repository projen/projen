import { join } from 'path';
import { existsSync, readFileSync } from 'fs-extra';
import { Project } from '..';
import { Dependencies, DependencyType } from '../deps';
import { TestProject } from './util';

test('no dependencieds, no manifest', () => {
  // GIVEN
  const p = new TestProject();

  // THEN
  expect(depsManifest(p)).toBeUndefined();
});

test('minimal case', () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  const dep = p.deps.addDependency('my-first-dep', DependencyType.RUNTIME);

  // THEN
  expect(dep.name).toBe('my-first-dep');
  expect(dep.version).toBeUndefined();
  expect(dep.type).toBe(DependencyType.RUNTIME);
  expect(depsManifest(p)).toMatchSnapshot();
});

test('with version requirement', () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  const dep = p.deps.addDependency('depy@^7', DependencyType.PEER);

  // THEN
  expect(dep.name).toBe('depy');
  expect(dep.version).toBe('^7');
  expect(dep.type).toBe(DependencyType.PEER);

  expect(depsManifest(p)).toMatchSnapshot();
});

test('deps.all returns all the dependencies', () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.deps.addDependency('dep1', DependencyType.DEVENV);
  p.deps.addDependency('dep2', DependencyType.RUNTIME);
  p.deps.addDependency('dep3', DependencyType.PEER);

  // THEN
  expect(p.deps.all).toMatchSnapshot();
});

describe('removeDependency()', () => {
  test('can be used to remove a dependency', () => {
    // GIVEN
    const p = new TestProject();
    p.deps.addDependency('mydep', DependencyType.RUNTIME);

    // WHEN
    p.deps.removeDependency('mydep');

    // THEN
    expect(p.deps.all).toStrictEqual([]);
  });

  test('dep is defined for multiple types (e.g. dev + runtime)', () => {
    // GIVEN
    const p = new TestProject();
    p.deps.addDependency('mydep', DependencyType.RUNTIME);
    p.deps.addDependency('mydep', DependencyType.BUILD);

    // WHEN
    p.deps.removeDependency('mydep', DependencyType.BUILD);

    // THEN
    expect(p.deps.all).toStrictEqual([
      {
        name: 'mydep',
        type: 'runtime',
      },
    ]);

  });

  test('fails if type is not provided and there are more then one', () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    p.deps.addDependency('foo', DependencyType.BUILD);
    p.deps.addDependency('foo', DependencyType.RUNTIME);

    // THEN
    expect(() => p.deps.removeDependency('foo')).toThrow(/"foo" is defined for multiple dependency types\: build\,runtime/);
  });

  test('no-op if the dependency is not defined', () => {
    // GIVEN
    const p = new TestProject();
    p.deps.addDependency('hey', DependencyType.RUNTIME);

    // WHEN
    p.deps.removeDependency('bam');

    // THEN
    expect(p.deps.all).toStrictEqual([
      {
        name: 'hey',
        type: 'runtime',
      },
    ]);
  });
});

describe('getDependency()', () => {

  test('returns a single dependency', () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    p.deps.addDependency('bar@^1.1.1', DependencyType.RUNTIME);

    // THEN
    expect(p.deps.getDependency('bar')).toStrictEqual({
      name: 'bar',
      version: '^1.1.1',
      type: DependencyType.RUNTIME,
    });
  });

  test('matches type', () => {
    // GIVEN
    const p = new TestProject();
    p.deps.addDependency('boo', DependencyType.BUILD);
    p.deps.addDependency('zar', DependencyType.RUNTIME);
    p.deps.addDependency('hey@^1.0.0', DependencyType.RUNTIME);

    // WHEN
    p.deps.addDependency('bar@^1.1.1', DependencyType.RUNTIME);

    // THEN
    expect(p.deps.getDependency('bar', DependencyType.RUNTIME)).toStrictEqual({
      name: 'bar',
      version: '^1.1.1',
      type: DependencyType.RUNTIME,
    });
  });

  test('matches type (multiple)', () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    p.deps.addDependency('bar@^1.2.1', DependencyType.RUNTIME);
    p.deps.addDependency('bar@^1.1.1', DependencyType.BUILD);

    // THEN
    expect(p.deps.getDependency('bar', DependencyType.RUNTIME)).toStrictEqual({
      name: 'bar',
      version: '^1.2.1',
      type: DependencyType.RUNTIME,
    });
  });

  test('fails if there is no dependency by that name', () => {
    // GIVEN
    const p = new TestProject();
    p.deps.addDependency('bar@1.1.1', DependencyType.RUNTIME);

    // THEN
    expect(() => p.deps.getDependency('test')).toThrow(/there is no dependency defined on \"test\"/);
  });

  test('fails if there is more then one type and type is not provided', () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    p.deps.addDependency('zoo', DependencyType.RUNTIME);
    p.deps.addDependency('zoo', DependencyType.DEVENV);

    // THEN
    expect(() => p.deps.getDependency('zoo')).toThrow(/\"zoo\" is defined for multiple dependency types: runtime,devenv. Please specify dependency type/);
  });

  test('fails if type does not match', () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    p.deps.addDependency('zoo', DependencyType.RUNTIME);

    // THEN
    expect(() => p.deps.getDependency('zoo', DependencyType.BUILD)).toThrow(/there is no build dependency defined on \"zoo\"/);
  });

});

function depsManifest(p: Project) {
  p.synth();
  const filepath = join(p.outdir, Dependencies.MANIFEST_FILE);
  if (!existsSync(filepath)) { return undefined; }
  return JSON.parse(readFileSync(filepath, 'utf-8'));
}