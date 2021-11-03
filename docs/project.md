# Projects

This section describes common behaviors for all projen projects. It is
implemented as part of the `Project` base type, from which all project projects
are derived.

## Build Tasks

Projen defines a standard way for building software through a fixed set of
*build phases*. This is implemented via a set of [tasks](./tasks.md) defined in
the `Project` base class.

The `build` task spawns a set of sub-tasks which represent the various build phases:

* `default` - this task is responsible to execute your projenrc and synthesize all project files.
* `precompile` - runs before compilation (ie. bundle assets)
* `compile` - compile your code (if needed)
* `postcompile` - runs immediately after a successful compilation
* `test` - runs tests
* `package` - creates a distribution package

To extend the build process, components and projects can use `project.xxxTask`
and interact with the `Task` object (i.e. `project.postcompileTask.exec("echo
hi")` will execute `echo hi` after compilation).

> NOTE: the `build` task is locked. This means that any attempt to extend it
> (i.e. call `spawn`, `exec`, `reset`, etc) will throw an exception. Instead of
> extending `build`, just extend one of the phases. This ensures that phases are
> always executed in the right order.
