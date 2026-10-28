# Finding & Comment Format Reference

This is the detail behind "Keep the review to a tight, high-harm set" in the `projen-review-principles`
`SKILL.md`. Read it before generating any findings. Produce **structured findings**, not hand-authored
markdown.

## The structured finding contract

Produce each finding as a structured object with these fields:

- `file`: repo-relative path of the file the finding is on.
- `lineRange: { startLine, endLine }`: the line or line span the finding is about. A single-line finding
  sets both to that line.
- `category`: this dimension's finding type (each dimension skill names the values it uses).
- `severity`: one of `BLOCKING` / `RECOMMENDED` / `OPTIONAL`. The only severity vocabulary.
- `ruleId`: the stable `[id]` of the rule that fired (e.g. `SEC-INJECT-EXPRESSION-IN-RUN`), verbatim from
  the dimension's rules lookup, or a `CONV-*` id from the principles. The debug/trace key.
- `message`: the human-visible comment text (see the next section).
- `reference`: the authoritative source the finding cites (an `AGENTS.md` section, an RFC, projen source
  by file + line, a jsii or GitHub Actions doc URL), or null.
- `evidence`: what you ran or read that supports the finding (the synthesized output, the test that stayed
  green, the existing helper's location).
- `suggestedFix`: a concrete fix, or null.

The review as a whole also carries a `summary` with its `text`, naming the reviewed short SHA.

## `message`: write it complete and standalone

`message` must stand alone as a complete review comment:

- **Observation**: what the issue is, specific, referencing the code (1-2 sentences).
- **Impact**: what happens to projen users or maintainers if it is not addressed.
- **Concrete fix**: the change to make (a code example, a GitHub ```` ```suggestion ```` block for a small
  edit, or a question framing a specific alternative), with the guideline cited inline.

Fold the essentials of `evidence`, `reference` and `suggestedFix` into the prose. `ruleId` is metadata; do
not fold it into `message`.

Short is fine. Many good projen review comments are one line plus a suggestion block:

````markdown
Should take any scope. Use `this.project` to access the project.

```suggestion
  constructor(scope: IConstruct, options: FooConfigOptions) {
```
````

## Severity vocabulary

Defined in `SKILL.md` "Severity: rate by the harm it does when it triggers" (authoritative).

## Filtering: what becomes a finding

Emit a finding only when it is:

1. **Tied to a specific code location**: it has a `file` and a `lineRange`.
2. **Actionable**: the contributor can make a concrete change.
3. **Significant enough to stand alone.**

Keep these OUT of the findings (put them in the `summary` if they matter): design observations not tied
to a line, positive feedback, clusters of related nits (consolidate into one finding on the first
occurrence), findings already raised by another reviewer on the PR (unless you add new context), and
open-ended design questions for a large or foundational PR.

### Severity-based filtering

| Severity | Emit as a finding? | Rule |
|----------|--------------------|------|
| `BLOCKING` | Always | Every blocking issue becomes a finding. |
| `RECOMMENDED` | Usually | Emit when tied to specific code; consolidate related ones. |
| `OPTIONAL` | Sparingly | Only if it is a quick fix and the total count is low. |

### Budget rule

Target **3-7 findings** per review. With more than 7 candidates:

1. Keep all `BLOCKING` findings.
2. Keep the highest-impact `RECOMMENDED` findings.
3. Drop `OPTIONAL` findings unless the total is still under 7.

## Review event

- Any `BLOCKING` finding → request changes.
- Only `RECOMMENDED` / `OPTIONAL` findings → comment.
- No findings → approve only if you are asked to approve; otherwise comment with the summary.

## Tone Rules

The reviewer's-voice rules live in `SKILL.md` "Make each finding land" (authoritative).
