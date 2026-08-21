import { realpathSync } from "node:fs";
import {
  basename,
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep,
} from "node:path";

/**
 * Helper function to format a path as dot notation regardless of how it
 * was handed in.
 *
 * @param path - can be formatted as "path", "./path" (but not "/path", as it is absolute)
 * @returns "./path"
 */
export function ensureRelativePathStartsWithDot(path: string): string {
  if (path.startsWith(".")) {
    return path;
  }

  if (path.startsWith("/")) {
    throw new Error(`Path ${path} must be relative`);
  }

  return `./${path}`;
}

/**
 * Checks if part of the file path is hidden
 */
export function isHiddenPath(path: string) {
  return /(^|\/)\.[^\/\.]/g.test(path);
}

/**
 * Helper to assert a path is not hidden
 */
export function ensureNotHiddenPath(value: string, name: string) {
  if (isHiddenPath(value)) {
    throw Error(`${name} cannot be a hidden path, got: ${value}`);
  }
}

/**
 * Checks if `file` is strictly inside `dir` (the directory itself does not count).
 *
 * Purely lexical: does not consult the filesystem, so symlinks are not
 * resolved. Relative paths are resolved against the current working directory.
 */
export function isPathInside(dir: string, file: string): boolean {
  const rel = relative(dir, file);
  return (
    rel !== "" &&
    !rel.startsWith(`..${sep}`) &&
    rel !== ".." &&
    !isAbsolute(rel)
  );
}

/**
 * Resolves symlinks in `p`, falling back to the closest existing ancestor for
 * paths that do not exist (yet).
 */
export function realpathOfClosestExisting(p: string): string {
  const missing = new Array<string>();
  let current = resolve(p);

  while (true) {
    try {
      return join(realpathSync(current), ...missing);
    } catch {
      const parent = dirname(current);
      if (parent === current) {
        return resolve(p);
      }
      missing.unshift(basename(current));
      current = parent;
    }
  }
}

/**
 * Asserts that a path stays strictly inside a project directory.
 *
 * Use this before passing a user-configurable path to a destructive command
 * (e.g. `rm -fr`): an absolute path or a path traversing outside of the
 * project directory (via `..` or a symlink) could otherwise delete files
 * anywhere on the machine. The project directory itself (`.`) is also
 * rejected.
 *
 * The check resolves both paths on the filesystem (symlinks in existing path
 * segments are followed). The last segment of the path is intentionally kept
 * as-is: a symlink inside the project only affects the link itself.
 *
 * @param value the path to check, relative to the project directory
 * @param name name of the option, used in the error message
 * @param projectDir the project directory the path must stay inside of
 * @throws if the path is absolute or does not stay inside the project directory
 */
export function ensurePathInsideProject(
  value: string,
  name: string,
  projectDir: string,
) {
  if (isAbsolute(value)) {
    throw new Error(
      `${name} must be a relative path within the project directory, got absolute path: ${value}`,
    );
  }

  const baseDir = realpathOfClosestExisting(projectDir);
  const resolved = resolve(baseDir, value);

  if (!isPathInside(baseDir, resolved)) {
    throw new Error(
      `${name} must be inside the project directory, got: ${value}`,
    );
  }

  // the path might traverse outside of the project through a symlinked
  // directory, which a lexical `resolve` cannot detect
  const realParent = realpathOfClosestExisting(dirname(resolved));
  if (!isPathInside(baseDir, join(realParent, basename(resolved)))) {
    throw new Error(
      `${name} must be inside the project directory, but points outside of it through a symlink, got: ${value}`,
    );
  }
}
