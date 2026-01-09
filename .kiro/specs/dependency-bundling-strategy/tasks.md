# Implementation Plan: Dependency Bundling Strategy

## Overview

This implementation plan transforms projen's dependency bundling from npm's `bundledDependencies` to build-time bundling using esbuild with a vendor bundle approach. The implementation is done in TypeScript, integrating with projen's existing task system.

## Tasks

- [-] 1. Create PackageJsonTransformer utility
  - [-] 1.1 Implement transform function to remove bundled dependencies
    - Create `src/javascript/package-json-transformer.ts`
    - Implement `transform()` static method that removes specified deps from dependencies field
    - Implement removal of bundledDependencies field
    - Preserve all other package.json fields
    - _Requirements: 2.1, 2.2, 8.1, 8.2_

  - [ ]* 1.2 Write property test for transformation correctness
    - **Property 2: Package.json Transformation Correctness**
    - **Validates: Requirements 2.1, 2.2, 2.4, 8.1**

  - [ ] 1.3 Implement restore function for development workflow
    - Implement `restore()` static method to restore original dependencies
    - Store original deps in a backup mechanism
    - _Requirements: 8.4_

  - [ ]* 1.4 Write property test for transformation integrity
    - **Property 4: Transformation Integrity**
    - **Validates: Requirements 8.2, 8.4**

- [ ] 2. Checkpoint - Ensure PackageJsonTransformer tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Create VendorBundleGenerator utility
  - [ ] 3.1 Implement vendor entry point generator
    - Create `src/javascript/vendor-bundle-generator.ts`
    - Implement function to analyze source files for bundled dependency imports
    - Generate vendor entry point file that re-exports used symbols
    - _Requirements: 1.1, 1.2_

  - [ ] 3.2 Implement esbuild bundling for vendor bundle
    - Create esbuild configuration for vendor bundle
    - Enable tree-shaking
    - Mark external dependencies (constructs) as external
    - Output to `lib/vendor.js`
    - _Requirements: 1.1, 1.2, 1.3_

  - [ ] 3.3 Write unit tests for vendor bundle generation
    - Test entry point generation with various import patterns
    - Test esbuild configuration generation
    - _Requirements: 1.1, 1.2_

- [ ] 4. Create ImportRewriter utility
  - [ ] 4.1 Implement import rewriting logic
    - Create `src/javascript/import-rewriter.ts`
    - Scan compiled JS files for requires of bundled dependencies
    - Rewrite requires to reference vendor bundle with correct relative path
    - Preserve requires of external dependencies
    - _Requirements: 4.2, 4.3, 4.4_

  - [ ]* 4.2 Write property test for file structure preservation
    - **Property 3: File Structure Preservation**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4**

- [ ] 5. Checkpoint - Ensure utility tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Create DependencyBundler component
  - [ ] 6.1 Implement DependencyBundler component class
    - Create `src/javascript/dependency-bundler.ts`
    - Implement constructor with DependencyBundlerOptions
    - Create vendorBundleTask that generates vendor bundle
    - Create rewriteImportsTask that rewrites imports
    - Create transformPackageJsonTask for publishing
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ] 6.2 Integrate with projen task workflow
    - Add vendorBundleTask to post-compile phase
    - Add rewriteImportsTask after vendor bundle
    - Add transformPackageJsonTask to package phase
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ] 6.3 Implement error handling
    - Add clear error messages for missing dependencies
    - Add error handling for esbuild failures
    - Add validation for configuration
    - _Requirements: 7.4_

  - [ ]* 6.4 Write property test for bundled code self-containment
    - **Property 1: Bundled Code Self-Containment**
    - **Validates: Requirements 1.1, 1.3, 6.2, 6.3**

- [ ] 7. Checkpoint - Ensure DependencyBundler tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Update projen's own configuration to use new bundling
  - [ ] 8.1 Modify .projenrc.ts to use DependencyBundler
    - Replace bundledDeps with new DependencyBundler component
    - Configure bundled dependencies list
    - Configure external dependencies (constructs)
    - _Requirements: 1.1, 2.1, 3.1_

  - [ ] 8.2 Update package.json handling
    - Ensure bundled deps remain in dependencies during development
    - Ensure @types packages remain as devDependencies
    - _Requirements: 3.1, 3.2, 3.3, 5.1, 5.2_

  - [ ] 8.3 Remove bundledDependencies from JsiiProject options
    - Update JsiiProject to not use bundledDeps option
    - Ensure backward compatibility for existing projects
    - _Requirements: 2.2_

- [ ] 9. Checkpoint - Verify projen builds successfully
  - Run `node ./projen.js build`
  - Verify vendor.js is generated
  - Verify imports are rewritten
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Integration testing
  - [ ] 10.1 Write integration test for end-to-end bundling
    - Create test project with bundled dependencies
    - Run build and verify vendor bundle is created
    - Verify bundled output works without node_modules
    - _Requirements: 1.3, 6.1, 6.2, 6.3_

  - [ ]* 10.2 Write integration test for deep imports
    - Verify all documented deep import paths resolve correctly
    - Test imports like `projen/lib/awscdk`
    - _Requirements: 4.3_

- [ ] 11. Final checkpoint - Full build verification
  - Run `node ./projen.js build`
  - Verify no bundled dependencies in published package.json
  - Verify vendor.js contains bundled code
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using fast-check
- Unit tests validate specific examples and edge cases
- The implementation uses TypeScript throughout, matching projen's codebase
