# GitHub Release Automation for Poetry projects

> **Author**: [@bhrutledge](https://github.com/bhrutledge), **Status**: Draft

This RFC proposes an enhancement to projen's release automation system to support Python Poetry projects, addressing the issue described in <https://github.com/projen/projen/discussions/4078>.

## Problem Statement

Currently, projen's `Release` component requires a JSON version file for version management, which is incompatible with Poetry's use of `pyproject.toml`. This causes several issues:

1. Poetry projects cannot effectively use the `Release` component
2. Version management is inconsistent between the release process and Poetry
3. Built Python packages may not have the correct version

## Current Release Automation Architecture

The [`Release`](../src/release/release.ts) class orchestrates the entire release process, including:

- Creating GitHub workflows for release automation
- Coordinating version bumping and changelog generation
- Managing release artifacts and publishing targets

The `Release` class is typically initialized in the project constructor, as seen in [`NodeProject`](../src/javascript/node-project.ts):

```typescript
this.release = new Release(this, {
  versionFile: "package.json", // this is where "version" is set after bump
  task: this.buildTask,
  branch: options.defaultReleaseBranch ?? "main",
  ...options,

  artifactsDirectory: this.artifactsDirectory,
  releaseWorkflowSetupSteps: [
    ...this.renderWorkflowSetup({
      installStepConfiguration: {
        workingDirectory: this.determineInstallWorkingDirectory(),
      },
      mutable: false,
    }),
    ...(options.releaseWorkflowSetupSteps ?? []),
  ],

  // ...other options
});
```

The `Release` class creates and manages an instance of the `Version` class, which:

- Provides tasks for bumping and resetting versions
- Manages changelog generation
- Creates files that track the version and release tag

Version bumping is implemented through a series of components:

- The [`Version`](../src/version.ts) component sets up projen tasks for version bumping and changelog generation
- The `bump` task uses code from [`bump-version.task.ts`](../src/release/bump-version.task.ts), which calls the [`bump`](../src/release/bump-version.ts) function
- The `bump` function uses the [`CommitAndTagVersion`](../src/release/commit-tag-version.ts) class, which wraps the [`commit-and-tag-version` npm package](https://www.npmjs.com/package/commit-and-tag-version/)
- This process updates `package.json` and generates a changelog based on conventional commits

### Version Bumping Process Flow

```mermaid
flowchart TD
    A[NodeProject] -->|instantiates| B[Release]
    B -->|creates| W[release workflow]
    B -->|instantiates| C[Version]
    C -->|adds| D[bump-version task]
    W -->|runs| E[release task]
    B -->|adds| E
    E -->|spawns| D
    D -->|instantiates| H[CommitAndTagVersion]
    H -->|executes| J[commit-and-tag-version]
    J -->|sets new version| K[package.json]
    D -->|sets current version| K
    J -->|generates| L[changelog.md]
    H -->|generates| M[releasetag.txt]
```

## Proposed Solution

Fortunately, the `commit-and-tag-version` package already [supports Poetry](https://github.com/absolute-version/commit-and-tag-version?tab=readme-ov-file#python-support).
We can leverage this existing capability by implementing an extensible architecture that follows `commit-and-tag-version`'s approach for handling different types of version files.

### `CommitAndTagVersion` Changes

The current implementation in the `CommitAndTagVersion` class hard-codes the version file type as `"json"`:

```typescript
const catvConfig: CommitAndTagConfig = {
  packageFiles: [
    {
      filename: this.options.versionFile,
      type: "json",
    },
  ],
  bumpFiles: [
    {
      filename: this.options.versionFile,
      type: "json",
    },
  ],
  // ... other options
};
```

However, the `commit-and-tag-version` package can [detect file types automatically](https://github.com/absolute-version/commit-and-tag-version/blob/400e3c17616cfc2481c5a17dad85c0d4d67a49f1/lib/updaters/index.js#L23-L51)
if the `type` property is omitted, e.g.:

```javascript
if (/pyproject.toml/.test(filename)) {
    return getUpdaterByType('python');
}
```

So, we should remove the `type` property from the configuration:

```typescript
const catvConfig: CommitAndTagConfig = {
  packageFiles: [
    {
      filename: this.options.versionFile,
    },
  ],
  bumpFiles: [
    {
      filename: this.options.versionFile,
    },
  ],
  // ... other options
};
```

### Version File Handler Architecture

projen's internal version handling in [`bump-version.ts`](../src/release/bump-version.ts) currently assumes that the version file is JSON.
Instead, we can create a flexible pattern that mirrors the approach in `commit-and-tag-version`.

In `src/release/bump-version.ts`:

```typescript
interface VersionFileHandler {
  /** Read version from the file */
  readVersion(): Promise<string | undefined>;
  
  /** Write version to the file, preserving formatting */
  writeVersion(version: string): Promise<void>;
}

class JsonVersionHandler implements VersionFileHandler {
  constructor(private filePath: string) {}

  // Implementation mirrors commit-and-tag-version's JSON updater:
  // https://github.com/absolute-version/commit-and-tag-version/blob/master/lib/updaters/types/json.js
}

class PythonVersionHandler implements VersionFileHandler {
  constructor(private filePath: string) {}

  // Implementation mirrors commit-and-tag-version's Python updater:
  // https://github.com/absolute-version/commit-and-tag-version/blob/master/lib/updaters/types/python.js
}

function createVersionHandler(filePath: string): VersionFileHandler {
  if (filePath.endsWith('pyproject.toml') || filePath.endsWith('setup.py')) {
    return new PythonVersionHandler(filePath);
  }
  // Default to JSON for backward compatibility
  return new JsonVersionHandler(filePath);
}

export async function bump(cwd: string, options: BumpOptions) {
  // Replace:
  const { contents, newline } = await tryReadVersionFile(versionFile);
  contents.version = latestVersion;
  await fs.writeFile(versionFile, JSON.stringify(contents, undefined, 2) + (newline ? "\n" : ""));

  // With:
  await createVersionHandler(versionFile).writeVersion(latestVersion);

  // Replace:
  const newVersion = (await tryReadVersionFile(versionFile)).version;

  // With:
  const newVersion = await createVersionHandler(versionFile).readVersion();
}

// Remove the tryReadVersionFile function
```

### `PythonProject` Integration

The changes above should enable users to manually instantiate `Release` in their Python Poetry projects:

```typescript
const project = new PythonProject({
  // ... options
});

new Release(project, {
  versionFile: "pyproject.toml",
  task: project.buildTask,
  branch: "main",
  // ... other release options
});
```

For a more comprehensive solution, we could update the `PythonProject` class to create and configure a `Release` component when Poetry is enabled:

```typescript
export interface PythonProjectOptions
  extends GitHubProjectOptions,
    PythonPackagingOptions,
    PythonExecutableOptions,
    ReleaseProjectOptions {

  // Existing options...

  /**
   * Automatically release when new versions are introduced.
   * @default false
   */
  readonly release?: boolean;
}

export class PythonProject extends Project {
  constructor(options: PythonProjectOptions) {
    super(options);

    if (options.poetry) {
      this.poetry = new Poetry(this, options.poetryOptions);

      if (options.release) {
        this.release = new Release(this, {
          versionFile: 'pyproject.toml', // Use Poetry's pyproject.toml instead of package.json
          // ...other options
        });
      }
    }
  }
}
```
