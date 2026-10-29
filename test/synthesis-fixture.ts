import * as fs from "fs";
import { tmpdir } from "os";
import * as path from "path";
import * as api from "../src";
import { FileBase, Project } from "../src";

export interface Review {
  entries: Array<{
    path: string;
    action: string;
    beforeHash?: string;
    afterHash?: string;
    writeBytes: number;
  }>;
  summary: {
    created: number;
    updated: number;
    deleted: number;
    unchanged: number;
    writtenBytes: number;
  };
  fingerprint: string;
  serialize(): string;
  apply(observer?: Observer): Promise<Review["summary"]>;
}

export interface Observer {
  afterWrite(filePath: string): Promise<void>;
  onBusy(): Promise<void>;
}

export const roots: string[] = [];

export function project(): Project {
  const outdir = fs.mkdtempSync(path.join(tmpdir(), "projen-review-"));
  roots.push(outdir);
  return new Project({ name: "review", outdir });
}

export function clean(): void {
  for (const root of roots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

export class RenderedFile extends FileBase {
  public renders = 0;
  public constructor(
    owner: Project,
    filePath: string,
    public content?: string,
  ) {
    super(owner, filePath, { marker: false, readonly: false });
  }
  protected synthesizeContent(): string | undefined {
    this.renders++;
    return this.content;
  }
}

export function plan(
  owner: Project,
  files: FileBase[],
  options?: { maxWriteBytes?: number },
): Review {
  const method = (owner as any).planSynthesis;
  expect(typeof method).toBe("function");
  return method.call(owner, files, options);
}

export function restore(outdir: string, serialized: string): Review {
  const type = (api as any).SynthesisPlan;
  expect(typeof type?.deserialize).toBe("function");
  return type.deserialize(outdir, serialized);
}

export function put(
  owner: Project,
  filePath: string,
  bytes: string | Buffer,
): void {
  const target = path.join(owner.outdir, filePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, bytes);
}

export function get(owner: Project, filePath: string): Buffer | undefined {
  const target = path.join(owner.outdir, filePath);
  return fs.existsSync(target) ? fs.readFileSync(target) : undefined;
}

export function observer(
  afterWrite: Observer["afterWrite"] = async () => {},
): Observer {
  return {
    afterWrite,
    onBusy: async () => {
      throw new Error("Unexpected contention in a sequential application");
    },
  };
}

export function deferred(): { promise: Promise<void>; resolve(): void } {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
