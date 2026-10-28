# Implementation rules: the lookup

Rows are grouped by family: output correctness, reuse of projen, reuse of upstream, ownership, simplicity.
See the `projen-review-principles` skill for the shared lookup convention.

## Output correctness

**[IMPL-OUT-CLOBBER] (BLOCKING)**: New logic overwrites a value the user or another component set: a
nested assignment that replaces an existing scalar or subtree, an override applied after the user's own
override, a file that fully owns content another tool writes. Example: a hand-rolled dot-path merge where
`target[parts[i]] = {}` turns `"tool.projectKey.foo": "x"` into a wipe of the mandatory `projectKey`. For
files another tool also writes (a CLI that adds providers to its config file), the file must read the
current state and merge, or every CLI change is lost on the next synth.

**[IMPL-OUT-WRONG-VALUE] (BLOCKING)**: The synthesized file, task or workflow is wrong for a reachable
input: arguments passed in the wrong order, a mapping inverted, a key emitted under the wrong name, a
lookup that returns the first match when several can exist (one `post-upgrade` task assumed where there
can be several). Prove it by synthesizing the input and quoting the output.

**[IMPL-OUT-ACCIDENTAL-COERCION] (RECOMMENDED)**: A value type the code was not designed for falls through
to `String(value)` or a template literal and happens to work for one case. Example: arrays become `"a,b"`
only because `Array.prototype.toString` comma-joins, while `[{x:1}]` becomes `[object Object]` and
`[null,"a"]` becomes `",a"`. Handle the type explicitly (`value.join(",")`, throwing on non-scalar
elements) or throw. Up-tier BLOCKING when the coerced value is silently wrong in a file users ship.

**[IMPL-OUT-SILENT-COLLISION] (RECOMMENDED)**: Two inputs that map to the same output key, with the last
write silently winning (`{ "a.b": "1", a: { b: "2" } }` producing two `a.b` entries). Detect and throw, or
document last-wins.

**[IMPL-OUT-SHALLOW-DEFAULTS] (RECOMMENDED)**: Defaults merged with a shallow spread, so a partial nested
option wipes an entire default subtree (`{ coverage: {} }` dropping every default coverage exclusion). Use
`deepMerge` from `src/util.ts`, or document replace semantics loudly in the docblock.

**[IMPL-OUT-DROPPED-INTENT] (RECOMMENDED)**: Code that omits a value the user set explicitly because it
equals today's upstream default. If the upstream default changes, the config no longer says what the user
asked for. Emit what the user set; skip only `undefined`.

## Reuse of projen

**[IMPL-REUSE-OBJECTFILE] (RECOMMENDED)**: Hand-rolled dot-path splitting and merging into a synthesized
object. `ObjectFile.addOverride(path, value)` in `src/object-file.ts` already does this with one set of
path and escaping semantics. Up-tier BLOCKING when the hand-rolled version has a defect from the
output-correctness family.

**[IMPL-REUSE-UTIL] (RECOMMENDED)**: New code duplicating a helper in `src/util.ts` or `src/util/`, for
example key-case conversion or default merging (`kebabCaseKeys`, `snakeCaseKeys`, `deepMerge`). List the
exported functions at the PR head (`rg -n "^export function" src/util.ts src/util/`) rather than relying
on memory. If a needed variant is missing, add it next to its siblings rather than inline.

**[IMPL-REUSE-SIBLING] (RECOMMENDED)**: Logic copied from another component in the same module. Extract a
shared helper, usually in `src/javascript/util.ts` for the JavaScript module. Also flag a new function that
re-implements one the PR's own file already has.

**[IMPL-REUSE-PROJECT-API] (RECOMMENDED)**: A helper that re-implements, or wraps under a misleading name,
an existing `Project`, `Tasks` or `Dependencies` API (ignore files, file lookup, task lookup). Check the
public methods on those classes at the PR head. Note that `addGitIgnore` already excludes the path from the
npm package.

## Reuse of upstream

**[IMPL-UPSTREAM-SCHEMA] (RECOMMENDED)**: Option names that differ from the upstream tool's config keys
(`capture.buildCapture` vs the tool's `capture.build`), so each one needs a hand-written mapping. Mirror
the upstream names and convert casing with a helper; prefer automatic conversion unless there is a strong
reason not to. For a large option tree, ask whether a maintained, machine-readable upstream schema exists
to generate it from.

**[IMPL-UPSTREAM-PACKAGE] (OPTIONAL)**: A parser or serializer for a standard format written from scratch
when a maintained npm package handles it. Ask; weigh it against the cost of a new bundled dependency.
Up-tier RECOMMENDED when the hand-rolled version has an output defect.

## Ownership

**[IMPL-NOT-OURS] (RECOMMENDED)**: projen ships an implementation of something that belongs to the tool or
to a third-party package: a custom snapshot serializer, a compatibility layer emulating another tool, a
re-implementation of a CLI feature. projen then owns its bugs forever. Prefer the tool's default (users can
handle a one-off migration), point users at an existing package (e.g. via the tool's `import`/plugin
option), or document how to set it up. A minimal shim that wires in such a package is fine.

## Simplicity

**[IMPL-SIMPLE-OVERBUILT] (RECOMMENDED)**: An algorithm more complex than the problem: multi-pass
normalization where removing disallowed characters suffices, a new object built where the input can be
used, a variable carried that the callee already guarantees. Name the simpler version.

**[IMPL-SIMPLE-GROWING-SCRIPT] (RECOMMENDED)**: Further growth of an inline shell or JavaScript script
embedded in a generated workflow or task that is already hard to read and not portable across shells.
Prefer restructuring into simpler steps over adding branches.

**[IMPL-SIMPLE-MISLEADING-NAME] (OPTIONAL)**: A function or variable whose name claims something the code
does not do (a "content hash" that is not one in every branch).
