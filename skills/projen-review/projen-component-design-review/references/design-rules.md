# Component design rules: the lookup

Rows are grouped by family: jsii types, component model, public surface and placement, project model
direction, dependencies and lifecycle, options and errors. See the `projen-review-principles` skill for the
shared lookup convention.

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

**[DES-JSII-ENUM-SENTINEL] (RECOMMENDED)**: An enum member with an empty-string value used as a "do not
emit" sentinel, with code comparing against it. It renders oddly in some jsii languages and every new
member means touching the comparison. Give every member a real value and treat "unset" as `undefined`.

## Component model

**[DES-COMP-DATA-HOLDER] (RECOMMENDED)**: A new `Component` (or construct) that does nothing but hold data:
no file, no task, no synthesis hook. It should be a plain struct, or more often an `add*` method on the
component that owns the data (`addReporter`, not a `Reporter` component).

**[DES-COMP-COLLECTION-METHODS] (RECOMMENDED)**: A component exposes a list-valued setting (reporters,
patterns, paths) only as a constructor option. Users composing projects need to change it later. Owe
`add*` and usually `remove*` methods on the component, named after the closest precedent: Jest's
`addTestMatch` / `addIgnorePattern` for test tooling. A set of booleans each enabling one item of an open
set (`reporterSpec: true`, `reporterDot: true`) is the same finding: it wants a list.

**[DES-COMP-UNNEEDED-SPLIT] (RECOMMENDED)**: A feature split into several components or classes when one
would do, or a concern placed in a different component from its siblings (dependency setup outside the
component that owns dependencies). Ask what the split gives the user. Also flag scaffolding copied from an
older sibling project type whose only reason to exist there was legacy.

**[DES-COMP-SCOPE] (RECOMMENDED)**: A new component's constructor takes `project: Project` (or a concrete
project type). Components take `scope: IConstruct` and reach the project via `this.project`, so they can be
nested under any construct. Precedent: the `Component` constructor in `src/component.ts`.

**[DES-COMP-PLUGGABLE-IMPL] (RECOMMENDED)**: A choice between interchangeable implementations (test runner,
script runner) wired as a boolean per implementation or as one bespoke option. Model it as a
`FutureComponent` with static factories named after the implementation (`jest()`, not `useJest()`),
consumed by a single option typed as the interface, so further implementations slot in without new
options. Precedent: `ScriptRunner` in `src/script-runner.ts`, `FutureComponent` in `src/component.ts`.

- **Interface vs concrete (doc-absent detail):** the interface holds only what every implementation
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

**[DES-COMP-LAZY-RENDER] (OPTIONAL)**: An object rendered lazily (a function or getter passed to the file)
when nothing mutates it after construction. Pass the object directly. Up-tier RECOMMENDED when the lazy
path hides state from `add*` methods or overrides.

**[DES-COMP-HARDCODED] (OPTIONAL)**: A value a user plausibly needs to change (a file name, an output
directory) hardcoded with no option. Ask; do not demand.

## Public surface and placement

**[DES-SURF-PRIVATE-HELPERS] (RECOMMENDED)**: An implementation helper exported from the module (and
therefore jsii API). Helpers go in `src/<module>/private/<name>.ts`, which is not exported. Prefer a
module-level helper function over a private method; a helper that is generic (key flattening, case
conversion) goes in a shared private util with its own tests. Precedent: `src/github/private/`,
`src/build/private/`, `src/awscdk/private/`.

**[DES-SURF-INTERNAL-STATE] (RECOMMENDED)**: State other components need is exposed as public or
`@internal` fields and every caller reassembles it. Expose one public method that returns the resolved
value and keep the fields private. A public field that should not be reassigned is a getter over a private
property.

**[DES-SURF-MINIMAL] (RECOMMENDED)**: New public members with no stated consumer. Making something public
later is not breaking; making it private later is. Ask whether it needs to be public.

**[DES-SURF-SUBMODULE] (RECOMMENDED)**: A new third-party tool integration added as a single file in `src/`
root, or as one large file holding several presets. New integrations get their own submodule directory
with one file per concept.

**[DES-SURF-MISLEADING-NAME] (RECOMMENDED)**: A member name that says something the type does not do, or a
member that belongs to a sub-part rather than the type it is on (an `enableGithub` option on a GitHub
repository type). Ask what it means.

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

**[DES-OPT-MUTEX] (RECOMMENDED)**: Two options that cannot be used together, with code that silently
prefers one. `AGENTS.md` § Design guidelines: "throw an error at construction time instead of silently
picking one. Use the established message pattern: `Only one of 'optionA' or 'optionB' may be specified,
not both.`" Up-tier BLOCKING when the ignored option is an authentication or security setting (a token
secret and SSH set together).

- **Owed-but-missing scan (doc-absent detail):** for each new option, list the existing options it overlaps
  (auth methods, alternative formats, a deprecated predecessor) and check a throw exists for each
  incompatible pair, plus a test for it.

**[DES-OPT-ACTIONABLE-ERROR] (RECOMMENDED)**: A new error that says what went wrong but not what to do.
`AGENTS.md` § Design guidelines: "Error messages must tell the user what to do to resolve the problem ...
Name the exact options or values involved and state the required action."
