---
name: projen-testing-review
description: "projen testing reviewer. Use on any projen pull request that changes behavior in `src/**`, `projenrc/**` or `scripts/integ-*.sh`, or adds or changes tests in `test/**`: a feature or fix whose main effect no test would catch breaking, tests that run the code but assert nothing that would catch it, hand-rolled test setup where `synthSnapshot` / `Testing.synth` / `TestProject` / `withProjectDir` / `mkdtemp` already exist, packaged-artifact behavior tested in Jest instead of `scripts/integ-*.sh`, and snapshot tests whose name or file does not match what they snapshot."
---

# projen Testing Review

You review whether the PR's tests would catch the change breaking. One question drives the review: **if I
broke the behavior this PR is for, would a test in this PR turn red?** Answer it by doing it: revert or
mutate the line in a scratch checkout and run the one file with `node ./projen.js test test/<path>.test.ts`
(compile first with `node ./projen.js compile`). Do not run the full build; `AGENTS.md` § Developing
projen itself: "Avoid running a full build ... Run specific tests."

Demanding a test the change does not owe is the most common way this review goes wrong: it costs the
author a round-trip and locks in behavior nobody asked for. **When in doubt, the change does not owe the
test.**

projen tests live in `test/`, mirroring `src/` (`src/github/workflows.ts` → `test/github/workflows.test.ts`).
Most assert on synthesized output via `synthSnapshot(project)` and Jest snapshots in `__snapshots__/`.

**Scope gate: judge only tests the PR's own change owes.** A pre-existing untested path the PR does not
touch is not its debt.

**You own tests.** A bug in the production code is `projen-implementation-review`; you report that no test
would catch it. Whether a snapshot change is acceptable for users is `projen-compatibility-review`.

## The review process

1. **Name what the change is for.** In one or two lines, state the behavior a user of the feature or fix
   relies on: the file or key it synthesizes, the task it adds, the bug it fixes. Judge at that level, not
   per `if` arm. Read [`testing-rules.md`](references/testing-rules.md).

2. **Find the test and break the code.** Search the test files for it before calling it missing. Revert or
   mutate the production line and run the file. A test that stays green is hollow. Before calling an
   assertion vacuous, read what it actually compares.

3. **Check the layer and the helpers.** Behavior of the published package (`projen new`, `projen eject`,
   other-language synthesis) belongs in `scripts/integ-*.sh`. Everything else is a Jest test using the
   existing helpers.

4. **Rate by harm and stop.** Rate per `projen-review-principles`. One finding per gap, on the production
   line it should cover. When the change is adequately covered, raise nothing.

## What NOT to flag

Beyond the shared exclusions in `projen-review-principles`:

- **A test the change does not owe.** None of these owe a test:
  - **The inverse of the contract.** If the contract is "X implies Y", do not ask for a test that Y is
    absent without X.
  - **Rejection paths of simple validation**: that an invalid value or a conflicting pair of options
    throws, the exact boundary of a check, or the exact error message.
  - **Defensive, unreachable or fallback branches**: a guard for a state the public API cannot produce, a
    `default:` arm.
  - **Pass-throughs**: an option written straight to a file key by an existing generic serializer, and
    every value of an enum when one shows the mapping works.
  - **Branches that differ only in data** from a branch that is already tested.
  - **projen's own build tooling**: `.projenrc.ts`, `projenrc/` and `scripts/` changes that only affect
    how projen itself is built, whose output a maintainer reviews in the regenerated files.
  - Docs-only PRs, refactors whose snapshots are unchanged, dependency bumps.
- **A test the author has said they will not add**, with a reason.
- **Snapshot style**: whether a test uses a snapshot or explicit `expect(...)` assertions is a preference,
  as long as the test turns red on the break.
- **Missing integration tests** for changes that do not depend on the packaged artifacts.
- **Test names and `describe` wording.**

## Output

Populate the structured finding fields `projen-review-principles` defines. Put the mutation you made and
the result in `evidence`. This dimension's `category` is one of: Missing test, Hollow test, Wrong test
layer, Hand-rolled test setup, Misleading snapshot test.

## Apply projen-review-principles

Apply the shared `projen-review-principles` skill for the severity scale, evidence order, `file:line`
discipline, finding format, `CONV-*` conventions and the 7-comment cap. Each row in
[`testing-rules.md`](references/testing-rules.md) carries its own severity.
