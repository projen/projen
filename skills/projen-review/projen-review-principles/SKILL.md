---
name: projen-review-principles
description: "Shared foundation every projen review-dimension skill applies: the harm-based severity scale (BLOCKING/RECOMMENDED/OPTIONAL), evidence and citation authority order, exact file:line, the concrete-fix rule, the 3-7 comment budget, review tone, scope and PR-hygiene conventions every dimension enforces (CONV-*), the shared what-NOT-to-flag exclusions, the finding-output contract (ruleId + reference fields), and the rules-lookup convention. Apply whenever conducting a projen PR review, rating a finding's severity, deciding whether something is a finding at all, or turning a finding into a posted comment."
---

# Review Principles

The shared base every projen review-dimension skill (`projen-component-design-review`, `projen-implementation-review`,
`projen-compatibility-review`, `projen-testing-review`, `projen-documentation-review`,
`projen-workflow-security-review`) applies, so these rules never drift. A dimension skill decides *what* it
flags and how to calibrate it; it never redefines anything below.

projen is a library whose output is other people's repositories. Every `projen` upgrade re-synthesizes
`package.json`, `tsconfig.json`, `.github/workflows/*.yml` and every other managed file in every downstream
project. Keep that multiplier in mind when you rate harm: a defect in what projen synthesizes ships to
every user on their next upgrade, without them changing a line.

## Severity: rate by the harm it does when it triggers

Ask one question of every finding: **if this ships and the code path is reached, what breaks, and how
badly?** That answer sets the tier, not the wording and not how confident you are it triggers.

- **BLOCKING**: the harm is **damage**. A user's project concretely breaks or does the wrong thing: their
  build fails after upgrading, synth deletes or overwrites state a user or another tool wrote, a
  non-TypeScript binding stops compiling, a generated workflow opens an injection path or leaks a
  token, or the fix does not fix the reported problem. Must be fixed before merge.
  - *Lost state.* A new `JsonFile` fully owns a tool's config file, so every change the tool's own CLI
    made to it (an added provider, an added module) is wiped on the next synth. The file needs to read the
    current state and merge → BLOCKING.
  - *Wrong fix.* A PR treats an option as glob patterns when it is a list of directories, contradicting
    what the issue discussion established → BLOCKING.
- **RECOMMENDED**: the harm is **decay**. Nothing breaks today, but the change leaves a maintenance cost,
  an API projen will have to support forever, or a latent trap. Should be fixed before merge.
  - *Surface projen must carry.* A public mutable field that should be a getter over a private property;
    a hand-rolled dot-path merge that duplicates `ObjectFile.addOverride`.
- **OPTIONAL**: the harm is **negligible**. Pure polish: a tidier name, a grouping with identical effect.

A finding's `severity` field takes exactly one of these three words. If a source you ported used
High/Medium/Low or P0/P1/P2, map it onto these three by harm and drop the palette.

### Calibrate the harm honestly

- **Confidence is not severity.** Rate by the harm *when* the path is reached. A concrete failure
  mechanism is never demoted to OPTIONAL "to be safe."
- **Politeness is not severity.** A blocking issue raised as a question ("Why should this be a separate
  component?") still blocks if the answer is "it should not."
- **No harm, no finding.** Clean code reports nothing; do not manufacture a nit.
- **Only harm this PR introduces.** A pre-existing defect the PR merely moved is not a finding.

When the finding is that the change violates a rule in projen's own guides (`AGENTS.md`,
`CONTRIBUTING.md`, `ARCHITECTURE.md`, an accepted RFC in `rfcs/`), let the rule's stated harm set the tier
and quote it, so the author sees the authority. Where the guides are silent, the rule in this skill set is
the authority: cite it by its id.

## Make each finding land

Every finding carries three things:

- **An exact location**: `src/github/workflows.ts:L42` or a range `L42-L50`. A finding with no location
  stays in the summary as an observation.
- **Evidence**, strongest authority first: reproduced behavior (a synth, a test you ran, a mutation that
  leaves a test green, a jsii compile) → projen source at the PR head and at the base (precedent, linked by
  file + line) → `AGENTS.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `rfcs/` → upstream documentation (jsii
  TypeScript restrictions, GitHub Actions, the tool whose config the component writes) → the linked issue
  and PR discussion → existing tests. Prefer reproduced behavior when sources disagree.
  **Verify before you cite.** Never post from the diff alone when the claim can be run. Output is wrong
  only once you have synthesized it (`Testing.synth(project)` in a scratch test, or `node ./projen.js` in a
  fixture project) and read the file; a test is hollow only once you reverted the change and watched it
  stay green; a helper "already exists" only once you have found it by `file:line`. When a finding turns
  on an upstream tool's option, default or reporter name, read the upstream page and cite it in
  `reference`.
- **A concrete fix**: a code example, or a question framing a specific alternative ("Could `UpgradeDependencies`
  take an explicit option that defaults from `NodePackage`?"). Always offer a way out.

Write in a reviewer's voice: prefer "we" and "consider" over "you should"; frame suggestions as questions
where you can; stay direct but not harsh on blocking issues; acknowledge good work; drop "obviously" and
"simply". When the right design is genuinely open, **surface it as a question for discussion rather than
proposing any solution that happens to work**.

## Keep the review to a tight, high-harm set

Target **3-7 comments per review**. Keep every `BLOCKING` finding; then the highest-harm `RECOMMENDED`
findings; add `OPTIONAL` ones only if the total stays within budget.

A finding becomes a posted inline comment only when it is (1) tied to a specific line, (2) actionable and
(3) significant enough to stand alone. Keep observations, positive notes and clusters of nits in the
summary.

**The summary always names the reviewed commit** by its short SHA (`Reviewed at 27403917.`). A PR that
moves after review gets a fresh review at the new head; it does not inherit the old verdict.

**Large or foundational PRs.** When a PR is very large (thousands of lines), introduces a new project type
or project model (for example a new construct tree root), or implements an RFC, review it at the level of
the rules below and the RFC it implements. Do not redesign it in comments: put "needs maintainer design
review" and the open questions in the summary.

See [`references/pr-comment-format.md`](references/pr-comment-format.md) for the structured finding fields
before you generate findings.

## Repository conventions every dimension enforces

These apply to any change, so each dimension checks them on its own surface. Each is a single `CONV-*`
rule; cite it by that id.

- **[CONV-WRONG-FIX] (BLOCKING)**: The change does not fix the reported problem, or fixes it in a way the
  issue discussion already rejected. Read the linked issue before the diff.
- **[CONV-GENERATED-FILE-EDIT] (BLOCKING)**: A projen-managed file (carrying the `~~ Generated by projen`
  marker, or anything under `.projen/`) is edited by hand without the `.projenrc.ts` / `projenrc/` change
  that produces it, or the source changed and the regenerated files were not committed. `AGENTS.md` §
  File Modifications: "DO NOT manually edit generated files."
- **[CONV-UNRELATED-CHANGE] (RECOMMENDED)**: The diff carries a refactor or fix unrelated to the PR's
  stated purpose. Ask for it to be reverted or moved to a separate PR; a PR is not the place to
  restructure components it only needs to touch. Up-tier BLOCKING when the refactor changes behavior the
  PR does not test.
- **[CONV-SOLVE-GENERALLY] (RECOMMENDED)**: A special case added for one component when the same problem
  affects its siblings. Ask whether it is strictly needed for this PR, whether other components share the
  problem, and if so whether it should be solved once for all of them.
- **[CONV-SPLIT-PR] (RECOMMENDED)**: An independently useful part (a new config component, a new file
  type) is bundled into a large feature PR. Suggest landing it first in its own PR.
- **[CONV-COMMENT-DENSITY] (RECOMMENDED)**: `AGENTS.md` § Code comments: "Keep comments to a minimum ...
  no longer than 120 characters per line ... Do not narrate past decisions, alternatives considered, or
  issue numbers." One finding per PR, listing the lines.

PR title and body conventions (conventional commits, lowercase title, `Fixes #`, the `BREAKING CHANGE:`
footer) go in the summary, not inline. `projen-compatibility-review` owns whether a breaking change is
declared.

## What NOT to flag: the shared exclusions

Every dimension skill applies these on top of its own carve-outs. None is a finding, at any severity:

- **Pre-existing / not introduced by this PR.**
- **Cosmetics**: typos, whitespace, formatting, naming preferences, idiom choices. ESLint and Prettier run
  in the build; do not duplicate them. The `CONV-*` rules above are the only exceptions.
- **Outside this dimension's scope**: leave it for the dimension that owns it.
- **No nit quota**: when the changed surface is clean, report nothing.
- **Generated and release content**: snapshot files (`test/**/__snapshots__/*.snap`), the API reference
  under `docs/api/**` (generated by jsii-docgen), `src/**/*.const.ts` generated by `projenrc/`, and any
  file with the projen marker are judged through the source that produces them, never line by line.
  Snapshot churn is evidence of an output change; `projen-compatibility-review` judges whether that change
  is acceptable. The `0.0.0` version in `package.json` is a release-tooling marker.

## Rules-lookup convention

Each dimension skill keeps its detailed rules in a `references/*-rules.md` lookup. Every lookup shares one
shape: rows grouped by family, sorted BLOCKING → RECOMMENDED → OPTIONAL within each family, `[id]`s stable.
A conditional severity is ONE rule: the row header carries the primary severity, the body states when it
up- or down-tiers. A row marked `(doc-absent detail)` carries reviewer calibration projen's own docs do not
state, kept in full. All
projen/projen links reference `main`.

## Sources

- [`AGENTS.md`](https://github.com/projen/projen/blob/main/AGENTS.md): task execution, generated files,
  design guidelines (actionable errors, mutually exclusive options, deprecation), code comments,
  integration tests.
- [`ARCHITECTURE.md`](https://github.com/projen/projen/blob/main/ARCHITECTURE.md): synthesis lifecycle,
  the projen marker and cleanup, jsii.
- [`CONTRIBUTING.md`](https://github.com/projen/projen/blob/main/CONTRIBUTING.md): conventional commits
  and the breaking-change footer.
- [`rfcs/`](https://github.com/projen/projen/tree/main/rfcs): accepted design direction, in particular
  [`repository-tree-root.md`](https://github.com/projen/projen/blob/main/rfcs/repository-tree-root.md).
- [`.github/pull_request_template.md`](https://github.com/projen/projen/blob/main/.github/pull_request_template.md).
