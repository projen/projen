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
