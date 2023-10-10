# Build

Projen defines a standard way for building software through a fixed set of
*build phases*. This is implemented via a set of [tasks](../Basics/tasks.md) defined in
the `Project` base class.

The `build` task spawns a set of sub-tasks which represent the various build phases:

* `default` - this task is responsible to execute your projenrc and synthesize all project files.
* `pre-compile` - runs before compilation (eg. bundle assets)
* `compile` - compile your code (if needed)
* `post-compile` - runs immediately after a successful compilation
* `test` - runs tests
* `package` - creates a distribution package

To extend the build process, components and projects can use
`project.projectBuild.xxxTask` and interact with the `Task` object (i.e.
`project.projectBuild.postCompileTask.exec("echo hi")` will execute `echo hi` after
compilation).

> NOTE: the `build` task is locked. This means that any attempt to extend it
> (i.e. call `spawn`, `exec`, `reset`, etc) will throw an exception. Instead of
> extending `build`, just extend one of the phases. This ensures that phases are
> always executed in the right order.

## Build Workflow

The `build` workflow is responsible to build your project when a pull request is
submitted against it.

### Self-mutation

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

> This feature does not work for forks since it is impossible to safely push
> changes to a fork from a PR build. If a PR is created from a fork of the
> repository and there are build mutations, the PR build will fail (indicating
> that it cannot push to the fork). To fix this, the branch needs to be updated
> (same behavior as if mutable builds was disabled).
