<p align="center">
  <a href="https://projen.io">
    <img src="https://raw.githubusercontent.com/projen/projen/main/logo/projen.svg">
    <h3 align="center">projen</h3>
  </a>
</p>

<p align="center">
  Define and maintain complex project configuration through code.
</p>

<p align="center">
  <a href="https://projen.io/"><strong>Documentation</strong></a> ·
  <a href="https://github.com/projen/projen/releases"><strong>Changelog</strong></a> ·
  <a href="#project-types"><strong>Project types</strong></a> ·
  <a href="#community"><strong>Join the community</strong></a>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg" alt="Apache 2.0 License"></a>
  <a href="https://gitpod.io/#https://github.com/projen/projen"><img src="https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod" alt="Gitpod ready-to-code"></a>
  <a href="https://github.com/projen/projen/actions/workflows/release.yml"><img src="https://github.com/projen/projen/actions/workflows/release.yml/badge.svg" alt="Release badge"></a>
  <a href="https://github.com/projen/projen/commits/main"><img src="https://img.shields.io/github/commit-activity/w/projen/projen" alt="Commit activity"></a>
</p>

<br/>

*projen* synthesizes project configuration files such as `package.json`,
`tsconfig.json`, `.gitignore`, GitHub Workflows, eslint, jest, etc. from a
well-typed definition written in JavaScript.

As opposed to existing templating/scaffolding tools, *projen* is not a one-off
generator. Synthesized files should never be manually edited (in fact, projen
enforces that). To modify your project setup, users interact with rich
strongly-typed class and execute `projen` to update their project configuration
files.

By defining a custom project type and using projen in multiple repositories, it's
possible to update configuration files and CI/CD workflows across dozens (or
hundreds!?) of projects.

Check out [this talk](https://youtu.be/SOWMPzXtTCw) about projen from its creator.

## Getting Started

*projen* doesn't need to be installed. You will be using [npx](https://docs.npmjs.com/cli/v7/commands/npx) to run *projen* which takes care of all required setup steps.

To create a new project, run the following command and follow the instructions:

```console
$ mkdir my-project
$ cd my-project
$ npx projen new PROJECT-TYPE
🤖 Synthesizing project...
...
```

### Project types

Currently supported project types (use `npx projen new` without a type for a
full list):

**Built-in:** (run `npx projen new <type>`)

<!-- <macro exec="node ./scripts/readme-projects.js"> -->
* [awscdk-app-java](https://projen.io/docs/api/awscdk#awscdkjavaapp-) - AWS CDK app in Java.
* [awscdk-app-py](https://projen.io/docs/api/awscdk#awscdkpythonapp-) - AWS CDK app in Python.
* [awscdk-app-ts](https://projen.io/docs/api/awscdk#awscdktypescriptapp-) - AWS CDK app in TypeScript.
* [awscdk-construct](https://projen.io/docs/api/awscdk#awscdkconstructlibrary-) - AWS CDK construct library project.
* [cdk8s-app-py](https://projen.io/docs/api/cdk8s#cdk8spythonapp-) - CDK8s app in Python.
* [cdk8s-app-ts](https://projen.io/docs/api/cdk8s#cdk8stypescriptapp-) - CDK8s app in TypeScript.
* [cdk8s-construct](https://projen.io/docs/api/cdk8s#constructlibrarycdk8s-) - CDK8s construct library project.
* [cdktf-construct](https://projen.io/docs/api/cdktf#constructlibrarycdktf-) - CDKTF construct library project.
* [java](https://projen.io/docs/api/java#javaproject-) - Java project.
* [jsii](https://projen.io/docs/api/cdk#jsiiproject-) - Multi-language jsii library project.
* [nextjs](https://projen.io/docs/api/web#nextjsproject-) - Next.js project using JavaScript.
* [nextjs-ts](https://projen.io/docs/api/web#nextjstypescriptproject-) - Next.js project using TypeScript.
* [node](https://projen.io/docs/api/javascript#nodeproject-) - Node.js project.
* [project](https://projen.io/docs/api/projen#project-) - Base project.
* [python](https://projen.io/docs/api/python#pythonproject-) - Python project.
* [react](https://projen.io/docs/api/web#reactproject-) - React project using JavaScript.
* [react-ts](https://projen.io/docs/api/web#reacttypescriptproject-) - React project using TypeScript.
* [typescript](https://projen.io/docs/api/typescript#typescriptproject-) - TypeScript project.
* [typescript-app](https://projen.io/docs/api/typescript#typescriptappproject-) - TypeScript app.
<!-- </macro> -->

**External:** (run `npx projen new --from <type>`)

* [projen-github-action-typescript](https://github.com/projen/projen-github-action-typescript/blob/main/API.md) - GitHub Action in TypeScript project.

> Use `npx projen new PROJECT-TYPE --help` to view a list of command line
> switches that allows you to specify most project options during bootstrapping.
> For example: `npx projen new jsii --author-name "Jerry Berry"`.

The `new` command will create a `.projenrc.js` file which looks like this for
`jsii` projects:

```js
const { JsiiProject } = require('projen');

const project = new JsiiProject({
  authorAddress: "elad.benisrael@gmail.com",
  authorName: "Elad Ben-Israel",
  name: "foobar",
  repository: "https://github.com/eladn/foobar.git",
});

project.synth();
```

This program instantiates the project type with minimal setup, and then calls
`synth()` to synthesize the project files. By default, the `new` command will
also execute this program, which will result in a fully working project.

Once your project is created, you can configure your project by editing
`.projenrc.js` and re-running `npx projen` to synthesize again.

> The files generated by *projen* are considered an "implementation detail" and
> *projen* protects them from being manually edited (most files are marked
> read-only, and an "anti tamper" check is configured in the CI build workflow
> to ensure that files are not updated during build).

For example, to setup PyPI publishing in `jsii` projects, you can use
[`publishToPypi option`](https://projen.io/publisher.html):

```js
const project = new JsiiProject({
  // ...
  publishToPypi: {
    distName: "mydist",
    module: "my_module",
  }
});
```

Run:

```shell
npx projen
```

And you'll notice that your `package.json` file now contains a `python` section in
its `jsii` config and the GitHub `release.yml` workflow includes a PyPI
publishing step.

We recommend to put this in your shell profile, so you can simply run `pj` every
time you update `.projenrc.js`:

```bash
alias pj='npx projen'
```

Most projects come with an assortment of **tasks** that handle various
development activities, from compiling to publishing. Tasks can be and composed
together, and can be run as local commands or turned into GitHub workflows. You
can list all tasks with `npx projen --help`:

```shell
$ npx projen --help
projen [command]

Commands:
  projen new [PROJECT-TYPE-NAME] [OPTIONS]  Creates a new projen project
  projen clobber                            hard resets to HEAD of origin and cleans the local repo
  projen compile                            Only compile
  projen test                               Run tests
  projen build                              Full release build (test+compile)
  projen upgrade                            upgrade dependencies (including projen)
...
```

The `build` task is the same task that's executed in your CI builds. It
typically compiles, lints, tests and packages your module for distribution.

### Shell Completions

If installed as a global package, `projen` includes rich shell tab-completion support. To enable this in your shell, run:

```shell
# Bash
projen completion >> ~/.bashrc

# ZSH
projen completion >> ~/.zshrc
```

## Features

Some examples of features built-in to project types:

* Fully synthesize `package.json`
* Standard npm scripts like `compile`, `build`, `test`, `package`
* eslint
* Jest
* jsii: compile, package, api compatibility checks, API.md
* Bump & release scripts with CHANGELOG generation based on conventional commits
* Automated PR builds
* Automated releases to npm, maven, NuGet and PyPI
* Automated dependency upgrades
* Mergify configuration
* LICENSE file generation
* gitignore + npmignore management
* Node "engines" support with coupling to CI build environment and @types/node
* Anti-tamper: CI builds will fail if a synthesized file is modified manually

## Documentation

For documentation including examples and a full API reference, visit <https://projen.io/>.

## Ecosystem

*projen* takes a "batteries included" approach and aims to offer dozens of different project types out of
the box (we are just getting started). Think `projen new react`, `projen new angular`, `projen new java-maven`,
`projen new awscdk-typescript`, `projen new cdk8s-python` (nothing in projen is tied to javascript or npm!)...

Adding new project types is as simple as submitting a pull request to this repo and exporting a class that
extends `projen.Project` (or one of its derivatives). Projen automatically discovers project types so your
type will immediately be available in `projen new`.

### Projects in external modules

*projen* is bundled with many project types out of the box, but it can also work
with project types and components defined in external jsii modules (the reason
we need jsii is because projen uses the jsii metadata to discover project types
& options in projen new).

Say we have a module in npm called `projen-vuejs` which includes a single project
type for vue.js:

```bash
$ npx projen new --from projen-vuejs
```

If the referenced module includes multiple project types, the type is required.
Switches can also be used to specify initial values based on the project type
APIs. You can also use any package syntax supported by [yarn
add](https://classic.yarnpkg.com/en/docs/cli/add#toc-adding-dependencies) like
`projen-vuejs@1.2.3`, `file:/path/to/local/folder`,
`git@github.com/awesome/projen-vuejs#1.2.3`, etc.

```bash
$ npx projen new --from projen-vuejs@^2 vuejs-ts --description "my awesome vue project"
```

Under the hood, `projen new` will install the `projen-vuejs` module from npm
(version 2.0.0 and above), discover the project types in it and bootstrap the
`vuejs-ts` project type. It will assign the value `"my awesome vue project"` to
the `description` field. If you examine your `.projenrc.js` file, you'll see
that `projen-vuejs` is defined as a dev dependency:

```javascript
const { VueJsProject } = require('projen-vuejs');

const project = new VueJsProject({
  name: 'my-vuejs-sample',
  description: "my awesome vue project",
  // ...
  devDeps: [
    'projen-vuejs'
  ]
});

project.synth();
```

## Roadmap

See [Vision](./VISION.md).

## FAQ

### Do I have to write my configuration in JavaScript?

Not at all! JavaScript is the default, but it's also possible to write it in
Java, Python, TypeScript, or even JSON. This is made
possible by the [jsii](https://github.com/aws/jsii) library which allows us
to write APIs once and generate libraries in several languages. You can choose
a different language by passing the `--projenrc-ts`, `--projenrc-py`, `--projenrc-java`, or
`--projenrc-json` flags when running `projen new`.

Note: using a `.projenrc.json` file to specify configuration only allows
accessing a subset of the entire API - the options which are passed to the
constructor of each project type.

### How does projen work with my IDE?

projen has an unofficial [VS Code extension]. Check it out!

[VS Code extension]: https://marketplace.visualstudio.com/items?itemName=MarkMcCulloh.vscode-projen

## Community

The projen community can be found within the #projen channel in the [cdk.dev]
community Slack workspace.

[cdk.dev]: https://cdk.dev/

## Contributions

Contributions of all kinds are welcome! Check out our [contributor's
guide](./CONTRIBUTING.md) and our [code of conduct](./CODE_OF_CONDUCT.md).

For a quick start, check out a development environment:

```bash
$ git clone git@github.com:projen/projen
$ cd projen
$ npm ci
$ npm run watch # compile in the background
```

### Contributors

Thanks goes to [our wonderful contributors](https://github.com/projen/projen/graphs/contributors)!

## License

Distributed under the [Apache-2.0](./LICENSE) license.
