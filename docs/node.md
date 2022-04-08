# Node.js Projects

This topic describes all the features of `NodeProject` projects and their
derivatives.

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
  packageManager: javascript.NodePackageManager.YARN, // or NPM, PNPM, etc.
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
    exclude: ['projen'],
  },
});

new javascript.UpgradeDependencies(project, {
  include: ['projen'],
  taskName: "upgrade-projen",
  workflow: false, // or true
  // workflowOptions: { ... }
});
```

You can also use dependabot:

```ts
new javascript.NodeProject({
  depsUpgrade: false,
  dependabot: true,
  // dependabotOptions: { ... }
})
```

[task]: ./tasks.md
[GitHub workflow]: ./github.md#workflows
[create-pull-request#48]: https://github.com/peter-evans/create-pull-request/issues/48
[GitHub API access]: ./github.md#github-api-access

## Pull Request Builds (CI)

TODO

## Releases (CI/CD)

TODO
