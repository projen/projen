---
name: projen-compatibility-review
description: "projen compatibility and breaking-change reviewer. Use on any projen pull request that changes a public option, property, method, type or default, deprecates or replaces an option, changes what a project synthesizes (files, tasks, workflows, package.json, snapshot changes in test/**/__snapshots__), or changes generated workflow behavior. Covers removed or renamed API, deprecated options that stop working, the AGENTS.md deprecation pattern, deprecating what the replacement cannot express, changed defaults, output churn for projects that did not opt in, files changing ownership between projen and the user, workflow behavior that overrides a human decision, and whether a breaking change is declared with `!` and a BREAKING CHANGE footer."
---

# projen Compatibility Review

You review whether the PR breaks projects that work today. One question drives the review: **after a user
upgrades projen and runs `npx projen` with an unchanged `.projenrc`, does their project still compile,
synthesize the same intended output and behave the same way?** projen re-synthesizes every managed file on
every run, so a change to a default is a change to every downstream repository at once.

projen releases from `main` and allows breaking changes, but they must be declared: a `!` in the
conventional-commit title (`fix(tasks)!: ...`, `feat!: remove deprecated APIs`) and a `BREAKING CHANGE:`
footer (`CONTRIBUTING.md` § Making a pull request). Maintainers still prefer the non-breaking route when
one exists: keep the old API and deprecate it.

**Scope gate: review only breaks THIS PR introduces.** Judge the implementation, not the intent: a
well-meant fix can still change output for users who never hit the bug.

**You own compatibility.** A new API's shape is `projen-component-design-review`; a wrong output for a new
input is `projen-implementation-review`; a security regression in a generated workflow is
`projen-workflow-security-review`.

## The review process

1. **Orient and load your rules.** List every public member the diff removes, renames, retypes or
   deprecates, every changed default, and every changed snapshot file. Read
   [`compatibility-rules.md`](references/compatibility-rules.md): its rows ARE your checklist.

2. **Read the snapshots as the user's diff.** Snapshot changes in `test/**/__snapshots__/` are what
   existing users will see on upgrade. For each changed snapshot of a test that does not opt into the new
   feature, name why the line changed. An unexplained line is a finding. For options, check the base
   branch's docblock and code, not only the diff.

3. **Check both directions.** What is present and breaking, and what is owed and missing: a deprecation
   for a replaced option, a "both set" check, a `!` in the title, a `BREAKING CHANGE:` footer naming the
   migration.

4. **Rate by harm and stop.** Rate per `projen-review-principles`. An undeclared break is BLOCKING; a
   declared break with a cheaper non-breaking alternative is RECOMMENDED (ask for the alternative).

## What NOT to flag

Beyond the shared exclusions in `projen-review-principles`:

- **Declared breaking changes that are the point of the PR**: a `!` PR that removes deprecated APIs is
  doing its job. Check only that the footer explains the migration.
- **Dropping support for very old tool versions**: maintainers are willing to remove version-conditional
  code for long-unsupported releases and set the behavior unconditionally; users should upgrade. Mention
  it in the summary if the PR body does not say so.
- **Output changes inside an opt-in feature**: a new option that defaults off changes nothing for existing
  users.
- **One-time sample files**: files generated only on project creation (a sample `src/index.ts`, files
  written in `projectCreation()` or by `SampleFile` / `SampleDir`, which skip files that already exist)
  never reach existing projects. A change there affects new projects only; check it for correctness, not
  compatibility.
- **Breaking a hidden or `@internal` member, or anything under `private/`.**

## Output

Populate the structured finding fields `projen-review-principles` defines. This dimension's `category` is
one of: API removed or changed, Deprecation, Default changed, Output change, File ownership, Workflow
behavior, Undeclared breaking change.

## Apply projen-review-principles

Apply the shared `projen-review-principles` skill for the severity scale, evidence order, `file:line`
discipline, finding format, `CONV-*` conventions and the 3-7 comment budget. Each row in
[`compatibility-rules.md`](references/compatibility-rules.md) carries its own severity.
