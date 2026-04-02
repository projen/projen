import { recreate } from "../src/util/recreate";

interface FooOptions {
  readonly a?: string;
  readonly b?: number;
}

class Foo {
  public readonly options: FooOptions;
  public readonly extra: string;
  constructor(options: FooOptions = {}, extra = "default") {
    this.options = options;
    this.extra = extra;
  }
  public copy(overrides: FooOptions = {}): Foo {
    return recreate(this, { ...this.options, ...overrides }, this.extra);
  }
}

class Bar extends Foo {
  public readonly bar = true;
}

test("recreate invokes the constructor with the given args", () => {
  const original = new Foo({ a: "x", b: 1 }, "hello");
  const copy = recreate<Foo>(original, { a: "y" }, "world");

  expect(copy).toBeInstanceOf(Foo);
  expect(copy).not.toBe(original);
  expect(copy.options).toEqual({ a: "y" });
  expect(copy.extra).toBe("world");
});

test("recreate returns an instance of the exact runtime subclass", () => {
  const original = new Bar({ a: "x" });
  const copy = recreate<Bar>(original, { a: "z" });

  // Not the base class, but the subclass.
  expect(copy).toBeInstanceOf(Bar);
  expect(copy.bar).toBe(true);
  expect(copy.options).toEqual({ a: "z" });
});

test("recreate does not mutate the original instance", () => {
  const original = new Foo({ a: "x", b: 1 });
  original.copy({ a: "y" });

  expect(original.options).toEqual({ a: "x", b: 1 });
});

test("a typed copy() built on recreate merges overrides", () => {
  const original = new Foo({ a: "x", b: 1 }, "keep");
  const copy = original.copy({ b: 2 });

  expect(copy).toBeInstanceOf(Foo);
  expect(copy.options).toEqual({ a: "x", b: 2 });
  // unrelated constructor args are preserved by the component's own copy()
  expect(copy.extra).toBe("keep");
});

test("recreate with no extra args calls the constructor with no args", () => {
  const copy = recreate(new Foo({ a: "x" }));
  expect(copy).toBeInstanceOf(Foo);
  expect(copy.options).toEqual({});
  expect(copy.extra).toBe("default");
});
