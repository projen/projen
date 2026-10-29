import { spawnSync } from "child_process";
import { createHash } from "crypto";
import * as fs from "fs";
import * as path from "path";
import { Project } from "../src";
import {
  clean,
  deferred,
  get,
  observer,
  plan,
  project,
  put,
  RenderedFile,
  restore,
} from "./synthesis-fixture";
import { worker } from "./synthesis-process";

afterEach(clean);

test("checks the full preimage set before writing and permits exact repair", async () => {
  const p = project();
  put(p, "z-unchanged", Buffer.from([0, 255]));
  const change = new RenderedFile(p, "a-change", "result");
  const unchanged = new RenderedFile(p, "z-unchanged", "same");
  put(p, "z-unchanged", "same");
  const absent = new RenderedFile(p, "missing");
  const review = plan(p, [change, unchanged, absent]);
  put(p, "z-unchanged", "external");
  await expect(review.apply()).rejects.toMatchObject({
    code: "SYNTHESIS_CONFLICT",
  });
  expect(get(p, "a-change")).toBeUndefined();
  expect(get(p, "z-unchanged")!.toString()).toBe("external");
  put(p, "z-unchanged", "same");
  put(p, "missing", "");
  await expect(review.apply()).rejects.toMatchObject({
    code: "SYNTHESIS_CONFLICT",
  });
  expect(get(p, "a-change")).toBeUndefined();
  fs.unlinkSync(path.join(p.outdir, "missing"));
  await expect(review.apply()).resolves.toEqual(review.summary);
  expect(get(p, "a-change")!.toString()).toBe("result");
});

test("replay uses complete postimages and never accepts a partial application", async () => {
  const p = project();
  put(p, "a", "old-a");
  put(p, "b", "old-b");
  const review = plan(p, [
    new RenderedFile(p, "a", "new-a"),
    new RenderedFile(p, "b", "new-b"),
    new RenderedFile(p, "gone"),
  ]);
  put(p, "a", "new-a");
  await expect(review.apply()).rejects.toMatchObject({
    code: "SYNTHESIS_CONFLICT",
  });
  expect(get(p, "b")!.toString()).toBe("old-b");
  put(p, "a", "old-a");
  await expect(review.apply()).resolves.toEqual(review.summary);
  const seen: string[] = [];
  await expect(
    restore(p.outdir, review.serialize()).apply(
      observer(async (name) => {
        seen.push(name);
      }),
    ),
  ).resolves.toEqual({
    created: 0,
    updated: 0,
    deleted: 0,
    unchanged: 3,
    writtenBytes: 0,
  });
  expect(seen).toEqual([]);
  await expect(plan(p, []).apply()).resolves.toEqual({
    created: 0,
    updated: 0,
    deleted: 0,
    unchanged: 0,
    writtenBytes: 0,
  });
});

test("rollback restores binary updates deletions and prior absence after callback failure", async () => {
  const p = project();
  const binary = Buffer.from([0, 255, 128, 1, 13, 10]);
  put(p, "a-update", binary);
  put(p, "b-delete", binary);
  put(p, "unrelated", "keep");
  fs.linkSync(path.join(p.outdir, "a-update"), path.join(p.outdir, "alias"));
  const review = plan(p, [
    new RenderedFile(p, "a-update", "new"),
    new RenderedFile(p, "b-delete"),
    new RenderedFile(p, "c-create", "created"),
  ]);
  const calls: string[] = [];
  await expect(
    review.apply(
      observer(async (name) => {
        calls.push(name);
        expect(get(p, "alias")).toEqual(binary);
        if (name === "c-create") throw new Error("cancelled by caller");
      }),
    ),
  ).rejects.toThrow();
  expect(get(p, "alias")).toEqual(binary);
  expect(calls).toEqual(["a-update", "b-delete", "c-create"]);
  expect(get(p, "a-update")).toEqual(binary);
  expect(get(p, "b-delete")).toEqual(binary);
  expect(get(p, "c-create")).toBeUndefined();
  expect(get(p, "unrelated")!.toString()).toBe("keep");
});

test("failed application releases coordination and the same plan can be retried", async () => {
  const p = project();
  put(p, "x", "before");
  const review = plan(p, [new RenderedFile(p, "x", "after")]);
  await expect(
    review.apply(
      observer(async () => {
        throw new Error("cancel");
      }),
    ),
  ).rejects.toThrow();
  await expect(review.apply(observer())).resolves.toEqual(review.summary);
  expect(get(p, "x")!.toString()).toBe("after");
});

test("observes changed destinations in order and awaits each callback", async () => {
  const p = project();
  put(p, "middle", "same");
  const review = plan(p, [
    new RenderedFile(p, "z", "last"),
    new RenderedFile(p, "middle", "same"),
    new RenderedFile(p, "a", "first"),
  ]);
  const entered = deferred();
  const release = deferred();
  const calls: string[] = [];
  const applying = review.apply(
    observer(async (name) => {
      calls.push(name);
      expect(get(p, name)!.toString()).toBe(name === "a" ? "first" : "last");
      if (name === "a") {
        entered.resolve();
        await release.promise;
      }
    }),
  );
  try {
    await entered.promise;
    expect(get(p, "z")).toBeUndefined();
    expect(calls).toEqual(["a"]);
  } finally {
    release.resolve();
  }
  await expect(applying).resolves.toEqual(review.summary);
  expect(calls).toEqual(["a", "z"]);
});

test("processes serialize overlapping writes and recheck state after waiting", async () => {
  for (const replay of [false, true]) {
    const p = project();
    const aliasContainer = project();
    const alias = path.join(aliasContainer.outdir, "alias");
    fs.symlinkSync(p.outdir, alias, "junction");
    put(p, "z", "old");
    const file = new RenderedFile(p, "z", "first");
    const first = plan(p, [new RenderedFile(p, "a", "barrier"), file]);
    file.content = replay ? "first" : "second";
    const second = plan(p, [file]);
    const leftTemp = project().outdir;
    const rightTemp = project().outdir;
    const a = worker({ TEMP: leftTemp, TMP: leftTemp, TMPDIR: leftTemp });
    const b = worker({ TEMP: rightTemp, TMP: rightTemp, TMPDIR: rightTemp });
    try {
      expect((await a.next()).event).toBe("ready");
      expect((await b.next()).event).toBe("ready");
      a.send({
        kind: "start",
        root: p.outdir,
        serialized: first.serialize(),
        hold: true,
      });
      expect((await a.next()).event).toBe("written");
      b.send({
        kind: "start",
        root: alias,
        serialized: second.serialize(),
      });
      const state = await b.next();
      a.send({ kind: "release" });
      expect(state.event).toBe("busy");
      expect((await a.next()).event).toBe("written");
      expect((await a.next()).event).toBe("done");
      const outcome = await b.next();
      expect(outcome).toMatchObject(
        replay
          ? {
              event: "done",
              result: {
                created: 0,
                updated: 0,
                deleted: 0,
                unchanged: 1,
                writtenBytes: 0,
              },
            }
          : {
              event: "error",
              code: "SYNTHESIS_CONFLICT",
            },
      );
      expect(get(p, "z")!.toString()).toBe("first");
      if (!replay) {
        const followup = plan(p, [new RenderedFile(p, "recovery", "ok")]);
        b.send({
          kind: "start",
          root: p.outdir,
          serialized: followup.serialize(),
        });
        expect(await b.next()).toMatchObject({
          event: "written",
          path: "recovery",
        });
        expect(await b.next()).toMatchObject({
          event: "done",
          result: followup.summary,
        });
        expect(get(p, "recovery")!.toString()).toBe("ok");
      }
    } finally {
      await Promise.all([a.stop(), b.stop()]);
    }
  }
}, 30000);

test("disjoint process plans preserve both writers and unrelated files", async () => {
  const p = project();
  put(p, "unrelated", "keep");
  put(p, "a", "old-a");
  fs.linkSync(path.join(p.outdir, "a"), path.join(p.outdir, "alias-of-a"));
  const first = plan(p, [new RenderedFile(p, "a", "one")]);
  const second = plan(p, [new RenderedFile(p, "b", "two")]);
  const a = worker();
  const b = worker();
  try {
    expect((await a.next()).event).toBe("ready");
    expect((await b.next()).event).toBe("ready");
    a.send({
      kind: "start",
      root: p.outdir,
      serialized: first.serialize(),
      hold: true,
    });
    expect((await a.next()).event).toBe("written");
    b.send({ kind: "start", root: p.outdir, serialized: second.serialize() });
    const state = await b.next();
    a.send({ kind: "release" });
    expect(state.event).toBe("busy");
    expect((await a.next()).event).toBe("done");
    expect((await b.next()).event).toBe("written");
    expect(await b.next()).toEqual({ event: "done", result: second.summary });
    expect(get(p, "a")!.toString()).toBe("one");
    expect(get(p, "b")!.toString()).toBe("two");
    expect(get(p, "unrelated")!.toString()).toBe("keep");
    expect(get(p, "alias-of-a")!.toString()).toBe("old-a");
  } finally {
    await Promise.all([a.stop(), b.stop()]);
  }
}, 30000);

test("cancelling a waiting process preserves the holder and later application", async () => {
  for (const rejectWhileHeld of [false, true]) {
    const p = project();
    const first = plan(p, [new RenderedFile(p, "a", "one")]);
    const second = plan(p, [new RenderedFile(p, "b", "two")]);
    const a = worker();
    const b = worker();
    try {
      expect((await a.next()).event).toBe("ready");
      expect((await b.next()).event).toBe("ready");
      a.send({
        kind: "start",
        root: p.outdir,
        serialized: first.serialize(),
        hold: true,
      });
      expect((await a.next()).event).toBe("written");
      b.send({
        kind: "start",
        root: p.outdir,
        serialized: second.serialize(),
        rejectBusy: true,
        holdBusy: true,
      });
      const state = await b.next();
      expect(state.event).toBe("busy");
      if (rejectWhileHeld) {
        b.send({ kind: "releaseBusy" });
        expect((await b.next()).event).toBe("error");
        const cancellation = new Error(
          "caller still observes the original holder",
        );
        await second
          .apply({
            afterWrite: async () => {},
            onBusy: async () => {
              throw cancellation;
            },
          })
          .then(
            () => {
              throw new Error("Expected the waiting application to reject");
            },
            () => {},
          );
        a.send({ kind: "release" });
        expect((await a.next()).event).toBe("done");
      } else {
        a.send({ kind: "release" });
        expect((await a.next()).event).toBe("done");
        expect(get(p, "b")).toBeUndefined();
        b.send({ kind: "releaseBusy" });
        expect((await b.next()).event).toBe("error");
      }
      expect(get(p, "a")!.toString()).toBe("one");
      expect(get(p, "b")).toBeUndefined();
      await expect(second.apply(observer())).resolves.toEqual(second.summary);
    } finally {
      await Promise.all([a.stop(), b.stop()]);
    }
  }
}, 30000);

test("parent permissions do not split coordination for the same outdir", async () => {
  const parent = project();
  const root = path.join(parent.outdir, "shared");
  fs.mkdirSync(root);
  const shared = new Project({ name: "shared", outdir: root });
  const first = plan(shared, [new RenderedFile(shared, "a", "one")]);
  const second = plan(shared, [new RenderedFile(shared, "b", "two")]);
  const a = worker();
  const b = worker();
  try {
    expect((await a.next()).event).toBe("ready");
    expect((await b.next()).event).toBe("ready");
    a.send({ kind: "start", root, serialized: first.serialize(), hold: true });
    expect((await a.next()).event).toBe("written");
    fs.chmodSync(parent.outdir, 0o555);
    expect(() => fs.accessSync(parent.outdir, fs.constants.W_OK)).toThrow();
    b.send({ kind: "start", root, serialized: second.serialize() });
    const waiting = await b.next();
    fs.chmodSync(parent.outdir, 0o755);
    a.send({ kind: "release" });
    expect(waiting.event).toBe("busy");
    expect((await a.next()).event).toBe("done");
    expect((await b.next()).event).toBe("written");
    expect((await b.next()).event).toBe("done");
    expect(fs.readFileSync(path.join(root, "a"), "utf8")).toBe("one");
    expect(fs.readFileSync(path.join(root, "b"), "utf8")).toBe("two");
  } finally {
    fs.chmodSync(parent.outdir, 0o755);
    await Promise.all([a.stop(), b.stop()]);
  }
}, 30000);

test("a filesystem write failure restores prior writes and allows retry", async () => {
  const p = project();
  const binary = Buffer.from([0, 255, 128, 1]);
  put(p, "a", binary);
  const blocked = path.join(p.outdir, "z");
  fs.mkdirSync(blocked);
  const review = plan(p, [
    new RenderedFile(p, "a", "replacement"),
    new RenderedFile(p, "z/new", "created"),
  ]);
  const seen: string[] = [];
  try {
    await expect(
      review.apply(
        observer(async (name) => {
          seen.push(name);
          if (name === "a") fs.chmodSync(blocked, 0o555);
        }),
      ),
    ).rejects.toThrow();
    expect(seen).toEqual(["a"]);
    expect(get(p, "a")).toEqual(binary);
    expect(get(p, "z/new")).toBeUndefined();
  } finally {
    fs.chmodSync(blocked, 0o755);
  }
  await expect(review.apply(observer())).resolves.toEqual(review.summary);
  expect(get(p, "a")!.toString()).toBe("replacement");
  expect(get(p, "z/new")!.toString()).toBe("created");
});

test("processes coordinate while an initially absent outdir is created", async () => {
  const parent = project();
  const root = path.join(parent.outdir, "missing", "nested");
  const a = worker();
  const b = worker();
  try {
    expect((await a.next()).event).toBe("ready");
    expect((await b.next()).event).toBe("ready");
    expect(fs.existsSync(root)).toBe(false);
    a.send({ kind: "start", root, files: [["a", "one"]], hold: true });
    expect(await a.next()).toMatchObject({ event: "written", path: "a" });
    expect(fs.readFileSync(path.join(root, "a"), "utf8")).toBe("one");
    b.send({ kind: "start", root, files: [["b", "two"]] });
    expect((await b.next()).event).toBe("busy");
    expect(fs.existsSync(path.join(root, "b"))).toBe(false);
    a.send({ kind: "release" });
    expect((await a.next()).event).toBe("done");
    expect(await b.next()).toMatchObject({ event: "written", path: "b" });
    expect(await b.next()).toEqual({
      event: "done",
      result: {
        created: 1,
        updated: 0,
        deleted: 0,
        unchanged: 0,
        writtenBytes: 3,
      },
    });
    expect(fs.readFileSync(path.join(root, "a"), "utf8")).toBe("one");
    expect(fs.readFileSync(path.join(root, "b"), "utf8")).toBe("two");
  } finally {
    await Promise.all([a.stop(), b.stop()]);
  }
}, 30000);

test("stale deletion preimages conflict before any selected write", async () => {
  const p = project();
  put(p, "z-victim", "old");
  const review = plan(p, [
    new RenderedFile(p, "a-create", "new"),
    new RenderedFile(p, "z-victim"),
  ]);
  put(p, "z-victim", "external");
  const seen: string[] = [];
  await expect(
    review.apply(
      observer(async (name) => {
        seen.push(name);
      }),
    ),
  ).rejects.toMatchObject({ code: "SYNTHESIS_CONFLICT" });
  expect(seen).toEqual([]);
  expect(get(p, "a-create")).toBeUndefined();
  expect(get(p, "z-victim")!.toString()).toBe("external");
  put(p, "z-victim", "old");
  await expect(review.apply()).resolves.toEqual(review.summary);
  expect(get(p, "z-victim")).toBeUndefined();
});

test("a completed deletion replays without writes or callbacks", async () => {
  const p = project();
  put(p, "victim", "old");
  const review = plan(p, [new RenderedFile(p, "victim")]);
  const serialized = review.serialize();
  expect(review.summary.deleted).toBe(1);
  await expect(review.apply()).resolves.toEqual(review.summary);
  expect(get(p, "victim")).toBeUndefined();
  const seen: string[] = [];
  for (const replay of [review, restore(p.outdir, serialized)]) {
    await expect(
      replay.apply(
        observer(async (name) => {
          seen.push(name);
        }),
      ),
    ).resolves.toEqual({
      created: 0,
      updated: 0,
      deleted: 0,
      unchanged: 1,
      writtenBytes: 0,
    });
  }
  expect(seen).toEqual([]);
  expect(get(p, "victim")).toBeUndefined();
});

test("selected dotfile destinations remain available to application", async () => {
  const p = project();
  put(p, "keep", "untouched");
  const names = [".projen-synthesis-plan.lock", ".projen-synthesis.lock"];
  const review = plan(
    p,
    names.map((name) => new RenderedFile(p, name, "managed")),
  );
  expect(review.summary.created).toBe(names.length);
  await expect(review.apply()).resolves.toEqual(review.summary);
  for (const name of names) {
    expect(get(p, name)!.toString()).toBe("managed");
  }
  expect(get(p, "keep")!.toString()).toBe("untouched");
});

test("imported snapshots preserve binary preimages and immutable retryable state", async () => {
  const source = project();
  const binary = Buffer.from([0, 255, 128, 13, 10]);
  put(source, "a-update", binary);
  put(source, "b-delete", binary);
  const captured = plan(source, [
    new RenderedFile(source, "a-update", "é\r\n"),
    new RenderedFile(source, "b-delete"),
    new RenderedFile(source, "c-create", "💡"),
  ]);
  const entries = captured.entries;
  const summary = captured.summary;
  const serialized = captured.serialize();
  const fingerprint = captured.fingerprint;
  const target = project();
  const external = Buffer.from([0, 254, 129]);
  put(target, "a-update", external);
  put(target, "b-delete", binary);
  const restored = restore(target.outdir, serialized);
  expect(restored.entries).toEqual(entries);
  expect(restored.summary).toEqual(summary);
  expect(restored.serialize()).toBe(serialized);
  expect(restored.fingerprint).toBe(fingerprint);
  try {
    restored.entries[0].path = "wrong";
  } catch {}
  try {
    restored.entries.splice(0);
  } catch {}
  try {
    restored.summary.writtenBytes = 999;
  } catch {}
  expect(restored.entries).toEqual(entries);
  expect(restored.summary).toEqual(summary);
  expect(restored.serialize()).toBe(serialized);
  expect(restored.fingerprint).toBe(fingerprint);
  const calls: string[] = [];
  await expect(
    restored.apply(
      observer(async (name) => {
        calls.push(name);
      }),
    ),
  ).rejects.toMatchObject({ code: "SYNTHESIS_CONFLICT" });
  expect(calls).toEqual([]);
  expect(get(target, "a-update")).toEqual(external);
  expect(get(target, "b-delete")).toEqual(binary);
  expect(get(target, "c-create")).toBeUndefined();
  put(target, "a-update", binary);
  await expect(
    restored.apply(
      observer(async (name) => {
        calls.push(name);
        if (name === "c-create") throw new Error("cancel imported application");
      }),
    ),
  ).rejects.toThrow();
  expect(calls).toEqual(["a-update", "b-delete", "c-create"]);
  expect(get(target, "a-update")).toEqual(binary);
  expect(get(target, "b-delete")).toEqual(binary);
  expect(get(target, "c-create")).toBeUndefined();
  await expect(restored.apply(observer())).resolves.toEqual(summary);
  expect(get(target, "a-update")).toEqual(Buffer.from("é\r\n"));
  expect(get(target, "b-delete")).toBeUndefined();
  expect(get(target, "c-create")).toEqual(Buffer.from("💡"));
  expect(get(target, "wrong")).toBeUndefined();
});

test("successful plans recheck destinations on every later application", async () => {
  const p = project();
  put(p, "x", "before");
  const review = plan(p, [new RenderedFile(p, "x", "after")]);
  await expect(review.apply()).resolves.toEqual(review.summary);
  put(p, "x", "external");
  const calls: string[] = [];
  const observed = observer(async (name) => {
    calls.push(name);
  });
  await expect(review.apply(observed)).rejects.toMatchObject({
    code: "SYNTHESIS_CONFLICT",
  });
  expect(calls).toEqual([]);
  expect(get(p, "x")!.toString()).toBe("external");
  put(p, "x", "before");
  await expect(review.apply(observed)).resolves.toEqual(review.summary);
  expect(calls).toEqual(["x"]);
  expect(get(p, "x")!.toString()).toBe("after");
});

test("apply rejects symlinks inserted after capture before any write", async () => {
  for (const ancestor of [true, false]) {
    const p = project();
    const external = project();
    put(external, "keep", "untouched");
    const selected = ancestor ? "linked/target" : "linked";
    const review = plan(p, [
      new RenderedFile(p, "a-first", "first"),
      new RenderedFile(p, selected, "result"),
    ]);
    fs.symlinkSync(
      ancestor ? external.outdir : path.join(external.outdir, "target"),
      path.join(p.outdir, "linked"),
      ancestor ? "dir" : "file",
    );
    const calls: string[] = [];
    const applying = review.apply(
      observer(async (name) => {
        calls.push(name);
      }),
    );
    if (ancestor) {
      await expect(applying).rejects.toThrow();
    } else {
      await expect(applying).rejects.toMatchObject({
        code: "SYNTHESIS_CONFLICT",
      });
    }
    expect(calls).toEqual([]);
    expect(get(p, "a-first")).toBeUndefined();
    expect(get(external, "target")).toBeUndefined();
    expect(get(external, "keep")!.toString()).toBe("untouched");
    expect(fs.lstatSync(path.join(p.outdir, "linked")).isSymbolicLink()).toBe(
      true,
    );
    fs.unlinkSync(path.join(p.outdir, "linked"));
    await expect(review.apply(observer())).resolves.toEqual(review.summary);
    expect(get(p, selected)!.toString()).toBe("result");
  }
});

test("selected file metadata changes do not invalidate captured bytes", async () => {
  const p = project();
  put(p, "selected", Buffer.from([0, 255, 128, 13, 10]));
  const target = path.join(p.outdir, "selected");
  fs.chmodSync(target, 0o640);
  fs.utimesSync(target, 100, 100);
  const review = plan(p, [new RenderedFile(p, "selected", "result")]);
  const serialized = review.serialize();
  fs.chmodSync(target, 0o600);
  fs.utimesSync(target, 200, 200);
  const calls: string[] = [];
  await expect(
    review.apply(
      observer(async (name) => {
        calls.push(name);
      }),
    ),
  ).resolves.toEqual(review.summary);
  expect(calls).toEqual(["selected"]);
  expect(get(p, "selected")!.toString()).toBe("result");
  expect(review.serialize()).toBe(serialized);
  fs.utimesSync(target, 300, 300);
  await expect(review.apply(observer())).resolves.toEqual({
    created: 0,
    updated: 0,
    deleted: 0,
    unchanged: 1,
    writtenBytes: 0,
  });
});

test("a usable system temporary outdir does not reserve a selected filename", async () => {
  const root = fs.realpathSync("/tmp");
  const scratch = fs.mkdtempSync(path.join(root, "synthesis-root-"));
  const p = new Project({ name: "system-temp", outdir: root });
  const ordinary = `${path.basename(scratch)}/ordinary`;
  const name = `.projen-synthesis-${createHash("sha256").update(root).digest("hex")}.lock`;
  let created = false;
  try {
    const probe = plan(p, [new RenderedFile(p, ordinary, "ordinary")]);
    const calls: string[] = [];
    try {
      const result = await probe.apply(
        observer(async (file) => {
          calls.push(file);
        }),
      );
      expect(result).toEqual(probe.summary);
    } catch (error) {
      // Startup under a non-writable parent is not required. Only a genuine
      // permission rejection, before any write, permits this alternative.
      expect(["EACCES", "EPERM", "EROFS"]).toContain(
        (error as NodeJS.ErrnoException).code,
      );
      expect(calls).toEqual([]);
      expect(get(p, ordinary)).toBeUndefined();
      return;
    }
    expect(calls).toEqual([ordinary]);
    expect(get(p, ordinary)!.toString()).toBe("ordinary");
    expect(fs.existsSync(path.join(root, name))).toBe(false);
    const review = plan(p, [new RenderedFile(p, name, "managed")]);
    await expect(
      review.apply(
        observer(async (file) => {
          expect(file).toBe(name);
          created = true;
          expect(get(p, name)!.toString()).toBe("managed");
        }),
      ),
    ).resolves.toEqual(review.summary);
    expect(get(p, name)!.toString()).toBe("managed");
    await expect(review.apply(observer())).resolves.toMatchObject({
      created: 0,
      updated: 0,
      deleted: 0,
      unchanged: 1,
      writtenBytes: 0,
    });
    const firstName = `${path.basename(scratch)}/first`;
    const secondName = `${path.basename(scratch)}/second`;
    const first = plan(p, [new RenderedFile(p, firstName, "one")]);
    const second = plan(p, [new RenderedFile(p, secondName, "two")]);
    const a = worker();
    const b = worker({ TMPDIR: scratch, TMP: scratch, TEMP: scratch });
    try {
      expect((await a.next()).event).toBe("ready");
      expect((await b.next()).event).toBe("ready");
      a.send({
        kind: "start",
        root,
        serialized: first.serialize(),
        hold: true,
      });
      expect((await a.next()).event).toBe("written");
      await expect(
        second.apply({
          afterWrite: async () => {
            throw new Error("must not write");
          },
          onBusy: async () => {
            throw new Error("cancel waiting");
          },
        }),
      ).rejects.toThrow();
      expect(get(p, secondName)).toBeUndefined();
      b.send({ kind: "start", root, serialized: second.serialize() });
      expect((await b.next()).event).toBe("busy");
      expect(get(p, secondName)).toBeUndefined();
      a.send({ kind: "release" });
      expect((await a.next()).event).toBe("done");
      expect((await b.next()).event).toBe("written");
      expect((await b.next()).event).toBe("done");
      expect(get(p, firstName)!.toString()).toBe("one");
      expect(get(p, secondName)!.toString()).toBe("two");
    } finally {
      await Promise.all([a.stop(), b.stop()]);
    }
  } finally {
    if (created) fs.unlinkSync(path.join(root, name));
    fs.rmSync(scratch, { recursive: true, force: true });
  }
}, 30000);

test("a dead writer reports recovery steps instead of waiting forever", async () => {
  const p = project();
  fs.mkdirSync(p.outdir, { recursive: true });
  const root = fs.realpathSync(p.outdir);
  const identity = process.platform === "win32" ? root.toLowerCase() : root;
  const parent =
    process.platform === "win32"
      ? path.join(process.env.SystemRoot ?? "C:\\Windows", "Temp")
      : "/tmp";
  const lock = path.join(
    parent,
    `.projen-synthesis-${createHash("sha256").update(identity).digest("hex")}.lock`,
  );
  const child = spawnSync(
    process.execPath,
    ["-e", "process.stdout.write(String(process.pid))"],
    { encoding: "utf8" },
  );
  expect(child.status).toBe(0);
  fs.writeFileSync(
    lock,
    JSON.stringify({ root: identity, pid: Number(child.stdout) }),
  );
  try {
    const review = plan(p, [new RenderedFile(p, "selected", "result")]);
    await expect(review.apply()).rejects.toThrow(
      "exited. Check the selected files and remove",
    );
    expect(get(p, "selected")).toBeUndefined();
    expect(fs.existsSync(lock)).toBe(true);
  } finally {
    fs.rmSync(lock, { force: true });
  }
});
