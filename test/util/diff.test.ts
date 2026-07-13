import { unifiedDiff } from "../../src/util/diff";

describe("unifiedDiff", () => {
  test("returns undefined for identical content", () => {
    expect(unifiedDiff("a\nb\nc", "a\nb\nc", false, 3)).toBeUndefined();
  });

  test("shows added lines", () => {
    const diff = unifiedDiff("a\nb", "a\nb\nc", false, 3)!;
    expect(diff).toBeDefined();
    expect(diff.some((l) => l.startsWith("+ c"))).toBe(true);
  });

  test("shows removed lines", () => {
    const diff = unifiedDiff("a\nb\nc", "a\nb", false, 3)!;
    expect(diff).toBeDefined();
    expect(diff.some((l) => l.startsWith("- c"))).toBe(true);
  });

  test("shows inline changes for modified lines", () => {
    const diff = unifiedDiff("hello world", "hello earth", false, 3)!;
    expect(diff).toBeDefined();
    expect(diff.some((l) => l.startsWith("-") && l.includes("world"))).toBe(
      true,
    );
    expect(diff.some((l) => l.startsWith("+") && l.includes("earth"))).toBe(
      true,
    );
  });

  test("includes hunk headers", () => {
    const diff = unifiedDiff("a\nb\nc", "a\nB\nc", false, 3)!;
    expect(diff.some((l) => l.startsWith("@@"))).toBe(true);
  });

  test("includes context lines around changes", () => {
    const old = "a\nb\nc\nd\ne";
    const now = "a\nb\nC\nd\ne";
    const diff = unifiedDiff(old, now, false, 1)!;
    // b and d are context
    expect(diff.some((l) => l.startsWith("  b"))).toBe(true);
    expect(diff.some((l) => l.startsWith("  d"))).toBe(true);
    // a and e are outside context
    expect(diff.some((l) => l.includes("a"))).toBe(false);
    expect(diff.some((l) => l.includes("e"))).toBe(false);
  });

  test("merges adjacent hunks", () => {
    const old = "a\nb\nc\nd\ne";
    const now = "A\nb\nc\nd\nE";
    const diff = unifiedDiff(old, now, false, 3)!;
    const hunkHeaders = diff.filter((l) => l.startsWith("@@"));
    expect(hunkHeaders).toHaveLength(1);
  });

  test("respects custom context size", () => {
    const old = "a\nb\nc\nd\ne\nf\ng";
    const now = "a\nb\nc\nD\ne\nf\ng";
    const diffCtx0 = unifiedDiff(old, now, false, 0)!;
    const diffCtx3 = unifiedDiff(old, now, false, 3)!;
    expect(diffCtx0.length).toBeLessThan(diffCtx3.length);
  });

  test("handles new content from empty", () => {
    const diff = unifiedDiff("", "hello\nworld", false, 3)!;
    expect(diff).toBeDefined();
    expect(diff.some((l) => l.startsWith("+ hello"))).toBe(true);
    expect(diff.some((l) => l.startsWith("+ world"))).toBe(true);
  });

  test("handles deletion to empty", () => {
    const diff = unifiedDiff("hello\nworld", "", false, 3)!;
    expect(diff).toBeDefined();
    expect(diff.some((l) => l.startsWith("- hello"))).toBe(true);
    expect(diff.some((l) => l.startsWith("- world"))).toBe(true);
  });

  test("highlights only the changed part when lines share a common suffix", () => {
    const diff = unifiedDiff(
      "prefix-old-suffix",
      "prefix-new-suffix",
      false,
      3,
    )!;
    expect(diff).toBeDefined();
    expect(diff.some((l) => l.startsWith("-") && l.includes("old"))).toBe(true);
    expect(diff.some((l) => l.startsWith("+") && l.includes("new"))).toBe(true);
  });
});
