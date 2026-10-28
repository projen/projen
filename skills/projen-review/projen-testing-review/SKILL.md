---
name: projen-testing-review
description: "projen testing reviewer. Use on any projen pull request that changes behavior in `src/**`, `projenrc/**` or `scripts/integ-*.sh`, or adds or changes tests in `test/**`: a fix or feature with no test that would go red if it broke, new errors and mutual-exclusivity checks with no test, generic helpers without edge-case tests, hand-rolled test setup where `synthSnapshot` / `Testing.synth` / `TestProject` / `withProjectDir` / `mkdtemp` already exist, packaged-artifact behavior tested in Jest instead of `scripts/integ-*.sh`, and snapshot tests whose name or file does not match what they snapshot."
---

# projen Testing Review

You review whether the PR's tests would catch the change breaking. One question drives the review: **if I
reverted the production change, would a test in this PR turn red?** Answer it by doing it: revert or mutate
the line in a scratch checkout and run the one file with `node ./projen.js test test/<path>.test.ts`
(compile first with `node ./projen.js compile`). Do not run the full build; `AGENTS.md` § Developing
projen itself: "Avoid running a full build ... Run specific tests."

projen tests live in `test/`, mirroring `src/` (`src/github/workflows.ts` → `test/github/workflows.test.ts`).
Most assert on synthesized output via `synthSnapshot(project)` and Jest snapshots in `__snapshots__/`.

**Scope gate: judge only tests the PR's own change owes.** A pre-existing untested path the PR does not
touch is not its debt.

**You own tests.** A bug in the production code is `projen-implementation-review`; you report that no test
would catch it. Whether a snapshot change is acceptable for users is `projen-compatibility-review`.

## The review process

1. **List what the change owes.** For each distinct behavior in the diff (a new option, a new branch, a new
   `throw`, a fixed bug, a new helper), name the test that should exercise it. Read
   [`testing-rules.md`](references/testing-rules.md): its rows ARE your checklist.

2. **Discharge each one.** Find the test. Revert or mutate the production line and run the file. A test
   that stays green is hollow. A snapshot test that only turns red because unrelated output moved is weak
   evidence; prefer an assertion on the specific file and key as well.

3. **Check the layer and the helpers.** Behavior of the published package (`projen new`, `projen eject`,
   other-language synthesis) belongs in `scripts/integ-*.sh`. Everything else is a Jest test using the
   existing helpers.

4. **Rate by harm and stop.** Rate per `projen-review-principles`. One finding per missing or hollow test,
   on the production line it should cover.

## What NOT to flag

Beyond the shared exclusions in `projen-review-principles`:

- **Tests a change does not owe**: a docs-only PR, a refactor whose snapshots are unchanged, a dependency
  bump, a change to `projenrc/` that only affects projen's own build.
- **Snapshot style**: whether a test uses a snapshot or explicit `expect(...)` assertions is a preference,
  as long as the test turns red on the break.
- **Missing integration tests** for changes that do not depend on the packaged artifacts.
- **Test names and `describe` wording.**

## Output

Populate the structured finding fields `projen-review-principles` defines. Put the mutation you made and
the result in `evidence`. This dimension's `category` is one of: Missing test, Hollow test, Missing error
test, Missing edge-case test, Wrong test layer, Hand-rolled test setup, Misleading snapshot test.

## Apply projen-review-principles

Apply the shared `projen-review-principles` skill for the severity scale, evidence order, `file:line`
discipline, finding format, `CONV-*` conventions and the 3-7 comment budget. Each row in
[`testing-rules.md`](references/testing-rules.md) carries its own severity.
