# Spec: Introduce Repository as the Construct Tree Root

- **Spec:** 001-repository-construct
- **RFC:** [repository-tree-root.md](../../rfcs/repository-tree-root.md)
- **Status:** Draft
- **Branch:** `repository-construct`

## Problem Statement

Projen currently conflates repository-level concerns (git configuration, CI/CD workflows, PR templates, Dependabot) with project-level concerns (source code, dependencies, build tasks) inside the `Project` class. This creates awkward monorepo patterns where subprojects must walk the parent chain to find CI config, forces `GitHubProject` to bundle unrelated IDE settings with CI integration, and makes it impossible to swap CI platforms without changing the project base class. A new `Repository` construct is needed as the tree root to clearly separate these responsibilities.

## User Stories

**US-1: Monorepo subproject author.**
As a developer working on a subproject in a projen monorepo, I want to register CI workflows at the repository level from my subproject without walking the parent chain and casting types, so that I can manage my project's CI independently.

**US-2: CI platform switcher.**
As a team migrating from GitHub Actions to GitLab CI, I want to swap the repository-level CI platform without changing my project base classes (e.g., `TypeScriptProject`), so that project definitions stay stable across CI platforms.

**US-3: Existing projen user.**
As an existing projen user with a `TypeScriptProject` or `GitHubProject`, I want my current code to continue working without changes, so that the Repository refactor doesn't break my setup.

**US-4: Component author.**
As a projen component author, I want a reliable `Repository.of(construct)` lookup to access repository-level resources from anywhere in the construct tree, so that I don't need to rely on fragile parent-chain traversal.

## Acceptance Criteria

**AC-1: Repository base class exists.**
A `Repository` class extends `Construct` and can serve as the root of a projen construct tree. It has a static `of(construct)` method that walks the tree upward and returns the nearest `Repository`. Results are cached for performance.

**AC-2: GitRepository manages git files.**
A `GitRepository` class extends `Repository` and owns `.gitignore` and `.gitattributes` file management. These files are synthesized at the Repository level, not the Project level.

**AC-3: GitHubRepository provides GitHub integration.**
A `GitHubRepository` class extends `GitRepository` and automatically creates a `GitHub` component. Workflows, PR templates, Dependabot, and Mergify are managed through this component at the Repository level.

**AC-4: GitLabRepository provides GitLab integration.**
A `GitLabRepository` class extends `GitRepository` and automatically creates a `GitlabConfiguration` component at the Repository level.

**AC-5: Repository.of() works from any depth.**
`Repository.of(construct)` returns the correct Repository when called from a root project, a subproject, or a component nested at any depth. It throws a clear error if no Repository exists in the ancestor chain.

**AC-6: Repository.synth() drives synthesis.**
`Repository.synth()` orchestrates the full synthesis flow: Repository pre-synthesize, then each Project's full lifecycle (pre-synthesize, synthesize, post-synthesize), then Repository synthesize and post-synthesize.

**AC-7: Backward compatibility via auto-creation.**
When a `Project` is instantiated without a `Repository` ancestor in its construct tree, a default `GitHubRepository` is auto-created as its implicit parent. Existing projenrc files that create a `TypeScriptProject` or `GitHubProject` without an explicit Repository continue to work identically.

**AC-8: Project exposes repo convenience accessor.**
`Project` gains a `repo` property that delegates to `Repository.of(this)`, providing a shorter way to access the parent Repository.

**AC-9: Project.gitignore and Project.gitattributes delegate to Repository.**
During the transition period, `Project.gitignore` and `Project.gitattributes` remain accessible but delegate to `Repository.of(this).gitignore` / `Repository.of(this).gitattributes` (for `GitRepository` and subclasses). Deprecation warnings are emitted.

**AC-10: Repository lists its projects.**
`Repository.projects` returns all `Project` instances that are descendants in the construct tree.

**AC-11: Subproject workflow registration.**
A subproject in a monorepo can call `Repository.of(this)` and, if the result is a `GitHubRepository`, add workflows directly without walking parent chains or casting.

## Non-Goals

1. **Workflow portability.** This spec does not introduce CI-platform-agnostic workflow abstractions. That is a separate, future effort that builds on this structural foundation.

2. **Per-project CI customization in monorepos.** If different subprojects in a monorepo need different CI behaviors, that is out of scope. This spec establishes Repository-level CI ownership; per-project overrides are for a future RFC.

3. **Removal of GitHubProject.** While `GitHubProject` will eventually be deprecated and removed, this spec only adds the new classes. Deprecation and removal of `GitHubProject` will happen in a separate phase/major version.

4. **CircleCI or other standalone CI providers.** Modeling standalone CI providers (not tied to a repository host) is deferred. The structure supports it, but no `CircleCiRepository` or similar is in scope.

5. **Projenrc location changes.** The `.projenrc.ts` file continues to live at the project root. No changes to projenrc discovery or execution.

## Constraints

- All changes must be in TypeScript, following projen's existing code style and patterns.
- Use `constructs` library for the construct tree (already a dependency).
- Generated files must include the projen marker (`FileBase.PROJEN_MARKER`).
- Backward compatibility is mandatory — existing projenrc files must not break.
- Run tasks via `node ./projen.js <task>`, never raw npm/yarn.
- Do not manually edit projen-generated files.

## Dependencies

- **constructs library** — `Construct`, `IConstruct` for tree structure and `of()` pattern.
- **Existing `Project` class** — [src/project.ts](../../src/project.ts) — needs modification to delegate git files and support Repository parent.
- **Existing `GitHubProject` class** — [src/github/github-project.ts](../../src/github/github-project.ts) — its GitHub component creation pattern moves to `GitHubRepository`.
- **Existing `GitHub` component** — [src/github/github.ts](../../src/github/github.ts) — unchanged API, but now parented under Repository.
- **Existing `IgnoreFile`** — [src/ignore-file.ts](../../src/ignore-file.ts) — moved to Repository-level ownership.
- **Existing `GitAttributesFile`** — [src/gitattributes.ts](../../src/gitattributes.ts) — moved to Repository-level ownership.
- **Synthesis flow** — `Project.synth()` in [src/project.ts](../../src/project.ts) — needs refactoring to support Repository-driven synthesis.

## Open Questions

1. **Auto-creation trigger mechanism.** Should auto-creation of the implicit Repository happen in the `Project` constructor, or in a static factory method? The constructor approach is simpler but could cause issues with construct tree ordering.

2. **Deprecation timeline.** How many minor versions should the `Project.gitignore` / `Project.gitattributes` pass-through accessors remain before removal? Should they be deprecated immediately or after a stabilization period?

3. **GitHubProject migration path.** Should `GitHubProject` be modified to use the new Repository internally (preserving its public API), or should it become a thin wrapper that creates a `GitHubRepository` + `TypeScriptProject`?

4. **Testing strategy for backward compatibility.** Should we snapshot-test existing project types to verify identical output before and after the refactor, or rely on unit tests for each behavioral contract?

5. **Standalone CI providers.** While out of scope, does the class hierarchy need any hooks or extension points now to avoid breaking changes when CircleCI/Jenkins support is added later?
