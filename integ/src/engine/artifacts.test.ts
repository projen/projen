import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { Artifacts, findRepoRoot } from "./artifacts";

/**
 * Builds a fake `dist/` layout in a temp dir so artifact resolution can be
 * tested without a real projen build.
 */
function fakeDist(version = "1.2.3"): { root: string; dist: string } {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "artifacts-test-"));
  const dist = path.join(root, "dist");
  fs.mkdirSync(path.join(dist, "js"), { recursive: true });
  fs.writeFileSync(path.join(dist, "js", `projen-${version}.tgz`), "");
  fs.mkdirSync(path.join(dist, "python"), { recursive: true });
  fs.writeFileSync(
    path.join(dist, "python", `projen-${version}-py3-none-any.whl`),
    "",
  );
  fs.mkdirSync(
    path.join(dist, "java", "io", "github", "cdklabs", "projen", version),
    { recursive: true },
  );
  fs.mkdirSync(path.join(dist, "go", "projen"), { recursive: true });
  return { root, dist };
}

describe("Artifacts", () => {
  let root: string;
  let dist: string;

  beforeEach(() => {
    ({ root, dist } = fakeDist());
    process.env.PROJEN_DIST_DIR = dist;
  });

  afterEach(() => {
    delete process.env.PROJEN_DIST_DIR;
    fs.rmSync(root, { recursive: true, force: true });
  });

  test("locates each language artifact", () => {
    const a = Artifacts.resolve();
    expect(a.npmTarball.endsWith("projen-1.2.3.tgz")).toBe(true);
    expect(a.pythonWheel.endsWith(".whl")).toBe(true);
    expect(fs.existsSync(a.javaRepo)).toBe(true);
    expect(fs.existsSync(a.goModule)).toBe(true);
  });

  test("parses the built version from the tarball name", () => {
    expect(Artifacts.resolve().version).toBe("1.2.3");
  });

  test("throws a helpful error when an artifact is missing", () => {
    fs.rmSync(path.join(dist, "js"), { recursive: true, force: true });
    expect(() => Artifacts.resolve().npmTarball).toThrow(/package:js/);
  });
});

describe("findRepoRoot", () => {
  test("finds the dir whose package.json is named projen", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "reporoot-test-"));
    try {
      fs.writeFileSync(
        path.join(tmp, "package.json"),
        JSON.stringify({ name: "projen" }),
      );
      const nested = path.join(tmp, "a", "b");
      fs.mkdirSync(nested, { recursive: true });
      expect(findRepoRoot(nested)).toBe(path.resolve(tmp));
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});
