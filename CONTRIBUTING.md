# Contributing to projen

Thanks for your interest in contributing to projen! :heart:

This document describes how to set up a development environment and submit your
contributions. Please read it carefully and let us know if it's not up-to date
(or even better, submit a pull request with your corrections! :wink:).

## Pre-requisites

### Manually install tools

The following tools need to be installed to develop on projen locally.

- [Node]
- [Yarn]

[Node]: https://nodejs.org/en/download/
[Yarn]: https://yarnpkg.com/en/docs/install

## Getting Started

The basic commands to get the repository cloned and built locally follow:

```console
$ git clone git@github.com:projen/projen
$ cd projen
$ yarn # install dependencies
$ yarn build # build projen
```

### Development workflow

The projen package has the following scripts:

- `build` - builds the package and runs all unit tests
- `watch` - watches for file changes and builds them progressively
- `test` - executes all unit tests
- `test:update` - executes all unit tests and overwrites snapshot expectations (those `.snap` files).
- `test:watch` - runs all unit tests and reruns tests when files are changed
- `package` - emits publishable artifacts to `dist`.
- `eslint` - run linter against source code

Each of these scripts can be executed using `yarn <script>` or `npx projen <script>`.

Tests are located under `src/__tests__` and executed from javascript code, so
make sure to compile once before running any tests.

One trick for quickly iterating is to run `yarn watch` in one terminal, and
`yarn test:watch` in another. Then, when you change your unit tests the code
will automatically recompile, thus triggering the tests to automatically re-run.

#### Linting & Formatting

Eslint is used to lint and format our typescript code. The `eslint`
script can be run from the root of the package.

You can integrate the linting and formatting workflow with your editor or ide by
installing the approporiate eslint plugin. For example, when using Visual Studio
Code, the [eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
exposes a number of options including "fix on save". This will auto correct lint
and formatting errors whenever possible while saving a document.

### Testing against local projects

When your local version of projen builds successfully, you can test it to create
a new project by going into another directory and invoking the binary directly:

```console
$ pwd
/path/to/projen
$ cd ..
$ mkdir testing
$ cd testing
$ ../projen/bin/projen new <project-type>
```

Running `npx projen` in an existing projen-based project will by default run the
version of projen that is installed by npm, so to override this and synthesize
using your locally built projen, run:

```console
$ pwd
/path/to/root/of/some/project
$ rm -rf node_modules/projen && ../path/to/projen/bin/projen
Synthesizing project ...
...
```

### Version bumping

Currently projen bumps versions automatically thru a GitHub action when a commit
pushed to master successfully builds. Projen follows [semantic versioning](https://semver.org/)
through the [standard-version](https://github.com/conventional-changelog/standard-version)
npm utility.

## Making a pull request

* Commit title and message (and PR title and description) must adhere to [conventionalcommits](https://www.conventionalcommits.org).
  * The title must begin with `feat(module): title`, `fix(module): title`,
  `refactor(module): title` or `chore(module): title`, where the module refers
  to the projects or components that the change centers on.
  The module can be omitted, so "feat: title" is okay as well.
  * Title should be lowercase.
  * No period at the end of the title.
* Commit message should describe _motivation_. Think about your code reviewers and what information they need in
  order to understand what you did. If it's a big commit (hopefully not), try to provide some good entry points so
  it will be easier to follow.
* Commit message should indicate which issues are fixed: `fixes #<issue>` or `closes #<issue>`.
* Shout out to collaborators.
* If not obvious (i.e. from unit tests), describe how you verified that your change works.
* If this commit includes breaking changes, they must be listed at the end in the following format (notice how multiple breaking changes should be formatted):

```
BREAKING CHANGE: Description of what broke and how to achieve this behavior now
* **module-name:** Another breaking change
* **module-name:** Yet another breaking change
```
