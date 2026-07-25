import * as path from "path";

/**
 * A local Python "index" for the prebuilt projen wheel.
 *
 * Rather than run a PEP-503 server, we point pip/uv at the wheel's directory
 * with `--find-links`. projen itself resolves from there; its transitive
 * dependencies (jsii-runtime, constructs, ...) still resolve from PyPI - the
 * same split the npm registry uses (projen local, everything else public).
 */
export class PythonIndex {
  constructor(private readonly wheel: string) {}

  /** Directory passed to `pip install --find-links`. */
  public get findLinks(): string {
    return path.dirname(this.wheel);
  }
}
