import { bold, cyan, green, red } from "chalk";

/**
 * Compute a unified diff between two strings with context lines, hunk headers,
 * and optional colorized output with character-level inline highlighting.
 *
 * @param oldContent the previous content.
 * @param newContent the new content.
 * @param colorize whether to colorize the output.
 * @param contextSize number of unchanged context lines around each change.
 * @returns the diff as an array of lines, or `undefined` if there are no changes.
 */
export function unifiedDiff(
  oldContent: string,
  newContent: string,
  colorize: boolean,
  contextSize: number,
): string[] | undefined {
  const oldLines = oldContent.split("\n");
  const newLines = newContent.split("\n");
  const edits = computeEdits(oldLines, newLines);

  // Find indices of changed edits
  const changeIndices: number[] = [];
  for (let i = 0; i < edits.length; i++) {
    if (edits[i].type !== "equal") {
      changeIndices.push(i);
    }
  }
  if (changeIndices.length === 0) {
    return undefined;
  }

  // Group changes into hunks with context, merging overlapping ones
  const hunks: Array<{ start: number; end: number }> = [];
  for (const ci of changeIndices) {
    const start = Math.max(0, ci - contextSize);
    const end = Math.min(edits.length - 1, ci + contextSize);
    if (hunks.length > 0 && start <= hunks[hunks.length - 1].end + 1) {
      hunks[hunks.length - 1].end = end;
    } else {
      hunks.push({ start, end });
    }
  }

  // Format hunks
  const output: string[] = [];
  for (const hunk of hunks) {
    // Compute line numbers for the header
    let oldStart = 1;
    let newStart = 1;
    for (let i = 0; i < hunk.start; i++) {
      const e = edits[i];
      if (e.type === "equal" || e.type === "delete" || e.type === "replace") {
        oldStart++;
      }
      if (e.type === "equal" || e.type === "insert" || e.type === "replace") {
        newStart++;
      }
    }

    let oldCount = 0;
    let newCount = 0;
    for (let i = hunk.start; i <= hunk.end; i++) {
      const e = edits[i];
      if (e.type === "equal" || e.type === "delete" || e.type === "replace") {
        oldCount++;
      }
      if (e.type === "equal" || e.type === "insert" || e.type === "replace") {
        newCount++;
      }
    }

    const header = `@@ -${oldStart},${oldCount} +${newStart},${newCount} @@`;
    output.push(colorize ? cyan(header) : header);

    for (let i = hunk.start; i <= hunk.end; i++) {
      const e = edits[i];
      switch (e.type) {
        case "equal":
          output.push(`  ${oldLines[e.oldIdx]}`);
          break;
        case "delete":
          output.push(
            colorize
              ? `${bold.red("-")} ${red(oldLines[e.oldIdx])}`
              : `- ${oldLines[e.oldIdx]}`,
          );
          break;
        case "insert":
          output.push(
            colorize
              ? `${bold.green("+")} ${green(newLines[e.newIdx])}`
              : `+ ${newLines[e.newIdx]}`,
          );
          break;
        case "replace":
          output.push(
            ...inlineDiff(oldLines[e.oldIdx], newLines[e.newIdx], colorize),
          );
          break;
      }
    }
  }

  return output;
}

type EditOp =
  | { type: "equal"; oldIdx: number; newIdx: number }
  | { type: "delete"; oldIdx: number }
  | { type: "insert"; newIdx: number }
  | { type: "replace"; oldIdx: number; newIdx: number };

/**
 * Compute edit operations between two arrays of lines using LCS.
 */
function computeEdits(oldLines: string[], newLines: string[]): EditOp[] {
  const oldLen = oldLines.length;
  const newLen = newLines.length;

  // Build LCS table
  const lcs: number[][] = Array.from({ length: oldLen + 1 }, () =>
    new Array(newLen + 1).fill(0),
  );
  for (let i = oldLen - 1; i >= 0; i--) {
    for (let j = newLen - 1; j >= 0; j--) {
      if (oldLines[i] === newLines[j]) {
        lcs[i][j] = lcs[i + 1][j + 1] + 1;
      } else {
        lcs[i][j] = Math.max(lcs[i + 1][j], lcs[i][j + 1]);
      }
    }
  }

  // Walk the LCS table to produce edit operations
  const edits: EditOp[] = [];
  let i = 0;
  let j = 0;
  while (i < oldLen || j < newLen) {
    if (i < oldLen && j < newLen && oldLines[i] === newLines[j]) {
      edits.push({ type: "equal", oldIdx: i, newIdx: j });
      i++;
      j++;
    } else if (i < oldLen && j < newLen && lcs[i + 1][j] === lcs[i][j + 1]) {
      // Both sides advance equally — treat as a replacement
      edits.push({ type: "replace", oldIdx: i, newIdx: j });
      i++;
      j++;
    } else if (j < newLen && (i >= oldLen || lcs[i][j + 1] >= lcs[i + 1][j])) {
      edits.push({ type: "insert", newIdx: j });
      j++;
    } else {
      edits.push({ type: "delete", oldIdx: i });
      i++;
    }
  }

  return edits;
}

/**
 * Produces a remove/add line pair with character-level highlighting
 * of the parts that changed.
 */
function inlineDiff(
  oldLine: string,
  newLine: string,
  colorize: boolean,
): string[] {
  // Find common prefix and suffix
  let prefix = 0;
  while (
    prefix < oldLine.length &&
    prefix < newLine.length &&
    oldLine[prefix] === newLine[prefix]
  ) {
    prefix++;
  }
  let oldSuffix = oldLine.length;
  let newSuffix = newLine.length;
  while (
    oldSuffix > prefix &&
    newSuffix > prefix &&
    oldLine[oldSuffix - 1] === newLine[newSuffix - 1]
  ) {
    oldSuffix--;
    newSuffix--;
  }

  if (colorize) {
    const before = oldLine.substring(0, prefix);
    const after = oldLine.substring(oldSuffix);
    const oldChanged = oldLine.substring(prefix, oldSuffix);
    const newChanged = newLine.substring(prefix, newSuffix);
    return [
      `${bold.red("-")} ${red(before)}${red.bold.underline(oldChanged)}${red(after)}`,
      `${bold.green("+")} ${green(before)}${green.bold.underline(newChanged)}${green(after)}`,
    ];
  }

  return [`- ${oldLine}`, `+ ${newLine}`];
}
