# projen review skills

Skills for reviewing changes to projen, locally or on a pull request, with any agent.

| Skill | Reviews |
|---|---|
| [`projen-review-principles`](./projen-review-principles/SKILL.md) | The shared base the other six apply: severity, evidence, finding format, scope and repo conventions |
| [`projen-component-design-review`](./projen-component-design-review/SKILL.md) | Component and API design: the component model, jsii-compatible types, public surface, placement |
| [`projen-implementation-review`](./projen-implementation-review/SKILL.md) | Reuse, simplicity and output correctness: hand-rolled code projen or npm already provides, code projen should not own, wrong synthesized output |
| [`projen-compatibility-review`](./projen-compatibility-review/SKILL.md) | Breaking changes, deprecations, defaults and the synthesized output every downstream project inherits |
| [`projen-testing-review`](./projen-testing-review/SKILL.md) | Test coverage a change needs, the right test layer and existing test helpers |
| [`projen-documentation-review`](./projen-documentation-review/SKILL.md) | Docblocks, code comments, `docs/` placement and unsourced claims |
| [`projen-workflow-security-review`](./projen-workflow-security-review/SKILL.md) | Security of the GitHub Actions workflows projen generates: injection, permissions, credentials, triggers |

The skills follow the projen [`AGENTS.md`](../../AGENTS.md), [`CONTRIBUTING.md`](../../CONTRIBUTING.md),
[`ARCHITECTURE.md`](../../ARCHITECTURE.md) and the [RFCs](../../rfcs/). Where those are silent, a rule cites
the maintainer review that established it.

## Install

Install all seven together, because the other six apply `projen-review-principles`.

```sh
npx skills add projen/projen --skill '*' -g
```

`-g` installs for your user instead of into the current directory. From a projen checkout:

```sh
npx skills add ./skills/projen-review --skill '*' -g
```

The skills ask your agent to verify a finding by running the code (a synth, a test, a mutation) before it
reports it. Give the agent a checkout with dependencies installed and `node ./projen.js compile` done, so
`node ./projen.js test test/<file>.test.ts` runs.
