import * as path from "path";
import { NodeProject } from "./node-project";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Task } from "../task";

/**
 * Options for the DependencyBundler component.
 */
export interface DependencyBundlerOptions {
  /**
   * List of dependencies to bundle into the vendor bundle.
   * These will be inlined during build and removed from published package.json.
   */
  readonly bundledDeps: string[];

  /**
   * Dependencies that should remain external (not bundled).
   * @default ['constructs']
   */
  readonly externalDeps?: string[];

  /**
   * Output directory for bundled files.
   * @default 'lib'
   */
  readonly outdir?: string;

  /**
   * Name of the vendor bundle file.
   * @default 'vendor.js'
   */
  readonly vendorFile?: string;

  /**
   * Enable tree-shaking to minimize bundle size.
   * @default true
   */
  readonly treeShake?: boolean;

  /**
   * Target Node.js version for bundling.
   * @default 'node18'
   */
  readonly target?: string;

  /**
   * The semantic version requirement for `esbuild`.
   * @default - no specific version (implies latest)
   */
  readonly esbuildVersion?: string;

  /**
   * Automatically integrate with the project's build workflow.
   * When true, tasks are automatically added to post-compile and package phases.
   * @default true
   */
  readonly autoIntegrate?: boolean;
}

/**
 * Component that bundles dependencies at build time using esbuild with a vendor bundle approach.
 *
 * This component:
 * 1. Creates a vendor bundle containing all bundled dependencies
 * 2. Rewrites imports in compiled files to reference the vendor bundle
 * 3. Transforms package.json for publishing by removing bundled dependencies
 *
 * The vendor bundle approach avoids code duplication while maintaining
 * the file structure for deep imports.
 */
export class DependencyBundler extends Component {
  /**
   * Returns the `DependencyBundler` instance associated with a project
   * or `undefined` if there is no DependencyBundler.
   * @param project The project
   * @returns A DependencyBundler or undefined
   */
  public static of(project: NodeProject): DependencyBundler | undefined {
    const isDependencyBundler = (o: Component): o is DependencyBundler =>
      o instanceof DependencyBundler;
    return project.components.find(isDependencyBundler);
  }

  /**
   * The task that creates the vendor bundle.
   */
  public readonly vendorBundleTask: Task;

  /**
   * The task that rewrites imports to use the vendor bundle.
   */
  public readonly rewriteImportsTask: Task;

  /**
   * The task that transforms package.json for publishing.
   */
  public readonly transformPackageJsonTask: Task;

  /**
   * List of dependencies being bundled.
   */
  public readonly bundledDeps: string[];

  /**
   * Dependencies that remain external.
   */
  public readonly externalDeps: string[];

  /**
   * Output directory for bundled files.
   */
  public readonly outdir: string;

  /**
   * Name of the vendor bundle file.
   */
  public readonly vendorFile: string;

  /**
   * Target Node.js version for bundling.
   */
  public readonly target: string;

  private readonly treeShake: boolean;
  private readonly esbuildVersion?: string;

  constructor(project: NodeProject, options: DependencyBundlerOptions) {
    super(project);

    // Validate options
    this.validateOptions(options);

    this.bundledDeps = options.bundledDeps;
    this.externalDeps = options.externalDeps ?? ["constructs"];
    this.outdir = options.outdir ?? "lib";
    this.vendorFile = options.vendorFile ?? "vendor.js";
    this.target = options.target ?? "node18";
    this.treeShake = options.treeShake ?? true;
    this.esbuildVersion = options.esbuildVersion;

    // Add esbuild as a build dependency
    this.addEsbuildDependency(project);

    // Create the vendor bundle task
    this.vendorBundleTask = this.createVendorBundleTask(project);

    // Create the rewrite imports task
    this.rewriteImportsTask = this.createRewriteImportsTask(project);

    // Create the transform package.json task
    this.transformPackageJsonTask =
      this.createTransformPackageJsonTask(project);

    // Automatically integrate with workflow if enabled (default)
    if (options.autoIntegrate ?? true) {
      this.integrateWithWorkflow();
    }
  }

  /**
   * Validate the options provided to the DependencyBundler.
   * @throws Error if validation fails
   */
  private validateOptions(options: DependencyBundlerOptions): void {
    // Validate bundledDeps is provided and non-empty
    if (!options.bundledDeps || options.bundledDeps.length === 0) {
      throw new Error(
        "DependencyBundler requires at least one dependency in bundledDeps"
      );
    }

    // Validate bundledDeps entries are valid package names
    for (const dep of options.bundledDeps) {
      if (!dep || typeof dep !== "string" || dep.trim() === "") {
        throw new Error(
          `Invalid dependency name in bundledDeps: "${dep}". ` +
            "Dependency names must be non-empty strings."
        );
      }
    }

    // Validate externalDeps entries if provided
    if (options.externalDeps) {
      for (const dep of options.externalDeps) {
        if (!dep || typeof dep !== "string" || dep.trim() === "") {
          throw new Error(
            `Invalid dependency name in externalDeps: "${dep}". ` +
              "Dependency names must be non-empty strings."
          );
        }
      }
    }

    // Validate outdir if provided
    if (options.outdir !== undefined) {
      if (typeof options.outdir !== "string" || options.outdir.trim() === "") {
        throw new Error(
          `Invalid outdir: "${options.outdir}". ` +
            "Output directory must be a non-empty string."
        );
      }
    }

    // Validate vendorFile if provided
    if (options.vendorFile !== undefined) {
      if (
        typeof options.vendorFile !== "string" ||
        options.vendorFile.trim() === ""
      ) {
        throw new Error(
          `Invalid vendorFile: "${options.vendorFile}". ` +
            "Vendor file name must be a non-empty string."
        );
      }
      if (!options.vendorFile.endsWith(".js")) {
        throw new Error(
          `Invalid vendorFile: "${options.vendorFile}". ` +
            "Vendor file must have a .js extension."
        );
      }
    }

    // Validate target if provided
    if (options.target !== undefined) {
      if (typeof options.target !== "string" || options.target.trim() === "") {
        throw new Error(
          `Invalid target: "${options.target}". ` +
            "Target must be a non-empty string (e.g., 'node18')."
        );
      }
    }

    // Check for overlap between bundledDeps and externalDeps
    if (options.externalDeps) {
      const bundledSet = new Set(options.bundledDeps);
      const overlap = options.externalDeps.filter((dep) => bundledSet.has(dep));
      if (overlap.length > 0) {
        throw new Error(
          `Dependencies cannot be both bundled and external: ${overlap.join(
            ", "
          )}. ` + "Remove them from either bundledDeps or externalDeps."
        );
      }
    }
  }

  /**
   * Add esbuild as a build dependency.
   */
  private addEsbuildDependency(project: NodeProject): void {
    const dep = this.esbuildVersion
      ? `esbuild@${this.esbuildVersion}`
      : "esbuild";
    project.deps.addDependency(dep, DependencyType.BUILD);
  }

  /**
   * Create the vendor bundle task that generates the vendor bundle.
   */
  private createVendorBundleTask(project: NodeProject): Task {
    const vendorEntryPath = path.join(this.outdir, ".vendor-entry.js");
    const vendorOutPath = path.join(this.outdir, this.vendorFile);

    const task = project.addTask("vendor-bundle", {
      description: "Generate vendor bundle from bundled dependencies",
    });

    // Step 1: Generate vendor entry point
    task.exec(`node -e "${this.generateVendorEntryScript(vendorEntryPath)}"`, {
      name: "generate-vendor-entry",
    });

    // Step 2: Bundle with esbuild
    const esbuildArgs = this.buildEsbuildArgs(vendorEntryPath, vendorOutPath);
    task.exec(esbuildArgs.join(" "), { name: "esbuild-vendor" });

    // Step 3: Clean up entry point
    task.exec(`rm -f ${vendorEntryPath}`, { name: "cleanup-vendor-entry" });

    return task;
  }

  /**
   * Generate the inline script for creating the vendor entry point.
   * Includes error handling for missing dependencies.
   */
  private generateVendorEntryScript(outputPath: string): string {
    // Escape for shell and JavaScript
    const deps = this.bundledDeps.map((d) => `'${d}'`).join(",");
    const script = `
const fs = require('fs');
const path = require('path');
const deps = [${deps}];
const lines = ['// Auto-generated vendor entry point'];
const missing = [];
for (const dep of deps) {
  try {
    require.resolve(dep);
    const id = dep.replace(/^@/, '').replace(/[^a-zA-Z0-9_]/g, '_');
    lines.push('module.exports.' + id + ' = require(\\\"' + dep + '\\\");');
  } catch (e) {
    missing.push(dep);
  }
}
if (missing.length > 0) {
  console.error('ERROR: The following bundled dependencies are not installed:');
  missing.forEach(d => console.error('  - ' + d));
  console.error('\\nPlease run your package manager install command first.');
  process.exit(1);
}
const dir = path.dirname('${outputPath}');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync('${outputPath}', lines.join('\\n') + '\\n');
console.log('Generated vendor entry point with ' + deps.length + ' dependencies');
`.replace(/\n/g, " ");
    return script;
  }

  /**
   * Build esbuild command line arguments.
   */
  private buildEsbuildArgs(entryPoint: string, outfile: string): string[] {
    const args = [
      "esbuild",
      entryPoint,
      "--bundle",
      `--outfile=${outfile}`,
      "--platform=node",
      "--format=cjs",
      `--target=${this.target}`,
    ];

    if (this.treeShake) {
      args.push("--tree-shaking=true");
    }

    // Add external dependencies
    for (const dep of this.externalDeps) {
      args.push(`--external:${dep}`);
    }

    return args;
  }

  /**
   * Create the rewrite imports task.
   * Includes error handling for rewrite failures.
   */
  private createRewriteImportsTask(project: NodeProject): Task {
    const task = project.addTask("rewrite-imports", {
      description: "Rewrite imports to use vendor bundle",
    });

    // Generate the rewrite script inline with error handling
    // Escape double quotes for shell embedding
    const bundledDepsJson = JSON.stringify(this.bundledDeps).replace(
      /"/g,
      '\\"'
    );
    const externalDepsJson = JSON.stringify(this.externalDeps).replace(
      /"/g,
      '\\"'
    );

    const script = `
try {
  const { ImportRewriter } = require('./lib/javascript/import-rewriter');
  const result = ImportRewriter.rewriteImports({
    bundledDeps: ${bundledDepsJson},
    externalDeps: ${externalDepsJson},
    libDir: '${this.outdir}',
    vendorFile: '${this.vendorFile}'
  });
  console.log('Rewrote ' + result.totalRewritten + ' imports in ' + result.files.length + ' files');
  if (result.files.length > 0) {
    result.files.forEach(f => console.log('  - ' + f.filePath + ': ' + f.rewrittenModules.join(', ')));
  }
} catch (e) {
  console.error('ERROR: Failed to rewrite imports:', e.message);
  console.error('\\nThis may indicate that the lib directory does not exist or ImportRewriter is not available.');
  process.exit(1);
}
`.replace(/\n/g, " ");

    task.exec(`node -e "${script}"`, { name: "rewrite-imports" });

    return task;
  }

  /**
   * Create the transform package.json task for publishing.
   * Includes error handling for transformation failures.
   */
  private createTransformPackageJsonTask(project: NodeProject): Task {
    const task = project.addTask("transform-package-json", {
      description:
        "Transform package.json for publishing (remove bundled deps)",
    });

    // Escape double quotes for shell embedding
    const bundledDepsJson = JSON.stringify(this.bundledDeps).replace(
      /"/g,
      '\\"'
    );

    const script = `
try {
  const fs = require('fs');
  if (!fs.existsSync('package.json')) {
    console.error('ERROR: package.json not found');
    process.exit(1);
  }
  const pkgContent = fs.readFileSync('package.json', 'utf-8');
  let pkg;
  try {
    pkg = JSON.parse(pkgContent);
  } catch (parseErr) {
    console.error('ERROR: Failed to parse package.json:', parseErr.message);
    process.exit(1);
  }
  const { PackageJsonTransformer } = require('./lib/javascript/package-json-transformer');
  const result = PackageJsonTransformer.transform(pkg, {
    removeDeps: ${bundledDepsJson},
    removeBundledDependencies: true
  });
  fs.writeFileSync('package.json', JSON.stringify(result.packageJson, null, 2) + '\\n');
  const removedCount = Object.keys(result.removedDeps).length;
  if (removedCount > 0) {
    console.log('Removed ' + removedCount + ' bundled dependencies from package.json:');
    Object.keys(result.removedDeps).forEach(d => console.log('  - ' + d));
  } else {
    console.log('No bundled dependencies found in package.json to remove');
  }
} catch (e) {
  console.error('ERROR: Failed to transform package.json:', e.message);
  process.exit(1);
}
`.replace(/\n/g, " ");

    task.exec(`node -e "${script}"`, { name: "transform-package-json" });

    return task;
  }

  /**
   * Integrate tasks with the project workflow.
   * This should be called after the component is created.
   */
  public integrateWithWorkflow(): void {
    const project = this.project as NodeProject;

    // Add vendor bundle task to post-compile phase
    project.postCompileTask.spawn(this.vendorBundleTask);

    // Add rewrite imports task after vendor bundle
    project.postCompileTask.spawn(this.rewriteImportsTask);

    // Add transform package.json task to package phase
    project.packageTask.prependSpawn(this.transformPackageJsonTask);
  }
}
