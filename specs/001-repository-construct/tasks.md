# Tasks: Repository as the Construct Tree Root

## Phase 1 — Foundation

- [x] **T1: Add Repository symbol infrastructure to util/constructs.ts**
  Files: `src/util/constructs.ts`
  Done when: `REPOSITORY_SYMBOL`, `tagAsRepository`, `isRepository`, `findClosestRepository`, and `tryFindClosestRepository` are exported. `findClosestRepository` walks up the construct tree using `tryFindClosest` and throws if none found. All functions follow the existing pattern of `PROJECT_SYMBOL` / `COMPONENT_SYMBOL`.
  Commit: `feat: T1 — add repository symbol and lookup utilities`

- [x] **T2: Create Repository base class**
  Files: `src/repository.ts`, `src/index.ts`
  Done when: `Repository` extends `Construct`, tags itself with `REPOSITORY_SYMBOL`, exposes `name`, `outdir`, `projects` (via `isProject` symbol check), `of()` static lookup, `isRepository()` static check, `synth()`, `preSynthesize()`, `postSynthesize()`. Class is exported from `src/index.ts`. Does NOT yet include synthesis orchestration logic — `synth()` is a stub.
  Commit: `feat: T2 — create repository base class`

- [x] **T3: Create GitRepository class**
  Files: `src/git-repository.ts`, `src/index.ts`
  Done when: `GitRepository` extends `Repository`, creates `.gitignore` (`IgnoreFile`) and `.gitattributes` (`GitAttributesFile`) in its constructor, exposes `annotateGenerated()`. Accepts `GitRepositoryOptions` with `gitOptions` and `gitIgnoreOptions`. Exported from `src/index.ts`.
  Commit: `feat: T3 — create git repository with gitignore and gitattributes`

## Phase 2 — Core Implementation

- [x] **T4: Create GitHubRepository class**
  Files: `src/github/github-repository.ts`, `src/github/index.ts`
  Done when: `GitHubRepository` extends `GitRepository`, creates a `GitHub` component in its constructor (mirroring the pattern from `GitHubProject`), creates `AutoApprove` and `Stale` if configured. Accepts `GitHubRepositoryOptions`. The `GitHub` component must be able to resolve a `project` from the Repository scope — this may require adjusting how the component is parented. Exported from `src/github/index.ts`.
  Commit: `feat: T4 — create github repository with GitHub component`

- [x] **T5: Create GitLabRepository class**
  Files: `src/gitlab/gitlab-repository.ts`, `src/gitlab/index.ts`
  Done when: `GitLabRepository` extends `GitRepository`, creates a `GitlabConfiguration` component. Accepts `GitLabRepositoryOptions`. Exported from `src/gitlab/index.ts`.
  Commit: `feat: T5 — create gitlab repository with GitlabConfiguration`

- [x] **T6: Implement Repository.synth() orchestration**
  Files: `src/repository.ts`
  Done when: `Repository.synth()` implements the full flow: repo `preSynthesize()` → repo component `preSynthesize()` → for each project: project full lifecycle (pre-synth, cleanup, subprojects, synthesize, post-synth) → repo component `synthesize()` → repo `postSynthesize()`. Handles file cleanup at the repo level. Handles the `ejected` flow if applicable.
  Commit: `feat: T6 — implement repository-driven synthesis orchestration`

- [x] **T7: Modify Project for Repository integration**
  Files: `src/project.ts`
  Done when: `Project` constructor auto-creates a `GitHubRepository` when no Repository ancestor exists (using lazy import to avoid circular deps). `Project` exposes `repo` getter delegating to `Repository.of(this)`. Root project's `synth()` delegates to `Repository.synth()`. Root `.gitignore` and `.gitattributes` creation moves to Repository — Project keeps per-project `.gitignore` but the root-level one is owned by the Repository. `project.gitignore` and `project.gitattributes` delegate to the Repository versions with deprecation warnings for root projects.
  Commit: `feat: T7 — integrate project with repository auto-creation and delegation`

- [x] **T8: Convert GitHubProject to thin wrapper**
  Files: `src/github/github-project.ts`
  Done when: `GitHubProject` constructor creates a `GitHubRepository` if no Repository ancestor exists (instead of the previous auto-creation from T7), passes GitHub-specific options (`githubOptions`, `projenCredentials`, `mergify`, `autoApprove`, `stale`, etc.) to the Repository. `this.github` points to the Repository-level `GitHub` component. IDE components (`vscode`, `gitpod`, `devContainer`), `Clobber`, and `SampleReadme` remain on the Project. Public API is unchanged.
  Commit: `feat: T8 — convert GitHubProject to thin repository wrapper`

## Phase 3 — Testing

- [x] **T9: Snapshot tests for backward compatibility**
  Files: `test/backward-compat.test.ts`
  Done when: Snapshot tests exist for `GitHubProject`, `TypeScriptProject`, `NodeProject` (and others as feasible) with default options. Snapshots verify that synthesis output is identical to pre-refactor output. Covers AC-7.
  Commit: `test: T9 — snapshot tests for backward compatibility`

- [x] **T10: Unit tests for Repository, GitRepository, and lookup**
  Files: `test/repository.test.ts`, `test/git-repository.test.ts`
  Done when: Tests cover: `Repository.of()` from project/subproject/component (AC-5), throws when no Repository (AC-5), `isRepository()` (AC-1), `projects` getter (AC-10), `GitRepository` creates gitignore/gitattributes (AC-2), per-project gitignore still works (AC-2), `annotateGenerated()` (AC-2), `repo` accessor on Project (AC-8), gitignore/gitattributes delegation (AC-9).
  Commit: `test: T10 — unit tests for repository base and git repository`

- [ ] **T11: Unit tests for GitHubRepository, GitLabRepository, and subproject workflows**
  Files: `test/github/github-repository.test.ts`, `test/gitlab/gitlab-repository.test.ts`
  Done when: Tests cover: `GitHubRepository` creates `GitHub` component (AC-3), workflows can be added (AC-3), subproject can access repo and add workflows (AC-11), `GitLabRepository` creates `GitlabConfiguration` (AC-4), auto-creation produces `GitHubRepository` (AC-7).
  Commit: `test: T11 — unit tests for GitHub and GitLab repositories`

- [ ] **T12: Unit tests for synthesis flow**
  Files: `test/repository.test.ts`
  Done when: Tests verify `Repository.synth()` calls lifecycle hooks in correct order (AC-6), `Project.synth()` on root delegates to `Repository.synth()` (AC-6). Update `test/util.ts` and `src/util/synth.ts` if needed to support Repository-aware `synthSnapshot()`.
  Commit: `test: T12 — unit tests for repository-driven synthesis`

## Phase 4 — Cleanup

- [ ] **T13: Lint, compile, and full build verification**
  Files: (all modified files)
  Done when: `node ./projen.js eslint` passes, `node ./projen.js compile` passes, `node ./projen.js test` passes (all existing + new tests), `node ./projen.js build` succeeds. No regressions.
  Commit: `chore: T13 — fix lint and build issues` (only if fixes needed)

---

## Progress

| Task | Status | Notes |
|------|--------|-------|
| T1   | :white_check_mark:     |       |
| T2   | :white_check_mark:     |       |
| T3   | :white_check_mark:     |       |
| T4   | :white_check_mark:     | GitHub component deferred via _initGitHub() |
| T5   | :white_check_mark:     | Deferred init pattern like T4 |
| T6   | :white_check_mark:     |       |
| T7   | :white_check_mark:     | Auto-create repo, repo getter, git file delegation |
| T8   | :white_check_mark:     | Pre-created repo pattern for option passing |
| T9   | :white_check_mark:     |       |
| T10  | :white_check_mark:     |       |
| T11  | :white_large_square:     |       |
| T12  | :white_large_square:     |       |
| T13  | :white_large_square:     |       |

## AC Coverage

| AC | Tasks |
|----|-------|
| AC-1  | T1, T2, T10 |
| AC-2  | T3, T10 |
| AC-3  | T4, T8, T11 |
| AC-4  | T5, T11 |
| AC-5  | T1, T2, T10 |
| AC-6  | T6, T12 |
| AC-7  | T7, T8, T9, T11 |
| AC-8  | T7, T10 |
| AC-9  | T7, T10 |
| AC-10 | T2, T10 |
| AC-11 | T4, T11 |
