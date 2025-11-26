import { DependencyCoordinates } from "../../src";
import {
  formatDependency,
  formatVersion,
  getVersionSpec,
  getVersionSpecs,
  VersionComparator,
  VersionSpec,
} from "../../src/python/package-manager";

test("python package manager invalid version spec", () => {
  expect(() => getVersionSpec("~1.2.3")).toThrowError(
    "Invalid version expression: ~1.2.3"
  );
});

test.each([
  [">1.0", [{ comparator: VersionComparator.GT, version: "1.0" }]],
  [
    "~=1.2.3",
    [{ comparator: VersionComparator.COMPATIBLE_RELEASE, version: "1.2.3" }],
  ],
  [
    "^1.2.3",
    [
      { comparator: VersionComparator.GE, version: "1.2.3" },
      { comparator: VersionComparator.LT, version: "2.0.0" },
    ],
  ],
  ["1.0.0", [{ comparator: VersionComparator.EQ, version: "1.0.0" }]],
])(
  "python package manager get version specs %s",
  (version: string, spec: VersionSpec[]) => {
    expect(getVersionSpecs(version)).toEqual(spec);
  }
);

test.each([
  ["^1.2.3", ">=1.2.3,<2.0.0"],
  ["===1.0.0", "===1.0.0"],
  ["1.0.0", "==1.0.0"],
])(
  "python package manager format version %s",
  (version: string, formatted: string) => {
    expect(formatVersion(version)).toEqual(formatted);
  }
);

test.each([
  [{ name: "projen" }, "projen"],
  [{ name: "projen", version: "*" }, "projen"],
  [{ name: "projen", version: "^1.2.3" }, "projen>=1.2.3,<2.0.0"],
  [{ name: "projen", version: "1.0.0" }, "projen==1.0.0"],
])(
  "python package manager format dependency %s",
  (dependency: DependencyCoordinates, formatted: string) => {
    expect(formatDependency(dependency)).toEqual(formatted);
  }
);
