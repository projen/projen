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
