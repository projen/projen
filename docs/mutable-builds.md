# Mutable Builds

Projen synthesizes files that are part of your source repository. This means
that when you change you projenrc file, and execute `projen`, other files in
your repo may change as a result.

This is also relevant in other situations where your build process _mutates_
your repository. For example, if you use **snapshot testing**, your repository
includes snapshots which represent expected test results. When your code
changes, you will likely need to update those snapshots as well.

To ensure that a pull request branch always represent the final state of the
repository, you can enable the `mutableBuild` option in your project
configuration (currently only supported for projects derived from
`NodeProject`).

When enabled, the PR build workflow (also called `build`) will push any modified
files to the PR branch after a successful build, so that the branch will always
reflect the most up-to-date version of all generated files.

## Forks

This feature does not work for forks since it is impossible to safely push
changes to a fork from a PR build. If a PR is created from a fork of the
repository and there are build mutations, the PR build will fail (indicating
that it cannot push to the fork). To fix this, the branch needs to be updated
(same behavior as if mutable builds was disabled).
