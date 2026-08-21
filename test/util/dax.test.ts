import { $, escapeCommand } from "../../src/util/dax";

// A script that echoes its own argv as JSON, so a rendered command line can be
// round-tripped: whatever the shell parsed out must equal the original argv.
const ARGV_SCRIPT =
  "console.log(JSON.stringify(process.argv.slice(1)));".replace(/\n/g, "");

/**
 * Runs `escapeCommand(argv)` through dax's built-in shell (the same `$.raw`
 * parse path a task `exec` string takes) and returns the argv the program
 * actually received.
 */
async function roundtrip(args: string[]): Promise<string[]> {
  const command = escapeCommand([process.execPath, "-e", ARGV_SCRIPT, ...args]);
  const out = await $.raw`${command}`.text();
  return JSON.parse(out);
}

describe("escapeCommand", () => {
  test("leaves plain arguments unquoted and quotes the rest", () => {
    expect(escapeCommand(["echo", "plain"])).toBe("echo plain");
    expect(escapeCommand(["echo", "some text with spaces"])).toBe(
      "echo 'some text with spaces'",
    );
  });

  test("escapes single quotes by concatenating quoted segments", () => {
    expect(escapeCommand(["echo", "it's"])).toBe(`echo 'it'"'"'s'`);
  });

  test("renders an empty argument as an explicit empty word", () => {
    expect(escapeCommand(["echo", ""])).toBe("echo ''");
  });

  test.each([
    ["spaces", ["a b", "c"]],
    ["single quotes", ["it's a 'test'"]],
    ["double quotes", ['a "b" c']],
    ["backslashes", ["back\\slash", "C:\\Users\\me"]],
    ["variables", ["$HOME", "${BRACE}"]],
    ["command substitution", ["$(echo hi)", "`echo hi`"]],
    ["operators", ["a;b", "c && d", "e | f", "(g)"]],
    ["whitespace", ["new\nline", "tab\there"]],
    ["globs", ["*", "?", "[a-z]"]],
    ["tildes", ["~", "~root"]],
    ["empty and blank", ["", " "]],
    ["non-ascii", ["üñïçø∂é"]],
  ])("passes %s through verbatim", async (_label, args) => {
    await expect(roundtrip(args)).resolves.toEqual(args);
  });

  test("does not let a metacharacter argument execute anything", async () => {
    // If the payload broke out of its quoting, the shell would run `echo` as a
    // second command and the argv would not come back as a single element.
    const payload = "; echo INJECTED";
    await expect(roundtrip([payload])).resolves.toEqual([payload]);
  });
});
