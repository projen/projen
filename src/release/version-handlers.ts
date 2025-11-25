import { readFileSync, writeFileSync, existsSync } from "fs";

/**
 * Interface for handling different types of version files
 */
export interface IVersionFileHandler {
  /** Read version from the file */
  readVersion(): string;

  /** Write version to the file, preserving formatting */
  writeVersion(version: string): void;
}

/**
 * Handler for JSON-based version files (package.json, version.json, etc.)
 * Implementation mirrors commit-and-tag-version's JSON updater:
 * https://github.com/absolute-version/commit-and-tag-version/blob/master/lib/updaters/types/json.js
 */
export class JsonVersionHandler implements IVersionFileHandler {
  constructor(private filePath: string) {}

  readVersion(): string {
    if (!existsSync(this.filePath)) {
      throw new Error(`Version file does not exist: ${this.filePath}`);
    }

    const contents = readFileSync(this.filePath, "utf-8");
    const json = JSON.parse(contents);
    if (!json.version) {
      throw new Error(`No version found in ${this.filePath}`);
    }
    return json.version;
  }

  writeVersion(version: string): void {
    if (!existsSync(this.filePath)) {
      // Create a minimal JSON file if it doesn't exist
      const json = { version };
      writeFileSync(this.filePath, JSON.stringify(json, undefined, 2) + "\n");
      return;
    }

    const contents = readFileSync(this.filePath, "utf-8");
    const json = JSON.parse(contents);

    // Detect original formatting
    const indent = this.detectIndent(contents);
    const newline = contents.includes("\r\n") ? "\r\n" : "\n";
    const hasTrailingNewline =
      contents.endsWith("\n") || contents.endsWith("\r\n");

    // Update version
    json.version = version;

    // Handle package-lock.json v2 format (like commit-and-tag-version does)
    if (json.packages && json.packages[""]) {
      json.packages[""].version = version;
    }

    const output =
      JSON.stringify(json, undefined, indent) +
      (hasTrailingNewline ? newline : "");
    writeFileSync(this.filePath, output);
  }

  private detectIndent(contents: string): string | number {
    const match = contents.match(/^(\s+)/m);
    if (match) {
      const indent = match[1];
      // If it's all spaces, return the number of spaces
      if (indent.indexOf("\t") === -1) {
        return indent.length;
      }
      // If it contains tabs, return the actual string
      return indent;
    }
    // Default to 2 spaces if no indentation detected
    return 2;
  }
}

/**
 * Handler for Python version files (pyproject.toml, setup.py)
 * Implementation mirrors commit-and-tag-version's Python updater:
 * https://github.com/absolute-version/commit-and-tag-version/blob/master/lib/updaters/types/python.js
 */
export class PythonVersionHandler implements IVersionFileHandler {
  constructor(private filePath: string) {}

  readVersion(): string {
    if (!existsSync(this.filePath)) {
      throw new Error(`Python version file does not exist: ${this.filePath}`);
    }

    const content = readFileSync(this.filePath, "utf-8");

    // Use the same regex pattern as commit-and-tag-version
    const versionMatch = content.match(/version["' ]*=[ ]*["'](.*)['"]/i);
    if (!versionMatch) {
      throw new Error(`No version found in ${this.filePath}`);
    }
    return versionMatch[1];
  }

  writeVersion(version: string): void {
    if (!existsSync(this.filePath)) {
      throw new Error(`Python version file does not exist: ${this.filePath}`);
    }

    const content = readFileSync(this.filePath, "utf-8");

    // Replace version using the same regex pattern as commit-and-tag-version
    const updatedContent = content.replace(
      /version["' ]*=[ ]*["'](.*)["']/i,
      `version = "${version}"`
    );

    writeFileSync(this.filePath, updatedContent);
  }
}

/**
 * Factory function to create the appropriate version handler for a given file path
 */
export function createVersionHandler(filePath: string): IVersionFileHandler {
  if (filePath.endsWith("pyproject.toml") || filePath.endsWith("setup.py")) {
    return new PythonVersionHandler(filePath);
  }

  // Default to JSON for backward compatibility
  return new JsonVersionHandler(filePath);
}
