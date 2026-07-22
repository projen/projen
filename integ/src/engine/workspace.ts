import * as fs from "fs";
import * as os from "os";
import * as path from "path";

/**
 * A temporary working directory with guaranteed cleanup.
 *
 * Cross-platform: uses `fs.mkdtemp` under the OS temp dir and `fs.rmSync` with
 * `recursive`+`force` for teardown, so it works identically on unix and
 * Windows.
 */
export class Workspace {
  /**
   * Creates a new temporary workspace directory.
   *
   * @param prefix a short prefix for the directory name (default `projen-integ-`)
   */
  public static create(prefix = "projen-integ-"): Workspace {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
    return new Workspace(dir);
  }

  private disposed = false;

  private constructor(public readonly dir: string) {}

  /**
   * Absolute path to a file/dir within the workspace.
   */
  public path(...segments: string[]): string {
    return path.join(this.dir, ...segments);
  }

  /**
   * Creates a subdirectory within the workspace and returns its absolute path.
   */
  public mkdir(...segments: string[]): string {
    const p = this.path(...segments);
    fs.mkdirSync(p, { recursive: true });
    return p;
  }

  /**
   * Writes a file within the workspace (creating parent dirs as needed).
   */
  public write(relativePath: string, content: string): string {
    const p = this.path(relativePath);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content);
    return p;
  }

  /**
   * Removes the workspace directory and everything in it. Idempotent.
   *
   * Best-effort: on Windows, temp files created by toolchains (go, npm, ...)
   * can briefly hold locks or be read-only, making removal fail with EPERM.
   * We retry, and never throw - failing to clean a temp dir must not fail an
   * otherwise-passing test (the OS reclaims it).
   */
  public dispose(): void {
    if (this.disposed) {
      return;
    }
    this.disposed = true;
    try {
      fs.rmSync(this.dir, {
        recursive: true,
        force: true,
        maxRetries: 3,
        retryDelay: 200,
      });
    } catch {
      // ignore - see doc comment above
    }
  }
}

/**
 * Runs `fn` with a freshly created workspace and guarantees cleanup afterwards,
 * even if `fn` throws.
 */
export async function withWorkspace<T>(
  fn: (workspace: Workspace) => T | Promise<T>,
  prefix?: string,
): Promise<T> {
  const workspace = Workspace.create(prefix);
  try {
    return await fn(workspace);
  } finally {
    workspace.dispose();
  }
}
