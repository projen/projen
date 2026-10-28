# Testing rules: the lookup

Rows are grouped by family: coverage, test layer, test construction. See the `projen-review-principles`
skill for the shared lookup convention.

## Coverage

**[TEST-MISSING] (BLOCKING)**: A bug fix or feature with no test that turns red when the production change
is reverted. For a fix, the test reproduces the reported input. Down-tier RECOMMENDED for a change whose
only effect is cosmetic output (comment text in a generated file).

**[TEST-HOLLOW] (BLOCKING)**: A test added by the PR that stays green when you revert or mutate the
production line it claims to cover. Typical causes: asserting on the option object rather than the
synthesized file; a snapshot of a project that never enables the feature; `toBeDefined()` on a value that
is always defined. Prove it with the mutation.

**[TEST-ERROR-PATH] (RECOMMENDED)**: A new `throw` (mutual exclusivity, validation, deprecation conflict)
with no test asserting it throws with the expected message. These guard user configuration and regress
silently.

**[TEST-HELPER-EDGE-CASES] (RECOMMENDED)**: A new generic helper (key flattening, case conversion, merging,
id generation) tested only through one component's snapshot. Extract it so it can be unit tested directly
with edge cases: arrays, `null`/`undefined`, nested and dotted keys, collisions, empty input.

## Test layer

**[TEST-INTEG-LAYER] (BLOCKING)**: A Jest test that rebuilds projen, bundles its own artifact, or shells out
to a locally built CLI to test packaged behavior. `AGENTS.md` § Integration tests: "End-to-end behavior that
depends on the published artifacts (e.g. `projen new`, `projen eject`, cross-language synthesis) must be
tested via the `scripts/integ-*.sh` scripts ... Wire them through the `IntegrationTests` component in
`projenrc/integ-test.ts` ... Do NOT write Jest tests that rebuild projen or bundle their own artifacts."
The same rule makes a missing integ script for such behavior a `TEST-MISSING` finding.

## Test construction

**[TEST-HAND-ROLLED-SETUP] (RECOMMENDED)**: Test setup that re-implements an existing helper. Read
`test/util.ts` and `src/testing.ts` at the PR head before flagging: they provide project synthesis
(`synthSnapshot`, `Testing.synth`), a minimal GitHub-enabled test project, temporary project directories,
`projen new` simulation, directory snapshots and CLI execution, and helpers are added over time.

**[TEST-MISLEADING-SNAPSHOT] (RECOMMENDED)**: A test whose name or file claims more than it checks: a
"full output" test that snapshots one file, a `backward-compat.test.ts` that covers one component. Ask for
the name to match, or the coverage to match the name; a generic file name belongs in a named subdirectory.

**[TEST-WRONG-FILE] (OPTIONAL)**: A test for `src/<module>/<file>.ts` placed somewhere other than
`test/<module>/<file>.test.ts` without reason. It makes coverage hard to find.
