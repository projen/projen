# Node.js Projects

This topic describes all the features of `NodeProject` projects and their
derivatives.

## Node versioning

You can specify the minimum version of node that your project supports, and the version of node used in GitHub workflows:

```js
const project = new javascript.NodeProject({
  // ...
  minNodeVersion: "16.0.0",
  workflowNodeVersion: "16.1.0", // defaults to minNodeVersion
});
```

## Development Workflow

TODO

## GitHub workflows

Node.js projects with GitHub enabled come bundled with components for running
build workflows on every pull request, automatically upgrading dependencies, and
other conveniences.

For more general information about managing GitHub configuration, check out
[GitHub](./github.md).

## Dependencies

See [Dependencies](#dependencies) for general information about how dependencies
are managed by projen, and how to add new dependencies to your project. By
default, every Node.js project includes a `Dependencies` component which will
manage the dependencies in `package.json`.

When a dependency is managed by projen, it gets added to `package.json` and will
automatically installed after running `npx projen`. Packages will be installed
according to the package manager being used. This can be configured:

```ts
const project = new javascript.NodeProject({
  // ...
  packageManager: javascript.NodePackageManager.YARN_CLASSIC, // or YARN_BERRY, NPM, PNPM, etc.
});
```

Any dependencies without specific version ranges set (such as `react` or
`react@*`) will given a version range in `package.json` so that future package
upgrades and changes to the generated lockfiles such as `package-lock.json` or
`yarn.lock` will follow semver.

A list of all dependencies managed by projen is also reported in
`.projen/deps.json`.

### Dependency upgrades

Node.js projects include an `upgrade` [task] and `upgrade.yml` [GitHub workflow]
that updates node dependencies following semver. The GitHub workflow will
automatically run once a day, and can also be automatically approved for
hands-off dependency managed.

> If you want to upgrade a dependency to a new **major** version (with possible
> breaking changes), you should update its version range via the projenrc file.

In order to create these PRs, permissions to GitHub APIs are needed beyond those
provided by GITHUB_TOKEN, otherwise no subsequent workflows will be triggered,
such as the build workflow (see [create-pull-request#48] for details). Because
of this we require, [GitHub API access] to be provided for these workflows.

It's possible to create a separate workflow and task just for upgrading projen:

```ts
const project = new javascript.NodeProject({
  depsUpgrade: true,
  depsUpgradeOptions: {
    exclude: ["projen"],
  },
});

new javascript.UpgradeDependencies(project, {
  include: ["projen"],
  taskName: "upgrade-projen",
  workflow: false, // or true
  // workflowOptions: { ... }
});
```

You can also use dependabot or renovatebot to get Pull requests on dependency updates

- Dependabot:
  ```ts
  new javascript.NodeProject({
    depsUpgrade: false,
    dependabot: true,
    // dependabotOptions: { ... }
  });
  ```
- Renovatebot:
  ```ts
  new javascript.NodeProject({
    depsUpgrade: false,
    renovatebot: true,
    // renovatebotOptions: { ... }
  });
  ```

[task]: ./tasks.md
[GitHub workflow]: ./github.md#workflows
[create-pull-request#48]: https://github.com/peter-evans/create-pull-request/issues/48
[GitHub API access]: ./github.md#github-api-access

### Yarn Berry Configuration

We support usage of Yarn Berry (> v1) as a package manager. Specify `YARN_BERRY` as your package manager:

```ts
const project = new javascript.NodeProject({
  // ...
  packageManager: javascript.NodePackageManager.YARN_BERRY,
});
```

When using Yarn Berry, `projen` controls the `.yarnrc.yml` configuration file. You can configure it using the
`yarnBerryOptions` property:

```ts
const project = new javascript.NodeProject({
  // ...
  packageManager: javascript.NodePackageManager.YARN_BERRY,
  yarnBerryOptions: {
    version: "4.0.1",
    zeroInstalls: false,
    yarnRcOptions: {
      nodeLinker: YarnNodeLinker.NODE_MODULES,
    },
  },
});
```

#### Yarn Berry Corepack

Following [Yarn's recommendation](https://yarnpkg.com/getting-started/install), we expect that
[`corepack`](https://nodejs.org/api/corepack.html) is enabled on your machine. `corepack` transparently manages the
`yarn` version based on the `packageManager` field in `package.json`.

See [Yarn's installation documentation](https://yarnpkg.com/getting-started/install) for more information.

## Pull Request Builds (CI)

TODO

## Releases (CI/CD)

TODO

## Features

### Scoped Private Packages

Scoped private packages can be configured in this project and its ancestors.

All npm packages have a name. Some package names also have a scope. A scope follows the usual rules for package names (URL-safe characters, no leading dots or underscores). When used in package names, scopes are preceded by an @ symbol and followed by a slash, e.g. `@somescope/somepackagename`

This feature supports specifying options on how package managers should access packages in each of the scopes. If no options are specified, npm or yarn will try to install scoped packages from the public npm registry.

Currently, it only supports fetching packages from AWS CodeArtifact, either by directly access via credentials or by assuming a role using the specified credentials. Credentials must be provided in the CodeArtifactOptions property.

Multiple scoped package options may be specified if required.

example

```js
const { javascript } = require("projen");
const project = new javascript.NodeProject({
  defaultReleaseBranch: "main",
  name: "my-project",
  scopedPackagesOptions: [
    {
      registryUrl: "<code-artifact-registry-url>",
      scope: "@somescope",
    },
  ],
});
project.synth();
```
