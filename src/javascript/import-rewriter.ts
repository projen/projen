import * as fs from "fs";
import * as path from "path";

/**
 * Options for rewriting imports in compiled JavaScript files.
 */
export interface RewriteImportsOptions {
  /**
   * List of dependencies to rewrite to vendor bundle.
   */
  readonly bundledDeps: string[];

  /**
   * Directory containing compiled JavaScript files.
   * @default 'lib'
   */
  readonly libDir?: string;

  /**
   * Path to the vendor bundle file relative to libDir.
   * @default 'vendor.js'
   */
  readonly vendorFile?: string;

  /**
   * Dependencies that should remain external (not rewritten).
   * @default ['constructs']
   */
  readonly externalDeps?: string[];
}

/**
 * Result of rewriting imports in a single file.
 */
export interface RewriteFileResult {
  /**
   * The file path that was processed.
   */
  readonly filePath: string;

  /**
   * Number of requires that were rewritten.
   */
  readonly rewrittenCount: number;

  /**
   * The module names that were rewritten.
   */
  readonly rewrittenModules: string[];
}

/**
 * Result of rewriting imports across all files.
 */
export interface RewriteResult {
  /**
   * Results for each file that was processed.
   */
  readonly files: RewriteFileResult[];

  /**
   * Total number of requires rewritten across all files.
   */
  readonly totalRewritten: number;
}

/**
 * Utility for rewriting imports in compiled JavaScript files to reference
 * the vendor bundle instead of node_modules.
 *
 * This rewriter:
 * 1. Scans compiled JS files for requires of bundled dependencies
 * 2. Rewrites those requires to reference the vendor bundle
 * 3. Preserves requires of external dependencies
 *
 * The rewriting maintains the correct relative path from each file
 * to the vendor bundle based on the file's location in the directory tree.
 */
export class ImportRewriter {
  /**
   * Rewrite imports in all JavaScript files in the lib directory.
   *
   * @param options Rewrite options
   * @returns Result of the rewrite operation
   */
  public static rewriteImports(options: RewriteImportsOptions): RewriteResult {
    const libDir = options.libDir ?? "lib";
    const vendorFile = options.vendorFile ?? "vendor.js";
    const externalDeps = options.externalDeps ?? ["constructs"];
    const bundledDeps = options.bundledDeps;

    const results: RewriteFileResult[] = [];
    let totalRewritten = 0;

    // Find all JS files in lib directory
    const jsFiles = ImportRewriter.findJsFiles(libDir);

    for (const filePath of jsFiles) {
      const result = ImportRewriter.rewriteFile(
        filePath,
        bundledDeps,
        externalDeps,
        libDir,
        vendorFile
      );

      if (result.rewrittenCount > 0) {
        results.push(result);
        totalRewritten += result.rewrittenCount;
      }
    }

    return {
      files: results,
      totalRewritten,
    };
  }

  /**
   * Rewrite imports in a single JavaScript file.
   *
   * @param filePath Path to the JavaScript file
   * @param bundledDeps Array of bundled dependency names
   * @param externalDeps Array of external dependency names to preserve
   * @param libDir The lib directory path
   * @param vendorFile The vendor bundle filename
   * @returns Result of the rewrite operation for this file
   */
  public static rewriteFile(
    filePath: string,
    bundledDeps: string[],
    externalDeps: string[],
    libDir: string,
    vendorFile: string
  ): RewriteFileResult {
    const content = fs.readFileSync(filePath, "utf-8");
    const rewrittenModules: string[] = [];

    // Calculate relative path from file to vendor bundle
    const relativePath = ImportRewriter.calculateRelativePath(
      filePath,
      libDir,
      vendorFile
    );

    // Rewrite requires
    const newContent = ImportRewriter.rewriteContent(
      content,
      bundledDeps,
      externalDeps,
      relativePath,
      rewrittenModules
    );

    // Only write if content changed
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, "utf-8");
    }

    return {
      filePath,
      rewrittenCount: rewrittenModules.length,
      rewrittenModules,
    };
  }

  /**
   * Rewrite the content of a JavaScript file.
   *
   * @param content The file content
   * @param bundledDeps Array of bundled dependency names
   * @param externalDeps Array of external dependency names to preserve
   * @param vendorPath Relative path to vendor bundle
   * @param rewrittenModules Array to collect rewritten module names
   * @returns The rewritten content
   */
  public static rewriteContent(
    content: string,
    bundledDeps: string[],
    externalDeps: string[],
    vendorPath: string,
    rewrittenModules: string[]
  ): string {
    // Convert to Sets for efficient lookup
    const bundledDepsSet = new Set(bundledDeps);
    const externalDepsSet = new Set(externalDeps);

    // Match require statements: require("module") or require('module')
    const requireRegex = /require\s*\(\s*["']([^"']+)["']\s*\)/g;

    return content.replace(requireRegex, (match, moduleName) => {
      // Get base module name (handle subpaths like 'yaml/util')
      const baseName = ImportRewriter.getBaseModuleName(moduleName);

      // Skip if it's an external dependency
      if (externalDepsSet.has(baseName)) {
        return match;
      }

      // Skip if it's not a bundled dependency
      if (!bundledDepsSet.has(baseName)) {
        return match;
      }

      // Skip relative imports (already local)
      if (moduleName.startsWith(".") || moduleName.startsWith("/")) {
        return match;
      }

      // Track the rewritten module
      if (!rewrittenModules.includes(baseName)) {
        rewrittenModules.push(baseName);
      }

      // Convert module name to vendor export key
      // e.g., '@iarna/toml' -> 'iarna_toml', 'fast-glob' -> 'fast_glob'
      const vendorKey = ImportRewriter.moduleNameToVendorKey(baseName);

      // Rewrite to vendor bundle with named export access
      return `require("${vendorPath}").${vendorKey}`;
    });
  }

  /**
   * Convert a module name to its vendor bundle export key.
   * This matches the key generation in the vendor entry point.
   *
   * @param moduleName The npm module name
   * @returns The vendor bundle export key
   */
  public static moduleNameToVendorKey(moduleName: string): string {
    // Remove leading @ for scoped packages and replace non-alphanumeric with _
    return moduleName.replace(/^@/, "").replace(/[^a-zA-Z0-9_]/g, "_");
  }

  /**
   * Calculate the relative path from a file to the vendor bundle.
   *
   * @param filePath Path to the source file
   * @param libDir The lib directory path
   * @param vendorFile The vendor bundle filename
   * @returns Relative path to vendor bundle (e.g., './vendor.js' or '../vendor.js')
   */
  public static calculateRelativePath(
    filePath: string,
    libDir: string,
    vendorFile: string
  ): string {
    // Get the directory of the file relative to lib
    const fileDir = path.dirname(filePath);
    const vendorPath = path.join(libDir, vendorFile);

    // Calculate relative path from file directory to vendor bundle
    let relativePath = path.relative(fileDir, vendorPath);

    // Ensure it starts with ./ for same directory
    if (!relativePath.startsWith(".")) {
      relativePath = "./" + relativePath;
    }

    // Normalize path separators for cross-platform compatibility
    relativePath = relativePath.replace(/\\/g, "/");

    // Remove .js extension for cleaner imports (Node.js resolves it)
    if (relativePath.endsWith(".js")) {
      relativePath = relativePath.slice(0, -3);
    }

    return relativePath;
  }

  /**
   * Get the base module name from an import path.
   * Handles scoped packages and subpaths.
   *
   * @param importPath The import path
   * @returns The base module name
   */
  public static getBaseModuleName(importPath: string): string {
    // Handle scoped packages: @scope/package/subpath -> @scope/package
    if (importPath.startsWith("@")) {
      const parts = importPath.split("/");
      if (parts.length >= 2) {
        return `${parts[0]}/${parts[1]}`;
      }
      return importPath;
    }

    // Handle regular packages: package/subpath -> package
    const slashIndex = importPath.indexOf("/");
    if (slashIndex > 0) {
      return importPath.substring(0, slashIndex);
    }

    return importPath;
  }

  /**
   * Find all JavaScript files in a directory recursively.
   */
  private static findJsFiles(dir: string): string[] {
    const files: string[] = [];

    if (!fs.existsSync(dir)) {
      return files;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules and hidden directories
        if (!entry.name.startsWith(".") && entry.name !== "node_modules") {
          files.push(...ImportRewriter.findJsFiles(fullPath));
        }
      } else if (entry.isFile() && entry.name.endsWith(".js")) {
        files.push(fullPath);
      }
    }

    return files;
  }
}
