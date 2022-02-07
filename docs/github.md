# GitHub

By default, many projects are initialized with `GitHub` component to enabled GitHub as the default provider for CI/CD workflows. See https://docs.github.com/en/actions for more information.

The use of GitHub (and generating corresponding files in `.github`) can be disabled by specifying `github: false` in your project options.

### Workflows

TODO

See the `GitHub`, `GithubWorkflow`, and `Job` types in the [API reference](./api/API.md) for currently available APIs.

Example code of creating a GitHub workflow: https://github.com/projen/projen/blob/65b4194c163f47ba4842981b0c92dbe516be787b/src/github/auto-approve.ts#L67-L105
