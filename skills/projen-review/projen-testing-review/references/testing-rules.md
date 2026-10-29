# Testing rules: the lookup

Rows are grouped by family: coverage, test layer, test construction. See the `projen-review-principles`
skill for the shared lookup convention. The testing skill's "What NOT to flag" lists what does not owe a
test; it overrides every row here.

## Coverage

**[TEST-MISSING] (RECOMMENDED)**: A behavior this PR adds for its users ships with no test that would fail
if it regressed: the feature's main effect on the synthesized project (the file or key it writes, the task
it adds, the workflow job it creates), a bug fix's reported case, or a non-obvious computation it performs
(a generic helper that merges, flattens or converts). Judge at the level of the feature, not of each `if`
arm. A missing test is decay, not damage. Before reporting it, search the test files for it.

- **Snapshot generated files (doc-absent detail):** when the feature generates a file (source code, a
  config file) and the existing tests in the same test file snapshot that file, the new tests should
  snapshot it too, next to their targeted assertions. Fragment assertions miss accidental changes
  elsewhere in the file, and the snapshot shows reviewers the full output.

**[TEST-HOLLOW] (RECOMMENDED)**: A test added by the PR that stays green when you revert or mutate the
production line it claims to cover. Typical causes: asserting on the option object rather than the
synthesized file; a snapshot of a project that never enables the feature; `toBeDefined()` on a value that
is always defined. Prove it with the mutation; read what the assertion compares before calling it vacuous.

## Test layer

**[TEST-INTEG-LAYER] (RECOMMENDED)**: A Jest test that rebuilds projen, bundles its own artifact, or shells
out to a locally built CLI to test packaged behavior. `AGENTS.md` § Integration tests: "End-to-end behavior
that depends on the published artifacts (e.g. `projen new`, `projen eject`, cross-language synthesis) must
be tested via the `scripts/integ-*.sh` scripts ... Wire them through the `IntegrationTests` component in
`projenrc/integ-test.ts` ... Do NOT write Jest tests that rebuild projen or bundle their own artifacts."

## Test construction

**[TEST-HAND-ROLLED-SETUP] (RECOMMENDED)**: Test setup that re-implements an existing helper. Read
`test/util.ts` and `src/testing.ts` at the PR head before flagging: they provide project synthesis
(`synthSnapshot`, `Testing.synth`), a minimal GitHub-enabled test project, temporary project directories,
`projen new` simulation, directory snapshots and CLI execution, and helpers are added over time.

**[TEST-MISLEADING-SNAPSHOT] (RECOMMENDED)**: A test whose name or file claims more coverage than it has:
a "full output" test that snapshots one file, a `backward-compat.test.ts` that covers one component.
Readers will trust coverage that does not exist. Rename it, or move a generically named file into a named
subdirectory.
