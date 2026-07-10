import * as fs from "fs";
import * as path from "path";

/**
 * Locates the prebuilt projen release artifacts under `dist/` and reads the
 * version that was actually built.
 *
 * The integration tests must run against the *packaged* build output - the npm
 * tarball in `dist/js`, the Python wheel in `dist/python`, the Maven repo in
 * `dist/java` and the Go module in `dist/go` - never against a rebuilt or
 * source copy of projen. This mirrors the previous bash helpers
 * (`find_npm_tarball`, `find_python_wheel`, ...).
 */
export class Artifacts {
  /**
   * Resolves the artifacts relative to the projen repository root.
   *
   * The repo root is located by walking up from `startDir` (default: this
   * module's directory) until a `package.json` named `projen` is found. The
   * location can be overridden with the `PROJEN_DIST_DIR` environment variable.
   */
  public static resolve(startDir: string = __dirname): Artifacts {
    const override = process.env.PROJEN_DIST_DIR;
    if (override) {
      return new Artifacts(path.resolve(override));
    }
    const repoRoot = findRepoRoot(startDir);
    return new Artifacts(path.join(repoRoot, "dist"));
  }

  private constructor(public readonly distDir: string) {}

  /**
   * Path to the npm tarball (`dist/js/*.tgz`).
   */
  public get npmTarball(): string {
    return this.single(
      path.join(this.distDir, "js"),
      (f) => f.endsWith(".tgz"),
      "package:js",
    );
  }

  /**
   * Path to the Python wheel (`dist/python/*.whl`).
   */
  public get pythonWheel(): string {
    return this.single(
      path.join(this.distDir, "python"),
      (f) => f.endsWith(".whl"),
      "package:python",
    );
  }

  /**
   * Path to the local Maven repository (`dist/java`).
   */
  public get javaRepo(): string {
    const dir = path.join(this.distDir, "java");
    const marker = path.join(dir, "io", "github", "cdklabs", "projen");
    if (!fs.existsSync(marker)) {
      throw missing(dir, "package:java");
    }
    return dir;
  }

  /**
   * Path to the Go module (`dist/go/projen`).
   */
  public get goModule(): string {
    const dir = path.join(this.distDir, "go", "projen");
    if (!fs.existsSync(dir)) {
      throw missing(dir, "package:go");
    }
    return dir;
  }

  /**
   * The version that was built, parsed from the npm tarball filename
   * (`projen-<version>.tgz`). npm always names packed tarballs
   * `<name>-<version>.tgz`.
   */
  public get version(): string {
    const file = path.basename(this.npmTarball);
    const match = /^projen-(.+)\.tgz$/.exec(file);
    if (!match) {
      throw new Error(
        `Unable to parse projen version from tarball name "${file}"`,
      );
    }
    return match[1];
  }

  private single(
    dir: string,
    predicate: (file: string) => boolean,
    packageTask: string,
  ): string {
    let entries: string[] = [];
    try {
      entries = fs.readdirSync(dir).filter(predicate);
    } catch {
      throw missing(dir, packageTask);
    }
    if (entries.length === 0) {
      throw missing(dir, packageTask);
    }
    // Deterministic if more than one artifact somehow exists.
    entries.sort();
    return path.join(dir, entries[0]);
  }
}

function missing(location: string, packageTask: string): Error {
  return new Error(
    `No projen artifact found at ${location}. ` +
      `Run 'npx projen ${packageTask}' (or 'package-all') from the repo root first.`,
  );
}

/**
 * Walks up the directory tree from `startDir` until it finds the projen repo
 * root (a `package.json` whose `name` is `projen`).
 */
export function findRepoRoot(startDir: string): string {
  let dir = path.resolve(startDir);
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const pkg = path.join(dir, "package.json");
    if (fs.existsSync(pkg)) {
      try {
        const json = JSON.parse(fs.readFileSync(pkg, "utf-8"));
        if (json.name === "projen") {
          return dir;
        }
      } catch {
        // ignore unreadable/invalid package.json and keep walking up
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(
        `Could not locate the projen repo root (a package.json named "projen") ` +
          `walking up from ${startDir}. Set PROJEN_DIST_DIR to point at the dist directory.`,
      );
    }
    dir = parent;
  }
}
