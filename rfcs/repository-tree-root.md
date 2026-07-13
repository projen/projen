# RFC: Introduce Repository as the Construct Tree Root

- **Status:** Draft
- **Authors:** Momo Kornher (@mrgrain), Thorsten Hoeger (@hoegertn)
- **Created:** 2026-02-16
- **Discussion:** Slack #tmp-projen-github-rfc

## Summary

This RFC proposes introducing a new `Repository` class that sits above `Project` in the projen construct tree. Similar to how `App` and `Stack` relate in the AWS CDK, `Repository` represents the git repository as a whole, while `Project` represents an individual buildable unit within it. This separation addresses long-standing pain points around CI/CD workflow management in monorepo setups and lays the groundwork for portable CI/CD abstractions.

## Motivation

### The Problem

Today, projen conflates two distinct concepts into the `Project` class:

1. **Repository-level concerns** — git configuration, CI/CD workflows, PR templates, Dependabot, Renovatebot
2. **Project-level concerns** — source code, dependencies, build tasks, tests

This conflation causes several problems:

**Monorepo awkwardness.** In a monorepo with multiple subprojects, GitHub Actions workflows are singletons tied to the repository, not to individual projects. Currently, the `GitHub` component is attached to the root `Project` and subprojects get `github === undefined`. Finding the right `GitHub` component from a subproject requires walking up the parent chain and casting — something that shouldn't be necessary.

**GitHubProject does too much.** `GitHubProject` extends `Project` and bundles GitHub integration, VSCode settings, Gitpod config, DevContainer setup, and auto-approve workflows into a single class. This makes it impossible to use GitHub CI without also inheriting IDE configuration, and impossible to swap GitHub for GitLab without changing the entire project base class.

**CI platform lock-in at the type level.** Components like `Release` directly import GitHub-specific types (`GithubWorkflow`, `TaskWorkflowJob`, `JobStep`). Switching CI platforms requires rewriting these components, not just swapping a configuration option.

**No clear ownership of shared config.** Files like `.gitignore`, `.gitattributes`, and Renovatebot configuration are repository-wide concerns that currently live on the root `Project`. In a monorepo, it's unclear which project "owns" these files.

### The Goal

Introduce a clear separation between repository-level and project-level concerns:

- **Repository** owns git configuration, CI/CD platform integration, and shared repository config
- **Project** owns source code, build tasks, dependencies, and IDE tooling

This separation makes monorepo workflows natural, enables CI platform portability in the future, and simplifies the class hierarchy.

## Design

### Construct Tree Structure

The new construct tree follows the same pattern as CDK's `App` / `Stack` hierarchy:

```
Repository (tree root)
├── .gitignore
├── .gitattributes
├── Renovatebot
├── GitHub / GitLab component (CI platform)
│   ├── Workflows
│   ├── PR templates
│   ├── Dependabot / Mergify
│   └── CODEOWNERS
└── Project (root project)
    ├── Tasks
    ├── Dependencies
    ├── ProjectBuild
    ├── VSCode / Gitpod / DevContainer
    ├── Source files
    └── Project (subproject, in monorepo)
        ├── Tasks
        ├── Dependencies
        └── Source files
```

### Class Hierarchy

```
Construct
├── Repository (new)
│   ├── GitRepository (new) — git-specific config
│   │   ├── GitHubRepository (new) — GitHub platform
│   │   └── GitLabRepository (new) — GitLab platform
└── Project (existing, modified)
    ├── NodeProject
    │   └── TypeScriptProject
    ├── PythonProject
    └── JavaProject
```


### Repository Base Class

`Repository` extends `Construct` and serves as the construct tree root. It manages repository-wide concerns and provides a lookup mechanism for child projects.

```typescript
import { Construct, IConstruct } from "constructs";

export interface RepositoryOptions {
  // ...
}

export abstract class Repository extends Construct {
  /**
   * Find the closest Repository by walking up the construct tree.
   * Results are cached on the construct for performance.
   */
  public static of(construct: IConstruct): Repository { ... }

  /**
   * All projects within this repository.
   */
  public get projects(): Project[] { ... }

  /**
   * Synthesize the repository and all its projects.
   */
  public synth(): void { ... }
}
```

### GitRepository

`GitRepository` extends `Repository` and adds git-specific file management and shared CI configuration.

```typescript
export interface GitRepositoryOptions extends RepositoryOptions {
  /**
   * Configuration options for git.
   */
  readonly gitOptions?: GitOptions;

}

export class GitRepository extends Repository {
  public readonly gitignore: IgnoreFile;
  public readonly gitattributes: GitAttributesFile;

  constructor(options: GitRepositoryOptions) { ... }
}
```

**Owned by GitRepository (moved from Project):**

- `.gitignore` management
- `.gitattributes` management
- Other repo-level config files that are shared across projects

**Stays on Project:**

- Tasks and task management
- Dependencies
- Build phases (pre-compile, compile, test, package)
- VSCode, Gitpod, DevContainer (developer-local IDE concerns)
- Source files and generated code

### GitHubRepository and GitLabRepository

These are composition-based subclasses. `GitHubRepository` is a `GitRepository` that automatically adds a `GitHub` component.

```typescript
export interface GitHubRepositoryOptions extends GitRepositoryOptions {
  /**
   * Options for GitHub integration.
   * @default - default options
   */
  readonly githubOptions?: GitHubOptions;

  /**
   * Enable GitHub Actions
   * 
   * @default true
   */
  readonly githubActions?: boolean;

  /**
   * Options for GitHub Actions
   * @default - default options
   */
  readonly githubActionsOptions?: GitHubActionsOptions;
}

export class GitHubRepository extends GitRepository {
  /**
   * The GitHub component managing workflows, PR config, etc.
   */
  public readonly github: GitHub;

  constructor(options: GitHubRepositoryOptions) {
    super(options);
    this.github = new GitHub(this, {
      options: options.githubOptions,
      actions: options.githubActions ?? true,
      actionOptions: options.githubActionOptions,
    });
  }
}
```

```typescript
export interface GitLabRepositoryOptions extends GitRepositoryOptions {
  /**
   * Options for GitLab integration.
   * @default - default options
   */
  readonly gitlabOptions?: GitLabOptions;
}

export class GitLabRepository extends GitRepository {
  public readonly gitLab: GitlabConfiguration;

  constructor(options: GitLabRepositoryOptions) {
    super(options);
    this.gitLab = new GitlabConfiguration(this, options.gitlabOptions);
  }
}
```

### Repository Lookup

Projects can find their parent Repository using `Repository.of(this)`, which walks up the construct tree. The result is cached as a property for performance.

```typescript
// From any project or component:
const repo = Repository.of(this);

// Access CI platform (type-safe):
if (repo instanceof GitHubRepository) {
  repo.github.addWorkflow(...);
}
```

This pattern mirrors `Stack.of(construct)` in the CDK. The tree traversal is the primary mechanism, with the result cached on first access.

For convenience, `Project` also exposes a `repo` property that delegates to `Repository.of(this)`:

```typescript
// These are equivalent:
const repo = Repository.of(this.project);
const repo = this.project.repo;
```

### Subproject Access to Repository

In monorepo setups, subprojects can access the Repository directly to register workflows or interact with CI configuration:

```typescript
// In a component within a subproject:
const repo = Repository.of(this.project);

// Register a workflow at the repository level
if (repo instanceof GitHubRepository) {
  const workflow = new GithubWorkflow(repo.github, "deploy-my-service");
  workflow.on({ push: { branches: ["main"] } });
  workflow.addJob("deploy", { ... });
}
```

This eliminates the current pattern of checking `this.project.parent` and hoping the root project has a `github` property.

### Backward Compatibility

When a user creates a Project without explicitly creating a Repository, a `GitHubRepository` is auto-created as the implicit parent. This preserves current behavior where `GitHubProject` subclasses automatically get GitHub integration.

```typescript
// Current code (continues to work):
const project = new TypeScriptProject({
  name: "my-project",
  defaultReleaseBranch: "main",
});

// Equivalent to:
const repo = new GitHubRepository({ name: "my-project" });
const project = new TypeScriptProject({
  parent: repo,
  name: "my-project",
  defaultReleaseBranch: "main",
});
```

The auto-creation logic detects when a `Project` is instantiated without a `Repository` ancestor in its construct tree and wraps it automatically. Users who want a different CI platform can create the Repository explicitly:

```typescript
// Explicit GitLab setup:
const repo = new GitLabRepository({ name: "my-project" });
const project = new TypeScriptProject({
  parent: repo,
  name: "my-project",
  defaultReleaseBranch: "main",
});
```

### Synthesis Flow

The synthesis flow changes to be Repository-driven:

```
Repository.synth()
├── preSynthesize() [Repository + components]
├── For each Project:
│   ├── preSynthesize() [Project + components]
│   ├── synthesize() [Project + components]
│   └── postSynthesize() [Project + components]
├── synthesize() [Repository + components]
└── postSynthesize() [Repository + components]
```

Repository-level files (workflows, .gitignore) are synthesized at the Repository level. Project-level files (package.json, tsconfig.json) are synthesized at the Project level. This matches the current behavior but makes the ownership explicit.

### Impact on Existing Classes

**`GitHubProject` — removed in next major version.** The class currently serves as the bridge between Project and GitHub integration. In the new model, this bridge is the Repository. `GitHubProject` would be deprecated first, then removed.

**`Project` — simplified.** Git-related properties (`.gitignore`, `.gitattributes`) move to `GitRepository`. The `parent` property for monorepo setups is replaced by the natural construct tree relationship through the Repository. Existing helper properties on `Project` that delegate to repository-level concerns (e.g., `project.gitignore`) will be preserved as pass-through accessors with deprecation warnings, giving users time to migrate to `Repository.of(this)` or `project.repo`.

**`GitHub` component — unchanged in API.** The `GitHub` component keeps its current API but its scope changes from "component on root project" to "component on Repository". This is mostly an internal change.

**`Release` component — unchanged for now.** The Release component continues to work as-is. Future RFCs may refactor it to use CI-platform-agnostic abstractions. For now, it continues to import GitHub types when running on a GitHubRepository.

## Scope

### In Scope

- `Repository` base class and construct tree restructuring
- `GitRepository` with git file management
- `GitHubRepository` and `GitLabRepository` subclasses
- `Repository.of()` lookup mechanism
- Backward compatibility through auto-creation of default Repository
- Moving git-related and shared CI config from Project to Repository
- Subproject access to Repository for workflow registration
- Deprecation plan for `GitHubProject`

### Explicitly Out of Scope (Future Work)

- **Workflow portability** — Building workflows once and running them on any CI platform is a separate, larger effort. This RFC provides the structural foundation but does not address portable workflow definitions.
- **Monorepo CI divergence** — If a monorepo has projects that need different CI behaviors, how the Repository-level config accommodates that is left for a future RFC. The stake in the ground here is that repository-level CI config (like GitHub Actions workflows) must be owned by the Repository. It is up to future monorepo and workflow portability RFCs to address per-project CI customization.

## Open Questions

1. **File ownership during transition.** During the deprecation period, both `Project.gitignore` and `GitRepository.gitignore` could exist. How do we handle the overlap? One option: `Project.gitignore` delegates to `Repository.of(this).gitignore` transparently.

2. **CI provider vs. repository host.** GitHub and GitLab are both repository hosts and CI providers, but CircleCI is only a CI provider. The current `Circleci` component is repository-level config, but it doesn't imply a repository host. How should standalone CI providers be modeled? One option: a `GitRepository` with a separate `CircleCi` component, rather than a dedicated `CircleCiRepository` subclass.

3. **Projenrc location.** The `.projenrc.ts` file currently lives at the project root. In the new model, should it be a Repository concern? The projenrc instantiates both the Repository and its Projects, so it logically sits outside both.

## Prior Art

- **AWS CDK App/Stack model** — The direct inspiration. `App` is the tree root, `Stack` represents a deployable unit. `Repository` maps to `App`, `Project` maps to `Stack`.
- **projen-pipelines** — Demonstrates that multi-CI abstractions work in practice using an engine/adapter pattern. The Repository restructuring aligns with how projen-pipelines separates pipeline definition from CI platform rendering.

## References

- [projen-pipelines](https://github.com/open-constructs/projen-pipelines) — Multi-CI pipeline generation for projen
- [Projen GitHub integration](https://projen.io/docs/integrations/github/) — Current GitHub integration documentation
