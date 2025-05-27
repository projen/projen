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
  installedVersionProbablyMatches,
  extractCodeArtifactDetails,
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

test.each([
  ["^28", "^29", false],
  ["^29", "29", true],
  ["^29.5.9", "29", true],
  ["^29.5.9", ">=29", true],
  ["^30.5.9", ">=29", true],
  [">=2", ">=3", true],
  ["<=2", "<=1", false],
  ["^29", ">=29", true],
  ["^30", ">=29", true],
])(
  "installedVersionProbablyMatches(%p, %p) should return %p",
  (requested, check, expected) => {
    expect(installedVersionProbablyMatches(requested, check)).toEqual(expected);
  }
);

test.each([
  [
    "https://foobar-123456789013.d.codeartifact.xx-region-1.amazonaws.com/npm/MyRepo/",
    {
      accountId: "123456789013",
      domain: "foobar",
      region: "xx-region-1",
      registry:
        "foobar-123456789013.d.codeartifact.xx-region-1.amazonaws.com/npm/MyRepo/",
      repository: "MyRepo",
    },
  ],

  [
    "https://foobar-123456789013.d.codeartifact.xx-region-1.amazonaws.com/npm/MyRepo.With.Dots/",
    {
      accountId: "123456789013",
      domain: "foobar",
      region: "xx-region-1",
      registry:
        "foobar-123456789013.d.codeartifact.xx-region-1.amazonaws.com/npm/MyRepo.With.Dots/",
      repository: "MyRepo.With.Dots",
    },
  ],
])("extractCodeArtifactDetails(%p) should work", (url, retVal) => {
  expect(extractCodeArtifactDetails(url)).toEqual(retVal);
});

test.each([
  [
    "https://foobar-123456789013.d.codeartifact.xx-region-1.amazonaws.com/npm/MyRepo",
  ],
  ["https://foobar-123456789013.d.codeartifact.xx-region-1.amazonaws.com/npm"],
  [
    "https://123456789013.d.codeartifact.xx-region-1.amazonaws.com/npm/MyRepo//",
  ],
  ["https://123456789013.d.codeartifact.xx-region-1.amazonaws.com/npm/MyRepo"],
])("extractCodeArtifactDetails(%p) should throw an exception", (url) => {
  expect(() => {
    extractCodeArtifactDetails(url);
  }).toThrow(/Could not get CodeArtifact details from npm Registry/);
});
