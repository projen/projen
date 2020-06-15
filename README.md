# projen

> A new generation of project generators

*projen* synthesizes project configuration files such as `package.json`, `tsconfig.json`, `.gitignore`, GitHub workflows, eslint, jest, etc from a well-typed definition.

Supported project types (API reference):

* [Project](https://github.com/eladb/projen/blob/master/API.md#projen-project)
* [NodeProject](https://github.com/eladb/projen/blob/master/API.md#projen-nodeproject)
* [TypeScriptLibraryProject](https://github.com/eladb/projen/blob/master/API.md#projen-typescriptlibraryproject)

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
  authorEmail: 'joe@schno.me'
});

project.synth();
```

Run:

```shell
npx projen && yarn install
```

From now on, we will refer to this command as `pj`:

```shell
alias pj='npx projen && yarn install'
```

This will synthesize a jsii project with the following behavior:

* `yarn compile` and `yarn watch`: compile/watch jsii to js
* `yarn eslint`: run eslint
* `yarn test` run eslint and jest tests with coverage
* `yarn run package`: `jsii-pacmak`
* `yarn build`: `compile` + `test` + `package` 
* Automatically generates `API.md` with reference docs after compilation (also `yarn docgen`).
* `yarn bump` bumps the module version and creates a CHANGELOG entry. `yarn release` will bump and push with tags to `master`.
* `yarn projen` runs `projen` followed by `yarn install` (good for updating dependencies)
* `.github/workflows/build.yml`: auto-builds PR branches
* `.github/workflows/release.yml`: builds all commits to `master` and releases new versions to all package managers (default is only npm)
* `.gitignore` and `.npmignore` are set up to commit only files that must exist in the repo (for example, by default `package.json` is *ignored*).
* `.mergify.yml` will auto-merge approved PRs that pass PR builds
* `LICENSE` defaults to `Apache-2.0`
* CI builds also include an "anti tamper" check to verify no files where changed during build. This ensures that generated-committed files (such as `API.md` and the GitHub workflows) have not been chaged out-of-band up-to-date.

The [`JsiiProject`](https://github.com/eladb/projen/blob/master/API.md#projen-jsiiproject) class has a rich API that can be used to configure these features (submit a PR if you are missing a degree of freedom). 

For example, let's add a python target. Edit `.projenrc.js` and add a `python` section:

```ts
const { JsiiProject } = require('../../lib');

const project = new JsiiProject({
  name: 'my-project',
  authorName: 'Joe Schmo',
  authorEmail: 'joe@schno.me',
  repository: 'https://github.com/eladb/projen.git',
  python: {
    distName: 'my-python-dist-name',
    module: 'my_python_module'
  }
});

project.synth();
```

Now run:

```shell
pj
```

This will be added:

* The `jsii` section in your `package.json` file will now have a `python` entry.
* The `release.yml` github workflow will include a release job that will release your module to PyPI.

See [API Reference](./API.md) for more details.

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
