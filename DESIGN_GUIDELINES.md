# Design Guidelines

These guidelines describe how we design components, project types and options in projen. They are for
anyone adding to projen and for reviewers judging a change. They are not rules for their own sake: each
one has a reason, and when a change has a better reason to do something else, explain it in the pull
request.

Keep one thing in mind while reading. projen's output is other people's repositories. Every upgrade
re-synthesizes `package.json`, `tsconfig.json`, the GitHub workflows and every other managed file in every
project that uses projen. A small design decision in projen is repeated in all of them, and an API we
publish is one we support for a long time. Most of what follows comes from that.

How a change affects existing projects is covered in [Compatibility](./CONTRIBUTING.md#compatibility) in
`CONTRIBUTING.md`.

## Components

A component is the unit projen composes projects from. It earns its place by doing something during
synthesis: it owns a file, adds a task, or hooks into the lifecycle (`preSynthesize`, `postSynthesize`,
`projectCreation`, `postProjectCreation` in `src/component.ts`). A class that only holds data is not a
component. Make it a plain struct, or more often an `add*` method on the component that owns the data:
Jest has `addReporter`, not a `Reporter` component.

Components take `scope: IConstruct` and reach the project through `this.project`. A constructor typed
`project: Project`, or a concrete project type, prevents the component from being nested under anything
else.

When a component manages an open list (test patterns, reporters, paths), model it as a list option plus
an `add*` method. A set of booleans with one per item (`reporterSpec: true`, `reporterDot: true`) means
users cannot add an item projen does not know about. Name the methods after the closest existing
component, for example `addTestMatch` and `addIgnorePattern` on Jest.

Keep a feature in as few components as it needs, and put each concern where its siblings live. If
dependency setup for a tool sits outside the component that owns the tool's dependencies, readers have to
look in two places. When you start from an older sibling project type, do not copy scaffolding that only
exists there for historical reasons.

### Interchangeable implementations

When projen offers a choice between implementations of the same role (script runners, test runners),
model the role as an interface and each implementation as a `FutureComponent` with a static factory
named after the implementation. The project takes a single option typed as the interface.
`TypeScriptRunner.tsNode()`, `.tsx()` and `.nodejs()` in `src/typescript/typescript-runner.ts`, built on
`ScriptRunner` in `src/script-runner.ts`, are the reference. Name factories after the thing (`tsx()`),
not the action (`useTsx()`).

The interface holds only what every implementation shares. Members specific to one implementation belong
on its class. Do not extract a shared base class or a shared options interface from the first
implementation before a second one proves the overlap; doing so carries the first implementation's
legacy into the second. Design the new implementation on its own, then extract what they really share.
Separate options interfaces, even when partly duplicated, also give each implementation accurate
docblocks. For a single implementation, none of this applies: a plain component is fine.

### Settings that belong to another component

Sometimes component A needs a value owned by component B. In order of preference:

1. Give A its own option, defaulting from B when it is not set.
2. Expose the value as a property on B that A reads. This ties A to B.
3. Both, with A's option as the override.

Avoid moving ownership of the setting between components, and avoid refactors that couple the two just
to share one value.

### Workflows

GitHub workflows are anchored to the project or to the `GitHub` component, not to other components. A
component that needs a workflow creates it through that component, `GitHub.of(project)?.addWorkflow(name)`,
and does not own it itself.

## Types that work in every language

Every public type is compiled by [jsii](https://aws.github.io/jsii/) to Python, Java, .NET and Go. Some
TypeScript types compile without an error but lose their meaning on the way. Read the
[jsii TypeScript restrictions](https://aws.github.io/jsii/user-guides/lib-author/typescript-restrictions/)
before designing a public type.

- **No literal types or literal unions.** jsii widens each literal to its primitive, so
  `boolean | "recursive"` becomes `boolean | string` and `"a" | "b"` becomes `string`. Users in other
  languages get no type check at all, and a typo compiles and synthesizes the wrong output. The build
  does not catch this. Use an enum with one member per state.
- **Enum-like classes for choices that carry options.** When each choice has its own options, use a
  class with a `private constructor` and one `public static` factory per choice, each taking that
  choice's options. `TypeScriptRunner` is an example. When the choices carry no options, an enum and an
  enum-like class are both fine.
- **Every enum member has a real value.** An empty-string member used as "do not emit" renders oddly in
  some languages, and every new member means touching the comparison. Represent "unset" as `undefined`.

## Options

### Name the default

When leaving an option unset selects a behavior that no value of the option can select, users cannot ask
for the default on purpose, and the code branches on absence instead of on a value. Give the default a
name: an enum member or an enum-like static such as `LambdaRuntime.NODEJS_REGIONAL_LATEST`. Make the
default that value and branch on it. Users can then set it explicitly, and the API reference shows it as
a choice.

### Errors and conflicting options

Error messages tell the user what to do, not only what went wrong. Name the exact options or values
involved and state the required action.

When two options cannot be used together, throw at construction time instead of silently picking one.
Use the established message: `Only one of 'optionA' or 'optionB' may be specified, not both.` This
matters most for authentication and security settings, where silently ignoring one option leaves a user
with a configuration they did not choose.

### Emit what the user set

When a user sets a value explicitly, write it to the config file, even when it equals today's upstream
default. If the upstream default changes later, the file should still say what the user asked for. Only
skip `undefined`.

Option names for a tool's configuration mirror that tool's own config keys. A projen option called
`capture.buildCapture` for a tool key `capture.build` needs a hand-written mapping, and users cannot use
the tool's documentation. Convert casing with a helper instead (see [Reuse](#reuse-what-projen-already-has)).

## Public surface

Making a member public later is not a breaking change; making it private later is. So keep the public
surface as small as the feature needs.

- A member the PR's own code only uses internally stays private (or `@internal`) until a caller needs
  it.
- Implementation helpers go in `src/<module>/private/<name>.ts`, which is not exported and therefore not
  part of the jsii API. Prefer a module-level function over a private method. A generic helper (key
  flattening, case conversion) goes in a shared private util with its own tests.
- When other components need state, expose one method that returns the resolved value and keep the
  fields private, instead of public fields every caller has to reassemble.
- A field that should not be reassigned is a getter over a private property. A method that only returns
  a private field (`fetchJobs()`) should be a getter (`get jobs()`).
- A new integration with a third-party tool gets its own submodule directory, with one file per concept,
  rather than a single file in `src/`.
- A name says what the member does and sits on the type it belongs to. An `enableGithub` option on a
  GitHub repository type, for example, belongs on a sub-part.

## Where the project model is going

[`rfcs/repository-tree-root.md`](./rfcs/repository-tree-root.md) moves responsibilities off
`GitHubProject`. New options, properties and features do not go on `GitHubProject`, because they would
have to be deprecated and migrated again. Anchor them on the `GitHub` component and its options instead.
Moving an existing option off `GitHubProject`, with a deprecation, is welcome.

Hosting a repository on GitHub and using GitHub Actions for CI/CD are separate concerns. A component that
adds workflows needs an explicit signal that GitHub Actions is in use, not just that the repository lives
on GitHub.

## Reuse what projen already has

Much of what a new component needs already exists. Using it keeps behavior consistent and keeps the bugs
in one place.

| Need | Use |
|---|---|
| Set a nested key in a synthesized object | `ObjectFile.addOverride(path, value)` in `src/object-file.ts` |
| Merge defaults with user options | `deepMerge` in `src/util.ts`, not a shallow spread, which wipes nested defaults |
| Convert key casing for a tool's config | `kebabCaseKeys`, `snakeCaseKeys` and siblings in `src/util.ts` |
| Add a dependency a component needs | `project.deps.requestDependency()` in `src/dependencies.ts`, which merges with the user's own declaration and throws on incompatible ranges |
| Run a TypeScript or JavaScript entrypoint | `ScriptRunner` / `TypeScriptRunner`, so users choose the runner once. New projects should not default to `ts-node`, which does not support TypeScript 7 |
| Create a sample file or do one-off setup | `projectCreation()` for deterministic one-off files, `postProjectCreation()` for setup users can disable, both in `src/component.ts`. Not a constructor guarded by a file-exists check |
| Ignore files | `project.addGitIgnore` and `project.addPackageIgnore`. `addGitIgnore` already excludes the path from the npm package |
| Logic another component in the module already has | A shared helper, for example in `src/javascript/util.ts`, instead of a copy |

If a helper you need is missing, add it next to its siblings rather than inline.

### Do not own what belongs to the tool

When projen ships its own version of something that belongs to the tool it configures (a custom snapshot
serializer, a layer emulating another tool, a re-implementation of a CLI feature, a parser for a standard
format), projen owns its bugs for good. Prefer the tool's own default, even if users have a one-off
migration. Otherwise point users at a maintained package (for example through the tool's plugin or
`import` option), or document the setup. A small shim that wires such a package in is fine. Weigh a new
package against the cost of a new bundled dependency.

## Correct output

A component must not overwrite what users or other components set. A nested assignment that replaces an
existing subtree, or an override applied after the user's own override, silently drops their settings.

Some files are written by both projen and the tool itself, such as a config file the tool's CLI adds
entries to. A component that fully owns such a file wipes every change the CLI made on the next synth.
It needs to read the current file and merge.

Before claiming a change is correct, synthesize it (`Testing.synth(project)` in a test) and read the
file it produces.

## Keep it simple

Prefer the simplest code that solves the problem: remove disallowed characters instead of a multi-pass
normalization, use the input instead of building a new object, render an object directly instead of
lazily when nothing changes it after construction.

Two cases come up often enough to name:

- **A condition that is wrong for some inputs.** Before correcting a version check or a heuristic, ask
  whether it needs to exist. A check that keeps a fix away from tool versions old enough to stop
  supporting is better removed than made more accurate.
- **A hand-rolled standard algorithm.** When code implements a standard by hand (UUID version bits, a
  hashing or encoding scheme), check what the consumer of the value actually needs. If it only needs an
  opaque, stable string, use the simplest value that meets that. If it does need the standard, use a
  maintained package.

Inline shell or JavaScript embedded in a generated workflow or task is hard to read and not portable
across shells. Restructure it into simpler steps rather than adding more branches.
