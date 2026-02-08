import { relative } from "node:path";
import { Project } from "../../project";
import { normalizePersistedPath } from "../../util";
import { ensureRelativePathStartsWithDot } from "../../util/path";

export function secretToString(secretName: string): string {
  return `\${{ secrets.${secretName} }}`;
}

export function context(value: string) {
  return `\${{ ${value} }}`;
}

// Checks if part of the file path is hidden
export function isHiddenPath(path: string) {
  return /(^|\/)\.[^\/\.]/g.test(path);
}

// Helper to assert a path is not hidden
export function ensureNotHiddenPath(value: string, name: string) {
  if (isHiddenPath(value)) {
    throw Error(`${name} cannot be a hidden path, got: ${value}`);
  }
}

/**
 * Turn any JavaScript value into a GitHub expression
 */
export function toGitHubExpr(x: NonNullable<any>): string {
  switch (typeof x) {
    case "string":
      return `'${x.replace(/'/g, `''`)}'`;
    case "number":
    case "boolean":
      // The JSON representation of this value is also the GH representation of this value
      return JSON.stringify(x);
    case "object":
      if (x === null) {
        return "null";
      }
      return `fromJSON(${toGitHubExpr(JSON.stringify(x))})`;
    default:
      throw new Error(`Unsupported type: ${typeof x}`);
  }
}

/**
 * Returns the relative path of a project from the root of the repository
 *
 * This is a bit of hack at the moment, because projects currently don't have the concept of a repository.
 * The `.github` directory is always created within the outdir of the root project.
 * Consequently this means a GitHub root project cannot really have an outdir and GH Workflows at the same time.
 * Or in other words, the outdir of the root project is to be assumed the repository root.
 *
 * This helper function can be used to retrieve the correct `working-directory` for a given project.
 *
 * @returns path to be used as `working-directory` of a GitHub workflow, this is never empty and will return `./` for the root project
 */
export function projectPathRelativeToRepoRoot(project: Project): string {
  return ensureRelativePathStartsWithDot(
    normalizePersistedPath(relative(project.root.outdir, project.outdir)),
  );
}
