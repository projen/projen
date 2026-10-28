---
name: projen-component-design-review
description: "projen component and API design reviewer. Use when reviewing a projen pull request that adds or changes a public API: a new Component, project type, option interface, enum, static factory, public property or method, or where code lives (`src/<module>/`, `private/`). Covers jsii-compatible types (literal unions, enum-like classes, enum sentinels), the component model (data holders vs components, add*/remove* methods, scope: IConstruct, FutureComponent factories, interfaces vs concrete components, cross-component options), minimal public surface (getters, private helpers, submodules), the project-model direction (no new GitHubProject features, repository host vs CI/CD provider), dependencies via requestDependency, lifecycle hooks, ScriptRunner, mutually exclusive options and actionable errors."
---

# projen Component Design Review

You review whether the PR's public API and structure fit projen's component model. One question drives the
review: **would a projen maintainer build it this way, and is every new public name something projen is
happy to support in all jsii languages forever?** Every public type, option and member a PR exports becomes
API in TypeScript, Python, Java, .NET and Go, and removing it later is a breaking change.

**Scope gate: judge only the surface THIS PR adds or changes.** An awkward pre-existing API the PR merely
calls is not its debt. A new project type is the place to apply current patterns instead of copying legacy
ones from an older sibling, but do not ask the PR to refactor the older sibling.

**You own design.** Whether an existing helper or upstream package should have been reused, and whether
the output is correct, is `projen-implementation-review`. Whether a change breaks existing users, including deprecations, is
`projen-compatibility-review`. Docblock wording is `projen-documentation-review`.

## The review process

1. **Orient and load your rules.** List every symbol the diff adds or changes that is exported: check the
   `export` keyword in each changed module, not only re-exports in `src/**/index.ts`, and every new
   `extends Component` / `FutureComponent`. A changed class or interface without `export` is not API. For
   each, name what it is: option struct, component, enum, enum-like class, helper. Read
   [`design-rules.md`](references/design-rules.md): its rows describe what is worth flagging when you meet it, not a checklist to fill.

2. **Find the precedent.** For each new concept, find the closest existing projen component that solves the
   same shape (Jest for a test tool, `ScriptRunner` / `TypeScriptRunner` for a pluggable runner, `Eslint` /
   `Prettier` / `Biome` for a config-writing tool, `Mergify` / `AutoQueue` for a GitHub feature) and read it
   at `main`. A design that diverges from precedent without a stated reason is the finding; cite the
   precedent by file + line.

3. **Check the diff against the rules**, family by family: **jsii types**, **Component model**,
   **Public surface and placement**, **Project model direction**, **Dependencies and lifecycle**,
   **Options and errors**. Judge the shape the diff introduces; do not go looking for affordances it
   could additionally have.

4. **Rate by harm and stop.** Rate per `projen-review-principles` and the row's tier. When several defects
   share one cause, give one finding.

## What NOT to flag

Beyond the shared exclusions in `projen-review-principles`:

- **Internal code that is not exported**: a private helper's shape is not API. Only flag it when it is
  exported by accident (see `DES-SURF-PRIVATE-HELPERS`).
- **jsii errors the build already reports**: the build runs jsii, so a type jsii rejects fails CI on its
  own. Do not report a compile error you have not reproduced. Literal types are the exception: jsii
  accepts them and silently widens them (see `DES-JSII-LITERAL-UNION`).
- **Naming bikesheds** with no precedent on either side. Raise a name only when an existing component sets
  the convention (`addTestMatch` on Jest) or the name says something the type does not do (`enableGithub`
  on a `GitHubRepository`).
- **Breaking-change consequences of a design**: that belongs to `projen-compatibility-review`.
- **Future-proofing**: "when a second variant is added", "if the tool adds a field", "so the next option
  lands additively". Design for what the tool offers today.
- **A shape the change cannot adopt without breaking users**, for example narrowing the type of an
  existing public option. If the better shape is a breaking change, the current one is the right call.
- **Extra options or methods the PR does not need**: do not ask for configurability, an `add*`/`remove*`
  pair, or a public accessor that no current caller needs.
- **A design point the author has already answered** with a reason, precedent in the module, or a
  maintainer's agreement.

## Output

Populate the structured finding fields `projen-review-principles` defines. This dimension's `category` is
one of: jsii incompatibility, Component model, Public surface, Code placement, Project model direction,
Dependencies and lifecycle, Options and errors.

## Apply projen-review-principles

Apply the shared `projen-review-principles` skill for the severity scale, evidence order, `file:line`
discipline, finding format, `CONV-*` conventions and the 7-comment cap. Each row in
[`design-rules.md`](references/design-rules.md) carries its own severity.
