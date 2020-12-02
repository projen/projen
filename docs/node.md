# Node.js Projects

This topic describes all the features of `NodeProject` projects and their
derivatives.

## Development Workflow

TODO

## Dependencies

TODO

## Pull Request Builds (CI)

TODO

## Releases (CI/CD)

TODO

## Rebuild Bot

Installs a GitHub workflow which is triggered by adding a comment on a pull
request which reads `@projen rebuild`. The workflow will check out the PR branch
and build it (with no anti-tamper checks), and then it will push the changes
back to the PR branch. This is particularly useful in order to update test
snapshots and other generated files such as `API.md`.

Options:

- To disable, set `rebuildBot` to `false`.
- You can specify a different trigger comment through `rebuildBotComment`.
