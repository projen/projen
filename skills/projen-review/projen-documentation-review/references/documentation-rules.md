# Documentation rules: the lookup

Rows are grouped by family: claims, docblocks, docs site. See the `projen-review-principles` skill for the
shared lookup convention. Inline code comment density is `CONV-COMMENT-DENSITY` in the principles.

## Claims

**[DOC-UNSOURCED-CLAIM] (BLOCKING)**: A docblock, docs page, PR body or code path states a fact that its
source does not support. For an upstream fact (an option, reporter, default, CLI flag, file format rule),
the source is the upstream documentation; for a claim about projen's own behavior ("this does not change
lifecycle bindings", "synthesis already passes the field through"), it is the projen source at the PR
head. Users will configure something that does not exist, and code built on the claim is wrong.
Confident, specific claims with no source are a common failure of AI-assisted PRs (a test reporter the
tool does not document, a behavior other tools "will" adopt). Read the source and ask for it when the PR
gives none; down-tier RECOMMENDED when the claim is only in the PR body.

**[DOC-PROSE-INACCURATE] (RECOMMENDED)**: A `docs/**` sentence that misstates what projen does: which file
is generated, when a workflow runs, which command to use for the project's package manager. Check it
against the source at the PR head and offer a ```` ```suggestion ````.

## Docblocks

**[DOC-DEFAULT] (RECOMMENDED)**: An optional public option without `@default`, or with one that does not
match the code. Use `@default <json value>` for a literal and `@default - <description>` for a computed or
absent default (`@default - no GitHub App credentials used`). Up-tier BLOCKING on a **mandatory** option:
`docs/custom/custom-projects.md` § `@default`: the tag "is used as the initial value in the generated
projenrc for any **mandatory** (non-optional) options" and "The value must be valid JSON and match the
property's primitive type". A wrong value there ships in every `projen new`. For a collection, list the
default entries.

**[DOC-DOCBLOCK-SHAPE] (RECOMMENDED)**: A docblock that does not open with one short sentence followed by
an empty line, or that lists implementation details. Keep it high level: describe what the member is for,
not how it works, and avoid mechanism words like "Wires up".

**[DOC-DOCBLOCK-HISTORY] (RECOMMENDED)**: A docblock that explains what the option replaces or how it came
to be. `AGENTS.md` § Code comments: "No history in comments". The one exception is `@deprecated`, which
names the replacement.

## Docs site

**[DOC-SUBMODULE-README] (RECOMMENDED)**: A new `README.md` under `src/`. projen has no submodule READMEs;
user documentation goes in `docs/`.

**[DOC-PLACEMENT] (RECOMMENDED)**: A new docs page placed outside the section it belongs to, so readers
browsing that section do not find it. Project-type docs go under `docs/project-types/<type>/` with an
`index.md`, and the project type is listed in that section; publishing docs under `docs/publishing/`;
component concepts under `docs/concepts/`; authoring guidance under `docs/custom/`. Up-tier BLOCKING when
the page cannot be reached from the sidebar at all, or a project type's guide sits outside "Project
Types".

**[DOC-GUIDE-MISSING] (RECOMMENDED)**: A user-visible feature that changes how users configure or operate
their project (a new option family, a new project type, new generated behavior) with no update to the
relevant `docs/` guide. The API reference is generated from docblocks; a guide explains when and why to use
the feature. Down-tier OPTIONAL for a single new option whose docblock is self-explanatory.
