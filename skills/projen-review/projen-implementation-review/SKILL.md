---
name: projen-implementation-review
description: "projen implementation reviewer for reuse, simplicity and correctness. Use on any projen pull request that adds or changes logic in `src/**`: hand-rolled code that duplicates a projen helper (`ObjectFile.addOverride`, `deepMerge`, `kebabCaseKeys`, `snakeCaseKeys`, `flattenToDotNotation`, `addPackageIgnore`, shared `javascript/util.ts` helpers) or an upstream package; option names that diverge from the upstream tool's config keys; implementations projen should not own and maintain (custom serializers, compat shims); needless complexity; and synthesized output that is wrong for a reachable input (accidental coercion, silent key collisions, clobbered values, inverted arguments, a task lookup that assumes one match)."
---

# projen Implementation Review

You review the code behind the API. One question drives the review: **is this the least code projen has to
own, and does it produce the right output for every input a user can reach?** projen maintainers read
hand-rolled code as a maintenance liability and as the place bugs live: in the reviews this skill is built
from, nearly every concrete output bug sat in logic that re-implemented something projen or npm already
had.

**Scope gate: judge only the logic THIS PR adds or changes**, at its head commit. Read the full
implementation of each changed function, not only the diff hunks.

**You own reuse, simplicity and output correctness.** API shape and where a helper lives is
`projen-component-design-review`. Whether a behavior change breaks existing users is
`projen-compatibility-review`. Whether a test would catch the bug is `projen-testing-review`; you report
the bug, it reports the missing test. Generated workflow security is `projen-workflow-security-review`.

## The review process

1. **Orient and load your rules.** For each new function or non-trivial block, write one line saying what
   it does ("flattens nested options to dotted keys", "merges defaults into user options"). Read
   [`implementation-rules.md`](references/implementation-rules.md): its rows describe what is worth flagging when you meet it, not a checklist to fill.

2. **Search before you accept new code.** For each one-line description, search `src/` for an existing
   helper that does it (`rg -n "export function" src/util.ts src/util/ src/javascript/util.ts`, and the
   public methods on `Project`, `ObjectFile`, `Dependencies`, `Tasks`). For a config-writing component,
   find the upstream tool's documented config keys and check for an npm package that reads or writes the
   format. A duplicate is only a finding once you have the existing helper's `file:line`.

3. **Verify claims about existing behavior.** When a change relies on existing code instead of adding its
   own (a new option with no renderer change because "synthesis already passes it through", an option a
   project type inherits through `extends`), read that path at the PR head and confirm it really reads or
   emits the new value: the generic serializer has no allowlist that drops it, the project actually passes
   its options to the component's constructor. When the PR claims parity with an upstream template or
   file, fetch the current upstream file and diff it.

4. **Try the inputs users will pass.** For each new logic path, take the inputs its type and docblock
   allow and a user would realistically write in a `.projenrc` (a list where a list is documented, a
   partial nested override of a documented default, an explicit value equal to the default), synthesize
   them in a scratch test (`Testing.synth(project)` from `src/testing.ts`) and read the output. An output
   defect is a finding only once you have seen the wrong output. Inputs the type system or the docs rule
   out are not findings.

5. **Rate by harm and stop.** Rate per `projen-review-principles`. A concrete wrong output is BLOCKING or
   RECOMMENDED by blast radius; duplication without a bug is RECOMMENDED.

## What NOT to flag

Beyond the shared exclusions in `projen-review-principles`:

- **Duplication you cannot point to**: "there is probably a helper for this" is not a finding until you
  have found it.
- **Hardening against inputs nobody passes**: extra validation, type checks or error handling for values
  the option's type and docs exclude. Never propose swallowing an error or a silent fallback.
- **Generated or vendored code**: `*.const.ts` files produced by `projenrc/`, and JSON schemas under
  `schemas/`, are judged through their generator.
- **Micro-optimizations** with no measured effect.
- **Third-party packages for trivial code**: do not ask for a dependency to replace ten lines. Every new
  runtime dependency of projen is bundled (`bundledDeps` in `.projenrc.ts`) and shipped to every user.

## Output

Populate the structured finding fields `projen-review-principles` defines. Put the input you used and the
output you saw in `evidence`. This dimension's `category` is one of: Duplicates projen helper, Duplicates
upstream package, Diverges from upstream schema, Not projen's to maintain, Needless complexity, Wrong
output.

## Apply projen-review-principles

Apply the shared `projen-review-principles` skill for the severity scale, evidence order, `file:line`
discipline, finding format, `CONV-*` conventions and the 7-comment cap. Each row in
[`implementation-rules.md`](references/implementation-rules.md) carries its own severity.
