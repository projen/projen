import * as util from "util";
import { FutureComponent, TextFile } from "../src";
import { synthSnapshot, TestProject } from "./util";
import { recreate } from "../src/util/recreate";

interface MyFutureOptions {
  readonly content?: string;
}

class MyFuture extends FutureComponent {
  private readonly options: MyFutureOptions;
  public initialized = false;

  constructor(options: MyFutureOptions = {}) {
    super();
    this.options = options; // `set` is allowed while detached
  }

  protected init(): void {
    this.initialized = true;
    new TextFile(this, "future.txt", {
      lines: [this.options.content ?? "default"],
    });
  }

  /** A feature method - blocked by the guard until attached. */
  public greet(): string {
    return `hello ${this.project.name}`;
  }

  public copy(overrides: MyFutureOptions = {}): MyFuture {
    return recreate(this, { ...this.options, ...overrides });
  }
}

test("a detached future component blocks feature access", () => {
  const f = new MyFuture();

  expect(util.types.isProxy(f)).toBe(true);
  expect(() => f.greet()).toThrow(/not usable until it is attached/);
  expect(() => (f as any).project).toThrow(/not usable until it is attached/);
  expect(() => f.initialized).toThrow(/not usable until it is attached/);
});

test("a detached future component is not thenable", () => {
  const f = new MyFuture();
  // The guard returns undefined for `then` so `await futureComponent` does not
  // hang or throw.
  expect((f as any).then).toBeUndefined();
});

test("the use-before-attach error names the concrete class", () => {
  const f = new MyFuture();
  expect(() => f.greet()).toThrow(/MyFuture/);
});

test("attach/tryAttach/attached/copy are allowed while detached", () => {
  const f = new MyFuture();
  expect(f.attached).toBe(false);
  expect(typeof f.attach).toBe("function");
  expect(typeof f.tryAttach).toBe("function");
  expect(typeof f.copy).toBe("function");
});

test("attach returns the unwrapped instance and runs init", () => {
  const p = new TestProject();
  const f = new MyFuture({ content: "x" });

  const real = f.attach(p);

  expect(util.types.isProxy(real)).toBe(false);
  expect(real).toBeInstanceOf(MyFuture);
  expect((real as MyFuture).attached).toBe(true);
  expect((real as MyFuture).initialized).toBe(true);
  expect((real as MyFuture).greet()).toBe(`hello ${p.name}`);
  expect(p.components).toContain(real);
});

test("a proxy handle held after attach becomes a transparent pass-through", () => {
  const p = new TestProject();
  const f = new MyFuture();

  f.attach(p);

  expect(f.attached).toBe(true);
  expect(f.greet()).toBe(`hello ${p.name}`);
});

test("files created during init are synthesized", () => {
  const p = new TestProject();
  new MyFuture({ content: "hello future" }).attach(p);

  const snapshot = synthSnapshot(p);
  expect(snapshot["future.txt"]).toContain("hello future");
});

test("attaching twice throws", () => {
  const p = new TestProject();
  const f = new MyFuture();
  f.attach(p);

  expect(() => f.attach(p)).toThrow(/already attached/);
});

test("tryAttach is idempotent and ignores a second scope", () => {
  const p1 = new TestProject();
  const p2 = new TestProject();
  const f = new MyFuture();

  const first = f.tryAttach(p1);
  const second = f.tryAttach(p2);

  expect(second).toBe(first);
  expect((first as MyFuture).project).toBe(p1);
});

test("copy produces an independent detached variant", () => {
  const p1 = new TestProject();
  const p2 = new TestProject();

  const a = new MyFuture({ content: "a" });
  const b = a.copy({ content: "b" });

  expect(b.attached).toBe(false);

  const realA = a.attach(p1) as MyFuture;
  const realB = b.attach(p2) as MyFuture;

  expect(realB).not.toBe(realA);
  expect(synthSnapshot(p1)["future.txt"]).toContain("a");
  expect(synthSnapshot(p2)["future.txt"]).toContain("b");
});

test("uses the provided construct id, else an auto id", () => {
  const explicit = new MyFuture().attach(new TestProject(), "MyExplicitId");
  const auto = new MyFuture().attach(new TestProject());

  expect(explicit.node.id).toBe("MyExplicitId");
  expect(auto.node.id).toMatch(/^AutoId\d+$/);
});
