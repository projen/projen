import { DataResolver } from "../src/_private/data-resolver";
import { IResolvable, ResolveOptions } from "../src/file";

const resolve = (obj: any, opt?: ResolveOptions) => new DataResolver().resolve(obj, opt); 

test("null", () => {
  expect(resolve(null)).toStrictEqual(null);
});

test("undefined", () => {
  expect(resolve(undefined)).toStrictEqual(undefined);
});

test("string", () => {
  expect(resolve("")).toStrictEqual("");
  expect(resolve("hello")).toStrictEqual("hello");
  expect(resolve("0")).toStrictEqual("0");
  expect(resolve("hello world")).toStrictEqual("hello world");
  expect(resolve("  ")).toStrictEqual("  ");
});

test("number", () => {
  expect(resolve(0)).toStrictEqual(0);
  expect(resolve(10)).toStrictEqual(10);
  expect(resolve(-102)).toStrictEqual(-102);
});

test("boolean", () => {
  expect(resolve(true)).toStrictEqual(true);
  expect(resolve(false)).toStrictEqual(false);
});

test("array", () => {
  expect(resolve([])).toStrictEqual([]);
  expect(resolve([1, 2, 3])).toStrictEqual([1, 2, 3]);
});

test("object", () => {
  expect(resolve(Object.create(null))).toStrictEqual({});
  expect(resolve({})).toStrictEqual({});
  expect(resolve({ foo: 123, hello: [1, 2, { bar: 3 }] })).toStrictEqual({
    foo: 123,
    hello: [1, 2, { bar: 3 }],
  });
});

test("functions are resolved", () => {
  expect(resolve(() => 123)).toStrictEqual(123);
  expect(resolve(() => "hello")).toStrictEqual("hello");
  expect(resolve(() => undefined)).toStrictEqual(undefined);
});

test("resolvable objects are resolved", () => {
  const resolvedContent = "Content";
  const resolvable: IResolvable = { toJSON: () => resolvedContent };
  expect(resolve({ foo: resolvable })).toStrictEqual({ foo: resolvedContent });
});

test("recursive resolve", () => {
  expect(resolve(() => [1, 2, () => 30])).toStrictEqual([1, 2, 30]);
  expect(resolve(() => ({ foo: 123, bar: () => "bar" }))).toStrictEqual({
    foo: 123,
    bar: "bar",
  });
  expect(
    resolve(() => ({
      foo: 123,
      bar: () => ["bar", "baz", { hello: () => "world" }],
    })),
  ).toStrictEqual({
    foo: 123,
    bar: ["bar", "baz", { hello: "world" }],
  });
});

test("context is passed to functions", () => {
  expect(resolve((x: number) => x + 1, { args: [10] })).toStrictEqual(11);

  type Calculator = {
    [op: string]: (lhs: number, rhs: number, text?: string) => any;
  };

  const calculator: Calculator = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => a / b,

    fun: (a1, b1, text) => [
      `this is ${text}`,
      (a2: number) => a1 * a2,
      (_: number, b2: number) => b1 + b2,
      {
        another: {
          level: (a3: number, b3: number, text3: string) =>
            `hello ${text3} ${b3} ${a3}`,
        },
      },
    ],
  };

  expect(resolve(calculator, { args: [10, 2, "fun"] })).toStrictEqual({
    add: 12,
    sub: 8,
    mul: 20,
    div: 5,
    fun: ["this is fun", 100, 4, { another: { level: "hello fun 2 10" } }],
  });
});

test('"undefined" values are omitted', () => {
  const r = (o: any) => resolve(o);
  expect(r({ foo: undefined })).toStrictEqual({});
  expect(r({ foo: { bar: undefined } })).toStrictEqual({ foo: {} });
  expect(r({ foo: { bar: undefined, hello: 123 } })).toStrictEqual({
    foo: { hello: 123 },
  });
  expect(r({ foo: [undefined] })).toStrictEqual({ foo: [] });
});

test("omitEmpty", () => {
  const r = (o: any) => resolve(o, { omitEmpty: true });
  expect(r({ foo: {} })).toStrictEqual(undefined);
  expect(r({ foo: { bar: {} } })).toStrictEqual(undefined);
  expect(r({ foo: [] })).toStrictEqual(undefined);
  expect(r({ bar: { foo: [] } })).toStrictEqual(undefined);
  expect(r({ foo: { hello: "world", boom: { bar: [] } } })).toStrictEqual({
    foo: { hello: "world" },
  });
});
