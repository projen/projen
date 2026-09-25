# Auto-approving Pull Requests

Auto-approve lets automated pull requests, like dependency upgrades and backports, satisfy a required review
without a human. Combined with [auto-queue](../../api/github.md#autoqueue-) or a merge queue, these pull requests
merge themselves once the build passes.

This page explains how auto-approve decides what to approve, and describes a set of optional settings that
limit what an automated approval can be used for. None of them are required. Whether they are worth the extra
setup depends on your repository, who has access to it, and how you manage credentials.

```ts
const { javascript } = require('projen');

const project = new javascript.NodeProject({
  // ...other options
  autoApproveOptions: {},
  autoApproveUpgrades: true,
});
```

This adds an `auto-approve` workflow. By default, it approves pull requests that have the `auto-approve` label
**and** are authored by `github-actions[bot]`.

## The label

The label marks a pull request as intended for auto-approval.
Components that create pull requests, like dependency upgrades and backports, add it for you.
Approval happens right after the pull request being opened or labeled, and removing the label afterwards
does not revoke it.

The label is not a security control. Anyone who can label pull requests in your repository can add it.

## The approver

GitHub does not allow an identity to approve its own pull requests.
By default, the workflow approves with its `GITHUB_TOKEN`. This requires the repository setting
*Allow GitHub Actions to create and approve pull requests*.

You can approve with a different identity instead, using any `GithubCredentials`.
This allows you to disable that setting, at the cost of managing an additional identity and its credentials:

```ts
const { github, javascript } = require('projen');

const project = new javascript.NodeProject({
  // ...other options
  autoApproveOptions: {
    credentials: github.GithubCredentials.fromApp({
      appIdSecret: "APPROVER_APP_ID",
      privateKeySecret: "APPROVER_APP_PRIVATE_KEY",
      // Only jobs running in this environment can read the secrets
      environment: "approver",
    }),
  },
});
```

The approving identity must be different from the one creating the pull requests.

`environment` runs the approve job in a
[GitHub environment](https://docs.github.com/en/actions/concepts/workflows-and-actions/deployment-environments).
If you store the approver's secrets in that environment and limit its deployment branches to your default branch,
other workflows can't read them. The auto-approve workflow runs on `pull_request_target`, which runs in the context
of the default branch, so it still has access.

## Pull request sources

A `PullRequestSource` describes where a pull request comes from.
Auto-approve approves a pull request if it has the label and matches at least one of the configured `sources`.
If you don't configure any sources, auto-approve uses a single source that matches pull requests authored by
`github-actions[bot]`. Configuring sources replaces it.

There are two kinds of sources. They rely on different things, and you must understand what a source relies on
before you use it.

### Sources by author

`PullRequestSource.fromUsers()` matches pull requests authored by specific users.

```ts
autoApproveOptions: {
  sources: [
    github.PullRequestSource.fromUsers({ logins: ["my-automation-user"] }),
  ],
},
```

**This source relies only on the author.** Anything that can act as one of these users can open a pull request that
is approved. This includes every workflow, script, or tool that runs with their credentials.

### Sources by branch

`PullRequestSource.fromBranch()` matches pull requests from a head branch in this repository.
You can additionally restrict the target branch and the author.

```ts
autoApproveOptions: {
  sources: [
    github.PullRequestSource.fromBranch({
      branchPrefix: "dependabot/",
      authors: ["dependabot[bot]"],
    }),
    github.PullRequestSource.fromBranch({
      branchPrefix: "renovate/",
      authors: ["renovate[bot]"],
    }),
  ],
},
```

**On its own, a branch source is a weaker check than an author source.**
Anyone with write access to the repository can push to a matching branch, and thereby controls what the pull request
contains. Restricting `authors` narrows who can open the pull request, but not who can push to its branch.
A branch source becomes useful once you [protect the matching branches](#protecting-source-branches), so that
only the tool creating them can push to them.

## Limiting what an automated approval can be used for

A common setup looks like this: the automation user has the `write` role on the repository, not `admin`, and
branch protection requires an approving review before merging. Auto-approve provides that review for automated
pull requests.

It is worth thinking through the *borrowed identity* scenario: someone other than the automation gets hold of the
automation user's credentials, for example the `PROJEN_GITHUB_TOKEN` personal access token.
With the default `fromUsers()` source, they can open a pull request as the automation user, add the
`auto-approve` label, and the pull request is approved.

The options below make the borrowed identity scenario harder or less useful.
They are independent of each other, and each comes with trade-offs.
Independently of auto-approve, you can also limit which workflows can read the credentials in the first place.
See [Environments](./index.md#environments).

### Protecting source branches

If only one identity can push to the branches of a `fromBranch()` source, only that identity controls the content
of matching pull requests. Other users with write access can still open a pull request from such a branch, but
they can't change what is in it.

To set this up, create a
[branch ruleset](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
that targets the branches of your source, for example `dependabot/**`, and enable:

- Restrict creations
- Restrict updates
- Restrict deletions
- Block force pushes

Then add the tool creating these branches to the ruleset's bypass list, for example the Dependabot app.

Things to be aware of:

- **Nobody else can push to these branches**, including maintainers, unless they are on the bypass list as well.
- **Anything the source can create can be merged by anyone with write access.** For example, they can
  reopen a pull request a maintainer closed, or trigger a new one.
- **Use `targetBranches`** to restrict which branches a source may target.
- **Pull requests created by projen workflows**, like dependency upgrades and backports, are pushed with
  `projenCredentials`. A ruleset only helps for these sources if those credentials are not the ones you want to
  protect against. Dependency upgrades can use separate credentials via
  `depsUpgradeOptions.workflowOptions.projenCredentials`.

### Workflows that approve

Sources decide what the auto-approve workflow approves. They don't stop *other* workflows from approving.

When *Allow GitHub Actions to create and approve pull requests* is enabled, the `GITHUB_TOKEN` of *any* workflow can
approve *any* pull request. And anyone who can push a new workflow file to any branch of the repository can run that
workflow, because workflows triggered by `push` run without review.

This means any credentials that can push to the repository and have write access to `Workflows` can get any pull
request approved, regardless of your sources. You can address this in one of the following ways.

#### Approve with a separate identity

Approve with dedicated [`credentials`](#the-approver) instead of the `GITHUB_TOKEN`, store their secrets in an
environment limited to your default branch, and disable *Allow GitHub Actions to create and approve pull requests*.

```ts
autoApproveOptions: {
  credentials: github.GithubCredentials.fromApp({
    appIdSecret: "APPROVER_APP_ID",
    privateKeySecret: "APPROVER_APP_PRIVATE_KEY",
    environment: "approver",
  }),
},
```

**With the setting disabled, no workflow's `GITHUB_TOKEN` can approve pull requests.**
A workflow pushed to another branch can't read the approver's secrets either, because the environment is limited to
the default branch. The auto-approve workflow still can, since `pull_request_target` runs in the context of the
default branch.

Trade-offs:

- You manage an additional identity, for example a GitHub App: creating it, installing it, and rotating its key.
- The approver must be different from every identity whose pull requests it approves.
- The same setting also controls whether the `GITHUB_TOKEN` can *create* pull requests.
  Disabling it may break other workflow that creates pull requests with the `GITHUB_TOKEN`.
  projen workflows create pull requests with `projenCredentials`, so they are usually not affected.

#### Don't grant the `Workflows` permission to automation credentials

GitHub rejects any push that adds or changes files in `.github/workflows/` unless the credentials have the
`Workflows` permission (the `workflow` scope for classic personal access tokens).
If your automation credentials, like `PROJEN_GITHUB_TOKEN`, don't have it, they can't be used to add or change
workflow files.

Trade-offs:

- projen workflows need the permission whenever the files they push include workflow changes.
  This happens during dependency upgrades, for example when a new projen version changes a synthesized workflow,
  and during self-mutation, when a pull request changes the projenrc in a way that affects workflows.
  Without the permission, these pushes fail.
- For self-mutation, the contributor then has to run projen locally and commit the synthesized workflow files
  themselves.

#### Restrict changes to workflow files

A [push ruleset](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
can block pushes that change files matching a path, like `.github/workflows/**`, on every branch in the repository.
Identities on the ruleset's bypass list can still push these changes.

This has the same effect as not granting the `Workflows` permission, but the repository enforces it,
independently of how each set of credentials was created.

Trade-offs:

- Identities on the bypass list are not protected, so don't add your automation credentials to it.
  The consequences are the same as [not granting the `Workflows` permission](#dont-grant-the-workflows-permission-to-automation-credentials):
  projen pushes that change workflow files fail.
