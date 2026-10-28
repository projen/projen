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
ones from an older sibling (review of #4868: "I just want to take the opportunity of a new project ... to do
better"), but do not ask the PR to refactor the older sibling ("Let's not change the existing AWS CDK
project").

**You own design.** Whether an existing helper or upstream package should have been reused, and whether
the output is correct, is `projen-implementation-review`. Whether a change breaks existing users, including deprecations, is
`projen-compatibility-review`. Docblock wording is `projen-documentation-review`.

## The review process

1. **Orient and load your rules.** List every exported symbol the diff adds or changes (`git diff` on
   `src/**/index.ts` and every `export`) and every new `extends Component` / `FutureComponent`. For each,
   name what it is: option struct, component, enum, enum-like class, helper. Read
   [`design-rules.md`](references/design-rules.md): its rows ARE your checklist.

2. **Find the precedent.** For each new concept, find the closest existing projen component that solves the
   same shape (Jest for a test tool, `ScriptRunner` / `TypeScriptRunner` for a pluggable runner, `Eslint` /
   `Prettier` / `Biome` for a config-writing tool, `Mergify` / `AutoQueue` for a GitHub feature) and read it
   at `main`. A design that diverges from precedent without a stated reason is the finding; cite the
   precedent by file + line.

3. **Check the diff against the rules**, family by family: **jsii types**, **Component model**,
   **Public surface and placement**, **Project model direction**, **Dependencies and lifecycle**,
   **Options and errors**. Check both directions: what is present and wrong, and what is owed and missing
   (an `add*` method a collection option needs, a mutual-exclusivity check two new options need).

4. **Rate by harm and stop.** Rate per `projen-review-principles`. When the right design is open, ask the
   question instead of prescribing ("NodeNativeTest or NodeNativeTestRunner? WDYT?").

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

## Output

Populate the structured finding fields `projen-review-principles` defines. This dimension's `category` is
one of: jsii incompatibility, Component model, Public surface, Code placement, Project model direction,
Dependencies and lifecycle, Options and errors.

## Apply projen-review-principles

Apply the shared `projen-review-principles` skill for the severity scale, evidence order, `file:line`
discipline, finding format, `CONV-*` conventions and the 3-7 comment budget. Each row in
[`design-rules.md`](references/design-rules.md) carries its own severity.
