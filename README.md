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
  <a href="https://github.com/projen/projen/actions/workflows/build.yml"><img src="https://github.com/projen/projen/workflows/Build/badge.svg" alt="Build badge"></a>
  <a href="https://github.com/projen/projen/actions/workflows/release.yml"><img src="https://github.com/projen/projen/workflows/Release/badge.svg" alt="Release badge"></a>
  <a href="https://github.com/projen/projen/commits/main"><img src="https://img.shields.io/github/commit-activity/w/projen/projen" alt="Commit activity"></a>
</p>

<br/>

*projen* synthesizes project configuration files such as `package.json`,
`tsconfig.json`, `.gitignore`, GitHub Workflows, eslint, jest, etc from a
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

Install the [Projen](https://projen.io/) from npm.

```console
$ npm i -g projen
```

To create a new project, run the following command and follow the instructions:

```console
$ mkdir my-project
$ cd my-project
$ git init
$ npx projen new PROJECT-TYPE
🤖 Synthesizing project...
...
```

### Project types

Currently supported project types (use `npx projen new` without a type for a
full list):

**Built-in:** (run `npx projen new <type>`)

<!-- <macro exec="node ./scripts/readme-projects.js"> -->
* [awscdk-app-java](https://projen.io/api/API.html#projen-awscdk-awscdkjavaapp) - AWS CDK app in Java.
* [awscdk-app-py](https://projen.io/api/API.html#projen-awscdk-awscdkpythonapp) - AWS CDK app in Python.
* [awscdk-app-ts](https://projen.io/api/API.html#projen-awscdk-awscdktypescriptapp) - AWS CDK app in TypeScript.
* [awscdk-construct](https://projen.io/api/API.html#projen-awscdk-awscdkconstructlibrary) - AWS CDK construct library project.
* [cdk8s-app-ts](https://projen.io/api/API.html#projen-cdk8s-cdk8stypescriptapp) - CDK8s app in TypeScript.
* [cdk8s-construct](https://projen.io/api/API.html#projen-cdk8s-constructlibrarycdk8s) - CDK8s construct library project.
* [cdktf-construct](https://projen.io/api/API.html#projen-cdktf-constructlibrarycdktf) - CDKTF construct library project.
* [java](https://projen.io/api/API.html#projen-java-javaproject) - Java project.
* [jsii](https://projen.io/api/API.html#projen-cdk-jsiiproject) - Multi-language jsii library project.
* [nextjs](https://projen.io/api/API.html#projen-web-nextjsproject) - Next.js project without TypeScript.
* [nextjs-ts](https://projen.io/api/API.html#projen-web-nextjstypescriptproject) - Next.js project with TypeScript.
* [node](https://projen.io/api/API.html#projen-javascript-nodeproject) - Node.js project.
* [project](https://projen.io/api/API.html#projen-project) - Base project.
* [python](https://projen.io/api/API.html#projen-python-pythonproject) - Python project.
* [react](https://projen.io/api/API.html#projen-web-reactproject) - React project without TypeScript.
* [react-ts](https://projen.io/api/API.html#projen-web-reacttypescriptproject) - React project with TypeScript.
* [typescript](https://projen.io/api/API.html#projen-typescript-typescriptproject) - TypeScript project.
* [typescript-app](https://projen.io/api/API.html#projen-typescript-typescriptappproject) - TypeScript app.
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

> The files generated by _projen_ are considered an "implementation detail" and
> _projen_ protects them from being manually edited (most files are marked
> read-only, and an "anti tamper" check is configured in the CI build workflow
> to ensure that files are not updated during build).

For example, to setup PyPI publishing in `jsii` projects, you can use
[`python option`](https://github.com/eladb/projen/blob/master/API.md#projen-jsiipythontarget):

```js
const project = new JsiiProject({
  // ...
  python: {
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
  projen test:compile                       compiles the test code
  projen test                               Run tests
  projen build                              Full release build (test+compile)
  projen upgrade-dependencies               upgrade dependencies
  projen upgrade-projen                     upgrade projen
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

Some examples for features built-in to project types:

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

_projen_ takes a "batteries included" approach and aims to offer dozens of different project types out of
the box (we are just getting started). Think `projen new react`, `projen new angular`, `projen new java-maven`,
`projen new awscdk-typescript`, `projen new cdk8s-python` (nothing in projen is tied to javascript or npm!)...

Adding new project types is as simple as submitting a pull request to this repo and exporting a class that
extends `projen.Project` (or one of its derivatives). Projen automatically discovers project types so your
type will immediately be available in `projen new`.

### Projects in external modules

_projen_ is bundled with many project types out of the box, but it can also work
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
Java, TypeScript, or even JSON. Python support is also planned. This is made
possible by the [jsii](https://github.com/aws/jsii) library which allows us
to write APIs once and generate libraries in several languages. You can choose
a different language by passing the `--projenrc-ts`, `--projenrc-java`, or
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

### Virtual Meetup

- Thursday June 30, 2022 
- 1-2pm America/New_York (EDT)
- [CFP](https://bit.ly/3NEc0UQ) a Google Form
- CFP Closes Saturday April 30, 2022
- Hosted on [Zoom](https://zoom.us/j/92399854777?pwd=OUZybHlobHNoZUs1VVordWhaRTVGdz09#success)

## Contributions

Contributions of all kinds are welcome! Check out our [contributor's
guide](./CONTRIBUTING.md) and our [code of conduct](./CODE_OF_CONDUCT.md).

For a quick start, check out a development environment:

```bash
$ git clone git@github.com:projen/projen
$ cd projen
$ yarn
$ yarn watch # compile in the background
```

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-67-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://eladb.github.com/"><img src="https://avatars3.githubusercontent.com/u/598796?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Elad Ben-Israel</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=eladb" title="Code">💻</a></td>
    <td align="center"><a href="https://rybicki.io/"><img src="https://avatars2.githubusercontent.com/u/5008987?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Christopher Rybicki</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=Chriscbr" title="Code">💻</a></td>
    <td align="center"><a href="http://p6m7g8.github.io/"><img src="https://avatars0.githubusercontent.com/u/34295?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Philip M. Gollucci</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=pgollucci" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/hoegertn"><img src="https://avatars2.githubusercontent.com/u/1287829?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Thorsten Hoeger</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=hoegertn" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kcwinner"><img src="https://avatars3.githubusercontent.com/u/2728868?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kenneth Winner</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=kcwinner" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/JordanSinko"><img src="https://avatars2.githubusercontent.com/u/10212966?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jordan Sinko</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=JordanSinko" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/misterjoshua"><img src="https://avatars2.githubusercontent.com/u/644092?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Josh Kellendonk</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=misterjoshua" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/andrestone"><img src="https://avatars1.githubusercontent.com/u/7958086?v=4?s=100" width="100px;" alt=""/><br /><sub><b>andrestone</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=andrestone" title="Code">💻</a></td>
    <td align="center"><a href="https://pallares.io/"><img src="https://avatars3.githubusercontent.com/u/1077520?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cristian Pallarés</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=skyrpex" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jogold"><img src="https://avatars2.githubusercontent.com/u/12623249?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonathan Goldwasser</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=jogold" title="Code">💻</a></td>
    <td align="center"><a href="http://www.matthewbonig.com/"><img src="https://avatars2.githubusercontent.com/u/1559437?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matthew Bonig</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=mbonig" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/pahud"><img src="https://avatars3.githubusercontent.com/u/278432?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pahud Hsieh</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=pahud" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/adamelmore"><img src="https://avatars2.githubusercontent.com/u/2363879?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adam Elmore</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=adamelmore" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/abelmokadem"><img src="https://avatars0.githubusercontent.com/u/9717944?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ash</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=abelmokadem" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/jmourelos"><img src="https://avatars3.githubusercontent.com/u/3878434?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jacob</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=jmourelos" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/bigkraig"><img src="https://avatars1.githubusercontent.com/u/508403?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kraig Amador</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=bigkraig" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mmuller88"><img src="https://avatars0.githubusercontent.com/u/18393842?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Martin Muller</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=mmuller88" title="Code">💻</a></td>
    <td align="center"><a href="https://tlakomy.com/"><img src="https://avatars2.githubusercontent.com/u/16646517?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tomasz Łakomy</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=tlakomy" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/john-tipper"><img src="https://avatars2.githubusercontent.com/u/9730398?v=4?s=100" width="100px;" alt=""/><br /><sub><b>john-tipper</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=john-tipper" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/henrysachs"><img src="https://avatars0.githubusercontent.com/u/17173951?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Henry Sachs</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=henrysachs" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/eganjs"><img src="https://avatars3.githubusercontent.com/u/6639482?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Joseph Egan</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=eganjs" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://skorfmann.com/"><img src="https://avatars1.githubusercontent.com/u/136789?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sebastian Korfmann</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=skorfmann" title="Code">💻</a></td>
    <td align="center"><a href="http://www.callant.net/"><img src="https://avatars1.githubusercontent.com/u/5915843?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bart Callant</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=bartcallant" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/campionfellin"><img src="https://avatars3.githubusercontent.com/u/11984923?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Campion Fellin</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=campionfellin" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/gradybarrett"><img src="https://avatars1.githubusercontent.com/u/1140074?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Grady Barrett</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=gradybarrett" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/HassanMahmud"><img src="https://avatars3.githubusercontent.com/u/58504381?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hassan Mahmud</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=HassanMahmud" title="Code">💻</a></td>
    <td align="center"><a href="https://dk.linkedin.com/in/hassanmahmud93"><img src="https://avatars1.githubusercontent.com/u/7426703?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hassan Mahmud</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=hass123uk" title="Code">💻</a></td>
    <td align="center"><a href="http://joapy.com/"><img src="https://avatars3.githubusercontent.com/u/325306?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jake Pearson</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=jakepearson" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/JeremyJonas"><img src="https://avatars1.githubusercontent.com/u/464119?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeremy Jonas</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=JeremyJonas" title="Code">💻</a></td>
    <td align="center"><a href="https://dev.to/martzcodes"><img src="https://avatars1.githubusercontent.com/u/978362?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matt Martz</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=martzcodes" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/fongie"><img src="https://avatars1.githubusercontent.com/u/19932622?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Max Körlinge</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=fongie" title="Code">💻</a></td>
    <td align="center"><a href="https://blog.neilkuan.dev/"><img src="https://avatars2.githubusercontent.com/u/46012524?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Neil Kuan</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=guan840912" title="Code">💻</a></td>
    <td align="center"><a href="https://dynobase.dev/"><img src="https://avatars3.githubusercontent.com/u/3391616?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rafal Wilinski</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=RafalWilinski" title="Code">💻</a></td>
    <td align="center"><a href="https://keybase.io/romainmuller"><img src="https://avatars2.githubusercontent.com/u/411689?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Romain Marcadier</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=RomainMuller" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/thomasklinger1234"><img src="https://avatars1.githubusercontent.com/u/39558817?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Thomas Klinger</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=thomasklinger1234" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/gwriss"><img src="https://avatars2.githubusercontent.com/u/1842089?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tobias</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=gwriss" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/flyingImer"><img src="https://avatars0.githubusercontent.com/u/1973868?v=4?s=100" width="100px;" alt=""/><br /><sub><b>flyingImer</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=flyingImer" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Hunter-Thompson"><img src="https://avatars.githubusercontent.com/u/20844961?v=4?s=100" width="100px;" alt=""/><br /><sub><b> Aatman </b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=Hunter-Thompson" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mmcculloh-dms"><img src="https://avatars.githubusercontent.com/u/68597641?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mark McCulloh</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=mmcculloh-dms" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/aisamu"><img src="https://avatars.githubusercontent.com/u/431708?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Samuel Tschiedel</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=aisamu" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/iliapolo"><img src="https://avatars.githubusercontent.com/u/1428812?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eli Polonsky</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=iliapolo" title="Code">💻</a></td>
    <td align="center"><a href="https://unsubstantiated.blog/"><img src="https://avatars.githubusercontent.com/u/1308885?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexander Steppke</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=Miradorn" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/kanatti"><img src="https://avatars.githubusercontent.com/u/8623654?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Balagopal Kanattil</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=kanatti" title="Code">💻</a></td>
    <td align="center"><a href="http://twitter.com/bracki"><img src="https://avatars.githubusercontent.com/u/49786?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jan Brauer</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=bracki" title="Code">💻</a></td>
    <td align="center"><a href="https://polothy.github.io/"><img src="https://avatars.githubusercontent.com/u/634657?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mark Nielsen</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=polothy" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/MrArnoldPalmer"><img src="https://avatars.githubusercontent.com/u/7221111?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mitchell Valine</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=MrArnoldPalmer" title="Code">💻</a></td>
    <td align="center"><a href="https://blog.neilkuan.net/"><img src="https://avatars.githubusercontent.com/u/46012524?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Neil Kuan</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=neilkuan" title="Code">💻</a></td>
    <td align="center"><a href="https://garbe.io/"><img src="https://avatars.githubusercontent.com/u/721899?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Philipp Garbe</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=pgarbe" title="Code">💻</a></td>
    <td align="center"><a href="https://selfstructured.com/"><img src="https://avatars.githubusercontent.com/u/361689?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shawn MacIntyre</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=smacintyre" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/tobias-bardino"><img src="https://avatars.githubusercontent.com/u/1842089?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tobias</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=tobias-bardino" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/yglcode"><img src="https://avatars.githubusercontent.com/u/11893614?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yigong Liu</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=yglcode" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/eduardomourar"><img src="https://avatars.githubusercontent.com/u/16357187?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eduardo Rodrigues</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=eduardomourar" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/hassanazharkhan"><img src="https://avatars.githubusercontent.com/u/57677979?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hassan Azhar</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=hassanazharkhan" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/julian-michel-812a223a/"><img src="https://avatars.githubusercontent.com/u/15660169?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Julian Michel</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=jumic" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lmarsden"><img src="https://avatars.githubusercontent.com/u/51232932?v=4?s=100" width="100px;" alt=""/><br /><sub><b>lmarsden</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=lmarsden" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/adrianmace"><img src="https://avatars.githubusercontent.com/u/5071859?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adrian Mace</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=adrianmace" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mKeRix"><img src="https://avatars.githubusercontent.com/u/770596?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Heiko Rothe</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=mKeRix" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/hyandell"><img src="https://avatars.githubusercontent.com/u/477715?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Henri Yandell</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=hyandell" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mwg-rea"><img src="https://avatars.githubusercontent.com/u/82480228?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matthew Gamble</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=mwg-rea" title="Code">💻</a></td>
    <td align="center"><a href="https://willdady.com/"><img src="https://avatars.githubusercontent.com/u/204259?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Will Dady</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=willdady" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/msessa"><img src="https://avatars.githubusercontent.com/u/1912143?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matteo Sessa</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=msessa" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Hi-Fi"><img src="https://avatars.githubusercontent.com/u/1499780?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Juho Saarinen</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=Hi-Fi" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/njlynch"><img src="https://avatars.githubusercontent.com/u/1376292?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nick Lynch</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=njlynch" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://amani.kilumanga.com/"><img src="https://avatars.githubusercontent.com/u/8690282?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Amani Kilumanga</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=dkaksl" title="Code">💻</a></td>
    <td align="center"><a href="http://blog.herlein.com/"><img src="https://avatars.githubusercontent.com/u/173428?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Greg Herlein</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=gherlein" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kaizen3031593"><img src="https://avatars.githubusercontent.com/u/36202692?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kaizen Conroy</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=kaizen3031593" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/saudkhanzada"><img src="https://avatars.githubusercontent.com/u/30137907?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Saud Khanzada</b></sub></a><br /><a href="https://github.com/projen/projen/commits?author=saudkhanzada" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

Distributed under the [Apache-2.0](./LICENSE) license.
