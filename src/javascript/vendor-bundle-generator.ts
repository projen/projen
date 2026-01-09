import * as fs from "fs";
import * as path from "path";

/**
 * Represents an import found in a source file.
 */
export interface ImportInfo {
  /**
   * The module being imported (e.g., 'yaml', 'semver').
   */
  readonly moduleName: string;

  /**
   * The specific symbols imported from the module.
   * Empty array means the entire module is imported (default import or namespace).
   */
  readonly symbols: string[];

  /**
   * Whether this is a default import.
   */
  readonly isDefault: boolean;

  /**
   * Whether this is a namespace import (import * as x).
   */
  readonly isNamespace: boolean;
}

/**
 * Options for analyzing source files.
 */
export interface AnalyzeOptions {
  /**
   * List of dependencies to look for in imports.
   */
  readonly bundledDeps: string[];

  /**
   * Source directory to analyze.
   * @default 'src'
   */
  readonly sourceDir?: string;

  /**
   * File extensions to analyze.
   * @default ['.ts', '.js']
   */
  readonly extensions?: string[];
}

/**
 * Result of analyzing source files for bundled dependency imports.
 */
export interface AnalyzeResult {
  /**
   * Map of module name to the symbols imported from it.
   * If the array is empty, the entire module is imported.
   */
  readonly imports: { [moduleName: string]: string[] };

  /**
   * Modules that are imported as default.
   */
  readonly defaultImports: string[];

  /**
   * Modules that are imported as namespace (import * as x).
   */
  readonly namespaceImports: string[];
}

/**
 * Options for generating the vendor entry point.
 */
export interface GenerateEntryPointOptions {
  /**
   * The analysis result from analyzeSourceFiles.
   */
  readonly analyzeResult: AnalyzeResult;

  /**
   * Output path for the generated entry point file.
   * @default 'lib/.vendor-entry.js'
   */
  readonly outputPath?: string;
}

/**
 * Options for generating esbuild configuration.
 */
export interface EsbuildConfigOptions {
  /**
   * Entry point file path.
   */
  readonly entryPoint: string;

  /**
   * Output file path for the vendor bundle.
   * @default 'lib/vendor.js'
   */
  readonly outfile?: string;

  /**
   * Dependencies that should remain external (not bundled).
   * @default ['constructs']
   */
  readonly externalDeps?: string[];

  /**
   * Target Node.js version.
   * @default 'node18'
   */
  readonly target?: string;

  /**
   * Enable minification.
   * @default false
   */
  readonly minify?: boolean;
}

/**
 * Generated esbuild configuration.
 */
export interface EsbuildConfig {
  /**
   * The esbuild command line arguments.
   */
  readonly args: string[];

  /**
   * The entry point file.
   */
  readonly entryPoint: string;

  /**
   * The output file.
   */
  readonly outfile: string;

  /**
   * External dependencies.
   */
  readonly external: string[];
}

/**
 * Utility for generating vendor bundles containing bundled dependencies.
 *
 * This generator:
 * 1. Analyzes source files to find imports from bundled dependencies
 * 2. Generates a vendor entry point that re-exports used symbols
 * 3. Creates esbuild configuration for bundling
 *
 * The vendor bundle approach avoids code duplication while maintaining
 * the file structure for deep imports.
 */
export class VendorBundleGenerator {
  /**
   * Analyze source files to find imports from bundled dependencies.
   *
   * This method scans all source files in the specified directory and
   * identifies which symbols are imported from the bundled dependencies.
   *
   * @param options Analysis options
   * @returns Analysis result with import information
   */
  public static analyzeSourceFiles(options: AnalyzeOptions): AnalyzeResult {
    const sourceDir = options.sourceDir ?? "src";
    const extensions = options.extensions ?? [".ts", ".js"];
    const bundledDepsSet = new Set(options.bundledDeps);

    const importsMap = new Map<string, Set<string>>();
    const defaultImportsSet = new Set<string>();
    const namespaceImportsSet = new Set<string>();

    // Initialize maps for all bundled deps
    for (const dep of options.bundledDeps) {
      importsMap.set(dep, new Set<string>());
    }

    // Find all source files
    const sourceFiles = VendorBundleGenerator.findSourceFiles(
      sourceDir,
      extensions
    );

    // Analyze each file
    for (const filePath of sourceFiles) {
      const content = fs.readFileSync(filePath, "utf-8");
      const fileImports = VendorBundleGenerator.extractImports(
        content,
        bundledDepsSet
      );

      for (const importInfo of fileImports) {
        const symbolSet = importsMap.get(importInfo.moduleName);
        if (symbolSet) {
          for (const symbol of importInfo.symbols) {
            symbolSet.add(symbol);
          }
          if (importInfo.isDefault) {
            defaultImportsSet.add(importInfo.moduleName);
          }
          if (importInfo.isNamespace) {
            namespaceImportsSet.add(importInfo.moduleName);
          }
        }
      }
    }

    // Convert to plain objects/arrays for JSII compatibility
    const imports: { [moduleName: string]: string[] } = {};
    for (const [moduleName, symbols] of importsMap) {
      imports[moduleName] = Array.from(symbols);
    }

    return {
      imports,
      defaultImports: Array.from(defaultImportsSet),
      namespaceImports: Array.from(namespaceImportsSet),
    };
  }

  /**
   * Generate a vendor entry point file that re-exports symbols from bundled dependencies.
   *
   * @param options Generation options
   * @returns The generated entry point content
   */
  public static generateEntryPoint(options: GenerateEntryPointOptions): string {
    const { analyzeResult } = options;
    const lines: string[] = [
      "// Auto-generated vendor entry point",
      "// This file re-exports symbols from bundled dependencies",
      "",
    ];

    const defaultImportsSet = new Set(analyzeResult.defaultImports);
    const namespaceImportsSet = new Set(analyzeResult.namespaceImports);

    for (const [moduleName, symbols] of Object.entries(analyzeResult.imports)) {
      const isDefault = defaultImportsSet.has(moduleName);
      const isNamespace = namespaceImportsSet.has(moduleName);

      if (isNamespace || symbols.length === 0) {
        // Re-export entire module as namespace
        lines.push(
          `export * as ${VendorBundleGenerator.toValidIdentifier(
            moduleName
          )} from '${moduleName}';`
        );
      } else if (isDefault && symbols.length === 0) {
        // Re-export default
        lines.push(
          `export { default as ${VendorBundleGenerator.toValidIdentifier(
            moduleName
          )} } from '${moduleName}';`
        );
      } else {
        // Re-export specific symbols
        const symbolList = [...symbols].sort();
        if (symbolList.length > 0) {
          lines.push(
            `export { ${symbolList.join(", ")} } from '${moduleName}';`
          );
        }
        // Also export default if needed
        if (isDefault) {
          lines.push(
            `export { default as ${VendorBundleGenerator.toValidIdentifier(
              moduleName
            )}Default } from '${moduleName}';`
          );
        }
      }
    }

    return lines.join("\n") + "\n";
  }

  /**
   * Write the vendor entry point file to disk.
   *
   * @param content The entry point content
   * @param outputPath The output file path
   */
  public static writeEntryPoint(content: string, outputPath: string): void {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(outputPath, content, "utf-8");
  }

  /**
   * Generate esbuild configuration for bundling the vendor entry point.
   *
   * @param options Configuration options
   * @returns The esbuild configuration
   */
  public static generateEsbuildConfig(
    options: EsbuildConfigOptions
  ): EsbuildConfig {
    const outfile = options.outfile ?? "lib/vendor.js";
    const externalDeps = options.externalDeps ?? ["constructs"];
    const target = options.target ?? "node18";
    const minify = options.minify ?? false;

    const args: string[] = [
      "esbuild",
      options.entryPoint,
      "--bundle",
      `--outfile=${outfile}`,
      "--platform=node",
      "--format=cjs",
      `--target=${target}`,
      "--tree-shaking=true",
    ];

    // Add external dependencies
    for (const dep of externalDeps) {
      args.push(`--external:${dep}`);
    }

    if (minify) {
      args.push("--minify");
    }

    return {
      args,
      entryPoint: options.entryPoint,
      outfile,
      external: externalDeps,
    };
  }

  /**
   * Find all source files in a directory recursively.
   *
   * @param dir Directory to search
   * @param extensions File extensions to include
   * @returns Array of file paths
   */
  private static findSourceFiles(dir: string, extensions: string[]): string[] {
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
          files.push(
            ...VendorBundleGenerator.findSourceFiles(fullPath, extensions)
          );
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }

    return files;
  }

  /**
   * Extract imports from file content that match bundled dependencies.
   *
   * @param content File content
   * @param bundledDeps Set of bundled dependency names
   * @returns Array of import information
   */
  private static extractImports(
    content: string,
    bundledDeps: Set<string>
  ): ImportInfo[] {
    const imports: ImportInfo[] = [];

    // Match ES6 imports: import { x, y } from 'module'
    // import x from 'module'
    // import * as x from 'module'
    const es6ImportRegex =
      /import\s+(?:(\*\s+as\s+\w+)|(\w+)|(?:\{([^}]+)\}))\s+from\s+['"]([^'"]+)['"]/g;

    let match;
    while ((match = es6ImportRegex.exec(content)) !== null) {
      const namespaceImport = match[1]; // * as x
      const defaultImport = match[2]; // x
      const namedImports = match[3]; // { x, y }
      const moduleName = match[4];

      // Check if this is a bundled dependency (exact match or subpath)
      const baseName = VendorBundleGenerator.getBaseModuleName(moduleName);
      if (!bundledDeps.has(baseName)) {
        continue;
      }

      const symbols: string[] = [];
      let isDefault = false;
      let isNamespace = false;

      if (namespaceImport) {
        isNamespace = true;
      } else if (defaultImport) {
        isDefault = true;
      } else if (namedImports) {
        // Parse named imports: { x, y as z, default as w }
        const parts = namedImports.split(",").map((s) => s.trim());
        for (const part of parts) {
          if (part) {
            // Handle 'x as y' syntax
            const asMatch = part.match(/^(\w+)(?:\s+as\s+\w+)?$/);
            if (asMatch) {
              if (asMatch[1] === "default") {
                isDefault = true;
              } else {
                symbols.push(asMatch[1]);
              }
            }
          }
        }
      }

      imports.push({
        moduleName: baseName,
        symbols,
        isDefault,
        isNamespace,
      });
    }

    // Match CommonJS requires: require('module')
    // const x = require('module')
    // const { x, y } = require('module')
    const requireRegex =
      /(?:const|let|var)\s+(?:(\w+)|(?:\{([^}]+)\}))\s*=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

    while ((match = requireRegex.exec(content)) !== null) {
      const defaultRequire = match[1]; // x
      const destructuredRequire = match[2]; // { x, y }
      const moduleName = match[3];

      // Check if this is a bundled dependency
      const baseName = VendorBundleGenerator.getBaseModuleName(moduleName);
      if (!bundledDeps.has(baseName)) {
        continue;
      }

      const symbols: string[] = [];
      let isDefault = false;
      let isNamespace = false;

      if (defaultRequire) {
        // Could be namespace or default depending on usage
        isNamespace = true;
      } else if (destructuredRequire) {
        const parts = destructuredRequire.split(",").map((s) => s.trim());
        for (const part of parts) {
          if (part) {
            const asMatch = part.match(/^(\w+)(?:\s*:\s*\w+)?$/);
            if (asMatch) {
              symbols.push(asMatch[1]);
            }
          }
        }
      }

      imports.push({
        moduleName: baseName,
        symbols,
        isDefault,
        isNamespace,
      });
    }

    return imports;
  }

  /**
   * Get the base module name from an import path.
   * Handles scoped packages and subpaths.
   *
   * @param importPath The import path
   * @returns The base module name
   */
  private static getBaseModuleName(importPath: string): string {
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
   * Convert a module name to a valid JavaScript identifier.
   *
   * @param moduleName The module name
   * @returns A valid identifier
   */
  private static toValidIdentifier(moduleName: string): string {
    // Replace @ and / with underscores, remove other invalid chars
    return moduleName
      .replace(/^@/, "")
      .replace(/[^a-zA-Z0-9_]/g, "_")
      .replace(/^(\d)/, "_$1");
  }
}
