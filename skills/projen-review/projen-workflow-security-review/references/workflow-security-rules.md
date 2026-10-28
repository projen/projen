# Workflow security rules: the lookup

Rows are grouped by family: injection, triggers, permissions, credentials, supply chain. See the
`projen-review-principles` skill for the shared lookup convention. Read
[GitHub's secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) before
rating a finding that turns on GitHub Actions behavior. Unlike the other dimensions, most rows here rest on
that upstream guidance.

## Injection

**[SEC-INJECT-EXPRESSION-IN-RUN] (BLOCKING)**: A generated `run:` script, or a `with:` input that an action
evaluates as script (`actions/github-script`'s `script`), interpolates a `${{ ... }}` expression whose value
an outside contributor can influence: `github.event.pull_request.title` / `.body` / `.head.ref`,
`github.head_ref`, issue and comment bodies, commit messages, branch names, labels, or a step output derived
from any of these. GitHub expands the expression into the script text before the shell runs, so the
value executes as code. Pass the value through `env:` and reference it as a shell variable.

- **The env-var half (doc-absent detail):** in the script, reference the variable with shell syntax
  (`"$PR_NUMBER"`), never with expression syntax: `${{ PR_NUMBER }}` names no context, so GitHub rejects
  the workflow ("Unrecognized named-value"). A common half-fix moves the values into `env:` correctly but
  leaves the script reading `"${{ PR_NUMBER }}"`; `src/github/auto-approve.ts` shows the correct form.
  Check every `run:` the PR changes in the regenerated `.github/workflows/*.yml` and in the snapshot.
- **Lower-risk values (doc-absent detail):** numeric or GitHub-controlled values
  (`github.event.pull_request.number`, `github.repository`, `github.run_id`) cannot carry a payload. Moving
  them to `env:` is good hygiene; their presence in `run:` is OPTIONAL at most.

**[SEC-INJECT-TASK-SHELL] (RECOMMENDED)**: A new task step builds a shell command string from a
user-supplied option (`exec: \`tool ${options.arg}\``) where `execArgs` would pass it verbatim.
`src/task-model.ts`: "Use `execArgs` for arguments you did not write literally." Option values containing
spaces, quotes or shell metacharacters are re-parsed by the shell, differently on Windows. Up-tier BLOCKING
when the value can come from outside the repository (an environment variable set by a workflow from event
data).

## Triggers

**[SEC-TRIGGER-PRT-CHECKOUT] (BLOCKING)**: A workflow on `pull_request_target` (or `workflow_run` from a
fork-triggered run) that checks out, installs, builds or runs code from the pull request head. That event
has a read/write token and secrets even for fork PRs. `src/github/workflows-model.ts` on
`pullRequestTarget`: "you should make sure that you do not check out, build, or run untrusted code from the
pull request with this event." projen's own `pull_request_target` workflows (`AutoApprove`, `AutoQueue`,
`PullRequestLint`) act on the event payload only; a new one must too.

**[SEC-TRIGGER-WIDENED] (RECOMMENDED)**: A change that makes an existing privileged workflow (approve,
queue, merge, release, publish) run in more situations: a new event type, a dropped `if:` condition on the
author or label, a `synchronize` trigger on a workflow that acts with write access. Name who can now cause
the privileged action. A trigger change can also be a behavior break, which
`projen-compatibility-review` owns; check it here for privilege.

## Permissions

**[SEC-PERM-WIDENED] (BLOCKING)**: A job's `permissions` gain a `write` scope, or `id-token: write`, beyond
what its steps use, or a job-level block is replaced by a broader workflow-level one. projen requires a
`permissions` clause on every job (`src/github/workflows.ts` `verifyJobConstraints`), so the clause is
always visible in the diff: compare the scopes against the API calls the steps make. Down-tier RECOMMENDED
when the extra scope is read-only.

**[SEC-PERM-USER-OVERRIDE-LOST] (RECOMMENDED)**: A change that ignores or replaces permissions the user set
through options (e.g. `BuildWorkflowOptions.permissions`), so a user who narrowed them gets the defaults
back.

## Credentials

**[SEC-CRED-MIXED-AUTH] (BLOCKING)**: Two authentication options (a token secret, SSH, a deploy key, GitHub
App credentials) that can be set together with one silently winning, so the workflow authenticates with a
credential the user did not intend, or with a broader one (a token secret and SSH). Throw when both are
set; see `DES-OPT-MUTEX`.

**[SEC-CRED-EXPOSED] (BLOCKING)**: A secret or token written where it outlives or escapes its step: echoed
to the log, written to `$GITHUB_ENV` / `$GITHUB_OUTPUT` for later steps that do not need it, uploaded in
an artifact, passed on a command line, or persisted in the checkout's git config for steps that run
untrusted code. Scope each secret to the step that uses it via that step's `env:`.

**[SEC-CRED-DEFAULT-TOKEN-SCOPE] (RECOMMENDED)**: A new feature that defaults to a long-lived personal access
token secret where `GITHUB_TOKEN` with job permissions, or a GitHub App token
(`GithubCredentials.fromApp()`), would do. Ask for the narrower default.

## Supply chain

**[SEC-SUPPLY-UNPINNED-ACTION] (BLOCKING)**: A workflow step in `src/**` with a hard-coded
`uses: "owner/action@ref"` string. Every action projen uses goes through `ActionRefs` in
`src/github/actions.const.ts`, which is generated from `resources/github-actions.jsonc` by
`projenrc/actionsConst.ts` and pinned to a commit SHA or an immutable release ("The approved version line
... Changing this requires human review."). A new action is added to `resources/github-actions.jsonc` and
referenced via `ActionRefs`, so users can still remap it with `project.github.actions.set()`.

**[SEC-SUPPLY-REMOTE-SCRIPT] (RECOMMENDED)**: A generated step that downloads and executes a script
(`curl ... | sh`, `npx some-package@latest`) without a pinned version or checksum.
