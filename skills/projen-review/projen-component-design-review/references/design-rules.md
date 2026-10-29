# Component design rules: the lookup

Rows are grouped by family: jsii types, component model, public surface and placement, project model
direction, dependencies and lifecycle, options and errors. See the `projen-review-principles` skill for the
shared lookup convention. Most rows apply a section of
[`DESIGN_GUIDELINES.md`](https://github.com/projen/projen/blob/main/DESIGN_GUIDELINES.md); when a finding
matches one, cite that section in `reference` so the author can read the reasoning.

## jsii types

Every public type must transpile to Python, Java, .NET and Go. Read
[the jsii type system](https://aws.github.io/jsii/specification/2-type-system/) and the
[jsii TypeScript restrictions](https://aws.github.io/jsii/user-guides/lib-author/typescript-restrictions/)
before rating a type finding.

**[DES-JSII-LITERAL-UNION] (BLOCKING)**: A public option or parameter typed with a string or boolean
literal type, or a union containing one (`boolean | "recursive"`). jsii compiles it without an error but
widens each literal to its primitive: `boolean | "recursive"` becomes `boolean | string` in the assembly,
and `"a" | "b"` becomes `string`. Python, Java, .NET and Go users get no constraint at all, so a typo
compiles and synthesizes wrong output. The build does not catch it, so the review must. Use an enum with
one member per state. Re-check after each push: this is easy to fix in one place and miss in another.

- **Verification (doc-absent detail):** compile the type and read `.jsii`: with jsii 5.9,
  `readonly submodules?: boolean | "recursive"` emits
  `{"union":{"types":[{"primitive":"boolean"},{"primitive":"string"}]}}`.

**[DES-JSII-ENUM-LIKE-CLASS] (RECOMMENDED)**: A closed set of choices where each choice carries its own
options, modeled as an interface of booleans or a discriminator string. Use an enum-like class: a
`private constructor` plus one `public static` factory per choice, each taking that choice's options.
Precedent: `TypeScriptRunner.tsNode()` / `.tsx()` / `.nodejs()` in `src/typescript/typescript-runner.ts`.
Where the choices carry no options, an enum and an enum-like class are both fine; do not flag the choice
between them.

**[DES-JSII-ENUM-SENTINEL] (RECOMMENDED)**: An enum member with an empty-string value used as a "do not
emit" sentinel, with code comparing against it. It renders oddly in some jsii languages and every new
member means touching the comparison. Give every member a real value and treat "unset" as `undefined`.

## Component model

**[DES-COMP-DATA-HOLDER] (RECOMMENDED)**: A new `Component` (or construct) that does nothing but hold data:
no file, no task, no synthesis hook. It should be a plain struct, or more often an `add*` method on the
component that owns the data (`addReporter`, not a `Reporter` component).

**[DES-COMP-COLLECTION-METHODS] (RECOMMENDED)**: A component the PR adds models an open list (reporters,
patterns, paths) as a set of booleans, one per item (`reporterSpec: true`, `reporterDot: true`). Users
cannot add an item projen does not know. Model it as a list option with an `add*` method on the
component, named after the closest precedent: Jest's `addTestMatch` / `addIgnorePattern` for test
tooling.

**[DES-COMP-UNNEEDED-SPLIT] (RECOMMENDED)**: A feature split into several components or classes when one
would do, or a concern placed in a different component from its siblings (dependency setup outside the
component that owns dependencies). Name the merge. Also flag scaffolding copied from an older sibling
project type whose only reason to exist there was legacy.

**[DES-COMP-SCOPE] (RECOMMENDED)**: A new component's constructor takes `project: Project` (or a concrete
project type). Components take `scope: IConstruct` and reach the project via `this.project`, so they can be
nested under any construct. Precedent: the `Component` constructor in `src/component.ts`.

**[DES-COMP-PLUGGABLE-IMPL] (RECOMMENDED)**: A choice between interchangeable implementations that projen
already ships or the PR adds (test runners, script runners) wired as a boolean per implementation or as
one bespoke option. Model it as a `FutureComponent` with static factories named after the implementation
(`jest()`, not `useJest()`), consumed by a single option typed as the interface. Precedent: `ScriptRunner`
in `src/script-runner.ts`, `FutureComponent` in `src/component.ts`. Do not ask for this shape for a
single implementation.

- **Interface vs concrete:** the interface holds only what every implementation
  shares; implementation-specific members belong on the class, which implements the interface as needed.
  The project's public property is typed as the interface; inside the implementing class, work with the
  concrete component.

**[DES-COMP-SHARED-BASE] (RECOMMENDED)**: A new shared base class or shared options interface extracted
from one existing implementation (usually Jest) before a second implementation proves the overlap. It
carries legacy behavior into the new one. Design the new implementation on its own, then extract only real
overlap. Prefer per-implementation option interfaces, even if duplicated, so each gets accurate
docblocks.

**[DES-COMP-CROSS-COMPONENT-OPTION] (RECOMMENDED)**: Component A reads a setting owned by component B
through a refactor that couples them, or moves ownership between them. The projen pattern, in order of
preference:
1. give A an explicit option, defaulting from B when not set;
2. expose the value as a property on B that A reads (ties A to B);
3. both, with A's option as override.

**[DES-COMP-WORKFLOW-ANCHOR] (RECOMMENDED)**: A GitHub workflow created or owned by a component that is not
the project or the `GitHub` component. Workflows are anchored to the project, not to components.

## Public surface and placement

**[DES-SURF-PRIVATE-HELPERS] (RECOMMENDED)**: An implementation helper exported from the module (and
therefore jsii API). Helpers go in `src/<module>/private/<name>.ts`, which is not exported. Prefer a
module-level helper function over a private method; a helper that is generic (key flattening, case
conversion) goes in a shared private util with its own tests. Precedent: `src/github/private/`,
`src/build/private/`, `src/awscdk/private/`.

**[DES-SURF-INTERNAL-STATE] (RECOMMENDED)**: State other components need is exposed as public or
`@internal` fields and every caller reassembles it. Expose one public method that returns the resolved
value and keep the fields private. A public field that should not be reassigned is a getter over a private
property. A new method that only returns a private field (`fetchJobs()`) should be a getter
(`get jobs()`); if jsii rejects the name, read the error before accepting a method as the workaround.

**[DES-SURF-MINIMAL] (RECOMMENDED)**: A new public member the PR's own code only uses internally. Making
something public later is not breaking; making it private later is. Ask for it to be private (or
`@internal`) until a caller needs it.

**[DES-SURF-SUBMODULE] (RECOMMENDED)**: A new third-party tool integration added as a single file in `src/`
root, or as one large file holding several presets. New integrations get their own submodule directory
with one file per concept.

**[DES-SURF-MISLEADING-NAME] (RECOMMENDED)**: A member name that says something the type does not do, or a
member that belongs to a sub-part rather than the type it is on (an `enableGithub` option on a GitHub
repository type). Propose a name that says what it does, or the type it belongs on.

## Project model direction

**[DES-MODEL-GITHUBPROJECT] (BLOCKING)**: A new option, property or feature on `GitHubProject`.
`rfcs/repository-tree-root.md` moves this responsibility off `GitHubProject`; new API there must later be
deprecated and migrated. Re-anchor on the `GitHub` component and its options. Moving an existing option
off it with a deprecation is welcome.

**[DES-MODEL-HOST-VS-CICD] (RECOMMENDED)**: Code that adds GitHub Actions workflows (or other CI/CD config)
because the repository is hosted on GitHub. A repository host and a CI/CD provider are separate concerns;
components need an explicit signal that a CI/CD provider is in use.

## Dependencies and lifecycle

**[DES-DEPS-REQUEST] (RECOMMENDED)**: A component adds a dependency it needs with `addDeps` /
`addDevDeps` / `addDependency`, or guards it with its own existence check. Use
`project.deps.requestDependency()` (`src/dependencies.ts`), which merges with a user's existing
declaration and throws on incompatible ranges.

**[DES-LIFECYCLE-CREATION-HOOK] (RECOMMENDED)**: A one-off sample file or setup step done in the
constructor, guarded by a file-exists check. Use the creation hooks in `src/component.ts`:
`projectCreation()` for deterministic one-off file generation, `postProjectCreation()` for one-off setup
the user can disable. Read both docblocks and pick the one that matches.

**[DES-LIFECYCLE-SCRIPT-RUNNER] (RECOMMENDED)**: A component that runs a TypeScript or JavaScript entrypoint
builds the command itself (`ts-node ...`, `npx tsx ...`). Use the `ScriptRunner` / `TypeScriptRunner` API
so users choose the runner once. Do not default a new project to `ts-node`; it does not support
TypeScript 7.

## Options and errors

**[DES-OPT-MUTEX] (RECOMMENDED)**: The PR adds an option that cannot be used together with another option
(an alternative auth method, an alternative format, the deprecated option it replaces), and the code
silently prefers one when both are set. `DESIGN_GUIDELINES.md` § Errors and conflicting options: "throw
at construction time instead of silently picking one. Use the established message: `Only one of 'optionA'
or 'optionB' may be specified, not both.`" Up-tier BLOCKING when the ignored option is an authentication or
security setting (a token secret and SSH set together). Only flag a pair you have shown conflicts by
reading the code that consumes both.

**[DES-OPT-UNNAMED-DEFAULT] (RECOMMENDED)**: Leaving an option unset selects a behavior that no value of
the option can request explicitly. For example, when `runtime` is not set the generated code picks the
latest runtime at deploy time, but no `LambdaRuntime` value asks for that. Users cannot choose the default
on purpose, and the code branches on absence instead of on a value. Add a named value (an enum member or
an enum-like static such as `LambdaRuntime.NODEJS_REGIONAL_LATEST`), make the default that value, and
branch on it.

**[DES-OPT-ACTIONABLE-ERROR] (RECOMMENDED)**: A new error that says what went wrong but not what to do.
`DESIGN_GUIDELINES.md` § Errors and conflicting options: "Error messages tell the user what to do, not only
what went wrong. Name the exact options or values involved and state the required action."
