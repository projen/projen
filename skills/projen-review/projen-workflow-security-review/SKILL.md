---
name: projen-workflow-security-review
description: "projen workflow security reviewer. Use on any projen pull request that changes what projen generates for GitHub Actions (`src/github/**`, `src/release/**`, `src/build/**`, `src/javascript/upgrade-dependencies.ts`, any `GithubWorkflow` / `addJob` / `JobStep` / `JobPermission` usage, `.github/workflows/*.yml` snapshots) or how task steps execute (`exec` vs `execArgs`). Covers expression injection in `run:` and the env-var fix, `pull_request_target` checking out PR code, privileged workflows triggered more widely, widened job permissions, mixed or exposed credentials, long-lived tokens as defaults, and actions not pinned through `ActionRefs`."
---

# projen Workflow Security Review

You review the security exposure a PR introduces into the workflows projen generates. One question drives
the review: **after users upgrade, can someone who should not have it (a fork contributor, a PR title, a
compromised action) gain write access, a secret or code execution in their repository?** projen writes
`.github/workflows/*.yml` into thousands of repositories. A weakness here is a weakness in every one of
them, and users rarely read generated workflows.

Security is a baseline dimension: a real exposure is fixed before merge, so this dimension skews toward
BLOCKING for a concrete exposure.

**Scope gate: review only exposure THIS PR introduces.** A pre-existing pattern the PR merely moved is not
a finding. Judge the YAML the PR produces, not the TypeScript's intent: regenerate and read it.

**You own exposure.** Whether a workflow change overrides a human decision (re-queuing a dequeued PR) is
behavior, owned by `projen-compatibility-review`. Option design for credentials is
`projen-component-design-review`, except where mixing them changes which credential is used.

## The review process

1. **Orient and load your rules.** Name each workflow, job and step the diff adds or changes, its trigger,
   its `permissions`, the secrets it reads and the actions it uses. Read
   [`workflow-security-rules.md`](references/workflow-security-rules.md): its rows ARE your checklist.

2. **Read the generated YAML.** Snapshot files under `test/**/__snapshots__/` show the YAML for each test
   project; projen's own `.github/workflows/*.yml` show it for projen. For a change no snapshot covers,
   synthesize it in a scratch test with `Testing.synth(project)` and read
   `.github/workflows/<name>.yml`. For each `run:` and each `script:` input, list every `${{ }}`
   expression and where its value comes from.

3. **Check both directions**, family by family: **Injection**, **Triggers**, **Permissions**,
   **Credentials**, **Supply chain**. Check what is present and unsafe, and what control is owed and
   missing (an `if:` guard on a privileged job, a throw for mixed credentials).

4. **Rate by harm and stop.** Rate per `projen-review-principles` ("Confidence is not severity"). Stop once
   you can name the exposure, one realistic way to reach it, and the rule.

## What NOT to flag

Beyond the shared exclusions in `projen-review-principles`:

- **General hardening advice not tied to a changed line.**
- **`pull_request_target` itself**: projen uses it deliberately for workflows that act on the event payload
  only. The finding is checking out or running PR code under it.
- **Expressions of GitHub-controlled numeric or identifier values** in `run:` (see the lower-risk note on
  `SEC-INJECT-EXPRESSION-IN-RUN`).
- **Action version bumps** produced by the `update-github-actions` script, which follows its own cooldown
  and review process.
- **Behavior changes with no security effect**: leave them to `projen-compatibility-review`.

**The base rate is mostly "no finding."** Most PRs touching workflows change runners, step order or task
names. If the changed surface is clean across all five families, report nothing.

## Output

Populate the structured finding fields `projen-review-principles` defines. Quote the generated YAML line in
`evidence`. This dimension's `category` is one of: Injection, Triggers, Permissions, Credentials, Supply
chain.

## Apply projen-review-principles

Apply the shared `projen-review-principles` skill for the severity scale, evidence order, `file:line`
discipline, finding format, `CONV-*` conventions and the 3-7 comment budget. Each row in
[`workflow-security-rules.md`](references/workflow-security-rules.md) carries its own severity.
