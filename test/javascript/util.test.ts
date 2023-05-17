import { mkdirSync, writeFileSync } from "fs";
import * as path from "path";
import {
  tryResolveModule,
  tryResolveModuleManifestPath,
  tryResolveManifestPathFromDefaultExport,
  tryResolveManifestPathFromPath,
  tryResolveManifestPathFromSearch,
  tryResolveModuleManifest,
  tryResolveDependencyVersion,
} from "../../src/javascript/util";
import { mkdtemp } from "../util";

describe("tryResolveModule", () => {
  test.each([
    ["jest", true],
    ["non-existent-module", false],
  ])(
    "should resolve the module path if it exists (%s)",
    (moduleId, expected) => {
      const result = tryResolveModule(moduleId);
      expect(Boolean(result)).toBe(expected);
    }
  );
});

describe("tryResolveModuleManifestPath", () => {
  test.each([
    ["jest", true],
    ["non-existent-module", false],
  ])(
    "should resolve the manifest path if the module exists (%s)",
    (moduleId, expected) => {
      const result = tryResolveModuleManifestPath(moduleId);
      expect(Boolean(result)).toBe(expected);
    }
  );
});

describe("tryResolveManifestPathFromDefaultExport", () => {
  test.each([
    ["jest", true],
    ["non-existent-module", false],
  ])(
    "should resolve the manifest path if the module exists (%s)",
    (moduleId, expected) => {
      const result = tryResolveManifestPathFromDefaultExport(moduleId);
      expect(Boolean(result)).toBe(expected);
    }
  );
});

describe("tryResolveManifestPathFromPath", () => {
  test("should resolve the manifest path if the module exists in the specified path", () => {
    const outdir = mkdtemp();
    const fakeJestPath = path.join(outdir, "node_modules", "jest");
    mkdirSync(fakeJestPath, { recursive: true });
    writeFileSync(
      path.join(fakeJestPath, "package.json"),
      JSON.stringify({ name: "jest", version: "0.0.0" })
    );
    const result = tryResolveManifestPathFromPath("jest", outdir);
    expect(result).toBeDefined();
  });

  test("should return undefined if the module does not exist in the specified path", () => {
    const result = tryResolveManifestPathFromPath(
      "non-existent-module",
      mkdtemp()
    );
    expect(result).toBeUndefined();
  });
});

describe("tryResolveManifestPathFromSearch", () => {
  test.each([
    ["jest", true],
    ["non-existent-module", false],
  ])(
    "should resolve the manifest path if the module exists (%s)",
    (moduleId, expected) => {
      const result = tryResolveManifestPathFromSearch(moduleId);
      expect(Boolean(result)).toBe(expected);
    }
  );
});

describe("tryResolveModuleManifest", () => {
  test("should resolve the module manifest if the module exists", () => {
    const result = tryResolveModuleManifest("jest");
    expect(result).toBeDefined();
    expect(result!.name).toBe("jest");
    expect(result!.version).toBeDefined();
  });

  test("should return undefined if the module does not exist", () => {
    const result = tryResolveModuleManifest("non-existent-module");
    expect(result).toBeUndefined();
  });
});

describe("tryResolveDependencyVersion", () => {
  let outdir: string = mkdtemp();

  beforeAll(() => {
    const fakeModPath = path.join(outdir, "node_modules", "fake-module");
    mkdirSync(fakeModPath, { recursive: true });
    writeFileSync(
      path.join(fakeModPath, "package.json"),
      JSON.stringify({ name: "fake-module", version: "0.0.0" })
    );
  });

  test.each([
    [["jest"], true],
    [["fake-module", { paths: [outdir] }], true],
    [["fake-module", { paths: [mkdtemp()] }], false],
    [["non-existent-module"], false],
  ])(
    "should resolve the dependency version if the module exists (%s)",
    (params, expected) => {
      const result = tryResolveDependencyVersion(
        ...(params as [moduleId: string, options?: { paths: string[] }])
      );
      expect(Boolean(result)).toBe(expected);
    }
  );
});
