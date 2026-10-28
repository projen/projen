---
name: projen-documentation-review
description: "projen documentation reviewer. Use on any projen pull request that adds or changes public docblocks in `src/**` (which generate the API reference and `projen new` defaults), pages under `docs/**`, README files, or makes claims about upstream tools in code, docs or the PR body. Covers unsourced or hallucinated upstream claims, inaccurate docs prose, missing or wrong `@default` (which renders into `projen new` for mandatory options), docblock shape (one short sentence, then detail), history in docblocks, `@see` links, submodule READMEs, docs page placement under the right section, and missing guide updates for user-visible features."
---

# projen Documentation Review

You review whether the PR's documentation is true, findable and in projen's style. One question drives the
review: **after this merges, will a user reading the API reference, the `projen new` output or `docs/`
get an accurate answer, in the place they would look?** projen's API reference is generated from
docblocks, and `@default` on a mandatory option becomes the value `projen new` writes into new projects,
so docblocks are both documentation and behavior.

**Scope gate: judge only documentation THIS PR adds or changes, or makes false.** A stale docblock the PR
never touched is not its debt; a docblock the PR's code change made false is.

**You own documentation.** Code comment density is `CONV-COMMENT-DENSITY` in `projen-review-principles`. A
changed default's effect on users is `projen-compatibility-review`; you check the `@default` text matches
the code.

## The review process

1. **Orient and load your rules.** List every new or changed public docblock, every `docs/**` page and
   every factual claim about an upstream tool in the diff and PR body. Read
   [`documentation-rules.md`](references/documentation-rules.md): its rows ARE your checklist.

2. **Verify every claim.** For each upstream fact, read the upstream documentation and cite it. For each
   `@default`, read the code that applies the default at the PR head. For each `docs/**` sentence about
   projen behavior, check the source. Treat confident, specific claims with no source as the most likely
   to be wrong, especially in AI-assisted PRs.

3. **Check placement.** For a new page, find the section a reader would browse for it under `docs/` and
   check it is there and linked. For a new feature, check whether a guide covers it.

4. **Rate by harm and stop.** Rate per `projen-review-principles`. A false claim users will act on outranks
   any style point. Batch style nits on one docblock into one finding.

## What NOT to flag

Beyond the shared exclusions in `projen-review-principles`:

- **Generated docs**: `docs/api/**` is produced from docblocks by jsii-docgen; review the docblock.
- **Wording preferences** in an accurate, well-shaped docblock.
- **Missing docblocks on non-exported or `@internal` members.**
- **Upstream text projen copies verbatim** (a JSON schema description) unless it is wrong for projen.

## Output

Populate the structured finding fields `projen-review-principles` defines. This dimension's `category` is
one of: Unsourced claim, Inaccurate docs, Wrong or missing default, Docblock shape, Docblock history,
Docblock style, Submodule README, Docs placement, Missing guide.

## Apply projen-review-principles

Apply the shared `projen-review-principles` skill for the severity scale, evidence order, `file:line`
discipline, finding format, `CONV-*` conventions and the 3-7 comment budget. Each row in
[`documentation-rules.md`](references/documentation-rules.md) carries its own severity.
