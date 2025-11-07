# Contributing to projen

Thanks for your interest in contributing to projen! :heart:

This document describes how to set up a development environment and submit your
contributions. Please read it carefully and let us know if it's not up-to date
(or even better, submit a pull request with your corrections! :wink:).

## Prerequisites

### Manually install tools

The following tools need to be installed to develop on projen locally.

- [Node]
- [Yarn]
- [Maven]
- [Go]
- [git] >= 2.28

[node]: https://nodejs.org/en/download/
[maven]: https://maven.apache.org/install
[go]: https://go.dev/doc/install
[git]: https://git-scm.com/downloads

## Getting Started

The basic commands to get the repository cloned and built locally follow:

```console
$ git clone git@github.com:projen/projen
$ cd projen
$ npm ci # install dependencies
$ npm run build # build projen
```

Attention Windows users: It has been noted that there are compatibility issues between Git Bash and the Projen build script when running on Windows.
Therefore, we recommend directly utilizing the WSL (Windows Subsystem Linux) terminal to build the Projen project.

## Code Organization

Check out [this recording](https://www.youtube.com/watch?v=8dHwnuSND14) from a walkthrough of the projen codebase.

### Development workflow

The projen package has the following scripts:

- `build` - builds the package and runs all unit tests
- `watch` - watches for file changes and builds them progressively
- `test` - executes all unit tests
- `test:update` - executes all unit tests and overwrites snapshot expectations (those `.snap` files).
- `test:watch` - runs all unit tests and reruns tests when files are changed
- `package` - emits publishable artifacts to `dist`.
- `eslint` - run linter against source code

Each of these scripts can be executed using `npm run <script>` or `npx projen <script>`.

Tests are located under `src/__tests__` and executed from javascript code, so
make sure to compile once before running any tests.

One trick for quickly iterating is to run `npm run watch` in one terminal, and
`npm run test:watch` in another. Then, when you change your unit tests the code
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

First, tell npm to create a link from your local development copy:

```console
$ cd /path/to/local/projen
$ npm link
```

Now, to create new projects:

```console
$ mkdir /my/new/project
$ cd /my/new/project
$ npm link projen
$ alias pj="node_modules/projen/bin/projen"
$ pj new TYPE
$ npm link projen # <-- important to run this again
```

If you already have an existing project and you want to test a new projen
feature against it:

```console
$ cd /my/other/project
$ npm link projen
$ pj
```

From now on, running `pj` in this session will use the local development version of
projen instead of the latest one from npm.

### Version bumping

Currently projen bumps versions automatically thru a GitHub action when a commit
pushed to `main` successfully builds. Projen follows [semantic versioning](https://semver.org/)
through the [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version)
npm utility.

## Making a pull request

- Commit title and message (and PR title and description) must adhere to [conventionalcommits](https://www.conventionalcommits.org).
  - The title must begin with `feat(module): title`, `fix(module): title` or `chore(module): title`, where the module refers
    to the projects or components that the change centers on.
    The module can be omitted, so "feat: title" is okay as well.
  - Title should be lowercase.
  - No period at the end of the title.
- Commit message should describe _motivation_. Think about your code reviewers and what information they need in
  order to understand what you did. If it's a big commit (hopefully not), try to provide some good entry points so
  it will be easier to follow.
- Commit message should indicate which issues are fixed: `fixes #<issue>` or `closes #<issue>`.
- Shout out to collaborators.
- If not obvious (i.e. from unit tests), describe how you verified that your change works.
- If this commit includes breaking changes, they must be listed at the end in the following format (notice how multiple breaking changes should be formatted):

```text
BREAKING CHANGE: Description of what broke and how to achieve this behavior now
* **module-name:** Another breaking change
* **module-name:** Yet another breaking change
```
