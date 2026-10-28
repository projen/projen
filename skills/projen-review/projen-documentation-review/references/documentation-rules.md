# Documentation rules: the lookup

Rows are grouped by family: claims, docblocks, docs site. See the `projen-review-principles` skill for the
shared lookup convention. Inline code comment density is `CONV-COMMENT-DENSITY` in the principles.

## Claims

**[DOC-UNSOURCED-CLAIM] (BLOCKING)**: A docblock, docs page, PR body or code path states an upstream fact
(an option, reporter, default, CLI flag, file format rule) that the upstream documentation does not
support. Users will configure something that does not exist, and code built on the claim is wrong.
Review of #4890: "`stdout` is not a documented reporter here: https://nodejs.org/api/test.html#test-reporters
any source for it?". Review of the #4599 RFC: "Will they though? Probably an AI hallucination." Read the
upstream page; down-tier RECOMMENDED when the claim is only in the PR body.

**[DOC-PROSE-INACCURATE] (RECOMMENDED)**: A `docs/**` sentence that misstates what projen does: which file
is generated, when a workflow runs, which command to use for the project's package manager. Check it
against the source at the PR head and offer a ```` ```suggestion ```` (review of #4714 corrected three such
sentences).

## Docblocks

**[DOC-DEFAULT] (RECOMMENDED)**: An optional public option without `@default`, or with one that does not
match the code (review of #4856: "the default is wrong"). Use `@default <json value>` for a literal and
`@default - <description>` for a computed or absent default ("`@default - no GitHub App credentials
used`"). Up-tier BLOCKING on a **mandatory** option: `docs/custom/custom-projects.md` § `@default`: the tag
"is used as the initial value in the generated projenrc for any **mandatory** (non-optional) options" and
"The value must be valid JSON and match the property's primitive type". A wrong value there ships in every
`projen new`. For a collection, list the default entries (review of #4924: "List the default reporters").

**[DOC-DOCBLOCK-SHAPE] (RECOMMENDED)**: A docblock that does not open with one short sentence, or that lists
implementation details. Review of #4924: "Single short sentence, empty line, more details. don't use terms
like 'Wires up' don't list details, keep high level." Describe what the member is for, not how it works.

**[DOC-DOCBLOCK-HISTORY] (RECOMMENDED)**: A docblock that explains what the option replaces or how it came
to be (review of #4856: "no need to mention what it replaces"; `AGENTS.md` § Code comments: "No history in
comments"). The one exception is `@deprecated`, which names the replacement.

**[DOC-DOCBLOCK-COMMENT-BETWEEN] (OPTIONAL)**: A `//` line comment placed between a docblock and the
declaration it documents (review of #4924: "`//` comments cannot be between docblock and code"). Fold it
into the docblock or drop it.

**[DOC-DOCBLOCK-LINKS] (OPTIONAL)**: An upstream URL pasted into docblock prose. Use `@see <URL>` (review of
#4924: "also you can use `// @see <URL>`").

**[DOC-DOCBLOCK-SIBLING-STYLE] (OPTIONAL)**: A new option documented in a different style from its siblings
in the same interface, e.g. an "Additional config" option whose docblock does not follow the one beside it
(review of #4924: "Use the 'Additional config' style you use for `nodeOptions`").

## Docs site

**[DOC-SUBMODULE-README] (RECOMMENDED)**: A new `README.md` under `src/`. projen has no submodule READMEs;
user documentation goes in `docs/` (review of #4836: "We don't do submodule READMEs. This should move to
the docs.").

**[DOC-PLACEMENT] (RECOMMENDED)**: A new docs page placed outside the section it belongs to, so readers
browsing that section do not find it. Project-type docs go under `docs/project-types/<type>/` with an
`index.md`; publishing docs under `docs/publishing/`; component concepts under `docs/concepts/`; authoring
guidance under `docs/custom/`. Review of #4836 marked a migration guide outside "Project Types" as
blocking and asked for the project type to be listed there. Up-tier BLOCKING when the page cannot be
reached from the sidebar at all.

**[DOC-GUIDE-MISSING] (RECOMMENDED)**: A user-visible feature that changes how users configure or operate
their project (a new option family, a new project type, new generated behavior) with no update to the
relevant `docs/` guide (review of #4726: "Can you also add documentation to the guide please."). The API
reference is generated from docblocks; a guide explains when and why to use the feature. Down-tier
OPTIONAL for a single new option whose docblock is self-explanatory.
