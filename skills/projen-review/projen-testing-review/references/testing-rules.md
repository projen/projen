# Testing rules: the lookup

Rows are grouped by family: coverage, test layer, test construction. See the `projen-review-principles`
skill for the shared lookup convention.

## Coverage

**[TEST-MISSING] (BLOCKING)**: A bug fix or feature with no test that turns red when the production change
is reverted (review of #4655: "You will also need test coverage."). For a fix, the test reproduces the
reported input. Down-tier RECOMMENDED for a change whose only effect is cosmetic output (comment text in a
generated file).

**[TEST-HOLLOW] (BLOCKING)**: A test added by the PR that stays green when you revert or mutate the
production line it claims to cover. Typical causes: asserting on the option object rather than the
synthesized file; a snapshot of a project that never enables the feature; `toBeDefined()` on a value that
is always defined. Prove it with the mutation.

**[TEST-ERROR-PATH] (RECOMMENDED)**: A new `throw` (mutual exclusivity, validation, deprecation conflict)
with no test asserting it throws with the expected message. These guard user configuration and regress
silently (review of #4856, where the added mutual-exclusivity check came with "Added a test for it").

**[TEST-HELPER-EDGE-CASES] (RECOMMENDED)**: A new generic helper (key flattening, case conversion, merging,
id generation) tested only through one component's snapshot. Extract it so it can be unit tested directly
with edge cases: arrays, `null`/`undefined`, nested and dotted keys, collisions, empty input (review of
#4877: moving the helper to a shared private util "Will also allow much easier test cases").

## Test layer

**[TEST-INTEG-LAYER] (BLOCKING)**: A Jest test that rebuilds projen, bundles its own artifact, or shells out
to a locally built CLI to test packaged behavior. `AGENTS.md` § Integration tests: "End-to-end behavior that
depends on the published artifacts (e.g. `projen new`, `projen eject`, cross-language synthesis) must be
tested via the `scripts/integ-*.sh` scripts ... Wire them through the `IntegrationTests` component in
`projenrc/integ-test.ts` ... Do NOT write Jest tests that rebuild projen or bundle their own artifacts."
The same rule makes a missing integ script for such behavior a `TEST-MISSING` finding.

## Test construction

**[TEST-HAND-ROLLED-SETUP] (RECOMMENDED)**: Test setup that re-implements an existing helper (review of
#4960: "I am sure there already is a helper for this available. Please use it."). The helpers:

| Need | Helper |
|---|---|
| Synthesize a project and read files | `synthSnapshot(project)` (`test/util.ts`, re-exported from `src/util/synth.ts`), `Testing.synth(project)` (`src/testing.ts`) |
| Synthesize including post-synth steps | `synthSnapshotWithPost(project)` (`test/util.ts`) |
| A minimal GitHub-enabled project | `new TestProject()` (`test/util.ts`) |
| A temporary directory | `mkdtemp()`, `withProjectDir()` (`test/util.ts`) |
| Simulate `projen new` | `simulateProjenNew()` (`test/util.ts`) |
| Snapshot a directory | `directorySnapshot()` (`src/util/synth.ts`) |
| Run the CLI | `execProjenCLI()` (`test/util.ts`) |

Read `test/util.ts` at the PR head before flagging: helpers are added over time.

**[TEST-MISLEADING-SNAPSHOT] (RECOMMENDED)**: A test whose name or file claims more than it checks: a
"full output" test that snapshots one file, a `backward-compat.test.ts` that covers one component (review
of #4684: "this isn't a snapshot of the full output"; "let's rename this file to something more meaningful
or move into a named subdir"). Ask for the name to match, or the coverage to match the name.

**[TEST-WRONG-FILE] (OPTIONAL)**: A test for `src/<module>/<file>.ts` placed somewhere other than
`test/<module>/<file>.test.ts` without reason. It makes coverage hard to find.
