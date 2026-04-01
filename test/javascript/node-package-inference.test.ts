import { existsSync, writeFileSync } from "fs";
import { join } from "path";
import { Project } from "../../src";
import {
  NodePackage,
  NodePackageManager,
} from "../../src/javascript/node-package";
import { mkdtemp, synthSnapshot } from "../util";

// Suppress install
jest
  .spyOn(
    jest.requireActual("../../src/task-runtime").TaskRuntime.prototype,
    "runTask",
  )
  .mockReturnValue(undefined as any);

function createProjectWithPackageJson(
  pkgJson: Record<string, any>,
  lockfile?: string,
) {
  const outdir = mkdtemp();
  writeFileSync(join(outdir, "package.json"), JSON.stringify(pkgJson));
  if (lockfile) {
    writeFileSync(join(outdir, lockfile), "");
  }
  return new Project({ name: "test", outdir });
}

describe("packageManager inference", () => {
  test("infers npm from corepack packageManager field", () => {
    const project = createProjectWithPackageJson({
      packageManager: "npm@10.2.0",
    });
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.NPM);
  });

  test("infers pnpm from corepack packageManager field", () => {
    const project = createProjectWithPackageJson({
      packageManager: "pnpm@8.15.0",
    });
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.PNPM);
  });

  test("infers yarn classic from corepack packageManager field", () => {
    const project = createProjectWithPackageJson({
      packageManager: "yarn@1.22.19",
    });
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.YARN_CLASSIC);
  });

  test("infers yarn berry from corepack packageManager field", () => {
    const project = createProjectWithPackageJson({
      packageManager: "yarn@4.1.0",
    });
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.YARN_BERRY);
  });

  test("infers bun from corepack packageManager field", () => {
    const project = createProjectWithPackageJson({
      packageManager: "bun@1.0.0",
    });
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.BUN);
  });

  test("infers from devEngines.packageManager single entry", () => {
    const project = createProjectWithPackageJson({
      devEngines: { packageManager: { name: "pnpm" } },
    });
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.PNPM);
  });

  test("infers from devEngines.packageManager array with single entry", () => {
    const project = createProjectWithPackageJson({
      devEngines: { packageManager: [{ name: "npm" }] },
    });
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.NPM);
  });

  test("disambiguates devEngines array with lockfile", () => {
    const project = createProjectWithPackageJson(
      {
        devEngines: {
          packageManager: [{ name: "npm" }, { name: "pnpm" }],
        },
      },
      "pnpm-lock.yaml",
    );
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.PNPM);
  });

  test.each([
    ["bun.lockb", NodePackageManager.BUN],
    ["yarn.lock", NodePackageManager.YARN_CLASSIC],
    ["package-lock.json", NodePackageManager.NPM],
  ])(
    "disambiguates devEngines array with %s lockfile",
    (lockfile, expected) => {
      const project = createProjectWithPackageJson(
        {
          devEngines: {
            packageManager: [{ name: "npm" }, { name: "pnpm" }],
          },
        },
        lockfile,
      );
      const pkg = new NodePackage(project);
      expect(pkg.packageManager).toBe(expected);
    },
  );

  test("falls back when devEngines array has no matching lockfile", () => {
    const project = createProjectWithPackageJson({
      devEngines: {
        packageManager: [{ name: "npm" }, { name: "pnpm" }],
      },
    });
    const warnSpy = jest.spyOn(project.logger, "warn");
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.YARN_CLASSIC);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("[DEPRECATED]"),
    );
  });

  test("ignores corepack field that does not match expected format", () => {
    const project = createProjectWithPackageJson({
      packageManager: "not-a-valid-format",
    });
    const warnSpy = jest.spyOn(project.logger, "warn");
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.YARN_CLASSIC);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("[DEPRECATED]"),
    );
  });

  test("ignores corepack field with unknown package manager name", () => {
    const project = createProjectWithPackageJson({
      packageManager: "deno@1.0.0",
    });
    const warnSpy = jest.spyOn(project.logger, "warn");
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.YARN_CLASSIC);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("[DEPRECATED]"),
    );
  });

  test("falls back to yarn classic when only lockfile present", () => {
    const project = createProjectWithPackageJson({}, "package-lock.json");
    const warnSpy = jest.spyOn(project.logger, "warn");
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.YARN_CLASSIC);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("[DEPRECATED]"),
    );
  });

  test("falls back to yarn classic and warns when nothing found", () => {
    const project = createProjectWithPackageJson({});
    const warnSpy = jest.spyOn(project.logger, "warn");
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.YARN_CLASSIC);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("[DEPRECATED]"),
    );
  });

  test("does not warn when inferred from package.json", () => {
    const project = createProjectWithPackageJson({
      packageManager: "npm@10.0.0",
    });
    const warnSpy = jest.spyOn(project.logger, "warn");
    new NodePackage(project);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  test("explicit option takes precedence over inference", () => {
    const project = createProjectWithPackageJson({
      packageManager: "npm@10.0.0",
    });
    const pkg = new NodePackage(project, {
      packageManager: NodePackageManager.PNPM,
    });
    expect(pkg.packageManager).toBe(NodePackageManager.PNPM);
  });

  test("corepack field takes precedence over devEngines", () => {
    const project = createProjectWithPackageJson({
      packageManager: "pnpm@8.0.0",
      devEngines: { packageManager: { name: "npm" } },
    });
    const pkg = new NodePackage(project);
    expect(pkg.packageManager).toBe(NodePackageManager.PNPM);
  });
});

describe("devEngines rendering", () => {
  test("writes devEngines.packageManager when packageManager is explicit", () => {
    const project = new Project({ name: "test" });
    new NodePackage(project, {
      packageManager: NodePackageManager.NPM,
    });
    const snap = synthSnapshot(project);
    expect(snap["package.json"].devEngines).toEqual({
      packageManager: { name: "npm" },
    });
  });

  test.each([
    [NodePackageManager.PNPM, "pnpm"],
    [NodePackageManager.BUN, "bun"],
  ])("writes devEngines.packageManager for %s", (pm, expectedName) => {
    const project = new Project({ name: "test" });
    new NodePackage(project, { packageManager: pm });
    const snap = synthSnapshot(project);
    expect(snap["package.json"].devEngines).toEqual({
      packageManager: { name: expectedName },
    });
  });

  test.each([
    [NodePackageManager.YARN_CLASSIC, "<2.0.0"],
    [NodePackageManager.YARN, "<2.0.0"],
  ])("writes devEngines with version constraint for %s", (pm, version) => {
    const project = new Project({ name: "test" });
    new NodePackage(project, { packageManager: pm });
    const snap = synthSnapshot(project);
    expect(snap["package.json"].devEngines).toEqual({
      packageManager: { name: "yarn", version },
    });
  });

  test.each([
    [NodePackageManager.YARN_BERRY, ">=4.0.1"],
    [NodePackageManager.YARN2, ">=4.0.1"],
  ])("writes devEngines with version constraint for %s", (pm, version) => {
    const project = new Project({ name: "test" });
    new NodePackage(project, { packageManager: pm });
    const snap = synthSnapshot(project);
    expect(snap["package.json"].devEngines).toEqual({
      packageManager: { name: "yarn", version },
    });
  });

  test("writes devEngines with version from yarnBerryOptions", () => {
    const project = new Project({ name: "test" });
    new NodePackage(project, {
      packageManager: NodePackageManager.YARN_BERRY,
      yarnBerryOptions: { version: "3.5.0" },
    });
    const snap = synthSnapshot(project);
    expect(snap["package.json"].devEngines).toEqual({
      packageManager: { name: "yarn", version: ">=3.5.0" },
    });
  });

  test("does not write devEngines.packageManager for fallback default", () => {
    const project = createProjectWithPackageJson({});
    new NodePackage(project);
    const snap = synthSnapshot(project);
    expect(snap["package.json"].devEngines).toBeUndefined();
  });

  test("does not write devEngines.packageManager when inferred", () => {
    const project = createProjectWithPackageJson({
      packageManager: "pnpm@8.0.0",
    });
    new NodePackage(project);
    const snap = synthSnapshot(project);
    expect(snap["package.json"].devEngines).toBeUndefined();
  });

  test("user-provided devEngines are merged with auto-populated value", () => {
    const project = new Project({ name: "test" });
    new NodePackage(project, {
      packageManager: NodePackageManager.NPM,
      devEngines: {
        runtime: { name: "node", version: ">=20" },
      },
    });
    const snap = synthSnapshot(project);
    expect(snap["package.json"].devEngines).toEqual({
      packageManager: { name: "npm" },
      runtime: { name: "node", version: ">=20" },
    });
  });

  test("user-provided devEngines.packageManager overrides auto-populated", () => {
    const project = new Project({ name: "test" });
    new NodePackage(project, {
      packageManager: NodePackageManager.NPM,
      devEngines: {
        packageManager: { name: "npm", version: ">=10", onFail: "error" },
      },
    });
    const snap = synthSnapshot(project);
    expect(snap["package.json"].devEngines).toEqual({
      packageManager: { name: "npm", version: ">=10", onFail: "error" },
    });
  });

  test("addPackageManagerToDevEngines false disables auto packageManager", () => {
    const project = new Project({ name: "test" });
    new NodePackage(project, {
      packageManager: NodePackageManager.NPM,
      addPackageManagerToDevEngines: false,
    });
    const snap = synthSnapshot(project);
    expect(snap["package.json"].devEngines).toBeUndefined();
  });

  test("addPackageManagerToDevEngines false still renders user devEngines", () => {
    const project = new Project({ name: "test" });
    new NodePackage(project, {
      packageManager: NodePackageManager.NPM,
      addPackageManagerToDevEngines: false,
      devEngines: { runtime: { name: "node", version: ">=20" } },
    });
    const snap = synthSnapshot(project);
    expect(snap["package.json"].devEngines).toEqual({
      runtime: { name: "node", version: ">=20" },
    });
  });
});

describe("orphaned lockfile deletion", () => {
  test("deletes other lockfiles when own lockfile exists", () => {
    const outdir = mkdtemp();
    writeFileSync(join(outdir, "package.json"), "{}");
    writeFileSync(join(outdir, "package-lock.json"), "");
    writeFileSync(join(outdir, "yarn.lock"), "");
    const project = new Project({ name: "test", outdir });
    new NodePackage(project, { packageManager: NodePackageManager.NPM });
    expect(existsSync(join(outdir, "package-lock.json"))).toBe(true);
    expect(existsSync(join(outdir, "yarn.lock"))).toBe(false);
  });

  test("does not delete anything when own lockfile is missing", () => {
    const outdir = mkdtemp();
    writeFileSync(join(outdir, "package.json"), "{}");
    writeFileSync(join(outdir, "yarn.lock"), "");
    const project = new Project({ name: "test", outdir });
    new NodePackage(project, { packageManager: NodePackageManager.NPM });
    expect(existsSync(join(outdir, "yarn.lock"))).toBe(true);
  });

  test("can be disabled with deleteOrphanedLockFiles false", () => {
    const outdir = mkdtemp();
    writeFileSync(join(outdir, "package.json"), "{}");
    writeFileSync(join(outdir, "package-lock.json"), "");
    writeFileSync(join(outdir, "yarn.lock"), "");
    const project = new Project({ name: "test", outdir });
    new NodePackage(project, {
      packageManager: NodePackageManager.NPM,
      deleteOrphanedLockFiles: false,
    });
    expect(existsSync(join(outdir, "yarn.lock"))).toBe(true);
  });
});
