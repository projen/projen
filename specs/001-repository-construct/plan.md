# Technical Plan: Repository as the Construct Tree Root

## Approach Summary

Introduce a `Repository` → `GitRepository` → `GitHubRepository` / `GitLabRepository` class hierarchy that sits above `Project` in the construct tree. The `Repository` base class extends `Construct`, uses a symbol-based tagging pattern (consistent with existing `PROJECT_SYMBOL` / `COMPONENT_SYMBOL`) for `Repository.of()` lookup, and drives synthesis. `Project` is modified to auto-create a `GitHubRepository` when no Repository ancestor exists, and to delegate `.gitignore` / `.gitattributes` to the Repository while retaining per-project `.gitignore` support. `GitHubProject` becomes a thin wrapper. Snapshot tests ensure identical output before and after. This satisfies all acceptance criteria AC-1 through AC-11.

## Components

| Component | Action | Acceptance Criteria |
|-----------|--------|-------------------|
| `Repository` class | **Create** | AC-1, AC-5, AC-6, AC-10 |
| `GitRepository` class | **Create** | AC-2 |
| `GitHubRepository` class | **Create** | AC-3, AC-7, AC-11 |
| `GitLabRepository` class | **Create** | AC-4 |
| `util/constructs.ts` | **Modify** — add `REPOSITORY_SYMBOL`, `tagAsRepository`, `isRepository`, `findClosestRepository` | AC-1, AC-5 |
| `Project` class | **Modify** — auto-create Repository, add `repo` accessor, delegate gitignore/gitattributes | AC-7, AC-8, AC-9 |
| `GitHubProject` class | **Modify** — thin wrapper creating `GitHubRepository` | AC-3, AC-7 |
| `Component` class | **Modify** — allow Repository as valid scope (not just Project) | AC-1 |
| `src/index.ts` | **Modify** — export new classes | All |
| `synthSnapshot` utility | **Modify** — support Repository-driven synth | AC-6 |

## Integration Points

### Construct tree traversal
`Repository.of(construct)` mirrors the existing `Project.of(construct)` / `findClosestProject()` pattern. It uses `node.scopes.reverse().find(isRepository)` — the same approach as `tryFindClosest` in `src/util/constructs.ts`.

### Component scope resolution
`Component` currently requires a `Project` in scope via `findClosestProject()`. This must be relaxed: when a `Component` is created directly under a `Repository` (e.g., `GitHub` component on `GitHubRepository`), it should resolve `this.project` to the first `Project` descendant or leave it pointing to a special repository-level context. **Decision: Components under a Repository but not under a Project get `this.project` set to the Repository's first root project.** This preserves backward compatibility for the `GitHub` component which accesses `this.project.gitattributes` and `this.project.components`.

### Synthesis flow
Currently `Project.synth()` is the entry point. After this change:
- If user calls `project.synth()` on a root project, it delegates to `Repository.of(this).synth()`.
- `Repository.synth()` orchestrates: repo pre-synth → per-project lifecycle → repo synth → repo post-synth.
- Subproject recursion stays within Project's lifecycle (unchanged).

### Auto-creation in Project constructor
When `Project` is constructed without a `Repository` ancestor, the constructor creates a `GitHubRepository` as an implicit parent *before* calling `super()`. This requires restructuring the constructor to detect the scope, create the Repository if needed, and pass it as the actual parent to `Construct`.

## Key Decisions

### KD-1: Symbol-based tagging for Repository (same as Project/Component)
- **Choice:** Add `REPOSITORY_SYMBOL` to `util/constructs.ts`, use `tagAsRepository()` in the Repository constructor.
- **Rationale:** Consistent with existing `PROJECT_SYMBOL` / `COMPONENT_SYMBOL` pattern. Avoids `instanceof` checks across jsii language boundaries.
- **Tradeoff:** One more symbol to maintain, but the pattern is proven.
- **Revisit-if:** The symbol-based pattern is ever deprecated.

### KD-2: Auto-creation produces GitHubRepository (not bare Repository)
- **Choice:** When `Project` has no Repository ancestor, auto-create a `GitHubRepository`.
- **Rationale:** Preserves current default behavior where root projects get GitHub integration. Most projen users are on GitHub.
- **Tradeoff:** Users on GitLab/other platforms must explicitly create their Repository. This is already the case today (they use `Project` instead of `GitHubProject`).
- **Revisit-if:** GitHub becomes a minority use case, or a "detect platform" mechanism is added.

### KD-3: GitHubProject becomes thin wrapper (not internal refactor)
- **Choice:** `GitHubProject` constructor creates a `GitHubRepository` if one doesn't exist, passes GitHub options to it, and keeps its public API (`.github`, `.vscode`, `.gitpod`, `.devContainer`) intact.
- **Rationale:** Preserves the external contract. Internally, `this.github` now points to the Repository-level `GitHub` component. IDE components (VsCode, Gitpod, DevContainer) remain on the Project.
- **Tradeoff:** `GitHubProject` becomes somewhat redundant but is kept for backward compatibility.
- **Revisit-if:** Major version bump allows removing `GitHubProject`.

### KD-4: Per-project .gitignore stays on Project
- **Choice:** Each `Project` keeps its own `.gitignore` for folder-level patterns. The root-level `.gitignore` moves to `GitRepository`.
- **Rationale:** Monorepo subprojects need folder-level `.gitignore` (e.g., ignoring `node_modules/` in their subdirectory). The repository-level `.gitignore` is a different concern.
- **Tradeoff:** Two places to manage ignore patterns. Clear ownership makes this acceptable.
- **Revisit-if:** User confusion about which `.gitignore` to use.

### KD-5: Repository.synth() is the new entry point
- **Choice:** `Repository.synth()` drives the entire synthesis. `Project.synth()` on a root project delegates to `Repository.synth()`.
- **Rationale:** Repository needs to synthesize its own files (workflows, root .gitignore) after all projects have synthesized.
- **Tradeoff:** Slight behavior change in synthesis ordering — repo-level post-synth now runs after all projects. Should be transparent.
- **Revisit-if:** Ordering dependencies between repo-level and project-level post-synth emerge.

## File Structure

### New Files
```
src/repository.ts                    — Repository base class
src/git-repository.ts                — GitRepository (extends Repository)
src/github/github-repository.ts      — GitHubRepository (extends GitRepository)
src/gitlab/gitlab-repository.ts      — GitLabRepository (extends GitRepository)
test/repository.test.ts              — Repository base class tests
test/git-repository.test.ts          — GitRepository tests
test/github/github-repository.test.ts — GitHubRepository tests
test/gitlab/gitlab-repository.test.ts — GitLabRepository tests
```

### Modified Files
```
src/util/constructs.ts               — Add REPOSITORY_SYMBOL, tagging, lookup
src/project.ts                       — Auto-create Repository, add `repo`, delegate gitignore
src/github/github-project.ts         — Thin wrapper creating GitHubRepository
src/component.ts                     — Allow Repository scope
src/index.ts                         — Export new classes
src/util/synth.ts                    — Support Repository in synthSnapshot
test/util.ts                         — Update TestProject for Repository awareness
```

## API / Props Design

### Repository (src/repository.ts)

```typescript
export interface RepositoryOptions {
  readonly name: string;
  readonly outdir?: string;
  readonly commitGenerated?: boolean;
  readonly logging?: LoggerOptions;
  readonly renovatebot?: boolean;
  readonly renovatebotOptions?: RenovatebotOptions;
  readonly projenrcJson?: boolean;
  readonly projenrcJsonOptions?: ProjenrcJsonOptions;
  readonly projenCommand?: string;
}

export abstract class Repository extends Construct {
  public static of(construct: IConstruct): Repository;
  public static isRepository(x: any): x is Repository;
  public readonly name: string;
  public readonly outdir: string;
  public get projects(): Project[];
  public synth(): void;
  public preSynthesize(): void;
  public postSynthesize(): void;
}
```

### GitRepository (src/git-repository.ts)

```typescript
export interface GitRepositoryOptions extends RepositoryOptions {
  readonly gitOptions?: GitOptions;
  readonly gitIgnoreOptions?: IgnoreFileOptions;
}

export class GitRepository extends Repository {
  public readonly gitignore: IgnoreFile;
  public readonly gitattributes: GitAttributesFile;
  public annotateGenerated(glob: string): void;
}
```

### GitHubRepository (src/github/github-repository.ts)

```typescript
export interface GitHubRepositoryOptions extends GitRepositoryOptions {
  readonly githubOptions?: GitHubOptions;
  readonly projenCredentials?: GithubCredentials;
  readonly projenTokenSecret?: string;
  readonly mergify?: boolean;
  readonly mergifyOptions?: MergifyOptions;
  readonly autoApproveOptions?: AutoApproveOptions;
  readonly autoMerge?: boolean;
  readonly autoMergeOptions?: AutoMergeOptions;
  readonly stale?: boolean;
  readonly staleOptions?: StaleOptions;
}

export class GitHubRepository extends GitRepository {
  public readonly github: GitHub;
  public readonly autoApprove?: AutoApprove;
}
```

### GitLabRepository (src/gitlab/gitlab-repository.ts)

```typescript
export interface GitLabRepositoryOptions extends GitRepositoryOptions {
  readonly gitlabOptions?: CiConfigurationOptions;
}

export class GitLabRepository extends GitRepository {
  public readonly gitlab: GitlabConfiguration;
}
```

### Project modifications

```typescript
// Added to Project class
public get repo(): Repository {
  return Repository.of(this);
}

// gitignore and gitattributes become:
// - Project keeps its own .gitignore (folder-level)
// - Root-level .gitignore delegates to GitRepository
// - .gitattributes delegates to GitRepository
```

## Testing Strategy

### Snapshot Tests (backward compatibility — AC-7)
- Create snapshot tests for `TypeScriptProject`, `JavaProject`, `PythonProject`, `NodeProject`, and `GitHubProject` with default options.
- Capture snapshots BEFORE the refactor on the main branch.
- Verify identical output AFTER the refactor.
- This is the primary gate for backward compatibility.

### Unit Tests — Repository base (AC-1, AC-5, AC-10)
- `Repository.of()` finds correct Repository from project, subproject, and deeply nested component.
- `Repository.of()` throws when no Repository in ancestor chain.
- `Repository.of()` returns cached result on second call.
- `Repository.isRepository()` returns true/false correctly.
- `Repository.projects` lists all descendant Projects.

### Unit Tests — GitRepository (AC-2)
- `GitRepository` creates `.gitignore` and `.gitattributes`.
- Root `.gitignore` is owned by GitRepository, not Project.
- Subprojects can still have their own `.gitignore`.
- `annotateGenerated()` adds linguist-generated attributes.

### Unit Tests — GitHubRepository (AC-3, AC-11)
- `GitHubRepository` creates a `GitHub` component.
- Workflows can be added via `repo.github.addWorkflow()`.
- Subproject can access `Repository.of(this)` and add workflows.

### Unit Tests — GitLabRepository (AC-4)
- `GitLabRepository` creates a `GitlabConfiguration` component.

### Unit Tests — Synthesis (AC-6)
- `Repository.synth()` calls pre-synth on repo, then each project's full lifecycle, then repo synth/post-synth.
- `Project.synth()` on root project delegates to `Repository.synth()`.

### Unit Tests — Auto-creation (AC-7)
- Creating a `Project` without a Repository auto-creates `GitHubRepository`.
- `Repository.of(project)` returns the auto-created repository.
- Auto-created repository has correct name and outdir.

### Unit Tests — Project accessors (AC-8, AC-9)
- `project.repo` returns the parent Repository.
- `project.gitignore` still works (delegates or is project-level).
- `project.gitattributes` still works (delegates to Repository).

### Unit Tests — GitHubProject wrapper (AC-3, AC-7)
- `GitHubProject` creates a `GitHubRepository` if none exists.
- `project.github` points to the Repository-level `GitHub` component.
- IDE components (vscode, gitpod, devContainer) remain on the Project.

## Risks & Mitigations

### Risk: Component.project breaks when scope is Repository
Components call `findClosestProject(scope)` in their constructor. If a component is created directly on a Repository (before any Project exists), this throws.
- **Mitigation:** The `GitHub` component is created on `GitHubRepository`, which creates it during construction. At this point, no Project child exists yet. We need to modify `GitHub`'s constructor to accept a `Repository` as scope, or ensure a Project exists first. The cleanest approach: `GitHub` component gets created during Repository construction, and `findClosestProject` is updated to also walk DOWN the tree to find the first Project when walking UP fails. **Alternative:** Have Repository components bypass the Project requirement entirely — they don't need `this.project`.

### Risk: Circular dependency between Repository and Project modules
`Project` needs to import `Repository` for auto-creation. `Repository` needs to know about `Project` for `projects` getter.
- **Mitigation:** Use the symbol-based `isProject()` check (already exists) to avoid direct type imports in Repository. For auto-creation in Project, use a lazy import or a factory function.

### Risk: Synthesis ordering changes break existing behavior
Moving from Project-driven to Repository-driven synthesis could change the order in which files are generated.
- **Mitigation:** Snapshot tests will catch any ordering differences. The synthesis order within each Project remains unchanged.

### Risk: `synthSnapshot()` utility assumes Project entry point
The test utility calls `project.synth()`. If this now delegates to Repository, the output directory might differ.
- **Mitigation:** `project.synth()` delegates to `Repository.synth()` but the project's `outdir` is still used for the snapshot. Need to ensure `synthSnapshot()` captures the full repository output (including repo-level files) from the repository outdir.
