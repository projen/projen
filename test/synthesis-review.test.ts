import { createHash } from "crypto";
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import {
  Component,
  JsonFile,
  JsonPatch,
  Project,
  TextFile,
  YamlFile,
} from "../src";
import {
  clean,
  get,
  plan,
  project,
  put,
  RenderedFile,
  restore,
} from "./synthesis-fixture";
import { worker } from "./synthesis-process";

afterEach(clean);

test("captures resolved patched JSON YAML and text through existing file renderers", async () => {
  const p = project();
  const json = new JsonFile(p, "config.json", {
    obj: { version: () => "v1", items: ["keep"] },
    marker: false,
  });
  json.addOverride("enabled", true);
  json.patch(JsonPatch.add("/items/-", "extra"));
  const yaml = new YamlFile(p, "config.yml", {
    obj: { answer: () => 12 },
    marker: false,
  });
  yaml.patch(JsonPatch.replace("/answer", 42));
  const text = new TextFile(p, "notice.txt", {
    lines: ["first", "second"],
    marker: false,
  });
  const review = plan(p, [yaml, text, json]);
  await review.apply();
  expect(JSON.parse(get(p, "config.json")!.toString())).toEqual({
    version: "v1",
    items: ["keep", "extra"],
    enabled: true,
  });
  expect(get(p, "config.yml")!.toString()).toContain("answer: 42");
  expect(get(p, "notice.txt")!.toString()).toBe("first\nsecond");
});

test("deduplicates selected files before invoking their renderers", async () => {
  const p = project();
  const a = new RenderedFile(p, "a", "same");
  const b = new RenderedFile(p, "b", "same");
  const review = plan(p, [a, b, a, b, a]);
  expect([a.renders, b.renders]).toEqual([1, 1]);
  expect(review.entries.map((entry) => entry.path)).toEqual(["a", "b"]);
  expect(review.summary).toEqual({
    created: 2,
    updated: 0,
    deleted: 0,
    unchanged: 0,
    writtenBytes: 8,
  });
  await review.apply();
  expect([a.renders, b.renders]).toEqual([1, 1]);
});

test("validates the entire selection and accepts descendant files", async () => {
  const p = project();
  const child = new Project({ name: "child", parent: p, outdir: "nested" });
  const nested = new RenderedFile(child, "inside", "child");
  await plan(p, [nested]).apply();
  expect(get(p, "nested/inside")!.toString()).toBe("child");
  const good = new RenderedFile(p, "good", "good");
  const unrelated = new Project({
    name: "unrelated",
    outdir: path.join(p.outdir, "other-project"),
  });
  const foreign = new RenderedFile(unrelated, "foreign", "bad");
  expect(() => plan(p, [good, foreign])).toThrow();
  expect(good.renders).toBe(0);
  const escape = new RenderedFile(p, "../outside", "bad");
  expect(() => plan(p, [good, escape])).toThrow();
  const outside = project();
  put(outside, "target", "external");
  fs.symlinkSync(outside.outdir, path.join(p.outdir, "linked"), "junction");
  const linked = new RenderedFile(p, "linked/target", "bad");
  expect(() => plan(p, [good, linked])).toThrow();
  const linkedLeaf = new RenderedFile(p, "linked-leaf", "bad");
  fs.symlinkSync(
    path.join(outside.outdir, "target"),
    path.join(p.outdir, "linked-leaf"),
  );
  expect(() => plan(p, [good, linkedLeaf])).toThrow();
  expect([good.renders, linkedLeaf.renders]).toEqual([0, 0]);
  expect(get(outside, "target")!.toString()).toBe("external");
  fs.mkdirSync(path.join(p.outdir, "directory"));
  expect(() => plan(p, [new RenderedFile(p, "directory", "bad")])).toThrow();
  put(p, "blocker", "file");
  expect(() =>
    plan(p, [new RenderedFile(p, "blocker/child", "bad")]),
  ).toThrow();
  expect(good.renders).toBe(0);
  expect(get(outside, "target")!.toString()).toBe("external");
});

test("preview leaves disk lifecycle hooks and synthesis status untouched", () => {
  const p = project();
  const calls: string[] = [];
  p.preSynthesize = () => {
    calls.push("pre");
  };
  p.postSynthesize = () => {
    calls.push("post");
  };
  class SideEffect extends Component {
    public synthesize() {
      calls.push("component");
      put(p, "unrelated", "bad");
    }
  }
  new SideEffect(p);
  put(p, "selected", "before");
  put(p, "keep", "unrelated");
  const selected = new RenderedFile(p, "selected", "after");
  const before = fs.readdirSync(p.outdir).sort();
  const review = plan(p, [selected]);
  review.serialize();
  expect(fs.readdirSync(p.outdir).sort()).toEqual(before);
  expect(get(p, "selected")!.toString()).toBe("before");
  expect(get(p, "keep")!.toString()).toBe("unrelated");
  expect(selected.changed).toBeUndefined();
  expect(calls).toEqual([]);
});

test("distinguishes undefined empty and exact UTF8 bytes from binary preimages", async () => {
  const p = project();
  const binary = Buffer.from([0, 255, 128, 13, 10]);
  put(p, "binary", binary);
  const files = [
    new RenderedFile(p, "binary"),
    new RenderedFile(p, "absent"),
    new RenderedFile(p, "empty", ""),
    new RenderedFile(p, "verbatim", "\ufeffcafé\r\n"),
  ];
  const review = plan(p, files);
  expect(review.entries.map((entry) => [entry.path, entry.action])).toEqual([
    ["absent", "unchanged"],
    ["binary", "delete"],
    ["empty", "create"],
    ["verbatim", "create"],
  ]);
  await review.apply();
  expect(get(p, "binary")).toBeUndefined();
  expect(get(p, "absent")).toBeUndefined();
  expect(get(p, "empty")).toEqual(Buffer.alloc(0));
  expect(get(p, "verbatim")).toEqual(Buffer.from("\ufeffcafé\r\n"));
});

test("orders paths ordinally and produces environment independent plans", async () => {
  const a = project();
  const b = project();
  const entries = [
    ["z", "z"],
    ["a", "a"],
    ["Ä", "umlaut"],
    ["B", "upper"],
    ["sub/x", "nested"],
  ];
  for (const p of [a, b]) {
    put(p, "a", "old");
  }
  fs.utimesSync(path.join(a.outdir, "a"), 100, 100);
  fs.utimesSync(path.join(b.outdir, "a"), 999, 999);
  const left = worker({
    HOME: "/home/left",
    LANG: "en_US.UTF-8",
    LC_ALL: "en_US.UTF-8",
  });
  const right = worker({
    HOME: "/home/right",
    LANG: "sv_SE.UTF-8",
    LC_ALL: "sv_SE.UTF-8",
  });
  try {
    expect((await left.next()).event).toBe("ready");
    expect((await right.next()).event).toBe("ready");
    left.send({ kind: "start", root: a.outdir, files: entries, preview: true });
    right.send({
      kind: "start",
      root: b.outdir,
      files: [...entries].reverse(),
      preview: true,
    });
    const x = await left.next();
    const y = await right.next();
    expect(x.event).toBe("done");
    expect(y.event).toBe("done");
    expect(x.entries.map((entry: any) => entry.path)).toEqual([
      "B",
      "a",
      "sub/x",
      "z",
      "Ä",
    ]);
    expect(x.serialized).toBe(y.serialized);
    expect(x.fingerprint).toBe(y.fingerprint);
  } finally {
    await Promise.all([left.stop(), right.stop()]);
  }
}, 30000);

test("preview hashes and counters account for every distinct path exactly", () => {
  const p = project();
  put(p, "replace", "old");
  put(p, "delete", Buffer.from([0, 255]));
  put(p, "same", "same");
  const hash = (value: string | Buffer) =>
    createHash("sha256").update(value).digest("hex");
  const create = new RenderedFile(p, "create", "é");
  const review = plan(p, [
    create,
    new RenderedFile(p, "replace", "💡"),
    new RenderedFile(p, "delete"),
    new RenderedFile(p, "same", "same"),
    new RenderedFile(p, "missing"),
    create,
  ]);
  expect(review.summary).toEqual({
    created: 1,
    updated: 1,
    deleted: 1,
    unchanged: 2,
    writtenBytes: 6,
  });
  expect(review.entries).toEqual([
    {
      path: "create",
      action: "create",
      beforeHash: undefined,
      afterHash: hash("é"),
      writeBytes: 2,
    },
    {
      path: "delete",
      action: "delete",
      beforeHash: hash(Buffer.from([0, 255])),
      afterHash: undefined,
      writeBytes: 0,
    },
    {
      path: "missing",
      action: "unchanged",
      beforeHash: undefined,
      afterHash: undefined,
      writeBytes: 0,
    },
    {
      path: "replace",
      action: "update",
      beforeHash: hash("old"),
      afterHash: hash("💡"),
      writeBytes: 4,
    },
    {
      path: "same",
      action: "unchanged",
      beforeHash: hash("same"),
      afterHash: hash("same"),
      writeBytes: 0,
    },
  ]);
  for (const entry of review.entries) {
    expect(Object.prototype.hasOwnProperty.call(entry, "beforeHash")).toBe(
      !["create", "missing"].includes(entry.path),
    );
    expect(Object.prototype.hasOwnProperty.call(entry, "afterHash")).toBe(
      !["delete", "missing"].includes(entry.path),
    );
  }
});

test("enforces inclusive byte limits with zero and invalid numeric boundaries", () => {
  const p = project();
  const a = new RenderedFile(p, "a", "é💡");
  put(p, "same", "large unchanged content");
  const same = new RenderedFile(p, "same", "large unchanged content");
  expect(plan(p, [a, a, same], { maxWriteBytes: 6 }).summary.writtenBytes).toBe(
    6,
  );
  expect(() => plan(p, [a, same], { maxWriteBytes: 5 })).toThrow();
  expect(
    plan(p, [a], { maxWriteBytes: Number.MAX_SAFE_INTEGER }).summary
      .writtenBytes,
  ).toBe(6);
  put(p, "delete", "old");
  const zero = [
    new RenderedFile(p, "empty", ""),
    new RenderedFile(p, "delete"),
    same,
  ];
  expect(plan(p, zero, { maxWriteBytes: 0 }).summary.writtenBytes).toBe(0);
  expect(() =>
    plan(p, [new RenderedFile(p, "one", "x")], { maxWriteBytes: 0 }),
  ).toThrow();
  expect(plan(p, [], { maxWriteBytes: 0 }).entries).toEqual([]);
  for (const invalid of [-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    expect(() => plan(p, [], { maxWriteBytes: invalid })).toThrow();
  }
});

test("captured plans resist configuration and returned preview mutations", async () => {
  const p = project();
  const file = new RenderedFile(p, "x", "captured");
  const review = plan(p, [file]);
  const serialized = review.serialize();
  const fingerprint = review.fingerprint;
  file.content = "later";
  try {
    review.entries[0].path = "wrong";
  } catch {}
  try {
    review.entries.splice(0);
  } catch {}
  try {
    review.summary.writtenBytes = 999;
  } catch {}
  expect(review.serialize()).toBe(serialized);
  expect(review.fingerprint).toBe(fingerprint);
  expect(review.entries[0].path).toBe("x");
  expect(review.summary.writtenBytes).toBe(8);
  await review.apply();
  expect(get(p, "x")!.toString()).toBe("captured");
  expect(get(p, "wrong")).toBeUndefined();
});

test("fingerprints bind all file states and opaque serialization reopens after corruption", async () => {
  const seen = new Set<string>();
  for (const [name, before, after] of [
    ["x", undefined, "a"],
    ["y", undefined, "a"],
    ["x", "", "a"],
    ["x", "b", "a"],
    ["x", undefined, "b"],
    ["x", undefined, ""],
    ["x", undefined, undefined],
  ]) {
    const p = project();
    if (before !== undefined) put(p, name!, before);
    seen.add(plan(p, [new RenderedFile(p, name!, after)]).fingerprint);
  }
  expect(seen.size).toBe(7);
  const p = project();
  const other = project();
  const review = plan(p, [new RenderedFile(p, "x", "portable")]);
  const serialized = review.serialize();
  expect(() =>
    restore(
      other.outdir,
      serialized.slice(0, Math.floor(serialized.length / 2)),
    ),
  ).toThrow();
  expect(() => restore(other.outdir, "not a serialized plan")).toThrow();
  const characters = Array.from(serialized);
  const alphabet = [...new Set(characters)];
  for (let index = 0; index < characters.length; index++) {
    for (const replacement of alphabet) {
      if (replacement === characters[index]) continue;
      const corrupted = [
        ...characters.slice(0, index),
        replacement,
        ...characters.slice(index + 1),
      ].join("");
      expect(() => restore(other.outdir, corrupted)).toThrow();
    }
  }
  expect(fs.readdirSync(other.outdir)).toEqual([]);
  const reopened = restore(other.outdir, serialized);
  expect(reopened.entries).toEqual(review.entries);
  expect(reopened.summary).toEqual(review.summary);
  expect(reopened.serialize()).toBe(serialized);
  const child = worker();
  try {
    expect((await child.next()).event).toBe("ready");
    child.send({ kind: "start", root: other.outdir, serialized });
    expect((await child.next()).event).toBe("written");
    expect(await child.next()).toEqual({
      event: "done",
      result: review.summary,
    });
    expect(get(other, "x")!.toString()).toBe("portable");
    expect(get(p, "x")).toBeUndefined();
  } finally {
    await child.stop();
  }
}, 30000);

test("plans absent output directories without creating them and applies the snapshot", async () => {
  const parent = project();
  const alias = path.join(parent.outdir, "alias");
  fs.symlinkSync(parent.outdir, alias, "dir");
  const p = new Project({
    name: "fresh",
    outdir: path.join(alias, "missing", "nested"),
  });
  const file = new RenderedFile(p, "sub/result", "captured");
  const review = plan(p, [file, file]);
  expect(fs.existsSync(p.outdir)).toBe(false);
  expect(file.renders).toBe(1);
  expect(file.changed).toBeUndefined();
  expect(review.summary).toEqual({
    created: 1,
    updated: 0,
    deleted: 0,
    unchanged: 0,
    writtenBytes: 8,
  });
  const saved = review.serialize();
  expect(fs.existsSync(p.outdir)).toBe(false);
  file.content = "later";
  await expect(review.apply()).resolves.toEqual(review.summary);
  expect(get(p, "sub/result")!.toString()).toBe("captured");
  await expect(restore(p.outdir, saved).apply()).resolves.toMatchObject({
    created: 0,
    unchanged: 1,
    writtenBytes: 0,
  });
});

test("exports the public planning and application types from the package root", () => {
  const p = project();
  const entry = path.join(p.outdir, "consumer.ts");
  const packageRoot = JSON.stringify(path.resolve(__dirname, ".."));
  fs.writeFileSync(
    entry,
    `
    import { FileBase, Project, SynthesisPlan, SynthesisPlanOptions,
      SynthesisSummary, ISynthesisObserver } from ${packageRoot};
    const options: SynthesisPlanOptions = {};
    const limited: SynthesisPlanOptions = { maxWriteBytes: 0 };
    const capture: (files: FileBase[], options?: SynthesisPlanOptions) => SynthesisPlan
      = Project.prototype.planSynthesis;
    const apply: (observer?: ISynthesisObserver) => Promise<SynthesisSummary>
      = SynthesisPlan.prototype.apply;
    const restore: (outdir: string, serialized: string) => SynthesisPlan
      = SynthesisPlan.deserialize;
    const observer: ISynthesisObserver = {
      afterWrite: async (path: string) => {}, onBusy: async () => {},
    };
    const summary: SynthesisSummary = {
      created: 0, updated: 0, deleted: 0, unchanged: 0, writtenBytes: 0,
    };
  `,
  );
  const program = ts.createProgram([entry], {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    types: [],
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
  });
  const diagnostics = ts
    .getPreEmitDiagnostics(program)
    .map((diagnostic) =>
      ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
    );
  expect(diagnostics).toEqual([]);
});

test("rejects removed file objects before rendering and accepts their replacements", async () => {
  const p = project();
  put(p, "replaced", "before");
  const good = new RenderedFile(p, "good", "good");
  const removed = new RenderedFile(p, "replaced", "obsolete");
  expect(p.tryRemoveFile("replaced")).toBe(removed);
  expect(() => plan(p, [good, removed])).toThrow();
  const replacement = new RenderedFile(p, "replaced", "after");
  expect(() => plan(p, [good, removed, replacement])).toThrow();
  expect([good.renders, removed.renders, replacement.renders]).toEqual([
    0, 0, 0,
  ]);
  expect(get(p, "replaced")!.toString()).toBe("before");
  expect(get(p, "good")).toBeUndefined();
  const review = plan(p, [replacement, replacement]);
  expect(review.entries.map((entry) => entry.path)).toEqual(["replaced"]);
  expect(replacement.renders).toBe(1);
  const other = project();
  put(other, "replaced", "before");
  const reopened = restore(other.outdir, review.serialize());
  expect(await reopened.apply()).toEqual(review.summary);
  expect(get(other, "replaced")!.toString()).toBe("after");
});

test("rejects selected ancestor paths before any rendering", () => {
  for (const reversed of [false, true]) {
    const p = project();
    expect(plan(p, []).entries).toEqual([]);
    const ancestor = new RenderedFile(p, "a");
    const descendant = new RenderedFile(p, "a/deep/result", "x");
    const between = new RenderedFile(p, "a-sibling", "valid");
    const files = [ancestor, between, descendant];
    if (reversed) files.reverse();
    expect(() => plan(p, files)).toThrow();
    expect(files.map((file) => file.renders)).toEqual([0, 0, 0]);
    expect(fs.readdirSync(p.outdir)).toEqual([]);
  }
});

test("distinct path components remain independently applicable and portable", async () => {
  const p = project();
  const review = plan(p, [
    new RenderedFile(p, "a", "root"),
    new RenderedFile(p, "ab/child", "child"),
    new RenderedFile(p, "a-sibling", "sibling"),
  ]);
  const other = project();
  const restored = restore(other.outdir, review.serialize());
  await expect(restored.apply()).resolves.toEqual(review.summary);
  expect(get(other, "a")!.toString()).toBe("root");
  expect(get(other, "ab/child")!.toString()).toBe("child");
  expect(get(other, "a-sibling")!.toString()).toBe("sibling");
  await expect(restored.apply()).resolves.toEqual({
    created: 0,
    updated: 0,
    deleted: 0,
    unchanged: 3,
    writtenBytes: 0,
  });
});

test("applies the byte limit to the aggregate of changed destinations", () => {
  const p = project();
  put(p, "updated", "old");
  const created = new RenderedFile(p, "created", "é");
  const updated = new RenderedFile(p, "updated", "💡");
  const files = [created, updated, created];
  expect(() => plan(p, files, { maxWriteBytes: 5 })).toThrow();
  expect(plan(p, files, { maxWriteBytes: 6 }).summary).toEqual({
    created: 1,
    updated: 1,
    deleted: 0,
    unchanged: 0,
    writtenBytes: 6,
  });
});
