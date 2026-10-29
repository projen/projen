# Compatibility rules: the lookup

Rows are grouped by family: API surface, deprecation, defaults and output, workflow behavior,
declaration. See the `projen-review-principles` skill for the shared lookup convention.
[`CONTRIBUTING.md` § Compatibility](https://github.com/projen/projen/blob/main/CONTRIBUTING.md#compatibility)
defines what is and is not breaking for contributors; cite it in `reference` when a finding matches.

## API surface

**[COMPAT-API-REMOVED] (BLOCKING)**: A public option, property, method, class or enum member is removed or
renamed, a type narrowed, or an optional option made required. Every `.projenrc` using it stops compiling,
in every jsii language. Keep the old name working and deprecate it (see `COMPAT-DEPRECATION-PATTERN`).
Down-tier RECOMMENDED when the PR declares the break (`!` + footer) and no non-breaking route exists.

- **jsii signature check:** adding a required parameter, reordering parameters,
  changing a struct parameter to a class, or changing a return type breaks Python/Java/.NET/Go callers even
  when TypeScript callers still compile. Compare the before and after signature, not only the TypeScript
  call sites.
- **`projen new` flags:** project option names also surface as `projen new` CLI flags
  and in `.projenrc.json`. Renaming an option breaks those users even when no `.projenrc.ts` uses it.

## Deprecation

**[COMPAT-DEPRECATED-DROPPED] (BLOCKING)**: An option still in the API, typically `@deprecated`, no longer
has any effect after the change, for example a deprecated per-project `runsOn` option ignored once a new
global setting takes over. Users get no compile error and silently lose the behavior. Trace each
deprecated option from the interface to where it is read at the head commit.

**[COMPAT-DEPRECATION-PATTERN] (RECOMMENDED)**: A replaced option handled any other way than the pattern in
`CONTRIBUTING.md` § Deprecating instead of breaking: keep the deprecated option working as before, on the
same interface as the new one; mark it `@deprecated`, pointing to the replacement; throw if both are set:
`Only one of 'newOption' or 'deprecatedOption' may be specified, not both. Remove the deprecated
'deprecatedOption'.` In three
stages: at authoring time the old option is clearly deprecated; at compile time both are accepted; at
runtime projen throws if both are provided. Both options live on the same interface; do not split them
across a union or a separate type. Precedent: `commitMessageTemplate` / `commitMessageFormat` in
`src/github/mergify.ts`.

**[COMPAT-FALSE-DEPRECATION] (RECOMMENDED)**: An option is marked `@deprecated` in favor of a replacement
that cannot express every case the old option covers (a credentials object that has no SSH or deploy-key
mode, used to deprecate the SSH and deploy-key options). Users are pushed off a supported path with
nowhere to go. For each `@deprecated`, list what the old option can do and check the replacement can do
each.

## Defaults and output

**[COMPAT-DEFAULT-CHANGED] (BLOCKING)**: The default of an existing option changes, or new behavior is
enabled by default, so existing projects synthesize different output on upgrade, and you can name a
project that breaks because of it (step 3 of the skill). Different output that still works is not a break,
and neither is a new default the PR description announces. Read the base branch's `@default` and code.

**[COMPAT-FILE-OWNERSHIP] (BLOCKING)**: A file changes ownership between projen and the user. A file projen
starts generating overwrites the user's own copy; a file projen stops generating is deleted by cleanup
because it carries the marker (`ARCHITECTURE.md` § Synthesizing actual files: projen "looks for files with
the _magic string_ ... and removes them"). Up-tier when the file holds user content.

**[COMPAT-TASK-CONTRACT] (BLOCKING)**: An existing task is renamed, removed, or its steps reordered so
something that depends on it breaks: `npx projen <task>` in user scripts, `spawn` from user tasks,
generated workflows that run it, `projen eject` output. Task names and the `build` pipeline order
(`default` → `pre-compile` → `compile` → `post-compile` → `test` → `package`) are user-facing contract.

**[COMPAT-OUTPUT-CHURN] (RECOMMENDED)**: A changed snapshot in a test that does not opt into the PR's
feature, where the change is not a consequence of the PR's stated purpose: an accidental side effect on
every existing project. Show the code path that causes it. Up-tier BLOCKING when the change breaks a build
(a removed dependency, a changed path, a changed script). (doc-absent detail)

## Workflow behavior

**[COMPAT-WORKFLOW-OVERRIDES-HUMAN] (BLOCKING)**: A generated workflow change that undoes a deliberate human
action: re-queuing a PR a person dequeued, re-approving after a dismissal, re-opening, re-labeling. For
example, adding a `synchronize` trigger to auto-queue force-queues every updated PR, including ones a human
deliberately dequeued. Ask for state that records the human decision (a label) or a narrower trigger.

**[COMPAT-WORKFLOW-CHECK-RENAMED] (BLOCKING)**: An existing generated workflow or job is renamed or removed.
Required status checks in users' branch protection are matched by job name, so their PRs can no longer
merge until they update branch protection.

## Declaration

**[COMPAT-UNDECLARED-BREAK] (BLOCKING)**: The PR contains any BLOCKING finding above and the title has no
`!` or the body has no `BREAKING CHANGE:` footer. `CONTRIBUTING.md`: "If this commit includes breaking
changes, they must be listed at the end in the following format ... `BREAKING CHANGE: Description of what
broke and how to achieve this behavior now`". Report it once, in the summary, alongside the inline
findings.
