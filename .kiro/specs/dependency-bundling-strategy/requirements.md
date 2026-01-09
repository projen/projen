# Requirements Document

## Introduction

This document specifies the requirements for a new dependency bundling strategy for projen. The current approach uses npm's `bundledDependencies` feature, which has several issues:

1. Dependencies are still listed in `package.json` `dependencies` array, causing npm to attempt installation when the package is installed
2. `bundledDependencies` doesn't work with Yarn PnP (Plug'n'Play)
3. No tree-shaking of bundled dependencies
4. The bundled code is duplicated (once in node_modules, once in the bundle)

The new strategy must bundle dependencies using esbuild at build time, removing them from the `dependencies` array in the published package while maintaining them during development for ESLint validation.

## Glossary

- **Bundler**: The projen component that uses esbuild to bundle JavaScript/TypeScript code into single files
- **Bundled_Dependency**: A third-party npm package that should be included inline in the published package rather than as an external dependency
- **Tree_Shaking**: The process of eliminating dead code from the final bundle
- **Deep_Import**: An import that references a specific file path within a package (e.g., `projen/lib/awscdk`) rather than the package root
- **Build_Time_Bundling**: The process of bundling dependencies during the compilation/build phase
- **Dev_Dependency**: A dependency only needed during development, not at runtime
- **Vendor_Directory**: A directory containing pre-bundled third-party code

## Requirements

### Requirement 1: Bundle Dependencies at Build Time

**User Story:** As a projen maintainer, I want dependencies to be bundled at build time using esbuild, so that they are inlined into the output files and not required as separate npm packages at runtime.

#### Acceptance Criteria

1. WHEN the build process runs, THE Bundler SHALL bundle all designated Bundled_Dependencies into the output JavaScript files
2. WHEN bundling dependencies, THE Bundler SHALL use esbuild with tree-shaking enabled to minimize bundle size
3. WHEN bundling is complete, THE Bundler SHALL produce output files that contain all necessary dependency code inline
4. THE Bundler SHALL preserve the existing file structure of projen's source code to maintain Deep_Import compatibility

### Requirement 2: Remove Bundled Dependencies from Published package.json

**User Story:** As a projen user, I want bundled dependencies removed from the published package.json dependencies array, so that npm doesn't attempt to install them when I install projen.

#### Acceptance Criteria

1. WHEN the package is prepared for publishing, THE Build_System SHALL remove Bundled_Dependencies from the `dependencies` field in package.json
2. WHEN the package is prepared for publishing, THE Build_System SHALL remove the `bundledDependencies` field from package.json entirely
3. WHEN a user installs projen, THE Package SHALL not trigger installation of any Bundled_Dependencies
4. THE published package.json SHALL only contain `constructs` as a runtime dependency (the peer dependency)

### Requirement 3: Maintain Dependencies During Development

**User Story:** As a projen developer, I want bundled dependencies available during development, so that ESLint can validate imports and TypeScript can provide type checking.

#### Acceptance Criteria

1. WHILE in development mode, THE Build_System SHALL keep Bundled_Dependencies in the `dependencies` field of package.json
2. WHEN running ESLint, THE Linter SHALL be able to validate that imports reference declared dependencies
3. WHEN running TypeScript compilation, THE Compiler SHALL have access to type definitions from Bundled_Dependencies
4. THE development workflow SHALL not require manual switching between development and publish configurations

### Requirement 4: Preserve Source File Structure

**User Story:** As a projen user who uses deep imports, I want the file structure to remain unchanged, so that my existing imports continue to work.

#### Acceptance Criteria

1. THE Bundler SHALL NOT change the output directory structure from the current `lib/` layout
2. WHEN bundling, THE Bundler SHALL bundle dependencies into each source file that uses them rather than creating a single bundle file
3. FOR ALL existing deep imports (e.g., `projen/lib/awscdk`), THE published package SHALL continue to resolve them correctly
4. THE Bundler SHALL preserve all existing export paths and module boundaries

### Requirement 5: Handle Dependency Type Definitions

**User Story:** As a projen developer, I want type definitions for bundled dependencies to be available, so that TypeScript compilation and IDE support work correctly.

#### Acceptance Criteria

1. WHEN bundling dependencies, THE Build_System SHALL ensure type definitions remain available for development
2. THE Build_System SHALL maintain `@types/*` packages as Dev_Dependencies for bundled dependencies that require them
3. WHEN the package is published, THE Package SHALL not require consumers to install type definition packages for bundled dependencies

### Requirement 6: Support Yarn PnP Compatibility

**User Story:** As a projen user using Yarn PnP, I want projen to work correctly, so that I can use modern package management features.

#### Acceptance Criteria

1. WHEN installed in a Yarn PnP environment, THE Package SHALL function correctly without bundledDependencies issues
2. THE Package SHALL not rely on node_modules resolution for bundled code at runtime
3. WHEN bundled code is executed, THE Runtime SHALL resolve all bundled dependencies from inline code

### Requirement 7: Automated Build Integration

**User Story:** As a projen maintainer, I want the bundling process to be automated, so that I don't need to manually manage the bundling workflow.

#### Acceptance Criteria

1. WHEN running `node ./projen.js build`, THE Build_System SHALL automatically bundle dependencies
2. WHEN running `node ./projen.js compile`, THE Build_System SHALL produce bundled output
3. THE Build_System SHALL integrate bundling into the existing projen task workflow
4. IF bundling fails, THEN THE Build_System SHALL report clear error messages indicating the failure cause

### Requirement 8: Package.json Transformation for Publishing

**User Story:** As a projen maintainer, I want package.json to be automatically transformed for publishing, so that the published package has the correct dependency configuration.

#### Acceptance Criteria

1. WHEN preparing for npm publish, THE Build_System SHALL create a modified package.json without Bundled_Dependencies
2. THE Build_System SHALL preserve all other package.json fields during transformation
3. WHEN the jsii packaging process runs, THE Package SHALL use the transformed package.json
4. THE transformation process SHALL be reversible for local development workflows
