# projen

> A new generation of project generators

*projen* synthesizes project configuration files such as `package.json`, `tsconfig.json`, `.gitignore`, GitHub workflows, eslint, jest, etc from a well-typed definition.

Contrary to templating/scaffolding approaches, *projen* is not a one-off generator. Synthesized configuration is not expected to ever be maunally edited (in fact, projen enforces that). The source of truth is always `.projenrc.js`.

Project types:

* [NodeProject](https://github.com/eladb/projen/blob/master/API.md#projen-nodeproject)
* [TypeScriptLibraryProject](https://github.com/eladb/projen/blob/master/API.md#projen-typescriptlibraryproject)
* [JsiiProject](https://github.com/eladb/projen/blob/master/API.md#projen-jsiiproject)

Features (contributions are welcome!):

* Package.json synthesis
* Standard npm scripts
* ESLint
* Jest
* jsii: compile, package, api compatibility checks, API.md
* Bump & release scripts with CHANGELOG generation based on Conventional Commits
* Automated PR builds
* Automated releases to npm, maven, nuget and pypi
* Mergify configuration
* LICENSE file generation
* gitignore + npmigonre management
* Node "engines" support with coupling to CI build environment and @types/node
* Anti-tamper: CI builds will fail if a synthesized file is modified manually

## Example

To give you a sense of how it works, let's walk through a simple example.

Create a new local git directory:

```shell
$ mkdir my-project && cd my-project
$ git init
```

Create a file `.projenrc.js`:

```js
const { JsiiProject } = require('projen');

const project = new JsiiProject({
  name: 'my-project',
  authorName: 'Joe Schmo',
  authorEmail: 'joe@schno.me',
  repository: 'https://github.com/joe/schmo.git',
});

project.synth();
```

Run:

```shell
npx projen && yarn install
```

From now on, we will refer to this command as `pj` (every time you modify .projenrc.js, just run `pj`):

```shell
alias pj='npx projen && yarn install'
```

What just happened? This command synthesized a jsii project for you with the following features:

* `yarn compile` and `yarn watch`: compile/watch jsii to js
* `yarn eslint`: run eslint
* `yarn test` run eslint and jest tests with coverage
* `yarn run package`: `jsii-pacmak`
* `yarn build`: `compile` + `test` + `package` 
* Automatically generates `API.md` with reference docs after compilation (also `yarn docgen`).
* `yarn bump` bumps the module version and creates a CHANGELOG entry. `yarn release` will bump and push with tags to `master`.
* `yarn projen` runs `projen` followed by `yarn install` (good for updating dependencies)
* PR builds: a GitHub workflow which auto-builds PR branches
* Releases: a GitHub workflow which builds all commits to `master` and releases new versions to all package managers (default is only npm)
* `.gitignore` and `.npmignore` are set up to commit only files that must exist in the repo (for example, by default `package.json` is *ignored*).
* `.mergify.yml` will auto-merge approved PRs that pass PR builds
* `LICENSE` defaults to `Apache-2.0`
* CI builds also include an "anti tamper" check to verify no files where changed during build. This ensures that generated-committed files (such as `API.md` and the GitHub workflows) have not been chaged out-of-band up-to-date.

The [`JsiiProject`](https://github.com/eladb/projen/blob/master/API.md#projen-jsiiproject) class has a rich API that can be used to configure these features (submit a PR if you are missing a degree of freedom). 

Now, let's add a python target. Edit `.projenrc.js` and add a `python` section:

```ts
const { JsiiProject } = require('../../lib');

const project = new JsiiProject({
  name: 'my-project',
  authorName: 'Joe Schmo',
  authorEmail: 'joe@schno.me',
  repository: 'https://github.com/joe/schmo.git',
  
  // add this:
  python: {
    distName: 'my-python-dist-name',
    module: 'my_python_module'
  }
});

project.synth();
```

And re-run:

```shell
pj
```

And this will be added:

* The `jsii` section in your `package.json` file will now have a `python` entry.
* The `release.yml` github workflow will include a release job that will release your module to PyPI.

## Should I Commit Synthesized Files?

Yes, you should commit those files. Although most files don't *have* to be
committed, there is value in being able to review any changes to these files
when you upgrade **projen** itself (`yarn projen:upgrade`).

Since projen installs an "anti-tamper" check in your CI builds, if these files
are manually modified, your CI build will fail.

## API Reference

See [API Reference](./API.md) for API details.

### JsiiProject

#### Directory structure

* `src/` - `.ts` files, after compilation they will go under `lib/`.
* `test/` - `.ts` files for jest tests. Those will not be included in your npm module.
* `bin/` - CLI executables (not .ts files!). See details below on how to define CLIs.

#### Testing

**jest** is used for unit tests. Write your unit test files under `test/` so they won't be
included in the npm module.

IMPORTANT: your test code should reference your library code through `src` and
not through `lib`. To enforce that we will delete `lib/` before running your
tests.

The recommended workflow for TDD is to:

1. Checkout the repo
2. Run `yarn install`
3. Run `yarn test:watch`

That's it. You don't need to compile in order to run your tests because
`ts-jest` takes care of compiling your code for you and `test:watch` will
continuously watch your code for changes.

#### Executables/CLIs (`bin`)

You should create executable scripts under `bin/`, but **do not** include
typescript files there. Those must be under `src/` or otherwise they won't be
compiled and included in your output module.

Let's walk through a simple example. Say my CLI should be called `mycli`:

1. Create a file `lib/mycli.ts` with the actual code of the CLI. No need to export this file from your `index.ts` file.
2. Create a file `bin/mycli` with the following content:

    ```js
    #!/usr/bin/env node
    require('../lib/mycli.js');
    ```

That's it. projen will auto-detect `bin/mycli` and will add it to your
`package.json` under the `bin` section. You can disable this behavior by setting
`autoDetectBin: false`.








## Contributing

Contributions of all kinds are welcome!

To check out a development environment:

```bash
$ git clone git@github.com:eladb/projen
$ cd projen
$ yarn boostrap # special boostrapping because projen uses itself
```

## License

Distributed under the [Apache-2.0](./LICENSE) license.
