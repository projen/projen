import { join } from "path";
import { existsSync, readFileSync } from "fs-extra";
import { Project } from "../src";
import { Dependencies, DependencyType } from "../src/dependencies";

test("no dependencies, no manifest", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  new Dependencies(p);

  // THEN
  expect(depsManifest(p)).toBeUndefined();
});

test("minimal case", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const deps = new Dependencies(p);

  // WHEN
  const dep = deps.addDependency("my-first-dep", DependencyType.RUNTIME);

  // THEN
  expect(dep.name).toBe("my-first-dep");
  expect(dep.version).toBeUndefined();
  expect(dep.type).toBe(DependencyType.RUNTIME);
  expect(depsManifest(p)).toMatchSnapshot();
});

test("with version requirement", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const deps = new Dependencies(p);

  // WHEN
  const dep = deps.addDependency("depy@^7", DependencyType.PEER);

  // THEN
  expect(dep.name).toBe("depy");
  expect(dep.version).toBe("^7");
  expect(dep.type).toBe(DependencyType.PEER);

  expect(depsManifest(p)).toMatchSnapshot();
});

test("with package alias", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const deps = new Dependencies(p);

  // WHEN
  const dep = deps.addDependency("bar@npm:@bar/legacy", DependencyType.PEER);

  // THEN
  expect(dep.name).toBe("bar");
  expect(dep.version).toBe("npm:@bar/legacy");
  expect(dep.type).toBe(DependencyType.PEER);

  expect(depsManifest(p)).toMatchSnapshot();
});

test("deps.all returns all the dependencies", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const deps = new Dependencies(p);

  // WHEN
  deps.addDependency("dep1", DependencyType.DEVENV);
  deps.addDependency("dep2", DependencyType.RUNTIME);
  deps.addDependency("dep3", DependencyType.PEER);

  // THEN
  expect(deps.all).toMatchSnapshot();
});

test("duplicates are ignored", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const deps = new Dependencies(p);

  // WHEN
  deps.addDependency("depy", DependencyType.PEER);
  deps.addDependency("depy", DependencyType.PEER);

  // THEN
  expect(deps.getDependency("depy")).toBeDefined();
  expect(deps.all.length).toEqual(1);
  expect(depsManifest(p)).toMatchSnapshot();
});

test("can be overridden with more specific version", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const deps = new Dependencies(p);

  // WHEN
  deps.addDependency("depy", DependencyType.PEER);
  deps.addDependency("depy@^9", DependencyType.PEER);

  // THEN
  expect(deps.getDependency("depy").version).toEqual("^9");
  expect(depsManifest(p)).toMatchSnapshot();
});

describe("removeDependency()", () => {
  test("can be used to remove a dependency", () => {
    // GIVEN
    const p = new Project({ name: "my-project" });
    const deps = new Dependencies(p);
    deps.addDependency("mydep", DependencyType.RUNTIME);

    // WHEN
    deps.removeDependency("mydep");

    // THEN
    expect(deps.all).toStrictEqual([]);
  });

  test("dep is defined for multiple types (e.g. dev + runtime)", () => {
    // GIVEN
    const p = new Project({ name: "my-project" });
    const deps = new Dependencies(p);
    deps.addDependency("mydep", DependencyType.RUNTIME);
    deps.addDependency("mydep", DependencyType.BUILD);

    // WHEN
    deps.removeDependency("mydep", DependencyType.BUILD);

    // THEN
    expect(deps.all).toStrictEqual([
      {
        name: "mydep",
        type: "runtime",
      },
    ]);
  });

  test("fails if type is not provided and there are more then one", () => {
    // GIVEN
    const p = new Project({ name: "my-project" });
    const deps = new Dependencies(p);

    // WHEN
    deps.addDependency("foo", DependencyType.BUILD);
    deps.addDependency("foo", DependencyType.RUNTIME);

    // THEN
    expect(() => deps.removeDependency("foo")).toThrow(
      /"foo" is defined for multiple dependency types\: build\,runtime/
    );
  });

  test("no-op if the dependency is not defined", () => {
    // GIVEN
    const p = new Project({ name: "my-project" });
    const deps = new Dependencies(p);
    deps.addDependency("hey", DependencyType.RUNTIME);

    // WHEN
    deps.removeDependency("bam");

    // THEN
    expect(deps.all).toStrictEqual([
      {
        name: "hey",
        type: "runtime",
      },
    ]);
  });
});

describe("getDependency()", () => {
  test("returns a single dependency", () => {
    // GIVEN
    const p = new Project({ name: "my-project" });
    const deps = new Dependencies(p);

    // WHEN
    deps.addDependency("bar@^1.1.1", DependencyType.RUNTIME);

    // THEN
    expect(deps.getDependency("bar")).toStrictEqual({
      name: "bar",
      version: "^1.1.1",
      type: DependencyType.RUNTIME,
    });
  });

  test("matches type", () => {
    // GIVEN
    const p = new Project({ name: "my-project" });
    const deps = new Dependencies(p);
    deps.addDependency("boo", DependencyType.BUILD);
    deps.addDependency("zar", DependencyType.RUNTIME);
    deps.addDependency("hey@^1.0.0", DependencyType.RUNTIME);

    // WHEN
    deps.addDependency("bar@^1.1.1", DependencyType.RUNTIME);

    // THEN
    expect(deps.getDependency("bar", DependencyType.RUNTIME)).toStrictEqual({
      name: "bar",
      version: "^1.1.1",
      type: DependencyType.RUNTIME,
    });
  });

  test("matches type (multiple)", () => {
    // GIVEN
    const p = new Project({ name: "my-project" });
    const deps = new Dependencies(p);

    // WHEN
    deps.addDependency("bar@^1.2.1", DependencyType.RUNTIME);
    deps.addDependency("bar@^1.1.1", DependencyType.BUILD);

    // THEN
    expect(deps.getDependency("bar", DependencyType.RUNTIME)).toStrictEqual({
      name: "bar",
      version: "^1.2.1",
      type: DependencyType.RUNTIME,
    });
  });

  test("fails if there is no dependency by that name", () => {
    // GIVEN
    const p = new Project({ name: "my-project" });
    const deps = new Dependencies(p);
    deps.addDependency("bar@1.1.1", DependencyType.RUNTIME);

    // THEN
    expect(() => deps.getDependency("test")).toThrow(
      /there is no dependency defined on \"test\"/
    );
  });

  test("fails if there is more then one type and type is not provided", () => {
    // GIVEN
    const p = new Project({ name: "my-project" });
    const deps = new Dependencies(p);

    // WHEN
    deps.addDependency("zoo", DependencyType.RUNTIME);
    deps.addDependency("zoo", DependencyType.DEVENV);

    // THEN
    expect(() => deps.getDependency("zoo")).toThrow(
      /\"zoo\" is defined for multiple dependency types: runtime,devenv. Please specify dependency type/
    );
  });

  test("fails if type does not match", () => {
    // GIVEN
    const p = new Project({ name: "my-project" });
    const deps = new Dependencies(p);

    // WHEN
    deps.addDependency("zoo", DependencyType.RUNTIME);

    // THEN
    expect(() => deps.getDependency("zoo", DependencyType.BUILD)).toThrow(
      /there is no build dependency defined on \"zoo\"/
    );
  });
});

test("tryGetDependency() returns undefined if there is no dep", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const deps = new Dependencies(p);

  // WHEN
  deps.addDependency("zoo", DependencyType.RUNTIME);

  // THEN
  expect(deps.tryGetDependency("zoo")).toStrictEqual({
    name: "zoo",
    type: "runtime",
  });
  expect(deps.tryGetDependency("zoo", DependencyType.RUNTIME)).toStrictEqual({
    name: "zoo",
    type: "runtime",
  });
  expect(deps.tryGetDependency("zoo", DependencyType.BUILD)).toBeUndefined();
  expect(deps.tryGetDependency("boo")).toBeUndefined();
});

test("it is possible to overwrite dependency specs", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const deps = new Dependencies(p);

  // WHEN
  deps.addDependency("zoo@^0.3.4", DependencyType.RUNTIME);
  deps.addDependency("zoo@1.2.3", DependencyType.RUNTIME);
  deps.addDependency("zoo@^2.3.4", DependencyType.BUILD);

  // THEN
  expect(deps.all).toStrictEqual([
    { name: "zoo", type: "build", version: "^2.3.4" },
    { name: "zoo", type: "runtime", version: "1.2.3" },
  ]);
});

test("it is possible to have local file dependencies", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const deps = new Dependencies(p);

  // WHEN
  deps.addDependency("cowsay@file:./cowsay", DependencyType.RUNTIME);
  deps.addDependency("lolcat@file:../path/to/lolcat", DependencyType.BUILD);
  deps.addDependency("fortune@file:../../path/to/fortune", DependencyType.PEER);

  // THEN
  expect(deps.all).toStrictEqual([
    { name: "lolcat", type: "build", version: "file:../path/to/lolcat" },
    { name: "fortune", type: "peer", version: "file:../../path/to/fortune" },
    { name: "cowsay", type: "runtime", version: "file:./cowsay" },
  ]);
});

function depsManifest(p: Project) {
  p.synth();
  const filepath = join(p.outdir, Dependencies.MANIFEST_FILE);
  if (!existsSync(filepath)) {
    return undefined;
  }
  return JSON.parse(readFileSync(filepath, "utf-8"));
}
