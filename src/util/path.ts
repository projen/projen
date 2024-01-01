/**
 * Helper function to format a path as dot notation regardless of how it
 * was handed in.
 *
 * @param path - can be formatted as "path", "./path", or "/path"
 * @returns "./path"
 */
export function formatPathAsDotNotation(path: string): string {
  if (path.startsWith(".")) {
    return path;
  }

  if (path.startsWith("/")) {
    return `.${path}`;
  }

  return `./${path}`;
}
