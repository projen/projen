import { existsSync, readdirSync } from "fs";
import { join } from "path";

/**
 * Recursively determines whether a directory contains at least one file,
 * optionally filtered by file extension.
 *
 * @param dir The directory to search. If it does not exist, `false` is
 * returned.
 * @param ext Optional file extension (e.g. `".ts"`) used to filter files. When
 * provided, only files whose name ends with this extension are considered.
 * @returns `true` if a matching file is found anywhere in the tree, otherwise
 * `false` (including when the directory only contains empty subdirectories).
 */
export function dirContainsFile(dir: string, ext?: string): boolean {
  if (!existsSync(dir)) {
    return false;
  }

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (dirContainsFile(join(dir, entry.name), ext)) {
        return true;
      }
    } else if (!ext || entry.name.endsWith(ext)) {
      return true;
    }
  }

  return false;
}
