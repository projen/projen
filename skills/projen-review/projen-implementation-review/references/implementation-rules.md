# Implementation rules: the lookup

Rows are grouped by family: output correctness, reuse of projen, reuse of upstream, ownership, simplicity.
See the `projen-review-principles` skill for the shared lookup convention.

## Output correctness

**[IMPL-OUT-CLOBBER] (BLOCKING)**: New logic overwrites a value the user or another component set: a
nested assignment that replaces an existing scalar or subtree, an override applied after the user's own
override, a file that fully owns content another tool writes. Example from review of #4877: a hand-rolled
dot-path merge where `target[parts[i]] = {}` turns `"sonar.projectKey.foo": "x"` into a wipe of the
mandatory `projectKey`. For files another tool also writes (a CLI that adds providers to its config file),
the file must read the current state and merge (review of #4868: "any `cdktn provider add` etc will be
lost").

**[IMPL-OUT-WRONG-VALUE] (BLOCKING)**: The synthesized file, task or workflow is wrong for a reachable
input: arguments passed in the wrong order, a mapping inverted, a key emitted under the wrong name, a
lookup that returns the first match when several can exist (review of #4822: "this doesn't really do it I
think as there might be more than one `post-upgrade` task"). Prove it by synthesizing the input and
quoting the output.

**[IMPL-OUT-ACCIDENTAL-COERCION] (RECOMMENDED)**: A value type the code was not designed for falls through
to `String(value)` or a template literal and happens to work for one case. Review of #4877: arrays became
`"a,b"` only because `Array.prototype.toString` comma-joins, while `[{x:1}]` became `[object Object]` and
`[null,"a"]` became `",a"`. Handle the type explicitly (`value.join(",")`, throwing on non-scalar
elements) or throw. Up-tier BLOCKING when the coerced value is silently wrong in a file users ship.

**[IMPL-OUT-SILENT-COLLISION] (RECOMMENDED)**: Two inputs that map to the same output key, with the last
write silently winning. Review of #4877: `{ "a.b": "1", a: { b: "2" } }` produced two `a.b` entries. Detect
and throw, or document last-wins.

**[IMPL-OUT-SHALLOW-DEFAULTS] (RECOMMENDED)**: Defaults merged with a shallow spread, so a partial nested
option wipes an entire default subtree (review of #4877: `{ coverage: {} }` dropped the default coverage
exclusions). Use `deepMerge` from `src/util.ts`, or document replace semantics loudly in the docblock.

**[IMPL-OUT-DROPPED-INTENT] (RECOMMENDED)**: Code that omits a value the user set explicitly because it
equals today's upstream default (review of #4877: "Silently dropping an explicit `timeout: 300` ... loses
user intent — if SonarQube ever changes a server-side default, the config no longer says what the user
asked for"). Emit what the user set; skip only `undefined`.

## Reuse of projen

**[IMPL-REUSE-OBJECTFILE] (RECOMMENDED)**: Hand-rolled dot-path splitting and merging into a synthesized
object. `ObjectFile.addOverride(path, value)` already does this with one set of path and escaping semantics
([`src/object-file.ts`](https://github.com/projen/projen/blob/main/src/object-file.ts)). Up-tier BLOCKING
when the hand-rolled version has a defect from the output-correctness family.

**[IMPL-REUSE-UTIL] (RECOMMENDED)**: New code duplicating a helper in
[`src/util.ts`](https://github.com/projen/projen/blob/main/src/util.ts) or `src/util/`. The common ones:
`deepMerge`, `kebabCaseKeys`, `snakeCaseKeys`, `decamelizeKeysRecursively`, `flattenToDotNotation`,
`dedupArray`, `sorted`, `isTruthy`, `anySelected` / `multipleSelected`, `findUp`. Review of #4889: "We
already have a helper to convert object key casing: `kebabCaseKeys` should do it ... There's a `deepMerge`
that we can use to set defaults." If a needed variant is missing, add it next to its siblings rather than
inline.

**[IMPL-REUSE-SIBLING] (RECOMMENDED)**: Logic copied from another component in the same module. Extract a
shared helper, usually in `src/javascript/util.ts` for the JavaScript module (review of #4655: "seems to be
the same as here ... please extract into a shared helper"). Also flag a new function that re-implements one
the PR's own file already has (review of #4726: "can we use `requireUniqueStepId` here?").

**[IMPL-REUSE-PROJECT-API] (RECOMMENDED)**: A helper that re-implements, or wraps under a misleading name,
an existing `Project` API: `addGitIgnore`, `addPackageIgnore`, `tryFindObjectFile`, `tryFindFile`,
`tasks.tryFind` (review of #4890: "this doesn't do what it says (it's more than exclude from VCS), also
excluding from git already npmignores. Then there is also the generic addPackageIgnore").

## Reuse of upstream

**[IMPL-UPSTREAM-SCHEMA] (RECOMMENDED)**: Option names that differ from the upstream tool's config keys
(`capture.buildCapture` vs the tool's `capture.build`), so each one needs a hand-written mapping. Mirror
the upstream names and convert casing with a helper (review of #4889: "Why do we have different names for
options? ... Unless there's a strong reason not to, I'd generally prefer these automatic approaches."). For
a large option tree, ask
whether a maintained, machine-readable upstream schema exists to generate it from (review of #4877).

**[IMPL-UPSTREAM-PACKAGE] (OPTIONAL)**: A parser or serializer for a standard format written from scratch
when a maintained npm package handles it (review of #4877 pointed at
[`properties-file`](https://www.npmjs.com/package/properties-file)). Ask; weigh it against the cost of a
new bundled dependency. Up-tier RECOMMENDED when the hand-rolled version has an output defect.

## Ownership

**[IMPL-NOT-OURS] (RECOMMENDED)**: projen ships an implementation of something that belongs to the tool or
to a third-party package: a custom snapshot serializer, a compatibility layer emulating another tool, a
re-implementation of a CLI feature. projen then owns its bugs forever. Prefer the tool's default, point
users at an existing package (e.g. via the tool's `import`/plugin option), or document the migration
(review of #4890: "I don't think we want to maintain this implementation ... If not, I'm inclined to say
that we just go with Nodes default format. Users can handle a one-off migration."; "Okay to add a
mini-shim").

## Simplicity

**[IMPL-SIMPLE-OVERBUILT] (RECOMMENDED)**: An algorithm more complex than the problem: multi-pass
normalization where removing disallowed characters suffices, a new object built where the input can be
used, a variable carried that the callee already guarantees (review of #4726: "We can just remove non
allowed chars and then we don't need to collapse or do other complicated stuff."; "do we need to create a
new object here?"; "i don't think `originalId` is needed here?"). Name the simpler version.

**[IMPL-SIMPLE-GROWING-SCRIPT] (RECOMMENDED)**: Further growth of an inline shell or JavaScript script
embedded in a generated workflow or task that is already hard to read and not portable across shells.
Prefer restructuring into simpler steps over adding branches (review of #4904: "I didn't want us to keep
growing this hard to understand, complex and non-portable script further").

**[IMPL-SIMPLE-MISLEADING-NAME] (OPTIONAL)**: A function or variable whose name claims something the code
does not do (review of #4726: "Not really a content hash in the last case").
