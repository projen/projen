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
