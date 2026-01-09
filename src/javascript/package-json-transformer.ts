/**
 * Options for transforming package.json for publishing.
 */
export interface PackageJsonTransformOptions {
  /**
   * Dependencies to remove from the dependencies field.
   */
  readonly removeDeps: string[];

  /**
   * Whether to remove the bundledDependencies field entirely.
   * @default true
   */
  readonly removeBundledDependencies?: boolean;
}

/**
 * Result of a package.json transformation.
 */
export interface TransformResult {
  /**
   * The transformed package.json content.
   */
  readonly packageJson: Record<string, unknown>;

  /**
   * Dependencies that were removed (name -> version).
   */
  readonly removedDeps: Record<string, string>;
}

/**
 * Utility for transforming package.json for publishing by removing bundled dependencies.
 *
 * This transformer is used during the publish workflow to:
 * 1. Remove bundled dependencies from the `dependencies` field
 * 2. Remove the `bundledDependencies` field entirely
 *
 * The transformation is reversible using the `restore()` method, which allows
 * switching back to development mode where dependencies are needed for
 * ESLint validation and TypeScript type checking.
 */
export class PackageJsonTransformer {
  /**
   * Transform package.json for publishing.
   *
   * This method removes specified dependencies from the `dependencies` field
   * and optionally removes the `bundledDependencies` field entirely.
   * All other fields in package.json are preserved unchanged.
   *
   * @param packageJson The original package.json content
   * @param options Transformation options
   * @returns The transformation result containing the modified package.json and removed deps
   */
  public static transform(
    packageJson: Record<string, unknown>,
    options: PackageJsonTransformOptions
  ): TransformResult {
    const removeBundledDependencies = options.removeBundledDependencies ?? true;
    const removedDeps: Record<string, string> = {};

    // Create a shallow copy to avoid mutating the original
    const result: Record<string, unknown> = { ...packageJson };

    // Remove specified dependencies from the dependencies field
    if (
      result.dependencies &&
      typeof result.dependencies === "object" &&
      !Array.isArray(result.dependencies)
    ) {
      const deps = { ...(result.dependencies as Record<string, string>) };

      for (const dep of options.removeDeps) {
        if (dep in deps) {
          removedDeps[dep] = deps[dep];
          delete deps[dep];
        }
      }

      result.dependencies = deps;
    }

    // Remove bundledDependencies field if requested
    if (removeBundledDependencies && "bundledDependencies" in result) {
      delete result.bundledDependencies;
    }

    return {
      packageJson: result,
      removedDeps,
    };
  }

  /**
   * Restore package.json to development state.
   *
   * This method restores previously removed dependencies back to the
   * `dependencies` field, allowing the package.json to be used for
   * development workflows where dependencies are needed.
   *
   * @param packageJson The transformed package.json
   * @param originalDeps The original dependencies to restore (name -> version)
   * @returns The restored package.json content
   */
  public static restore(
    packageJson: Record<string, unknown>,
    originalDeps: Record<string, string>
  ): Record<string, unknown> {
    // Create a shallow copy to avoid mutating the original
    const result: Record<string, unknown> = { ...packageJson };

    // Get existing dependencies or create empty object
    const existingDeps =
      result.dependencies &&
      typeof result.dependencies === "object" &&
      !Array.isArray(result.dependencies)
        ? { ...(result.dependencies as Record<string, string>) }
        : {};

    // Restore the original dependencies
    result.dependencies = {
      ...existingDeps,
      ...originalDeps,
    };

    return result;
  }
}
