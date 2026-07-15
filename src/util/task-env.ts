// Small helpers shared by the release builtin task entrypoints
// (`resolve-tag`, `decide-bump-type`, `apply-bump`).

/**
 * Runs a builtin's async body, exiting non-zero on failure. Prints the error's
 * stack when available, otherwise its message/string form - dax parse errors
 * are not `Error` instances and have no `.stack`, so a naive `console.log(e.stack)`
 * would print a bare "undefined".
 */
export function runBuiltin(body: () => Promise<void>): void {
  body().catch((e: unknown) => {
    const err = e as { stack?: string; message?: string };
    console.error(err?.stack ?? err?.message ?? String(e));
    process.exit(1);
  });
}

/** Returns a required env var, throwing a clear error when it is missing. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

/** Parses an optional integer env var, throwing when it is set but not a number. */
export function intEnv(name: string): number | undefined {
  const raw = process.env[name];
  if (raw == null || raw === "") {
    return undefined;
  }
  const value = parseInt(raw, 10);
  if (Number.isNaN(value)) {
    throw new Error(`${name} must be a number: ${raw}`);
  }
  return value;
}
