# GitHub

By default, many projects are initialized with `GitHub` component to enabled GitHub as the default provider for CI/CD workflows. See https://docs.github.com/en/actions for more information.

The use of GitHub (and generating corresponding files in `.github`) can be disabled by specifying `github: false` in your project options.

## Workflows

TODO

See the `GitHub`, `GithubWorkflow`, and `Job` types in the [API reference](./api/API.md) for currently available APIs.

Example code of creating a GitHub workflow: <https://github.com/projen/projen/blob/65b4194c163f47ba4842981b0c92dbe516be787b/src/github/auto-approve.ts#L67-L105>

### Stale workflow

A "stale" workflow can be added which will automatically close issues or pull
requests on your GitHub repository after time has passed without the issue
seeing any comments or updates. You can enable as shown below:

```ts
// or PythonProject, etc.
new typescript.TypeScriptProject({
  stale: true,
  staleOptions: {
    issues: {
      closeMessage: "closing pull request",
      staleLabel: "I-AM-STALE",
      daysBeforeStale: 180,
    },
  }
})
```

Check the API reference for a list of all available options.

When enabled, by default issues with no activity with will be marked as stale
after 60 days and closed within 7 days, and pull requests with no activity will
be marked as stale after 14 days and closed within 2 days.
