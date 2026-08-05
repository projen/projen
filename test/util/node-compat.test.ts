import { polyfillGetBuiltinModule } from "../../src/util/node-compat";

// Regression tests for https://github.com/projen/projen/issues/4846:
// dax resolves every command through `process.getBuiltinModule("node:fs")`,
// which only exists on Node >= 22.3 / >= 20.16. On older runtimes projen must
// provide it, otherwise every task fails with "command not found".
// (End-to-end coverage runs in the integ workflow on old Node patch releases;
// these tests verify the shim itself.)
describe("polyfillGetBuiltinModule", () => {
  test("installs a working polyfill when the API is missing", () => {
    const proc = {} as NodeJS.Process;

    polyfillGetBuiltinModule(proc);

    const getBuiltinModule = (proc as any).getBuiltinModule;
    expect(typeof getBuiltinModule).toBe("function");
    // dax's exact call: must return a usable node:fs
    const fsModule = getBuiltinModule("node:fs");
    expect(typeof fsModule.statSync).toBe("function");
    expect(typeof fsModule.promises.stat).toBe("function");
    // bare ids resolve to the same module
    expect(getBuiltinModule("fs")).toBe(fsModule);
    // non-builtins are not resolved (matches the real API)
    expect(getBuiltinModule("jest")).toBeUndefined();
    expect(getBuiltinModule("./some/file")).toBeUndefined();
  });

  test("leaves an existing implementation untouched", () => {
    const original = jest.fn();
    const proc = { getBuiltinModule: original } as unknown as NodeJS.Process;

    polyfillGetBuiltinModule(proc);

    expect((proc as any).getBuiltinModule).toBe(original);
  });

  test("the real process object provides getBuiltinModule after module load", () => {
    // Importing the module (done at the top of this file) installs the
    // polyfill on the real `process` when needed. Either way - native or
    // polyfilled - dax's call must work now.
    const getBuiltinModule = (process as any).getBuiltinModule;
    expect(typeof getBuiltinModule).toBe("function");
    expect(typeof getBuiltinModule.call(process, "node:fs").statSync).toBe(
      "function",
    );
  });
});
