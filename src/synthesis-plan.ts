import { createHash, randomBytes } from "crypto";
import * as fs from "fs";
import { createServer } from "net";
import * as path from "path";
import type { FileBase } from "./file";
import type { Project } from "./project";

/** Options for reviewing selected generated files. */
export interface SynthesisPlanOptions {
  /** Maximum total bytes written by the plan, inclusive. @default - unlimited */
  readonly maxWriteBytes?: number;
}

/** One destination in a synthesis review. */
export interface SynthesisEntry {
  /** Path relative to the plan's output directory. */
  readonly path: string;
  /** One of create, update, delete, or unchanged. */
  readonly action: string;
  /** SHA-256 of the previous bytes. @default - absent file */
  readonly beforeHash?: string;
  /** SHA-256 of the resulting bytes. @default - absent file */
  readonly afterHash?: string;
  /** Resulting byte length for a create or update, otherwise zero. */
  readonly writeBytes: number;
}

/** Counts for a synthesis review or application. */
export interface SynthesisSummary {
  /** Number of new files. */
  readonly created: number;
  /** Number of replaced files. */
  readonly updated: number;
  /** Number of removed files. */
  readonly deleted: number;
  /** Number of unchanged destinations. */
  readonly unchanged: number;
  /** Total bytes written. */
  readonly writtenBytes: number;
}

/** Progress and contention notifications for a cooperating transaction. */
export interface ISynthesisObserver {
  /** Called after each changed destination takes its planned value. */
  afterWrite(filePath: string): Promise<void>;
  /** Called once if application encounters an active transaction. */
  onBusy(): Promise<void>;
}

interface Destination {
  path: string;
  before: string | null;
  after: string | null;
}

/** A portable snapshot of selected file changes. */
export class SynthesisPlan {
  /** @internal */
  public static _capture(
    project: Project,
    files: FileBase[],
    options: SynthesisPlanOptions = {},
  ): SynthesisPlan {
    const limit = options.maxWriteBytes;
    if (limit !== undefined && (!Number.isSafeInteger(limit) || limit < 0)) {
      throw new Error("Set maxWriteBytes to a nonnegative safe integer.");
    }
    const root = resolveOutdir(project.outdir);
    const members = new Set(project.node.findAll());
    const selected = [...new Set(files)].map((file) => {
      let owner: Project | undefined = file.project;
      while (owner && owner !== project) {
        owner = owner.parent;
      }
      if (!owner || !members.has(file)) {
        throw new Error(
          "Select files belonging to this project or its descendants.",
        );
      }
      const relative = path
        .relative(project.outdir, file.absolutePath)
        .split(path.sep)
        .join("/");
      const target = checkedPath(root, relative);
      return { file, relative, before: readBytes(target) };
    });
    validateIndependentPaths(selected.map((item) => item.relative));
    const destinations = selected.map(({ file, relative, before }) => {
      const rendered = file.renderContent();
      return {
        path: relative,
        before,
        after:
          rendered === undefined
            ? null
            : Buffer.from(rendered, "utf8").toString("base64"),
      };
    });
    destinations.sort((a, b) =>
      a.path < b.path ? -1 : a.path > b.path ? 1 : 0,
    );
    const plan = new SynthesisPlan(root, destinations);
    if (limit !== undefined && plan.summary.writtenBytes > limit) {
      throw new Error("Increase maxWriteBytes or select fewer changed files.");
    }
    return plan;
  }

  /** Restore a review for an existing output directory. */
  public static deserialize(outdir: string, serialized: string): SynthesisPlan {
    let destinations: Destination[];
    try {
      const envelope = JSON.parse(serialized);
      if (
        typeof envelope.payload !== "string" ||
        digest(envelope.payload) !== envelope.checksum
      ) {
        throw new Error("checksum");
      }
      const data = JSON.parse(envelope.payload);
      if (data.version !== 1 || !Array.isArray(data.destinations)) {
        throw new Error("version");
      }
      destinations = data.destinations;
      let previous: string | undefined;
      for (const item of destinations) {
        if (
          !item ||
          typeof item.path !== "string" ||
          (previous !== undefined && previous >= item.path) ||
          !isBytes(item.before) ||
          !isBytes(item.after)
        ) {
          throw new Error("destination");
        }
        previous = item.path;
      }
      validateIndependentPaths(destinations.map((item) => item.path));
    } catch {
      throw new Error(
        "Invalid synthesis plan. Restore the original serialized review or create a new plan.",
      );
    }
    const root = fs.realpathSync(outdir);
    for (const item of destinations) {
      checkedPath(root, item.path);
    }
    return new SynthesisPlan(root, destinations);
  }

  private constructor(
    private readonly outdir: string,
    private readonly destinations: Destination[],
  ) {}

  /** The reviewed destinations, in ordinal path order. */
  public get entries(): SynthesisEntry[] {
    return this.destinations.map((item) => {
      const action =
        item.before === item.after
          ? "unchanged"
          : item.after === null
            ? "delete"
            : item.before === null
              ? "create"
              : "update";
      return {
        path: item.path,
        action,
        ...(item.before === null ? {} : { beforeHash: hashBytes(item.before) }),
        ...(item.after === null ? {} : { afterHash: hashBytes(item.after) }),
        writeBytes:
          action === "create" || action === "update"
            ? Buffer.from(item.after!, "base64").length
            : 0,
      };
    });
  }

  /** Counts for the captured review. */
  public get summary(): SynthesisSummary {
    const counts = {
      created: 0,
      updated: 0,
      deleted: 0,
      unchanged: 0,
      writtenBytes: 0,
    };
    for (const entry of this.entries) {
      switch (entry.action) {
        case "create":
          counts.created++;
          break;
        case "update":
          counts.updated++;
          break;
        case "delete":
          counts.deleted++;
          break;
        default:
          counts.unchanged++;
          break;
      }
      counts.writtenBytes += entry.writeBytes;
    }
    return counts;
  }

  /** A content identity independent of the output directory. */
  public get fingerprint(): string {
    return digest(this.payload());
  }

  /** Save a review for later application; the encoding is opaque. */
  public serialize(): string {
    const payload = this.payload();
    return JSON.stringify({ payload, checksum: digest(payload) });
  }

  /** Apply or replay this review, restoring touched destinations on failure. */
  public async apply(observer?: ISynthesisObserver): Promise<SynthesisSummary> {
    const root = resolveOutdir(this.outdir);
    const release = await acquire(root, observer);
    try {
      const current = this.destinations.map((item) =>
        readBytes(checkedPath(root, item.path, true)),
      );
      if (
        this.destinations.every((item, index) => current[index] === item.after)
      ) {
        return {
          created: 0,
          updated: 0,
          deleted: 0,
          unchanged: this.destinations.length,
          writtenBytes: 0,
        };
      }
      if (
        !this.destinations.every(
          (item, index) => current[index] === item.before,
        )
      ) {
        throw synthesisConflict();
      }
      const touched: Array<{
        target: string;
        before: string | null;
        mode?: number;
      }> = [];
      try {
        for (const item of this.destinations) {
          if (item.before === item.after) {
            continue;
          }
          const target = checkedPath(root, item.path);
          const mode =
            item.before === null ? undefined : fs.statSync(target).mode;
          touched.push({ target, before: item.before, mode });
          replaceBytes(target, item.after, mode);
          await observer?.afterWrite(item.path);
        }
      } catch (error) {
        const failures: unknown[] = [];
        for (const item of touched.reverse()) {
          try {
            replaceBytes(item.target, item.before, item.mode);
          } catch (rollbackError) {
            failures.push(rollbackError);
          }
        }
        if (failures.length) {
          throw new AggregateError(
            [error, ...failures],
            "Synthesis rollback failed. Restore the affected files before retrying.",
          );
        }
        throw error;
      }
      return this.summary;
    } finally {
      await release();
    }
  }

  private payload(): string {
    return JSON.stringify({ version: 1, destinations: this.destinations });
  }
}

function digest(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

function hashBytes(value: string): string {
  return digest(Buffer.from(value, "base64"));
}

function isBytes(value: unknown): value is string | null {
  return (
    value === null ||
    (typeof value === "string" &&
      Buffer.from(value, "base64").toString("base64") === value)
  );
}

function synthesisConflict(): Error {
  return Object.assign(
    new Error(
      "Selected files changed. Restore the reviewed preimages or create a new synthesis plan.",
    ),
    { code: "SYNTHESIS_CONFLICT" },
  );
}

function resolveOutdir(outdir: string): string {
  const missing: string[] = [];
  let ancestor = path.resolve(outdir);
  for (;;) {
    try {
      const existing = fs.realpathSync(ancestor);
      if (!fs.statSync(existing).isDirectory()) {
        throw new Error("Choose an output directory with directory ancestors.");
      }
      return path.join(existing, ...missing.reverse());
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
      // A dangling link is not a missing directory that application can create.
      if (fs.lstatSync(ancestor, { throwIfNoEntry: false })) {
        throw error;
      }
      missing.push(path.basename(ancestor));
      ancestor = path.dirname(ancestor);
    }
  }
}

function validateIndependentPaths(paths: string[]): void {
  const selected = new Set(paths);
  for (const destination of paths) {
    for (
      let boundary = destination.indexOf("/");
      boundary !== -1;
      boundary = destination.indexOf("/", boundary + 1)
    ) {
      if (selected.has(destination.slice(0, boundary))) {
        throw new Error(
          "Select destination paths that are not ancestors of other selected files.",
        );
      }
    }
  }
}

function checkedPath(root: string, relative: string, applying = false): string {
  const parts = relative.split("/");
  if (
    path.isAbsolute(relative) ||
    path.win32.isAbsolute(relative) ||
    relative.includes("\\") ||
    parts.some((part) => part === "" || part === "." || part === "..")
  ) {
    throw new Error(
      "Select a regular file at a relative path inside the output directory.",
    );
  }
  let target = root;
  for (let index = 0; index < parts.length; index++) {
    target = path.join(target, parts[index]);
    let stat: fs.Stats;
    try {
      stat = fs.lstatSync(target);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        continue;
      }
      throw error;
    }
    if (
      stat.isSymbolicLink() ||
      (index === parts.length - 1 ? !stat.isFile() : !stat.isDirectory())
    ) {
      if (applying) {
        throw synthesisConflict();
      }
      throw new Error(
        "Select regular files without symbolic links or non-directory ancestors.",
      );
    }
  }
  return target;
}

function readBytes(target: string): string | null {
  try {
    return fs.readFileSync(target).toString("base64");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

function replaceBytes(
  target: string,
  bytes: string | null,
  mode?: number,
): void {
  if (fs.existsSync(target)) {
    // eslint-disable-next-line no-bitwise -- Temporarily permit replacement of a readonly generated file.
    fs.chmodSync(target, (mode ?? fs.statSync(target).mode) | 0o200);
    // Replace this directory entry without changing bytes through other hard links.
    fs.unlinkSync(target);
  }
  if (bytes === null) {
    fs.rmSync(target, { force: true });
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, Buffer.from(bytes, "base64"));
  if (mode !== undefined) {
    fs.chmodSync(target, mode);
  }
}

async function acquire(
  root: string,
  observer?: ISynthesisObserver,
): Promise<() => void | Promise<void>> {
  const identity = process.platform === "win32" ? root.toLowerCase() : root;
  // All writers use the same namespace, regardless of parent permissions or TMPDIR.
  const parent =
    process.platform === "win32"
      ? path.join(process.env.SystemRoot ?? "C:\\Windows", "Temp")
      : "/tmp";
  const relative = path.relative(root, fs.realpathSync(parent));
  if (
    relative === "" ||
    (!path.isAbsolute(relative) &&
      relative !== ".." &&
      !relative.startsWith(`..${path.sep}`))
  ) {
    return acquireSocket(identity, observer);
  }
  const lock = path.join(parent, `.projen-synthesis-${digest(identity)}.lock`);
  const candidate = fs.mkdtempSync(path.join(parent, ".projen-synthesis-"));
  const claim = path.join(candidate, "owner.json");
  try {
    fs.writeFileSync(
      claim,
      JSON.stringify({ root: identity, pid: process.pid }),
    );
    fs.chmodSync(claim, 0o644);
    let notified = false;
    for (;;) {
      try {
        // Publish a complete owner record atomically, without replacing an owner.
        fs.linkSync(claim, lock);
        return () => {
          // Free the pathname before deletion can leave it pending on Windows.
          const retired = `${lock}.${randomBytes(16).toString("hex")}`;
          fs.renameSync(lock, retired);
          fs.unlinkSync(retired);
        };
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
          throw error;
        }
      }
      let owner: { root?: unknown; pid?: unknown };
      try {
        if (!fs.lstatSync(lock).isFile()) {
          throw new Error("not a lock file");
        }
        owner = JSON.parse(fs.readFileSync(lock, "utf8"));
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
          continue;
        }
        throw new Error(`Move the unrelated entry at ${lock} before applying.`);
      }
      if (
        !owner ||
        owner.root !== identity ||
        typeof owner.pid !== "number" ||
        !Number.isSafeInteger(owner.pid) ||
        owner.pid <= 0
      ) {
        throw new Error(`Move the unrelated entry at ${lock} before applying.`);
      }
      try {
        process.kill(owner.pid, 0);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ESRCH") {
          throw new Error(
            `Synthesis owner ${owner.pid} exited. Check the selected files and remove ${lock} before retrying.`,
          );
        }
        if ((error as NodeJS.ErrnoException).code !== "EPERM") {
          throw error;
        }
      }
      if (!notified) {
        notified = true;
        await observer?.onBusy();
      }
      await new Promise<void>((resolve) => setTimeout(resolve, 5));
    }
  } finally {
    fs.rmSync(claim, { force: true });
    fs.rmdirSync(candidate);
  }
}

// A filesystem root may contain every available lock directory. In that case
// retain the lease in the kernel instead of reserving a generated-file path.
async function acquireSocket(
  identity: string,
  observer?: ISynthesisObserver,
): Promise<() => Promise<void>> {
  const port = 49152 + (parseInt(digest(identity).slice(0, 8), 16) % 16384);
  let notified = false;
  for (;;) {
    const server = createServer((socket) => socket.destroy());
    try {
      await new Promise<void>((resolve, reject) => {
        server.once("error", reject);
        server.listen({ host: "127.0.0.1", port, exclusive: true }, () => {
          server.removeListener("error", reject);
          resolve();
        });
      });
      return () =>
        new Promise<void>((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EADDRINUSE") {
        throw error;
      }
    }
    if (!notified) {
      notified = true;
      await observer?.onBusy();
    }
    await new Promise<void>((resolve) => setTimeout(resolve, 5));
  }
}
